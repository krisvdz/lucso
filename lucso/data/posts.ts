import { FeedPost } from '@/types';

export const posts: FeedPost[] = [
  {
    id: 'post1',
    userId: 'u2',
    userName: 'Ana M.',
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=600&h=400&fit=crop',
    caption: 'Just tried the new Rare Beauty Soft Pinch Blush and I\'m absolutely obsessed! The shade Joy gives the most natural flush. A tiny dot is all you need!',
    likes: 124,
    comments: [
      { id: 'c1', userId: 'u3', userName: 'Sofia L.', text: 'Joy is so gorgeous! Have you tried Happy? It\'s my fave!', createdAt: '2026-01-15T11:30:00Z' },
      { id: 'c2', userId: 'u4', userName: 'Maria C.', text: 'I need to try this! Where did you get it?', createdAt: '2026-01-15T12:00:00Z' },
    ],
    createdAt: '2026-01-15T10:00:00Z',
    tags: ['rarebeauty', 'blush', 'motd'],
    gradientColors: ['#F5B5C8', '#E88DA6'],
  },
  {
    id: 'post2',
    userId: 'u3',
    userName: 'Sofia L.',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=400&fit=crop',
    caption: 'My everyday makeup routine takes only 10 minutes! Foundation, concealer, blush, mascara, lip gloss - done. Keeping it simple but glam.',
    likes: 89,
    comments: [
      { id: 'c3', userId: 'u2', userName: 'Ana M.', text: 'Love a quick routine! What foundation do you use?', createdAt: '2026-01-14T15:20:00Z' },
    ],
    createdAt: '2026-01-14T14:30:00Z',
    tags: ['makeuprutine', 'everyday', 'natural'],
    gradientColors: ['#F0DCC8', '#E8C8A8'],
  },
  {
    id: 'post3',
    userId: 'u4',
    userName: 'Maria C.',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&h=400&fit=crop',
    caption: 'Sephora haul! Got the Charlotte Tilbury Pillow Talk, Fenty Gloss Bomb, and the e.l.f. Power Grip Primer. My wallet is crying but my face is happy.',
    likes: 203,
    comments: [
      { id: 'c4', userId: 'u3', userName: 'Sofia L.', text: 'The Power Grip Primer is SO good for the price!', createdAt: '2026-01-13T17:00:00Z' },
      { id: 'c5', userId: 'u2', userName: 'Ana M.', text: 'Pillow Talk is a must-have! You\'ll love it!', createdAt: '2026-01-13T17:30:00Z' },
    ],
    createdAt: '2026-01-13T16:00:00Z',
    tags: ['sephorahaul', 'newmakeup', 'haul'],
    gradientColors: ['#D4A574', '#C49060'],
  },
  {
    id: 'post4',
    userId: 'u2',
    userName: 'Ana M.',
    image: 'https://images.unsplash.com/photo-1583241800698-e8ab01830a07?w=600&h=400&fit=crop',
    caption: 'Red lip appreciation post! MAC Ruby Woo will forever be THAT lipstick. Nothing beats a classic red lip for date night.',
    likes: 167,
    comments: [
      { id: 'c7', userId: 'u4', userName: 'Maria C.', text: 'Ruby Woo is iconic! Have you tried the Retro Matte formula?', createdAt: '2026-01-12T20:00:00Z' },
    ],
    createdAt: '2026-01-12T19:00:00Z',
    tags: ['redlip', 'mac', 'datenight'],
    gradientColors: ['#C23B22', '#A83020'],
  },
];
