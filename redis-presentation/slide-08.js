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
  slide.addText("Tests et Validation", {
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

  // Green banner
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.5, y: 1.3, w: 9, h: 0.9,
    fill: { color: theme.success },
    rectRadius: 0.1
  });
  slide.addText("8/8 Tests Passes", {
    x: 0.5, y: 1.3, w: 9, h: 0.9,
    fontSize: 32, fontFace: "Inter",
    color: theme.primary, bold: true,
    align: "center", valign: "middle"
  });

  const items = [
    "Tests Jest avec instance Redis locale",
    "Validation du set, get et invalidation",
    "Gestion des cas limites (null, undefined)",
    "Tests executes dans la pipeline CI"
  ];

  items.forEach((text, i) => {
    slide.addText(text, {
      x: 0.7, y: 2.5 + i * 0.55, w: 8.6, h: 0.5,
      fontSize: 20, fontFace: "Inter",
      color: theme.secondary,
      align: "left", valign: "middle"
    });
  });

  // Slide badge
  addBadge(slide, theme, 8);

  slide.addNotes("Les resultats sont tres satisfaisants : les huit tests passent tous avec succes, soit cent pour cent de reussite. Ces tests couvrent les operations de base, l'invalidation, le TTL avec expirations automatiques, et les cas limites comme null ou undefined.");

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
