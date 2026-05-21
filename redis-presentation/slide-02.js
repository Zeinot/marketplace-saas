const pptxgen = require("pptxgenjs");

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  slide.addText("Contexte et Objectifs", {
    x: 0.5, y: 0.4, w: 9, h: 0.6,
    fontSize: 32, fontFace: "Arial",
    color: theme.primary, bold: true,
    align: "left", valign: "middle"
  });

  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 1.0, w: 2, h: 0.05,
    fill: { color: theme.accent }
  });

  const items = [
    "Application marketplace SaaS",
    "Ralentissements sur les pages de listes",
    "Solution : cache distribu\u00e9 Redis",
    "D\u00e9ploiement avec Docker Compose",
    "Mesure de l'am\u00e9lioration des performances"
  ];

  items.forEach((text, i) => {
    slide.addText(text, {
      x: 0.7, y: 1.3 + i * 0.6, w: 8.6, h: 0.5,
      fontSize: 22, fontFace: "Arial",
      color: theme.secondary,
      align: "left", valign: "middle"
    });
  });

  slide.addNotes("Ce projet int\u00e8gre un cache distribu\u00e9 Redis dans une application marketplace SaaS. Cette application permet aux utilisateurs de lancer et vendre des produits logiciels avec un syst\u00e8me de messagerie. L'augmentation du nombre d'utilisateurs a caus\u00e9 des ralentissements sur les pages affichant les listes de produits. L'objectif est d'am\u00e9liorer les performances en v\u00e9rifiant le cache avant PostgreSQL, ce qui r\u00e9duit le temps de r\u00e9ponse et la charge sur la base de donn\u00e9es tout en maintenant la coh\u00e9rence via une strat\u00e9gie d'invalidation. Pour atteindre cet objectif, nous avons d\u00e9ploy\u00e9 Redis avec Docker Compose, modifi\u00e9 l'application pour utiliser le cache en lecture et \u00e9criture, puis mesur\u00e9 l'am\u00e9lioration des performances.");
}

module.exports = { createSlide };
