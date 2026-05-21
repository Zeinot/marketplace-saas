const pptxgen = require("pptxgenjs");

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  slide.addText("Resultats des Tests", {
    x: 0.5, y: 0.3, w: 9, h: 0.5,
    fontSize: 28, fontFace: "Arial",
    color: theme.primary, bold: true,
    align: "left", valign: "middle"
  });

  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 0.8, w: 2, h: 0.05,
    fill: { color: theme.accent }
  });

  const tests = [
    { label: "Tests Passes", value: "8/8", color: "059669" },
    { label: "Tests Echoues", value: "0", color: "dc2626" },
    { label: "Couverture", value: "100%", color: "3182ce" }
  ];

  tests.forEach((test, i) => {
    const x = 0.5 + i * 3.1;
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: x, y: 1.2, w: 2.8, h: 1.0,
      fill: { color: test.color },
      rectRadius: 0.1
    });

    slide.addText(test.label, {
      x: x, y: 1.25, w: 2.8, h: 0.3,
      fontSize: 14, fontFace: "Arial", color: "FFFFFF", bold: true,
      align: "center", valign: "middle"
    });

    slide.addText(test.value, {
      x: x, y: 1.55, w: 2.8, h: 0.5,
      fontSize: 32, fontFace: "Arial", color: "FFFFFF", bold: true,
      align: "center", valign: "middle"
    });
  });

  slide.addText("Voici le recapitulatif final de nos tests unitaires. Les huit tests de la couche de cache ont tous passe avec succes, soit cent pour cent de reussite. Aucun test n'a echoue et la couverture est complete. Ces tests valident que notre implementation Redis est robuste et prete pour la production.", {
    x: 0.5, y: 2.4, w: 9, h: 1.8,
    fontSize: 18, fontFace: "Arial",
    color: theme.secondary,
    align: "left", valign: "top"
  });

  slide.addNotes("Voici le recapitulatif final. Les huit tests de la couche de cache ont tous passe avec succes, soit cent pour cent de reussite. Aucun test n'a echoue et la couverture est complete. Ces tests valident que notre implementation Redis est robuste et prete pour la production.");
}

module.exports = { createSlide };
