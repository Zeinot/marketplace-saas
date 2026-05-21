const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

async function visualCheck() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  
  const outputDir = path.join(__dirname, '..', 'slide-screenshots');
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);
  
  try {
    // Open the PDF
    const pdfPath = path.resolve('output/Presentation_Cache_Redis.pdf');
    await page.goto(`file://${pdfPath}`);
    await page.waitForTimeout(3000);
    
    // Take screenshots of all 20 slides
    for (let i = 1; i <= 20; i++) {
      // Navigate to page
      if (i > 1) await page.keyboard.press('PageDown');
      await page.waitForTimeout(800);
      
      // Screenshot
      await page.screenshot({
        path: path.join(outputDir, `slide-${String(i).padStart(2, '0')}.png`),
        fullPage: false
      });
      console.log(`Captured slide ${i}`);
    }
    
    console.log(`\nAll 20 slides saved to: ${outputDir}`);
    console.log('Please review these images to check for visual issues');
  } catch (error) {
    console.error('Visual check failed:', error);
  } finally {
    await browser.close();
  }
}

visualCheck();
