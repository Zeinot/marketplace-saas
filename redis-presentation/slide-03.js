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
  slide.addText("Architecture du Systeme", {
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

  const items = [
    "Pattern Cache-Aside",
    "Verification Redis avant DB",
    "Stockage avec TTL configurable",
    "Reduction du temps de reponse"
  ];

  items.forEach((text, i) => {
    slide.addText(text, {
      x: 0.7, y: 1.3 + i * 0.55, w: 8.6, h: 0.5,
      fontSize: 22, fontFace: "Inter",
      color: theme.secondary,
      align: "left", valign: "middle"
    });
  });

  // Architecture cards
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 3.5, y: 3.6, w: 3, h: 0.65,
    fill: { color: theme.accent },
    rectRadius: 0.1
  });
  slide.addText("Next.js App", {
    x: 3.5, y: 3.6, w: 3, h: 0.65,
    fontSize: 16, fontFace: "Inter", color: theme.primary, bold: true,
    align: "center", valign: "middle"
  });

  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.5, y: 4.5, w: 3, h: 0.65,
    fill: { color: theme.redis },
    rectRadius: 0.1
  });
  slide.addText("Redis Cache", {
    x: 0.5, y: 4.5, w: 3, h: 0.65,
    fontSize: 16, fontFace: "Inter", color: theme.primary, bold: true,
    align: "center", valign: "middle"
  });

  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 6.5, y: 4.5, w: 3, h: 0.65,
    fill: { color: theme.card },
    line: { color: theme.border, width: 1 },
    rectRadius: 0.1
  });
  slide.addText("PostgreSQL", {
    x: 6.5, y: 4.5, w: 3, h: 0.65,
    fontSize: 16, fontFace: "Inter", color: theme.primary, bold: true,
    align: "center", valign: "middle"
  });

  // Slide badge
  addBadge(slide, theme, 3);

  slide.addNotes("Notre architecture utilise le pattern Cache-Aside. L'application verifie d'abord Redis. Si les donnees y sont, elles sont retournees immediatement. Sinon, PostgreSQL est interrogee, les resultats sont stockes dans Redis avec un TTL, puis retournes.");

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
