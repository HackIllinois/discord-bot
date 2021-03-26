import { Message } from 'discord.js';
const fetch = require('node-fetch');
import { Command } from '../types';
import { API_KEY } from '../config.json';

const command: Command = {
  name: 'leaderboard',
  description: 'Shows hackillinois point leaderboard',
  guildOnly: true,
  usage: '[leaderboard]',
  roles: ['Admin'],
  execute(message: Message, args: string[]) {
    fetch('https://api.hackillinois.org/profile/leaderboard/?limit=10', {
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          API_KEY
      }
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const leaderboard = data.profiles;
        const fields = [];
        leaderboard.forEach((profile, index) => {
          fields.push({
            inline: true,
            name: '' + (index + 1) + '. ' + profile.firstName + ' ' + profile.lastName,
            value: '\u200b'
          });
          fields.push({ name: '\u200b', value: '\u200b', inline: true });
          fields.push({ name: profile.points, value: '\u200b', inline: true });
        });
        const embed = {
          title: 'Leaderboard',
          description: 'HackIllinois Point Leaderboards!',
          color: 0xff7300,
          thumbnail: { url: leaderboard[0].avatarUrl },
          fields: fields
        };
        message.channel.send({ embed: embed });
      });
  }
};

module.exports = command;
