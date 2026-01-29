import { test } from "../../fixtures/base.fixture";
import * as allure from "allure-js-commons";

test.describe("Priority 3: Cart & Product Management", () => {
  test(
    "Product Category Navigation - Phones",
    { tag: ["@all", "@priority3"] },
    async ({ homePage, apiRequest }) => {
      allure.epic("DemoBlaze Product Store Epic");
      allure.feature("Product Management");
      allure.story("Product Category Navigation - Phones");
      allure.description("Product browsing and filtering functionality");
      allure.severity("high");

      await allure.step(
        "From home page, click 'Phones' in categories sidebar",
        async () => {
          await homePage.clickPhonesCategory();
        },
      );

      await allure.step(
        "Verify only phone products are displayed",
        async () => {
          await homePage.verifyPhonesCategorySelected(apiRequest);
        },
      );

      await allure.step(
        "Verify each product displays: image, name, price",
        async () => {
          await homePage.verifyProductInformation();
        },
      );
    },
  );

  test(
    "Add Multiple Different Products to Cart",
    { tag: ["@all", "@priority3"] },
    async ({ homePage, productDetailPage, cartPage }) => {
      allure.epic("DemoBlaze Product Store Epic");
      allure.feature("Cart Management");
      allure.story("Add Multiple Different Products to Cart");
      allure.description("Multi-item cart management and price calculation");
      allure.severity("high");

      let phoneName: string;
      let laptopName: string;
      let monitorName: string;

      await allure.step("Add a phone product to cart", async () => {
        await homePage.clickPhonesCategory();
        await homePage.clickFirstProduct();
        phoneName = await productDetailPage.getProductName();
        await productDetailPage.addProductToCart();
      });

      await allure.step("Add a laptop product to cart", async () => {
        await homePage.navigateToHome();
        await homePage.clickLaptopsCategory();
        await homePage.clickFirstProduct();
        laptopName = await productDetailPage.getProductName();
        await productDetailPage.addProductToCart();
      });

      await allure.step("Add a monitor product to cart", async () => {
        await homePage.navigateToHome();
        await homePage.clickMonitorsCategory();
        await homePage.clickFirstProduct();
        monitorName = await productDetailPage.getProductName();
        await productDetailPage.addProductToCart();
      });

      await allure.step("Navigate to cart page", async () => {
        await homePage.clickCartLink();
      });

      await allure.step(
        "Verify all three products are listed correctly",
        async () => {
          await cartPage.verifyItemsInCart(3);
          await cartPage.verifyCartContainsProduct(phoneName);
          await cartPage.verifyCartContainsProduct(laptopName);
          await cartPage.verifyCartContainsProduct(monitorName);
        },
      );

      await allure.step(
        "Verify total price calculation is accurate",
        async () => {
          await cartPage.verifyTotalCalculation();
        },
      );
    },
  );

  test(
    "Remove Product from Cart",
    { tag: ["@all", "@priority3"] },
    async ({ homePage, productDetailPage, cartPage }) => {
      allure.epic("DemoBlaze Product Store Epic");
      allure.feature("Cart Management");
      allure.story("Remove Product from Cart");
      allure.description("Cart modification and management");
      allure.severity("high");

      let originalCount: number;
      let originalTotal: string;

      await allure.step("Add multiple products to cart", async () => {
        // Add first product
        await homePage.clickFirstProduct();
        await productDetailPage.addProductToCart();

        // Add second product
        await homePage.navigateToHome();
        await homePage.clickProductByIndex(2);
        await productDetailPage.addProductToCart();
      });

      await allure.step("Navigate to cart page", async () => {
        await homePage.clickCartLink();
      });

      await allure.step("Click 'Delete' for one specific product", async () => {
        originalCount = await cartPage.getCartItemCount();
        originalTotal = await cartPage.getTotalPrice();
        await cartPage.removeFirstItem();
      });

      await allure.step("Verify product removes immediately", async () => {
        await cartPage.verifyProductRemoved(originalCount);
      });

      await allure.step(
        "Verify total price updates automatically",
        async () => {
          await cartPage.verifyUpdatedTotalPrice(originalTotal);
        },
      );

      await allure.step("Verify remaining products stay in cart", async () => {
        await cartPage.verifyRemainingProducts();
      });
    },
  );
});
