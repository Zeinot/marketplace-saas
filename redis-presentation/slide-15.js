const pptxgen = require("pptxgenjs");

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  slide.addText("Mesures de Performance (Suite)", {
    x: 0.5, y: 0.3, w: 9, h: 0.5,
    fontSize: 28, fontFace: "Arial",
    color: theme.primary, bold: true,
    align: "left", valign: "middle"
  });

  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 0.8, w: 1.5, h: 0.05,
    fill: { color: theme.accent }
  });

  // Operations table
  const rows = [
    ["Op\u00e9ration", "Sans Cache", "Avec Cache", "Am\u00e9lioration"],
    ["getLaunches", "856 ms", "12 ms", "99.2%"],
    ["getPosts", "643 ms", "15 ms", "97.7%"],
    ["getLaunchBySlug", "234 ms", "8 ms", "96.6%"],
    ["getCategories", "189 ms", "5 ms", "97.4%"]
  ];

  slide.addTable(rows, {
    x: 0.5, y: 1.1, w: 9,
    colW: [2.5, 2.2, 2.2, 2.1],
    fontSize: 16,
    fontFace: "Arial",
    color: theme.secondary,
    border: { pt: 1, color: theme.light },
    fill: { color: "FFFFFF" },
    align: "center",
    valign: "middle"
  });

  // Full explanatory paragraph - max 9 lines
  slide.addText("Voici le tableau d\u00e9taill\u00e9 par op\u00e9ration. getLaunches, la plus utilis\u00e9e sur la page d'accueil, passe de huit cent cinquante-six \u00e0 douze millisecondes, soit quatre-vingt-dix-neuf virgule deux pour cent d'am\u00e9lioration. getPosts pour le feed passe de six cent quarante-trois \u00e0 quinze millisecondes. getLaunchBySlug passe de deux cent trente-quatre \u00e0 huit millisecondes. getCategories passe de cent quatre-vingt-neuf \u00e0 cinq millisecondes.", {
    x: 0.5, y: 2.8, w: 9, h: 2.2,
    fontSize: 16, fontFace: "Arial",
    color: theme.secondary,
    align: "left", valign: "top"
  });

  // Page badge
  slide.addShape(pres.shapes.OVAL, {
    x: 9.3, y: 5.2, w: 0.4, h: 0.4,
    fill: { color: theme.accent }
  });
  slide.addText("15", {
    x: 9.3, y: 5.2, w: 0.4, h: 0.4,
    fontSize: 12, fontFace: "Arial",
    color: "FFFFFF", bold: true,
    align: "center", valign: "middle"
  });
}

module.exports = { createSlide };
