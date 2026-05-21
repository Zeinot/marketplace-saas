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

  slide.addText("La strategie d'invalidation du cache est essentielle pour maintenir la coherence des donnees. Chaque fois qu'une operation d'ecriture est effectuee comme la creation, la mise a jour, la suppression ou l'upvote d'un lancement, le cache est invalide immediatement. La fonction invalidateCache supprime les cles correspondantes de Redis.", {
    x: 0.5, y: 1.0, w: 9, h: 1.8,
    fontSize: 18, fontFace: "Arial",
    color: theme.secondary,
    align: "left", valign: "top"
  });

  const items = [
    "Create, Update, Delete, Upvote d\u00e9clenchent l'invalidation",
    "invalidateCache(cacheKey) supprime les cl\u00e9s de Redis",
    "TTL comme m\u00e9canisme d'expiration automatique",
    "Pr\u00e9fixe saas: pour \u00e9viter les collisions entre applications"
  ];

  items.forEach((text, i) => {
    slide.addText(text, {
      x: 0.7, y: 2.6 + i * 0.45, w: 8.6, h: 0.4,
      fontSize: 18, fontFace: "Arial",
      color: theme.secondary,
      align: "left", valign: "middle"
    });
  });

  slide.addNotes("L'invalidation est essentielle pour la coh\u00e9rence. Chaque op\u00e9ration d'\u00e9criture comme create, update, delete ou upvote invalide imm\u00e9diatement le cache. La fonction invalidateCache supprime les cl\u00e9s correspondantes de Redis. Le TTL sert de m\u00e9canisme d'expiration automatique.");
}

module.exports = { createSlide };
