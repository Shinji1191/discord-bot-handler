const Command = require("../../Base/Classes/Command");

module.exports = new Command({
  name: "ping",
  category: "Bot",
  description: "Ping command",
  run: (client, message, args) => {
    message.reply({ embeds: [{ description: `Ping is \`${client.ws.ping}ms\`` }] });
  }
})