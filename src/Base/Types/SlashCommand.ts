import { PermissionResolvable, ChatInputCommandInteraction, GuildMember, ChatInputApplicationCommandData } from "discord.js";
import Client from "../Client";

interface extendedInteraction extends ChatInputCommandInteraction {
  member: GuildMember
}

type Run = (client: Client, interaction: extendedInteraction) => any;

export type SlashCommandType = {
  category: string;
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
} & ChatInputApplicationCommandData;
