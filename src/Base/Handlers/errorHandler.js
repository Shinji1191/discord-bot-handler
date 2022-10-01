const { ChannelType, EmbedBuilder } = require("discord.js");
const Client = require("../Client");

/** @param {Client} client  */
module.exports = (client) => {
  if (!client.config.errorChannel) return
  const channel = client.channels.cache.get(client.config.errorChannel)
  if (!channel || channel.type !== ChannelType.GuildText) return

  process
    .on("unhandledRejection", (reason, promise) => {
      const msg = new EmbedBuilder()
        .addFields({ name: "Reason", value: `\`\`\`${reason}\`\`\`` }, { name: "Promise", value: `\`\`\`${promise}\`\`\`` })
        .setColor("Red")
        .setTitle("-----Unhandled Rejection-----")
      channel.send({ embeds: [msg] })
      console.log(reason, promise);
    })
    .on("uncaughtExceptionMonitor", (error, origin) => {
        const msg = new EmbedBuilder()
        .addFields({ name: "Error", value: `\`\`\`${error.message}\`\`\`` }, { name: "Origin", value: `\`\`\`${origin}\`\`\`` })
        .setColor("Red")
        .setTitle("-----Uncaught Exception Monitor-----")
      channel.send({ embeds: [msg] })
      console.log(error, origin);
    })
    .on("uncaughtException", (error, origin) => {
      const msg = new EmbedBuilder()
        .addFields({ name: "Error", value: `\`\`\`${error.message}\`\`\`` }, { name: "Origin", value: `\`\`\`${origin}\`\`\`` })
        .setColor("Red")
        .setTitle("-----Uncaught Exception-----")
      channel.send({ embeds: [msg] })
      console.log(error, origin);
    })
    .on("multipleResolves", (type, promise) => {
      const msg = new EmbedBuilder()
        .addFields({ name: "Type", value: `\`\`\`${type}\`\`\`` }, { name: "Promise", value: `\`\`\`${promise}\`\`\`` })
        .setColor("Red")
        .setTitle("-----Multiple Resolves-----")
      channel.send({ embeds: [msg] })
      console.log(type, promise);
    })
}