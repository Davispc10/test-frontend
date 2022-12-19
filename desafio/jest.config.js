/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  clearMocks: true,
  collectCoverage: true,
  verbose: true,
  rootDir: 'src',
  // transform: {
  //   "^.+\\.(j|t)sx?$": "babel-jest",
  // },
};