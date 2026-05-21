const pptxgen = require("pptxgenjs");

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  slide.addText("Cache dans Post Actions", {
    x: 0.5, y: 0.3, w: 9, h: 0.5,
    fontSize: 28, fontFace: "Arial",
    color: theme.primary, bold: true,
    align: "left", valign: "middle"
  });

  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 0.8, w: 2, h: 0.05,
    fill: { color: theme.accent }
  });

  slide.addText("De la meme maniere, nous avons integre le cache dans les Post Actions. La fonction getPosts utilise une cle generee a partir des parametres sort, type et search. Elle verifie le cache avec cette cle et retourne les resultats s'ils sont presents. Le TTL pour les posts est de 180 secondes car les donnees changent plus frequemment.", {
    x: 0.5, y: 1.0, w: 9, h: 1.8,
    fontSize: 18, fontFace: "Arial",
    color: theme.secondary,
    align: "left", valign: "top"
  });

  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.5, y: 2.6, w: 9, h: 2.2,
    fill: { color: "0f172a" },
    rectRadius: 0.05
  });

  const codeLines = [
    "export async function getPosts({ sort, type, search }) {",
    "  const cacheKey = buildPostsKey(sort, type, search);",
    "  const cached = await cacheGet(cacheKey);",
    "  if (cached) return cached;",
    "  const results = await db.query(...);",
    "  await cacheSet(cacheKey, results, 180);",
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

  slide.addNotes("De la m\u00eame mani\u00e8re, getPosts utilise une cl\u00e9 g\u00e9n\u00e9r\u00e9e \u00e0 partir de sort, type et search. Le TTL est de 180 secondes car les posts changent plus fr\u00e9quemment. getLaunchBySlug utilise 10 minutes, getCategories utilise 30 minutes car elles changent rarement, et getLaunchComments utilise 2 minutes.");
}

module.exports = { createSlide };
