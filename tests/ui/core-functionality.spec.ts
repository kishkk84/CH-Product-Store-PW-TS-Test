import { expect, test } from "../../fixtures/base.fixture";
import * as allure from "allure-js-commons";

test.describe("Priority 1: Core Functionality & User Journeys", () => {
  test(
    "Page Load and Layout Verification",
    { tag: ["@all", "@priority1"] },
    async ({ homePage }) => {
      allure.epic("DemoBlaze Product Store Epic");
      allure.feature("Core Functionality");
      allure.story("Page Load and Layout Verification");
      allure.description(
        "Ensures the application loads properly and all essential UI elements are present",
      );
      allure.severity("critical");

      await allure.step("Verify page title contains 'STORE'", async () => {
        await homePage.verifyPageLoad();
      });

      await allure.step(
        "Verify header navigation displays: PRODUCT STORE, Home, Contact, About us, Cart, Log in, Sign up",
        async () => {
          await homePage.verifyNavigationElements();
        },
      );

      await allure.step(
        "Verify categories sidebar shows: Phones, Laptops, Monitors",
        async () => {
          await homePage.verifyCategorySidebar();
        },
      );

      await allure.step(
        "Verify product carousel/grid displays products",
        async () => {
          await homePage.verifyProductGrid();
        },
      );

      await allure.step("Verify footer information is present", async () => {
        await homePage.verifyFooter();
      });
    },
  );

  test(
    "Add Product to Cart (Guest User)",
    { tag: ["@all", "@priority1"] },
    async ({ homePage, productDetailPage, cartPage }) => {
      allure.epic("DemoBlaze Product Store Epic");
      allure.feature("Core E-commerce Functionality");
      allure.story("Add Product to Cart (Guest User)");
      allure.description(
        "Core e-commerce functionality that doesn't require authentication",
      );
      allure.severity("critical");

      let alertMessage: string;
      let productName: string;

      await allure.step("Navigate to any product detail page", async () => {
        await homePage.clickFirstProduct();
      });

      await allure.step("Click 'Add to cart' button", async () => {
        productName = await productDetailPage.getProductName();
        alertMessage = await productDetailPage.addProductToCart();
      });

      await allure.step("Verify success alert message appears", async () => {
        expect(alertMessage).toContain("Product added");
      });

      await allure.step(
        "Navigate to cart page via navigation menu",
        async () => {
          await homePage.clickCartLink();
        },
      );

      await allure.step(
        "Verify product appears in cart with correct details",
        async () => {
          expect(await cartPage.verifyCartContainsProduct(productName)).toBe(
            true,
          );
        },
      );
    },
  );

  test(
    "Complete Purchase Flow - Valid Order",
    { tag: ["@all", "@priority1"] },
    async ({
      homePage,
      loginModal,
      productDetailPage,
      cartPage,
      placeOrderModal,
      confirmationAlert,
    }) => {
      allure.epic("DemoBlaze Product Store Epic");
      allure.feature("Purchase Flow");
      allure.story("Complete Purchase Flow - Valid Order");
      allure.description(
        "End-to-end purchase process - the primary business goal",
      );
      allure.severity("critical");

      await allure.step("Log in to system with valid credentials", async () => {
        await homePage.clickLoginLink();
        await loginModal.loginWithCredentials(
          process.env.USERNAME as string,
          process.env.PASSWORD as string,
        );
      });

      await allure.step("Add products to cart", async () => {
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

      await allure.step("Click 'Place Order' button", async () => {
        await cartPage.clickPlaceOrder();
      });

      await allure.step("Verify order form modal opens", async () => {
        await placeOrderModal.verifyModalIsOpen();
      });

      await allure.step(
        "Fill all required fields with valid data in place order modal",
        async () => {
          await placeOrderModal.fillValidPurchaseForm();
        },
      );

      await allure.step("Click 'Purchase' button", async () => {
        await placeOrderModal.clickPurchaseButton();
      });

      await allure.step("Verify order confirmation message", async () => {
        await placeOrderModal.verifyOrderConfirmationDetails();
      });

      await allure.step(
        "Close order confirmation and check if cart clears after purchase",
        async () => {
          await confirmationAlert.closeOrderConfirmation();
          await homePage.clickCartLink();
          await cartPage.verifyCartIsEmpty();
        },
      );
    },
  );
});
