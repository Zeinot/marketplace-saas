const pptxgen = require("pptxgenjs");

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  // Top accent bar
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 0.06,
    fill: { color: theme.accent }
  });

  // Title
  slide.addText("Infrastructure Docker", {
    x: 0.5, y: 0.4, w: 9, h: 0.6,
    fontSize: 32, fontFace: "Inter",
    color: theme.primary, bold: true,
    align: "left", valign: "middle"
  });

  // Accent underline
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 1.0, w: 2, h: 0.04,
    fill: { color: theme.accent }
  });

  // Table
  const rows = [
    ["Service", "Image", "Port"],
    ["PostgreSQL", "postgres:16-alpine", "5434:5432"],
    ["Redis", "redis:7-alpine", "6379:6379"],
    ["Next.js", "Dockerfile.dev", "3000:3000"]
  ];

  slide.addTable(rows, {
    x: 0.5, y: 1.3, w: 9,
    colW: [2.5, 3.5, 3],
    fontSize: 18,
    fontFace: "Inter",
    color: theme.secondary,
    border: { pt: 1, color: theme.border },
    fill: { color: theme.card },
    align: "center",
    valign: "middle"
  });

  const items = [
    "Docker Compose pour l'orchestration",
    "Volume persistant redis_data",
    "Healthcheck integre pour Redis",
    "Variable REDIS_URL pour la connexion"
  ];

  items.forEach((text, i) => {
    slide.addText(text, {
      x: 0.7, y: 3.4 + i * 0.5, w: 8.6, h: 0.45,
      fontSize: 20, fontFace: "Inter",
      color: theme.secondary,
      align: "left", valign: "middle"
    });
  });

  // Slide badge
  addBadge(slide, theme, 4);

  slide.addNotes("L'infrastructure utilise Docker Compose avec trois services. PostgreSQL 16 sur Alpine sert de base de donnees sur le port 5434. Redis 7 sur Alpine fonctionne comme cache sur le port 6379 avec un volume persistant et un healthcheck. Next.js est construit depuis un Dockerfile personnalise sur le port 3000.");

  function addBadge(slide, theme, num) {
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 9.1, y: 5.05, w: 0.5, h: 0.35,
      fill: { color: theme.accent },
      rectRadius: 0.1
    });
    slide.addText(String(num), {
      x: 9.1, y: 5.05, w: 0.5, h: 0.35,
      fontSize: 12, fontFace: "Inter",
      color: "0d1b2a", bold: true,
      align: "center", valign: "middle"
    });
  }
}

module.exports = { createSlide };
