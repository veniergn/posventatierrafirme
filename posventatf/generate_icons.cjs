const Jimp = require('jimp');

async function createIcon(size, outputName) {
  // Create a white image of size x size
  const bg = new Jimp(size, size, 0xFFFFFFFF); 
  
  // Load original logo
  const logo = await Jimp.read('public/logo-tf.png');
  
  // Scale logo to fit inside 80% of the icon, preserving aspect ratio
  logo.contain(size * 0.8, size * 0.8);
  
  // Paste the logo in the center of the white background
  const x = (size - logo.bitmap.width) / 2;
  const y = (size - logo.bitmap.height) / 2;
  bg.composite(logo, x, y);
  
  // Save
  await bg.writeAsync('public/' + outputName);
  console.log('Generated', outputName);
}

async function main() {
  await createIcon(192, 'pwa-192x192.png');
  await createIcon(512, 'pwa-512x512.png');
  await createIcon(180, 'apple-touch-icon.png');
  console.log('All icons generated successfully!');
}

main().catch(console.error);
