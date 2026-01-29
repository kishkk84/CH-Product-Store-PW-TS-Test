import { defineConfig, devices } from "@playwright/test";
import path from "path";
import { loadTestEnvironment } from "./setup/global.setup";
import os from "node:os";

loadTestEnvironment();

const __dirname = import.meta.dirname;
const resultsDir = path.join(__dirname, "reports");

export default defineConfig({
  testDir: "./",
  snapshotDir: "./__snapshots__",
  timeout: 30 * 1000,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : 3,
  outputDir: `${resultsDir}/test-results`,
  reporter: [
    ["html", { outputFolder: `${resultsDir}/html` }],
    ["junit", { outputFile: `${resultsDir}/results.xml` }],
    ["json", { outputFile: `${resultsDir}/results.json` }],
    ["list"],
    [
      "allure-playwright",
      {
        resultsDir: `${resultsDir}/allure-results`,
        detail: true,
        suiteTitle: true,
        environmentInfo: {
          OS: os.platform(),
          Architecture: os.arch(),
          Release: os.release(),
          Version: os.version(),
          NodeVersion: process.version,
        },
      },
    ],
  ],
  globalSetup: "./setup/global.setup.ts",
  globalTeardown: "./setup/global.teardown.ts",
  use: {
    viewport: null,
    launchOptions: {
      args: ["--start-maximized"],
    },
    trace: "retain-on-failure",
    video: "retain-on-failure",
    screenshot: "only-on-failure",
  },

  projects: [
    {
      name: "Regression Tests",
      testMatch: [/.*.spec.ts/],
      grep: [/@all/, /@chrome/],
      use: {
        ...devices["Desktop Chrome"],
        ignoreHTTPSErrors: true,
        deviceScaleFactor: undefined,
        viewport: null,
      },
    },
  ],
});
