const pptxgen = require("pptxgenjs");

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  slide.addText("Contexte et Probl\u00e9matique", {
    x: 0.5, y: 0.3, w: 9, h: 0.5,
    fontSize: 28, fontFace: "Arial",
    color: theme.primary, bold: true,
    align: "left", valign: "middle"
  });

  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 0.8, w: 1.5, h: 0.05,
    fill: { color: theme.accent }
  });

  const items = [
    "Application marketplace SaaS pour produits logiciels",
    "Fonctionnalit\u00e9s : lancements, marketplace, messagerie",
    "Ralentissements sur les pages de listes et recherche",
    "N\u00e9cessit\u00e9 d'am\u00e9liorer les temps de r\u00e9ponse",
    "Solution : cache distribu\u00e9 avec Redis"
  ];

  items.forEach((text, i) => {
    slide.addText(text, {
      x: 0.7, y: 1.1 + i * 0.55, w: 8.6, h: 0.5,
      fontSize: 20, fontFace: "Arial",
      color: theme.secondary,
      align: "left", valign: "middle"
    });
  });

  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.5, y: 4.0, w: 9, h: 1.0,
    fill: { color: "FFFFFF" },
    line: { color: theme.light, width: 2 },
    rectRadius: 0.1
  });

  slide.addText("Objectifs du Projet", {
    x: 0.7, y: 4.05, w: 8.6, h: 0.35,
    fontSize: 20, fontFace: "Arial",
    color: theme.primary, bold: true,
    align: "left", valign: "middle"
  });

  slide.addText("D\u00e9ployer Redis avec Docker Compose, int\u00e9grer le cache dans les op\u00e9rations de lecture/\u00e9criture, mesurer l'am\u00e9lioration des performances", {
    x: 0.7, y: 4.45, w: 8.6, h: 0.5,
    fontSize: 16, fontFace: "Arial",
    color: theme.secondary,
    align: "left", valign: "top"
  });

  slide.addShape(pres.shapes.OVAL, {
    x: 9.3, y: 5.2, w: 0.35, h: 0.35,
    fill: { color: theme.accent }
  });
  slide.addText("3", {
    x: 9.3, y: 5.2, w: 0.35, h: 0.35,
    fontSize: 11, fontFace: "Arial",
    color: "FFFFFF", bold: true,
    align: "center", valign: "middle"
  });

  slide.addNotes("Notre projet consiste \u00e0 int\u00e9grer Redis dans une application marketplace SaaS existante. Cette application g\u00e8re des lancements de produits logiciels avec un syst\u00e8me de messagerie. Face aux ralentissements croissants sur les pages de listes, nous avons choisi d'impl\u00e9menter un cache distribu\u00e9 pour am\u00e9liorer drastiquement les temps de r\u00e9ponse sans modifier l'architecture existante.");
}

module.exports = { createSlide };
