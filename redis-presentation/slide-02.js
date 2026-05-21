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
  slide.addText("Contexte et Objectifs", {
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
    "Application marketplace SaaS",
    "Ralentissements sur les pages",
    "Solution: cache distribue Redis",
    "Deploiement Docker Compose",
    "Mesure des performances"
  ];

  items.forEach((text, i) => {
    slide.addText(text, {
      x: 0.7, y: 1.3 + i * 0.6, w: 8.6, h: 0.5,
      fontSize: 22, fontFace: "Inter",
      color: theme.secondary,
      align: "left", valign: "middle"
    });
  });

  // Slide badge
  addBadge(slide, theme, 2);

  slide.addNotes("Ce projet integre un cache distribue Redis dans une application marketplace SaaS. L'augmentation du nombre d'utilisateurs a cause des ralentissements sur les pages affichant les listes de produits. L'objectif est d'ameliorer les performances en verifiant le cache avant PostgreSQL, ce qui reduit le temps de reponse et la charge sur la base de donnees tout en maintenant la coherence via une strategie d'invalidation.");

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
