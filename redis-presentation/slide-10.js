const pptxgen = require("pptxgenjs");

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  // Top accent bar
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 0.06,
    fill: { color: theme.accent }
  });

  // Main title
  slide.addText("Merci", {
    x: 0.5, y: 1.2, w: 9, h: 1.0,
    fontSize: 56, fontFace: "Inter",
    color: theme.primary, bold: true,
    align: "center", valign: "middle"
  });

  // Accent underline
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 4, y: 2.2, w: 2, h: 0.04,
    fill: { color: theme.accent }
  });

  // Subtitle
  slide.addText("Questions et Discussion", {
    x: 0.5, y: 2.4, w: 9, h: 0.5,
    fontSize: 24, fontFace: "Inter",
    color: theme.secondary,
    align: "center", valign: "middle"
  });

  // Names card
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 2.5, y: 3.2, w: 5, h: 0.9,
    fill: { color: theme.card },
    line: { color: theme.border, width: 1 },
    rectRadius: 0.15
  });

  slide.addText("Omar Sarsar & Iliass Hariz", {
    x: 2.5, y: 3.3, w: 5, h: 0.4,
    fontSize: 20, fontFace: "Inter",
    color: theme.primary, bold: true,
    align: "center", valign: "middle"
  });

  slide.addText("2026", {
    x: 2.5, y: 3.7, w: 5, h: 0.3,
    fontSize: 16, fontFace: "Inter",
    color: theme.secondary,
    align: "center", valign: "middle"
  });

  // Slide badge
  addBadge(slide, theme, 10);

  slide.addNotes("Nous vous remercions pour votre attention. Ce projet a demontre que Redis reduit drastiquement les temps de reponse et la charge sur la base de donnees, tout en maintenant la coherence. N'hesitez pas a poser vos questions.");

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
