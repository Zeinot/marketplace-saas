const pptxgen = require("pptxgenjs");

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  slide.addText("Comparaison Graphique", {
    x: 0.5, y: 0.3, w: 9, h: 0.5,
    fontSize: 28, fontFace: "Arial",
    color: theme.primary, bold: true,
    align: "left", valign: "middle"
  });

  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 0.8, w: 1.5, h: 0.05,
    fill: { color: theme.accent }
  });

  const bars = [
    { label: "Sans Cache", color: "ef4444", values: [85.6, 64.3, 23.4, 18.9] },
    { label: "Avec Cache", color: "10b981", values: [1.2, 1.5, 0.8, 0.5] }
  ];

  const operations = ["getLaunches", "getPosts", "getLaunchBySlug", "getCategories"];
  const barWidth = 1.8;
  const barMaxHeight = 2.5;
  const startY = 3.3;
  const startX = 0.7;

  operations.forEach((op, i) => {
    const x = startX + i * 2.3;

    const h1 = (bars[0].values[i] / 85.6) * barMaxHeight;
    slide.addShape(pres.shapes.RECTANGLE, {
      x: x, y: startY - h1, w: barWidth / 2 - 0.1, h: h1,
      fill: { color: bars[0].color }
    });

    const h2 = (bars[1].values[i] / 85.6) * barMaxHeight;
    slide.addShape(pres.shapes.RECTANGLE, {
      x: x + barWidth / 2 + 0.1, y: startY - h2, w: barWidth / 2 - 0.1, h: h2,
      fill: { color: bars[1].color }
    });

    slide.addText(op, {
      x: x, y: startY + 0.1, w: barWidth, h: 0.3,
      fontSize: 11, fontFace: "Arial",
      color: theme.secondary,
      align: "center", valign: "top"
    });
  });

  slide.addShape(pres.shapes.RECTANGLE, {
    x: 6.5, y: 1.2, w: 0.3, h: 0.2,
    fill: { color: "ef4444" }
  });
  slide.addText("Sans Cache", {
    x: 6.9, y: 1.15, w: 2, h: 0.3,
    fontSize: 12, fontFace: "Arial", color: theme.secondary,
    align: "left", valign: "middle"
  });

  slide.addShape(pres.shapes.RECTANGLE, {
    x: 6.5, y: 1.5, w: 0.3, h: 0.2,
    fill: { color: "10b981" }
  });
  slide.addText("Avec Cache", {
    x: 6.9, y: 1.45, w: 2, h: 0.3,
    fontSize: 12, fontFace: "Arial", color: theme.secondary,
    align: "left", valign: "middle"
  });

  const items = [
    "Barres rouges : temps sans cache",
    "Barres vertes : temps avec cache",
    "Diff\u00e9rence spectaculaire sur getLaunches",
    "Efficacit\u00e9 du cache Redis confirm\u00e9e"
  ];

  items.forEach((text, i) => {
    slide.addText(text, {
      x: 0.7, y: 3.7 + i * 0.35, w: 8.6, h: 0.3,
      fontSize: 16, fontFace: "Arial",
      color: theme.secondary,
      align: "left", valign: "middle"
    });
  });

  slide.addShape(pres.shapes.OVAL, {
    x: 9.3, y: 5.2, w: 0.35, h: 0.35,
    fill: { color: theme.accent }
  });
  slide.addText("16", {
    x: 9.3, y: 5.2, w: 0.35, h: 0.35,
    fontSize: 11, fontFace: "Arial",
    color: "FFFFFF", bold: true,
    align: "center", valign: "middle"
  });

  slide.addNotes("Ce graphique illustre l'impact du cache Redis. Les barres rouges sont sans cache, les vertes avec cache. Les barres vertes sont quasiment invisibles, d\u00e9montrant l'efficacit\u00e9 du cache. getLaunches pr\u00e9sente la plus grande diff\u00e9rence, passant de quatre-vingt-cinq virgule six \u00e0 un virgule deux millisecondes.");
}

module.exports = { createSlide };
