import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "../base.page";
import { PageInfo } from "../../types/pageInfo.type";
import { faker } from "@faker-js/faker";
import { ConfirmationAlert } from "../../page-objects/alerts/confirmation.alert";

export class PlaceOrderModal extends BasePage {
  private title!: Locator;
  private nameField!: Locator;
  private countryField!: Locator;
  private cityField!: Locator;
  private cardField!: Locator;
  private monthField!: Locator;
  private yearField!: Locator;
  private purchaseButton!: Locator;

  constructor(page: Page, pageInfo?: PageInfo) {
    super(page, pageInfo);
    this.setLocators(page);
  }

  setLocators(page: Page): void {
    this.title = page.getByRole("dialog", { name: "Place order" });
    this.nameField = page.locator("#name");
    this.countryField = page.getByRole("textbox", { name: "Country:" });
    this.cityField = page.getByRole("textbox", { name: "City:" });
    this.cardField = page.getByRole("textbox", { name: "Credit card:" });
    this.monthField = page.getByRole("textbox", { name: "Month:" });
    this.yearField = page.getByRole("textbox", { name: "Year:" });
    this.purchaseButton = page.getByRole("button", { name: "Purchase" });
  }

  async getPurchaseButton(): Promise<Locator> {
    return this.purchaseButton;
  }

  // Form actions
  async fillName(name: string): Promise<void> {
    await this.fillFormField(this.nameField, name);
  }

  async fillCountry(country: string): Promise<void> {
    await this.fillFormField(this.countryField, country);
  }

  async fillCity(city: string): Promise<void> {
    await this.fillFormField(this.cityField, city);
  }

  async fillCreditCard(cardNumber: string): Promise<void> {
    await this.fillFormField(this.cardField, cardNumber);
  }

  async fillMonth(month: string): Promise<void> {
    await this.fillFormField(this.monthField, month);
  }

  async fillYear(year: string): Promise<void> {
    await this.fillFormField(this.yearField, year);
  }

  async fillPurchaseForm(purchaseData?: {
    name?: string;
    country?: string;
    city?: string;
    card?: string;
    month?: string;
    year?: string;
  }): Promise<void> {
    const data = {
      name: purchaseData?.name || faker.person.fullName(),
      country: purchaseData?.country || faker.location.country(),
      city: purchaseData?.city || faker.location.city(),
      card: purchaseData?.card || faker.finance.creditCardNumber(),
      month: purchaseData?.month || this.generateCurrentMonth(),
      year: purchaseData?.year || this.generateFutureYear(),
    };

    await this.fillName(data.name);
    await this.fillCountry(data.country);
    await this.fillCity(data.city);
    await this.fillCreditCard(data.card);
    await this.fillMonth(data.month);
    await this.fillYear(data.year);
  }

  async fillValidPurchaseForm(): Promise<void> {
    await this.fillPurchaseForm();
  }

  async clearPurchaseForm(): Promise<void> {
    const fields = [
      this.nameField,
      this.countryField,
      this.cityField,
      this.cardField,
      this.monthField,
      this.yearField,
    ];
    for (const field of fields) {
      await this.clearFormField(field);
    }
  }

  async clickPurchaseButton(): Promise<void> {
    await this.purchaseButton.click();
    await expect(
      await new ConfirmationAlert(this.page).getAlert(),
    ).toBeVisible();
  }

  // Verification methods
  async verifyModalIsOpen(): Promise<void> {
    await expect(this.title).toBeVisible();
  }

  async verifyOrderConfirmationDetails(alertMessage?: string): Promise<void> {
    if (alertMessage) {
      const expectedDetails = [
        "Thank you for your purchase!",
        "Id",
        "Amount",
        "Card Number",
        "Name",
        "Date",
      ];
      for (const detail of expectedDetails) {
        expect(alertMessage).toContain(detail);
      }
    }
  }

  // Helper method for dialog verification
  private async handleDialogAndVerifyMessage(
    expectedMessage: string,
  ): Promise<void> {
    let dialogSeen = false;

    this.page.once("dialog", async (dialog) => {
      dialogSeen = true;
      expect(dialog.message()).toBe(expectedMessage);
      await dialog.accept();
    });

    await this.purchaseButton.click();
    expect(dialogSeen).toBe(true);
  }

  async testEmptyFieldValidation(): Promise<void> {
    const fieldsToTest = [
      { name: "name", fillEmpty: () => this.fillName("") },
      { name: "card", fillEmpty: () => this.fillCreditCard("") },
    ];

    for (const field of fieldsToTest) {
      await this.fillValidPurchaseForm();
      await field.fillEmpty();
      await this.verifyAlertMessage("Please fill out Name and Creditcard.");
    }
  }

  async verifyAlertMessage(alertMessage: string): Promise<void> {
    await this.handleDialogAndVerifyMessage(alertMessage);
  }

  // Helper methods for date generation
  private generateCurrentMonth(): string {
    return (new Date().getMonth() + 1).toString().padStart(2, "0");
  }

  private generateFutureYear(): string {
    return (new Date().getFullYear() + 2).toString();
  }

  // Helper method for form field operations
  private async fillFormField(field: Locator, value: string): Promise<void> {
    await field.fill(value);
  }

  private async clearFormField(field: Locator): Promise<void> {
    await field.clear();
  }
}
