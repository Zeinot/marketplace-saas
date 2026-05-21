const pptxgen = require("pptxgenjs");

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  slide.addText("Infrastructure Docker et Cache", {
    x: 0.5, y: 0.3, w: 9, h: 0.5,
    fontSize: 28, fontFace: "Arial",
    color: theme.primary, bold: true,
    align: "left", valign: "middle"
  });

  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 0.8, w: 2, h: 0.05,
    fill: { color: theme.accent }
  });

  slide.addText("L'infrastructure est containerisee avec Docker Compose. PostgreSQL 16 sert de base de donnees sur le port 5434. Redis 7 fonctionne comme cache sur le port 6379 avec un volume persistant et un healthcheck. La couche d'abstraction fournit une interface simple : cacheGet recupere les donnees avec typage TypeScript, et cacheSet stocke avec un TTL configurable de 300 secondes.", {
    x: 0.5, y: 1.0, w: 9, h: 2.0,
    fontSize: 18, fontFace: "Arial",
    color: theme.secondary,
    align: "left", valign: "top"
  });

  const rows = [
    ["Service", "Image", "Port", "Description"],
    ["PostgreSQL", "postgres:16-alpine", "5434:5432", "Base de donn\u00e9es"],
    ["Redis", "redis:7-alpine", "6379:6379", "Cache distribu\u00e9"],
    ["Next.js", "Dockerfile.dev", "3000:3000", "Application web"]
  ];

  slide.addTable(rows, {
    x: 0.5, y: 3.0, w: 9,
    colW: [2, 3, 2, 2],
    fontSize: 16,
    fontFace: "Arial",
    color: theme.secondary,
    border: { pt: 1, color: theme.light },
    fill: { color: "2c5282" },
    align: "center",
    valign: "middle"
  });

  slide.addNotes("L'infrastructure utilise Docker Compose avec trois services. PostgreSQL 16 sur Alpine sert de base de donn\u00e9es sur le port 5434. Redis 7 sur Alpine fonctionne comme cache sur le port 6379 avec un volume persistant et un healthcheck. La couche d'abstraction simplifie l'int\u00e9gration.");
}

module.exports = { createSlide };
