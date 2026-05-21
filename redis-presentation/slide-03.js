const pptxgen = require("pptxgenjs");

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  slide.addText("Architecture du Syst\u00e8me", {
    x: 0.5, y: 0.3, w: 9, h: 0.5,
    fontSize: 28, fontFace: "Arial",
    color: theme.primary, bold: true,
    align: "left", valign: "middle"
  });

  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 0.8, w: 2, h: 0.05,
    fill: { color: theme.accent }
  });

  slide.addText("Notre architecture repose sur le pattern Cache-Aside. L'application verifie d'abord Redis. Si les donnees y sont, elles sont retournees immediatement. Sinon, PostgreSQL est interrogee, les resultats sont stockes dans Redis avec un TTL, puis retournes. Cette approche sert les requetes frequentes depuis la memoire.", {
    x: 0.5, y: 1.0, w: 9, h: 1.8,
    fontSize: 18, fontFace: "Arial",
    color: theme.secondary,
    align: "left", valign: "top"
  });

  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 3.5, y: 2.6, w: 3, h: 0.7,
    fill: { color: theme.accent },
    rectRadius: 0.1
  });
  slide.addText("Next.js App", {
    x: 3.5, y: 2.6, w: 3, h: 0.7,
    fontSize: 16, fontFace: "Arial", color: "FFFFFF", bold: true,
    align: "center", valign: "middle"
  });

  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.5, y: 3.7, w: 3, h: 0.7,
    fill: { color: "DC382D" },
    rectRadius: 0.1
  });
  slide.addText("Redis Cache", {
    x: 0.5, y: 3.7, w: 3, h: 0.7,
    fontSize: 16, fontFace: "Arial", color: "FFFFFF", bold: true,
    align: "center", valign: "middle"
  });

  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 6.5, y: 3.7, w: 3, h: 0.7,
    fill: { color: "2c5282" },
    rectRadius: 0.1
  });
  slide.addText("PostgreSQL", {
    x: 6.5, y: 3.7, w: 3, h: 0.7,
    fontSize: 16, fontFace: "Arial", color: "FFFFFF", bold: true,
    align: "center", valign: "middle"
  });

  slide.addNotes("Notre architecture utilise le pattern Cache-Aside. L'application v\u00e9rifie d'abord Redis. Si les donn\u00e9es y sont, elles sont retourn\u00e9es imm\u00e9diatement. Sinon, PostgreSQL est interrog\u00e9e, les r\u00e9sultats sont stock\u00e9s dans Redis avec un TTL, puis retourn\u00e9s.");
}

module.exports = { createSlide };
