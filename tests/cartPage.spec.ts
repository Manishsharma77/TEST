import { test, expect } from '@playwright/test';
import { BASE_URL, USERNAME, PASSWORD } from '../utils/envConfig';
import { ProductPage } from '../pages/ProductPage';
import { LoginPage } from '../pages/LoginPage';
import { LoginLocators } from '../locators/LoginLocators';
import { productPageLocators } from '../locators/ProductPageLocators';
import { cartPagelocators } from '../locators/cartPageLocators';

const productsToCart = [
  "Sauce Labs Backpack",
  "Sauce Labs Bolt T-Shirt",
  "Sauce Labs Onesie"
];

test.describe("Cart Page Validation", () => {
  let loginPage: LoginPage;
  let productPage: ProductPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productPage = new ProductPage(page);

    await page.goto(BASE_URL);
    await loginPage.login(USERNAME, PASSWORD);
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
  });

  // Add your test cases here
});