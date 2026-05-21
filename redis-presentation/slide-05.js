const pptxgen = require("pptxgenjs");

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  slide.addText("Int\u00e9gration dans les Actions", {
    x: 0.5, y: 0.3, w: 9, h: 0.5,
    fontSize: 28, fontFace: "Arial",
    color: theme.primary, bold: true,
    align: "left", valign: "middle"
  });

  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 0.8, w: 2, h: 0.05,
    fill: { color: theme.accent }
  });

  slide.addText("L'integration suit le pattern Cache-Aside. Chaque action genere une cle unique et verifie Redis. Si les donnees existent, elles sont retournees. Sinon, PostgreSQL est interrogee, les resultats sont stockes dans Redis avec un TTL, puis retournes. Cette logique est appliquee sur toutes les lectures frequentes comme getLaunches, getPosts et getCategories.", {
    x: 0.5, y: 1.0, w: 9, h: 2.0,
    fontSize: 18, fontFace: "Arial",
    color: theme.secondary,
    align: "left", valign: "top"
  });

  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.5, y: 2.8, w: 9, h: 2.6,
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

  let yPos = 2.9;
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

  slide.addNotes("L'int\u00e9gration suit le pattern Cache-Aside. Chaque action g\u00e9n\u00e8re une cl\u00e9 unique et v\u00e9rifie Redis. Si les donn\u00e9es existent, elles sont retourn\u00e9es. Sinon, PostgreSQL est interrog\u00e9e, les r\u00e9sultats sont stock\u00e9s dans Redis avec un TTL, puis retourn\u00e9s.");
}

module.exports = { createSlide };
