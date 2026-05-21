const pptxgen = require("pptxgenjs");

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  slide.addText("Conclusion et Perspectives", {
    x: 0.5, y: 0.3, w: 9, h: 0.5,
    fontSize: 28, fontFace: "Arial",
    color: theme.primary, bold: true,
    align: "left", valign: "middle"
  });

  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 0.8, w: 2, h: 0.05,
    fill: { color: theme.accent }
  });

  slide.addText("En conclusion, tous les objectifs ont ete atteints. Le temps de reponse moyen a ete reduit de quatre-vingt-dix-neuf pour cent. La charge sur PostgreSQL a diminue de quatre-vingt-cinq pour cent. Les huit tests unitaires passent tous. Pour l'avenir, nous envisageons un cluster Redis avec replication, un cache LRU local, du cache warming, et un dashboard de monitoring.", {
    x: 0.5, y: 1.0, w: 9, h: 2.0,
    fontSize: 18, fontFace: "Arial",
    color: theme.secondary,
    align: "left", valign: "top"
  });

  const items = [
    "Temps de r\u00e9ponse r\u00e9duit de 99%",
    "Charge sur PostgreSQL diminu\u00e9e de 85%",
    "Tests unitaires : 100% de r\u00e9ussite",
    "Cluster Redis avec r\u00e9plication",
    "Cache LRU local et cache warming",
    "Dashboard de monitoring"
  ];

  items.forEach((text, i) => {
    slide.addText(text, {
      x: 0.7, y: 3.0 + i * 0.4, w: 8.6, h: 0.35,
      fontSize: 18, fontFace: "Arial",
      color: theme.secondary,
      align: "left", valign: "middle"
    });
  });

  slide.addNotes("En conclusion, tous les objectifs ont ete atteints. Le temps de reponse moyen a ete reduit de quatre-vingt-dix-neuf pour cent. La charge sur PostgreSQL a diminue de quatre-vingt-cinq pour cent. Les huit tests unitaires passent tous. Pour l'avenir, nous envisageons un cluster Redis avec replication.");
}

module.exports = { createSlide };
