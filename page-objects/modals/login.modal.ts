import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "../base.page";
import { PageInfo } from "../../types/pageInfo.type";

export class LoginModal extends BasePage {
  private static readonly LOGIN_TEXT = "Log in";
  private static readonly DIALOG_TIMEOUT = 3000;

  private loginModal!: Locator;
  private usernameField!: Locator;
  private passwordField!: Locator;
  private loginButton!: Locator;
  private usernameDisplay!: Locator;

  constructor(page: Page, pageInfo?: PageInfo) {
    super(page, pageInfo);
    this.setLocators(page);
  }

  setLocators(page: Page): void {
    this.loginModal = page.getByRole("dialog", { name: LoginModal.LOGIN_TEXT });
    this.usernameField = page.locator("#loginusername");
    this.passwordField = page.locator("#loginpassword");
    this.loginButton = page.getByRole("button", {
      name: LoginModal.LOGIN_TEXT,
    });
    this.usernameDisplay = page.locator("#nameofuser");
  }

  // Form actions
  async fillUsername(username: string): Promise<void> {
    await this.verifyElementVisibleAndFill(this.usernameField, username);
  }

  async fillPassword(password: string): Promise<void> {
    await this.verifyElementVisibleAndFill(this.passwordField, password);
  }

  async fillLoginForm(username: string, password: string): Promise<void> {
    await this.waitForModalToBeReady();
    await this.fillUsername(username);
    await this.fillPassword(password);
  }

  async clickLoginButton(): Promise<void> {
    await this.loginButton.click();

    try {
      await Promise.race([
        this.page.waitForEvent("dialog", {
          timeout: LoginModal.DIALOG_TIMEOUT,
        }),
        this.loginModal.waitFor({
          state: "hidden",
          timeout: LoginModal.DIALOG_TIMEOUT,
        }),
      ]);
    } catch (error) {
      throw new Error(
        "Neither alert nor modal close detected after clicking login button.",
      );
    }
  }

  async loginWithCredentials(
    username: string,
    password: string,
  ): Promise<void> {
    await this.fillLoginForm(username, password);
    await this.clickLoginButton();
  }

  // Verification methods
  async verifyModalIsOpen(): Promise<void> {
    await expect(this.loginModal).toBeVisible();
  }

  async verifyModalIsClosed(): Promise<void> {
    await expect(this.loginModal).not.toBeVisible({ timeout: 5000 });
  }

  async verifyLoginFormFields(): Promise<void> {
    await this.verifyElementsVisible([
      this.usernameField,
      this.passwordField,
      this.loginButton,
    ]);
  }

  async verifySuccessfulLogin(expectedUsername: string): Promise<void> {
    await expect(this.usernameDisplay).toContainText(expectedUsername, {
      timeout: 10000,
    });
    await this.verifyModalIsClosed();
  }

  async verifyCompleteModal(): Promise<void> {
    await this.verifyModalIsOpen();
    await this.verifyLoginFormFields();
  }

  private async verifyElementsVisible(elements: Locator[]): Promise<void> {
    for (const element of elements) {
      await expect(element).toBeVisible();
    }
  }

  private async verifyElementVisibleAndFill(
    element: Locator,
    value: string,
  ): Promise<void> {
    await expect(element).toBeVisible();
    await element.fill(value);
  }

  async waitForModalToBeReady(): Promise<void> {
    await this.verifyElementsVisible([
      this.loginModal,
      this.usernameField,
      this.passwordField,
    ]);
    await expect(this.loginButton).toBeEnabled();
  }
}
