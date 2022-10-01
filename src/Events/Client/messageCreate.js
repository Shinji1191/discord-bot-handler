const Event = require("../../Base/Classes/Event");

module.exports = new Event({
  event: "messageCreate",
  run: async (client, message) => {
    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(client.config.prefix)) return;

    const [cmd, ...args] = message.content
      .slice(client.config.prefix.length)
      .trim()
      .split(/ +/g);

    const command = client.commands.get(cmd.toLowerCase()) || client.commands.get(client.aliases.get(cmd.toLowerCase()))

    if (!command) return

    if (command.config?.devOnly && !client.config?.devIDs.includes(message.author.id)) return message.reply({ embeds: [{ description: "❌ This command is only for the developer." }] });

    if (command.config?.ownerOnly && message.guild.ownerId !== message.author.id) return message.reply({ embeds: [{ description: "❌ This command is only for the owner of this server." }] });

    if (command.config?.nsfw && !message.channel.nsfw) return message.reply({ embeds: [{ description: "❌ This command can only be ran on a NSFW enabled channel." }] });

    if (command.permissions?.user && !message.member.permissions.has(command.permissions?.user || [])) return message.reply({ embeds: [{ description: "❌ You do not have the permissions to run this command." }] });

    if (command.permissions?.bot && !message.guild.members.me.permissions.has(command.permissions?.bot || [])) return message.reply({ embeds: [{ description: "❌ I do not have the permissions to run this command." }] });

    command.run(client, message, args);
  },
});
