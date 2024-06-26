module.exports = {
  testEnvironment: "jsdom",
  rootDir: "..",
  testMatch: ['**/?(*.)+(test).+(ts|tsx|js)'],
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transform: {
    "^.+\\.[tj]sx?$": [
      "babel-jest",
      { configFile: "./config/babel.config.js" },
    ],
  },
  transformIgnorePatterns: [
    'node_modules/(?!(@mui|@babel|react)/)',
  ],
};
