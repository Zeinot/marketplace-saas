const pptxgen = require("pptxgenjs");

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  slide.addText("Invalidation du Cache", {
    x: 0.5, y: 0.3, w: 9, h: 0.5,
    fontSize: 28, fontFace: "Arial",
    color: theme.primary, bold: true,
    align: "left", valign: "middle"
  });

  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 0.8, w: 2, h: 0.05,
    fill: { color: theme.accent }
  });

  const items = [
    "Create, Update, Delete, Upvote",
    "invalidateCache(cacheKey)",
    "TTL comme expiration automatique",
    "Pr\u00e9fixe saas: pour \u00e9viter les collisions",
    "Maintien de la coh\u00e9rence des donn\u00e9es"
  ];

  items.forEach((text, i) => {
    slide.addText(text, {
      x: 0.7, y: 1.1 + i * 0.55, w: 8.6, h: 0.5,
      fontSize: 20, fontFace: "Arial",
      color: theme.secondary,
      align: "left", valign: "middle"
    });
  });

  slide.addNotes("Transition : Iliass Hariz prend la suite. La strategie d'invalidation du cache est essentielle pour maintenir la coherence des donnees. Chaque fois qu'une operation d'ecriture est effectuee comme la creation, la mise a jour, la suppression ou l'upvote d'un lancement, le cache est invalide immediatement. La fonction invalidateCache supprime les cles correspondantes de Redis pour forcer les relectures ulterieures a aller chercher les donnees dans la base de donnees. Nous utilisons egalement le TTL comme mecanisme d'expiration automatique. Les cles de cache sont normalisees avec un prefixe saas: pour eviter les collisions et faciliter la gestion.");
}

module.exports = { createSlide };
