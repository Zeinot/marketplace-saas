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
    x: 0.5, y: 1.0, w: 1.5, h: 0.05,
    fill: { color: theme.accent }
  });

  const rows = [
    ["Service", "Image", "Port", "Description"],
    ["PostgreSQL", "postgres:16-alpine", "5434:5432", "Base de donn\u00e9es principale"],
    ["Redis", "redis:7-alpine", "6379:6379", "Cache distribu\u00e9 en m\u00e9moire"],
    ["Next.js", "Dockerfile.dev", "3000:3000", "Application web"]
  ];

  slide.addTable(rows, {
    x: 0.5, y: 1.3, w: 9,
    colW: [2, 3, 2, 2],
    fontSize: 16,
    fontFace: "Arial",
    color: theme.secondary,
    border: { pt: 1, color: theme.light },
    fill: { color: "FFFFFF" },
    align: "center",
    valign: "middle"
  });

  const items = [
    "Docker Compose pour l'orchestration",
    "Volume persistant redis_data",
    "Healthcheck int\u00e9gr\u00e9 pour Redis",
    "Variable REDIS_URL pour la connexion"
  ];

  items.forEach((text, i) => {
    slide.addText(text, {
      x: 0.7, y: 3.5 + i * 0.45, w: 8.6, h: 0.4,
      fontSize: 18, fontFace: "Arial",
      color: theme.secondary,
      align: "left", valign: "middle"
    });
  });

  slide.addShape(pres.shapes.OVAL, {
    x: 9.3, y: 5.2, w: 0.35, h: 0.35,
    fill: { color: theme.accent }
  });
  slide.addText("5", {
    x: 9.3, y: 5.2, w: 0.35, h: 0.35,
    fontSize: 11, fontFace: "Arial",
    color: "FFFFFF", bold: true,
    align: "center", valign: "middle"
  });

  slide.addNotes("L'infrastructure de notre projet est enti\u00e8rement containeris\u00e9e avec Docker Compose. Nous utilisons PostgreSQL version 16 sur Alpine comme base de donn\u00e9es principale, Redis version 7 sur Alpine comme serveur de cache distribu\u00e9 en m\u00e9moire, et notre application Next.js est construite \u00e0 partir d'un Dockerfile personnalis\u00e9. La configuration Redis inclut un volume persistant pour les donn\u00e9es nomm\u00e9 redis_data, un healthcheck int\u00e9gr\u00e9 pour surveiller l'\u00e9tat du service, et une connexion via la variable d'environnement REDIS_URL. Le d\u00e9marrage automatique est g\u00e9r\u00e9 par Docker Compose, ce qui facilite grandement le d\u00e9ploiement et la maintenance de l'infrastructure.");
}

module.exports = { createSlide };
