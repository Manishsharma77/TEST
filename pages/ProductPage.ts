import { Page } from '@playwright/test';
import { productPageLocators } from '../locators/ProductPageLocators';
import { waitForTimeout } from '../utils/waitForTimeout';
export class ProductPage {
  constructor(private page: Page) {}

  async logout() {
    await this.page.click(productPageLocators.settingIcon);
    await this.page.click(productPageLocators.logoutLink);
  }

  async openAboutPage() {
    await this.page.click(productPageLocators.settingIcon);
    await this.page.click(productPageLocators.aboutLink);
  }

  async validateAllProductsDisplayed() {
    const names = await this.page.locator(productPageLocators.productNames).allTextContents();
    const descriptions = await this.page.locator(productPageLocators.productDescription).allTextContents();
    const price = await this.page.locator(productPageLocators.productPrices).allTextContents();
    const buttonCount = await this.page.locator(productPageLocators.addToCartButtons).count();

    if (names.length === 0)
      throw new Error("No products found");

    if (
      names.length !== descriptions.length ||
      names.length !== price.length ||
      names.length !== buttonCount
    )
      throw new Error("Mismatch between the product Details");
  }

  async addFirstProductToCart() {
    await this.page.locator(productPageLocators.addToCartButtons).first().click();
  }

  async addAllProductsToCart() {
    const buttons = this.page.locator(productPageLocators.addToCartButtons);
    const count = await buttons.count();

    for (let i = 0; i < count; i++) {
      await buttons.nth(i).click();
      await this.page.waitForTimeout(3000);
    }
  }

  async addSpecificProductsToCart(productName: string[]) {
    const addProducts = this.page.locator(productPageLocators.productNames);
    const count = await addProducts.count();

    for (let i = 0; i < count; i++) {
      const name = await addProducts.nth(i).textContent();
      if (name && productName.includes(name.trim())) {
        await this.page.locator(productPageLocators.addToCartButtons).nth(i).click();
        await this.page.waitForTimeout(3000);
      }
    }
  }

  async filterByNameAtoZ() {
    await this.page.selectOption(productPageLocators.filterDropdown, "az");
  }

  async filterByNameZtoA() {
    await this.page.selectOption(productPageLocators.filterDropdown, "za");
    await this.page.waitForTimeout(3000);
  }

  async filterByPriceLowToHigh() {
    await this.page.selectOption(productPageLocators.filterDropdown, "lohi");
    await this.page.waitForTimeout(3000);
  }

  async filterByPriceHighToLow() {
    await this.page.selectOption(productPageLocators.filterDropdown, "hilo");
    await this.page.waitForTimeout(3000);
  }

  async getProductNames() {
    return await this.page.locator(productPageLocators.productNames).allTextContents();
  }

  async getProductPrices() {
    const prices = await this.page.locator(productPageLocators.productPrices).allTextContents();
    return prices.map(price => parseFloat(price.replace('$', '')));
  }
}