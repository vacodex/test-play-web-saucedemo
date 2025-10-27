import { Page } from 'playwright';

export default class ProductsPage {
  private page: Page;
  private baseUrl: string;

  private selCartBadge = '.shopping_cart_badge';
  private selCartLink = '.shopping_cart_link';
  private selInventoryItemName = '.inventory_item_name';
  private addButtonByName = (name: string) =>
    `xpath=//div[@class='inventory_item']//div[text()='${name}']/ancestor::div[@class='inventory_item']//button`;

  constructor(page: Page, baseUrl = 'https://www.saucedemo.com') {
    this.page = page;
    this.baseUrl = baseUrl;
  }

  async open() {
    await this.page.goto(`${this.baseUrl}/inventory.html`);
  }

  async addProductByName(name: string) {
    await this.page.waitForSelector(this.selInventoryItemName, { timeout: 10000 });
    await this.page.click(this.addButtonByName(name));
  }

  async getCartCount(): Promise<number> {
    const badge = await this.page.$(this.selCartBadge);
    if (!badge) return 0;
    const txt = (await badge.textContent())?.trim() ?? '';
    return parseInt(txt || '0', 10);
  }

  async openCart() {
    await this.page.click(this.selCartLink);
  }

  async clearCart() {
    const badge = await this.page.$('.shopping_cart_badge');
    if (!badge) return;

    await this.openCart();

    const removeButtons = await this.page.$$('button:has-text("Remove")');
    for (const btn of removeButtons) {
      await btn.click();
    }

    await this.page.click('#continue-shopping');
  }
}

