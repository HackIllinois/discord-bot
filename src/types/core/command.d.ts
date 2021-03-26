import { Message } from "discord.js";

export interface Command {
  name: string;
  description: string;
  aliases?: Array<string>;
  usage?: string;
  roles?: Array<string>;
  cooldown?: number;
  guildOnly: boolean;
  execute(message: Message, args: string[]): void;
}
