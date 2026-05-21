const pptxgen = require("pptxgenjs");

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  slide.addText("Bonnes Pratiques", {
    x: 0.5, y: 0.3, w: 9, h: 0.5,
    fontSize: 28, fontFace: "Arial",
    color: theme.primary, bold: true,
    align: "left", valign: "middle"
  });

  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 0.8, w: 2, h: 0.05,
    fill: { color: theme.accent }
  });

  slide.addText("Tout au long de ce projet, nous avons applique plusieurs bonnes pratiques essentielles. Premierement, choisir un TTL adapte a chaque type de donnee : les categories changent rarement et ont un TTL long de trente minutes, tandis que les commentaires dynamiques ont un TTL court de deux minutes. Deuxiemement, l'invalidation doit etre systematique.", {
    x: 0.5, y: 1.0, w: 9, h: 2.0,
    fontSize: 18, fontFace: "Arial",
    color: theme.secondary,
    align: "left", valign: "top"
  });

  const items = [
    "TTL adapte : categories 30min, commentaires 2min",
    "Invalidation systematique lors des ecritures",
    "Prefixe saas: pour eviter les collisions",
    "Tests unitaires pour valider le comportement",
    "Monitoring et logs pour suivre l'utilisation"
  ];

  items.forEach((text, i) => {
    slide.addText(text, {
      x: 0.7, y: 2.9 + i * 0.45, w: 8.6, h: 0.4,
      fontSize: 18, fontFace: "Arial",
      color: theme.secondary,
      align: "left", valign: "middle"
    });
  });

  slide.addNotes("Tout au long de ce projet, nous avons applique plusieurs bonnes pratiques. Premierement, choisir un TTL adapte : les categories changent rarement et ont un TTL long de trente minutes, tandis que les commentaires dynamiques ont un TTL court de deux minutes. Deuxiemement, l'invalidation doit etre systematique.");
}

module.exports = { createSlide };
