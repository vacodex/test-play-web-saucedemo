import { Page } from 'playwright';

export default class LoginPage {
  private page: Page;
  private baseUrl: string;
  private selUser = 'input[id="user-name"]';
  private selPassword = 'input[id="password"]';
  private selLoginButton = 'input[id="login-button"]';
  private selProductsTitle = 'text=Products';
  private selAlertMessage = 'h3[data-test="error"]';

  constructor(page: Page, baseUrl: string) {
    this.page = page;
    this.baseUrl = baseUrl;
  }

  async open() {
    await this.page.goto(this.baseUrl);
  }

  async enterUsername(username: string) {
    await this.page.fill(this.selUser, username);
  }

  async enterPassword(password: string) {
    await this.page.fill(this.selPassword, password);
  }

  async clickLogin() {
    await this.page.click(this.selLoginButton);
  }

  async waitForProductsPage(timeout = 5000) {
    try {
      await this.page.waitForURL('https://www.saucedemo.com/inventory.html', { timeout });
      return;
    } catch (e) {
      // fallback a selector de la página de productos
    }

    await this.page.waitForSelector(this.selProductsTitle, { timeout });
  }

  async getProductsTitleText() {
    const el = await this.page.$(this.selProductsTitle);
    if (!el) return null;
    return (await el.textContent())?.trim() ?? null;
  }

  async getAlertMessageText() {
    const el = await this.page.$(this.selAlertMessage);
    if (!el) return null;
    return (await el.textContent())?.trim() ?? null;
  }

  async isOnLoginPage() {
    try {
      await this.page.waitForSelector(this.selUser, { timeout: 3000 });
      return true;
    } catch {
      return false;
    }
  }
}
