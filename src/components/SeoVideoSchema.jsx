import { showcaseSections } from '../data/showcase.js';
import { isSelfHosted, posterFor, watchUrl } from '../lib/video.js';

const SITE = 'https://lumetricfilms.com';

const absolute = (path) => (path.startsWith('http') ? path : `${SITE}${path}`);

// VideoObject structured data for the portfolio, derived from the showcase
// data so it never drifts. Rendered as a JSON-LD script in the body (valid
// for parsers). Each video carries a per-video `uploadDate` (set in
// showcase.js) — the field Google requires for video rich results.
const itemList = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Lumetric Films portfolio',
  itemListElement: showcaseSections.flatMap((section) =>
    section.videos.map((video) => ({
      '@type': 'VideoObject',
      name: video.title,
      uploadDate: video.uploadDate,
      description: video.blurb || `${section.eyebrow} work by Lumetric Films.`,
      thumbnailUrl: absolute(posterFor(video)),
      ...(isSelfHosted(video)
        ? { contentUrl: absolute(video.src) }
        : {
            embedUrl: `https://www.youtube-nocookie.com/embed/${video.youTubeId}`,
            url: watchUrl(video),
          }),
      genre: section.eyebrow,
    })),
  ).map((item, index) => ({ '@type': 'ListItem', position: index + 1, item })),
};

export default function SeoVideoSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }}
    />
  );
}
