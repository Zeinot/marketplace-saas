const pptxgen = require('pptxgenjs');
const pres = new pptxgen();
pres.layout = 'LAYOUT_16x9';

const theme = {
  primary: "1e3a5f",
  secondary: "2c5282",
  accent: "3182ce",
  light: "e2e8f0",
  bg: "f8fafc"
};

for (let i = 1; i <= 20; i++) {
  const num = String(i).padStart(2, '0');
  const slideModule = require(`./slide-${num}.js`);
  slideModule.createSlide(pres, theme);
}

pres.writeFile({ fileName: './output/Presentation_Cache_Redis.pptx' });
console.log('Presentation generated: ./output/Presentation_Cache_Redis.pptx');
