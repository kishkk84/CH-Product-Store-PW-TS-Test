import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "../base.page";
import { PageInfo } from "../../types/pageInfo.type";
import { faker } from "@faker-js/faker";

export class ContactModal extends BasePage {
  private static readonly MODAL_TITLE_TEXT = "New message";

  private contactModal!: Locator;
  private emailField!: Locator;
  private nameField!: Locator;
  private messageField!: Locator;
  private sendMessageButton!: Locator;
  private modalTitle!: Locator;

  constructor(page: Page, pageInfo?: PageInfo) {
    super(page, pageInfo);
    this.setLocators(page);
  }

  setLocators(page: Page): void {
    this.contactModal = page.locator("#exampleModal");
    this.emailField = page.locator("#recipient-email");
    this.nameField = page.locator("#recipient-name");
    this.messageField = page.getByRole("textbox", { name: "Message:" });
    this.sendMessageButton = page.getByRole("button", { name: "Send message" });
    this.modalTitle = page.getByRole("heading", {
      name: ContactModal.MODAL_TITLE_TEXT,
    });
  }

  // Form actions
  async fillEmail(email: string): Promise<void> {
    await this.emailField.fill(email);
  }

  async fillName(name: string): Promise<void> {
    await this.nameField.fill(name);
  }

  async fillMessage(message: string): Promise<void> {
    await this.messageField.fill(message);
  }

  async fillContactForm(contactData?: {
    email?: string;
    name?: string;
    message?: string;
  }): Promise<void> {
    const data = {
      email: contactData?.email || faker.internet.email(),
      name: contactData?.name || faker.person.fullName(),
      message: contactData?.message || faker.lorem.sentence(),
    };

    await this.fillEmail(data.email);
    await this.fillName(data.name);
    await this.fillMessage(data.message);
  }

  async clickSendMessage(): Promise<void> {
    await this.sendMessageButton.click();
  }

  // Helper method for dialog handling
  private async handleDialogAndExecuteAction(
    action: () => Promise<void>,
  ): Promise<string> {
    let alertMessage = "";
    const dialogPromise = this.page.waitForEvent("dialog", {
      timeout: 5000,
    });

    this.page.once("dialog", (dialog) => {
      alertMessage = dialog.message();
      dialog.accept();
    });

    await action();
    await dialogPromise;
    return alertMessage;
  }

  async sendMessage(): Promise<string> {
    return this.handleDialogAndExecuteAction(async () => {
      await this.fillContactForm();
      await this.clickSendMessage();
    });
  }

  async attemptSendWithEmptyFields(): Promise<string> {
    return this.handleDialogAndExecuteAction(async () => {
      await this.clickSendMessage();
    });
  }

  // Helper method for verification
  private async verifyElementsVisible(elements: Locator[]): Promise<void> {
    for (const element of elements) {
      await expect(element).toBeVisible();
    }
  }

  async verifyModalIsOpen(): Promise<void> {
    await expect(this.contactModal).toBeVisible();
  }

  async verifyContactFormFields(): Promise<void> {
    await this.verifyElementsVisible([
      this.emailField,
      this.nameField,
      this.messageField,
      this.sendMessageButton,
    ]);
  }

  async verifyModalTitle(): Promise<void> {
    await expect(this.modalTitle).toContainText(ContactModal.MODAL_TITLE_TEXT);
  }

  async verifyCompleteModal(): Promise<void> {
    await this.verifyModalIsOpen();
    await this.verifyModalTitle();
    await this.verifyContactFormFields();
  }
}
