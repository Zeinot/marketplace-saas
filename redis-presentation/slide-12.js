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
    x: 0.5, y: 0.8, w: 2, h: 0.05,
    fill: { color: theme.accent }
  });

  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.5, y: 1.2, w: 9, h: 1.2,
    fill: { color: "059669" },
    rectRadius: 0.1
  });

  slide.addText("\u2705 Tous les tests passent avec succ\u00e8s", {
    x: 0.5, y: 1.3, w: 9, h: 0.5,
    fontSize: 28, fontFace: "Arial", color: "FFFFFF", bold: true,
    align: "center", valign: "middle"
  });

  slide.addText("8 tests / 8 pass\u00e9s  -  Couverture : cacheGet, cacheSet, invalidate, TTL, edge cases", {
    x: 0.5, y: 1.8, w: 9, h: 0.4,
    fontSize: 18, fontFace: "Arial", color: "FFFFFF",
    align: "center", valign: "middle"
  });

  slide.addText("Les resultats des tests unitaires sont tres satisfaisants : les huit tests ecrits passent tous avec succes. Ces tests couvrent les operations de base comme cacheGet et cacheSet, l'invalidation avec invalidateCache, le comportement du TTL avec les expirations automatiques, et des cas limites comme la gestion des donnees null ou undefined.", {
    x: 0.5, y: 2.6, w: 9, h: 1.8,
    fontSize: 18, fontFace: "Arial",
    color: theme.secondary,
    align: "left", valign: "top"
  });

  slide.addNotes("Les r\u00e9sultats sont tr\u00e8s satisfaisants : les huit tests passent tous avec succ\u00e8s. Ils couvrent les op\u00e9rations de base, l'invalidation, le TTL avec expirations automatiques, et les cas limites comme null ou undefined. Cette couverture compl\u00e8te nous donne confiance dans la fiabilit\u00e9 du cache.");
}

module.exports = { createSlide };
