const pptxgen = require('pptxgenjs');
const pres = new pptxgen();
pres.layout = 'LAYOUT_16x9';

const theme = {
  bg: "0d1b2a",
  card: "1b2838",
  primary: "ffffff",
  secondary: "94a3b8",
  accent: "38bdf8",
  success: "22c55e",
  codeBg: "0f172a",
  border: "1e293b",
  redis: "dc2626"
};

for (let i = 1; i <= 10; i++) {
  const num = String(i).padStart(2, '0');
  const slideModule = require(`./slide-${num}.js`);
  slideModule.createSlide(pres, theme);
}

pres.writeFile({ fileName: './output/Presentation_Cache_Redis.pptx' });
console.log('Presentation generated: ./output/Presentation_Cache_Redis.pptx');
