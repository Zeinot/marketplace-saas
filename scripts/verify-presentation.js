const { chromium } = require('playwright');
const path = require('path');

async function verifyPresentation() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1200, height: 800 } });
  
  try {
    // Open the PDF
    await page.goto(`file://${path.resolve('output/Presentation_Cache_Redis.pdf')}`);
    await page.waitForTimeout(2000);
    
    // Take screenshots of problematic slides (2, 3, 6, 9, 13)
    const problematicSlides = [2, 3, 6, 9, 13];
    
    for (const slideNum of problematicSlides) {
      // Navigate to slide
      await page.keyboard.press('PageDown');
      await page.waitForTimeout(500);
      
      // Screenshot
      await page.screenshot({
        path: `scripts/verification-slide-${slideNum}.png`,
        fullPage: false
      });
    }
    
    console.log('Verification screenshots saved to scripts/ folder');
  } catch (error) {
    console.error('Verification failed:', error);
  } finally {
    await browser.close();
  }
}

verifyPresentation();
