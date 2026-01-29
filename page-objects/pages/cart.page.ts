import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "../base.page";
import { PageInfo } from "../../types/pageInfo.type";

export class CartPage extends BasePage {
  private static readonly CART_WAIT_TIMEOUT = 5000;
  private static readonly VERIFICATION_TIMEOUT = 10000;

  private cartItems!: Locator;
  private cartItemTitles!: Locator;
  private cartItemPrices!: Locator;
  private deleteButtons!: Locator;
  private totalPrice!: Locator;
  private placeOrderButton!: Locator;

  constructor(page: Page, pageInfo?: PageInfo) {
    super(page, pageInfo);
    this.setLocators(page);
  }

  setLocators(page: Page): void {
    this.cartItems = page.locator("#tbodyid tr");
    this.cartItemTitles = page.locator("#tbodyid tr td:nth-child(2)");
    this.cartItemPrices = page.locator("#tbodyid tr td:nth-child(3)");
    this.deleteButtons = page.getByRole("link", { name: "Delete" });
    this.totalPrice = page.locator("#totalp");
    this.placeOrderButton = page.getByRole("button", { name: "Place Order" });
  }

  async removeFirstItem(): Promise<void> {
    const initialCount = await this.getCartItemCount();
    await this.deleteButtons.first().click();

    await this.page.waitForFunction(
      (expectedCount) => {
        const tbody = document.querySelector("#tbodyid");
        if (!tbody) return true;
        const rows = tbody.querySelectorAll("tr");
        return rows.length < expectedCount;
      },
      initialCount,
      { timeout: CartPage.CART_WAIT_TIMEOUT },
    );
  }

  async clickPlaceOrder(): Promise<void> {
    await this.placeOrderButton.click();
  }

  // Getters
  async getCartItemCount(): Promise<number> {
    await this.page.waitForSelector("#tbodyid", { state: "attached" });
    return await this.cartItems.count();
  }

  async getCartItemTitle(index: number): Promise<string> {
    return await this.cartItemTitles.nth(index).innerText();
  }

  async getCartItemPrice(index: number): Promise<string> {
    return await this.cartItemPrices.nth(index).innerText();
  }

  async getTotalPrice(): Promise<string> {
    await this.waitForCartUpdate();
    return await this.totalPrice.innerText();
  }

  private async getAllCartItemDataByColumn(
    columnIndex: number,
  ): Promise<string[]> {
    const count = await this.getCartItemCount();
    const data: string[] = [];
    const locator =
      columnIndex === 2 ? this.cartItemTitles : this.cartItemPrices;

    for (let i = 0; i < count; i++) {
      data.push(await locator.nth(i).innerText());
    }
    return data;
  }

  async getAllCartItemTitles(): Promise<string[]> {
    return this.getAllCartItemDataByColumn(2);
  }

  async getAllCartItemPrices(): Promise<string[]> {
    return this.getAllCartItemDataByColumn(3);
  }

  // Verification methods
  async verifyItemsInCart(expectedCount: number): Promise<void> {
    await expect(async () => {
      const actualCount = await this.getCartItemCount();
      expect(actualCount).toBe(expectedCount);
    }).toPass({ timeout: CartPage.VERIFICATION_TIMEOUT });
  }

  async verifyCartIsEmpty(): Promise<void> {
    const itemCount = await this.getCartItemCount();
    expect(itemCount).toBe(0);
  }

  async verifyCartContainsProduct(productTitle: string): Promise<boolean> {
    try {
      await expect(async () => {
        const titles = await this.getAllCartItemTitles();
        const productFound = titles.some((title) =>
          title.toLowerCase().includes(productTitle.toLowerCase()),
        );
        expect(productFound).toBe(true);
      }).toPass({ timeout: CartPage.VERIFICATION_TIMEOUT });
      return true;
    } catch (error) {
      const titles = await this.getAllCartItemTitles();
      console.log(
        `Product "${productTitle}" not found. Available titles:`,
        titles,
      );
      return false;
    }
  }

  async verifyProductRemoved(originalCount: number): Promise<void> {
    await this.waitForItemRemoval(originalCount);
  }

  async verifyUpdatedTotalPrice(originalTotal: string): Promise<void> {
    const actualTotalText = await this.getTotalPrice();
    expect(parseFloat(actualTotalText)).toBeLessThan(parseFloat(originalTotal));
  }

  async verifyRemainingProducts(): Promise<void> {
    const itemCount = await this.getCartItemCount();
    expect(itemCount).toBeGreaterThan(0);
  }

  // Utility methods
  async calculateExpectedTotal(): Promise<number> {
    const prices = await this.getAllCartItemPrices();
    let total = 0;
    for (const price of prices) {
      const numericPrice = parseFloat(price.replace("$", ""));
      total += numericPrice;
    }
    return total;
  }

  async verifyTotalCalculation(): Promise<void> {
    const expectedTotal = await this.calculateExpectedTotal();
    const actualTotalText = await this.getTotalPrice();
    const actualTotal = parseFloat(actualTotalText);
    expect(actualTotal).toBe(expectedTotal);
  }

  async waitForCartUpdate(): Promise<void> {
    await expect(this.totalPrice).toBeVisible();
    await this.page.waitForFunction(
      () => {
        const totalElement = document.querySelector("#totalp");
        return (
          totalElement &&
          totalElement.textContent &&
          totalElement.textContent.trim() !== ""
        );
      },
      { timeout: CartPage.CART_WAIT_TIMEOUT },
    );
  }

  private async waitForCartRowCountChange(
    expectedCondition: (rowCount: number) => boolean,
  ): Promise<void> {
    try {
      await this.page.waitForFunction(
        (condition) => {
          const elements = document.querySelectorAll("#tbodyid tr");
          return condition(elements.length);
        },
        expectedCondition,
        { timeout: CartPage.CART_WAIT_TIMEOUT },
      );
    } catch (error) {
      await expect(async () => {
        const currentCount = await this.cartItems.count();
        expect(expectedCondition(currentCount)).toBe(true);
      }).toPass({ timeout: CartPage.CART_WAIT_TIMEOUT });
    }
  }

  async waitForItemRemoval(originalCount: number): Promise<void> {
    if (originalCount <= 0) {
      return;
    }
    await this.waitForCartRowCountChange(
      (currentCount) => currentCount < originalCount,
    );
  }

  async waitForItems(): Promise<void> {
    await this.page.waitForSelector("#tbodyid", { state: "attached" });

    try {
      await this.page.waitForFunction(
        () => {
          const tbody = document.querySelector("#tbodyid");
          if (!tbody) return false;

          const rows = tbody.querySelectorAll("tr");

          if (rows.length > 0) {
            const firstRow = rows[0];
            const cells = firstRow.querySelectorAll("td");
            return cells.length >= 4;
          }

          return true;
        },
        { timeout: CartPage.CART_WAIT_TIMEOUT },
      );
    } catch (error) {
      console.warn("Cart items wait timed out, proceeding with current state");
    }
  }
}
