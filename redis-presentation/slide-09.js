const pptxgen = require("pptxgenjs");

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  slide.addText("R\u00e9sultats de Performance", {
    x: 0.5, y: 0.3, w: 9, h: 0.5,
    fontSize: 28, fontFace: "Arial",
    color: theme.primary, bold: true,
    align: "left", valign: "middle"
  });

  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 0.8, w: 2, h: 0.05,
    fill: { color: theme.accent }
  });

  const metrics = [
    { label: "Avec Cache", value: "12ms" },
    { label: "Sans Cache", value: "856ms" },
    { label: "Am\u00e9lioration", value: "99%" }
  ];

  metrics.forEach((metric, i) => {
    const x = 0.5 + i * 3.1;
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: x, y: 1.2, w: 2.8, h: 1.0,
      fill: { color: "2c5282" },
      rectRadius: 0.1
    });

    slide.addText(metric.value, {
      x: x, y: 1.25, w: 2.8, h: 0.5,
      fontSize: 36, fontFace: "Arial",
      color: "63b3ed", bold: true,
      align: "center", valign: "middle"
    });

    slide.addText(metric.label, {
      x: x, y: 1.8, w: 2.8, h: 0.3,
      fontSize: 16, fontFace: "Arial",
      color: theme.primary,
      align: "center", valign: "middle"
    });
  });

  const items = [
    "getLaunches : 856ms \u2192 12ms (99.2%)",
    "getPosts : 643ms \u2192 15ms (97.7%)",
    "getLaunchBySlug : 234ms \u2192 8ms (96.6%)",
    "getCategories : 189ms \u2192 5ms (97.4%)"
  ];

  items.forEach((text, i) => {
    slide.addText(text, {
      x: 0.7, y: 2.5 + i * 0.55, w: 8.6, h: 0.5,
      fontSize: 20, fontFace: "Arial",
      color: theme.secondary,
      align: "left", valign: "middle"
    });
  });

  slide.addNotes("Les mesures de performance montrent des resultats impressionnants. Avec le cache Redis, le temps de reponse moyen est de douze millisecondes contre huit cent cinquante-six millisecondes sans cache, soit quatre-vingt-dix-neuf pour cent d'amelioration. Les requetes getLaunches, les plus frequentes sur la page d'accueil, passent de plusieurs centaines de millisecondes a moins de quinze millisecondes. L'operation getPosts pour le feed passe de six cent quarante-trois a quinze millisecondes. getLaunchBySlug pour la page detaillee d'un produit passe de deux cent trente-quatre a huit millisecondes. Enfin, getCategories, qui change rarement, passe de cent quatre-vingt-neuf a cinq millisecondes. Ces resultats demontrent l'efficacite du cache Redis sur tous les types de requetes.");
}

module.exports = { createSlide };
