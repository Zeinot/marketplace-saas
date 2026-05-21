const fs = require('fs');
const path = require('path');

const slidesDir = 'C:\\Users\\Zeinot\\Downloads\\marketplace-saas\\redis-presentation';
const issues = [];
const SLIDE_HEIGHT = 5.625;
const SLIDE_WIDTH = 10;

for (let i = 1; i <= 20; i++) {
  const num = String(i).padStart(2, '0');
  const filePath = path.join(slidesDir, `slide-${num}.js`);
  
  if (!fs.existsSync(filePath)) continue;
  
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Extract all elements with x, y, w, h
  const elementRegex = /(?:addText|addShape|addImage)\([^)]*?\{[\s\S]*?(?:x|y|w|h)\s*:\s*[0-9.]+[\s\S]*?\}/g;
  const elements = content.match(elementRegex) || [];
  
  elements.forEach((element, idx) => {
    const x = parseFloat(element.match(/x:\s*([0-9.]+)/)?.[1] || 0);
    const y = parseFloat(element.match(/y:\s*([0-9.]+)/)?.[1] || 0);
    const w = parseFloat(element.match(/w:\s*([0-9.]+)/)?.[1] || 0);
    const h = parseFloat(element.match(/h:\s*([0-9.]+)/)?.[1] || 0);
    
    // Check if element extends beyond slide
    if ((x + w) > SLIDE_WIDTH + 0.1) {
      issues.push(`Slide ${i}: Element ${idx} extends beyond right edge (x=${x}, w=${w}, right=${x+w})`);
    }
    if ((y + h) > SLIDE_HEIGHT + 0.1) {
      issues.push(`Slide ${i}: Element ${idx} extends beyond bottom (y=${y}, h=${h}, bottom=${y+h})`);
    }
    if (y < 0 || x < 0) {
      issues.push(`Slide ${i}: Element ${idx} has negative position (x=${x}, y=${y})`);
    }
  });
  
  // Check badge specifically
  const badgeTextMatch = content.match(/addText\("(\d+)"/);
  if (badgeTextMatch) {
    const badgeNum = parseInt(badgeTextMatch[1]);
    const badgeYMatch = content.match(/y:\s*([0-9.]+)[\s\S]*?addText\("\d+"/);
    const badgeHMatch = content.match(/h:\s*([0-9.]+)[\s\S]*?addText\("\d+"/);
    const badgeWMatch = content.match(/w:\s*([0-9.]+)[\s\S]*?addText\("\d+"/);
    
    if (badgeYMatch && badgeHMatch) {
      const badgeY = parseFloat(badgeYMatch[1]);
      const badgeH = parseFloat(badgeHMatch[1]);
      const badgeW = parseFloat(badgeWMatch?.[1] || 0.4);
      
      if ((badgeY + badgeH) > SLIDE_HEIGHT) {
        issues.push(`Slide ${i}: Badge ${badgeNum} extends beyond slide bottom (y=${badgeY}, h=${badgeH})`);
      }
      
      if (badgeW < 0.4 && badgeNum >= 10) {
        issues.push(`Slide ${i}: Badge width ${badgeW}" too small for number "${badgeNum}"`);
      }
    }
  }
  
  // Check images
  const imageMatches = content.match(/addImage\(\{[\s\S]*?\}\)/g);
  if (imageMatches) {
    imageMatches.forEach(img => {
      const imgW = parseFloat(img.match(/w:\s*([0-9.]+)/)?.[1] || 0);
      const imgH = parseFloat(img.match(/h:\s*([0-9.]+)/)?.[1] || 0);
      
      if (imgW < 2 || imgH < 1.5) {
        issues.push(`Slide ${i}: Image very small (${imgW}" x ${imgH}") - may be unreadable`);
      }
      
      // Check aspect ratio is reasonable
      const ratio = imgW / imgH;
      if (ratio > 5 || ratio < 0.2) {
        issues.push(`Slide ${i}: Image has extreme aspect ratio (${ratio.toFixed(2)})`);
      }
    });
  }
  
  // Check text overflow
  const textMatches = content.match(/addText\("([^"]+)"[\s\S]*?\}\)/g);
  if (textMatches) {
    textMatches.forEach(txt => {
      const text = txt.match(/"([^"]+)"/)?.[1] || '';
      const fontSize = parseInt(txt.match(/fontSize:\s*(\d+)/)?.[1] || 12);
      const txtW = parseFloat(txt.match(/w:\s*([0-9.]+)/)?.[1] || 0);
      const txtH = parseFloat(txt.match(/h:\s*([0-9.]+)/)?.[1] || 0);
      
      // Rough estimate: ~0.6 inches per 10 chars at 14pt
      const estimatedWidth = (text.length * fontSize * 0.008);
      const estimatedHeight = Math.max(0.3, (estimatedWidth / txtW) * 0.3);
      
      if (txtH > 0 && estimatedHeight > txtH + 0.1) {
        issues.push(`Slide ${i}: Text may overflow box ("${text.substring(0, 30)}...", estimated height: ${estimatedHeight.toFixed(2)}, box height: ${txtH})`);
      }
    });
  }
}

if (issues.length === 0) {
  console.log('✅ ALL CHECKS PASSED - No issues found in any slide!');
} else {
  console.log(`❌ FOUND ${issues.length} ISSUES:\n`);
  issues.forEach(issue => console.log(`  - ${issue}`));
}
