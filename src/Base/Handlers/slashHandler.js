const { promisify } = require("util");
const { glob } = require("glob");
const { checkCommand } = require("./Checks");
const { default: chalk } = require("chalk");
const GB = promisify(glob);

/**
 * @param {import("../Client")} client
 */
module.exports = async (client) => {
  let slashArray = []
  const commandFiles = await GB(`${__dirname}/../../SlashCommands/**/*.js`);
  console.log(`Slash Command Loader`)
  commandFiles.forEach((filePath) => {
    let file = require(filePath);
    let splitted = filePath.split("/");
    let directory = splitted[splitted.length - 2];

    checkCommand(file)

    if (file.name) {
      let properties = { directory, ...file };
      client.slashCommands.set(file.name, properties);
      slashArray.push(file)
    }
  });

  client.on("ready", () => {
    registerCommands({
      commands: slashArray,
      // guild: "Server ID Here"
    })
  })

  function registerCommands({ commands, guild }) {
    console.log(`Client Config`)
    if (guild) {
      let server = client.guilds.cache.get(guild);
      server?.commands.set(commands);
      console.log(`  > [${chalk.bgGreenBright.bold(" Client ")}] Registered /Commands to ${server.name}`);
    } else {
      client.application?.commands.set(commands)
      console.log(`  > [${chalk.bgGreenBright.bold(" Client ")}] Registered /Commands to all servers`);
    }
  }
};
