module.exports = {
  testEnvironment: "node",
  collectCoverage: true,
  coverageDirectory: "coverage",
  testMatch: ["**/test/**/*.test.js"],
  transformIgnorePatterns: [
    "[/\\\\\\\\]node_modules[/\\\\\\\\].+\\\\.(js|ts)$",
  ],
  transform: {},
  coveragePathIgnorePatterns: ["/node_modules/"],
};
