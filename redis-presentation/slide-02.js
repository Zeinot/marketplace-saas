const pptxgen = require("pptxgenjs");

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  slide.addText("Plan de la Pr\u00e9sentation", {
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
    "1. Contexte du projet et probl\u00e9matique",
    "2. Architecture du syst\u00e8me avec Cache-Aside",
    "3. Infrastructure Docker et Redis",
    "4. Couche d'abstraction du cache",
    "5. Int\u00e9gration dans les actions de l'application",
    "6. Strat\u00e9gie d'invalidation du cache",
    "7. Tests unitaires et validation",
    "8. Mesures de performance et r\u00e9sultats",
    "9. Conclusion et perspectives"
  ];

  items.forEach((text, i) => {
    slide.addText(text, {
      x: 0.7, y: 1.3 + i * 0.45, w: 8.6, h: 0.4,
      fontSize: 18, fontFace: "Arial",
      color: theme.secondary,
      align: "left", valign: "middle"
    });
  });

  slide.addShape(pres.shapes.OVAL, {
    x: 9.3, y: 5.2, w: 0.35, h: 0.35,
    fill: { color: theme.accent }
  });
  slide.addText("2", {
    x: 9.3, y: 5.2, w: 0.35, h: 0.35,
    fontSize: 11, fontFace: "Arial",
    color: "FFFFFF", bold: true,
    align: "center", valign: "middle"
  });

  slide.addNotes("Dans cette pr\u00e9sentation, nous allons d'abord d\u00e9crire le contexte du projet et expliquer pourquoi un cache distribu\u00e9 \u00e9tait n\u00e9cessaire. Ensuite, nous pr\u00e9senterons l'architecture du syst\u00e8me avec le pattern Cache-Aside, suivi de l'infrastructure Docker mise en place. Nous d\u00e9taillerons ensuite la couche d'abstraction du cache et son int\u00e9gration dans les actions de l'application, ainsi que la strat\u00e9gie d'invalidation pour maintenir la coh\u00e9rence des donn\u00e9es.");
}

module.exports = { createSlide };
