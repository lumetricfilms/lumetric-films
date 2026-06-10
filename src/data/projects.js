export const videoProjects = [
  {
    title: 'Featured Reel',
    category: 'Reel',
    year: '2026',
    role: 'Filmed and edited by Lumetric Films',
    platform: 'youtube',
    videoId: 'VIDEO_ID_HERE',
    fileId: '',
    thumbnail: '',
    featured: true,
    workType: 'reel',
    description: 'A cinematic sample reel placeholder for Lumetric Films.',
  },
  {
    title: 'Music Video Project',
    category: 'Music Video',
    year: '2026',
    role: 'Shot and edited by Lumetric Films',
    platform: 'youtube',
    videoId: 'VIDEO_ID_HERE',
    fileId: '',
    thumbnail: '',
    featured: false,
    workType: 'musicVideos',
    description: 'A placeholder music video project with performance and story-driven coverage.',
  },
  {
    title: 'Client Review Cut',
    category: 'Short Form Edit',
    year: '2026',
    role: 'Edited by Lumetric Films',
    platform: 'drive',
    videoId: '',
    fileId: 'GOOGLE_DRIVE_FILE_ID_HERE',
    thumbnail: '',
    featured: false,
    workType: 'shortFormEdits',
    description: 'A placeholder Google Drive preview embed for a short-form client review cut.',
  },
  {
    title: 'Short Form Viral Edit',
    category: 'Short Form Edit',
    year: '2026',
    role: 'Edited by Lumetric Films',
    platform: 'youtube',
    videoId: 'VIDEO_ID_HERE',
    fileId: '',
    thumbnail: '',
    featured: false,
    workType: 'shortFormEdits',
    description: 'A placeholder short-form edit for social, reels, and fast-moving campaigns.',
  },
];

// Real photography from recent sets. Files live in public/photography/ and are
// served from the site root, so each value is a CSS url() the gallery applies as
// a cover background.
export const galleryImages = [
  {
    title: 'Under the Lights',
    category: 'Portrait',
    image: "url('/photography/lumetric-1.jpg')",
  },
  {
    title: 'Warm Glow',
    category: 'Portrait',
    image: "url('/photography/lumetric-2.jpg')",
  },
  {
    title: 'Evening Profile',
    category: 'Editorial',
    image: "url('/photography/lumetric-3.jpg')",
  },
  {
    title: 'Autumn Light',
    category: 'Portrait',
    image: "url('/photography/lumetric-4.jpg')",
  },
];
