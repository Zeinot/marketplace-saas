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

  const items = [
    "Cluster Redis avec r\u00e9plication pour haute disponibilit\u00e9",
    "Cache LRU local c\u00f4t\u00e9 application pour r\u00e9duire la latence",
    "Cache warming pour pr\u00e9charger les donn\u00e9es populaires",
    "Redis Streams pour invalidation en temps r\u00e9el multi-serveur",
    "Dashboard de monitoring des taux de hit et miss"
  ];

  items.forEach((text, i) => {
    slide.addText(text, {
      x: 0.7, y: 1.0 + i * 0.65, w: 8.6, h: 0.6,
      fontSize: 18, fontFace: "Arial",
      color: theme.secondary,
      align: "left", valign: "middle"
    });
  });

  slide.addShape(pres.shapes.OVAL, {
    x: 9.3, y: 5.2, w: 0.35, h: 0.35,
    fill: { color: theme.accent }
  });
  slide.addText("19", {
    x: 9.3, y: 5.2, w: 0.35, h: 0.35,
    fontSize: 11, fontFace: "Arial",
    color: "FFFFFF", bold: true,
    align: "center", valign: "middle"
  });

  slide.addNotes("Plusieurs pistes d'am\u00e9lioration sont envisageables. Premi\u00e8rement, un cluster Redis avec r\u00e9plication garantirait la haute disponibilit\u00e9. Deuxi\u00e8mement, un cache LRU local c\u00f4t\u00e9 application compl\u00e9menterait Redis. Troisi\u00e8mement, un syst\u00e8me de cache warming pr\u00e9chargerait les donn\u00e9es populaires. Quatri\u00e8mement, Redis Streams permettrait une invalidation en temps r\u00e9el entre plusieurs instances.");
}

module.exports = { createSlide };
