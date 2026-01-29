import { Page, test as baseTest } from "@playwright/test";
import { HomePage } from "../page-objects/pages/home.page";
import { logging } from "../setup/global.setup";

// Base test fixture to setup and teardown the test for DemoBlaze application
export const test = baseTest.extend<{ autoTestFixture: Page }>({
  autoTestFixture: [
    async ({ page }, use) => {
      await setup(page);
      await use(page);
      await teardown(page);
    },
    { scope: "test", auto: true },
  ],
});

// Test setup for DemoBlaze application
async function setup(page: Page) {
  logging();
  const homePage = new HomePage(page);

  // Navigate to DemoBlaze home page
  await homePage.navigateToHome();

  // Verify page loads correctly
  await homePage.verifyPageLoad();
  await homePage.verifyNavigationElements();
}

// Test teardown
async function teardown(page: Page) {
  if (test.info().status !== test.info().expectedStatus) {
    console.log(`Did not run as expected, ended up at ${page.url()}`);
  }
  await logout(page);
  await closePageIfOpen(page);
}

// Logout from the web application if the user is logged in
async function logout(page: Page): Promise<void> {
  try {
    const homePage = new HomePage(page);
    await homePage.clickLogout();
  } catch (error) {
    console.error(`An error occurred during logout: ${error}`);
  }
}

// Close the page if it is open
async function closePageIfOpen(page: Page): Promise<void> {
  try {
    if (!page.isClosed()) {
      await page.close();
    }
  } catch (error) {
    console.error(`An error occurred while closing page: ${error}`);
  }
}
