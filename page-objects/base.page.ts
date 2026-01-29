import { Page } from "@playwright/test";
import { PageInfo } from "../types/pageInfo.type.ts";

/**
 * Base page class for DemoBlaze application
 * Provides common functionality and structure for all page objects
 */
export abstract class BasePage {
  protected page: Page;
  protected readonly pageUrl?: string;
  protected readonly regExpBaseUrl?: RegExp;

  abstract setLocators(page: Page): void;

  constructor(page: Page, pageInfo?: PageInfo) {
    this.page = page;
    this.pageUrl = pageInfo?.pageUrl;
    this.regExpBaseUrl = pageInfo?.regExpBaseUrl;
  }
}
