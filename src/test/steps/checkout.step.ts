import { When, Then } from '@cucumber/cucumber';
import CartPage from '../pages/CartPage';
import CheckoutPage from '../pages/CheckoutPage';
import { strict as assert } from 'assert';

When('el usuario abre el carrito', async function (this: any) {
  this.cartPage = this.cartPage || new CartPage(this.page);
  await this.cartPage.open();
});

When('el usuario inicia el checkout', async function (this: any) {
  this.cartPage = this.cartPage || new CartPage(this.page);
  await this.cartPage.startCheckout(); 
  this.checkoutPage = new CheckoutPage(this.page);
});

When('el usuario completa el formulario de envío con nombre {string} apellido {string} y código postal {string}', async function (this: any, first: string, last: string, zip: string) {
  this.checkoutPage = this.checkoutPage || new CheckoutPage(this.page);
  await this.checkoutPage.fillShippingInfo(first, last, zip);
});

When('el usuario continua al resumen de pedido', async function (this: any) {
  await this.checkoutPage.clickContinue();
});

Then('debe ver el producto {string} en el resumen del checkout', async function (this: any, productName: string) {
  this.checkoutPage = this.checkoutPage || new CheckoutPage(this.page);
  const exists = await this.checkoutPage.isProductInSummary(productName, 7000);
  assert.ok(exists, `Se esperaba ver "${productName}" en el resumen del checkout`);
});

When('el usuario finaliza la compra', async function (this: any) {
  await this.checkoutPage.finishCheckout();
});

Then('debería ver el mensaje de confirmación {string}', async function (this: any, expectedHeader: string) {
  const text = await this.checkoutPage.getCompleteHeaderText(7000);
  assert.ok(text && text.includes(expectedHeader), `Se esperaba header "${expectedHeader}", se obtuvo "${text}"`);
});

Then('debería ver el texto de despacho {string}', async function (this: any, expectedText: string) {
  const text = await this.checkoutPage.getCompleteText(7000);
  assert.ok(text && text.includes(expectedText), `Se esperaba texto de despacho "${expectedText}", se obtuvo "${text}"`);
});
