// Convert the supplied artwork to web assets and a multi-size ICO.
const sharp = require('sharp');
const fs = require('node:fs/promises');
const path = require('node:path');

async function main() {
  const root = path.resolve(__dirname, '..');
  const source = process.argv[2];
  if (!source) throw new Error('Pass the path to the supplied brand image.');
  const perimeterMask = Buffer.from(`
    <svg width="1600" height="1600" xmlns="http://www.w3.org/2000/svg">
      <circle cx="835" cy="912" r="554" fill="none" stroke="white" stroke-width="34" />
    </svg>
  `);
  const cleanSource = await sharp(source)
    .composite([{ input: perimeterMask }])
    .png()
    .toBuffer();
  await fs.writeFile(path.join(root, 'public/brand-source.png'), cleanSource);
  const logo = sharp(cleanSource).extract({ left: 260, top: 340, width: 1145, height: 1145 });
  await logo.clone().resize(768, 768).png().toFile(path.join(root, 'public/brand-logo.png'));
  // Keep the old URL valid for saved links and older cached pages.
  await logo.clone().resize(768, 768).jpeg({ quality: 95 }).toFile(path.join(root, 'public/logo.jpg'));
  await logo.clone().resize(180, 180).png().toFile(path.join(root, 'app/apple-icon.png'));
  const sizes = [16, 32, 48, 64, 128, 256];
  const frames = await Promise.all(sizes.map(size => logo.clone().resize(size, size).png().toBuffer()));
  const header = Buffer.alloc(6 + sizes.length * 16);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(sizes.length, 4);
  let offset = header.length;
  frames.forEach((frame, index) => {
    const entry = 6 + index * 16;
    header[entry] = header[entry + 1] = sizes[index] === 256 ? 0 : sizes[index];
    header.writeUInt16LE(1, entry + 4);
    header.writeUInt16LE(32, entry + 6);
    header.writeUInt32LE(frame.length, entry + 8);
    header.writeUInt32LE(offset, entry + 12);
    offset += frame.length;
  });
  await fs.writeFile(path.join(root, 'app/favicon.ico'), Buffer.concat([header, ...frames]));
}

main().catch(error => { console.error(error); process.exitCode = 1; });
