const pptxgen = require("pptxgenjs");

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  slide.addText("Perspectives et Am\u00e9liorations Futures", {
    x: 0.5, y: 0.3, w: 9, h: 0.5,
    fontSize: 28, fontFace: "Arial",
    color: theme.primary, bold: true,
    align: "left", valign: "middle"
  });

  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 0.8, w: 1.5, h: 0.05,
    fill: { color: theme.accent }
  });

  // Full explanatory paragraph - max 15 lines
  slide.addText("Plusieurs pistes d'am\u00e9lioration sont envisageables. Premi\u00e8rement, un cluster Redis avec r\u00e9plication garantirait la haute disponibilit\u00e9 et la tol\u00e9rance aux pannes en production. Deuxi\u00e8mement, un cache LRU local c\u00f4t\u00e9 application compl\u00e9menterait Redis et r\u00e9duirait encore la latence. Troisi\u00e8mement, un syst\u00e8me de cache warming pr\u00e9chargerait automatiquement les donn\u00e9es populaires au d\u00e9marrage. Quatri\u00e8mement, Redis Streams permettrait une invalidation en temps r\u00e9el entre plusieurs instances en cas de d\u00e9ploiement multi-serveur. Enfin, un dashboard de monitoring visualiserait les taux de hit et miss, l'occupation m\u00e9moire et les performances globales en temps r\u00e9el.", {
    x: 0.5, y: 1.0, w: 9, h: 3.5,
    fontSize: 16, fontFace: "Arial",
    color: theme.secondary,
    align: "left", valign: "top"
  });

  // Page badge
  slide.addShape(pres.shapes.OVAL, {
    x: 9.3, y: 5.2, w: 0.4, h: 0.4,
    fill: { color: theme.accent }
  });
  slide.addText("19", {
    x: 9.3, y: 5.2, w: 0.4, h: 0.4,
    fontSize: 12, fontFace: "Arial",
    color: "FFFFFF", bold: true,
    align: "center", valign: "middle"
  });
}

module.exports = { createSlide };
