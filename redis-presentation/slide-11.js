const pptxgen = require("pptxgenjs");

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  slide.addText("Tests Unitaires du Cache", {
    x: 0.5, y: 0.3, w: 9, h: 0.5,
    fontSize: 28, fontFace: "Arial",
    color: theme.primary, bold: true,
    align: "left", valign: "middle"
  });

  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 0.8, w: 1.5, h: 0.05,
    fill: { color: theme.accent }
  });

  // Code block
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.5, y: 1.0, w: 9, h: 2.4,
    fill: { color: "1a202c" },
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

  let yPos = 1.1;
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

  // Full explanatory paragraph - max 8 lines
  slide.addText("Nous avons mis en place des tests unitaires avec Jest couvrant cacheSet, cacheGet et invalidateCache. Le premier test v\u00e9rifie que les donn\u00e9es stock\u00e9es sont correctement r\u00e9cup\u00e9rables. Le second test v\u00e9rifie que l'invalidation supprime la cl\u00e9. Les tests s'ex\u00e9cutent avec une instance Redis locale dans Docker.", {
    x: 0.5, y: 3.4, w: 9, h: 1.7,
    fontSize: 16, fontFace: "Arial",
    color: theme.secondary,
    align: "left", valign: "top"
  });

  // Page badge
  slide.addShape(pres.shapes.OVAL, {
    x: 9.3, y: 5.2, w: 0.4, h: 0.4,
    fill: { color: theme.accent }
  });
  slide.addText("11", {
    x: 9.3, y: 5.2, w: 0.4, h: 0.4,
    fontSize: 12, fontFace: "Arial",
    color: "FFFFFF", bold: true,
    align: "center", valign: "middle"
  });
}

module.exports = { createSlide };
