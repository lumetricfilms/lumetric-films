// Generates public/apple-touch-icon.png (180x180) and public/favicon-32.png
// from the brand icon. Run with: node scripts/make-icons.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { Resvg } from '@resvg/resvg-js';

const svg = readFileSync('src/assets/lumetric-icon.svg', 'utf8');

for (const { size, file } of [
  { size: 180, file: 'public/apple-touch-icon.png' },
  { size: 32, file: 'public/favicon-32.png' },
]) {
  const png = new Resvg(svg, {
    fitTo: { mode: 'width', value: size },
    background: '#09090b',
  })
    .render()
    .asPng();
  writeFileSync(file, png);
  console.log('Wrote', file, png.length, 'bytes');
}
