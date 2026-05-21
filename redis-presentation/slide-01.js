const pptxgen = require("pptxgenjs");

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  slide.addText("HEEC Marrakech", {
    x: 0.5, y: 0.3, w: 9, h: 0.35,
    fontSize: 14, fontFace: "Arial",
    color: theme.secondary,
    align: "center", valign: "middle"
  });

  slide.addShape(pres.shapes.RECTANGLE, {
    x: 3.5, y: 1.0, w: 3, h: 0.03,
    fill: { color: theme.accent }
  });

  slide.addText("Int\u00e9gration du Cache Distribu\u00e9\navec Redis dans une Application\nMarketplace SaaS", {
    x: 0.5, y: 1.2, w: 9, h: 1.2,
    fontSize: 32, fontFace: "Arial",
    color: theme.primary, bold: true,
    align: "center", valign: "middle"
  });

  slide.addText("Projet de Fin d'\u00c9tudes - Ann\u00e9e Universitaire 2025/2026", {
    x: 0.5, y: 2.5, w: 9, h: 0.4,
    fontSize: 16, fontFace: "Arial",
    color: theme.secondary,
    align: "center", valign: "middle"
  });

  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 2.5, y: 3.0, w: 5, h: 0.7,
    fill: { color: "FFFFFF" },
    line: { color: theme.light, width: 2 },
    rectRadius: 0.1
  });

  slide.addText("Pr\u00e9sent\u00e9 par", {
    x: 2.5, y: 3.05, w: 5, h: 0.2,
    fontSize: 12, fontFace: "Arial",
    color: theme.secondary,
    align: "center", valign: "middle"
  });

  slide.addText("Omar Sarsar  \u00b7  Iliass Hariz", {
    x: 2.5, y: 3.3, w: 5, h: 0.3,
    fontSize: 18, fontFace: "Arial",
    color: theme.primary, bold: true,
    align: "center", valign: "middle"
  });

  const bullets = [
    "Contexte et Probl\u00e9matique",
    "Architecture du Cache Distribu\u00e9",
    "Impl\u00e9mentation Technique",
    "Tests et Validation",
    "R\u00e9sultats et Conclusion"
  ];

  bullets.forEach((text, i) => {
    slide.addText(text, {
      x: 0.5, y: 3.85 + i * 0.35, w: 9, h: 0.3,
      fontSize: 18, fontFace: "Arial",
      color: theme.secondary,
      align: "center", valign: "middle"
    });
  });

  slide.addShape(pres.shapes.OVAL, {
    x: 9.3, y: 5.2, w: 0.35, h: 0.35,
    fill: { color: theme.accent }
  });
  slide.addText("1", {
    x: 9.3, y: 5.2, w: 0.35, h: 0.35,
    fontSize: 11, fontFace: "Arial",
    color: "FFFFFF", bold: true,
    align: "center", valign: "middle"
  });

  slide.addNotes("Bonjour, je suis Omar Sarsar et je suis accompagn\u00e9 d'Iliass Hariz. Nous allons pr\u00e9senter notre projet d'int\u00e9gration d'un cache distribu\u00e9 Redis dans une application marketplace SaaS. Ce projet a \u00e9t\u00e9 r\u00e9alis\u00e9 dans le cadre de notre formation \u00e0 HEEC Marrakech. Nous allons d'abord d\u00e9crire le contexte et la probl\u00e9matique, puis pr\u00e9senter l'architecture du cache distribu\u00e9, l'impl\u00e9mentation technique avec le code source, les tests et validations effectu\u00e9s, et enfin les r\u00e9sultats obtenus avec les mesures de performance.");
}

module.exports = { createSlide };
