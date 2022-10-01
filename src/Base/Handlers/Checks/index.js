const { default: chalk } = require("chalk")

function checkCommand(command) {
  if (!command?.name) return console.log(`[${chalk.bgRedBright.bold(" Skipped ")}] this file has no name ${command.directory}`);

  if (!command?.description) return console.log(`[${chalk.bgRedBright.bold(" Skipped ")}] ${command.name} has no description.`);

  if (!command?.category) return console.log(`[${chalk.bgRedBright.bold(" Skipped ")}] ${command.name} has no category.`);

  if (!command?.run) return console.log(`[${chalk.bgRedBright.bold(" Skipped ")}] ${command.name} has no run function.`);

  if (typeof command?.name != "string") return console.log(`[${chalk.bgRedBright.bold(" Skipped ")}] ${command.name} is not a string.`);

  if (typeof command?.description != "string") return console.log(`[${chalk.bgRedBright.bold(" Skipped ")}] the description of ${command.name} is not a string.`);

  if (typeof command?.category != "string") return console.log(`[${chalk.bgRedBright.bold(" Skipped ")}] the category of ${command.name} is not a string.`);

  if (typeof command?.run != "function") return console.log(`[${chalk.bgRedBright.bold(" Skipped ")}] the run function of ${command.name} is not a function.`);

  else return console.log(`  > [${chalk.bgGreenBright.bold(" Loaded ")}] ${command.name}`)
}

function checkEvent(event) {
  if (!event?.event) return console.log(`[${chalk.bgRedBright.bold(" Skipped ")}] this file has no name.`);

  if (!event?.run) return console.log(`[${chalk.bgRedBright.bold(" Skipped ")}] ${event.event} has no run function.`);

  if (typeof event?.event != "string") return console.log(`[${chalk.bgRedBright.bold(" Skipped ")}] ${event.event} is not a string.`);

  if (typeof event?.run != "function") return console.log(`[${chalk.bgRedBright.bold(" Skipped ")}] the run function of ${event.event} is not a function.`);

  else return console.log(`  > [${chalk.bgGreenBright.bold(" Loaded ")}] ${event.event}`)
}

module.exports = {checkCommand, checkEvent}