// Generates public/og.png (1200x630), the social share preview image.
// Run with: node scripts/make-og.mjs
import { writeFileSync, mkdirSync } from 'node:fs';
import { Resvg } from '@resvg/resvg-js';

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <radialGradient id="bgglow" cx="50%" cy="34%" r="60%">
      <stop offset="0%" stop-color="#0e7490" stop-opacity="0.55"/>
      <stop offset="45%" stop-color="#0891b2" stop-opacity="0.12"/>
      <stop offset="100%" stop-color="#09090b" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="og-orb" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="48%" stop-color="#ffffff"/>
      <stop offset="72%" stop-color="#67e8f9"/>
      <stop offset="100%" stop-color="#0891b2" stop-opacity="0"/>
    </radialGradient>
    <filter id="og-glow" x="-90%" y="-90%" width="280%" height="280%" color-interpolation-filters="sRGB">
      <feGaussianBlur stdDeviation="10" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
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

  <g transform="translate(525 116) scale(0.293)">
    <rect x="76" y="52" width="360" height="408" rx="54" fill="none" stroke="#f5f5f5" stroke-width="9"/>
    <path d="M188 148h58v228h125v52H188V148Z" fill="#ffffff"/>
    <circle cx="324" cy="190" r="46" fill="url(#og-orb)" filter="url(#og-glow)"/>
  </g>

  <text x="600" y="360" text-anchor="middle" fill="#ffffff"
        font-family="Arial, Helvetica, sans-serif" font-size="88" font-weight="900" letter-spacing="6">LUMETRIC FILMS</text>

  <rect x="540" y="388" width="120" height="3" rx="1.5" fill="#67e8f9"/>

  <text x="600" y="452" text-anchor="middle" fill="#d4d4d8"
        font-family="Arial, Helvetica, sans-serif" font-size="32" font-weight="500">Cinematic video and photography for artists, brands, and moments</text>

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
