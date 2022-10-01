const { promisify } = require("util");
const { glob } = require("glob");
const { checkEvent } = require("./Checks");
const GB = promisify(glob);

/**
 * @param {import("../Client")} client
 */
module.exports = async (client) => {
  const eventFiles = await GB(`${__dirname}/../../Events/**/*.js`);
  console.log(`Event Loader`)
  eventFiles.forEach((filePath) => {
    let file = require(filePath);

    checkEvent(file)

    if (file.event) {
      if (file.once) client.once(file.event, file.run.bind(null, client));
      else client.on(file.event, file.run.bind(null, client));
    }
  });
};
