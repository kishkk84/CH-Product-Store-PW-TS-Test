import { test } from "../../fixtures/base.fixture";
import * as allure from "allure-js-commons";

test.describe("Priority 4: Validation & Security", () => {
  test(
    "Purchase Order - Field Validation",
    { tag: ["@all", "@priority4"] },
    async ({ homePage, productDetailPage, cartPage, placeOrderModal }) => {
      allure.epic("DemoBlaze Product Store Epic");
      allure.feature("Validation & Security");
      allure.story("Purchase Order - Field Validation");
      allure.description("Form validation and error handling in checkout");
      allure.severity("high");

      await allure.step(
        "Add products to cart, proceed to order form",
        async () => {
          await homePage.clickFirstProduct();
          await productDetailPage.addProductToCart();
          await homePage.clickCartLink();
          await cartPage.clickPlaceOrder();
        },
      );

      await allure.step(
        "Verify appropriate validation messages - Empty field",
        async () => {
          await placeOrderModal.testEmptyFieldValidation();
        },
      );
    },
  );
});
