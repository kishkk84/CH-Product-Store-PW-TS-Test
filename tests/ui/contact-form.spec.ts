import { test } from "../../fixtures/base.fixture";
import * as allure from "allure-js-commons";

test.describe("Contact Form Functionality", () => {
  test(
    "Contact Form Functionality",
    { tag: ["@all", "@priority3"] },
    async ({ homePage, contactModal }) => {
      allure.epic("DemoBlaze Product Store Epic");
      allure.feature("Contact & About");
      allure.story("Contact Form Functionality");
      allure.description(
        "Contact modal opens and displays properly, all form fields accept valid input, message sends successfully",
      );
      allure.severity("medium");

      await allure.step("Click 'Contact' in navigation menu", async () => {
        await homePage.clickContactLink();
      });

      await allure.step("Verify contact modal opens correctly", async () => {
        await contactModal.verifyModalIsOpen();
      });

      await allure.step(
        "Verify fields present: Contact Email, Contact Name, Message",
        async () => {
          await contactModal.verifyContactFormFields();
          await contactModal.verifyModalTitle();
        },
      );

      await allure.step("Fill all fields with valid test data", async () => {
        await contactModal.fillContactForm();
      });

      await allure.step("Click 'Send message' button", async () => {
        await contactModal.sendMessage();
      });
    },
  );
});
