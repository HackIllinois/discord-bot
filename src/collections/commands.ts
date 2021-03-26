import { Collection } from 'discord.js';
import fs = require('fs');
import path = require('path');
import { Command } from 'src/types';

const commands = new Collection<string, Command>();
const dirPath = path.resolve(__dirname, '../commands');
const commandFiles = fs.readdirSync(dirPath).filter((file) => file.endsWith('.ts'));

for (const file of commandFiles) {
  const command: Command = require(`../commands/${file}`);
  commands.set(command.name, command);
}

export default commands;
