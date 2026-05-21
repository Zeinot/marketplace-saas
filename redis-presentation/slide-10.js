const pptxgen = require("pptxgenjs");

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  slide.addText("Strat\u00e9gie d'Invalidation", {
    x: 0.5, y: 0.3, w: 9, h: 0.5,
    fontSize: 28, fontFace: "Arial",
    color: theme.primary, bold: true,
    align: "left", valign: "middle"
  });

  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 0.8, w: 1.5, h: 0.05,
    fill: { color: theme.accent }
  });

  // Diagram boxes
  const boxY = 1.2;
  const boxH = 0.5;

  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.5, y: boxY, w: 2, h: boxH,
    fill: { color: "dc2626" },
    rectRadius: 0.1
  });
  slide.addText("Create", {
    x: 0.5, y: boxY, w: 2, h: boxH,
    fontSize: 14, fontFace: "Arial",
    color: "FFFFFF", bold: true,
    align: "center", valign: "middle"
  });

  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 2.8, y: boxY, w: 2, h: boxH,
    fill: { color: "dc2626" },
    rectRadius: 0.1
  });
  slide.addText("Update", {
    x: 2.8, y: boxY, w: 2, h: boxH,
    fontSize: 14, fontFace: "Arial",
    color: "FFFFFF", bold: true,
    align: "center", valign: "middle"
  });

  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 5.1, y: boxY, w: 2, h: boxH,
    fill: { color: "dc2626" },
    rectRadius: 0.1
  });
  slide.addText("Delete", {
    x: 5.1, y: boxY, w: 2, h: boxH,
    fontSize: 14, fontFace: "Arial",
    color: "FFFFFF", bold: true,
    align: "center", valign: "middle"
  });

  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 7.4, y: boxY, w: 2, h: boxH,
    fill: { color: "dc2626" },
    rectRadius: 0.1
  });
  slide.addText("Upvote", {
    x: 7.4, y: boxY, w: 2, h: boxH,
    fontSize: 14, fontFace: "Arial",
    color: "FFFFFF", bold: true,
    align: "center", valign: "middle"
  });

  // Arrows down
  [1.5, 3.8, 6.1, 8.4].forEach(x => {
    slide.addText("\u2193", {
      x: x, y: boxY + 0.5, w: 0.5, h: 0.7,
      fontSize: 24, fontFace: "Arial",
      color: "dc2626",
      align: "center", valign: "middle"
    });
  });

  // Invalidate box
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 2.5, y: 2.2, w: 5, h: boxH,
    fill: { color: "7c3aed" },
    rectRadius: 0.1
  });
  slide.addText("invalidateCache(cacheKey)", {
    x: 2.5, y: 2.2, w: 5, h: boxH,
    fontSize: 16, fontFace: "Consolas",
    color: "FFFFFF", bold: true,
    align: "center", valign: "middle"
  });

  // Full explanatory paragraph - max 7 lines
  slide.addText("L'invalidation est essentielle pour la coh\u00e9rence. Chaque op\u00e9ration d'\u00e9criture comme create, update, delete ou upvote invalide imm\u00e9diatement le cache. La fonction invalidateCache supprime les cl\u00e9s correspondantes de Redis. Le TTL sert de m\u00e9canisme d'expiration automatique. Les cl\u00e9s utilisent le pr\u00e9fixe saas: pour \u00e9viter les collisions.", {
    x: 0.5, y: 2.9, w: 9, h: 1.6,
    fontSize: 16, fontFace: "Arial",
    color: theme.secondary,
    align: "left", valign: "top"
  });

  // Page badge
  slide.addShape(pres.shapes.OVAL, {
    x: 9.3, y: 5.2, w: 0.4, h: 0.4,
    fill: { color: theme.accent }
  });
  slide.addText("10", {
    x: 9.3, y: 5.2, w: 0.4, h: 0.4,
    fontSize: 12, fontFace: "Arial",
    color: "FFFFFF", bold: true,
    align: "center", valign: "middle"
  });

  slide.addNotes("L'invalidation garantit la coh\u00e9rence des donn\u00e9es. Chaque op\u00e9ration d'\u00e9criture comme create, update, delete ou upvote d\u00e9clenche imm\u00e9diatement invalidateCache pour supprimer les cl\u00e9s concern\u00e9es de Redis. Le TTL compl\u00e8te ce m\u00e9canisme par une expiration automatique. Le pr\u00e9fixe saas: sur les cl\u00e9s \u00e9vite toute collision avec d'autres applications.");
}

module.exports = { createSlide };
