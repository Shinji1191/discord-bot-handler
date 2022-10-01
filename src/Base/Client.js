const Discord = require("discord.js");

class Client extends Discord.Client {
  /** @type {import("./Types/ClientTypes").CommandCollection} */
  commands = new Discord.Collection();
  /** @type {import("./Types/ClientTypes").AliasesCollection} */
  aliases = new Discord.Collection();
  /** @type {import("./Types/ClientTypes").SlashCommandCollection} */
  slashCommands = new Discord.Collection();
  config = require("./config");

  constructor() {
    super({
      intents: [
        "GuildMembers",
        "GuildMessages",
        "GuildPresences",
        "GuildInvites",
        "Guilds",
        "MessageContent",
        "DirectMessages"
      ],
      partials: [
        Discord.Partials.GuildMember,
        Discord.Partials.Channel,
        Discord.Partials.Message,
        Discord.Partials.Reaction,
        Discord.Partials.ThreadMember,
        Discord.Partials.User,
      ]
    });
  }

  /** @private */
  requireFiles() {
    require("./Handlers/commandHandler")(this);
    require("./Handlers/slashHandler")(this);
    require("./Handlers/eventHandler")(this);
    require("./Handlers/errorHandler")(this);
  }

  start() {
    if (!this.config.token) return console.log(`[${require("chalk").default.bgRedBright.bold(" Error ")}] No token was provided`)
    this.login(this.config.token);
    this.requireFiles();
  }
}

module.exports = Client;
