const { promisify } = require("util");
const { glob } = require("glob");
const { checkCommand } = require("./Checks");
const GB = promisify(glob);

/**
 * @param {import("../Client")} client
 */
module.exports = async (client) => {
  const commanFiles = await GB(`${__dirname}/../../Commands/**/*.js`);
  console.log(`Prefix Command Loader`)
  commanFiles.forEach((filePath) => {
    let file = require(filePath);
    let splitted = filePath.split("/");
    let directory = splitted[splitted.length - 2];

    checkCommand(file)

    if (file.name) {
      let properties = { directory, ...file };
      client.commands.set(file.name, properties);
    }

    if (file.aliases && Array.isArray(file.aliases))
      file.aliases.forEach((alias) => client.aliases.set(alias, file.name));
  });
};
