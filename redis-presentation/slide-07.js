const pptxgen = require("pptxgenjs");

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  slide.addText("Int\u00e9gration dans les Actions", {
    x: 0.5, y: 0.3, w: 9, h: 0.5,
    fontSize: 28, fontFace: "Arial",
    color: theme.primary, bold: true,
    align: "left", valign: "middle"
  });

  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 0.8, w: 1.5, h: 0.05,
    fill: { color: theme.accent }
  });

  // Flow boxes
  const boxY = 1.4;
  const boxH = 0.6;

  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.5, y: boxY, w: 2.5, h: boxH,
    fill: { color: theme.secondary },
    rectRadius: 0.1
  });
  slide.addText("1. V\u00e9rifier Cache", {
    x: 0.5, y: boxY, w: 2.5, h: boxH,
    fontSize: 16, fontFace: "Arial", color: "FFFFFF", bold: true,
    align: "center", valign: "middle"
  });

  slide.addText("\u2192", {
    x: 3.1, y: boxY, w: 0.5, h: boxH,
    fontSize: 24, fontFace: "Arial", color: theme.accent,
    align: "center", valign: "middle"
  });

  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 3.7, y: boxY, w: 2.5, h: boxH,
    fill: { color: "059669" },
    rectRadius: 0.1
  });
  slide.addText("2. Cache Hit?", {
    x: 3.7, y: boxY, w: 2.5, h: boxH,
    fontSize: 16, fontFace: "Arial", color: "FFFFFF", bold: true,
    align: "center", valign: "middle"
  });

  slide.addText("\u2193", {
    x: 4.7, y: boxY + 0.6, w: 0.5, h: 0.7,
    fontSize: 24, fontFace: "Arial", color: "059669",
    align: "center", valign: "middle"
  });

  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 3.7, y: boxY + 1.1, w: 2.5, h: boxH,
    fill: { color: "10b981" },
    rectRadius: 0.1
  });
  slide.addText("Oui: Retourner", {
    x: 3.7, y: boxY + 1.1, w: 2.5, h: boxH,
    fontSize: 14, fontFace: "Arial", color: "FFFFFF", bold: true,
    align: "center", valign: "middle"
  });

  slide.addText("\u2192", {
    x: 6.3, y: boxY, w: 0.5, h: boxH,
    fontSize: 24, fontFace: "Arial", color: theme.accent,
    align: "center", valign: "middle"
  });

  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 6.9, y: boxY, w: 2.5, h: boxH,
    fill: { color: "dc2626" },
    rectRadius: 0.1
  });
  slide.addText("3. Cache Miss", {
    x: 6.9, y: boxY, w: 2.5, h: boxH,
    fontSize: 16, fontFace: "Arial", color: "FFFFFF", bold: true,
    align: "center", valign: "middle"
  });

  slide.addText("\u2193", {
    x: 7.9, y: boxY + 0.6, w: 0.5, h: 0.7,
    fontSize: 24, fontFace: "Arial", color: "dc2626",
    align: "center", valign: "middle"
  });

  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 6.9, y: boxY + 1.1, w: 2.5, h: boxH,
    fill: { color: theme.secondary },
    rectRadius: 0.1
  });
  slide.addText("4. Interroger DB", {
    x: 6.9, y: boxY + 1.1, w: 2.5, h: boxH,
    fontSize: 14, fontFace: "Arial", color: "FFFFFF", bold: true,
    align: "center", valign: "middle"
  });

  const items = [
    "G\u00e9n\u00e9ration de cl\u00e9 unique par requ\u00eate",
    "V\u00e9rification Redis avant PostgreSQL",
    "Stockage automatique avec TTL appropri\u00e9",
    "Application coh\u00e9rente sur toutes les lectures"
  ];

  items.forEach((text, i) => {
    slide.addText(text, {
      x: 0.7, y: 3.2 + i * 0.4, w: 8.6, h: 0.35,
      fontSize: 16, fontFace: "Arial",
      color: theme.secondary,
      align: "left", valign: "middle"
    });
  });

  slide.addShape(pres.shapes.OVAL, {
    x: 9.3, y: 5.2, w: 0.35, h: 0.35,
    fill: { color: theme.accent }
  });
  slide.addText("7", {
    x: 9.3, y: 5.2, w: 0.35, h: 0.35,
    fontSize: 11, fontFace: "Arial",
    color: "FFFFFF", bold: true,
    align: "center", valign: "middle"
  });

  slide.addNotes("L'int\u00e9gration suit le pattern Cache-Aside. Chaque action g\u00e9n\u00e8re une cl\u00e9 unique selon ses param\u00e8tres, v\u00e9rifie Redis, et retourne les donn\u00e9es si elles existent. En cas de cache miss, l'action interroge PostgreSQL, stocke les r\u00e9sultats dans Redis avec un TTL adapt\u00e9, puis les retourne. Cette logique est appliqu\u00e9e uniform\u00e9ment sur toutes les lectures.");
}

module.exports = { createSlide };
