const pptxgen = require("pptxgenjs");

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  slide.addText("R\u00e9sultats des Tests", {
    x: 0.5, y: 0.3, w: 9, h: 0.5,
    fontSize: 28, fontFace: "Arial",
    color: theme.primary, bold: true,
    align: "left", valign: "middle"
  });

  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 0.8, w: 2, h: 0.05,
    fill: { color: theme.accent }
  });

  slide.addText("Les resultats des tests unitaires sont tres satisfaisants. Les huit tests ecrits passent tous avec succes, soit cent pour cent de reussite. Ces tests couvrent les operations de base, l'invalidation, le TTL avec expirations automatiques, et les cas limites comme null ou undefined. Cette couverture complete valide la robustesse de notre implementation Redis.", {
    x: 0.5, y: 1.0, w: 9, h: 1.8,
    fontSize: 18, fontFace: "Arial",
    color: theme.secondary,
    align: "left", valign: "top"
  });

  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.5, y: 2.6, w: 9, h: 1.2,
    fill: { color: "059669" },
    rectRadius: 0.1
  });

  slide.addText("\u2705 Tous les tests passent avec succ\u00e8s", {
    x: 0.5, y: 2.7, w: 9, h: 0.5,
    fontSize: 28, fontFace: "Arial", color: "FFFFFF", bold: true,
    align: "center", valign: "middle"
  });

  slide.addText("8 tests / 8 pass\u00e9s  -  Couverture : 100%", {
    x: 0.5, y: 3.2, w: 9, h: 0.4,
    fontSize: 18, fontFace: "Arial", color: "FFFFFF",
    align: "center", valign: "middle"
  });

  slide.addNotes("Les resultats sont tres satisfaisants : les huit tests passent tous avec succes, soit cent pour cent de reussite. Ces tests couvrent les operations de base, l'invalidation, le TTL avec expirations automatiques, et les cas limites comme null ou undefined.");
}

module.exports = { createSlide };
