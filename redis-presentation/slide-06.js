const pptxgen = require("pptxgenjs");

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  slide.addText("Couche d'Abstraction du Cache", {
    x: 0.5, y: 0.3, w: 9, h: 0.5,
    fontSize: 28, fontFace: "Arial",
    color: theme.primary, bold: true,
    align: "left", valign: "middle"
  });

  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 0.8, w: 2, h: 0.05,
    fill: { color: theme.accent }
  });

  slide.addText("La couche d'abstraction dans src/lib/cache.ts fournit une interface simple pour interagir avec Redis. La fonction cacheGet permet de recuperer des donnees avec typage TypeScript. La fonction cacheSet permet de stocker les donnees avec un temps de vie configurable de 300 secondes par defaut.", {
    x: 0.5, y: 1.0, w: 9, h: 1.5,
    fontSize: 18, fontFace: "Arial",
    color: theme.secondary,
    align: "left", valign: "top"
  });

  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.5, y: 2.4, w: 9, h: 2.8,
    fill: { color: "0f172a" },
    rectRadius: 0.05
  });

  const codeLines = [
    "// src/lib/cache.ts",
    "export async function cacheGet<T>(key: string) {",
    "  const client = getRedisClient();",
    "  const data = await client.get(key);",
    "  if (!data) return null;",
    "  return JSON.parse(data) as T;",
    "}",
    "",
    "export async function cacheSet(key, value, ttl = 300) {",
    "  const client = getRedisClient();",
    "  await client.setex(key, ttl, JSON.stringify(value));",
    "}"
  ];

  let yPos = 2.5;
  codeLines.forEach((line) => {
    let color = "e2e8f0";
    if (line.startsWith("//")) color = "718096";
    else if (["export", "async", "function", "const", "return", "await", "if"].some(k => line.includes(k))) {
      color = "63b3ed";
    }

    slide.addText(line, {
      x: 0.7, y: yPos, w: 8.6, h: 0.22,
      fontSize: 14, fontFace: "Consolas",
      color: color,
      align: "left", valign: "middle"
    });
    yPos += 0.24;
  });

  slide.addNotes("La couche d'abstraction dans src/lib/cache.ts fournit une interface simple pour Redis. cacheGet r\u00e9cup\u00e8re et parse les donn\u00e9es JSON avec typage TypeScript. cacheSet stocke les donn\u00e9es avec un TTL configurable de 300 secondes par d\u00e9faut. Cette abstraction simplifie l'int\u00e9gration.");
}

module.exports = { createSlide };
