const fs = require('fs');
const path = require('path');

function getImageDimensions(imagePath) {
  const buffer = fs.readFileSync(imagePath);
  
  // PNG
  if (buffer[0] === 0x89 && buffer[1] === 0x50) {
    return {
      width: buffer.readUInt32BE(16),
      height: buffer.readUInt32BE(20)
    };
  }
  
  // JPEG
  if (buffer[0] === 0xFF && buffer[1] === 0xD8) {
    let offset = 2;
    while (offset < buffer.length) {
      if (buffer[offset] === 0xFF) {
        const marker = buffer[offset + 1];
        if (marker === 0xC0 || marker === 0xC2) {
          return {
            height: buffer.readUInt16BE(offset + 5),
            width: buffer.readUInt16BE(offset + 7)
          };
        }
        const length = buffer.readUInt16BE(offset + 2);
        offset += 2 + length;
      } else {
        offset++;
      }
    }
  }
  
  return null;
}

function calculateAspectRatioFit(imgWidth, imgHeight, maxWidth, maxHeight) {
  const ratio = Math.min(maxWidth / imgWidth, maxHeight / imgHeight);
  return {
    width: imgWidth * ratio,
    height: imgHeight * ratio
  };
}

// Fix slide 11 (Docker screenshot)
const dockerImg = 'C:\\Users\\Zeinot\\Downloads\\marketplace-saas\\screenshots-report\\04_docker_containers.png';
const dockerDims = getImageDimensions(dockerImg);
if (dockerDims) {
  const fitted = calculateAspectRatioFit(dockerDims.width, dockerDims.height, 9, 4.2);
  console.log(`Slide 11 - Docker: ${dockerDims.width}x${dockerDims.height}, fitted: ${fitted.width.toFixed(2)}x${fitted.height.toFixed(2)}`);
}

// Fix slide 12 (App screenshots)
const homepageImg = 'C:\\Users\\Zeinot\\Downloads\\marketplace-saas\\screenshots-presentation\\homepage.png';
const marketplaceImg = 'C:\\Users\\Zeinot\\Downloads\\marketplace-saas\\screenshots-presentation\\marketplace.png';

const homepageDims = getImageDimensions(homepageImg);
if (homepageDims) {
  const fitted = calculateAspectRatioFit(homepageDims.width, homepageDims.height, 4.2, 3.5);
  console.log(`Slide 12 - Homepage: ${homepageDims.width}x${homepageDims.height}, fitted: ${fitted.width.toFixed(2)}x${fitted.height.toFixed(2)}`);
}

const marketplaceDims = getImageDimensions(marketplaceImg);
if (marketplaceDims) {
  const fitted = calculateAspectRatioFit(marketplaceDims.width, marketplaceDims.height, 4.2, 3.5);
  console.log(`Slide 12 - Marketplace: ${marketplaceDims.width}x${marketplaceDims.height}, fitted: ${fitted.width.toFixed(2)}x${fitted.height.toFixed(2)}`);
}

// Fix slide 13 (Test screenshot)
const testImg = 'C:\\Users\\Zeinot\\Downloads\\marketplace-saas\\screenshots-report\\06_test_results.png';
const testDims = getImageDimensions(testImg);
if (testDims) {
  const fitted = calculateAspectRatioFit(testDims.width, testDims.height, 9, 4.2);
  console.log(`Slide 13 - Tests: ${testDims.width}x${testDims.height}, fitted: ${fitted.width.toFixed(2)}x${fitted.height.toFixed(2)}`);
}
