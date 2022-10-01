const { default: chalk } = require("chalk");
const { default: mongoose } = require("mongoose");
const ms = require("ms");
const Event = require("../../Base/Classes/Event");

module.exports = new Event({
  event: "ready",
  run: async (client) => {
    console.log(`  > [${chalk.bgGreenBright.bold(" Client ")}] Logged in as ${client.user.tag}`)
    if (!client.config.DBUrl) return
    mongoose.connect(client.config.DBUrl)
    mongoose.connection.on("connected", () => console.log(`  > [${chalk.bgGreenBright.bold(" Loaded ")}] Database connection has been connected`));
    mongoose.connection.on("disconnected", () => console.log(`  > [${chalk.bgGreenBright.bold(" Loaded ")}] Database connection has been disconnected`));
    mongoose.connection.on("error", (error) => console.log(`  > [${chalk.bgRedBright.bold(" Error ")}] Database has encountered an error: ${error.message}`));
  }
})