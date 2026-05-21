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
    x: 0.5, y: 0.8, w: 2, h: 0.05,
    fill: { color: theme.accent }
  });

  slide.addText("Voici un exemple concret de l'integration du cache dans les Launch Actions. La fonction getLaunches genere d'abord une cle de cache unique en combinant les parametres filter, sort et search. Elle verifie ensuite si des resultats sont deja en cache. Si c'est le cas, ils sont retournes immediatement. Sinon, la fonction interroge PostgreSQL et stocke les resultats dans Redis avec un TTL de 300 secondes.", {
    x: 0.5, y: 1.0, w: 9, h: 2.0,
    fontSize: 18, fontFace: "Arial",
    color: theme.secondary,
    align: "left", valign: "top"
  });

  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.5, y: 2.6, w: 9, h: 2.6,
    fill: { color: "0f172a" },
    rectRadius: 0.05
  });

  const codeLines = [
    "export async function getLaunches({ filter, sort, search }) {",
    "  const cacheKey = buildLaunchesKey(filter, sort, search);",
    "  const cached = await cacheGet(cacheKey);",
    "  if (cached) return cached;",
    "  const results = await db.query(...);",
    "  await cacheSet(cacheKey, results, 300);",
    "  return results;",
    "}"
  ];

  let yPos = 2.7;
  codeLines.forEach((line) => {
    let color = "e2e8f0";
    if (line.includes("cacheGet") || line.includes("cacheSet")) color = "fbbf24";
    else if (["export", "async", "function", "const", "return", "await", "if"].some(k => line.includes(k))) {
      color = "63b3ed";
    }

    slide.addText(line, {
      x: 0.7, y: yPos, w: 8.6, h: 0.24,
      fontSize: 14, fontFace: "Consolas",
      color: color,
      align: "left", valign: "middle"
    });
    yPos += 0.25;
  });

  slide.addNotes("Voici getLaunches en action. Elle g\u00e9n\u00e8re une cl\u00e9 unique avec filter, sort et search. Elle v\u00e9rifie le cache et retourne les r\u00e9sultats s'ils existent. Sinon, elle interroge PostgreSQL, stocke avec un TTL de 300 secondes, puis retourne. L'invalidation est d\u00e9clench\u00e9e lors des op\u00e9rations d'\u00e9criture.");
}

module.exports = { createSlide };
