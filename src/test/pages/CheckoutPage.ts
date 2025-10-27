// src/test/pages/CheckoutPage.ts
import { Page } from 'playwright';

export default class CheckoutPage {
  private page: Page;

  // step-one
  private selFirstName = 'input#first-name';
  private selLastName = 'input#last-name';
  private selPostalCode = 'input#postal-code';
  private selContinue = 'input#continue';

  // step-two
  private selSummaryItemName = (name: string) => `xpath=//div[@class='cart_item']//div[@class='inventory_item_name' and normalize-space(text())='${name}']`;
  private selFinish = 'button#finish';

  // complete
  private selCompleteHeader = '.complete-header';
  private selCompleteText = '.complete-text'; 

  constructor(page: Page) {
    this.page = page;
  }

  // step-one actions
  async fillShippingInfo(first: string, last: string, postal: string) {
    await this.page.fill(this.selFirstName, first);
    await this.page.fill(this.selLastName, last);
    await this.page.fill(this.selPostalCode, postal);
  }

  async clickContinue() {
    await this.page.click(this.selContinue);
  }

  // step-two validations
  async isProductInSummary(name: string, timeout = 5000): Promise<boolean> {
    try {
      await this.page.waitForSelector(this.selSummaryItemName(name), { timeout });
      return true;
    } catch {
      return false;
    }
  }

  async finishCheckout() {
    await this.page.click(this.selFinish);
  }

  // confirmations
  async getCompleteHeaderText(timeout = 5000): Promise<string | null> {
    try {
      await this.page.waitForSelector(this.selCompleteHeader, { timeout });
      const el = await this.page.$(this.selCompleteHeader);
      return el ? (await el.textContent())?.trim() ?? null : null;
    } catch {
      return null;
    }
  }

  async getCompleteText(timeout = 5000): Promise<string | null> {
    try {
      await this.page.waitForSelector(this.selCompleteText, { timeout });
      const el = await this.page.$(this.selCompleteText);
      return el ? (await el.textContent())?.trim() ?? null : null;
    } catch {
      return null;
    }
  }
}
