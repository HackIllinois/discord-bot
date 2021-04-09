import { Client, Guild, TextChannel } from 'discord.js';
import {
  eventNotificationChannelID,
  otherEventRoleID,
  miniEventRoleID,
  qnaEventRoleID,
  speakerEventRoleID,
  workshopEventRoleID,
  guildID
} from '../config.json';
const fetch = require('node-fetch');

const MINUTES_15 = 60 * 15 * 1000;
const TZOFFSET = 5;
const sendEventNotification = (client: Client): void => {
  fetch('https://api.hackillinois.org/event/', {
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const guild = client.guilds.cache.get(guildID);
      const currentTime = Date.now();
      const events = data.events.filter((event) => {
        return (
          event.startTime * 1000 > currentTime && event.startTime * 1000 < currentTime + MINUTES_15
        );
      });
      events.forEach((event) => {
        const time = new Date();
        time.setTime(event.startTime * 1000);
        // get time to CST
        time.setTime(time.getTimezoneOffset() * 1000 * 60 + time.getTime());
        time.setTime(time.getTime() - 60 * 60 * 1000 * TZOFFSET);
        // We do this cast because we set the channel ourselves.
        const channel = client.channels.cache.get(eventNotificationChannelID) as TextChannel;
        let role = guild.roles.cache.get(otherEventRoleID);
        if (event.eventType === 'SPEAKER') {
          role = guild.roles.cache.get(speakerEventRoleID);
        }
        if (event.eventType === 'MINIEVENT') {
          role = guild.roles.cache.get(miniEventRoleID);
        }
        if (event.eventType === 'WORKSHOP') {
          role = guild.roles.cache.get(workshopEventRoleID);
        }
        if (event.eventType === 'QNA') {
          role = guild.roles.cache.get(qnaEventRoleID);
        }
        channel.send(
          `<@&${role}> ${event.name} is starting at ${time.getHours() % 12}:${
            time.getMinutes() < 10 ? 0 + '' + time.getMinutes() : time.getMinutes()
          } ${time.getHours() / 12 >= 1 ? 'PM' : 'AM'} CST. ${
            event.sponsor.length > 0 ? '\nSponsored by ' + event.sponsor + '.' : ''
          } ${event.points > 0 ? '\nPoints: ' + event.points : ''}`
        );
      });
    });
};

export default sendEventNotification;
