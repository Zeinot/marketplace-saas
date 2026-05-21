const pptxgen = require("pptxgenjs");

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  slide.addText("Infrastructure Docker", {
    x: 0.5, y: 0.4, w: 9, h: 0.6,
    fontSize: 32, fontFace: "Arial",
    color: theme.primary, bold: true,
    align: "left", valign: "middle"
  });

  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 1.0, w: 2, h: 0.05,
    fill: { color: theme.accent }
  });

  slide.addText("L'infrastructure de notre projet est entierement containerisee avec Docker Compose. Nous utilisons PostgreSQL version 16 sur Alpine comme base de donnees principale, Redis version 7 sur Alpine comme serveur de cache distribue en memoire, et notre application Next.js est construite a partir d'un Dockerfile personnalise.", {
    x: 0.5, y: 1.2, w: 9, h: 1.5,
    fontSize: 18, fontFace: "Arial",
    color: theme.secondary,
    align: "left", valign: "top"
  });

  const rows = [
    ["Service", "Image", "Port", "Description"],
    ["PostgreSQL", "postgres:16-alpine", "5434:5432", "Base de donn\u00e9es principale"],
    ["Redis", "redis:7-alpine", "6379:6379", "Cache distribu\u00e9 en m\u00e9moire"],
    ["Next.js", "Dockerfile.dev", "3000:3000", "Application web"]
  ];

  slide.addTable(rows, {
    x: 0.5, y: 2.6, w: 9,
    colW: [2, 3, 2, 2],
    fontSize: 16,
    fontFace: "Arial",
    color: theme.secondary,
    border: { pt: 1, color: theme.light },
    fill: { color: "2c5282" },
    align: "center",
    valign: "middle"
  });

  slide.addNotes("Notre infrastructure utilise Docker Compose avec trois services. PostgreSQL 16 sur Alpine sert de base de donn\u00e9es sur le port 5434. Redis 7 sur Alpine fonctionne comme cache sur le port 6379 avec un volume persistant et un healthcheck. Next.js est construit depuis un Dockerfile personnalis\u00e9 sur le port 3000.");
}

module.exports = { createSlide };
