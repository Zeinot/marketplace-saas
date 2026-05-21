const pptxgen = require("pptxgenjs");

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  slide.addText("Architecture du Syst\u00e8me", {
    x: 0.5, y: 0.3, w: 9, h: 0.5,
    fontSize: 28, fontFace: "Arial",
    color: theme.primary, bold: true,
    align: "left", valign: "middle"
  });

  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 0.8, w: 1.5, h: 0.05,
    fill: { color: theme.accent }
  });

  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 3.5, y: 1.3, w: 3, h: 0.8,
    fill: { color: theme.accent },
    rectRadius: 0.1
  });
  slide.addText("Next.js App", {
    x: 3.5, y: 1.3, w: 3, h: 0.8,
    fontSize: 18, fontFace: "Arial", color: "FFFFFF", bold: true,
    align: "center", valign: "middle"
  });

  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.5, y: 2.8, w: 3, h: 0.8,
    fill: { color: "DC382D" },
    rectRadius: 0.1
  });
  slide.addText("Redis Cache", {
    x: 0.5, y: 2.8, w: 3, h: 0.8,
    fontSize: 18, fontFace: "Arial", color: "FFFFFF", bold: true,
    align: "center", valign: "middle"
  });

  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 6.5, y: 2.8, w: 3, h: 0.8,
    fill: { color: theme.secondary },
    rectRadius: 0.1
  });
  slide.addText("PostgreSQL", {
    x: 6.5, y: 2.8, w: 3, h: 0.8,
    fontSize: 18, fontFace: "Arial", color: "FFFFFF", bold: true,
    align: "center", valign: "middle"
  });

  slide.addText("\u2193", {
    x: 2.0, y: 2.1, w: 1.5, h: 0.7,
    fontSize: 40, fontFace: "Arial", color: theme.light,
    align: "center", valign: "middle"
  });
  slide.addText("\u2193", {
    x: 6.5, y: 2.1, w: 1.5, h: 0.7,
    fontSize: 40, fontFace: "Arial", color: theme.light,
    align: "center", valign: "middle"
  });

  const items = [
    "Pattern Cache-Aside (Lazy Loading)",
    "V\u00e9rification du cache avant la base de donn\u00e9es",
    "Stockage des r\u00e9sultats avec TTL configurable",
    "R\u00e9duction drastique du temps de r\u00e9ponse"
  ];

  items.forEach((text, i) => {
    slide.addText(text, {
      x: 0.7, y: 3.7 + i * 0.4, w: 8.6, h: 0.35,
      fontSize: 18, fontFace: "Arial",
      color: theme.secondary,
      align: "left", valign: "middle"
    });
  });

  slide.addShape(pres.shapes.OVAL, {
    x: 9.3, y: 5.2, w: 0.35, h: 0.35,
    fill: { color: theme.accent }
  });
  slide.addText("4", {
    x: 9.3, y: 5.2, w: 0.35, h: 0.35,
    fontSize: 11, fontFace: "Arial",
    color: "FFFFFF", bold: true,
    align: "center", valign: "middle"
  });

  slide.addNotes("Notre architecture utilise le pattern Cache-Aside. L'application v\u00e9rifie d'abord Redis. Si les donn\u00e9es y sont, elles sont retourn\u00e9es imm\u00e9diatement. Sinon, PostgreSQL est interrog\u00e9e, les r\u00e9sultats sont stock\u00e9s dans Redis avec un TTL, puis retourn\u00e9s. Cette approche sert les requ\u00eates fr\u00e9quentes depuis la m\u00e9moire, beaucoup plus rapide que la base de donn\u00e9es.");
}

module.exports = { createSlide };
