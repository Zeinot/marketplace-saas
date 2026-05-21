const pptxgen = require("pptxgenjs");

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  slide.addText("Bonnes Pratiques de Cache", {
    x: 0.5, y: 0.3, w: 9, h: 0.5,
    fontSize: 28, fontFace: "Arial",
    color: theme.primary, bold: true,
    align: "left", valign: "middle"
  });

  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 0.8, w: 1.5, h: 0.05,
    fill: { color: theme.accent }
  });

  // Full explanatory paragraph - max 16 lines
  slide.addText("Tout au long de ce projet, nous avons appliqu\u00e9 plusieurs bonnes pratiques. Premi\u00e8rement, choisir un TTL adapt\u00e9 : les cat\u00e9gories changent rarement et ont un TTL long de trente minutes, tandis que les commentaires dynamiques ont un TTL court de deux minutes. Deuxi\u00e8mement, l'invalidation doit \u00eatre syst\u00e9matique : chaque op\u00e9ration d'\u00e9criture invalide imm\u00e9diatement les cl\u00e9s. Troisi\u00e8mement, un pr\u00e9fixe comme saas: \u00e9vite les collisions. Quatri\u00e8mement, les tests unitaires valident le comportement. Enfin, le monitoring permet de suivre l'utilisation du cache.", {
    x: 0.5, y: 1.0, w: 9, h: 3.8,
    fontSize: 16, fontFace: "Arial",
    color: theme.secondary,
    align: "left", valign: "top"
  });

  // Page badge
  slide.addShape(pres.shapes.OVAL, {
    x: 9.3, y: 5.2, w: 0.4, h: 0.4,
    fill: { color: theme.accent }
  });
  slide.addText("18", {
    x: 9.3, y: 5.2, w: 0.4, h: 0.4,
    fontSize: 12, fontFace: "Arial",
    color: "FFFFFF", bold: true,
    align: "center", valign: "middle"
  });
}

module.exports = { createSlide };
