// Live preview portfolio data.
//
//   layout: 'full' renders a full width feature tile.
//   layout: 'half' renders a two column tile (pairs sit side by side).
//   start / end are in seconds and define the silent looping preview segment.
//   youTubeId is the video id used for the looping preview; clicking always
//   opens the full video from the beginning.

export const showcaseSections = [
  {
    id: 'live-performances',
    accent: '#67e8f9',
    eyebrow: 'Live Performances',
    title: 'Stage shows, captured with cinematic energy.',
    blurb:
      'From packed auditoriums to intimate recitals, we cover live performance with a multi camera eye for motion, light, and the moment a room holds its breath.',
    videos: [
      {
        id: 'bda-winter-show',
        title: 'Bronx Dance Academy Winter Show',
        youTubeId: '5DKvqLB0xac',
        start: 1953,
        end: 1964,
        layout: 'full',
        role: 'Filmed and edited by Lumetric Films',
        blurb: 'A look inside the Bronx Dance Academy winter show.',
      },
      {
        id: 'mmcc-bda-show',
        title: 'Afterschool Showcase · Bronx Dance Academy at MMCC',
        youTubeId: 'Hgbmk5nZAcI',
        start: 2003,
        end: 2011,
        layout: 'half',
        role: 'Filmed and edited by Lumetric Films · 2026',
        blurb: 'Highlights from the MMCC afterschool BDA showcase.',
      },
      {
        id: 'roots-of-resilience',
        title: 'Roots of Resilience · Bronx Dance Academy × P.S. 41',
        youTubeId: 's5fXuhxh-0c',
        start: 2534,
        end: 2546,
        layout: 'half',
        role: 'Filmed and edited by Lumetric Films · 2026',
        blurb: 'Roots of Resilience, the 2026 BDA and P.S. 41 MMCC show.',
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
        title: 'Puri · Paralyzed',
        youTubeId: 'TzZoL2re2Nk',
        start: 87,
        end: 97,
        layout: 'half',
        role: 'Official Music Video',
        blurb: 'A moment from the official video for Paralyzed.',
      },
      {
        id: 'puri-numb',
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
