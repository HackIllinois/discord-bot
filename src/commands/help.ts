import config from '../config.json';
import commands from '../collections/commands';
import { Command } from '../types';
import { Message } from 'discord.js';

const command: Command = {
  name: 'help',
  description: 'List all commands or info about a specific command.',
  aliases: ['commands'],
  usage: '[help [command]]',
  guildOnly: false,
  execute(message: Message, args: string[]) {
    const data = [];

    if (!args.length) {
      data.push('Dizzy Commands:');
      data.push(commands.map((command) => command.name).join(' | '));
      data.push(`\nUse \`${config.prefix}help [command]\` for more info!`);

      return message.author
        .send(data, { split: true })
        .then(() => {
          if (message.channel.type === 'dm') return;
        })
        .catch((error) => {
          console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
        });
    }

    const name = args[0].toLowerCase();
    const command =
      commands.get(name) || commands.find((c) => c.aliases && c.aliases.includes(name));

    if (!command) {
      return message.reply('Dizzy Command not found :(');
    }

    data.push(`**Command:** ${command.name}`);

    if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
    if (command.description) data.push(`**Description:** ${command.description}`);
    if (command.usage) data.push(`**Usage:** ${config.prefix}${command.name} ${command.usage}`);

    if (command.cooldown) data.push(`**Cooldown:** ${command.cooldown} second(s)`);

    message.channel.send(data, { split: true });
  }
};

module.exports = command;
