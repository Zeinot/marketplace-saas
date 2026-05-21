const pptxgen = require("pptxgenjs");

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  slide.addText("Introduction et Contexte", {
    x: 0.5, y: 0.4, w: 9, h: 0.6,
    fontSize: 32, fontFace: "Arial",
    color: theme.primary, bold: true,
    align: "left", valign: "middle"
  });

  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 1.0, w: 2, h: 0.05,
    fill: { color: theme.accent }
  });

  slide.addText("Ce projet vise a integrer un cache distribue (Redis) a une application web existante de type marketplace SaaS. L'augmentation du nombre d'utilisateurs a cause des ralentissements sur les pages affichant les listes de produits. L'objectif principal est d'ameliorer les performances en verifiant prealablement si les donnees sont disponibles dans le cache.", {
    x: 0.5, y: 1.2, w: 9, h: 1.8,
    fontSize: 18, fontFace: "Arial",
    color: theme.secondary,
    align: "left", valign: "top"
  });

  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.5, y: 2.8, w: 9, h: 2.4,
    fill: { color: "2c5282" },
    rectRadius: 0.1
  });

  slide.addText("Plan de la Pr\u00e9sentation", {
    x: 0.7, y: 2.9, w: 8.6, h: 0.4,
    fontSize: 22, fontFace: "Arial",
    color: theme.primary, bold: true,
    align: "left", valign: "middle"
  });

  const items = [
    "1. Architecture du syst\u00e8me avec Cache-Aside",
    "2. Infrastructure Docker et couche d'abstraction",
    "3. Int\u00e9gration dans les actions et invalidation",
    "4. Tests unitaires et validation (Iliass Hariz)",
    "5. Mesures de performance et r\u00e9sultats (Iliass Hariz)"
  ];

  items.forEach((text, i) => {
    slide.addText(text, {
      x: 0.7, y: 3.4 + i * 0.45, w: 8.6, h: 0.4,
      fontSize: 18, fontFace: "Arial",
      color: theme.secondary,
      align: "left", valign: "middle"
    });
  });

  slide.addNotes("Ce projet int\u00e8gre un cache distribu\u00e9 Redis dans une application marketplace SaaS. L'augmentation du nombre d'utilisateurs a caus\u00e9 des ralentissements sur les pages affichant les listes de produits. L'objectif est d'am\u00e9liorer les performances en v\u00e9rifiant le cache avant PostgreSQL.");
}

module.exports = { createSlide };
