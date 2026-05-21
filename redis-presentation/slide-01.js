const pptxgen = require("pptxgenjs");

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  // Top accent bar
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 0.06,
    fill: { color: theme.accent }
  });

  // Decorative circle
  slide.addShape(pres.shapes.OVAL, {
    x: 8.5, y: 0.8, w: 1.2, h: 1.2,
    fill: { color: theme.accent },
    transparency: 0.9
  });

  slide.addShape(pres.shapes.OVAL, {
    x: 0.3, y: 3.5, w: 0.8, h: 0.8,
    fill: { color: theme.accent },
    transparency: 0.85
  });

  // Subtitle
  slide.addText("Projet de Fin d'\u00c9tudes 2025/2026", {
    x: 0.5, y: 1.0, w: 9, h: 0.3,
    fontSize: 14, fontFace: "Inter",
    color: theme.secondary,
    align: "center", valign: "middle"
  });

  // Main title
  slide.addText("Projet 11", {
    x: 0.5, y: 1.4, w: 9, h: 0.9,
    fontSize: 56, fontFace: "Inter",
    color: theme.primary, bold: true,
    align: "center", valign: "middle"
  });

  // Accent underline
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 3.8, y: 2.35, w: 2.4, h: 0.04,
    fill: { color: theme.accent }
  });

  // Subtitle
  slide.addText("Cache Distribu\u00e9 avec Redis", {
    x: 0.5, y: 2.5, w: 9, h: 0.5,
    fontSize: 26, fontFace: "Inter",
    color: theme.accent,
    align: "center", valign: "middle"
  });

  // Bottom card with presenters
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 2.5, y: 3.3, w: 5, h: 0.7,
    fill: { color: theme.card },
    line: { color: theme.border, width: 1 },
    rectRadius: 0.15
  });

  slide.addText("Pr\u00e9sent\u00e9 par Omar Sarsar & Iliass Hariz", {
    x: 2.5, y: 3.3, w: 5, h: 0.7,
    fontSize: 16, fontFace: "Inter",
    color: theme.secondary,
    align: "center", valign: "middle"
  });

  // Slide badge
  addBadge(slide, theme, 1);

  slide.addNotes("Bonjour, je suis Omar Sarsar et je suis accompagn\u00e9 d'Iliass Hariz. Nous allons pr\u00e9senter notre projet d'int\u00e9gration d'un cache distribu\u00e9 Redis dans une application marketplace SaaS. Ce projet a \u00e9t\u00e9 r\u00e9alis\u00e9 dans le cadre de notre formation. Nous allons d\u00e9crire le contexte, l'architecture, l'impl\u00e9mentation, les tests et les r\u00e9sultats.");

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
