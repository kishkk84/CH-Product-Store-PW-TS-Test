import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "../base.page";
import { PageInfo } from "../../types/pageInfo.type";

export class ProductDetailPage extends BasePage {
  private productImage!: Locator;
  private productName!: Locator;
  private productPrice!: Locator;
  private addToCartButton!: Locator;

  constructor(page: Page, pageInfo?: PageInfo) {
    super(page, pageInfo);
    this.setLocators(page);
  }

  setLocators(page: Page): void {
    this.productImage = page.locator(".item img");
    this.productName = page.locator(".name");
    this.productPrice = page.locator(".price-container");
    this.addToCartButton = page.getByRole("link", { name: "Add to cart" });
  }

  // Actions
  async addProductToCart(): Promise<string> {
    let alertMessage = "";
    const dialogPromise = this.page.waitForEvent("dialog", {
      timeout: 5000,
    });

    this.page.once("dialog", (dialog) => {
      alertMessage = dialog.message();
      dialog.accept();
    });

    await this.addToCartButton.click();
    await dialogPromise;
    return alertMessage;
  }

  // Getters
  async getProductName(): Promise<string> {
    return await this.productName.innerText();
  }

  async getProductPrice(): Promise<string> {
    return await this.productPrice.innerText();
  }

  async isProductImageLoaded(): Promise<boolean> {
    const src = await this.productImage.getAttribute("src");
    return src !== null && src.length > 0;
  }

  // Verification methods
  async verifyProductDetailsVisible(): Promise<void> {
    await expect(this.productImage).toBeVisible();
    await expect(this.productName).toBeVisible();
    await expect(this.productPrice).toBeVisible();
    await expect(this.addToCartButton).toBeVisible();
  }

  async verifyProductHasValidImage(): Promise<void> {
    await expect(this.productImage).toBeVisible();
    const isLoaded = await this.isProductImageLoaded();
    expect(isLoaded).toBe(true);
  }

  async verifyProductHasValidPrice(): Promise<void> {
    const priceText = await this.getProductPrice();
    expect(priceText).not.toBe("");
    expect(priceText).toMatch(/\$?\d+(\.\d{2})?/);
  }

  async verifyProductHasName(): Promise<void> {
    const nameText = await this.getProductName();
    expect(nameText).not.toBe("");
    expect(nameText.length).toBeGreaterThan(0);
  }
}
