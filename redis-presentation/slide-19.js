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

  slide.addText("Plusieurs pistes d'amelioration sont envisageables pour renforcer encore notre solution de cache distribue. Premierement, nous pourrions mettre en place un cluster Redis avec replication pour garantir la haute disponibilite. Deuxiemement, l'ajout d'un cache LRU local cote application pourrait complemeter Redis et reduire encore davantage la latence.", {
    x: 0.5, y: 1.0, w: 9, h: 2.0,
    fontSize: 18, fontFace: "Arial",
    color: theme.secondary,
    align: "left", valign: "top"
  });

  const items = [
    "Cluster Redis avec replication pour haute disponibilite",
    "Cache LRU local cote application",
    "Cache warming pour precharger les donnees populaires",
    "Redis Streams pour invalidation en temps reel multi-serveur",
    "Dashboard de monitoring des taux de hit et miss"
  ];

  items.forEach((text, i) => {
    slide.addText(text, {
      x: 0.7, y: 2.7 + i * 0.45, w: 8.6, h: 0.4,
      fontSize: 18, fontFace: "Arial",
      color: theme.secondary,
      align: "left", valign: "middle"
    });
  });

  slide.addNotes("Plusieurs pistes d'amelioration sont envisageables. Premierement, un cluster Redis avec replication garantirait la haute disponibilite. Deuxiemement, un cache LRU local cote application complemeterait Redis. Troisiemement, un systeme de cache warming prechargerait les donnees populaires.");
}

module.exports = { createSlide };
