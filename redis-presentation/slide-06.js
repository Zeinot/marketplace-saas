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

  let yPos = 1.1;
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

  const items = [
    "Interface simple et r\u00e9utilisable",
    "Typage TypeScript avec g\u00e9n\u00e9riques",
    "S\u00e9rialisation JSON automatique",
    "TTL configurable par d\u00e9faut 300s"
  ];

  items.forEach((text, i) => {
    slide.addText(text, {
      x: 0.7, y: 3.9 + i * 0.35, w: 8.6, h: 0.3,
      fontSize: 16, fontFace: "Arial",
      color: theme.secondary,
      align: "left", valign: "middle"
    });
  });

  slide.addShape(pres.shapes.OVAL, {
    x: 9.3, y: 5.2, w: 0.35, h: 0.35,
    fill: { color: theme.accent }
  });
  slide.addText("6", {
    x: 9.3, y: 5.2, w: 0.35, h: 0.35,
    fontSize: 11, fontFace: "Arial",
    color: "FFFFFF", bold: true,
    align: "center", valign: "middle"
  });

  slide.addNotes("La couche d'abstraction du cache est le c\u0153ur de notre solution. Elle se trouve dans le fichier src/lib/cache.ts et fournit une interface simple et r\u00e9utilisable pour interagir avec Redis. La fonction cacheGet permet de r\u00e9cup\u00e9rer des donn\u00e9es en sp\u00e9cifiant le type g\u00e9n\u00e9rique T pour le typage TypeScript. Elle r\u00e9cup\u00e8re la valeur depuis Redis et la parse depuis JSON. La fonction cacheSet permet de stocker des donn\u00e9es avec un temps de vie configurable, qui est de 300 secondes par d\u00e9faut mais peut \u00eatre ajust\u00e9 selon les besoins. Cette abstraction cache toute la complexit\u00e9 de la connexion Redis et de la s\u00e9rialisation JSON, ce qui rend l'int\u00e9gration tr\u00e8s simple dans le reste de l'application.");
}

module.exports = { createSlide };
