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
      fontSize: 14, fontFace: "Arial", color: "FFFFFF", bold: true,
      align: "center", valign: "middle"
    });

    slide.addText(test.value, {
      x: x, y: 1.55, w: 2.8, h: 0.35,
      fontSize: 28, fontFace: "Arial", color: "FFFFFF", bold: true,
      align: "center", valign: "middle"
    });
  });

  const items = [
    "Taux de r\u00e9ussite de cent pour cent",
    "Couverture compl\u00e8te des fonctions principales",
    "Validation de la robustesse de l'impl\u00e9mentation Redis",
    "Base solide pour \u00e9voluer en toute s\u00e9curit\u00e9"
  ];

  items.forEach((text, i) => {
    slide.addText(text, {
      x: 0.7, y: 2.3 + i * 0.45, w: 8.6, h: 0.4,
      fontSize: 18, fontFace: "Arial",
      color: theme.secondary,
      align: "left", valign: "middle"
    });
  });

  slide.addShape(pres.shapes.OVAL, {
    x: 9.3, y: 5.2, w: 0.35, h: 0.35,
    fill: { color: theme.accent }
  });
  slide.addText("13", {
    x: 9.3, y: 5.2, w: 0.35, h: 0.35,
    fontSize: 11, fontFace: "Arial",
    color: "FFFFFF", bold: true,
    align: "center", valign: "middle"
  });

  slide.addNotes("Voici le r\u00e9capitulatif final. Les huit tests de la couche de cache ont tous pass\u00e9 avec succ\u00e8s, soit cent pour cent de r\u00e9ussite. Aucun test n'a \u00e9chou\u00e9 et la couverture est compl\u00e8te. Ces tests valident que notre impl\u00e9mentation Redis est robuste et pr\u00eate pour la production.");
}

module.exports = { createSlide };
