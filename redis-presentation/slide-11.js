const pptxgen = require("pptxgenjs");

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  slide.addText("Tests et Validation", {
    x: 0.5, y: 0.3, w: 9, h: 0.5,
    fontSize: 28, fontFace: "Arial",
    color: theme.primary, bold: true,
    align: "left", valign: "middle"
  });

  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 0.8, w: 2, h: 0.05,
    fill: { color: theme.accent }
  });

  slide.addText("Pour garantir la fiabilite de notre couche de cache, nous avons mis en place des tests unitaires avec Jest. Ces tests couvrent les trois operations principales : la mise en cache des donnees avec cacheSet, la recuperation avec cacheGet, et l'invalidation avec invalidateCache.", {
    x: 0.5, y: 1.0, w: 9, h: 1.5,
    fontSize: 18, fontFace: "Arial",
    color: theme.secondary,
    align: "left", valign: "top"
  });

  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.5, y: 2.4, w: 9, h: 2.6,
    fill: { color: "0f172a" },
    rectRadius: 0.05
  });

  const codeLines = [
    "describe('Cache', () => {",
    "  test('set & get', async () => {",
    "    const data = { foo: 'bar' };",
    "    await cacheSet('test', data);",
    "    const result = await cacheGet('test');",
    "    expect(result).toEqual(data);",
    "  });",
    "",
    "  test('invalidation', async () => {",
    "    await cacheSet('temp', 'value');",
    "    await invalidateCache('temp');",
    "    const result = await cacheGet('temp');",
    "    expect(result).toBeNull();",
    "  });",
    "});"
  ];

  let yPos = 2.5;
  codeLines.forEach((line) => {
    let color = "e2e8f0";
    if (line.includes("test(") || line.includes("describe(")) color = "fbbf24";
    else if (line.includes("expect")) color = "a78bfa";
    else if (["const", "await", "async", "function", "return", "if"].some(k => line.includes(k))) {
      color = "63b3ed";
    }

    slide.addText(line, {
      x: 0.7, y: yPos, w: 8.6, h: 0.22,
      fontSize: 14, fontFace: "Consolas",
      color: color,
      align: "left", valign: "middle"
    });
    yPos += 0.22;
  });

  slide.addNotes("Transition : Iliass Hariz prend la suite. Nous avons mis en place des tests unitaires avec Jest couvrant cacheSet, cacheGet et invalidateCache. Le premier test v\u00e9rifie que les donn\u00e9es stock\u00e9es sont correctement r\u00e9cup\u00e9rables. Le second test v\u00e9rifie que l'invalidation supprime la cl\u00e9.");
}

module.exports = { createSlide };
