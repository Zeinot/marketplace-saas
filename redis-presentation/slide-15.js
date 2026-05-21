const pptxgen = require("pptxgenjs");

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  slide.addText("Resultats de Performance", {
    x: 0.5, y: 0.3, w: 9, h: 0.5,
    fontSize: 28, fontFace: "Arial",
    color: theme.primary, bold: true,
    align: "left", valign: "middle"
  });

  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 0.8, w: 2, h: 0.05,
    fill: { color: theme.accent }
  });

  const rows = [
    ["Operation", "Sans Cache", "Avec Cache", "Amelioration"],
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
    fill: { color: "2c5282" },
    align: "center",
    valign: "middle"
  });

  slide.addText("Voici le tableau detaille par operation. getLaunches, la plus utilisee sur la page d'accueil, passe de huit cent cinquante-six a douze millisecondes, soit quatre-vingt-dix-neuf virgule deux pour cent d'amelioration. getPosts pour le feed passe de six cent quarante-trois a quinze millisecondes.", {
    x: 0.5, y: 3.0, w: 9, h: 2.0,
    fontSize: 18, fontFace: "Arial",
    color: theme.secondary,
    align: "left", valign: "top"
  });

  slide.addNotes("Voici le tableau detaille par operation. getLaunches, la plus utilisee sur la page d'accueil, passe de huit cent cinquante-six a douze millisecondes, soit quatre-vingt-dix-neuf virgule deux pour cent d'amelioration. getPosts pour le feed passe de six cent quarante-trois a quinze millisecondes.");
}

module.exports = { createSlide };
