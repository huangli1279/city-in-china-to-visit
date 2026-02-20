export interface CityScores {
  history: number;        // History Appetite (0–100)
  natureUrban: number;    // Nature vs Urban (0=nature, 100=urban)
  culturalComfort: number; // Cultural Comfort / immersion (0=western comfort, 100=full local)
  activityLevel: number;  // Activity Level (0=slow, 100=packed)
  socialVibe: number;     // Social Vibe (0=quiet, 100=buzzing)
  adventure: number;      // Adventure Appetite (0=tourist trail, 100=off-beaten-path)
}

export interface City {
  id: string;
  name: string;
  label: string;
  emoji: string;
  tagline: string;
  description: string;
  bestTime: string;
  budgetRange: string;
  scores: CityScores;
}

export const cities: City[] = [
  {
    id: "shanghai",
    name: "Shanghai",
    label: "The Cosmopolitan",
    emoji: "🌆",
    tagline: "Where East meets West at full speed.",
    description:
      "Neon-lit skyline meets century-old shikumen lanes. You'll sip cocktails in Art Deco jazz bars, then lose yourself in avant-garde galleries and Michelin-starred restaurants. Shanghai rewards those who want it all — and fast.",
    bestTime: "Mar–May / Sep–Nov",
    budgetRange: "$80–150/day",
    scores: {
      history: 30,
      natureUrban: 90,
      culturalComfort: 25,
      activityLevel: 75,
      socialVibe: 90,
      adventure: 30,
    },
  },
  {
    id: "beijing",
    name: "Beijing",
    label: "The Imperial",
    emoji: "🏛️",
    tagline: "Where empires left their mark.",
    description:
      "Five thousand years of empire stare back at you from every corner. You'll stand where emperors once walked, cycle along the ancient hutong alleys, and feel the weight of history in every stone. This is China at its most monumental.",
    bestTime: "Apr–May / Sep–Oct",
    budgetRange: "$60–120/day",
    scores: {
      history: 85,
      natureUrban: 70,
      culturalComfort: 45,
      activityLevel: 75,
      socialVibe: 65,
      adventure: 45,
    },
  },
  {
    id: "xian",
    name: "Xi'an",
    label: "The Ancient",
    emoji: "🏯",
    tagline: "Where history literally surrounds you.",
    description:
      "Still inside the world's best-preserved ancient city walls. You'll stand face-to-face with 8,000 terracotta warriors, feast in the Muslim Quarter night market, and feel the Silk Road pulse beneath your feet.",
    bestTime: "Mar–May / Sep–Nov",
    budgetRange: "$40–80/day",
    scores: {
      history: 95,
      natureUrban: 55,
      culturalComfort: 65,
      activityLevel: 60,
      socialVibe: 55,
      adventure: 50,
    },
  },
  {
    id: "chengdu",
    name: "Chengdu",
    label: "The Unbothered",
    emoji: "🐼",
    tagline: "Where life moves at the perfect pace.",
    description:
      "Pandas, hot pot, and zero urgency — Chengdu operates on its own time. You'll spend mornings at the panda sanctuary, afternoons in a teahouse watching the world go by, and evenings melting into a spicy communal hot pot.",
    bestTime: "Mar–Jun / Sep–Nov",
    budgetRange: "$35–70/day",
    scores: {
      history: 45,
      natureUrban: 45,
      culturalComfort: 55,
      activityLevel: 35,
      socialVibe: 80,
      adventure: 40,
    },
  },
  {
    id: "guilin",
    name: "Guilin",
    label: "The Dreamscape",
    emoji: "⛰️",
    tagline: "Where landscapes look like paintings.",
    description:
      "Every view here looks like a classical ink painting come to life. You'll cruise the Li River between surreal karst peaks, bicycle through terraced rice fields, and wake up to mist rising over the mountains.",
    bestTime: "Apr–May / Sep–Oct",
    budgetRange: "$35–65/day",
    scores: {
      history: 25,
      natureUrban: 10,
      culturalComfort: 50,
      activityLevel: 45,
      socialVibe: 30,
      adventure: 55,
    },
  },
  {
    id: "dali",
    name: "Dali",
    label: "The Free Spirit",
    emoji: "🌊",
    tagline: "Where free spirits find their people.",
    description:
      "Dali is where travelers who never quite fit in, fit right in. You'll wander marble alleys lined with indie cafés, watch local Bai ceremonies, and swim in the turquoise Erhai Lake with snow-capped mountains on the horizon.",
    bestTime: "Mar–May / Sep–Nov",
    budgetRange: "$30–60/day",
    scores: {
      history: 40,
      natureUrban: 20,
      culturalComfort: 80,
      activityLevel: 30,
      socialVibe: 50,
      adventure: 75,
    },
  },
  {
    id: "xiamen",
    name: "Xiamen",
    label: "The Coastal Charmer",
    emoji: "🏝️",
    tagline: "Where coastal charm meets easy living.",
    description:
      "Piano Island, bougainvillea-draped colonial lanes, the best seafood you've ever had. You'll stroll the car-free Gulangyu island, photograph pastel European architecture, and end the day watching the sunset over the strait.",
    bestTime: "Oct–Apr",
    budgetRange: "$40–75/day",
    scores: {
      history: 55,
      natureUrban: 35,
      culturalComfort: 35,
      activityLevel: 40,
      socialVibe: 55,
      adventure: 35,
    },
  },
  {
    id: "zhangjiajie",
    name: "Zhangjiajie",
    label: "The Avatar Mountains",
    emoji: "🌿",
    tagline: "Where nature does the impossible.",
    description:
      "The real-life floating mountains that inspired Avatar. You'll hike through cloud-wrapped sandstone pillars, cross the world's longest glass bridge, and feel genuinely awe-struck by a landscape that shouldn't be possible.",
    bestTime: "Apr–Oct",
    budgetRange: "$40–70/day",
    scores: {
      history: 10,
      natureUrban: 5,
      culturalComfort: 70,
      activityLevel: 85,
      socialVibe: 25,
      adventure: 95,
    },
  },
  {
    id: "harbin",
    name: "Harbin",
    label: "The Ice Kingdom",
    emoji: "❄️",
    tagline: "Where winter becomes an adventure.",
    description:
      "Every January, Harbin builds a city out of ice — and it's exactly as unreal as it sounds. You'll walk through illuminated ice castles the size of buildings, eat Russian-influenced food in onion-domed architecture, and embrace the minus-20 cold as part of the adventure.",
    bestTime: "Nov–Feb",
    budgetRange: "$40–75/day",
    scores: {
      history: 50,
      natureUrban: 30,
      culturalComfort: 80,
      activityLevel: 50,
      socialVibe: 45,
      adventure: 80,
    },
  },
  {
    id: "hangzhou",
    name: "Hangzhou",
    label: "The Serene Classic",
    emoji: "🍃",
    tagline: "Where classical China feels alive.",
    description:
      "West Lake at dawn, green tea fields in the hills, thousand-year-old temples reflected in still water. You'll cycle around the lake, sip Dragon Well tea at its source, and understand why the ancient Chinese called this place heaven on earth.",
    bestTime: "Mar–May / Sep–Nov",
    budgetRange: "$50–90/day",
    scores: {
      history: 65,
      natureUrban: 30,
      culturalComfort: 40,
      activityLevel: 45,
      socialVibe: 40,
      adventure: 30,
    },
  },
  {
    id: "chongqing",
    name: "Chongqing",
    label: "The Cyberpunk City",
    emoji: "🌃",
    tagline: "Where cities defy the laws of physics.",
    description:
      "Chongqing exists in three dimensions — literally. You'll exit a subway into the 20th floor of a building, watch skyscrapers emerge from morning fog like a cyberpunk dream, and eat the most numbing, most addictive hot pot on the planet.",
    bestTime: "Mar–May / Sep–Nov",
    budgetRange: "$35–70/day",
    scores: {
      history: 45,
      natureUrban: 80,
      culturalComfort: 60,
      activityLevel: 70,
      socialVibe: 90,
      adventure: 50,
    },
  },
  {
    id: "shenzhen",
    name: "Shenzhen",
    label: "The Future City",
    emoji: "🤖",
    tagline: "Where the future is already here.",
    description:
      "China's fastest city grew from farmland to megacity in 30 years, and it shows. You'll explore cutting-edge tech museums, wander the world's most creative urbanism, and feel the electric energy of a place still inventing itself.",
    bestTime: "Oct–Mar",
    budgetRange: "$60–120/day",
    scores: {
      history: 10,
      natureUrban: 88,
      culturalComfort: 20,
      activityLevel: 65,
      socialVibe: 80,
      adventure: 35,
    },
  },
  {
    id: "sanya",
    name: "Sanya",
    label: "The Tropical Escape",
    emoji: "🌴",
    tagline: "Where China surprises you with paradise.",
    description:
      "Clear turquoise water, powder-white sand, and no one expecting you to be anywhere. You'll swim in warm South China Sea bays, explore dramatic coastal rock formations at sunset, and discover that China has a proper tropical paradise most people don't know about.",
    bestTime: "Oct–Apr",
    budgetRange: "$60–130/day",
    scores: {
      history: 15,
      natureUrban: 15,
      culturalComfort: 25,
      activityLevel: 40,
      socialVibe: 60,
      adventure: 30,
    },
  },
  {
    id: "dunhuang",
    name: "Dunhuang",
    label: "The Desert Wonder",
    emoji: "🐪",
    tagline: "Where the Silk Road comes alive.",
    description:
      "The last major oasis before the desert swallowed the ancient Silk Road. You'll ride camels over the singing sand dunes of Mingsha Mountain, watch the crescent moon lake shimmer in impossible isolation, and enter the Mogao Caves — 1,000-year-old Buddhist paintings that survived the desert intact.",
    bestTime: "May–Sep",
    budgetRange: "$35–65/day",
    scores: {
      history: 85,
      natureUrban: 12,
      culturalComfort: 90,
      activityLevel: 70,
      socialVibe: 20,
      adventure: 95,
    },
  },
  {
    id: "guangzhou",
    name: "Guangzhou",
    label: "The Cantonese Table",
    emoji: "🍵",
    tagline: "Where every meal is a celebration.",
    description:
      "Dim sum for breakfast, char siu for lunch, and the best wonton noodles you've ever had for dinner. You'll push a trolley through century-old teahouses, wander the Shamian island colonial quarter, and realize Guangzhou's food culture is a way of life.",
    bestTime: "Oct–Apr",
    budgetRange: "$40–80/day",
    scores: {
      history: 50,
      natureUrban: 72,
      culturalComfort: 55,
      activityLevel: 60,
      socialVibe: 85,
      adventure: 40,
    },
  },
  {
    id: "kunming",
    name: "Kunming",
    label: "The Spring City",
    emoji: "🌼",
    tagline: "Where spring never leaves.",
    description:
      "Mild weather, flower markets, and laid-back streets make Kunming feel easy from day one. You'll wander around Dianchi Lake, day-trip to the surreal Stone Forest, and settle into a slower rhythm without sacrificing city convenience.",
    bestTime: "Mar–May / Oct–Nov",
    budgetRange: "$30–60/day",
    scores: {
      history: 40,
      natureUrban: 22,
      culturalComfort: 60,
      activityLevel: 42,
      socialVibe: 52,
      adventure: 45,
    },
  },
  {
    id: "qingdao",
    name: "Qingdao",
    label: "The Seaside Brew",
    emoji: "🍺",
    tagline: "Where sea breeze meets beer culture.",
    description:
      "German-era avenues, fresh seafood, and a coastline built for long walks. You'll climb Laoshan for ocean views, explore red-roofed neighborhoods, and discover why Qingdao's food-and-beer culture makes summer trips effortless.",
    bestTime: "May–Oct",
    budgetRange: "$45–85/day",
    scores: {
      history: 45,
      natureUrban: 32,
      culturalComfort: 35,
      activityLevel: 46,
      socialVibe: 64,
      adventure: 36,
    },
  },
  {
    id: "suzhou",
    name: "Suzhou",
    label: "The Garden Classic",
    emoji: "🏞️",
    tagline: "Where gardens frame quiet elegance.",
    description:
      "Classical gardens, canal-side lanes, and refined Jiangnan aesthetics define Suzhou. You'll move between UNESCO-listed gardens and old-water-town textures, then end the day with a quieter, more contemplative city pace.",
    bestTime: "Mar–May / Sep–Nov",
    budgetRange: "$50–95/day",
    scores: {
      history: 78,
      natureUrban: 28,
      culturalComfort: 42,
      activityLevel: 34,
      socialVibe: 36,
      adventure: 26,
    },
  },
  {
    id: "lijiang",
    name: "Lijiang",
    label: "The Old Town Escape",
    emoji: "🏔️",
    tagline: "Where old-town nights meet snow peaks.",
    description:
      "Stone alleys and mountain air make Lijiang feel cinematic. You'll explore Naxi heritage in the old town, wake up to views of Jade Dragon Snow Mountain, and choose between gentle wandering and highland excursions.",
    bestTime: "Apr–Jun / Sep–Nov",
    budgetRange: "$35–70/day",
    scores: {
      history: 60,
      natureUrban: 12,
      culturalComfort: 72,
      activityLevel: 36,
      socialVibe: 46,
      adventure: 70,
    },
  },
  {
    id: "zhuhai",
    name: "Zhuhai",
    label: "The Leisure Coast",
    emoji: "🐬",
    tagline: "Where coastal leisure feels effortless.",
    description:
      "Zhuhai is clean, open, and made for low-stress travel. You'll cycle along Lovers' Road, enjoy island-facing sunsets, and treat the trip as a true reset rather than a checklist sprint.",
    bestTime: "Oct–Apr",
    budgetRange: "$45–90/day",
    scores: {
      history: 30,
      natureUrban: 32,
      culturalComfort: 30,
      activityLevel: 36,
      socialVibe: 46,
      adventure: 32,
    },
  },
  {
    id: "nanjing",
    name: "Nanjing",
    label: "The Scholarly Capital",
    emoji: "📚",
    tagline: "Where history and campus vibes intersect.",
    description:
      "Nanjing blends imperial memory with tree-lined modern neighborhoods. You'll walk old city walls, visit major museums and memorial sites, then switch to bookshops and café streets shaped by a strong university culture.",
    bestTime: "Mar–May / Sep–Nov",
    budgetRange: "$45–90/day",
    scores: {
      history: 88,
      natureUrban: 48,
      culturalComfort: 45,
      activityLevel: 55,
      socialVibe: 56,
      adventure: 36,
    },
  },
  {
    id: "dalian",
    name: "Dalian",
    label: "The Breezy Port",
    emoji: "🌊",
    tagline: "Where the north opens to the sea.",
    description:
      "Wide boulevards and sea air give Dalian a calm northern-coast identity. You'll combine city squares, cliffside viewpoints, and seafood-heavy evenings, especially in the summer escape season.",
    bestTime: "Jun–Sep",
    budgetRange: "$45–85/day",
    scores: {
      history: 42,
      natureUrban: 35,
      culturalComfort: 38,
      activityLevel: 45,
      socialVibe: 50,
      adventure: 40,
    },
  },
  {
    id: "wuhan",
    name: "Wuhan",
    label: "The River Metropolis",
    emoji: "🌉",
    tagline: "Where three towns pulse as one.",
    description:
      "Built around the Yangtze and Han rivers, Wuhan moves with big-city momentum and everyday grit. You'll cross historic riverfront landmarks, taste iconic local breakfast culture, and experience a less curated but highly authentic urban China.",
    bestTime: "Mar–Apr / Oct–Nov",
    budgetRange: "$35–70/day",
    scores: {
      history: 65,
      natureUrban: 70,
      culturalComfort: 50,
      activityLevel: 70,
      socialVibe: 75,
      adventure: 45,
    },
  },
  {
    id: "changsha",
    name: "Changsha",
    label: "The Nightlife Spice",
    emoji: "🌶️",
    tagline: "Where night markets never slow down.",
    description:
      "Changsha is all flavor, late nights, and young energy. You'll eat your way through fiery Hunan dishes, bounce between riverfront districts after dark, and see why the city has become a favorite for domestic weekend trips.",
    bestTime: "Oct–Apr",
    budgetRange: "$30–65/day",
    scores: {
      history: 52,
      natureUrban: 62,
      culturalComfort: 55,
      activityLevel: 78,
      socialVibe: 88,
      adventure: 50,
    },
  },
];
