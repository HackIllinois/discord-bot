// require discord for obvious reasons
import { Client, Message } from 'discord.js';
// require configuration
const config = require('./config.json');
// service imports
import checkCommand from './services/check_command';
import checkCooldown from './services/check_cooldown';
// collection imports
import commands from './collections/commands';
// type import
import { Command } from 'src/types';
import mentorReact from './services/mentor_react';
import sendEventNotification from './services/sendEventNotification';

// initialize important things
const client: Client = new Client();

// client listener for ready
client.once('ready', async () => {
  console.log('Ready');
  setInterval(() => {
    console.log('Sending Event Notifications!');
    sendEventNotification(client);
  }, 1000 * 60);
});

// on message listener
client.on('message', async (message: Message) => {
  // if the message was by bot or isn't a command, exit
  if (message.author.bot) return;
  mentorReact(message);

  if (!message.content.startsWith(config.prefix)) return;
  // parse the message string
  const args: string[] = message.content.slice(config.prefix.length).trim().split(/ +/);
  const commandName: string = args.shift().toLowerCase();
  const command: Command =
    commands.get(commandName) ||
    commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));

  // check if command is valid
  const commandValid: string = checkCommand(command, message, args, config.prefix);
  if (commandValid != null) {
    message.reply(commandValid);
    return;
  }

  // check for cooldown of command
  const timeLeft: number = checkCooldown(command, message);
  if (timeLeft != null) {
    message.reply(
      `Please wait ${timeLeft.toFixed(0)} dollars before using \`${command.name}\` again.`
    );
    return;
  }
  // execute command!
  try {
    command.execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply('Oops, something went wrong! Check error logs.');
  }
});

client.login(config.token);
