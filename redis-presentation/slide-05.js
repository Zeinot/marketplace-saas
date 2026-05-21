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

  const items = [
    "src/lib/cache.ts",
    "cacheGet : r\u00e9cup\u00e9ration avec typage TypeScript",
    "cacheSet : stockage avec TTL configurable",
    "TTL par d\u00e9faut : 300 secondes",
    "Interface simple et r\u00e9utilisable"
  ];

  items.forEach((text, i) => {
    slide.addText(text, {
      x: 0.7, y: 1.1 + i * 0.55, w: 8.6, h: 0.5,
      fontSize: 20, fontFace: "Arial",
      color: theme.secondary,
      align: "left", valign: "middle"
    });
  });

  slide.addNotes("La couche d'abstraction du cache est le coeur de notre solution. Elle se trouve dans le fichier src/lib/cache.ts et fournit une interface simple et reutilisable pour interagir avec Redis. La fonction cacheGet permet de recuperer des donnees en specifiant le type generique T pour le typage TypeScript. Elle recupere la valeur depuis Redis et la parse depuis JSON. La fonction cacheSet permet de stocker des donnees avec un temps de vie configurable, qui est de 300 secondes par defaut mais peut etre ajuste selon les besoins. Cette abstraction cache toute la complexite de la connexion Redis et de la serialisation JSON, ce qui rend l'integration tres simple dans le reste de l'application.");
}

module.exports = { createSlide };
