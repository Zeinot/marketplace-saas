const pptxgen = require('pptxgenjs');
const pres = new pptxgen();
pres.layout = 'LAYOUT_16x9';

const theme = {
  primary: "ffffff",
  secondary: "e2e8f0",
  accent: "63b3ed",
  light: "4a5568",
  bg: "1a365d"
};

for (let i = 1; i <= 10; i++) {
  const num = String(i).padStart(2, '0');
  const slideModule = require(`./slide-${num}.js`);
  slideModule.createSlide(pres, theme);
}

pres.writeFile({ fileName: './output/Presentation_Cache_Redis.pptx' });
console.log('Presentation generated: ./output/Presentation_Cache_Redis.pptx');
