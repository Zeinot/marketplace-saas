const pptxgen = require("pptxgenjs");

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  slide.addText("Conclusion et R\u00e9sultats", {
    x: 0.5, y: 0.3, w: 9, h: 0.5,
    fontSize: 28, fontFace: "Arial",
    color: theme.primary, bold: true,
    align: "left", valign: "middle"
  });

  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 0.8, w: 1.5, h: 0.05,
    fill: { color: theme.accent }
  });

  const results = [
    { label: "Temps de r\u00e9ponse", value: "-99%", desc: "en moyenne" },
    { label: "Charge DB", value: "-85%", desc: "requ\u00eates r\u00e9duites" },
    { label: "Tests", value: "100%", desc: "tous passent" }
  ];

  results.forEach((r, i) => {
    const x = 0.5 + i * 3.1;
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: x, y: 1.2, w: 2.8, h: 1.2,
      fill: { color: "FFFFFF" },
      line: { color: theme.light, width: 2 },
      rectRadius: 0.1
    });

    slide.addText(r.value, {
      x: x, y: 1.25, w: 2.8, h: 0.5,
      fontSize: 32, fontFace: "Arial",
      color: "10b981", bold: true,
      align: "center", valign: "middle"
    });

    slide.addText(r.label, {
      x: x, y: 1.8, w: 2.8, h: 0.25,
      fontSize: 14, fontFace: "Arial",
      color: theme.secondary, bold: true,
      align: "center", valign: "middle"
    });

    slide.addText(r.desc, {
      x: x, y: 2.05, w: 2.8, h: 0.25,
      fontSize: 12, fontFace: "Arial",
      color: theme.secondary,
      align: "center", valign: "middle"
    });
  });

  const items = [
    "Objectifs atteints avec succ\u00e8s",
    "Cache distribu\u00e9 Redis + Docker Compose",
    "Coh\u00e9rence des donn\u00e9es maintenue",
    "Application marketplace SaaS optimis\u00e9e"
  ];

  items.forEach((text, i) => {
    slide.addText(text, {
      x: 0.7, y: 2.6 + i * 0.45, w: 8.6, h: 0.4,
      fontSize: 18, fontFace: "Arial",
      color: theme.secondary,
      align: "left", valign: "middle"
    });
  });

  slide.addShape(pres.shapes.OVAL, {
    x: 9.3, y: 5.2, w: 0.35, h: 0.35,
    fill: { color: theme.accent }
  });
  slide.addText("17", {
    x: 9.3, y: 5.2, w: 0.35, h: 0.35,
    fontSize: 11, fontFace: "Arial",
    color: "FFFFFF", bold: true,
    align: "center", valign: "middle"
  });

  slide.addNotes("En conclusion, tous les objectifs ont \u00e9t\u00e9 atteints. Le temps de r\u00e9ponse moyen a \u00e9t\u00e9 r\u00e9duit de quatre-vingt-dix-neuf pour cent. La charge sur PostgreSQL a diminu\u00e9 de quatre-vingt-cinq pour cent gr\u00e2ce \u00e0 la redirection des requ\u00eates vers Redis. Les huit tests unitaires passent tous. L'int\u00e9gration du cache distribu\u00e9 avec Redis et Docker Compose a am\u00e9lior\u00e9 significativement les performances tout en maintenant la coh\u00e9rence des donn\u00e9es.");
}

module.exports = { createSlide };
