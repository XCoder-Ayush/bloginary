const commonConfig = require("./jest.config");

module.exports = {
  ...commonConfig,
  testMatch: ["**/test/unit/**/*.test.js"],
  collectCoverageFrom: ["**/*.js"],
  coverageDirectory: "coverage/unit",
};
