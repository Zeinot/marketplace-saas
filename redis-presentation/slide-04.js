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

  // Architecture boxes
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 3.5, y: 1.3, w: 3, h: 0.8,
    fill: { color: theme.accent },
    rectRadius: 0.1
  });
  slide.addText("Next.js App", {
    x: 3.5, y: 1.3, w: 3, h: 0.8,
    fontSize: 18, fontFace: "Arial",
    color: "FFFFFF", bold: true,
    align: "center", valign: "middle"
  });

  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.5, y: 2.8, w: 3, h: 0.8,
    fill: { color: "DC382D" },
    rectRadius: 0.1
  });
  slide.addText("Redis Cache", {
    x: 0.5, y: 2.8, w: 3, h: 0.8,
    fontSize: 18, fontFace: "Arial",
    color: "FFFFFF", bold: true,
    align: "center", valign: "middle"
  });

  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 6.5, y: 2.8, w: 3, h: 0.8,
    fill: { color: theme.secondary },
    rectRadius: 0.1
  });
  slide.addText("PostgreSQL", {
    x: 6.5, y: 2.8, w: 3, h: 0.8,
    fontSize: 18, fontFace: "Arial",
    color: "FFFFFF", bold: true,
    align: "center", valign: "middle"
  });

  // Arrows
  slide.addText("\u2193", {
    x: 2.0, y: 2.1, w: 1.5, h: 0.7,
    fontSize: 40, fontFace: "Arial",
    color: theme.light,
    align: "center", valign: "middle"
  });
  slide.addText("\u2193", {
    x: 6.5, y: 2.1, w: 1.5, h: 0.7,
    fontSize: 40, fontFace: "Arial",
    color: theme.light,
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

  slide.addNotes("L'architecture de notre syst\u00e8me repose sur le pattern Cache-Aside, aussi appel\u00e9 Lazy Loading. Voici comment cela fonctionne concr\u00e8tement : quand l'application Next.js re\u00e7oit une requ\u00eate, elle v\u00e9rifie d'abord si les donn\u00e9es demand\u00e9es sont disponibles dans le cache Redis. Si elles y sont, l'application les retourne imm\u00e9diatement sans interroger la base de donn\u00e9es. Si les donn\u00e9es ne sont pas dans le cache, l'application les r\u00e9cup\u00e8re depuis PostgreSQL, les stocke dans Redis avec un temps de vie d\u00e9fini, puis les retourne au client. Cette approche permet de servir les requ\u00eates fr\u00e9quentes directement depuis la m\u00e9moire, ce qui est beaucoup plus rapide que d'interroger la base de donn\u00e9es \u00e0 chaque fois.");
}

module.exports = { createSlide };
