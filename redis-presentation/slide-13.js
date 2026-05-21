const pptxgen = require("pptxgenjs");

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  slide.addText("R\u00e9sultats des Tests Unitaires", {
    x: 0.5, y: 0.3, w: 9, h: 0.5,
    fontSize: 28, fontFace: "Arial",
    color: theme.primary, bold: true,
    align: "left", valign: "middle"
  });

  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 0.8, w: 1.5, h: 0.05,
    fill: { color: theme.accent }
  });

  // Results boxes
  const tests = [
    { label: "Tests Pass\u00e9s", value: "8/8", color: "10b981", icon: "\u2705" },
    { label: "Tests \u00c9chou\u00e9s", value: "0", color: "ef4444", icon: "\u274c" },
    { label: "Couverture", value: "100%", color: "3182ce", icon: "\ud83d\udcca" }
  ];

  tests.forEach((test, i) => {
    const x = 0.5 + i * 3.1;
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: x, y: 1.2, w: 2.8, h: 0.8,
      fill: { color: test.color },
      rectRadius: 0.1
    });

    slide.addText(`${test.icon} ${test.label}`, {
      x: x, y: 1.25, w: 2.8, h: 0.3,
      fontSize: 14, fontFace: "Arial",
      color: "FFFFFF", bold: true,
      align: "center", valign: "middle"
    });

    slide.addText(test.value, {
      x: x, y: 1.55, w: 2.8, h: 0.35,
      fontSize: 28, fontFace: "Arial",
      color: "FFFFFF", bold: true,
      align: "center", valign: "middle"
    });
  });

  // Full explanatory paragraph - max 11 lines
  slide.addText("Voici le r\u00e9capitulatif final. Les huit tests de la couche de cache ont tous pass\u00e9 avec succ\u00e8s, soit cent pour cent de r\u00e9ussite. Aucun test n'a \u00e9chou\u00e9 et la couverture est compl\u00e8te. Ces tests valident que notre impl\u00e9mentation Redis est robuste et pr\u00eate pour la production. Les cas limites comme les donn\u00e9es null, les expirations TTL et les invalidations multiples sont correctement g\u00e9r\u00e9s.", {
    x: 0.5, y: 2.1, w: 9, h: 2.5,
    fontSize: 16, fontFace: "Arial",
    color: theme.secondary,
    align: "left", valign: "top"
  });

  // Page badge
  slide.addShape(pres.shapes.OVAL, {
    x: 9.3, y: 5.2, w: 0.4, h: 0.4,
    fill: { color: theme.accent }
  });
  slide.addText("13", {
    x: 9.3, y: 5.2, w: 0.4, h: 0.4,
    fontSize: 12, fontFace: "Arial",
    color: "FFFFFF", bold: true,
    align: "center", valign: "middle"
  });

  slide.addNotes("Voici le r\u00e9capitulatif final des tests. Huit tests sur huit passent, soit cent pour cent de r\u00e9ussite. Aucun \u00e9chec n'est \u00e0 signaler et la couverture est totale. Ces r\u00e9sultats prouvent que notre impl\u00e9mentation Redis est fiable et pr\u00eate pour un d\u00e9ploiement en production. Tous les cas limites sont correctement g\u00e9r\u00e9s par notre couche d'abstraction.");
}

module.exports = { createSlide };
