import { Page } from "@playwright/test";
import { cartPagelocators } from "../locators/cartPageLocators";
import { productPageLocators } from "../locators/ProductPageLocators";

export class CartPage {
  constructor(private page: Page) {}

  async clickOnContinueShopping() {
    await this.page.locator(cartPagelocators.continueShoppingButton).click();
  }

  async clickCheckoutButton()
{
    await this.page.locator(cartPagelocators.checkoutButton).click();
}

  async getCartPageElements() {
    return {
      cartTile: this.page.locator(cartPagelocators.cartTile),
      shoppingCart: this.page.locator(cartPagelocators.continueShoppingButton),
      checkOut: this.page.locator(cartPagelocators.checkOutButton)
    };
  }

  async getCartProducts() {
    const allNames = await this.page.locator(cartPagelocators.productNames).allTextContents();
    const allDescription = await this.page.locator(cartPagelocators.productDescription).allTextContents();
    const allPrices = await this.page.locator(cartPagelocators.productPrices).allTextContents();

    const allCartProducts = allNames.map((_, i) => ({
      name: allNames[i].trim(),
      description: allDescription[i].trim(),
      price: allPrices[i].trim()
    }));

    return allCartProducts;
  }
}
