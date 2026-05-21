const fs = require('fs');
const path = require('path');

// Read all slide files and identify issues
const slidesDir = 'C:\\Users\\Zeinot\\Downloads\\marketplace-saas\\redis-presentation';
const issues = [];

for (let i = 1; i <= 20; i++) {
  const num = String(i).padStart(2, '0');
  const filePath = path.join(slidesDir, `slide-${num}.js`);
  
  if (!fs.existsSync(filePath)) continue;
  
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Check badge position
  const badgeMatches = content.match(/y:\s*([0-9.]+).*?w:\s*([0-9.]+).*?h:\s*([0-9.]+)/g);
  if (badgeMatches) {
    badgeMatches.forEach(match => {
      const y = parseFloat(match.match(/y:\s*([0-9.]+)/)?.[1] || 0);
      const h = parseFloat(match.match(/h:\s*([0-9.]+)/)?.[1] || 0);
      const w = parseFloat(match.match(/w:\s*([0-9.]+)/)?.[1] || 0);
      
      if (y > 5.2 || (y + h) > 5.625) {
        issues.push(`Slide ${i}: Badge/content at y=${y}, h=${h} extends beyond slide (bottom=${(y+h).toFixed(2)})`);
      }
      
      // Check if badge is too small for 2-digit numbers
      if (w < 0.4 && i >= 10) {
        issues.push(`Slide ${i}: Badge width ${w} may be too small for number "${i}"`);
      }
    });
  }
  
  // Check for images with small dimensions
  const imageMatches = content.match(/addImage\(\{[\s\S]*?\}\)/g);
  if (imageMatches) {
    imageMatches.forEach(match => {
      const w = parseFloat(match.match(/w:\s*([0-9.]+)/)?.[1] || 0);
      const h = parseFloat(match.match(/h:\s*([0-9.]+)/)?.[1] || 0);
      
      if (w < 3 || h < 2) {
        issues.push(`Slide ${i}: Image is very small (${w}\" x ${h}\") - may be unreadable`);
      }
    });
  }
}

if (issues.length === 0) {
  console.log('No issues found!');
} else {
  console.log('Issues found:\n');
  issues.forEach(issue => console.log(`  - ${issue}`));
}
