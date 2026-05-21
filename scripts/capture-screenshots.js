const { chromium } = require('playwright');
const path = require('path');

async function captureScreenshots() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 }
  });
  const page = await context.newPage();
  
  const outputDir = path.join(__dirname, '..', 'screenshots-presentation');
  
  try {
    // Capture homepage
    await page.goto('http://localhost:3000/', { waitUntil: 'networkidle', timeout: 10000 });
    await page.screenshot({ 
      path: path.join(outputDir, 'homepage.png'),
      fullPage: false
    });
    console.log('Captured homepage');
    
    // Capture marketplace
    await page.goto('http://localhost:3000/marketplace', { waitUntil: 'networkidle', timeout: 10000 });
    await page.screenshot({ 
      path: path.join(outputDir, 'marketplace.png'),
      fullPage: false
    });
    console.log('Captured marketplace');
    
    // Capture feed
    await page.goto('http://localhost:3000/feed', { waitUntil: 'networkidle', timeout: 10000 });
    await page.screenshot({ 
      path: path.join(outputDir, 'feed.png'),
      fullPage: false
    });
    console.log('Captured feed');
    
  } catch (error) {
    console.error('Error capturing screenshots:', error.message);
  } finally {
    await browser.close();
  }
}

captureScreenshots();
