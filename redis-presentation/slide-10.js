const pptxgen = require("pptxgenjs");

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  slide.addText("Merci de votre attention", {
    x: 0.5, y: 0.8, w: 9, h: 0.8,
    fontSize: 36, fontFace: "Arial",
    color: theme.primary, bold: true,
    align: "center", valign: "middle"
  });

  slide.addShape(pres.shapes.RECTANGLE, {
    x: 4, y: 1.6, w: 2, h: 0.05,
    fill: { color: theme.accent }
  });

  slide.addText("Questions et Discussion", {
    x: 0.5, y: 1.8, w: 9, h: 0.5,
    fontSize: 24, fontFace: "Arial",
    color: theme.secondary,
    align: "center", valign: "middle"
  });

  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 2.5, y: 2.5, w: 5, h: 1.0,
    fill: { color: "2c5282" },
    line: { color: theme.accent, width: 2 },
    rectRadius: 0.1
  });

  slide.addText("Omar Sarsar & Iliass Hariz", {
    x: 2.5, y: 2.7, w: 5, h: 0.35,
    fontSize: 20, fontFace: "Arial",
    color: theme.primary, bold: true,
    align: "center", valign: "middle"
  });

  slide.addText("2026", {
    x: 2.5, y: 3.1, w: 5, h: 0.25,
    fontSize: 16, fontFace: "Arial",
    color: theme.secondary,
    align: "center", valign: "middle"
  });

  slide.addNotes("Nous vous remercions pour votre attention. Ce projet a demontre que Redis peut reduire drastiquement les temps de reponse et la charge sur la base de donnees, tout en maintenant la coherence des donnees grace a une strategie d'invalidation appropriee. Nous esperons que cette presentation vous a donne une vision claire des avantages et des bonnes pratiques du caching distribue. N'hesitez pas a nous poser des questions sur les aspects techniques, les performances ou les ameliorations futures envisagees.");
}

module.exports = { createSlide };
