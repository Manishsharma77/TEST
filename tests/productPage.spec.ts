import { test, expect } from '@playwright/test';
import { BASE_URL, USERNAME, PASSWORD } from '../utils/envConfig';
import { ProductPage } from '../pages/ProductPage';
import { LoginPage } from '../pages/LoginPage';
import { LoginLocators } from '../locators/LoginLocators';
import { productPageLocators } from '../locators/ProductPageLocators';

const productsToCart = [
  "Sauce Labs Backpack",
  "Sauce Labs Bolt T-Shirt",
  "Sauce Labs Onesie"
];

test.describe("Product Page Validation", () => {
  let loginPage: LoginPage;
  let productPage: ProductPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productPage = new ProductPage(page);

    await page.goto(BASE_URL);
    await loginPage.login(USERNAME, PASSWORD);
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
  });

  test("Validate Logout functionality", async ({ page }) => {
    await productPage.logout();
    await expect(page.locator(LoginLocators.loginButton)).toBeVisible();
  });

  test("Validate About page and navigate back", async ({ page }) => {
    await productPage.openAboutPage();
    await expect(page.locator(productPageLocators.requestDemoButton)).toBeVisible();
    await expect(page.locator(productPageLocators.tryifFreeButton)).toBeVisible();
    await page.goBack();
    await expect(page.locator(productPageLocators.settingIcon)).toBeVisible();
  });

  test("Validate Product Page", async ({ page }) => {
    await productPage.validateAllProductsDisplayed();
    await productPage.addFirstProductToCart();
    await productPage.addAllProductsToCart();
  });

  test("Validate adding specific products to cart", async ({ page }) => {
    await productPage.addSpecificProductsToCart(productsToCart);
  });

  test("Filter By Name A to Z", async ({ page }) => {
    await productPage.filterByNameAtoZ();
    const names = await productPage.getProductNames();
    const sorted = [...names].sort();
    expect(names).toEqual(sorted);
  });

  test("Filter By Name Z to A", async ({ page }) => {
    await productPage.filterByNameZtoA();
    const names = await productPage.getProductNames();
    const sorted = [...names].sort().reverse();
    expect(names).toEqual(sorted);
  });

  test("Filter By Price Low to High", async ({ page }) => {
    await productPage.filterByPriceLowToHigh();
    const prices = await productPage.getProductPrices();
    const sortedPrice = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sortedPrice);
  });

  test("Filter By Price High to Low", async ({ page }) => {
    await productPage.filterByPriceHighToLow();
    const prices = await productPage.getProductPrices();
    const sortedPrice = [...prices].sort((a, b) => b - a);
    expect(prices).toEqual(sortedPrice);
  });
});