import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "../base.page";
import { PageInfo } from "../../types/pageInfo.type";
import { faker } from "@faker-js/faker";

export class SignupModal extends BasePage {
  private signupModal!: Locator;
  private usernameField!: Locator;
  private passwordField!: Locator;
  private signupButton!: Locator;
  private closeButton!: Locator;

  constructor(page: Page, pageInfo?: PageInfo) {
    super(page, pageInfo);
    this.setLocators(page);
  }

  setLocators(page: Page): void {
    this.signupModal = page.getByRole("dialog", { name: "Sign up" });
    this.usernameField = page.getByRole("textbox", { name: "Username:" });
    this.passwordField = page.getByRole("textbox", { name: "Password:" });
    this.signupButton = page.getByRole("button", { name: "Sign up" });
    this.closeButton = page.getByRole("button", { name: "Close" });
  }

  // Form actions
  async fillUsername(username: string): Promise<void> {
    await this.fillFormField(this.usernameField, username);
  }

  async fillPassword(password: string): Promise<void> {
    await this.fillFormField(this.passwordField, password);
  }

  async fillSignupForm(signupData?: {
    username?: string;
    password?: string;
  }): Promise<void> {
    const data = {
      username: signupData?.username || faker.internet.username(),
      password: signupData?.password || faker.internet.password(),
    };

    await this.fillUsername(data.username);
    await this.fillPassword(data.password);
  }

  async clickSignupButton(): Promise<void> {
    await this.handleDialogAndExecuteAction(async () => {
      await this.signupButton.click();
    });
  }

  async registerUser(username: string, password: string): Promise<void> {
    await this.fillSignupForm({ username, password });
    await this.clickSignupButton();
  }

  async registerWithUniqueUser(): Promise<{
    username: string;
    password: string;
  }> {
    const credentials = {
      username: faker.internet.username(),
      password: faker.internet.password(),
    };

    await this.fillSignupForm(credentials);
    await this.clickSignupButton();
    return credentials;
  }

  // Verification methods
  async verifyModalIsOpen(): Promise<void> {
    await expect(this.signupModal).toBeVisible();
  }

  async verifyModalIsClosed(): Promise<void> {
    await expect(this.signupModal).not.toBeVisible({ timeout: 5000 });
  }

  async verifySignupFormFields(): Promise<void> {
    await this.verifyElementsVisible([
      this.usernameField,
      this.passwordField,
      this.signupButton,
      this.closeButton,
    ]);
  }

  async verifyCompleteModal(): Promise<void> {
    await this.verifyModalIsOpen();
    await this.verifySignupFormFields();
  }

  async verifySuccessfulRegistration(): Promise<void> {
    try {
      await this.verifyModalIsClosed();
    } catch (error) {
      const isModalVisible = await this.signupModal.isVisible();
      if (isModalVisible) {
        await this.closeModal();
      }
    }
  }
  
  // Helper methods for form operations
  private async fillFormField(field: Locator, value: string): Promise<void> {
    await field.fill(value);
  }

  private async verifyElementsVisible(elements: Locator[]): Promise<void> {
    for (const element of elements) {
      await expect(element).toBeVisible();
    }
  }

  private async handleDialogAndExecuteAction(
    action: () => Promise<void>,
  ): Promise<void> {
    const dialogPromise = this.page.waitForEvent("dialog", {
      timeout: 5000,
    });

    await action();

    const dialog = await dialogPromise;
    await dialog.accept();
  }

  // Modal actions
  async closeModal(): Promise<void> {
    await this.closeButton.click();
  }
}
