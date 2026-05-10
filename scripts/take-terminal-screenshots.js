const { chromium } = require('playwright');
const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

function stripAnsi(str) {
    return str.replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, '');
}

async function takeTerminalScreenshots() {
  const screenshotDir = 'C:\\Users\\Zeinot\\Downloads\\marketplace-saas\\screenshots-report';
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
  }

  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 2  // Retina quality
  });

  // Screenshot 1: Docker containers
  console.log('Taking docker screenshot...');
  const dockerOutput = execSync('docker-compose ps', { 
    cwd: 'C:\\Users\\Zeinot\\Downloads\\marketplace-saas',
    encoding: 'utf8'
  });
  
  const dockerHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        * { box-sizing: border-box; }
        body { 
          font-family: 'Consolas', 'Courier New', 'Monaco', monospace; 
          background: #ffffff; 
          color: #1a202c; 
          padding: 40px;
          margin: 0;
          font-size: 20px;
          line-height: 1.8;
        }
        .header { 
          color: #2563eb; 
          margin-bottom: 20px;
          font-size: 24px;
          font-weight: bold;
          border-bottom: 3px solid #e2e8f0;
          padding-bottom: 15px;
        }
        pre { 
          margin: 0; 
          white-space: pre-wrap;
          background: #f8fafc;
          padding: 30px;
          border-radius: 12px;
          border: 2px solid #e2e8f0;
          font-size: 18px;
          line-height: 2;
          font-family: 'Consolas', 'Courier New', 'Monaco', monospace;
        }
      </style>
    </head>
    <body>
      <div class="header">$ docker-compose ps</div>
      <pre>${stripAnsi(dockerOutput)}</pre>
    </body>
    </html>
  `;
  
  await page.setContent(dockerHtml);
  await page.screenshot({ 
    path: path.join(screenshotDir, '04_docker_containers.png'), 
    fullPage: true,
    type: 'png'
  });

  // Screenshot 2: Benchmark results
  console.log('Taking benchmark screenshot...');
  const benchOutput = execSync('npx tsx scripts/benchmark-cache.ts', { 
    cwd: 'C:\\Users\\Zeinot\\Downloads\\marketplace-saas',
    encoding: 'utf8',
    timeout: 30000
  });
  
  const benchHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        * { box-sizing: border-box; }
        body { 
          font-family: 'Consolas', 'Courier New', 'Monaco', monospace; 
          background: #ffffff; 
          color: #1a202c; 
          padding: 40px;
          margin: 0;
          font-size: 20px;
          line-height: 1.8;
        }
        .header { 
          color: #2563eb; 
          margin-bottom: 20px;
          font-size: 24px;
          font-weight: bold;
          border-bottom: 3px solid #e2e8f0;
          padding-bottom: 15px;
        }
        pre { 
          margin: 0; 
          white-space: pre-wrap;
          background: #f8fafc;
          padding: 30px;
          border-radius: 12px;
          border: 2px solid #e2e8f0;
          font-size: 18px;
          line-height: 2;
          font-family: 'Consolas', 'Courier New', 'Monaco', monospace;
        }
      </style>
    </head>
    <body>
      <div class="header">$ npm run benchmark:cache</div>
      <pre>${stripAnsi(benchOutput)}</pre>
    </body>
    </html>
  `;
  
  await page.setContent(benchHtml);
  await page.screenshot({ 
    path: path.join(screenshotDir, '05_benchmark_results.png'), 
    fullPage: true,
    type: 'png'
  });

  // Screenshot 3: Test results
  console.log('Taking test screenshot...');
  const testOutput = execSync('npm run test:run 2>&1', { 
    cwd: 'C:\\Users\\Zeinot\\Downloads\\marketplace-saas',
    encoding: 'utf8',
    timeout: 60000
  });
  
  const testHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        * { box-sizing: border-box; }
        body { 
          font-family: 'Consolas', 'Courier New', 'Monaco', monospace; 
          background: #ffffff; 
          color: #1a202c; 
          padding: 40px;
          margin: 0;
          font-size: 20px;
          line-height: 1.8;
        }
        .header { 
          color: #2563eb; 
          margin-bottom: 20px;
          font-size: 24px;
          font-weight: bold;
          border-bottom: 3px solid #e2e8f0;
          padding-bottom: 15px;
        }
        pre { 
          margin: 0; 
          white-space: pre-wrap;
          background: #f8fafc;
          padding: 30px;
          border-radius: 12px;
          border: 2px solid #e2e8f0;
          font-size: 18px;
          line-height: 2;
          font-family: 'Consolas', 'Courier New', 'Monaco', monospace;
        }
      </style>
    </head>
    <body>
      <div class="header">$ npm run test:run</div>
      <pre>${stripAnsi(testOutput)}</pre>
    </body>
    </html>
  `;
  
  await page.setContent(testHtml);
  await page.screenshot({ 
    path: path.join(screenshotDir, '06_test_results.png'), 
    fullPage: true,
    type: 'png'
  });

  await browser.close();
  console.log('All high-res screenshots completed!');
}

takeTerminalScreenshots().catch(console.error);
