import { DMChannel, Message } from 'discord.js';
import { Command } from 'src/types';

const checkCommand = (
  command: Command,
  message: Message,
  args: string[],
  prefix: string
): string => {
  if (!command) return 'Command not found!';

  // if the command is server only and is text, exit
  if (command.guildOnly && message.channel.type !== 'text') {
    return "Can't use this here...";
  }

  // check for validity in roles
  if (
    message.guild != null &&
    command.roles &&
    command.roles.filter((role) => {
      let found = false;
      message.member.roles.cache.forEach((v) => {
        if (v.name == role) found = true;
      });
      return found;
    }).length === 0
  ) {
    return `Can't use \`${command.name}\` no permissions!`;
  }

  return null;
};

export default checkCommand;
