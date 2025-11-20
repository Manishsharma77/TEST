import { Page } from '@playwright/test';
import { productPageLocators } from '../locators/ProductPageLocators';
import { waitForTimeout } from '../utils/waitUtils'; // Ensure this file exists

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
    const descriptions = await this.page.locator(productPageLocators.productDescriptions).allTextContents();
    const prices = await this.page.locator(productPageLocators.productPrices).allTextContents();
    const buttonCount = await this.page.locator(productPageLocators.addToCartButtons).count();

    if (names.length === 0) throw new Error("No products found");

    if (
      names.length !== descriptions.length ||
      names.length !== prices.length ||
      names.length !== buttonCount
    ) throw new Error("Mismatch between the product details");
  }

  async addFirstProductToCart() {
    await this.page.locator(productPageLocators.addToCartButtons).first().click();
  }

  async addAllProductsToCart() {
    const buttons = this.page.locator(productPageLocators.addToCartButtons);
    const count = await buttons.count();

    for (let i = 0; i < count; i++) {
      await buttons.nth(i).click();
      await waitForTimeout(3000);
    }
  }

  async addSpecificProductsToCart(productNames: string[]) {
    const products = this.page.locator(productPageLocators.productNames);
    const count = await products.count();

    for (let i = 0; i < count; i++) {
      const name = await products.nth(i).textContent();
      if (name && productNames.includes(name.trim())) {
        await this.page.locator(productPageLocators.addToCartButtons).nth(i).click();
        await waitForTimeout(3000);
      }
    }
  }

  async filterByNameAtoZ() {
    await this.page.selectOption(productPageLocators.filterDropdown, "az");
  }

  async filterByNameZtoA() {
    await this.page.selectOption(productPageLocators.filterDropdown, "za");
    await waitForTimeout(3000);
  }

  async filterByPriceLowToHigh() {
    await this.page.selectOption(productPageLocators.filterDropdown, "lohi");
    await waitForTimeout(3000);
  }

  async filterByPriceHighToLow() {
    await this.page.selectOption(productPageLocators.filterDropdown, "hilo");
    await waitForTimeout(3000);
  }

  async getProductNames() {
    return await this.page.locator(productPageLocators.productNames).allTextContents();
  }

  async getProductPrices() {
    const prices = await this.page.locator(productPageLocators.productPrices).allTextContents();
    return prices.map(price => parseFloat(price.replace('$', '')));
  }

  async clickOnCartLink() {
    await this.page.locator(productPageLocators.cartLink).click();
  }

  async getProductDetails() {
    const name = await this.page.locator(productPageLocators.productNames).first().textContent();
    const description = await this.page.locator(productPageLocators.productDescriptions).first().textContent();
    const price = await this.page.locator(productPageLocators.productPrices).first().textContent();

    return {
      name: name?.trim() || '',
      description: description?.trim() || '',
      price: price?.trim() || ''
    };
  }

  async getAllProductDetails() {
    const allNames = await this.page.locator(productPageLocators.productNames).allTextContents();
    const allDescriptions = await this.page.locator(productPageLocators.productDescriptions).allTextContents();
    const allPrices = await this.page.locator(productPageLocators.productPrices).allTextContents();

    return allNames.map((_, i) => ({
      name: allNames[i].trim(),
      description: allDescriptions[i].trim(),
      price: allPrices[i].trim()
    }));
  }

  async getSpecificProductDetails(productNames: string[]) {
    const allNames = await this.page.locator(productPageLocators.productNames).allTextContents();
    const allDescriptions = await this.page.locator(productPageLocators.productDescriptions).allTextContents();
    const allPrices = await this.page.locator(productPageLocators.productPrices).allTextContents();

    const allProducts = allNames.map((_, i) => ({
      name: allNames[i].trim(),
      description: allDescriptions[i].trim(),
      price: allPrices[i].trim()
    }));

    return allProducts.filter(p => productNames.includes(p.name));
  }
}