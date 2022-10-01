import { Collection } from "discord.js";
import { CommandType } from "./CommandType";
import { SlashCommandType } from "./SlashCommand";

export type CommandCollection<>=Collection<string, CommandType>;
export type AliasesCollection<>=Collection<string, string>;
export type SlashCommandCollection<>=Collection<string, SlashCommandType>;