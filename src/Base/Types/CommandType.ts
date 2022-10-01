import { Message, PermissionResolvable } from "discord.js";
import Client from "../Client";

type Run = (client: Client, message: Message, args: string[]) => any;

export type CommandType = {
  name: string;
  description: string;
  category: string;
  aliases?: string[];
  examples?: string[];
  config?: {
    devOnly?: boolean;
    ownerOnly?: boolean;
    nsfw?: boolean;
  };
  permissions?: {
    user?: PermissionResolvable[];
    bot?: PermissionResolvable[];
  };
  run: Run;
};
