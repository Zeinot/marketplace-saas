const pptxgen = require("pptxgenjs");

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  slide.addText("Infrastructure Docker", {
    x: 0.5, y: 0.3, w: 9, h: 0.5,
    fontSize: 28, fontFace: "Arial",
    color: theme.primary, bold: true,
    align: "left", valign: "middle"
  });

  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 0.8, w: 2, h: 0.05,
    fill: { color: theme.accent }
  });

  const rows = [
    ["Service", "Image", "Port"],
    ["PostgreSQL", "postgres:16-alpine", "5434:5432"],
    ["Redis", "redis:7-alpine", "6379:6379"],
    ["Next.js", "Dockerfile.dev", "3000:3000"]
  ];

  slide.addTable(rows, {
    x: 0.5, y: 1.1, w: 9,
    colW: [2.5, 3, 2.5],
    fontSize: 18,
    fontFace: "Arial",
    color: theme.secondary,
    border: { pt: 1, color: theme.light },
    fill: { color: "2c5282" },
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
      x: 0.7, y: 3.4 + i * 0.5, w: 8.6, h: 0.45,
      fontSize: 20, fontFace: "Arial",
      color: theme.secondary,
      align: "left", valign: "middle"
    });
  });

  slide.addNotes("L'infrastructure de notre projet est entierement containerisee avec Docker Compose. Nous utilisons PostgreSQL version 16 sur Alpine comme base de donnees principale, Redis version 7 sur Alpine comme serveur de cache distribue en memoire, et notre application Next.js est construite a partir d'un Dockerfile personnalise. La configuration Redis inclut un volume persistant pour les donnees nomme redis_data, un healthcheck integre pour surveiller l'etat du service, et une connexion via la variable d'environnement REDIS_URL. Le demarrage automatique est gere par Docker Compose, ce qui facilite grandement le deploiement et la maintenance de l'infrastructure.");
}

module.exports = { createSlide };
