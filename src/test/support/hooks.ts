import { Before, After } from '@cucumber/cucumber';
import { chromium, Browser, BrowserContext, Page } from 'playwright';

const HEADLESS = process.env.HEADLESS !== 'false';

Before(async function (this: any) {
  const browser: Browser = await chromium.launch({ headless: HEADLESS, slowMo: 500 });
  const context: BrowserContext = await browser.newContext();
  const page: Page = await context.newPage();

  this.browser = browser;
  this.context = context;
  this.page = page;
});

After(async function (this: any) {
  try {
    if (this.page) await this.page.close();
    if (this.context) await this.context.close();
    if (this.browser) await this.browser.close();
  } catch (e) {
    // evitar que cierre falle la ejecución del runner
  }
});
