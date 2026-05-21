const pptxgen = require("pptxgenjs");

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  // Top accent bar
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 0.06,
    fill: { color: theme.accent }
  });

  // Title
  slide.addText("Performance", {
    x: 0.5, y: 0.4, w: 9, h: 0.6,
    fontSize: 32, fontFace: "Inter",
    color: theme.primary, bold: true,
    align: "left", valign: "middle"
  });

  // Accent underline
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 1.0, w: 2, h: 0.04,
    fill: { color: theme.accent }
  });

  // Metric cards
  const metrics = [
    { label: "Avec Cache", value: "12ms" },
    { label: "Sans Cache", value: "856ms" },
    { label: "Amelioration", value: "99%" }
  ];

  metrics.forEach((metric, i) => {
    const x = 0.5 + i * 3.1;
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: x, y: 1.3, w: 2.8, h: 1.0,
      fill: { color: theme.card },
      line: { color: theme.border, width: 1 },
      rectRadius: 0.1
    });

    slide.addText(metric.value, {
      x: x, y: 1.35, w: 2.8, h: 0.5,
      fontSize: 36, fontFace: "Inter",
      color: theme.accent, bold: true,
      align: "center", valign: "middle"
    });

    slide.addText(metric.label, {
      x: x, y: 1.9, w: 2.8, h: 0.3,
      fontSize: 16, fontFace: "Inter",
      color: theme.primary,
      align: "center", valign: "middle"
    });
  });

  const items = [
    "getLaunches : 856ms -> 12ms (99.2%)",
    "getPosts : 643ms -> 15ms (97.7%)",
    "getLaunchBySlug : 234ms -> 8ms (96.6%)",
    "getCategories : 189ms -> 5ms (97.4%)"
  ];

  items.forEach((text, i) => {
    slide.addText(text, {
      x: 0.7, y: 2.6 + i * 0.55, w: 8.6, h: 0.5,
      fontSize: 20, fontFace: "Inter",
      color: theme.secondary,
      align: "left", valign: "middle"
    });
  });

  // Slide badge
  addBadge(slide, theme, 9);

  slide.addNotes("Les mesures montrent des resultats impressionnants. Avec le cache Redis, le temps de reponse moyen est de douze millisecondes contre huit cent cinquante-six millisecondes sans cache, soit quatre-vingt-dix-neuf pour cent d'amelioration.");

  function addBadge(slide, theme, num) {
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 9.1, y: 5.05, w: 0.5, h: 0.35,
      fill: { color: theme.accent },
      rectRadius: 0.1
    });
    slide.addText(String(num), {
      x: 9.1, y: 5.05, w: 0.5, h: 0.35,
      fontSize: 12, fontFace: "Inter",
      color: "0d1b2a", bold: true,
      align: "center", valign: "middle"
    });
  }
}

module.exports = { createSlide };
