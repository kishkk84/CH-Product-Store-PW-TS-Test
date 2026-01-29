import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "../base.page";
import { PageInfo } from "../../types/pageInfo.type";
import { PlaceOrderModal } from "../../page-objects/modals/place-order.modal";

export class ConfirmationAlert extends BasePage {
  private static readonly PURCHASE_THANK_YOU_TEXT =
    "Thank you for your purchase!";

  private alert!: Locator;
  private confirmationTitle!: Locator;
  private confirmationOkButton!: Locator;
  private orderId!: Locator;
  private orderAmount!: Locator;
  private orderCardNumber!: Locator;
  private orderName!: Locator;
  private orderDate!: Locator;

  constructor(page: Page, pageInfo?: PageInfo) {
    super(page, pageInfo);
    this.setLocators(page);
  }

  setLocators(page: Page): void {
    this.alert = page
      .locator(".sweet-alert")
      .or(
        page.locator(
          `[role="dialog"]:has-text("${ConfirmationAlert.PURCHASE_THANK_YOU_TEXT}")`,
        ),
      );
    this.confirmationTitle = page.getByText(
      ConfirmationAlert.PURCHASE_THANK_YOU_TEXT,
    );
    this.confirmationOkButton = page.getByRole("button", { name: "OK" });
    this.orderId = page.getByText(/Id: \d+/);
    this.orderAmount = page.getByText(/Amount: \d+ USD/);
    this.orderCardNumber = page.getByText(/Card Number: \d+/);
    this.orderName = page.getByText(/Name: .+/);
    this.orderDate = page.getByText(/Date: \d+\/\d+\/\d+/);
  }

  async getAlert(): Promise<Locator> {
    return this.alert;
  }

  // Helper methods for verification
  private async verifyOrderDetailsVisible(): Promise<void> {
    const orderElements = [
      this.orderId,
      this.orderAmount,
      this.orderCardNumber,
      this.orderName,
      this.orderDate,
    ];

    for (const element of orderElements) {
      await expect(element).toBeVisible();
    }
  }

  private async verifyAlertAndTitle(): Promise<void> {
    await expect(this.alert).toBeVisible();
    await expect(this.confirmationTitle).toBeVisible();
    await expect(this.confirmationTitle).toContainText(
      ConfirmationAlert.PURCHASE_THANK_YOU_TEXT,
    );
  }

  async verifyOrderConfirmation(): Promise<void> {
    await this.verifyAlertAndTitle();
    await this.verifyOrderDetailsVisible();
  }

  async getOrderConfirmationText(): Promise<string> {
    await this.verifyOrderConfirmation();
    return (await this.alert.textContent()) || "";
  }

  async closeOrderConfirmation(): Promise<void> {
    await this.confirmationOkButton.click();
    await expect(this.alert).not.toBeVisible();
    await this.handleRemainingModal();
  }

  private async handleRemainingModal(): Promise<void> {
    try {
      const placeOrderModal = new PlaceOrderModal(this.page);
      const purchaseButton = await placeOrderModal.getPurchaseButton();

      if (await purchaseButton.isVisible()) {
        await purchaseButton.click();
        await this.confirmationOkButton.click();
        await expect(this.alert).not.toBeVisible();
      }
    } catch (error) {
      console.warn("PlaceOrderModal handling failed, continuing:", error);
    }
  }
}
