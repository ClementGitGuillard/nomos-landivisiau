import sharp from 'sharp';
import { readdirSync } from 'fs';
import { join } from 'path';

const root = decodeURIComponent(new URL('..', import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1'));

async function sheet(dir, outName, cols = 3, thumb = 320) {
  const abs = join(root, dir);
  const files = readdirSync(abs).filter(f => /\.(jpe?g|png)$/i.test(f)).sort();
  const rows = Math.ceil(files.length / cols);
  const pad = 8, labelH = 22;
  const cellW = thumb + pad * 2;
  const cellH = thumb + pad * 2 + labelH;
  const W = cols * cellW;
  const H = rows * cellH;
  const composites = [];
  for (let i = 0; i < files.length; i++) {
    const col = i % cols, row = Math.floor(i / cols);
    const buf = await sharp(join(abs, files[i]))
      .resize({ width: thumb, height: thumb, fit: 'inside' })
      .flatten({ background: '#222' })
      .toBuffer();
    composites.push({ input: buf, left: col * cellW + pad, top: row * cellH + pad });
    const svg = `<svg width="${cellW}" height="${labelH}"><rect width="100%" height="100%" fill="#000"/><text x="4" y="15" font-size="13" fill="#fff" font-family="sans-serif">${i + 1}. ${files[i].slice(0, 38)}</text></svg>`;
    composites.push({ input: Buffer.from(svg), left: col * cellW, top: row * cellH + pad + thumb + pad });
  }
  await sharp({ create: { width: W, height: H, channels: 3, background: '#444' } })
    .composite(composites)
    .jpeg({ quality: 78 })
    .toFile(join(root, outName));
  console.log(`${outName}: ${files.length} images`);
  files.forEach((f, i) => console.log(`  ${i + 1}. ${f}`));
}

await sheet('VISUELS produits NOMOS', '_sheet-produits.jpg', 3, 360);
await sheet('en ce moment chez Nomos', '_sheet-encemoment.jpg', 3, 360);
await sheet('marques distribuées', '_sheet-marques.jpg', 4, 200);
