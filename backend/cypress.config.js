import { defineConfig } from "cypress"

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    projectId: "bwaiwx",
    baseUrl: "http://127.0.0.1:3100/api/",
  },
})