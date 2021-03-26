import { Client, TextChannel } from 'discord.js';
import { eventNotificationChannelID } from '../config.json';
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
      const currentTime = Date.now();
      const events = data.filter(
        (event) =>
          event.startTime.getTime() > currentTime && event.startTime < currentTime + MINUTES_15
      );

      events.forEach((event) => {
        const time = new Date();
        time.setTime(event.startTime);
        // get time to CST
        time.setTime(time.getTimezoneOffset() * 1000 * 60 + time.getTime());
        time.setTime(time.getTime() - 60 * 60 * 1000 * TZOFFSET);
        // We do this cast because we set the channel ourselves.
        const channel = client.channels.cache.get(eventNotificationChannelID) as TextChannel;
        channel.send(
          `${event.name} is starting at ${time.getHours() % 12}:${
            time.getMinutes() < 10 ? 0 + '' + time.getMinutes() : time.getMinutes()
          } ${time.getHours() / 12 >= 1 ? 'PM' : 'AM'}`
        );
      });
    });
};

export default sendEventNotification;
