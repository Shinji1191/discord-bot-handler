const Client = require("../Client");

/**
 * @template {keyof import("discord.js").ClientEvents} Key
 */
class Event {
  /**
   *
   * @param {{ event: Key, once: boolean, run: (client: Client, ...args: import("discord.js").ClientEvents[Key]) => any }}
   */
  constructor({ event, once, run }) {
    this.event = event;
    this.once = once;
    this.run = run;
  }
}
module.exports = Event;
