import sharp from 'sharp';
import { readdirSync, statSync } from 'fs';
import { join } from 'path';

const root = decodeURIComponent(new URL('..', import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1'));
const PUB = join(root, 'public');
const MARQUES_SRC = join(root, 'marques distribuées');
const MARQUES_OUT = join(PUB, 'marques');
const TINT = { r: 0x1a, g: 0x1a, b: 0x1a }; // gris très sombre uniforme pour bandeau blanc

// --- 1. Photos -> WebP optimisé (<500Ko) ---
async function toWebp(src, out, maxW = 1400) {
  const inputPath = join(root, src);
  const outPath = join(PUB, out);
  for (const quality of [82, 74, 66, 58, 50]) {
    await sharp(inputPath).rotate().resize({ width: maxW, withoutEnlargement: true }).webp({ quality }).toFile(outPath);
    if (statSync(outPath).size / 1024 <= 500) break;
  }
  console.log(`webp ${out}  ${Math.round(statSync(outPath).size / 1024)}Ko`);
}

const photos = [
  ['VISUELS produits NOMOS/PHOTO HERO 101_showroom100838.jpg', 'hero-galerie-art-de-vivre-nomos-landivisiau.webp', 1920],
  ['VISUELS produits NOMOS/Stoneware manufactoring (10).jpg', 'selection-vaisselle-nomos-landivisiau.webp', 900],
  ['VISUELS produits NOMOS/213042 Guggenheim Vase, Petit - Black - Mood 2.jpg', 'selection-mobilier-nomos-landivisiau.webp', 900],
  ['VISUELS produits NOMOS/111125 Guggenheim Vase, Big - Dark Grey - Mood 1.jpg', 'selection-pieces-uniques-nomos-landivisiau.webp', 900],
  ['VISUELS produits NOMOS/1. glass factory 53 SH.jpg', 'selection-luminaires-nomos-landivisiau.webp', 900],
  ['VISUELS produits NOMOS/111219 Guggenheim Vase, Big - Coffee - Mood 1.jpg', 'selection-design-nomos-landivisiau.webp', 900],
  ['VISUELS produits NOMOS/101_showroom100896.jpg', 'le-lieu-boutique-galerie-nomos-landivisiau.webp', 1600],
  ['VISUELS produits NOMOS/Showroom - 3days.jpg', 'le-lieu-detail-matieres-nomos-landivisiau.webp', 1200],
  ['en ce moment chez Nomos/en ce moment photo 1.png', 'en-ce-moment-1-nomos-landivisiau.webp', 900],
  ['en ce moment chez Nomos/en ce moment photo 2.png', 'en-ce-moment-2-nomos-landivisiau.webp', 1200],
  ['en ce moment chez Nomos/en ce moment photo 3.png', 'en-ce-moment-3-nomos-landivisiau.webp', 1200],
  ['en ce moment chez Nomos/en ce moment photo 4.png', 'en-ce-moment-4-nomos-landivisiau.webp', 900],
  ['en ce moment chez Nomos/en ce moment photo 5.png', 'selection-fragrance-nomos-landivisiau.webp', 1200],
  ['en ce moment chez Nomos/en ce moment photo 6.png', 'selection-decoration-nomos-landivisiau.webp', 900],
  ['image illustration section HISTOIRE.jpg', 'histoire-place-eglise-landivisiau-nomos.webp', 1200],
  ['photo fondateur Lucky Mear.png', 'fondateur-lucky-mear-joaillier-peintre-nomos.webp', 1000],
  ['image illustration section partenariats professionnels.png', 'partenariats-professionnels-interieur-nomos-landivisiau.webp', 1000],
  ['carte landivisiau_japanese_ink_20260514_135006.png', 'carte-zone-landivisiau-nomos.webp', 900],
  ['texture background OBJET MATIERE EMOTION.png', 'texture-objet-matiere-emotion-nomos.webp', 1920],
  ['texture background selection territoires meme regard.png', 'texture-selection-nomos.webp', 1920],
];

for (const [src, out, w] of photos) await toWebp(src, out, w);

// OG image 1200x630
await sharp(join(root, 'VISUELS produits NOMOS/PHOTO HERO 101_showroom100838.jpg'))
  .rotate().resize({ width: 1200, height: 630, fit: 'cover', position: 'centre' })
  .webp({ quality: 80 }).toFile(join(PUB, 'og-nomos-galerie-art-de-vivre-landivisiau.webp'));
console.log('webp og image');

// --- 2. Logo monogramme -> public/logo.png (tel quel) + favicon sur fond sombre ---
await sharp(join(root, 'Logo NOMOS blanc.png')).resize({ width: 400, withoutEnlargement: true }).png().toFile(join(PUB, 'logo.png'));
await sharp({ create: { width: 256, height: 256, channels: 4, background: '#0A0A0A' } })
  .composite([{ input: await sharp(join(root, 'Logo NOMOS blanc.png')).resize({ width: 200, height: 200, fit: 'inside' }).toBuffer(), gravity: 'centre' }])
  .png().toFile(join(PUB, 'favicon.png'));
console.log('logo + favicon');

// --- 3. Logos marques -> teinte uniforme gris clair sur transparent ---
const logoFiles = readdirSync(MARQUES_SRC).filter(f => /\.png$/i.test(f) && !f.startsWith('_'));
for (const f of logoFiles) {
  const { data, info } = await sharp(join(MARQUES_SRC, f))
    .flatten({ background: '#ffffff' })
    .resize({ height: 200, fit: 'inside' })
    .grayscale()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const px = info.width * info.height;
  const alpha = Buffer.alloc(px);
  const solid = Buffer.alloc(px * 3);
  for (let i = 0; i < px; i++) {
    alpha[i] = 255 - data[i * info.channels]; // sombre -> opaque
    solid[i * 3] = TINT.r; solid[i * 3 + 1] = TINT.g; solid[i * 3 + 2] = TINT.b;
  }
  const outName = f.replace(/\.png$/i, '').normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/gi, '-').toLowerCase();
  await sharp(solid, { raw: { width: info.width, height: info.height, channels: 3 } })
    .joinChannel(alpha, { raw: { width: info.width, height: info.height, channels: 1 } })
    .png()
    .toFile(join(MARQUES_OUT, `${outName}-blanc.png`));
  console.log(`marque ${outName}`);
}
console.log('\nTerminé.');
