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
    x: 0.5, y: 0.8, w: 2, h: 0.05,
    fill: { color: theme.accent }
  });

  const items = [
    "Pattern Cache-Aside (Lazy Loading)",
    "V\u00e9rification du cache avant la base de donn\u00e9es",
    "Stockage des r\u00e9sultats avec TTL configurable",
    "R\u00e9duction drastique du temps de r\u00e9ponse"
  ];

  items.forEach((text, i) => {
    slide.addText(text, {
      x: 0.7, y: 1.1 + i * 0.6, w: 8.6, h: 0.5,
      fontSize: 22, fontFace: "Arial",
      color: theme.secondary,
      align: "left", valign: "middle"
    });
  });

  // Architecture boxes
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 3.5, y: 3.8, w: 3, h: 0.7,
    fill: { color: theme.accent },
    rectRadius: 0.1
  });
  slide.addText("Next.js App", {
    x: 3.5, y: 3.8, w: 3, h: 0.7,
    fontSize: 16, fontFace: "Arial", color: "FFFFFF", bold: true,
    align: "center", valign: "middle"
  });

  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.5, y: 4.6, w: 3, h: 0.7,
    fill: { color: "DC382D" },
    rectRadius: 0.1
  });
  slide.addText("Redis Cache", {
    x: 0.5, y: 4.6, w: 3, h: 0.7,
    fontSize: 16, fontFace: "Arial", color: "FFFFFF", bold: true,
    align: "center", valign: "middle"
  });

  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 6.5, y: 4.6, w: 3, h: 0.7,
    fill: { color: "2c5282" },
    rectRadius: 0.1
  });
  slide.addText("PostgreSQL", {
    x: 6.5, y: 4.6, w: 3, h: 0.7,
    fontSize: 16, fontFace: "Arial", color: "FFFFFF", bold: true,
    align: "center", valign: "middle"
  });

  slide.addNotes("Notre architecture utilise le pattern Cache-Aside, aussi appele Lazy Loading. Quand l'application Next.js recoit une requete, elle verifie d'abord si les donnees sont disponibles dans le cache Redis. Si elles y sont, l'application les retourne immediatement sans interroger la base de donnees. Si les donnees ne sont pas dans le cache, l'application les recupere depuis PostgreSQL, les stocke dans Redis avec un temps de vie defini, puis les retourne au client. Cette approche permet de servir les requetes frequentes directement depuis la memoire, ce qui est beaucoup plus rapide que d'interroger la base de donnees a chaque fois.");
}

module.exports = { createSlide };
