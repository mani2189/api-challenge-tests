const { defineConfig } = require("cypress");
const installLogsPrinter = require('cypress-terminal-report/src/installLogsPrinter');

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://us-central1-nn-api-challenge.cloudfunctions.net/api",
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
    setupNodeEvents(on, config) {
      installLogsPrinter(on);
    },
  },
});