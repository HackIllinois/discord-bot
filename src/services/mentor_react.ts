import { Message } from 'discord.js';
import { mentorHelpChannelID } from '../config.json';

const mentorReact = (message: Message): void => {
  if (message.channel.id === mentorHelpChannelID) {
    message
      .react('👍')
      .then(() => message.react('1️⃣'))
      .then(() => message.react('2️⃣'))
      .then(() => message.react('3️⃣'))
      .then(() => message.react('4️⃣'))
      .then(() => message.react('5️⃣'));
  }
};

export default mentorReact;
