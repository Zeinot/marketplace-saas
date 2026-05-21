const pptxgen = require("pptxgenjs");

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  slide.addText("Merci de votre attention", {
    x: 0.5, y: 0.4, w: 9, h: 0.8,
    fontSize: 36, fontFace: "Arial",
    color: theme.primary, bold: true,
    align: "center", valign: "middle"
  });

  slide.addShape(pres.shapes.RECTANGLE, {
    x: 4, y: 1.2, w: 2, h: 0.05,
    fill: { color: theme.accent }
  });

  slide.addText("Questions \u0026 Discussion", {
    x: 0.5, y: 1.5, w: 9, h: 0.5,
    fontSize: 24, fontFace: "Arial",
    color: theme.secondary,
    align: "center", valign: "middle"
  });

  // Author info box
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 2.5, y: 2.3, w: 5, h: 1.2,
    fill: { color: "FFFFFF" },
    line: { color: theme.light, width: 2 },
    rectRadius: 0.1
  });

  slide.addText("Pr\u00e9sent\u00e9 par", {
    x: 2.5, y: 2.35, w: 5, h: 0.3,
    fontSize: 14, fontFace: "Arial",
    color: theme.secondary,
    align: "center", valign: "middle"
  });

  slide.addText("Omar Sarsar \u00b7 Iliass Hariz", {
    x: 2.5, y: 2.65, w: 5, h: 0.35,
    fontSize: 20, fontFace: "Arial",
    color: theme.primary, bold: true,
    align: "center", valign: "middle"
  });

  slide.addText("2026", {
    x: 2.5, y: 3.0, w: 5, h: 0.3,
    fontSize: 16, fontFace: "Arial",
    color: theme.secondary,
    align: "center", valign: "middle"
  });

  // Full explanatory paragraph - max 6 lines
  slide.addText("Nous vous remercions pour votre attention. Ce projet a d\u00e9montr\u00e9 que Redis r\u00e9duit drastiquement les temps de r\u00e9ponse et la charge sur la base de donn\u00e9es, tout en maintenant la coh\u00e9rence. Nous esp\u00e9rons que cette pr\u00e9sentation vous a donn\u00e9 une vision claire du caching distribu\u00e9. N'h\u00e9sitez pas \u00e0 poser vos questions.", {
    x: 0.5, y: 3.7, w: 9, h: 1.5,
    fontSize: 16, fontFace: "Arial",
    color: theme.secondary,
    align: "left", valign: "top"
  });

  // Page badge
  slide.addShape(pres.shapes.OVAL, {
    x: 9.3, y: 5.2, w: 0.4, h: 0.4,
    fill: { color: theme.accent }
  });
  slide.addText("20", {
    x: 9.3, y: 5.2, w: 0.4, h: 0.4,
    fontSize: 12, fontFace: "Arial",
    color: "FFFFFF", bold: true,
    align: "center", valign: "middle"
  });
}

module.exports = { createSlide };
