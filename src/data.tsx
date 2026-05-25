// ============================================================
// Data — packages, reviews, team, etc.
// All centralized so it's easy to swap with real content.
// ============================================================

const PACKAGES = [
  {
    id: "surf-stay",
    name: "Surf & Stay",
    tag: "Most popular",
    tagVariant: "solid-orange" as const,
    duration: "7 nights / 5 surf days",
    sub: "The full Ohana experience — bed, board and best peaks of the week.",
    image: "assets/images/pkg-surf-stay.jpg",
    features: [
      "Daily guided surf sessions (2x/day)",
      "All boards & wetsuits included",
      "Cozy room in the family house",
      "Breakfast, lunch & dinner",
      "Airport transfer from Agadir",
    ],
    priceFrom: 549,
    priceUnit: "/ week · per person",
    featured: true,
  },
  {
    id: "surf-yoga",
    name: "Surf & Yoga",
    tag: "Mind + body",
    tagVariant: "teal" as const,
    duration: "7 nights / 5 surf + 5 yoga",
    sub: "Move with the ocean by day, restore on the rooftop at sunset.",
    image: "assets/images/pkg-surf-yoga.jpg",
    features: [
      "Daily surf coaching",
      "Sunrise & sunset yoga on rooftop",
      "All equipment + mats provided",
      "Full board moroccan cuisine",
      "Hammam session included",
    ],
    priceFrom: 649,
    priceUnit: "/ week · per person",
    featured: false,
  },
  {
    id: "surf-pilates",
    name: "Surf & Pilates",
    tag: "Strength + surf",
    tagVariant: "orange" as const,
    duration: "7 nights / 5 surf + 5 pilates",
    sub: "Build the core, balance and shoulder strength surfing demands.",
    image: "assets/images/pkg-surf-pilates.jpg",
    features: [
      "Daily surf coaching",
      "Daily reformer-style pilates sessions",
      "Pre-surf mobility & post-surf recovery",
      "All equipment + mats provided",
      "Full board moroccan cuisine",
    ],
    priceFrom: 699,
    priceUnit: "/ week · per person",
    featured: false,
  },
  {
    id: "surf-only",
    name: "Surf Only",
    tag: "Day-trippers",
    tagVariant: "sand" as const,
    duration: "Per day or per session",
    sub: "Already have a place? Join our crew for guiding and coaching only.",
    image: "assets/images/pkg-surf-only.jpg",
    features: [
      "Choose 1 or 2 sessions per day",
      "Local guide to find your peak",
      "Video coaching available",
      "Board & wetsuit rental option",
      "Flexible — book per day",
    ],
    priceFrom: 30,
    priceUnit: "/ person · half day",
    priceFullDay: 40,
    featured: false,
  },
];

const REVIEWS = [
  {
    name: "Francesco",
    location: "Italy",
    level: "Intermediate",
    stars: 5,
    text: "We spent a week in Morocco with Yassin and his staff and immediately felt part of a family. If you are looking for a stress-free way to surf in Morocco, Ohana Surf is the one for you!",
  },
  {
    name: "Lena",
    location: "Berlin, Germany",
    level: "Beginner",
    stars: 5,
    text: "I had never stood on a board before. By day three, Yassin had me catching greens on my own. The house feels like home, the food is incredible — I'm already planning my return.",
  },
  {
    name: "Tom & Marie",
    location: "Lyon, France",
    level: "Advanced",
    stars: 5,
    text: "Yassin's local knowledge is gold. Every morning he reads the swell, picks the right spot, and we scored uncrowded waves all week. The dinners with the family are the cherry on top.",
  },
  {
    name: "Sofia",
    location: "Madrid, Spain",
    level: "Intermediate",
    stars: 5,
    text: "More than a surf camp — it's a community. Sunrise yoga, mint tea on the rooftop, and waves to ourselves. Genuine Moroccan hospitality from start to finish.",
  },
  {
    name: "Jake",
    location: "London, UK",
    level: "Beginner",
    stars: 5,
    text: "Booked three nights, extended to a full week. Honestly couldn't leave. The coaching is patient, the vibe is warm, and the location is unbeatable.",
  },
  {
    name: "Camille",
    location: "Montréal, Canada",
    level: "Intermediate",
    stars: 5,
    text: "I came solo and felt completely at home from day one. The Ohana family takes care of every detail — I just had to show up and surf.",
  },
];

const TEAM = [
  {
    name: "Yassin",
    role: "Founder · Head Coach",
    image: "assets/images/about-team-1.jpg",
    bio: "Pro surfer born and raised on these waves. Yassin runs Ohana the way he learned to surf — with patience, respect for the ocean, and a wide grin.",
  },
  {
    name: "Fatima",
    role: "Kitchen · House Mom",
    image: "assets/images/about-team-2.jpg",
    bio: "Yassin's mother. The reason every guest stays an extra night. Her tagines, harira and msemen rotate through the week and turn dinner into the highlight.",
  },
  {
    name: "Hassan",
    role: "Surf Guide · Driver",
    image: "assets/images/about-team-3.jpg",
    bio: "Knows every peak from Imsouane to Tamri. If the swell is good, Hassan has already loaded the boards and warmed up the van.",
  },
];

const DAY_AT_OHANA = [
  { time: "07:00", title: "Sunrise check", desc: "Coffee on the rooftop while we read the swell, wind and tide together." },
  { time: "08:30", title: "Morning session", desc: "First surf of the day — usually the cleanest. Two hours in the water with your coach." },
  { time: "11:30", title: "Brunch at the house", desc: "Eggs, fresh juice, msemen, fruit and Fatima's mint tea. Long table, loud laughter." },
  { time: "14:00", title: "Free time", desc: "Nap. Stretch. Surfboard repair. A walk to the village. The afternoon is yours." },
  { time: "16:30", title: "Sunset session", desc: "Back in the water for golden hour — most days the wind drops and waves glass off." },
  { time: "20:00", title: "Family dinner", desc: "Tagine, salads, stories from the day, and a sunset you'll keep talking about for years." },
];

const ROOMS = [
  {
    id: "shared-4",
    name: "Shared room of 4",
    sub: "Cozy dorm with four beds — the most social option.",
    capacity: "Up to 4 guests",
    image: "assets/images/room-shared-4.jpg",
  },
  {
    id: "small-inside",
    name: "Small inside room",
    sub: "Snug single nestled inside the house — quiet and cool.",
    capacity: "1 guest",
    image: "assets/images/room-small-inside.jpg",
  },
  {
    id: "twin",
    name: "Twin room",
    sub: "Two single beds — perfect for friends travelling together.",
    capacity: "2 guests",
    image: "assets/images/room-twin.jpg",
  },
  {
    id: "double-standard",
    name: "Standard double room",
    sub: "King bed, en-suite essentials, garden view.",
    capacity: "2 guests",
    image: "assets/images/room-double-standard.jpg",
  },
  {
    id: "double-balcony",
    name: "Double room with balcony",
    sub: "Our brightest room — private balcony with ocean breeze.",
    capacity: "2 guests",
    image: "assets/images/room-double-balcony.jpg",
  },
];

const FAQS = [
  {
    q: "Do I need to know how to surf?",
    a: "Not at all. Around 60% of our guests are first-timers. Yassin and the team coach every level — from your first push to advanced barrel positioning."
  },
  {
    q: "When is the best time to come?",
    a: "We surf year-round. September to April brings the cleanest, most consistent swells. May to August is warmer, with smaller, friendlier waves ideal for beginners."
  },
  {
    q: "What's included in the package?",
    a: "Accommodation, full-board Moroccan home cooking, twice-daily guided surf sessions, all equipment (board + wetsuit), airport pickup from Agadir, and tax. No hidden fees."
  },
  {
    q: "How do I get there?",
    a: "Fly into Agadir (AGA). It's a 25-minute drive to the house in Aourir — we pick you up at no extra charge. Marrakech (RAK) is also an option (3h drive)."
  },
  {
    q: "Can I come with friends or family?",
    a: "Absolutely — Ohana means family. We've hosted couples, solo travellers, groups of friends, and even small kids. Tell us who's coming and we'll fit you in."
  },
  {
    q: "Do you offer airport pickup?",
    a: "Yes, included from Agadir. Marrakech and Essaouira pickups are available on request for a small fee."
  },
];

Object.assign(window, { PACKAGES, REVIEWS, TEAM, DAY_AT_OHANA, ROOMS, FAQS });
