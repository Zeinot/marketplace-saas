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
    x: 0.5, y: 0.8, w: 1.5, h: 0.05,
    fill: { color: theme.accent }
  });

  // Code block
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.5, y: 1.0, w: 9, h: 2.2,
    fill: { color: "1a202c" },
    rectRadius: 0.05
  });

  const codeLines = [
    "export async function getPosts({ sort, type, search }) {",
    "  const cacheKey = buildPostsKey(sort, type, search);",
    "  ",
    "  const cached = await cacheGet(cacheKey);",
    "  if (cached) return cached;",
    "  ",
    "  const results = await db.query(...);",
    "  await cacheSet(cacheKey, results, 180);",
    "  return results;",
    "}"
  ];

  let yPos = 1.1;
  codeLines.forEach((line) => {
    let color = "e2e8f0";
    if (line.includes("cacheGet") || line.includes("cacheSet")) color = "fbbf24";
    else if (["export", "async", "function", "const", "return", "await", "if"].some(k => line.includes(k))) {
      color = "63b3ed";
    }

    slide.addText(line, {
      x: 0.7, y: yPos, w: 8.6, h: 0.24,
      fontSize: 15, fontFace: "Consolas",
      color: color,
      align: "left", valign: "middle"
    });
    yPos += 0.25;
  });

  // Full explanatory paragraph - max 7 lines
  slide.addText("De la m\u00eame mani\u00e8re, getPosts utilise une cl\u00e9 g\u00e9n\u00e9r\u00e9e \u00e0 partir de sort, type et search. Le TTL est de 180 secondes car les posts changent plus fr\u00e9quemment. getLaunchBySlug utilise 10 minutes, getCategories utilise 30 minutes car elles changent rarement, et getLaunchComments utilise 2 minutes pour les commentaires fr\u00e9quents.", {
    x: 0.5, y: 3.4, w: 9, h: 1.6,
    fontSize: 16, fontFace: "Arial",
    color: theme.secondary,
    align: "left", valign: "top"
  });

  // Page badge
  slide.addShape(pres.shapes.OVAL, {
    x: 9.3, y: 5.2, w: 0.4, h: 0.4,
    fill: { color: theme.accent }
  });
  slide.addText("9", {
    x: 9.3, y: 5.2, w: 0.4, h: 0.4,
    fontSize: 12, fontFace: "Arial",
    color: "FFFFFF", bold: true,
    align: "center", valign: "middle"
  });

  slide.addNotes("De m\u00eame, getPosts utilise une cl\u00e9 bas\u00e9e sur le tri, le type et la recherche avec un TTL de cent quatre-vingts secondes car les posts changent plus fr\u00e9quemment. getLaunchBySlug utilise dix minutes, getCategories trente minutes car elles sont stables, et getLaunchComments deux minutes pour refl\u00e9ter la dynamique des commentaires.");
}

module.exports = { createSlide };
