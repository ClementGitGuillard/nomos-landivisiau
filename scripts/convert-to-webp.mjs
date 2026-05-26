/**
 * convert-to-webp.mjs
 * Convertit toutes les images du dossier public/ en WebP optimisé
 * - Max 1600px de large pour hero-*, 1200px pour le reste
 * - Qualité adaptative pour rester sous 500Ko
 * - Supprime le fichier original après conversion (sauf --keep)
 */

import sharp from 'sharp';
import { readdirSync, statSync, unlinkSync } from 'fs';
import { join, extname, basename } from 'path';

const PUBLIC_DIR = decodeURIComponent(new URL('../public', import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1'));
const MAX_SIZE_KB = 500;
const KEEP_ORIGINALS = process.argv.includes('--keep');

const EXTENSIONS = ['.jpg', '.jpeg', '.png'];

const files = readdirSync(PUBLIC_DIR).filter(f => {
  const ext = extname(f).toLowerCase();
  return EXTENSIONS.includes(ext) && !f.startsWith('logo') && !f.startsWith('favicon');
});

if (files.length === 0) {
  console.log('Aucune image à convertir.');
  process.exit(0);
}

console.log(`${files.length} image(s) à convertir en WebP...\n`);

for (const file of files) {
  const inputPath = join(PUBLIC_DIR, file);
  const outputName = basename(file, extname(file)) + '.webp';
  const outputPath = join(PUBLIC_DIR, outputName);

  try { statSync(outputPath); console.log(`⏭  ${file} → déjà converti`); continue; } catch {}

  const maxWidth = file.startsWith('hero-') ? 1920 : 1400;

  let success = false;
  for (const quality of [82, 72, 62, 52]) {
    await sharp(inputPath)
      .rotate()
      .resize({ width: maxWidth, withoutEnlargement: true })
      .webp({ quality })
      .toFile(outputPath);

    const sizeKb = statSync(outputPath).size / 1024;
    if (sizeKb <= MAX_SIZE_KB) {
      const origKb = statSync(inputPath).size / 1024;
      const gain = Math.round((1 - sizeKb / origKb) * 100);
      console.log(`✅ ${file} → ${outputName}  (${Math.round(origKb)}Ko → ${Math.round(sizeKb)}Ko, -${gain}%, q${quality})`);
      success = true;
      break;
    }
  }

  if (!success) {
    const sizeKb = statSync(outputPath).size / 1024;
    console.log(`⚠️  ${file} → ${outputName} (${Math.round(sizeKb)}Ko — dépasse 500Ko)`);
  }

  if (!KEEP_ORIGINALS) unlinkSync(inputPath);
}

console.log('\nTerminé.');
