const pptxgen = require("pptxgenjs");

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  slide.addText("Projet 11", {
    x: 0.5, y: 0.8, w: 9, h: 1.0,
    fontSize: 48, fontFace: "Arial",
    color: theme.primary, bold: true,
    align: "center", valign: "middle"
  });

  slide.addText("Cache Distribu\u00e9 avec Redis", {
    x: 0.5, y: 1.8, w: 9, h: 0.6,
    fontSize: 28, fontFace: "Arial",
    color: theme.accent,
    align: "center", valign: "middle"
  });

  slide.addText("Int\u00e9gration d'un cache distribu\u00e9 (Redis) \u00e0 une application web existante", {
    x: 0.5, y: 2.5, w: 9, h: 0.5,
    fontSize: 18, fontFace: "Arial",
    color: theme.secondary,
    align: "center", valign: "middle"
  });

  slide.addText("Omar Sarsar & Iliass Hariz", {
    x: 0.5, y: 3.2, w: 9, h: 0.4,
    fontSize: 20, fontFace: "Arial",
    color: theme.primary, bold: true,
    align: "center", valign: "middle"
  });

  slide.addText("2026", {
    x: 0.5, y: 3.7, w: 9, h: 0.3,
    fontSize: 16, fontFace: "Arial",
    color: theme.secondary,
    align: "center", valign: "middle"
  });

  slide.addNotes("Bonjour, je suis Omar Sarsar et je suis accompagn\u00e9 d'Iliass Hariz. Nous allons pr\u00e9senter notre projet d'int\u00e9gration d'un cache distribu\u00e9 Redis dans une application marketplace SaaS. Nous allons d\u00e9crire le contexte, l'architecture, l'impl\u00e9mentation, les tests et les r\u00e9sultats.");
}

module.exports = { createSlide };
