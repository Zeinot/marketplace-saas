const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

async function takeScreenshots() {
  const screenshotDir = 'C:\\Users\\Zeinot\\Downloads\\marketplace-saas\\screenshots-report';
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
  }

  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });
  const page = await context.newPage();

  try {
    // Screenshot 1: Homepage
    console.log('Taking homepage screenshot...');
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle', timeout: 30000 });
    await page.screenshot({ path: path.join(screenshotDir, '01_homepage.png'), fullPage: true });
    
    // Screenshot 2: Marketplace
    console.log('Taking marketplace screenshot...');
    await page.goto('http://localhost:3000/marketplace', { waitUntil: 'networkidle', timeout: 30000 });
    await page.screenshot({ path: path.join(screenshotDir, '02_marketplace.png'), fullPage: true });
    
    // Screenshot 3: Feed
    console.log('Taking feed screenshot...');
    await page.goto('http://localhost:3000/feed', { waitUntil: 'networkidle', timeout: 30000 });
    await page.screenshot({ path: path.join(screenshotDir, '03_feed.png'), fullPage: true });
    
    console.log('All screenshots taken successfully!');
  } catch (error) {
    console.error('Error taking screenshots:', error);
  } finally {
    await browser.close();
  }
}

takeScreenshots();
