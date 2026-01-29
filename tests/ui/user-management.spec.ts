import { test } from "../../fixtures/base.fixture";
import * as allure from "allure-js-commons";

test.describe("Priority 2: Essential User Management", () => {
  test(
    "User Registration - Login with new credentials",
    { tag: ["@all"] },
    async ({ homePage, signupModal, loginModal }) => {
      allure.epic("DemoBlaze Product Store Epic");
      allure.feature("Registration Feature");
      allure.story("User Registration Story");
      allure.description(
        "Test to register a new user in the DemoBlaze product store.",
      );
      allure.severity("critical");

      let userCredentials: { username: string; password: string };

      await allure.step("Open Signup Modal", async () => {
        await homePage.clickSignupLink();
        await signupModal.verifyModalIsOpen();
      });

      await allure.step("Register New User", async () => {
        try {
          userCredentials = await signupModal.registerWithUniqueUser();
          await signupModal.verifySuccessfulRegistration();
        } catch (error) {
          console.error("Registration failed:", error);
          throw error;
        }
      });

      await allure.step("Open Login Modal", async () => {
        await homePage.clickLoginLink();
        await loginModal.verifyModalIsOpen();
      });

      await allure.step("Login with New Credentials", async () => {
        if (!userCredentials) {
          throw new Error(
            "User credentials are undefined. Registration may have failed.",
          );
        }
        await loginModal.loginWithCredentials(
          userCredentials.username,
          userCredentials.password,
        );
      });

      await allure.step("Verify Successful Login", async () => {
        await loginModal.verifySuccessfulLogin(userCredentials.username);
      });
    },
  );

  test(
    "User Login - Existing valid credentials",
    { tag: ["@all", "@priority2"] },
    async ({ homePage, loginModal }) => {
      allure.epic("DemoBlaze Product Store Epic");
      allure.feature("User Management");
      allure.story("User Login - Valid Credentials");
      allure.description("User authentication and session management");
      allure.severity("critical");

      await allure.step("Click 'Log in' in navigation menu", async () => {
        await homePage.clickLoginLink();
      });

      await allure.step("Verify login modal opens correctly", async () => {
        await loginModal.verifyModalIsOpen();
      });

      await allure.step(
        "Enter valid username and corresponding password",
        async () => {
          await loginModal.fillLoginForm(
            process.env.USERNAME as string,
            process.env.PASSWORD as string,
          );
        },
      );

      await allure.step("Click 'Log in' button", async () => {
        await loginModal.clickLoginButton();
      });

      await allure.step(
        "Verify successful login state (username in nav)",
        async () => {
          await loginModal.verifySuccessfulLogin(
            process.env.USERNAME as string,
          );
        },
      );
    },
  );
});
