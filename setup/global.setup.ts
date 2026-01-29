import * as path from "path";
import dotenv from "dotenv";
import { removeDirectory } from "../utils/directory.util";

// Global setup function to run before the tests
async function setup() {
  const __dirname = import.meta.dirname;
  const resultsPath = path.join(__dirname, "../reports");
  const storageState = path.join(__dirname, "../authentication");

  removeDirectory(resultsPath);
  removeDirectory(storageState);
  loadTestEnvironment();
  logEnvironmentVariables(["TEST_ENV"]);
}

// Log the environment variables
export function logEnvironmentVariables(envVars: string[]) {
  console.log("env:");
  envVars.forEach((envVar) => {
    console.log(`> ${envVar} :`, process.env[envVar]);
  });
}

// Load the test environment
export function loadTestEnvironment() {
  if (process.env.test_env) {
    const __dirname = import.meta.dirname;
    const envPath = path.join(__dirname, "../env");
    dotenv.config({
      path: path.join(envPath, `.env.${process.env.test_env}`),
      override: true,
      quiet: true,
    });
  }
}

export function logging() {
  if (process.env.ENABLE_LOGGING !== "true") {
    console.log = () => {};
    console.debug = () => {};
    console.info = () => {};
    console.warn = () => {};
    console.error = () => {};
  }
}

export default setup;
