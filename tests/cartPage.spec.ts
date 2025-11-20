import { test, expect } from '@playwright/test';
import { BASE_URL, USERNAME, PASSWORD } from '../utils/envConfig';
import { ProductPage } from '../pages/ProductPage';
import { LoginPage } from '../pages/LoginPage';
import { CartPage } from '../pages/CartPage';
import { productsToCart } from '../test-data/productsToCart';

test.describe('Cart Page Validation', () => {
  let loginPage: LoginPage;
  let productPage: ProductPage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productPage = new ProductPage(page);
    cartPage = new CartPage(page);

    await page.goto(BASE_URL);
    await loginPage.login(USERNAME, PASSWORD);
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  });

  test('Validate cart page URL and UI Elements', async ({ page }) => {
    await productPage.addFirstProductToCart();
    await productPage.clickOnCartLink();
    await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');

    const ui = await cartPage.getCartPageElements();
    await expect(ui.cartTile).toBeVisible();
    await expect(ui.shoppingCart).toBeVisible();
    await expect(ui.checkOut).toBeVisible();
  });

  test('Validate Continue Shopping Functionality', async ({ page }) => {
    await productPage.addFirstProductToCart();
    await productPage.clickOnCartLink();
    await cartPage.clickOnContinueShopping();
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  });

  test('Validate First Product in the Cart Page', async ({ page }) => {
    const firstProduct = await productPage.getProductDetails();
    await productPage.addFirstProductToCart();
    await productPage.clickOnCartLink();
    const cartProducts = await cartPage.getCartProducts();
    expect(cartProducts[0]).toEqual(firstProduct);
  });

  test('Validate All Products added to the Cart Page', async ({ page }) => {
    const allProductsDetails = await productPage.getAllProductDetails();
    await productPage.addAllProductsToCart();
    await productPage.clickOnCartLink();
    const cartProducts = await cartPage.getCartProducts();
    expect(cartProducts).toEqual(allProductsDetails);
  });

  test('Validate Specific Products added to the Cart Page', async ({ page }) => {
    const specificProductDetails = await productPage.getSpecificProductDetails(productsToCart);
    await productPage.addSpecificProductsToCart(productsToCart);
    await productPage.clickOnCartLink();
    const cartProducts = await cartPage.getCartProducts();
    expect(cartProducts).toEqual(specificProductDetails);
  });

  test.only('Validate Remove Product functionality', async ({ page }) => {
    await productPage.addAllProductsToCart();
    await productPage.clickOnCartLink();

    const initialProducts = await cartPage.getCartProducts();
    expect(initialProducts.length).toBeGreaterThan(0);

    await cartPage.removeFirstProduct();
    const updatedCartProducts = await cartPage.getCartProducts();
    expect(updatedCartProducts.length).toBe(initialProducts.length - 1);
  });
});