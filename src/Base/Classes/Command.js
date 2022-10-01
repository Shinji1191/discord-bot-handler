class Command {
  /**
   *
   * @param {import("../Types/CommandType").CommandType} options
   */
  constructor(options) {
    Object.assign(this, options);
  }
}

module.exports = Command;
