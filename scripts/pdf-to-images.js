const { fromPath } = require("pdf2pic");
const path = require("path");

async function convertPDF() {
  const options = {
    density: 150,
    saveFilename: "slide",
    savePath: "./slide-screenshots",
    format: "png",
    width: 1280,
    height: 720
  };

  const convert = fromPath("./output/Presentation_Cache_Redis.pdf", options);
  
  try {
    await convert.bulk(-1); // Convert all pages
    console.log("All slides converted to images in ./slide-screenshots/");
  } catch (error) {
    console.error("Conversion failed:", error);
  }
}

convertPDF();
