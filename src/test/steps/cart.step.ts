import { When, Then } from '@cucumber/cucumber';
import { strict as assert } from 'assert';
import ProductsPage from '../pages/ProductsPage';
import CartPage from '../pages/CartPage';

When('el usuario agrega el producto {string} desde la página de productos', async function (this: any, productName: string) {
  this.productsPage = this.productsPage || new ProductsPage(this.page, process.env.BASE_URL || 'https://www.saucedemo.com');
  await this.productsPage.open();
  await this.productsPage.addProductByName(productName);
});

Then('el contador del carrito debe ser {int}', async function (this: any, expectedCount: number) {
  this.productsPage = this.productsPage || new ProductsPage(this.page);
  const count = await this.productsPage.getCartCount();
  assert.equal(count, expectedCount, `Se esperaba ${expectedCount} en el contador del carrito, pero se obtuvo ${count}`);
});

When('el usuario abre la página del carrito', async function (this: any) {
  this.productsPage = this.productsPage || new ProductsPage(this.page);
  await this.productsPage.openCart();
  this.cartPage = this.cartPage || new CartPage(this.page);
});

When('el usuario limpia el carrito', async function (this: any) {
  this.productsPage = this.productsPage || new ProductsPage(this.page);
  await this.productsPage.clearCart();
});

Then('el usuario debe ver el producto {string} en la lista del carrito', async function (this: any, productName: string) {
  this.cartPage = this.cartPage || new CartPage(this.page);
  const exists = await this.cartPage.isProductInCart(productName, 7000);
  assert.ok(exists, `Se esperaba ver el producto "${productName}" en el carrito, pero no se encontró.`);
});
