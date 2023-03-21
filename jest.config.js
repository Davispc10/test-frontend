// Importando o jest que vem do next para configurarmos
const nextJest = require("next/jest");

const createJestConfig = nextJest({
    dir: "./",
});

const customJestConfig = {
    moduleDirectories: ["node_modules", "<rootDir>/"],
    testEnvironment: "jest-environment-jsdom",
    testEnvironment: 'jsdom',
    collectCoverage: true,

    //yarn test --coverage
    //relatório de cobertura de código
    collectCoverageFrom: [
        "src/**/*.tsx",
        "!src/**/*.spec.tsx"
    ],
    coverageReporters: [
        "lcov"
    ] 
};

module.exports = createJestConfig(customJestConfig);