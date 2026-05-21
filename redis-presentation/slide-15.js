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

  const items = [
    "getLaunches : op\u00e9ration la plus utilis\u00e9e sur la page d'accueil",
    "getPosts : feed avec changements fr\u00e9quents",
    "getLaunchBySlug : page d\u00e9taill\u00e9e d'un produit",
    "getCategories : donn\u00e9es stables avec TTL long"
  ];

  items.forEach((text, i) => {
    slide.addText(text, {
      x: 0.7, y: 3.0 + i * 0.4, w: 8.6, h: 0.35,
      fontSize: 16, fontFace: "Arial",
      color: theme.secondary,
      align: "left", valign: "middle"
    });
  });

  slide.addShape(pres.shapes.OVAL, {
    x: 9.3, y: 5.2, w: 0.35, h: 0.35,
    fill: { color: theme.accent }
  });
  slide.addText("15", {
    x: 9.3, y: 5.2, w: 0.35, h: 0.35,
    fontSize: 11, fontFace: "Arial",
    color: "FFFFFF", bold: true,
    align: "center", valign: "middle"
  });

  slide.addNotes("Voici le tableau d\u00e9taill\u00e9 par op\u00e9ration. getLaunches, la plus utilis\u00e9e sur la page d'accueil, passe de huit cent cinquante-six \u00e0 douze millisecondes, soit quatre-vingt-dix-neuf virgule deux pour cent d'am\u00e9lioration. getPosts pour le feed passe de six cent quarante-trois \u00e0 quinze millisecondes.");
}

module.exports = { createSlide };
