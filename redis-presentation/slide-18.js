const pptxgen = require("pptxgenjs");

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  slide.addText("Bonnes Pratiques de Cache", {
    x: 0.5, y: 0.3, w: 9, h: 0.5,
    fontSize: 28, fontFace: "Arial",
    color: theme.primary, bold: true,
    align: "left", valign: "middle"
  });

  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 0.8, w: 1.5, h: 0.05,
    fill: { color: theme.accent }
  });

  const items = [
    "Choisir un TTL adapt\u00e9 \u00e0 chaque type de donn\u00e9e",
    "Cat\u00e9gories stables : TTL long de 30 minutes",
    "Commentaires dynamiques : TTL court de 2 minutes",
    "Invalidation syst\u00e9matique lors des \u00e9critures",
    "Pr\u00e9fixe saas: pour \u00e9viter les collisions",
    "Tests unitaires pour valider le comportement",
    "Monitoring et logs pour suivre l'utilisation"
  ];

  items.forEach((text, i) => {
    slide.addText(text, {
      x: 0.7, y: 1.0 + i * 0.55, w: 8.6, h: 0.5,
      fontSize: 18, fontFace: "Arial",
      color: theme.secondary,
      align: "left", valign: "middle"
    });
  });

  slide.addShape(pres.shapes.OVAL, {
    x: 9.3, y: 5.2, w: 0.35, h: 0.35,
    fill: { color: theme.accent }
  });
  slide.addText("18", {
    x: 9.3, y: 5.2, w: 0.35, h: 0.35,
    fontSize: 11, fontFace: "Arial",
    color: "FFFFFF", bold: true,
    align: "center", valign: "middle"
  });

  slide.addNotes("Tout au long de ce projet, nous avons appliqu\u00e9 plusieurs bonnes pratiques. Premi\u00e8rement, choisir un TTL adapt\u00e9 : les cat\u00e9gories changent rarement et ont un TTL long de trente minutes, tandis que les commentaires dynamiques ont un TTL court de deux minutes. Deuxi\u00e8mement, l'invalidation doit \u00eatre syst\u00e9matique : chaque op\u00e9ration d'\u00e9criture invalide imm\u00e9diatement les cl\u00e9s.");
}

module.exports = { createSlide };
