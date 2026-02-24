import puppeteer from 'puppeteer';

const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
await page.setViewport({ width: 1800, height: 1200, deviceScaleFactor: 2 });
await page.goto('http://localhost:8000/funnel.html', { waitUntil: 'networkidle0' });

const element = await page.$('.funnel-wrapper');
const box = await element.boundingBox();
const padding = 40;

await page.screenshot({
  path: '/Users/berkozer/Documents/Fundraising/funnel.png',
  omitBackground: false,
  clip: {
    x: box.x - padding,
    y: box.y - padding,
    width: box.width + padding * 2,
    height: box.height + padding * 2,
  },
});

await browser.close();
console.log('Saved funnel.png');
