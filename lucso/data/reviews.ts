import { Review } from '@/types';

export const reviews: Review[] = [
  // Pillow Talk
  { id: 'r1', productId: 'p1', userId: 'u2', userName: 'Ana M.', rating: 5, text: 'Absolutely love this shade! It\'s the perfect everyday nude pink. Goes with everything.', date: '2025-12-15', helpful: 34 },
  { id: 'r2', productId: 'p1', userId: 'u3', userName: 'Sofia L.', rating: 5, text: 'Worth every penny. The formula is so creamy and lasts for hours without drying out my lips.', date: '2025-11-28', helpful: 22 },
  { id: 'r3', productId: 'p1', userId: 'u4', userName: 'Maria C.', rating: 4, text: 'Beautiful color but I wish it lasted a bit longer after eating. Still my go-to lipstick!', date: '2025-10-05', helpful: 15 },

  // Soft Pinch Blush
  { id: 'r4', productId: 'p3', userId: 'u2', userName: 'Ana M.', rating: 5, text: 'A tiny dot goes SO far. The most natural-looking blush I\'ve ever used. Joy is my favorite shade.', date: '2025-12-20', helpful: 45 },
  { id: 'r5', productId: 'p3', userId: 'u4', userName: 'Maria C.', rating: 5, text: 'This blush literally changed my makeup routine. So easy to blend and lasts all day!', date: '2025-11-10', helpful: 38 },
  { id: 'r6', productId: 'p3', userId: 'u3', userName: 'Sofia L.', rating: 4, text: 'Love the formula but be careful - a little really does go a long way. I looked like a clown the first time!', date: '2025-09-22', helpful: 52 },

  // Ruby Woo
  { id: 'r7', productId: 'p5', userId: 'u3', userName: 'Sofia L.', rating: 5, text: 'THE red lipstick. No other red compares. Perfect for special occasions.', date: '2025-12-01', helpful: 28 },
  { id: 'r8', productId: 'p5', userId: 'u2', userName: 'Ana M.', rating: 4, text: 'Iconic shade but the matte formula can be drying. Use lip balm underneath!', date: '2025-10-18', helpful: 19 },

  // Lash Sensational
  { id: 'r9', productId: 'p7', userId: 'u4', userName: 'Maria C.', rating: 5, text: 'Best drugstore mascara EVER. Gives amazing volume and length without clumps.', date: '2025-12-10', helpful: 67 },
  { id: 'r10', productId: 'p7', userId: 'u2', userName: 'Ana M.', rating: 4, text: 'Great mascara for the price! Doesn\'t smudge on me which is a huge plus.', date: '2025-11-05', helpful: 31 },

  // Orgasm Blush
  { id: 'r11', productId: 'p9', userId: 'u3', userName: 'Sofia L.', rating: 5, text: 'The golden shimmer is just *chef\'s kiss*. Makes me look like I actually get sunlight.', date: '2025-12-22', helpful: 41 },
  { id: 'r12', productId: 'p9', userId: 'u4', userName: 'Maria C.', rating: 5, text: 'A classic for a reason. I\'ve been using this for years and it never disappoints.', date: '2025-11-15', helpful: 25 },

  // Gloss Bomb
  { id: 'r13', productId: 'p13', userId: 'u2', userName: 'Ana M.', rating: 5, text: 'Fenty Glow is the most beautiful gloss shade. Not sticky at all and smells amazing!', date: '2025-12-18', helpful: 56 },
  { id: 'r14', productId: 'p13', userId: 'u3', userName: 'Sofia L.', rating: 4, text: 'Love the shine but wish it lasted longer. I find myself reapplying every 2 hours.', date: '2025-10-30', helpful: 20 },

  // Power Grip Primer
  { id: 'r15', productId: 'p15', userId: 'u4', userName: 'Maria C.', rating: 5, text: 'This primer makes my makeup last ALL DAY. And it\'s only $10?! Unreal value.', date: '2025-12-05', helpful: 89 },
  { id: 'r16', productId: 'p15', userId: 'u2', userName: 'Ana M.', rating: 4, text: 'Great primer! The tacky feeling takes getting used to but it really holds everything in place.', date: '2025-11-20', helpful: 44 },

  // Flawless Filter
  { id: 'r17', productId: 'p2', userId: 'u3', userName: 'Sofia L.', rating: 5, text: 'This is literally liquid magic. My skin has never looked so good. Worth every cent!', date: '2025-12-25', helpful: 62 },
  { id: 'r18', productId: 'p2', userId: 'u4', userName: 'Maria C.', rating: 5, text: 'I wear it alone on no-makeup days and it makes my skin look flawless. Obsessed!', date: '2025-11-30', helpful: 48 },
];
