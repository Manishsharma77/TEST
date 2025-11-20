import { Page } from '@playwright/test';
import { cartPageLocators } from '../locators/cartPageLocators';

export class CartPage {
  constructor(private page: Page) {}

  async clickOnContinueShopping() {
    await this.page.locator(cartPageLocators.continueShoppingButton).click();
  }

  async clickCheckoutButton() {
    await this.page.locator(cartPageLocators.checkoutButton).click();
  }

  async getCartPageElements() {
    return {
      cartTile: this.page.locator(cartPageLocators.cartTile),
      shoppingCart: this.page.locator(cartPageLocators.continueShoppingButton),
      checkOut: this.page.locator(cartPageLocators.checkoutButton)
    };
  }

  async getCartProducts() {
    const allNames = await this.page.locator(cartPageLocators.productNames).allTextContents();
    const allDescriptions = await this.page.locator(cartPageLocators.productDescription).allTextContents();
    const allPrices = await this.page.locator(cartPageLocators.productPrices).allTextContents();

    return allNames.map((_, i) => ({
      name: allNames[i].trim(),
      description: allDescriptions[i].trim(),
      price: allPrices[i].trim()
    }));
  }

  async removeFirstProduct() {
    await this.page.locator(cartPageLocators.removeButton).first().click();
  }
}