import { Given, When, Then } from '@cucumber/cucumber';
import LoginPage from '../pages/LoginPage';
import { strict as assert } from 'assert';

Given('el usuario está en la página de inicio de sesión', async function () {
  const baseUrl = process.env.BASE_URL || 'https://www.saucedemo.com';
  this.LoginPage = new LoginPage(this.page, baseUrl);
  await this.LoginPage.open();
});

When('el usuario ingresa un nombre de usuario válido {string}', async function (username: string) {
  await this.LoginPage.enterUsername(username);
});

When('el usuario ingresa una contraseña válida {string}', async function (password: string) {
  await this.LoginPage.enterPassword(password);
});

When('el usuario ingresa un nombre de usuario inválido {string}', async function (username: string) {
  await this.LoginPage.enterUsername(username);
});

When('el usuario ingresa una contraseña inválida {string}', async function (password: string) {
  await this.LoginPage.enterPassword(password);
});

When('el usuario ingresa un nombre de usuario bloqueado {string}', async function (username: string) {
  await this.LoginPage.enterUsername(username);
});

When('el usuario hace clic en el botón de inicio de sesión', async function () {
  await this.LoginPage.clickLogin();
});

Then('el usuario debería ser redirigido a la página de productos', async function () {
  await this.LoginPage.waitForProductsPage(7000);
});

Then('el usuario debería ver el título de la página de productos {string}', async function (expectedTitle: string) {
  const text = await this.LoginPage.getProductsTitleText();
  assert.ok(text, `No se encontró el título de la página de productos`);
  assert.ok(text!.includes(expectedTitle), `Se esperaba el título "${expectedTitle}", pero se obtuvo "${text}"`);
});

Then('el usuario debería permanecer en la página de inicio de sesión', async function () {
  const onLogin = await this.LoginPage.isOnLoginPage();
  assert.ok(onLogin, 'El usuario no está en la página de inicio de sesión');
});

Then('el usuario debería ver un mensaje de alerta {string}', async function (expectedMessage: string) {
  const text = await this.LoginPage.getAlertMessageText();
  assert.ok(text, 'No se encontró el mensaje de alerta');
  assert.ok(text!.includes(expectedMessage), `Se esperaba el mensaje de alerta "${expectedMessage}", pero se obtuvo "${text}"`);
});

Given('el usuario está autenticado con usuario {string} y contraseña {string}', async function (username: string, password: string) {
  this.LoginPage = new LoginPage(this.page, process.env.BASE_URL || 'https://www.saucedemo.com');
  await this.LoginPage.open();
  await this.LoginPage.enterUsername(username);
  await this.LoginPage.enterPassword(password);
  await this.LoginPage.clickLogin();
  await this.LoginPage.waitForProductsPage(7000);
});
