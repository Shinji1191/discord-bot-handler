const SlashCommand = require("../../Base/Classes/SlashCommand");

module.exports = new SlashCommand({
  name: "ping",
  description: "Ping command",
  category: "Bot",
  async run (client, interaction) {
    let msg = await interaction.reply({ content: "Pong", fetchReply: true });

    msg.edit({ content: "Ping" })
  }
});