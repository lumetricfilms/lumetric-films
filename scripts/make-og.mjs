// Generates public/og.png (1200x630), the social share preview image.
// Run with: node scripts/make-og.mjs
import { writeFileSync, mkdirSync, readFileSync } from 'node:fs';
import { Resvg } from '@resvg/resvg-js';

// Embed the real logo (same master as the favicons) onto the card.
const logoUri = `data:image/png;base64,${readFileSync('src/assets/lumetric-icon.png').toString('base64')}`;

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <radialGradient id="bgglow" cx="50%" cy="34%" r="60%">
      <stop offset="0%" stop-color="#0e7490" stop-opacity="0.55"/>
      <stop offset="45%" stop-color="#0891b2" stop-opacity="0.12"/>
      <stop offset="100%" stop-color="#09090b" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="1200" height="630" fill="#09090b"/>
  <rect width="1200" height="630" fill="url(#bgglow)"/>

  <g stroke="#ffffff" stroke-opacity="0.05" stroke-width="1">
    ${Array.from({ length: 17 }, (_, i) => `<line x1="${i * 75}" y1="0" x2="${i * 75}" y2="630"/>`).join('')}
    ${Array.from({ length: 9 }, (_, i) => `<line x1="0" y1="${i * 75}" x2="1200" y2="${i * 75}"/>`).join('')}
  </g>

  <g stroke="#ffffff" stroke-opacity="0.5" stroke-width="4" fill="none">
    <path d="M70 70 h54 M70 70 v54"/>
    <path d="M1130 70 h-54 M1130 70 v54"/>
    <path d="M70 560 h54 M70 560 v-54"/>
    <path d="M1130 560 h-54 M1130 560 v-54"/>
  </g>

  <image href="${logoUri}" x="525" y="96" width="150" height="150" preserveAspectRatio="xMidYMid meet"/>

  <text x="600" y="360" text-anchor="middle" fill="#ffffff"
        font-family="Arial, Helvetica, sans-serif" font-size="88" font-weight="900" letter-spacing="6">LUMETRIC FILMS</text>

  <rect x="540" y="388" width="120" height="3" rx="1.5" fill="#67e8f9"/>

  <text x="600" y="452" text-anchor="middle" fill="#d4d4d8"
        font-family="Arial, Helvetica, sans-serif" font-size="32" font-weight="500">Cinematic video and photography, made in the Bronx, NYC</text>

  <text x="600" y="560" text-anchor="middle" fill="#67e8f9"
        font-family="Arial, Helvetica, sans-serif" font-size="22" font-weight="700" letter-spacing="6">VIDEO  ·  PHOTOGRAPHY  ·  EDITING</text>
</svg>`;

const resvg = new Resvg(svg, {
  fitTo: { mode: 'width', value: 1200 },
  font: { loadSystemFonts: true },
  background: '#09090b',
});
const png = resvg.render().asPng();
mkdirSync('public', { recursive: true });
writeFileSync('public/og.png', png);
console.log('Wrote public/og.png', png.length, 'bytes');
