const pptxgen = require("pptxgenjs");

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  slide.addText("Cache dans Launch Actions", {
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
    x: 0.5, y: 1.0, w: 9, h: 2.8,
    fill: { color: "1a202c" },
    rectRadius: 0.05
  });

  const codeLines = [
    "export async function getLaunches({ filter, sort, search }) {",
    "  const cacheKey = buildLaunchesKey(filter, sort, search);",
    "  ",
    "  // 1. V\u00e9rifier le cache",
    "  const cached = await cacheGet(cacheKey);",
    "  if (cached) return cached;",
    "  ",
    "  // 2. Interroger la base de donn\u00e9es",
    "  const results = await db.query(...);",
    "  ",
    "  // 3. Stocker dans le cache",
    "  await cacheSet(cacheKey, results, 300);",
    "  return results;",
    "}"
  ];

  let yPos = 1.1;
  codeLines.forEach((line) => {
    let color = "e2e8f0";
    if (line.startsWith("  //")) color = "718096";
    else if (line.includes("cacheGet") || line.includes("cacheSet")) color = "fbbf24";
    else if (["export", "async", "function", "const", "return", "await", "if"].some(k => line.includes(k))) {
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

  // Full explanatory paragraph - max 7 lines
  slide.addText("Voici getLaunches en action. Elle g\u00e9n\u00e8re une cl\u00e9 unique avec filter, sort et search. Elle v\u00e9rifie le cache et retourne les r\u00e9sultats s'ils existent. Sinon, elle interroge PostgreSQL, stocke avec un TTL de 300 secondes, puis retourne. L'invalidation est d\u00e9clench\u00e9e lors des op\u00e9rations d'\u00e9criture.", {
    x: 0.5, y: 3.7, w: 9, h: 1.5,
    fontSize: 16, fontFace: "Arial",
    color: theme.secondary,
    align: "left", valign: "top"
  });

  // Page badge
  slide.addShape(pres.shapes.OVAL, {
    x: 9.3, y: 5.2, w: 0.4, h: 0.4,
    fill: { color: theme.accent }
  });
  slide.addText("8", {
    x: 9.3, y: 5.2, w: 0.4, h: 0.4,
    fontSize: 12, fontFace: "Arial",
    color: "FFFFFF", bold: true,
    align: "center", valign: "middle"
  });

  slide.addNotes("Voici l'exemple concret de getLaunches. Cette action g\u00e9n\u00e8re une cl\u00e9 de cache \u00e0 partir des filtres, du tri et de la recherche. Elle v\u00e9rifie d'abord Redis, retourne les donn\u00e9es si elles sont pr\u00e9sentes, sinon interroge la base PostgreSQL. Les r\u00e9sultats sont ensuite stock\u00e9s avec un TTL de trois cents secondes. L'invalidation est d\u00e9clench\u00e9e lors des op\u00e9rations d'\u00e9criture.");
}

module.exports = { createSlide };
