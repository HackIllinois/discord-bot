import { Message } from 'discord.js';
import commands from '../collections/commands';
import { Command } from '../types';

const command: Command = {
  name: 'reload',
  description: 'Reloads a command',
  guildOnly: true,
  usage: '[reload command]',
  roles: ['Admin'],
  execute(message: Message, args: string[]) {
    const commandName = args[0].toLowerCase();
    const command =
      commands.get(commandName) ||
      commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) {
      return message.channel.send(
        `There is no command with name or alias \`${commandName}\`, ${message.author}!`
      );
    }

    delete require.cache[require.resolve(`./${command.name}.js`)];

    try {
      const newCommand = require(`./${command.name}.js`);
      commands.set(newCommand.name, newCommand);
      message.channel.send(`Command \`${command.name}\` was reloaded!`);
    } catch (error) {
      console.log(error);
      message.channel.send(
        `There was an error while reloading a command \`${command.name}\`:\n\`${error.message}\``
      );
    }
  }
};

module.exports = command;
