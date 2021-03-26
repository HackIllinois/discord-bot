import { DMChannel, Message } from 'discord.js';
import { Command } from '../types';

const command: Command = {
  name: 'prune',
  description: 'Prune up to 99 messages.',
  guildOnly: true,
  usage: '[prune [number]]',
  roles: ['Admin'],
  execute(message: Message, args: string[]) {
    const amount = parseInt(args[0]) + 1;

    if (isNaN(amount)) {
      return message.reply('Invalid Number');
    } else if (amount <= 1 || amount > 100) {
      return message.reply('1-99 Please!');
    }
    if (!(message.channel instanceof DMChannel)) {
      message.channel.bulkDelete(amount, true).catch((err) => {
        console.error(err);
        message.channel.send('ERR!');
      });
    }
  }
};

module.exports = command;
