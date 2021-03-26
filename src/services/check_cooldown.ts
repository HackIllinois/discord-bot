import { Command } from 'src/types';

import { Collection, Message } from 'discord.js';

const cooldowns = new Collection<string, Collection<string, number>>();

const checkCooldown = (command: Command, message: Message): number => {
  // if cooldown dictionary doesn't exist
  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Collection());
  }
 
  // set up cooldown variables
  const now = Date.now();
  const defaultCooldown = 0;
  const timestamps = cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || defaultCooldown) * 1000;

  // cooldown logic
  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      return timeLeft;
    }
  }

  timestamps.set(message.author.id, now);
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
  return null;
};

export default checkCooldown;
