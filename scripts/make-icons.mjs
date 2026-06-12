// Regenerates the favicon/app-icon PNGs from the master logo
// (src/assets/lumetric-icon.png, which has transparent corners).
// Run with: node scripts/make-icons.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { Resvg } from '@resvg/resvg-js';

const uri = `data:image/png;base64,${readFileSync('src/assets/lumetric-icon.png').toString('base64')}`;

// `bg` fills the square (iOS home-screen icons must be opaque); favicons keep
// the transparent corners.
const wrap = (size, bg) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">` +
  (bg ? `<rect width="${size}" height="${size}" fill="${bg}"/>` : '') +
  `<image href="${uri}" width="${size}" height="${size}" preserveAspectRatio="xMidYMid meet"/></svg>`;

for (const { size, file, bg } of [
  { size: 180, file: 'public/apple-touch-icon.png', bg: '#000000' },
  { size: 192, file: 'public/favicon-192.png', bg: null },
  { size: 32, file: 'public/favicon-32.png', bg: null },
]) {
  const png = new Resvg(wrap(size, bg), { fitTo: { mode: 'width', value: size } })
    .render()
    .asPng();
  writeFileSync(file, png);
  console.log('Wrote', file, png.length, 'bytes');
}
