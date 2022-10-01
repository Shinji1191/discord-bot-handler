const Event = require("../../Base/Classes/Event");
const { Colors } = require("discord.js");

module.exports = new Event({
  event: "interactionCreate",
  async run(client, interaction) {
    if (interaction.isChatInputCommand()) {
      let command = client.slashCommands.get(interaction.commandName);

      if (!command) return interaction.reply({ embeds: [{ description: "This command does not exist", color: Colors.Red }], ephemeral: true });

      if (command.config?.devOnly && !client.config.devIDs?.includes(interaction.user.id)) return interaction.reply({ embeds: [{ description: "❌ This command is only for the developer.", color: Colors.Red }], ephemeral: true });

      if (command.config?.ownerOnly && interaction.guild.ownerId !== interaction.user.id) return interaction.reply({ embeds: [{ description: "❌ This command is only for the owner of this server.", color: Colors.Red }], ephemeral: true });

      if (command.config?.nsfw && !interaction.channel.nsfw) return interaction.reply({ embeds: [{ description: "❌ This command can only be ran on a NSFW enabled channel.", color: Colors.Red }], ephemeral: true });

      if (command.permissions?.user && !interaction.member.permissions.has(command.permissions?.user || [])) return interaction.reply({ embeds: [{ description: "❌ You do not have the permissions to run this command.", color: Colors.Red }] });

      if (command.permissions?.bot && !interaction.guild.members.me.permissions.has(command.permissions?.bot || [])) return interaction.reply({ embeds: [{ description: "❌ I do not have the permissions to run this command.", color: Colors.Red }] });  

      command.run(client, interaction)
    }
  },
});
