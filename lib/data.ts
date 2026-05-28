import type { Package, Review, TeamMember, DayItem, Room, FAQ, ActivityBlackout } from './types'

export const PACKAGES: Package[] = [
  {
    id: 'surf-stay',
    name: 'Surf & Stay',
    tag: 'Most popular',
    tagVariant: 'solid-orange',
    duration: '7 nights / 6 surf days',
    sub: 'The full Ohana experience — bed, board and best peaks of the week.',
    image: '/assets/images/pkg-surf-stay.jpg',
    features: [
      'Daily guided surf sessions (2x/day)',
      'Equipment and transfers to spots',
      'Full board moroccan cuisine',
      'Weekly surfskate session',
    ],
    priceFrom: 495,
    priceUnit: '/ week · per person',
    featured: true,
  },
  {
    id: 'surf-yoga',
    name: 'Surf & Yoga',
    tag: 'Mind + body',
    tagVariant: 'teal',
    duration: '7 nights / 6 surf + 6 yoga',
    sub: 'Move with the ocean by day, restore on the rooftop.',
    image: '/assets/images/pkg-surf-yoga.jpg',
    features: [
      'Daily guided surf sessions (2x/day)',
      'Equipment and transfers to spots',
      'Full board moroccan cuisine',
      'Weekly surfskate session',
      'Sunrise & sunset yoga on rooftop',
    ],
    priceFrom: 585,
    priceUnit: '/ week · per person',
    featured: false,
  },
  {
    id: 'surf-pilates',
    name: 'Surf & Pilates',
    tag: 'Strength + surf',
    tagVariant: 'orange',
    duration: '7 nights / 6 surf + 4 pilates',
    sub: 'Build the core, balance and shoulder strength surfing demands.',
    image: '/assets/images/pkg-surf-pilates.jpg',
    features: [
      'Daily guided surf sessions (2x/day)',
      'Equipment and transfers to spots',
      'Full board moroccan cuisine',
      'Weekly surfskate session',
      '4 Power-Pilates sessions',
    ],
    priceFrom: 575,
    priceUnit: '/ week · per person',
    featured: false,
  },
  {
    id: 'surf-only',
    name: 'Surf Only',
    tag: 'Day-trippers',
    tagVariant: 'sand',
    duration: 'Per day or per session',
    sub: 'Already have a place? Join our crew for guiding and coaching only.',
    image: '/assets/images/pkg-surf-only.jpg',
    features: [
      'Choose 1 or 2 sessions per day',
      'Local guide to find your peak',
      'Video analysis upon request',
      'Board & wetsuit included',
      'Flexible — book per day',
    ],
    priceFrom: 30,
    priceUnit: '/ person · half day',
    priceFullDay: 40,
    featured: false,
  },
]

export const REVIEWS: Review[] = [
  {
    name: 'Charmagne',
    location: 'Manchester, England',
    level: 'Beginner',
    stars: 5,
    text: 'I spent a week with Ohana Surf and honestly enjoyed every moment. I felt welcomed right from the start, everyone is so kind and the food is incredible. I had never surfed before,  the instructors were very patient and by the end of my first session I was stood up surfing by myself. The pilates classes are amazing and there is lots of other activities and adventures to be part of. Im so grateful for the time I spent here and will be going back asap! 🌞🏄🏽‍♀️',
  },
  {
    name: 'Estelle',
    location: 'Paris, France',
    level: 'Beginner',
    stars: 5,
    text: "A timeless week at Ohana ❤️🌊 I arrived on my own and felt right at home from day one. The entire team is wonderful, always there to encourage us in the water and help us improve, in a super warm and supportive atmosphere and always with a smile 🏄‍♀️ Between the surf sessions, the incredible meals, and the lovely people I met, everything came together for an unforgettable holiday ☀️ From the bottom of my heart, thank you to the whole Ohana family for your hospitality and kindness — I will be back with great pleasure ✨",
  },
  {
    name: 'Lea',
    location: 'Germany',
    level: 'Beginner',
    stars: 5,
    text: "I had a great time at the surf camp! What I particularly loved was that the surf lessons were very personalised — a maximum of three people per instructor, so you could really learn a lot and see your progress. The team was also incredibly friendly and flexible; they took us to different beaches depending on the conditions, based on your level and the quality of the waves. That way, you could make the most of the waves every single day. Overall a fantastic experience, highly recommended! 🌊🏄‍♀️",
  },
  {
    name: 'Suzanne',
    location: 'Normandie, France',
    level: 'Advanced',
    stars: 5,
    text: 'The place is lovely — the food and accommodation are excellent! Take advantage of the Ohana team expertise to always be at the right spot at the right time 🏄‍♀️ Thank you for the stay',
  },
  {
    name: 'Sandy',
    location: 'Nantes, France',
    level: 'Intermediate',
    stars: 5,
    text: "I have stayed at Ohana Surf Camp twice now and both trips were awesome. Friendly team, great coaching, and a super relaxed vibe on and off the water. I had a lot of fun, and met lovely people. Can’t wait to come back—highly recommend!",
  },
  {
    name: 'Tatyana',
    location: 'Poland',
    level: 'Beginner',
    stars: 5,
    text: '100/100 for the atmosphere and organization! I felt at home — everything is comfortable. The instructors are very patient and really helped me the hang of the board. And the foooood… wow, also 100/100! My first time on a board was not great, but Ohana showed me that surfing can actually be a lot of fun. Now it is not just a dream, it is a goal. I will definitely be back!',
  },
]

export const TEAM: TeamMember[] = [
  {
    name: 'Yassin',
    role: 'Founder · Head Coach',
    image: '/assets/images/about-team-1.jpg',
    bio: 'Born and raised on the Moroccan coast, Yassin built Ohana from the ground up six years ago. Widely considered one of the best surf coaches of the coast, he reads waves the way most people read a room.',
  },
  {
    name: 'Hicham',
    role: 'Surf Instructor',
    image: '/assets/images/about-team-2.jpg',
    bio: "Always the first to make you laugh and the last to let you give up. Hicham brings a energy to every session that makes progress feel less like hard work and more like a good time.",
  },
  {
    name: 'Aymen',
    role: 'Surf Instructor',
    image: '/assets/images/about-team-3.jpg',
    bio: 'The quiet force. Calm, steady, and instinctively knowing which wave is yours before you do. With Aymen in the water, you will feel safe, confident, and surfing better than you thought you could.',
  },
]

export const DAY_AT_OHANA: DayItem[] = [
  { time: '09:00', title: 'Rooftop breakfast', desc: 'Mint tea, msemen, amlou, eggs and fruit. Fatma sets the tone.' },
  { time: '10:30', title: 'In the water', desc: 'Surf coaching with Yassin, in spots picked on the day to match conditions and your level.' },
  { time: '13:00', title: 'Beach lunch', desc: 'Homemade, fresh, eaten on the sand. Earning it makes it taste better.' },
  { time: '14:00', title: 'Your call', desc: 'Back in the water to apply the morning tips — or a nap on the beach.' },
  { time: '16:30', title: 'Tea & chill', desc: 'Mint tea, good company, afternoon light. Yoga and pilates available if your body wants more.' },
  { time: '20:00', title: 'Family dinner', desc: 'A homemade meal to fuel tomorrow\'s session. Tagines, fresh salads, good company' },
]

// ── ROOM PRICING ───────────────────────────────────────────────────────────────
// pricingType 'flat'    → nightlyRate is the price for the whole room per night
//                         (1 to maxPax guests share it — room cost stays the same)
// pricingType 'per-bed' → nightlyRate is charged per person per night
//
// Update nightlyRate here when room prices change. maxPax is the hard cap shown
// as a warning in the price simulator if guests exceed it.
export const ROOMS: Room[] = [
  {
    id: 'shared-4',
    name: 'Shared room of 4',
    sub: 'Cozy dorm with four beds — the most social option.',
    capacity: 'Up to 4 guests',
    image: '/assets/images/room-shared-4.jpg',
    maxPax: 4,
    pricingType: 'per-bed',
    nightlyRate: 15,
  },
  {
    id: 'small-inside',
    name: 'Small inside room',
    sub: 'Snug single nestled inside the house — quiet and cool.',
    capacity: '1 guest',
    image: '/assets/images/room-small-inside.jpg',
    maxPax: 1,
    pricingType: 'flat',
    nightlyRate: 25,
  },
  {
    id: 'twin',
    name: 'Twin room',
    sub: 'Two single beds — perfect for friends travelling together.',
    capacity: '2 guests',
    image: '/assets/images/room-twin.jpg',
    maxPax: 2,
    pricingType: 'flat',
    nightlyRate: 35,
  },
  {
    id: 'double-standard',
    name: 'Standard double room',
    sub: 'Queen size bed, quiet atmosphere in our 1st floor.',
    capacity: '2 guests',
    image: '/assets/images/room-double-standard.jpg',
    maxPax: 2,
    pricingType: 'flat',
    nightlyRate: 35,
  },
  {
    id: 'double-balcony',
    name: 'Double room with balcony',
    sub: 'Our brightest room — Queen size bed, private balcony with ocean breeze.',
    capacity: '2 guests',
    image: '/assets/images/room-double-balcony.jpg',
    maxPax: 2,
    pricingType: 'flat',
    nightlyRate: 40,
  },
]

// ── MEAL PRICE ─────────────────────────────────────────────────────────────────
// Price per meal per person. The simulator counts 3 meals/day (breakfast, lunch,
// dinner) for every night of the stay. Change this one number to update all meals.
export const MEAL_PRICE_PER_MEAL = 7

// ── ACTIVITY PRICES ────────────────────────────────────────────────────────────
// Cost per activity session per person. Used together with PACKAGE_ACTIVITIES below.
// Update individual values here when session pricing changes.
export const ACTIVITY_PRICES = {
  surf: 40,  // € per session per person
  yoga: 15,
  pilates: 20,
}

// ── PACKAGE ACTIVITY SESSIONS ──────────────────────────────────────────────────
// Number of activity sessions included per 7-night stay for each package.
// The simulator pro-rates these for stays of any length (e.g. 3 nights = 3/7 of a week).
// Keys must match package IDs in PACKAGES. Surf Only is handled separately.
// Update these when the package schedule changes.
export const PACKAGE_ACTIVITIES: Record<string, Partial<Record<keyof typeof ACTIVITY_PRICES, number>>> = {
  'surf-stay':    { surf: 6 },          
  'surf-yoga':    { surf: 6, yoga: 6 },
  'surf-pilates': { surf: 6, pilates: 6 },
}

// ── RETURNING GUEST DISCOUNT ───────────────────────────────────────────────────
// Fraction deducted from the total when the guest checks "returning guest".
// 0.10 = 10% off. Change the number here — the simulator picks it up automatically.
export const RETURNING_GUEST_DISCOUNT = 0.10

// ── ACTIVITY BLACKOUTS ─────────────────────────────────────────────────────────
// Add an entry when a vendor (Pilates, Yoga) is unavailable for a date range.
// The simulator shows a polite warning — it does NOT block the booking.
// Format: { activity: 'pilates' | 'yoga', from: 'YYYY-MM-DD', to: 'YYYY-MM-DD', note?: string }
// Example: { activity: 'pilates', from: '2026-08-04', to: '2026-08-11', note: 'Instructor away' }
export const ACTIVITY_BLACKOUTS: ActivityBlackout[] = []

// ── ADD-ON PRICES ──────────────────────────────────────────────────────────────
// Prices displayed in the Add-Ons section. All values in euros.
// Units are informational only — update the corresponding label in AddOns if you
// change the pricing structure (e.g. switching from per-way to per-person).
export const ADDON_PRICES = {
  pickup_bus:      15,  // € per way
  pickup_airport:  30,  // € per way
  yoga_group:      15,  // € per person per session
  yoga_private:    20,  // € per session (private)
  surf_trip:       50,  // € per person
  souk:            30,  // € per taxi
  paradise_valley: 30,  // € per person
  sand_dunes:      30,  // € per person
  hammam:          55,  // € per session
}

export const FAQS: FAQ[] = [
  {
    q: 'Do you offer different levels of surf coaching?',
    a: 'Yes — every guest is assessed on arrival so we can match them to the right group and the right spots. Whether you\'ve never touched a surfboard or you\'re working on your turns, Yassin and the team will coach you at your level. No one gets left behind, and no one gets held back.',
  },
  {
    q: 'What is the payment process?',
    a: 'A 20% deposit is required to confirm your booking — we\'ll send you a payment link once your dates are set. The remaining balance is paid on arrival, either in MAD or EUR. No hidden fees, no surprises.',
  },
  {
    q: "When is the best time to come?",
    a: 'Morocco has surf year-round, which is one of the reasons we love it here. The peak surf season runs from October to April, when Atlantic swells are at their most consistent and powerful. Summer is quieter in the water, warmer on the beach, and perfect for beginners. Honestly, there\'s no bad time — it just depends what you\'re after.',
  },
  {
    q: 'Do I need a visa to enter Morocco?',
    a: 'Citizens of most European countries, the US, UK, and Canada do not need a visa for stays under 90 days. That said, entry requirements can change — always check with your country\'s official travel advisory before booking.',
  },
  {
    q: 'How do I get to Ohana Surf Morocco?',
    a: "The closest airport is Agadir Al Massira, about 45 minutes away. You can also fly into Essaouira or Marrakech if that works better for your route. From any of these airports or places around Agadir, we can arrange a taxi transfer directly to the camp — just let us know in advance.",
  },
  {
    q: 'Do you offer airport pick-up?',
    a: 'Yes — transfers can be arranged from Agadir, Essaouira or Marrakech airports as an add-on. We organise a shared taxi that fits up to 6 people, so the cost gets divided between everyone in the vehicle. It\'s the easiest way to arrive without any stress. Get in touch when booking and we\'ll sort it out.',
  },
]
