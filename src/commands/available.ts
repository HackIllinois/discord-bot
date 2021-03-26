import { Message, TextChannel } from 'discord.js';
import mentors from '../collections/mentors';
import { Command } from '../types';
import {mentorChannelName} from '../config.json';

const command: Command = {
  name: 'available',
  description: 'Marks mentor as available',
  guildOnly: true,
  usage: '[available]',
  aliases: ['av'],
  roles: ['Mentor'],
  execute(message: Message, args: string[]) {
    const tag = message.author.id;
    mentors.push(tag);
    const mentorList = [];
    mentors.forEach((m) => {
      mentorList.push('<@' + m + '>');
    });
    try {
      const mentorChannel = message.guild.channels.cache.find(
        (channel) => channel.name === mentorChannelName
      ) as TextChannel;
      mentorChannel.messages.fetch({limit: 1}).then(messages => {
        const lastMessage = messages.first();
        lastMessage.edit('Available Mentors: \n' + mentorList.join(' | '))
      })
    } catch (error) {
      console.log(error);
    }
  }
};

module.exports = command;
