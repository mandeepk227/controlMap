const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://salea.app.ctrlmap.com',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    chromeWebSecurity: false,
    video: true,
    retries: 1,
    viewportWidth: 1440,
    viewportHeight: 768,
    watchForFileChanges: false,
    defaultCommandTimeout: 60000,
    pageLoadTimeout: 60000,
    responseTimeout: 30000,
    requestTimeout: 30000,
    failOnStatusCode: false,
    env: {
      baseUrl: 'https://salea.app.ctrlmap.com/',
      data: {
        userID: 'sachin.saini@controlmap.io',
        password: 'Pass1234'
      }
    }
  },
});
