// All service pricing, grouped into the tabs of the unified Pricing section.
// One complimentary revision is included with every package and extra
// revisions are $50 each — that lives in INCLUDED_NOTE instead of being
// repeated on every card. `fine` keeps only package-specific terms.
import { Camera, Clapperboard, Clock, ImagePlus, RotateCcw, Scissors, Smartphone, Zap } from 'lucide-react';

export const INCLUDED_NOTE =
  'One complimentary revision is included with every package · Additional revisions $50 each';

const videoAddons = [
  {
    name: 'Rush Delivery',
    price: '$100',
    description: 'Need it sooner? Rush turnaround is available for qualifying projects.',
    icon: Zap,
  },
  {
    name: 'Additional Filming',
    price: '$75 / hour',
    description: 'For coverage beyond the hours included in your selected package.',
    icon: Clock,
  },
  {
    name: 'Additional Revisions',
    price: '$50 each',
    description: 'One revision is included with every service. Extra rounds are billed per round.',
    icon: RotateCcw,
  },
];

const photoAddons = [
  {
    name: 'Extra Session Time',
    price: '$75 / hour',
    description: 'Need more coverage? Extra time can be added based on availability.',
    icon: Clock,
  },
  {
    name: 'Additional Edited Images',
    price: 'From $10 each',
    description: 'Choose more images from your gallery to receive professional editing.',
    icon: ImagePlus,
  },
  {
    name: 'Rush Delivery',
    price: '$100',
    description: 'Receive your finished gallery sooner with expedited editing.',
    icon: Zap,
  },
  {
    name: 'Additional Revisions',
    price: '$50',
    description: 'One revision is included with every session. Extra revisions on request.',
    icon: RotateCcw,
  },
];

export const pricingTabs = [
  {
    id: 'production',
    label: 'Video Production',
    icon: Clapperboard,
    blurb: 'Full coverage, from on-site filming to a finished, polished cut.',
    cols: 'lg:grid-cols-2',
    cta: 'Book This Package',
    addons: videoAddons,
    plans: [
      {
        name: 'Basic Production',
        price: '$350',
        tagline:
          'Perfect for social media content, interviews, event highlights, and promotional videos.',
        features: [
          'Up to 2 hours of on-site filming',
          'Professional video editing',
          'Final video up to 2 minutes',
          'Basic color correction',
          'Music integration (provided or royalty-free)',
          'Simple text and title graphics',
          'Delivery in your preferred format',
        ],
        fine: 'Extra filming $75 per hour',
      },
      {
        name: 'Standard Production',
        price: '$500',
        popular: true,
        tagline:
          'Ideal for businesses, organizations, and creators who want a more polished, comprehensive video.',
        features: [
          'Up to 4 hours of on-site filming',
          'Professional video editing',
          'Final video up to 5 minutes',
          'Enhanced color grading',
          'Audio balancing and cleanup',
          'Motion graphics and custom text elements',
          'Music integration',
          'Delivery in your preferred format',
        ],
        fine: 'Extra filming $75 per hour',
      },
    ],
  },
  {
    id: 'editing',
    label: 'Editing',
    icon: Scissors,
    blurb: 'Already have footage? We turn your raw clips into engaging, finished content.',
    cols: 'lg:grid-cols-2',
    cta: 'Book This Package',
    addons: videoAddons,
    plans: [
      {
        name: 'Basic Editing',
        price: '$150',
        tagline: 'Best for straightforward edits that need clean cuts and simple enhancements.',
        features: [
          'Final video up to 3 minutes',
          'Cutting and arrangement of your footage',
          'Basic transitions',
          'Music synchronization',
          'Simple titles and text overlays',
          'Export optimized for your platform',
        ],
      },
      {
        name: 'Advanced Editing',
        price: '$350',
        popular: true,
        tagline:
          'For YouTube creators and businesses who want a dynamic, polished final product.',
        features: [
          'Final video up to 10 minutes',
          'Advanced editing techniques and pacing',
          'Color correction and grading',
          'Audio enhancement and balancing',
          'Motion graphics and animated text',
          'B-roll integration',
          'Platform-specific export settings',
        ],
      },
    ],
  },
  {
    id: 'short-form',
    label: 'Short-Form',
    icon: Smartphone,
    blurb: "Vertical content built to capture attention on today's leading platforms.",
    cols: 'lg:grid-cols-3',
    cta: 'Book This Package',
    addons: videoAddons,
    plans: [
      {
        name: 'Single Short Edit',
        price: '$100',
        tagline: 'Perfect for creators and businesses keeping a consistent online presence.',
        features: [
          'One short video up to 60 seconds',
          'Editing optimized for audience retention',
          'Captions and subtitles',
          'Sound synchronization',
          'Vertical format for TikTok, Reels, and Shorts',
        ],
      },
      {
        name: 'Short-Form Bundle',
        price: '$250',
        cadence: 'for 3 videos',
        tagline: 'A cost-effective option for clients who need several pieces of content at once.',
        features: [
          'Three professionally edited short videos',
          'Captions and subtitles included',
          'Optimized for TikTok, Reels, and Shorts',
          'Consistent editing style across all videos',
          'One complimentary revision per video',
        ],
      },
      {
        name: 'Monthly Creator',
        price: '$500',
        cadence: 'per month',
        popular: true,
        tagline: 'A recurring solution for creators and businesses committed to steady growth.',
        features: [
          'Five short videos every month',
          'Priority scheduling and turnaround',
          'Captions and subtitles included',
          'Optimized for TikTok, Reels, and Shorts',
          'Consistent branding and editing style',
          'One complimentary revision per video',
        ],
      },
    ],
  },
  {
    id: 'photography',
    label: 'Photography',
    icon: Camera,
    blurb:
      'Milestones, portraits, and events, captured with professional editing on every image.',
    cols: 'lg:grid-cols-3',
    cta: 'Book a Session',
    addons: photoAddons,
    plans: [
      {
        name: 'Creative Portrait Session',
        price: '$300',
        popular: true,
        tagline:
          'Personal branding, artistic concepts, lifestyle portraits, birthdays, and social content.',
        features: [
          'Up to 2 hours of coverage',
          'One to two nearby locations',
          'Multiple outfit changes',
          'Creative direction and posing assistance',
          '20 professionally edited high-resolution images',
          'Online gallery delivery',
        ],
        fine: 'Additional edited images $10 each',
      },
      {
        name: 'Graduation Session',
        price: '$250',
        tagline:
          'Celebrate your accomplishments with a personalized session built around this milestone.',
        features: [
          'Up to 1.5 hours of coverage',
          'One location of your choice',
          'Unlimited outfit changes within your session',
          '15 professionally edited high-resolution images',
          'Online gallery to view and download',
        ],
        fine: 'Additional edited images $10 each',
      },
      {
        name: 'Event Coverage',
        price: 'From $200',
        cadence: 'per hour',
        tagline:
          'Celebrations, community events, and corporate gatherings, captured as they happen.',
        features: [
          'Professional event coverage',
          'Candid and posed photographs',
          'Professionally edited online gallery',
          'About 40 to 60 edited images per hour',
        ],
        fine: 'Starting rate · 2 hour minimum booking',
      },
      {
        name: 'Professional Headshots',
        price: '$175',
        tagline: 'Clean, polished portraits for LinkedIn, business websites, and professional use.',
        features: [
          'Up to 45 minutes of coverage',
          'One outfit change',
          '5 professionally edited high-resolution images',
          'Online gallery delivery',
        ],
        fine: 'Additional edited images $15 each',
      },
      {
        name: 'Mini Session',
        price: '$150',
        tagline: 'A shorter, budget-friendly option for individuals, couples, or seasonal portraits.',
        features: [
          'Up to 30 minutes of coverage',
          'One location',
          '8 professionally edited high-resolution images',
          'Online gallery delivery',
        ],
        fine: 'Additional edited images $10 each',
      },
    ],
  },
];
