const { pathsToModuleNameMapper } = require("ts-jest");
// In the following statement, replace `./tsconfig` with the path to your `tsconfig` file
// which contains the path mapping (ie the `compilerOptions.paths` option):
const { compilerOptions } = require("./tsconfig");

const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

/** @type {import('jest').Config} */
const customJestConfig = {
  moduleDirectories: ["node_modules", "<rootDir>/"],
  modulePaths: [compilerOptions.baseUrl],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
  testEnvironment: "jest-environment-jsdom",
};

module.exports = createJestConfig(customJestConfig);
