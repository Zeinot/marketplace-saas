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

  slide.addText("L'integration du cache dans les actions de l'application suit le pattern Cache-Aside. Chaque action genere d'abord une cle de cache unique basee sur les parametres de la requete. Ensuite, elle verifie si des donnees sont deja presentes dans Redis. Si c'est le cas, elles sont retournees immediatement. Sinon, l'action interroge PostgreSQL, stocke les resultats dans Redis avec un TTL approprie, puis les retourne.", {
    x: 0.5, y: 1.0, w: 9, h: 2.0,
    fontSize: 18, fontFace: "Arial",
    color: theme.secondary,
    align: "left", valign: "top"
  });

  const items = [
    "G\u00e9n\u00e9ration de cl\u00e9 unique par requ\u00eate",
    "V\u00e9rification Redis avant PostgreSQL", 
    "Stockage automatique avec TTL appropri\u00e9",
    "Application coh\u00e9rente sur toutes les lectures"
  ];

  items.forEach((text, i) => {
    slide.addText(text, {
      x: 0.7, y: 2.8 + i * 0.45, w: 8.6, h: 0.4,
      fontSize: 18, fontFace: "Arial",
      color: theme.secondary,
      align: "left", valign: "middle"
    });
  });

  slide.addNotes("L'int\u00e9gration suit le pattern Cache-Aside. Chaque action g\u00e9n\u00e8re une cl\u00e9 unique et v\u00e9rifie Redis. Si les donn\u00e9es existent, elles sont retourn\u00e9es. Sinon, PostgreSQL est interrog\u00e9e, les r\u00e9sultats sont stock\u00e9s dans Redis avec un TTL, puis retourn\u00e9s.");
}

module.exports = { createSlide };
