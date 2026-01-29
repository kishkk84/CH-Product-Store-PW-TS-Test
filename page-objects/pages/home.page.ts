import { APIRequestContext, expect, Locator, Page } from "@playwright/test";
import { BasePage } from "../base.page";
import { PageInfo } from "../../types/pageInfo.type";

export class HomePage extends BasePage {
  // Navigation elements
  private navbar!: Locator;
  private brandLogo!: Locator;
  private homeLink!: Locator;
  private contactLink!: Locator;
  private aboutLink!: Locator;
  private cartLink!: Locator;
  private loginLink!: Locator;
  private signupLink!: Locator;
  private logoutLink!: Locator;

  // Category navigation
  private categoriesSection!: Locator;
  private phonesCategory!: Locator;
  private laptopsCategory!: Locator;
  private monitorsCategory!: Locator;

  // Product grid
  private productGrid!: Locator;
  private productCards!: Locator;
  private productTitles!: Locator;
  private productPrices!: Locator;
  private productLinks!: Locator;

  // Footer
  private footer!: Locator;

  constructor(page: Page, pageInfo?: PageInfo) {
    super(page, pageInfo);
    this.setLocators(page);
  }

  setLocators(page: Page): void {
    // Navigation elements
    this.navbar = page.locator("nav.navbar");
    this.brandLogo = page.locator("a.navbar-brand");
    this.homeLink = page.getByRole("link", { name: "Home" });
    this.contactLink = page.getByRole("link", { name: "Contact", exact: true });
    this.aboutLink = page.getByRole("link", { name: "About us" });
    this.cartLink = page.getByRole("link", { name: "Cart", exact: true });
    this.loginLink = page.getByRole("link", { name: "Log in" });
    this.signupLink = page.getByRole("link", { name: "Sign up" });
    this.logoutLink = page.getByRole("link", { name: "Log out" });

    // Category navigation
    this.categoriesSection = page.getByRole("link", { name: "CATEGORIES" });
    this.phonesCategory = page.getByRole("link", { name: "Phones" });
    this.laptopsCategory = page.getByRole("link", { name: "Laptops" });
    this.monitorsCategory = page.getByRole("link", { name: "Monitors" });

    // Product grid
    this.productGrid = page.locator("#tbodyid");
    this.productCards = page.locator("#tbodyid .card");
    this.productTitles = page.locator("#tbodyid .card .card-title");
    this.productPrices = page.locator("#tbodyid .card h5");
    this.productLinks = page.locator(".hrefch");

    // Footer
    this.footer = page.locator("#footc");
  }

  // Navigation actions
  async navigateToHome(): Promise<void> {
    await this.page.goto(process.env.BASE_URL as string);
  }

  async clickContactLink(): Promise<void> {
    await this.contactLink.click();
  }

  async clickCartLink(): Promise<void> {
    await this.cartLink.click();
  }

  async clickLoginLink(): Promise<void> {
    await this.loginLink.click();
  }

  async clickSignupLink(): Promise<void> {
    await this.signupLink.click();
  }

  async clickLogout(): Promise<void> {
    if (await this.logoutLink.isVisible()) {
      await this.logoutLink.click();
      await this.verifyUserLoggedOut();
    }
  }

  // Category navigation
  private async clickCategoryAndWaitForProducts(
    categoryLocator: Locator,
  ): Promise<void> {
    await categoryLocator.click();
    await expect(this.productCards.first()).toBeVisible();
  }

  async clickPhonesCategory(): Promise<void> {
    await this.clickCategoryAndWaitForProducts(this.phonesCategory);
  }

  async clickLaptopsCategory(): Promise<void> {
    await this.clickCategoryAndWaitForProducts(this.laptopsCategory);
  }

  async clickMonitorsCategory(): Promise<void> {
    await this.clickCategoryAndWaitForProducts(this.monitorsCategory);
  }

  // Product interactions
  async clickProductByIndex(index: number): Promise<void> {
    await this.productLinks.nth(index).click();
  }

  async clickFirstProduct(): Promise<void> {
    await this.clickProductByIndex(0);
  }

  async getProductCount(): Promise<number> {
    return await this.productCards.count();
  }

  // Helper methods for verification
  private async verifyElementsVisible(elements: Locator[]): Promise<void> {
    for (const element of elements) {
      await expect(element).toBeVisible();
    }
  }

  private async verifyElementsContainText(
    elementTextPairs: Array<{ element: Locator; text: string }>,
  ): Promise<void> {
    for (const pair of elementTextPairs) {
      await expect(pair.element).toContainText(pair.text);
    }
  }

  // Verification methods
  async verifyPageLoad(): Promise<void> {
    await expect(this.page).toHaveTitle(/STORE/);
    await expect(this.navbar).toBeVisible();
    await expect(this.brandLogo).toContainText("PRODUCT STORE");
  }

  async verifyNavigationElements(): Promise<void> {
    await this.verifyElementsContainText([
      { element: this.homeLink, text: "Home" },
      { element: this.contactLink, text: "Contact" },
      { element: this.aboutLink, text: "About us" },
      { element: this.cartLink, text: "Cart" },
      { element: this.loginLink, text: "Log in" },
      { element: this.signupLink, text: "Sign up" },
    ]);
  }

  async verifyCategorySidebar(): Promise<void> {
    await this.verifyElementsVisible([
      this.categoriesSection,
      this.phonesCategory,
      this.laptopsCategory,
      this.monitorsCategory,
    ]);
  }

  async verifyProductGrid(): Promise<void> {
    await expect(this.productGrid).toBeVisible();
    await expect(this.productCards.first()).toBeVisible();
  }

  async verifyFooter(): Promise<void> {
    await expect(this.footer).toBeVisible();
  }

  async verifyUserLoggedOut(): Promise<void> {
    await this.verifyElementsVisible([this.loginLink, this.signupLink]);
  }

  async verifyPhonesCategorySelected(
    request: APIRequestContext,
  ): Promise<void> {
    const response = await request.post("/bycat", {
      headers: {
        "content-type": "application/json",
      },
      data: {
        cat: "phone",
      },
    });

    expect(response.ok()).toBeTruthy();
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty("Items");
    expect(Array.isArray(responseBody.Items)).toBe(true);

    for (const item of responseBody.Items) {
      expect(item.cat).toBe("phone");
    }
  }

  private async verifyIndividualProduct(index: number): Promise<void> {
    await expect(this.productTitles.nth(index)).toBeVisible();
    await expect(this.productPrices.nth(index)).toBeVisible();
    const productCard = this.productCards.nth(index);
    const productImage = productCard.locator("img");
    await expect(productImage).toBeVisible();
    const src = await productImage.getAttribute("src");
    expect(src).not.toBeNull();
    expect(src).not.toBe("");
  }

  async verifyProductInformation(): Promise<void> {
    const productCount = await this.getProductCount();
    for (let i = 0; i < productCount; i++) {
      await this.verifyIndividualProduct(i);
    }
  }
}
