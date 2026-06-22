// Live preview portfolio data.
//
//   layout: 'full' renders a full width feature tile.
//   layout: 'half' renders a two column tile (pairs sit side by side).
//   start / end are in seconds and define the silent looping preview segment.
//
// Video sources — each entry plays from ONE of these (src wins if both set):
//   src: self-hosted MP4, e.g. '/videos/<id>.mp4' (file in public/videos/,
//        named after the entry's id) or any absolute https URL for files too
//        large for the repo. Poster image defaults to the same path with a
//        .jpg extension (generate with: node scripts/make-posters.mjs).
//   previewSrc: small self-hosted clip of just the start..end stamp, for
//        shows too long to host in the repo — the tile preview plays this
//        natively while the theater click still uses youTubeId.
//   hlsSrc: adaptive (multi-quality) stream for the theater; preferred over
//        src when present so long shows don't stall on weak connections.
//   youTubeId: YouTube fallback used until an MP4 is provided.

export const showcaseSections = [
  {
    id: 'live-performances',
    accent: '#67e8f9',
    eyebrow: 'Live Performances',
    title: 'Stage shows, captured with cinematic energy.',
    blurb:
      'From packed auditoriums to intimate recitals, we cover live performance with a multi camera eye for motion, light, and the moment a room holds its breath.',
    videos: [
      // Live performances are deliberately YouTube-free: tile previews are
      // small local clips, and the theater streams the FULL show from R2
      // (free egress) — only viewable on this site. The clips contain the
      // preview stamp; the full files use the show's own timeline.
      {
        id: 'june-show',
        uploadDate: '2026-06-12',
        duration: 'PT33S',
        title: 'Lumetric June Show',
        src: 'https://pub-f28b13e3d40748758fec68cce995c20a.r2.dev/Lumetric%20June%20Show%20Clip.mp4',
        previewSrc: '/videos/lumetric-june-show-preview.mp4',
        poster: '/videos/lumetric-june-show.jpg',
        start: 0,
        end: 33,
        layout: 'full',
        // Open the theater muted (autoplay-friendly); viewers can unmute with
        // the native controls.
        muted: true,
        role: 'Filmed and edited by Lumetric Films',
        blurb: 'A look inside the Lumetric June show.',
      },
      {
        id: 'roots-of-resilience',
        uploadDate: '2026-03-27',
        duration: 'PT1H24M43S',
        title: 'Roots of Resilience · Bronx Dance Academy × P.S. 41',
        src: 'https://pub-f28b13e3d40748758fec68cce995c20a.r2.dev/roots-of-resilience-full.mp4',
        hlsSrc: 'https://pub-f28b13e3d40748758fec68cce995c20a.r2.dev/hls/roots-of-resilience/master.m3u8',
        previewSrc: '/videos/roots-of-resilience-preview.mp4',
        poster: '/videos/roots-of-resilience.jpg',
        start: 2534,
        end: 2546,
        layout: 'half',
        role: 'Filmed and edited by Lumetric Films · 2026',
        blurb: 'Roots of Resilience, the 2026 BDA and P.S. 41 MMCC show.',
      },
      {
        id: 'mmcc-bda-show',
        uploadDate: '2026-05-24',
        duration: 'PT1H8M23S',
        title: 'Afterschool Showcase · Bronx Dance Academy at MMCC',
        src: 'https://pub-f28b13e3d40748758fec68cce995c20a.r2.dev/mmcc-bda-show-full.mp4',
        hlsSrc: 'https://pub-f28b13e3d40748758fec68cce995c20a.r2.dev/hls/mmcc-bda-show/master.m3u8',
        previewSrc: '/videos/mmcc-bda-show-preview.mp4',
        poster: '/videos/mmcc-bda-show.jpg',
        start: 2003,
        end: 2011,
        layout: 'half',
        role: 'Filmed and edited by Lumetric Films · 2026',
        blurb: 'Highlights from the MMCC afterschool BDA showcase.',
      },
      {
        id: 'bda-winter-show',
        uploadDate: '2025-12-12',
        duration: 'PT17S',
        title: 'Bronx Dance Academy Winter Show',
        src: 'https://pub-f28b13e3d40748758fec68cce995c20a.r2.dev/Lumetric%20Winter%20Show%20Clip.mp4',
        previewSrc: '/videos/lumetric-winter-show-preview.mp4',
        poster: '/videos/lumetric-winter-show.jpg',
        start: 0,
        end: 17,
        // Full-bleed banner (~1897x720), stretched across the full width.
        layout: 'banner',
        // The wide banner crops a 16:9 frame; the dancers (and the kick line)
        // sit low in frame, so anchor the crop to the bottom.
        objectPosition: 'center bottom',
        role: 'Filmed and edited by Lumetric Films',
        blurb: 'A look inside the Bronx Dance Academy winter show.',
      },
    ],
  },
  {
    id: 'academic-showcases',
    accent: '#93c5fd',
    eyebrow: 'Academic Showcases',
    title: 'School productions, presented with a cinematic finish.',
    blurb:
      'Showcase films for schools and academic programs — galas, assemblies, and cultural celebrations captured and edited to feel like a feature.',
    videos: [
      {
        id: 'bda-gala-may-show',
        uploadDate: '2026-06-12',
        duration: 'PT3M34S',
        title: 'Bronx Dance Academy · Gala May Show',
        youTubeId: 'ivtPlMJKq-A',
        start: 68,
        end: 77,
        layout: 'half',
        role: 'Filmed and edited by Lumetric Films',
        blurb: 'A moment from the Bronx Dance Academy gala May show.',
      },
      {
        id: 'i-am-black-history-month',
        uploadDate: '2026-05-24',
        duration: 'PT50S',
        title: 'I Am · Black History Month · BDA at MMCC',
        youTubeId: '5NqZCA1xV8Q',
        start: 38,
        end: 45,
        layout: 'half',
        role: 'Filmed and edited by Lumetric Films',
        blurb: 'A Black History Month showcase with Bronx Dance Academy at MMCC.',
      },
    ],
  },
  {
    id: 'music-videos',
    accent: '#c4b5fd',
    eyebrow: 'Music Videos',
    title: 'Performance and story, built around the track.',
    blurb:
      'Official music videos with a focus on rhythm driven editing, bold color, and visuals that move with the feeling of the song.',
    videos: [
      {
        id: 'puri-paralyzed',
        uploadDate: '2023-01-01',
        duration: 'PT3M50S',
        title: 'Puri · Paralyzed',
        youTubeId: 'TzZoL2re2Nk',
        start: 130,
        end: 136,
        layout: 'half',
        role: 'Official Music Video',
        blurb: 'A moment from the official video for Paralyzed.',
      },
      {
        id: 'puri-numb',
        uploadDate: '2023-01-01',
        duration: 'PT2M5S',
        title: 'Puri · Numb',
        youTubeId: 'f7y-UysDRa0',
        start: 25,
        end: 30,
        layout: 'half',
        role: 'Official Music Video',
        blurb: 'A moment from the official video for Numb.',
      },
    ],
  },
  {
    id: 'commercial-brand',
    accent: '#fcd34d',
    eyebrow: 'Commercial & Brand',
    title: 'Brand films built to read premium in the first three seconds.',
    blurb:
      'Polished brand pieces and competition films, crafted to read as premium in the first few seconds and hold attention all the way through.',
    videos: [
      {
        id: 'gensler-submission',
        uploadDate: '2024-05-03',
        duration: 'PT4M46S',
        title: 'Gensler Design Competition · Jaydin Parker',
        youTubeId: 'QjvDxbtBqWs',
        start: 90,
        end: 94,
        layout: 'half',
        role: 'Directed and edited by Lumetric Films',
        blurb: 'Selected frames from the Gensler competition film.',
      },
      {
        id: 'urban-health-practice',
        uploadDate: '2024-05-07',
        duration: 'PT2M44S',
        title: 'Urban Health · Spec Brand Film',
        youTubeId: 'v_3F1Z4T_L8',
        start: 0,
        end: 8,
        layout: 'half',
        role: 'Spec edit by Lumetric Films',
        blurb: 'A spec brand edit for Urban Health.',
      },
    ],
  },
  {
    id: 'anime-edits',
    accent: '#fb7185',
    eyebrow: 'Anime Edits',
    title: 'Fast cut AMVs with kinetic motion.',
    blurb:
      'Beat synced anime edits built for speed and impact, with frame accurate cuts, effects, and color that hit on every transition.',
    videos: [
      {
        id: 'kda-huntrx-takedown',
        uploadDate: '2025-08-30',
        duration: 'PT1M',
        title: 'KDA x HUNTRX Takedown · AMV',
        youTubeId: 'dJO8ZvwvUNc',
        start: 34,
        end: 37,
        layout: 'half',
        role: 'Anime music video',
        blurb: 'A beat synced cut from the Takedown AMV.',
      },
      {
        id: 'dandadan-cortis-go',
        uploadDate: '2025-08-22',
        duration: 'PT38S',
        title: 'DanDaDan x CORTIS GO! · AMV',
        youTubeId: 'p_EW5UKRWFA',
        start: 0,
        end: 6,
        layout: 'half',
        role: 'Anime music video',
        blurb: 'A kinetic anime edit cut to the beat.',
      },
      {
        id: 'unlike-me-tai-lung',
        uploadDate: '2025-08-25',
        duration: 'PT26S',
        title: 'Unlike Me x Kung Fu Panda · Tai Lung',
        youTubeId: '98M4SbMTGo0',
        start: 0,
        end: 8,
        layout: 'half',
        role: 'Anime music video',
        blurb: 'A Tai Lung edit set to Unlike Me.',
      },
      {
        id: 'jjk-culling-games',
        uploadDate: '2026-04-03',
        duration: 'PT1M40S',
        title: 'JJK Culling Games Edit',
        youTubeId: 'lilTm918-es',
        start: 0,
        end: 8,
        layout: 'half',
        role: 'Anime music video',
        blurb: 'A Jujutsu Kaisen Culling Games edit.',
      },
    ],
  },
  {
    id: 'social-short-form',
    accent: '#6ee7b7',
    eyebrow: 'Social & Short Form',
    title: 'Scroll stopping edits made for social.',
    blurb:
      'Short form social content tuned for the feed, with punchy pacing and hooks designed to stop the scroll in the first second.',
    videos: [
      {
        id: 'throw-a-fit-tiktok',
        uploadDate: '2026-01-01',
        duration: 'PT58S',
        title: 'Throw a Fit · TikTok Edit',
        youTubeId: 'Ory6In4Iu7Q',
        start: 23,
        end: 30,
        layout: 'full',
        role: 'Edited by Lumetric Films',
        blurb: 'A short form social cut of Throw a Fit.',
      },
    ],
  },
];
