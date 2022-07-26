import { defineConfig } from "cypress"

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    projectId: "bwaiwx",
    baseUrl: "http://127.0.0.1:3100/api/",
    video: false,
    screenshotOnRunFailure: false,
    browsers: [
      {
        name: 'chrome',
        family: 'chromium',
        channel: 'stable',
        displayName: 'Chrome',
        version: '103.0.5060.114',
        path: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
        minSupportedVersion: 64,
        majorVersion: 103,
      }
    ],
  },
})