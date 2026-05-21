const pptxgen = require("pptxgenjs");

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  slide.addText("Conclusion et Resultats", {
    x: 0.5, y: 0.3, w: 9, h: 0.5,
    fontSize: 28, fontFace: "Arial",
    color: theme.primary, bold: true,
    align: "left", valign: "middle"
  });

  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 0.8, w: 2, h: 0.05,
    fill: { color: theme.accent }
  });

  const results = [
    { label: "Temps de reponse", value: "-99%", desc: "en moyenne" },
    { label: "Charge DB", value: "-85%", desc: "requetes reduites" },
    { label: "Tests", value: "100%", desc: "tous passent" }
  ];

  results.forEach((r, i) => {
    const x = 0.5 + i * 3.1;
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: x, y: 1.2, w: 2.8, h: 1.2,
      fill: { color: "2c5282" },
      rectRadius: 0.1
    });

    slide.addText(r.value, {
      x: x, y: 1.25, w: 2.8, h: 0.5,
      fontSize: 32, fontFace: "Arial",
      color: "63b3ed", bold: true,
      align: "center", valign: "middle"
    });

    slide.addText(r.label, {
      x: x, y: 1.8, w: 2.8, h: 0.25,
      fontSize: 14, fontFace: "Arial",
      color: theme.primary, bold: true,
      align: "center", valign: "middle"
    });

    slide.addText(r.desc, {
      x: x, y: 2.05, w: 2.8, h: 0.25,
      fontSize: 12, fontFace: "Arial",
      color: theme.secondary,
      align: "center", valign: "middle"
    });
  });

  slide.addText("En conclusion, tous les objectifs ont ete atteints. Le temps de reponse moyen a ete reduit de quatre-vingt-dix-neuf pour cent. La charge sur PostgreSQL a diminue de quatre-vingt-cinq pour cent grace a la redirection des requetes vers Redis. Les huit tests unitaires passent tous. L'integration du cache distribue avec Redis et Docker Compose a ameliore significativement les performances.", {
    x: 0.5, y: 2.6, w: 9, h: 2.0,
    fontSize: 18, fontFace: "Arial",
    color: theme.secondary,
    align: "left", valign: "top"
  });

  slide.addNotes("En conclusion, tous les objectifs ont ete atteints. Le temps de reponse moyen a ete reduit de quatre-vingt-dix-neuf pour cent. La charge sur PostgreSQL a diminue de quatre-vingt-cinq pour cent grace a la redirection des requetes vers Redis. Les huit tests unitaires passent tous.");
}

module.exports = { createSlide };
