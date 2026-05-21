const pptxgen = require("pptxgenjs");

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  slide.addText("Tests et Validation", {
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
    x: 0.5, y: 1.2, w: 9, h: 1.0,
    fill: { color: "059669" },
    rectRadius: 0.1
  });

  slide.addText("\u2705 8 tests / 8 pass\u00e9s", {
    x: 0.5, y: 1.3, w: 9, h: 0.5,
    fontSize: 32, fontFace: "Arial", color: "FFFFFF", bold: true,
    align: "center", valign: "middle"
  });

  slide.addText("Couverture : cacheGet, cacheSet, invalidate, TTL, edge cases", {
    x: 0.5, y: 1.8, w: 9, h: 0.3,
    fontSize: 16, fontFace: "Arial", color: "FFFFFF",
    align: "center", valign: "middle"
  });

  const items = [
    "Tests Jest avec instance Redis locale",
    "Validation du set, get et invalidation",
    "Gestion des cas limites (null, undefined)",
    "Tests executes dans la pipeline CI"
  ];

  items.forEach((text, i) => {
    slide.addText(text, {
      x: 0.7, y: 2.5 + i * 0.55, w: 8.6, h: 0.5,
      fontSize: 20, fontFace: "Arial",
      color: theme.secondary,
      align: "left", valign: "middle"
    });
  });

  slide.addNotes("Les resultats des tests unitaires sont tres satisfaisants. Les huit tests ecrits passent tous avec succes, soit cent pour cent de reussite. Ces tests couvrent les operations de base comme cacheGet et cacheSet, l'invalidation avec invalidateCache, le comportement du TTL avec les expirations automatiques, et des cas limites comme la gestion des donnees null ou undefined. La couverture est complete pour les fonctions principales de la couche d'abstraction. Ces resultats nous donnent confiance dans la fiabilite du cache et nous permettent d'evoluer en toute securite. Les tests sont executes automatiquement dans la pipeline d'integration continue.");
}

module.exports = { createSlide };
