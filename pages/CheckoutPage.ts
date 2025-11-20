import { Page } from '@playwright/test';
import { CheckoutPageLocators } from '../locators/checkoutPageLocators';

export class CheckoutPage {
  constructor(private page: Page) {}

  async getCheckoutElements() {
    return {
      pageInfo: this.page.locator(CheckoutPageLocators.pageInfo),
      cancel: this.page.locator(CheckoutPageLocators.cancelButton),
      continue: this.page.locator(CheckoutPageLocators.continueButton)
    };
  }

  async fillCheckoutDetail(firstName: string, lastName: string, postalCode: string) {
    await this.page.locator(CheckoutPageLocators.firstName).fill(firstName);
    await this.page.locator(CheckoutPageLocators.lastName).fill(lastName);
    await this.page.locator(CheckoutPageLocators.postalCode).fill(postalCode);
  }

  async clickCancel() {
    await this.page.locator(CheckoutPageLocators.cancelButton).click();
  }

  async clickOnContinue() {
    await this.page.locator(CheckoutPageLocators.continueButton).click();
  }
}