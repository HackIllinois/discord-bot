import { Message, TextChannel } from 'discord.js';
import mentors from '../collections/mentors';
import { Command } from '../types';
import { mentorChannelName } from '../config.json';

const command: Command = {
  name: 'unavailable',
  description: 'Marks mentor as unavailable!',
  guildOnly: true,
  usage: '[unavailable]',
  aliases: ['uav'],
  roles: ['Mentor'],
  execute(message: Message, args: string[]) {
    const tag = message.author.id;
    if (!mentors.has(tag)) {
      message.reply(' you are not available rn ;)!');
    }
    mentors.delete(tag);
    const mentorList = [];
    mentors.forEach((m) => {
      mentorList.push('<@' + m + '>');
    });
    try {
      const mentorChannel = message.guild.channels.cache.find(
        (channel) => channel.name === mentorChannelName
      ) as TextChannel;
      mentorChannel.messages.fetch({ limit: 1 }).then((messages) => {
        const lastMessage = messages.first();
        if (lastMessage) {
          lastMessage.edit('Available Mentors: \n' + mentorList.join(' | '));
        } else {
          mentorChannel.send('Available Mentors: \n' + mentorList.join(' | '));
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
};

module.exports = command;
