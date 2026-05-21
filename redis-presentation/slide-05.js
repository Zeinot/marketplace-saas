const pptxgen = require("pptxgenjs");

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  // Top accent bar
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 0.06,
    fill: { color: theme.accent }
  });

  // Title
  slide.addText("Couche d'Abstraction", {
    x: 0.5, y: 0.4, w: 9, h: 0.6,
    fontSize: 32, fontFace: "Inter",
    color: theme.primary, bold: true,
    align: "left", valign: "middle"
  });

  // Accent underline
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 1.0, w: 2, h: 0.04,
    fill: { color: theme.accent }
  });

  const items = [
    "src/lib/cache.ts",
    "cacheGet : recuperation avec typage TypeScript",
    "cacheSet : stockage avec TTL configurable",
    "TTL par defaut : 300 secondes",
    "Interface simple et reutilisable"
  ];

  items.forEach((text, i) => {
    slide.addText(text, {
      x: 0.7, y: 1.3 + i * 0.55, w: 8.6, h: 0.5,
      fontSize: 20, fontFace: "Inter",
      color: theme.secondary,
      align: "left", valign: "middle"
    });
  });

  // Slide badge
  addBadge(slide, theme, 5);

  slide.addNotes("La couche d'abstraction dans src/lib/cache.ts fournit une interface simple pour Redis. cacheGet recupere et parse les donnees JSON avec typage TypeScript. cacheSet stocke les donnees avec un TTL configurable de 300 secondes par defaut.");

  function addBadge(slide, theme, num) {
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 9.1, y: 5.05, w: 0.5, h: 0.35,
      fill: { color: theme.accent },
      rectRadius: 0.1
    });
    slide.addText(String(num), {
      x: 9.1, y: 5.05, w: 0.5, h: 0.35,
      fontSize: 12, fontFace: "Inter",
      color: "0d1b2a", bold: true,
      align: "center", valign: "middle"
    });
  }
}

module.exports = { createSlide };
