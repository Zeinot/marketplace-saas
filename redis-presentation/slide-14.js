const pptxgen = require("pptxgenjs");

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  slide.addText("Mesures de Performance", {
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
    { label: "Avec Cache", value: "12ms", sub: "moyenne" },
    { label: "Sans Cache", value: "856ms", sub: "moyenne" },
    { label: "Amelioration", value: "99%", sub: "plus rapide" }
  ];

  metrics.forEach((metric, i) => {
    const x = 0.5 + i * 3.1;
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: x, y: 1.2, w: 2.8, h: 1.2,
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
      x: x, y: 1.8, w: 2.8, h: 0.25,
      fontSize: 14, fontFace: "Arial",
      color: theme.primary,
      align: "center", valign: "middle"
    });

    slide.addText(metric.sub, {
      x: x, y: 2.05, w: 2.8, h: 0.25,
      fontSize: 12, fontFace: "Arial",
      color: theme.secondary,
      align: "center", valign: "middle"
    });
  });

  slide.addText("Les mesures de performance montrent des resultats impressionnants. Avec le cache Redis, le temps de reponse moyen est de douze millisecondes contre huit cent cinquante-six millisecondes sans cache, soit quatre-vingt-dix-neuf pour cent d'amelioration. Les requetes getLaunches passent de plusieurs centaines de millisecondes a moins de quinze millisecondes.", {
    x: 0.5, y: 2.6, w: 9, h: 1.8,
    fontSize: 18, fontFace: "Arial",
    color: theme.secondary,
    align: "left", valign: "top"
  });

  slide.addNotes("Les mesures montrent des resultats impressionnants. Avec le cache Redis, le temps de reponse moyen est de douze millisecondes contre huit cent cinquante-six millisecondes sans cache, soit quatre-vingt-dix-neuf pour cent d'amelioration. Les requetes getLaunches passent de plusieurs centaines de millisecondes a moins de quinze millisecondes.");
}

module.exports = { createSlide };
