const pptxgen = require("pptxgenjs");

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  // Top accent bar
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 0.06,
    fill: { color: theme.accent }
  });

  // Title
  slide.addText("Invalidation du Cache", {
    x: 0.5, y: 0.4, w: 9, h: 0.6,
    fontSize: 32, fontFace: "Inter",
    color: theme.primary, bold: true,
    align: "left", valign: "middle"
  });

  // Accent underline
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 1.0, w: 2, h: 0.04,
    fill: { color: theme.accent }
  });

  // Tags
  const tags = [
    { label: "Create", color: theme.success },
    { label: "Update", color: theme.accent },
    { label: "Delete", color: theme.redis },
    { label: "Upvote", color: theme.secondary }
  ];

  tags.forEach((tag, i) => {
    const x = 0.5 + i * 2.3;
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: x, y: 1.3, w: 2, h: 0.4,
      fill: { color: tag.color },
      rectRadius: 0.2
    });
    slide.addText(tag.label, {
      x: x, y: 1.3, w: 2, h: 0.4,
      fontSize: 14, fontFace: "Inter",
      color: theme.primary, bold: true,
      align: "center", valign: "middle"
    });
  });

  // Arrow down
  slide.addShape(pres.shapes.RIGHT_ARROW, {
    x: 4.5, y: 1.85, w: 1, h: 0.4,
    fill: { color: theme.accent },
    rotate: 90
  });

  // invalidateCache card
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 3, y: 2.4, w: 4, h: 0.6,
    fill: { color: theme.card },
    line: { color: theme.border, width: 1 },
    rectRadius: 0.1
  });
  slide.addText("invalidateCache()", {
    x: 3, y: 2.4, w: 4, h: 0.6,
    fontSize: 18, fontFace: "Inter",
    color: theme.primary, bold: true,
    align: "center", valign: "middle"
  });

  // Checkmark items
  const items = [
    "Invalidation immediate sur ecriture",
    "Suppression des cles correspondantes",
    "TTL comme expiration automatique",
    "Maintien de la coherence des donnees"
  ];

  items.forEach((text, i) => {
    slide.addText(text, {
      x: 0.7, y: 3.2 + i * 0.5, w: 8.6, h: 0.45,
      fontSize: 20, fontFace: "Inter",
      color: theme.secondary,
      align: "left", valign: "middle"
    });
  });

  // Transition note
  slide.addText("Transition : Iliass Hariz prend la suite.", {
    x: 0.5, y: 5.0, w: 9, h: 0.3,
    fontSize: 12, fontFace: "Inter",
    color: theme.secondary,
    align: "center", valign: "middle"
  });

  // Slide badge
  addBadge(slide, theme, 7);

  slide.addNotes("La strategie d'invalidation est essentielle pour maintenir la coherence. Chaque operation d'ecriture invalide immediatement le cache. La fonction invalidateCache supprime les cles correspondantes de Redis. Le TTL sert de mecanisme d'expiration automatique.");

  function addBadge(slide, theme, num) {
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 9.1, y: 5.05, w: 0.5, h: 0.35,
      fill: { color: theme.accent },
      rectRadius: 0.1
    });
    slide.addText(String(num), {
      x: 9.1, y: 5.05, w: 0.5, h: 0.35,
      fontSize: 12, fontFace: "Inter",
      color: "0d1b2a", bold: true,
      align: "center", valign: "middle"
    });
  }
}

module.exports = { createSlide };
