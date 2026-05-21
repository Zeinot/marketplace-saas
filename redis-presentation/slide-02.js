const pptxgen = require("pptxgenjs");

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  slide.addText("Table des mati\u00e8res", {
    x: 0.5, y: 0.4, w: 9, h: 0.6,
    fontSize: 32, fontFace: "Arial",
    color: theme.primary, bold: true,
    align: "left", valign: "middle"
  });

  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 1.0, w: 2, h: 0.05,
    fill: { color: theme.accent }
  });

  const items = [
    "1. Introduction et Contexte",
    "2. Architecture du Syst\u00e8me",
    "3. Infrastructure Docker",
    "4. Couche d'Abstraction du Cache",
    "5. Int\u00e9gration dans les Actions",
    "6. Invalidation du Cache",
    "7. Tests et Validation",
    "8. R\u00e9sultats de Performance",
    "9. Conclusion et Perspectives"
  ];

  items.forEach((text, i) => {
    slide.addText(text, {
      x: 0.7, y: 1.3 + i * 0.45, w: 8.6, h: 0.4,
      fontSize: 18, fontFace: "Arial",
      color: theme.secondary,
      align: "left", valign: "middle"
    });
  });

  slide.addNotes("Dans cette pr\u00e9sentation, nous allons d'abord d\u00e9crire le contexte du projet et expliquer pourquoi un cache distribu\u00e9 \u00e9tait n\u00e9cessaire. Ensuite, nous pr\u00e9senterons l'architecture du syst\u00e8me avec le pattern Cache-Aside, suivi de l'infrastructure Docker mise en place.");
}

module.exports = { createSlide };
