const pptxgen = require("pptxgenjs");

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  slide.addText("Int\u00e9gration dans les Actions", {
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
    "1. G\u00e9n\u00e9ration de cl\u00e9 unique",
    "2. V\u00e9rification Redis (Cache Hit?)",
    "3. Cache Miss : interrogation PostgreSQL",
    "4. Stockage dans Redis avec TTL",
    "5. Application sur toutes les lectures"
  ];

  items.forEach((text, i) => {
    slide.addText(text, {
      x: 0.7, y: 1.1 + i * 0.55, w: 8.6, h: 0.5,
      fontSize: 20, fontFace: "Arial",
      color: theme.secondary,
      align: "left", valign: "middle"
    });
  });

  slide.addNotes("L'integration du cache dans les actions de l'application suit le pattern Cache-Aside que nous avons vu precedemment. Concretement, quand une action est appelee comme getLaunches ou getPosts, elle genere d'abord une cle de cache unique basee sur les parametres de la requete. Ensuite, elle verifie si des donnees sont deja presentes dans Redis avec cette cle. Si c'est le cas, elles sont retournees immediatement. Sinon, l'action interroge la base de donnees PostgreSQL, stocke les resultats dans Redis avec un TTL approprie, puis les retourne. Cette logique est appliquee de maniere coherente sur toutes les operations de lecture frequentes.");
}

module.exports = { createSlide };
