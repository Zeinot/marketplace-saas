const pptxgen = require("pptxgenjs");

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  slide.addText("R\u00e9sultats des Tests Unitaires", {
    x: 0.5, y: 0.3, w: 9, h: 0.5,
    fontSize: 28, fontFace: "Arial",
    color: theme.primary, bold: true,
    align: "left", valign: "middle"
  });

  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 0.8, w: 1.5, h: 0.05,
    fill: { color: theme.accent }
  });

  // Results box
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.5, y: 1.2, w: 9, h: 1.2,
    fill: { color: "10b981" },
    rectRadius: 0.1
  });

  slide.addText("\u2705 Tous les tests passent avec succ\u00e8s", {
    x: 0.5, y: 1.25, w: 9, h: 0.5,
    fontSize: 28, fontFace: "Arial",
    color: "FFFFFF", bold: true,
    align: "center", valign: "middle"
  });

  slide.addText("8 tests / 8 pass\u00e9s  -  Couverture : cacheGet, cacheSet, invalidate, TTL, edge cases", {
    x: 0.5, y: 1.8, w: 9, h: 0.4,
    fontSize: 18, fontFace: "Arial",
    color: "FFFFFF",
    align: "center", valign: "middle"
  });

  // Full explanatory paragraph - max 8 lines
  slide.addText("Les r\u00e9sultats sont tr\u00e8s satisfaisants : les huit tests passent tous avec succ\u00e8s. Ils couvrent les op\u00e9rations de base, l'invalidation, le TTL avec expirations automatiques, et les cas limites comme null ou undefined. Cette couverture compl\u00e8te nous donne confiance dans la fiabilit\u00e9 du cache. Les tests s'ex\u00e9cutent automatiquement dans la pipeline d'int\u00e9gration continue.", {
    x: 0.5, y: 2.6, w: 9, h: 1.7,
    fontSize: 16, fontFace: "Arial",
    color: theme.secondary,
    align: "left", valign: "top"
  });

  // Page badge
  slide.addShape(pres.shapes.OVAL, {
    x: 9.3, y: 5.2, w: 0.4, h: 0.4,
    fill: { color: theme.accent }
  });
  slide.addText("12", {
    x: 9.3, y: 5.2, w: 0.4, h: 0.4,
    fontSize: 12, fontFace: "Arial",
    color: "FFFFFF", bold: true,
    align: "center", valign: "middle"
  });
}

module.exports = { createSlide };
