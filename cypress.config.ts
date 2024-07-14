import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  defaultCommandTimeout: 6000,
  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
});
