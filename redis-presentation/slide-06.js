const pptxgen = require("pptxgenjs");

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  slide.addText("Invalidation et Tests", {
    x: 0.5, y: 0.3, w: 9, h: 0.5,
    fontSize: 28, fontFace: "Arial",
    color: theme.primary, bold: true,
    align: "left", valign: "middle"
  });

  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 0.8, w: 2, h: 0.05,
    fill: { color: theme.accent }
  });

  slide.addText("L'invalidation est essentielle pour la coherence. Chaque operation d'ecriture invalide immediatement le cache. La fonction invalidateCache supprime les cles correspondantes de Redis. Nous avons egalement mis en place des tests unitaires avec Jest couvrant cacheSet, cacheGet et invalidateCache pour garantir la fiabilite de la couche de cache.", {
    x: 0.5, y: 1.0, w: 9, h: 2.0,
    fontSize: 18, fontFace: "Arial",
    color: theme.secondary,
    align: "left", valign: "top"
  });

  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.5, y: 2.8, w: 9, h: 2.4,
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

  let yPos = 2.9;
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

  slide.addNotes("Transition : Iliass Hariz prend la suite. L'invalidation est essentielle pour la coh\u00e9rence. Chaque op\u00e9ration d'\u00e9criture invalide imm\u00e9diatement le cache. Nous avons mis en place des tests unitaires avec Jest couvrant cacheSet, cacheGet et invalidateCache.");
}

module.exports = { createSlide };
