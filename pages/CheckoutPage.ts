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
    await this.page.fill(CheckoutPageLocators.firstName, firstName);
    await this.page.fill(CheckoutPageLocators.lastName, lastName);
    await this.page.fill(CheckoutPageLocators.postalCode, postalCode);
  }

  async clickCancel() {
    await this.page.click(CheckoutPageLocators.cancelButton);
  }

  async clickOnContinue() {
    await this.page.click(CheckoutPageLocators.continueButton);
  }
}