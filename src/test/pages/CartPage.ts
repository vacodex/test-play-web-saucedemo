// src/test/pages/CartPage.ts
import { Page } from 'playwright';

export default class CartPage {
  private page: Page;
  private selCheckout = 'button#checkout';
  private selCartItems = '.cart_item';
  private selItemName = (name: string) => `xpath=//div[@class='inventory_item_name' and normalize-space(text())='${name}']`;

  constructor(page: Page) {
    this.page = page;
  }

  async open() {
    await this.page.goto('https://www.saucedemo.com/cart.html');
  }

  async startCheckout() {
    await this.page.waitForSelector(this.selCheckout, { timeout: 5000 });
    await this.page.click(this.selCheckout);
  }

  async isProductInCart(name: string, timeout = 5000): Promise<boolean> {
    try {
      await this.page.waitForSelector(this.selItemName(name), { timeout });
      return true;
    } catch {
      return false;
    }
  }

  async getCartItemsCount(): Promise<number> {
    const items = await this.page.$$(this.selCartItems);
    return items.length;
  }
}
