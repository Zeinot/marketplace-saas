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
    x: 0.5, y: 0.8, w: 1.5, h: 0.05,
    fill: { color: theme.accent }
  });

  const metrics = [
    { label: "Avec Cache", value: "12ms", sub: "moyenne" },
    { label: "Sans Cache", value: "856ms", sub: "moyenne" },
    { label: "Am\u00e9lioration", value: "99%", sub: "plus rapide" }
  ];

  metrics.forEach((metric, i) => {
    const x = 0.5 + i * 3.1;
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: x, y: 1.2, w: 2.8, h: 1.2,
      fill: { color: "FFFFFF" },
      line: { color: i === 2 ? "10b981" : theme.light, width: 2 },
      rectRadius: 0.1
    });

    slide.addText(metric.value, {
      x: x, y: 1.25, w: 2.8, h: 0.5,
      fontSize: 36, fontFace: "Arial",
      color: i === 2 ? "10b981" : theme.primary, bold: true,
      align: "center", valign: "middle"
    });

    slide.addText(metric.label, {
      x: x, y: 1.8, w: 2.8, h: 0.25,
      fontSize: 14, fontFace: "Arial",
      color: theme.secondary,
      align: "center", valign: "middle"
    });

    slide.addText(metric.sub, {
      x: x, y: 2.05, w: 2.8, h: 0.25,
      fontSize: 12, fontFace: "Arial",
      color: theme.secondary,
      align: "center", valign: "middle"
    });
  });

  const items = [
    "Temps de r\u00e9ponse moyen r\u00e9duit de 856ms \u00e0 12ms",
    "Am\u00e9lioration de quatre-vingt-dix-neuf pour cent",
    "getLaunches : de plusieurs centaines \u00e0 moins de 15ms",
    "Chargement presque instantan\u00e9 apr\u00e8s premi\u00e8re visite"
  ];

  items.forEach((text, i) => {
    slide.addText(text, {
      x: 0.7, y: 2.6 + i * 0.45, w: 8.6, h: 0.4,
      fontSize: 18, fontFace: "Arial",
      color: theme.secondary,
      align: "left", valign: "middle"
    });
  });

  slide.addShape(pres.shapes.OVAL, {
    x: 9.3, y: 5.2, w: 0.35, h: 0.35,
    fill: { color: theme.accent }
  });
  slide.addText("14", {
    x: 9.3, y: 5.2, w: 0.35, h: 0.35,
    fontSize: 11, fontFace: "Arial",
    color: "FFFFFF", bold: true,
    align: "center", valign: "middle"
  });

  slide.addNotes("Les mesures montrent des r\u00e9sultats impressionnants. Avec le cache Redis, le temps de r\u00e9ponse moyen est de douze millisecondes contre huit cent cinquante-six millisecondes sans cache, soit quatre-vingt-dix-neuf pour cent d'am\u00e9lioration. Les requ\u00eates getLaunches passent de plusieurs centaines de millisecondes \u00e0 moins de quinze millisecondes.");
}

module.exports = { createSlide };
