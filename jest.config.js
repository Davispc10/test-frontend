const nextJest = require("next/jest");

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  moduleNameMapper: {
    // Handle module aliases (this will be automatically configured for you soon)
    "^@/@types/(.*)$": "<rootDir>/src/@types/$1",
    "^@/components/(.*)$": "<rootDir>/src/components/$1",
    "^@/contexts/(.*)$": "<rootDir>/src/contexts/$1",
    "^@/hooks/(.*)$": "<rootDir>/src/hooks/$1",

    "^@/pages/(.*)$": "<rootDir>/src/pages/$1",
    "^@/services/(.*)$": "<rootDir>/src/services/$1",
    "^@/styles/(.*)$": "<rootDir>/src/styles/$1",
    "^@/utils/(.*)$": "<rootDir>/src/utils/$1",
  },
  testEnvironment: "jest-environment-jsdom",
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}",
    "!src/**/*.{scss|css}",
    "!src/**/*.spec.{js,jsx,ts,tsx}",
    "!src/**/_app.{js,jsx,ts,tsx}",
    "!src/**/_document.{js,jsx,ts,tsx}",
    "!**/node_modules/**",
    "!**/vendor/**",
  ],
  coverageReporters: ["lcov", "json"],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
