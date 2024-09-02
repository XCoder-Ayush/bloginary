const commonConfig = require("./jest.config");

module.exports = {
  ...commonConfig,
  testMatch: ["**/test/integration/**/*.test.js"],
  coverageDirectory: "coverage/integration",
};
