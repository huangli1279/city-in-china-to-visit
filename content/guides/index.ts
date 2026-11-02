export interface GuideSection {
  heading: string
  paragraphs: string[]
}

export interface GuideSource {
  name: string
  url: string
  note: string
}

export interface GuideInternalLink {
  slug: string
  anchor: string
}

export interface GuideEvidenceBlock {
  title: string
  points: string[]
}

export interface Guide {
  slug: string
  title: string
  titleVariants: { A: string; B: string }
  description: string
  intro: string
  keyPoints: string[]
  sections: GuideSection[]
  faq: { question: string; answer: string }
  internalLinks: GuideInternalLink[]
  updateSummary: string[]
  sources: GuideSource[]
  reviewer: string
  authorId: string
  reviewerId: string
  datePublishedISO: string
  heroImage: string
  evidenceBlocks: GuideEvidenceBlock[]
}

const REVIEWER_TEAM_NAME = 'City Vibe Matcher Research Desk'
const DEFAULT_AUTHOR_ID = 'editorial-team'
const DEFAULT_REVIEWER_ID = 'research-desk'

type RawGuide = Omit<
  Guide,
  'authorId' | 'reviewerId' | 'datePublishedISO' | 'heroImage' | 'evidenceBlocks'
>

const RAW_GUIDES: RawGuide[] = [
  {
    slug: 'best-city-to-visit-in-china-first-time',
    title: 'Best City to Visit in China for First-Time Travelers',
    titleVariants: {
      A: 'Best City to Visit in China for First-Time Travelers',
      B: 'Best City to Visit in China (First Trip): A Simple Decision Framework',
    },
    description:
      "Use a practical framework to pick your first China city by travel style, comfort, and pace, then compare Beijing, Shanghai, Xi'an, Chengdu, and Guilin.",
    intro:
      'There is no universal first-stop destination for every traveler. The smartest choice depends on how you want your first China trip to feel day by day.',
    keyPoints: [
      'Pick Shanghai when convenience, smooth transport, and modern comfort are non-negotiable.',
      'Pick Beijing when imperial history and iconic landmarks are your top priority.',
      "Pick Xi'an, Chengdu, or Guilin when local depth, food culture, or scenery matter more than urban speed.",
    ],
    sections: [
      {
        heading: '1. Define your first-trip priority before picking a city',
        paragraphs: [
          'Most first-trip mistakes happen when travelers compare cities without a clear objective. Before reading rankings, name your primary outcome: heritage, food, nightlife, scenery, comfort, or balance.',
          'Once your main objective is clear, city comparison becomes practical instead of emotional. You can quickly reject places that look interesting but do not fit your expected travel rhythm.',
          'A structured matching method usually beats generic top-10 lists because it starts from your preferences, not someone else\'s itinerary.',
        ],
      },
      {
        heading: '2. Use friction tolerance to avoid first-trip fatigue',
        paragraphs: [
          'Language and logistics friction shape your experience more than most travelers expect. The same city can feel exciting or exhausting depending on your confidence level.',
          'If you prefer smoother navigation, Shanghai is often the most forgiving entry point, followed by Shenzhen and Guangzhou. Transit is efficient, digital payment adoption is high, and service infrastructure is broad.',
          "If you enjoy local immersion and can handle occasional uncertainty, places like Xi'an, Chongqing, and Dunhuang can feel more rewarding because they deliver stronger contrast and cultural texture.",
        ],
      },
      {
        heading: '3. Match city archetypes to your first-stop expectations',
        paragraphs: [
          "Think in archetypes instead of city names. History-heavy archetype points to Beijing and Xi'an. Modern-metropolis archetype points to Shanghai and Shenzhen.",
          'Food-and-local-life archetype points to Chengdu and Chongqing, while landscape-and-recovery archetype points to Guilin, Dali, and Sanya.',
          'Archetype thinking helps you shortlist quickly because it separates the trip feeling you want from the brand image of each destination.',
        ],
      },
      {
        heading: '4. Build a practical Plan B before booking flights',
        paragraphs: [
          'A solid first-city decision always includes one backup city. Weather, event pricing, and flight availability can shift rapidly, especially during holidays and peak weekends.',
          'Create a two-city shortlist with one primary and one fallback. Keep your first 48 hours flexible so arrival delays do not collapse your itinerary.',
          'When you plan this way, you reduce stress and keep your first China trip resilient even when logistics change late.',
        ],
      },
    ],
    faq: {
      question: 'What is the best city to visit in China for first-time tourists?',
      answer:
        'For many first-time tourists, Shanghai and Beijing are common starting points. The better answer depends on your travel style, which is why personalized matching often performs better than one-size-fits-all lists.',
    },
    internalLinks: [
      { slug: 'beijing-vs-shanghai-for-first-trip', anchor: 'Compare Beijing and Shanghai with a first-trip decision matrix' },
      { slug: 'best-china-cities-by-travel-style', anchor: 'Match your travel style to Chinese city archetypes' },
      { slug: 'yunnan-kunming-dali-lijiang-travel-guide', anchor: 'Look at a Yunnan route if Dali or Lijiang is the kind of trip you want' },
      { slug: 'china-first-trip-budget-by-city', anchor: 'Estimate first-trip budget bands before you pick a city' },
      { slug: 'china-visa-payment-checklist-first-timers', anchor: 'Run a visa and digital-payment readiness checklist' },
    ],
    updateSummary: [
      'Added clearer city-selection checkpoints for convenience, culture depth, and pace tolerance.',
      'Inserted budget and payment-prep linkouts to reduce booking-stage surprises.',
    ],
    sources: [
      { name: 'National Immigration Administration of China', url: 'https://en.nia.gov.cn/', note: 'Official entry and immigration updates.' },
      { name: 'IATA Travel Centre', url: 'https://www.iatatravelcentre.com/', note: 'Airline-facing entry document reference.' },
      { name: 'Ministry of Foreign Affairs of the PRC', url: 'https://www.fmprc.gov.cn/eng/', note: 'Official diplomatic notices and policy links.' },
    ],
    reviewer: REVIEWER_TEAM_NAME,
  },
  {
    slug: 'beijing-vs-shanghai-for-first-trip',
    title: 'Beijing vs Shanghai for First-Time China Travelers',
    titleVariants: {
      A: 'Beijing vs Shanghai for First-Time China Travelers',
      B: 'Beijing or Shanghai: How to Choose Your First China City',
    },
    description:
      'Compare Beijing and Shanghai across history depth, convenience, transport friction, and trip pace to choose the better first city for your China trip.',
    intro:
      'Beijing and Shanghai are the two most common first stops in China, but they reward very different travel personalities and planning styles.',
    keyPoints: [
      'Choose Beijing for history depth, major landmarks, and culture-heavy days.',
      'Choose Shanghai for urban energy, convenience, and lower planning stress.',
      'If unsure, score both cities against your pace, comfort, and activity tolerance before booking.',
    ],
    sections: [
      {
        heading: '1. Core experience: imperial heritage vs contemporary urban life',
        paragraphs: [
          'Beijing is organized around heritage density: the Forbidden City, Temple of Heaven, hutong districts, and Great Wall day trips. It is ideal when your first China memory should be historically iconic.',
          'Shanghai performs better when you want modern neighborhoods, skyline views, dining variety, and flexible day planning. It is often easier to enjoy without strict hour-by-hour scheduling.',
          'In short, Beijing emphasizes depth and narrative; Shanghai emphasizes flow and convenience.',
        ],
      },
      {
        heading: '2. Planning load, transfer time, and daily energy use',
        paragraphs: [
          'Beijing usually requires earlier starts and more structured routing because top attractions are distributed across large distances and often attract heavy queues.',
          'Shanghai supports shorter planning cycles. Metro access is dense, neighborhood transitions are smoother, and many activities can be rearranged without losing the day.',
          'Travelers with low friction tolerance usually finish Shanghai days with more spare energy than equivalent Beijing schedules.',
        ],
      },
      {
        heading: '3. Cost rhythm and itinerary resilience',
        paragraphs: [
          'Both cities can be done on medium budgets, but cost rhythm differs. Beijing often concentrates spending around ticketed landmarks and planned transport blocks.',
          'Shanghai spending tends to spread across food, neighborhood hopping, and optional nightlife. This can feel more controllable for travelers who adjust plans in real time.',
          'If budget certainty matters, pre-book Beijing anchor attractions and reserve one flexible Shanghai-style day to absorb surprises.',
        ],
      },
      {
        heading: '4. Decision shortcut for first-time travelers',
        paragraphs: [
          'Pick Beijing first if your trip goal is historical immersion and you are comfortable with structured, high-output sightseeing days.',
          'Pick Shanghai first if your goal is smoother logistics, modern city variety, and less itinerary pressure.',
          'Still undecided? Start in Shanghai for an easier landing, then add Beijing as a second city once your travel systems are warmed up.',
        ],
      },
    ],
    faq: {
      question: 'Is Beijing or Shanghai better for tourists?',
      answer:
        'Beijing is better for history-first travel. Shanghai is better for modern city experiences and convenience. The best choice depends on your trip goals.',
    },
    internalLinks: [
      { slug: 'beijing-shanghai-chengdu-first-trip-comparison', anchor: 'Add Chengdu to the comparison when pace and food matter' },
      { slug: 'how-many-days-in-first-china-city', anchor: 'Choose a 3-, 4-, or 5-day structure after selecting the city' },
      { slug: 'china-first-trip-budget-by-city', anchor: 'Compare cost rhythm between heritage-heavy and modern-city itineraries' },
      { slug: 'best-time-to-visit-china-first-trip', anchor: 'Validate your shortlist against seasonality and weather windows' },
    ],
    updateSummary: [
      'Expanded the comparison into pace, transfer friction, and schedule resilience factors.',
      'Added links to season and budget planning so city choice and execution stay aligned.',
    ],
    sources: [
      { name: 'Beijing Municipal Government (English)', url: 'https://english.beijing.gov.cn/', note: 'Official city information and visitor notices.' },
      { name: 'Shanghai Municipal Government (English)', url: 'https://english.shanghai.gov.cn/', note: 'Official city information and public-service updates.' },
      { name: 'IATA Travel Centre', url: 'https://www.iatatravelcentre.com/', note: 'Travel document and transit requirement reference.' },
    ],
    reviewer: REVIEWER_TEAM_NAME,
  },
  {
    slug: 'best-china-cities-by-travel-style',
    title: 'Best China Cities by Travel Style',
    titleVariants: {
      A: 'Best China Cities by Travel Style',
      B: 'Best Cities to Visit in China by Travel Personality',
    },
    description:
      'Match Chinese cities to your travel personality across heritage, food, nature, nightlife, and recovery pace, with practical examples for first-trip options.',
    intro:
      'The fastest way to choose where to go in China is to match destination archetypes to your travel style, then validate the top two or three candidates.',
    keyPoints: [
      "History-first travelers usually match with Beijing and Xi'an.",
      'Nature-and-recovery travelers often match with Guilin, Dali, and Sanya.',
      'Food-and-social-energy travelers frequently match with Chengdu, Chongqing, and Guangzhou.',
    ],
    sections: [
      {
        heading: '1. History and heritage style',
        paragraphs: [
          "If ancient architecture, museums, and dynastic narrative are your priorities, start with Beijing and Xi'an. These cities reward travelers who like context-rich sightseeing.",
          'Plan longer attraction windows here. Rushing reduces the value because many highlights are strongest when you have time for guided interpretation.',
          'This style fits travelers who enjoy structured days and do not mind queue management around major landmarks.',
        ],
      },
      {
        heading: '2. City energy and social nightlife style',
        paragraphs: [
          'If your ideal trip includes dense neighborhoods, evening activity, and social options, Shanghai and Chongqing are strong choices.',
          'Shanghai favors modern convenience and cosmopolitan variety, while Chongqing offers dramatic terrain, bold food culture, and high local character.',
          'This style suits travelers who prefer momentum and can adapt plans quickly.',
        ],
      },
      {
        heading: '3. Food-led and local-culture style',
        paragraphs: [
          "If food is your primary lens for travel, Chengdu, Guangzhou, and Xi'an are high-value choices with distinctive regional identities.",
          'Food-led itineraries work best when you leave room for spontaneous stops instead of overfilling every hour with landmarks.',
          'This style is ideal for travelers who value neighborhood exploration as much as checklist attractions.',
        ],
      },
      {
        heading: '4. Landscape and calm pace style',
        paragraphs: [
          'If scenic views and low-pressure itineraries matter most, prioritize Guilin, Dali, and Sanya.',
          'These destinations support slower mornings, longer scenic blocks, and better recovery between travel days.',
          'They are often the right counterweight for travelers who feel drained by nonstop urban movement.',
        ],
      },
      {
        heading: '5. How to use style matching without overfitting',
        paragraphs: [
          'Do not force a perfect single answer. Shortlist two style-compatible cities and compare season, budget, and flight practicality.',
          'If your top two options feel equally good, choose the city with lower planning friction for your arrival week.',
          'This approach keeps your first China trip flexible while still anchored in a clear style decision.',
        ],
      },
    ],
    faq: {
      question: 'How do I choose the best city in China for my travel style?',
      answer:
        'Start by ranking your priorities: history, city life, nature, comfort, pace, and social vibe. Then map your top priorities to city profiles and compare the top three matches.',
    },
    internalLinks: [
      { slug: 'best-city-to-visit-in-china-first-time', anchor: 'Use the first-city framework to turn style fit into one final pick' },
      { slug: 'beijing-shanghai-chengdu-first-trip-comparison', anchor: 'Contrast Beijing, Shanghai, and Chengdu with style-specific tradeoffs' },
      { slug: 'best-time-to-visit-china-first-trip', anchor: 'Check whether your style match still works in your travel month' },
      { slug: 'how-many-days-in-first-china-city', anchor: 'Pair each style with a realistic day-count template' },
    ],
    updateSummary: [
      'Added explicit style-to-city mapping for food-led and recovery-paced travelers.',
      'Connected style decisions with season and trip-length planning pages.',
    ],
    sources: [
      { name: 'UNESCO World Heritage', url: 'https://www.unesco.org/en', note: 'Context for heritage-oriented destination planning.' },
      { name: 'China Meteorological Administration', url: 'https://www.cma.gov.cn/en/', note: 'Seasonality context for travel-style timing.' },
      { name: 'State Council of the PRC (English)', url: 'https://english.www.gov.cn/', note: 'Official policy and infrastructure updates.' },
    ],
    reviewer: REVIEWER_TEAM_NAME,
  },
  {
    slug: 'how-many-days-in-first-china-city',
    title: 'How Many Days Should You Spend in Your First China City?',
    titleVariants: {
      A: 'How Many Days Should You Spend in Your First China City?',
      B: 'How Many Days in China for a First City? 3, 4, or 5-Day Planning Guide',
    },
    description:
      'Plan your first China city with practical 3-day, 4-day, and 5-day structures, including pacing, recovery buffers, and transfer-day planning.',
    intro:
      'Most first-time travelers underestimate how much time major Chinese cities require. The right day count depends on pace tolerance, attraction depth, and transfer logistics.',
    keyPoints: [
      '3 to 5 days is the most practical range for a first city.',
      'Use 3 days for highlights, 4 days for balance, and 5 days for deeper neighborhood exploration.',
      'Always protect one flex block for weather, fatigue, or transport delays.',
    ],
    sections: [
      {
        heading: '1. 3-day structure for highlight-focused trips',
        paragraphs: [
          'A three-day structure is best when your goal is to sample landmark highlights, not complete deep exploration.',
          'It works well in multi-city itineraries where your first destination is mainly an orientation stop.',
          'To make three days effective, pre-select one anchor area per day and avoid long cross-city transfers at peak hours.',
        ],
      },
      {
        heading: '2. 4-day structure for balanced quality and recovery',
        paragraphs: [
          'Four days is the most balanced option for many first-time travelers. You can cover major sights and still include local neighborhoods or food-focused exploration.',
          'Day four also acts as a pressure-release valve when weather shifts or transport runs late.',
          'If this is your first long-haul Asia trip, a four-day start usually improves both energy and decision quality.',
        ],
      },
      {
        heading: '3. 5-day structure for depth and local rhythm',
        paragraphs: [
          'Five days is ideal when you want to combine landmark depth with slower local immersion.',
          'This duration lets you separate high-output sightseeing days from low-output recovery days, which reduces burnout.',
          'Travelers who care about neighborhood texture, markets, and local routines usually find five days far more satisfying than rushed short stays.',
        ],
      },
      {
        heading: '4. Simple rule for choosing 3, 4, or 5 days',
        paragraphs: [
          'Choose 3 days if your broader trip includes multiple destinations and you prioritize breadth.',
          'Choose 4 days if you want a stable first-city experience with manageable pace and lower stress.',
          'Choose 5 days if you value depth, better recovery, and contingency room for uncertain factors.',
        ],
      },
    ],
    faq: {
      question: 'Is 3 days enough for a first city in China?',
      answer:
        'Three days is enough for key sights, but 4 to 5 days is usually better for first-time travelers who want a smoother pace and deeper experience.',
    },
    internalLinks: [
      { slug: 'china-first-trip-budget-by-city', anchor: 'Adjust day-count plans to your lodging and local transport budget' },
      { slug: 'best-time-to-visit-china-first-trip', anchor: 'Align day count with shoulder-season weather patterns' },
      { slug: 'china-visa-payment-checklist-first-timers', anchor: 'Finish visa and payment setup before locking transfer days' },
      { slug: 'best-city-to-visit-in-china-first-time', anchor: 'Return to city selection if your day plan feels overloaded' },
    ],
    updateSummary: [
      'Added practical triggers for switching between 3, 4, and 5 days.',
      'Linked day-count planning to pre-departure prep and budget constraints.',
    ],
    sources: [
      { name: 'Civil Aviation Administration of China', url: 'https://www.caac.gov.cn/en/', note: 'Aviation operations context for transfer-day planning.' },
      { name: 'China Railway 12306', url: 'https://www.12306.cn/en/index.html', note: 'Rail scheduling context for intercity timing.' },
      { name: 'IATA Travel Centre', url: 'https://www.iatatravelcentre.com/', note: 'Transit and document considerations for multi-city routes.' },
    ],
    reviewer: REVIEWER_TEAM_NAME,
  },
  {
    slug: 'beijing-shanghai-chengdu-first-trip-comparison',
    title: 'Beijing vs Shanghai vs Chengdu for a First China Trip',
    titleVariants: {
      A: 'Beijing vs Shanghai vs Chengdu for a First China Trip',
      B: 'Beijing, Shanghai, or Chengdu: Which First City Fits You Best?',
    },
    description:
      'Compare Beijing, Shanghai, and Chengdu across history depth, logistics friction, food scene intensity, and recovery pace to choose your first city.',
    intro:
      'When first-time travelers cannot decide between Beijing and Shanghai, Chengdu is often the missing third option that changes the decision.',
    keyPoints: [
      'Beijing leads for heritage density and iconic first-time landmarks.',
      'Shanghai leads for low-friction logistics and flexible city flow.',
      'Chengdu leads for food culture, slower rhythm, and local-life depth.',
    ],
    sections: [
      {
        heading: '1. Heritage, modernity, and lifestyle depth',
        paragraphs: [
          'Beijing is strongest when your trip must center on dynastic history and landmark narratives. It has higher density of headline heritage sites than most first-trip alternatives.',
          'Shanghai is strongest when you value modern urban variety and smooth transitions between neighborhoods. It usually requires less rigid day planning to stay enjoyable.',
          'Chengdu stands out for lifestyle immersion, tea-house culture, and food-first exploration. It rewards travelers who prefer local rhythm over checklist landmarks.',
        ],
      },
      {
        heading: '2. Daily friction and schedule pressure',
        paragraphs: [
          'Beijing often needs early starts and stricter attraction sequencing because queue pressure can be high at signature sites.',
          'Shanghai remains the easiest city for first-time navigation because transport density and payment convenience are generally more forgiving.',
          'Chengdu sits in the middle: less schedule pressure than Beijing, but still benefits from selective planning when you include nearby excursions.',
        ],
      },
      {
        heading: '3. Food, social atmosphere, and recovery',
        paragraphs: [
          'Travelers who prioritize food and local neighborhood texture often rate Chengdu highest for satisfaction-to-fatigue ratio.',
          'Shanghai offers the broadest international dining range and nightlife options, which is useful for mixed-group itineraries.',
          'Beijing delivers strong culinary value too, but many first-time travelers spend more daytime energy on landmarks and transfers.',
        ],
      },
      {
        heading: '4. Decision shortcut for first-time visitors',
        paragraphs: [
          'Pick Beijing if heritage depth is your non-negotiable trip anchor.',
          'Pick Shanghai if arrival smoothness and itinerary flexibility are your top goals.',
          'Pick Chengdu if you want culture-rich local life with a gentler daily pace.',
        ],
      },
    ],
    faq: {
      question: 'Should first-time visitors choose Beijing, Shanghai, or Chengdu?',
      answer:
        'Choose Beijing for imperial heritage, Shanghai for convenience, and Chengdu for food-led local culture. The right answer depends on your pace and trip goals.',
    },
    internalLinks: [
      { slug: 'beijing-vs-shanghai-for-first-trip', anchor: 'Use the two-city comparison if Chengdu is not on your shortlist yet' },
      { slug: 'best-china-cities-by-travel-style', anchor: 'Map personality fit before finalizing this three-city decision' },
      { slug: 'china-first-trip-budget-by-city', anchor: 'Check cost differences between these three major gateways' },
      { slug: 'how-many-days-in-first-china-city', anchor: 'Pick a day-count template once your city choice is clear' },
      { slug: 'best-time-to-visit-china-first-trip', anchor: 'Validate city choice with weather and season windows' },
    ],
    updateSummary: [
      'Added Chengdu as a third benchmark city for first-trip decisions.',
      'Introduced a pace-versus-friction comparison to reduce decision paralysis.',
    ],
    sources: [
      { name: 'Beijing Municipal Government (English)', url: 'https://english.beijing.gov.cn/', note: 'Official municipal reference.' },
      { name: 'Shanghai Municipal Government (English)', url: 'https://english.shanghai.gov.cn/', note: 'Official municipal reference.' },
      { name: 'Chengdu Municipal Government', url: 'https://www.chengdu.gov.cn/', note: 'Official municipal reference.' },
    ],
    reviewer: REVIEWER_TEAM_NAME,
  },
  {
    slug: 'china-first-trip-budget-by-city',
    title: 'China First-Trip Budget Guide by City',
    titleVariants: {
      A: 'China First-Trip Budget Guide by City',
      B: 'How Much Budget Do You Need for Your First China City?',
    },
    description:
      'Build a practical first-trip budget by city with daily spend ranges for lodging, transport, attractions, and meal rhythm before booking.',
    intro: 'Budget planning works best when you compare spending patterns by city instead of using one national average.',
    keyPoints: [
      'Plan by daily spending rhythm, not just total trip budget.',
      'Big gateways often trade higher accommodation cost for lower planning friction.',
      'A contingency buffer is mandatory for first-time itineraries.',
    ],
    sections: [
      {
        heading: '1. Separate fixed costs from variable city costs',
        paragraphs: [
          'Your flights and major rail transfers are fixed-cost anchors. Accommodation, local transport, and attraction intensity are variable costs shaped by city choice.',
          'Shanghai usually concentrates spend into accommodation and urban convenience. Beijing can concentrate spend into attraction tickets and transfer blocks.',
          'Chengdu often delivers stronger value on food and everyday local spending, which can improve budget resilience on longer stays.',
        ],
      },
      {
        heading: '2. Use daily budget bands for scenario planning',
        paragraphs: [
          'Use three daily bands for each city: efficient, balanced, and comfort-oriented. This keeps your plan adaptable when conditions change.',
          'If your city shortlist includes one high-cost and one medium-cost option, model both before payment deadlines so you can pivot without stress.',
          'Always reserve a contingency block for weather shifts, booking changes, and transfer delays.',
        ],
      },
      {
        heading: '3. Budget by trip style, not by destination branding',
        paragraphs: [
          'A food-led local itinerary can be cheaper than a landmark-heavy itinerary in the same city.',
          'A short, high-intensity schedule can cost more than a slower four-day structure due to ticket clustering and peak-hour transfers.',
          'Budget confidence improves when itinerary pace and city choice are planned together.',
        ],
      },
      {
        heading: '4. Fast budgeting checklist before booking',
        paragraphs: [
          'Confirm payment method readiness, average local transfer spend, and one backup accommodation zone.',
          'Review your likely daily activity load and classify each day as high-cost or low-cost.',
          'Lock your first city only after your budget model still works under a 10-15% cost increase scenario.',
        ],
      },
    ],
    faq: {
      question: 'How much budget should I prepare for my first China city?',
      answer:
        'Start with city-specific daily spend bands and a contingency buffer. Budget varies by pace, accommodation preference, and attraction intensity more than city name alone.',
    },
    internalLinks: [
      { slug: 'how-many-days-in-first-china-city', anchor: 'Set your day count first so the budget model reflects real pace' },
      { slug: 'best-time-to-visit-china-first-trip', anchor: 'Use season windows to estimate peak-price pressure' },
      { slug: 'china-visa-payment-checklist-first-timers', anchor: 'Prevent payment setup gaps from causing hidden travel costs' },
      { slug: 'best-city-to-visit-in-china-first-time', anchor: 'Return to city selection if budget stress changes your shortlist' },
    ],
    updateSummary: [
      'Added city-level budget rhythm guidance instead of one-size-fits-all totals.',
      'Linked budget planning with payment readiness and seasonality risk.',
    ],
    sources: [
      { name: 'National Bureau of Statistics of China (English)', url: 'https://www.stats.gov.cn/english/', note: 'Macro-level price and consumption context.' },
      { name: 'State Council of the PRC (English)', url: 'https://english.www.gov.cn/', note: 'Policy and infrastructure context affecting travel operations.' },
      { name: 'IATA Travel Centre', url: 'https://www.iatatravelcentre.com/', note: 'Entry requirement context for booking readiness.' },
    ],
    reviewer: REVIEWER_TEAM_NAME,
  },
  {
    slug: 'best-time-to-visit-china-first-trip',
    title: 'Best Time to Visit China for a First Trip',
    titleVariants: {
      A: 'Best Time to Visit China for a First Trip',
      B: 'When Should You Take Your First China Trip? Season Planning Guide',
    },
    description:
      'Choose the best travel window for your first China trip by balancing weather comfort, crowd pressure, and city-specific event seasonality.',
    intro:
      'Seasonality can change how the same city feels. Good timing often matters as much as destination choice for first-time satisfaction.',
    keyPoints: [
      'Shoulder seasons usually offer the best balance for first-time travelers.',
      'Weather comfort, holiday crowding, and price pressure should be evaluated together.',
      'One backup city protects your plan when seasonal conditions shift.',
    ],
    sections: [
      {
        heading: '1. Why shoulder seasons are often the safest first-trip choice',
        paragraphs: [
          'Shoulder seasons can reduce extreme weather risk while avoiding the heaviest holiday crowd pressure.',
          'For first-time travelers, this usually means lower logistics stress and more stable day-to-day energy use.',
          'If your schedule is fixed in peak season, pre-booking and day-structure discipline become more important.',
        ],
      },
      {
        heading: '2. Match season to city profile',
        paragraphs: [
          'Dense landmark itineraries in Beijing need weather and queue management more than flexible neighborhood-led plans in Shanghai.',
          'Cities with slower lifestyle pacing can absorb weather disruptions better when your itinerary is not tightly packed.',
          'A season-city fit check helps avoid the common mistake of selecting a great city in the wrong month for your travel style.',
        ],
      },
      {
        heading: '3. Use a weather-and-crowd fallback rule',
        paragraphs: [
          'Keep one alternate city in a different climate profile so your trip remains viable under adverse weather.',
          'If your primary city falls into severe crowd or weather conditions, switch early rather than compressing activities into fewer days.',
          'Fallback planning improves trip quality more than trying to optimize every hour in a constrained window.',
        ],
      },
      {
        heading: '4. Season planning checklist',
        paragraphs: [
          'Check likely weather ranges, public-holiday overlap, and transfer reliability for your travel window.',
          'Combine season checks with day-count and budget models before locking non-refundable bookings.',
          'Reconfirm entry and payment readiness close to departure in case policy or platform details change.',
        ],
      },
    ],
    faq: {
      question: 'When is the best time for first-time travelers to visit China?',
      answer:
        'For many travelers, shoulder seasons are the safest choice because they balance weather comfort, manageable crowds, and better itinerary flexibility.',
    },
    internalLinks: [
      { slug: 'best-city-to-visit-in-china-first-time', anchor: 'Re-check city fit after season constraints are clear' },
      { slug: 'how-many-days-in-first-china-city', anchor: 'Adjust your day-count template to weather and crowd conditions' },
      { slug: 'china-first-trip-budget-by-city', anchor: 'Estimate seasonal price pressure before committing' },
      { slug: 'beijing-shanghai-chengdu-first-trip-comparison', anchor: 'Compare seasonal tradeoffs across Beijing, Shanghai, and Chengdu' },
    ],
    updateSummary: [
      'Added month-window decision logic focused on first-time logistics risk.',
      'Connected season planning with budget and day-count pages for execution.',
    ],
    sources: [
      { name: 'China Meteorological Administration', url: 'https://www.cma.gov.cn/en/', note: 'Official weather and climate context.' },
      { name: 'World Meteorological Organization', url: 'https://wmo.int/', note: 'Global climate context and standards.' },
      { name: 'State Council of the PRC (English)', url: 'https://english.www.gov.cn/', note: 'Official public-holiday and policy announcements.' },
    ],
    reviewer: REVIEWER_TEAM_NAME,
  },
  {
    slug: 'china-visa-payment-checklist-first-timers',
    title: 'China Visa and Payment Checklist for First-Time Travelers',
    titleVariants: {
      A: 'China Visa and Payment Checklist for First-Time Travelers',
      B: 'China Entry and Payment Prep: First-Trip Checklist',
    },
    description:
      'Use a practical pre-departure checklist for visa, entry documentation, and digital payment readiness before your first China trip.',
    intro:
      'Many first-trip disruptions happen before arrival: incomplete entry preparation and payment setup gaps are common avoidable blockers.',
    keyPoints: [
      'Confirm entry requirements early and re-check near departure.',
      'Prepare at least two payment paths to reduce arrival friction.',
      'Link pre-departure checks with city choice and day-count planning.',
    ],
    sections: [
      {
        heading: '1. Entry readiness before booking non-refundable plans',
        paragraphs: [
          'Confirm your passport validity window, document requirements, and latest entry notices before locking non-refundable bookings.',
          'If your route includes transfers, verify transit-related requirements separately from destination entry rules.',
          'Keep digital and printed copies of critical documents so unexpected connectivity problems do not block your movement.',
        ],
      },
      {
        heading: '2. Payment readiness for the first 72 hours',
        paragraphs: [
          'Prepare more than one payment method. Single-platform dependency can create avoidable stress during arrival and transfers.',
          'Test account setup, card linkage, and authentication before departure so your first day is not consumed by configuration issues.',
          'Carry a practical fallback plan for cases where your primary payment flow fails temporarily.',
        ],
      },
      {
        heading: '3. Policy-sensitive information handling',
        paragraphs: [
          'Policy details can change. Always check official channels close to departure and before final payment.',
          'Do not rely on old forum screenshots or unverifiable reposts for critical entry steps.',
          'If information conflicts across sources, prioritize official government and transport channels.',
        ],
      },
      {
        heading: '4. Final pre-departure checklist',
        paragraphs: [
          'Reconfirm entry requirements, payment readiness, and your first 48-hour city logistics plan.',
          'Save offline copies of key addresses, transport plans, and emergency contacts.',
          'If any critical item is uncertain, delay non-refundable payments until resolved.',
        ],
      },
    ],
    faq: {
      question: 'What should first-time travelers prepare before entering China?',
      answer:
        'Prepare verified entry documents, two payment options, and an arrival-week logistics plan. Re-check policy details through official channels close to departure.',
    },
    internalLinks: [
      { slug: 'best-city-to-visit-in-china-first-time', anchor: 'Choose a first city only after entry and payment readiness are confirmed' },
      { slug: 'china-first-trip-budget-by-city', anchor: 'Include payment constraints in your budget model' },
      { slug: 'how-many-days-in-first-china-city', anchor: 'Adjust day-count plans when prep tasks need extra lead time' },
      { slug: 'best-time-to-visit-china-first-trip', anchor: 'Coordinate departure month with policy and operational readiness' },
    ],
    updateSummary: [
      'Added a 72-hour arrival checklist focused on entry and payment resilience.',
      'Strengthened source policy: official channels first for all time-sensitive claims.',
    ],
    sources: [
      { name: 'National Immigration Administration of China', url: 'https://en.nia.gov.cn/', note: 'Official entry and immigration policies.' },
      { name: 'Ministry of Foreign Affairs of the PRC', url: 'https://www.fmprc.gov.cn/eng/', note: 'Diplomatic and consular policy information.' },
      { name: "People's Bank of China (English)", url: 'https://www.pbc.gov.cn/en/', note: 'Payment system and financial service context.' },
    ],
    reviewer: REVIEWER_TEAM_NAME,
  },
  {
    slug: 'chengdu-travel-guide-first-trip',
    title: 'Chengdu Travel Guide for First-Time Visitors: Pandas, Food, and a 3-Day Plan',
    titleVariants: {
      A: 'Chengdu Travel Guide for First-Time Visitors',
      B: 'Chengdu in 3 Days: Pandas, Hot Pot, and Teahouses for First-Timers',
    },
    description:
      'A practical Chengdu guide for foreign travelers: when to go, visa-free transit, mobile payments, where to stay, what to eat, a 3-day itinerary, budget ranges in CNY and USD, and common mistakes.',
    intro:
      'Chengdu is the city most travelers describe as the easiest place in China to slow down. It is big and modern, yet daily life still runs at teahouse speed, and the food scene alone justifies the trip. This guide turns that reputation into a concrete plan you can actually follow on a first visit.',
    keyPoints: [
      'Arrive at the Giant Panda Base at opening time; by late morning the pandas are mostly asleep and the paths are crowded.',
      'Spring (March to May) and autumn (September to November) are the most comfortable months; summer is humid and hot, winter is grey but mild.',
      'Base yourself near Chunxi Road, Taikoo Li, or Kuanzhai Alley for walkable food and good metro access.',
      'Set up Alipay or WeChat Pay with a foreign card before you land, and carry a small amount of cash as backup.',
    ],
    sections: [
      {
        heading: '1. Why Chengdu deserves a place on a first China trip',
        paragraphs: [
          'Many first itineraries are built around Beijing and Shanghai, which deliver history and skyline but can feel intense. Chengdu offers a different kind of China: relaxed, food-obsessed, and surprisingly easy to navigate. It is the capital of Sichuan Province and a gateway to some of the country\'s best day trips, including the Leshan Giant Buddha and the mountain of Qingcheng.',
          'The headline attraction is the giant panda. Chengdu runs the best-known panda breeding and research facility in the world, and seeing pandas eat bamboo a few metres away is a highlight even for travelers who do not usually visit zoos. But visitors who stay more than a day tend to remember the rhythm of the city more than any single sight: people playing mahjong in parks, ear-cleaners walking between teahouse tables, and late-night queues for skewers.',
          'Chengdu is also one of the strongest food cities in Asia. It has been recognised by UNESCO as a City of Gastronomy, and the local cuisine goes far beyond "spicy". The characteristic flavour is mala: the numbing tingle of Sichuan pepper combined with chili heat. Once you learn to order around it, you can eat extremely well at almost any budget.',
        ],
      },
      {
        heading: '2. Best time to visit Chengdu',
        paragraphs: [
          'Spring, roughly March to May, brings mild temperatures and blossoms in parks and at the panda base. Autumn, September to November, is similarly comfortable and usually a little drier. These two windows are the best choice for walking-heavy itineraries.',
          'Summer, June to August, is hot and very humid, with frequent thunderstorms. Pandas spend more time indoors in air-conditioned enclosures, so morning visits matter even more. Winter, December to February, is rarely freezing, but the sky is often overcast and buildings are not always well heated, so pack layers.',
          'Avoid the Chinese national holidays if you can, especially the first week of October (Golden Week) and the Spring Festival period. Domestic travel peaks then, the panda base becomes extremely crowded, and hotel prices can double. Check the holiday calendar for your year before booking.',
        ],
      },
      {
        heading: '3. Getting there: flights, trains, and visa-free entry',
        paragraphs: [
          'Chengdu has two international airports. Tianfu International (TFU) is newer and handles most international flights; it is far from the centre, around one hour by metro Line 18 or 60 to 90 minutes by taxi. Shuangliu International (CTU) is closer, roughly 30 to 40 minutes from downtown by metro or taxi. Check which airport your ticket uses, because transferring between them takes well over an hour.',
          'High-speed trains connect Chengdu with Chongqing in about 1 to 1.5 hours, with Xi\'an in about 3.5 to 4.5 hours, and with Beijing or Shanghai in roughly 7 to 12 hours depending on the service. Foreigners can book on the official 12306 site or app using a passport, or through international agencies that charge a small fee.',
          'Entry rules have become much easier for many nationalities. China currently offers 30-day unilateral visa-free entry to citizens of a long list of countries (extended to 31 December 2026), and 240-hour (10-day) visa-free transit to citizens of 57 countries who enter at an eligible port and fly onward to a third country or region. Both Chengdu airports are eligible ports for visa-free transit, and the permitted area covers Chengdu plus ten other Sichuan cities, including Leshan. Rules change, so confirm your eligibility with the National Immigration Administration or your nearest Chinese embassy before booking.',
        ],
      },
      {
        heading: '4. Getting around: metro, taxis, and payments',
        paragraphs: [
          'The metro is clean, cheap, and well signed in English, and most single rides cost a few yuan. You can buy tokens at machines, but the simplest option is the transit QR code inside Alipay or WeChat (search for "Chengdu metro" in the app\'s mini-programs). Taxis and ride-hailing through the DiDi function inside Alipay are affordable for short trips; a typical inner-city ride is often 15 to 40 CNY.',
          'China is now heavily cashless. Foreign visitors can link an international Visa or Mastercard to Alipay or WeChat Pay and pay by scanning QR codes almost everywhere. At the time of writing, small transactions are usually free and larger ones may carry a fee of about 3%, so check the in-app terms. Carry a few hundred yuan in cash for the rare stall that cannot accept foreign-linked wallets.',
          'Install an offline translation app and a map that works in China. Many travelers use Amap (Gaode) or Apple Maps, since Google Maps data is often inaccurate there. A local eSIM or a roaming plan solves most connectivity issues; check in advance how your plan handles access to the services you rely on.',
        ],
      },
      {
        heading: '5. Where to stay in Chengdu',
        paragraphs: [
          'Chunxi Road and Taikoo Li are the commercial heart of the city. You get shopping, food courts, nightlife, and the Daci Temple within walking distance, plus several metro lines. This is the best choice if you want convenience and do not mind busy streets.',
          'Kuanzhai Alley and the People\'s Park area feel more traditional, with restored lanes, teahouses, and quieter side streets. It is a good base for travelers who want atmosphere and easy morning walks. Wenshu Monastery to the north offers a calm, local feel with cheaper guesthouses.',
          'Typical nightly rates (approximate, standard season): hostels and simple guesthouses 80 to 200 CNY (about 11 to 28 USD); comfortable mid-range hotels 300 to 600 CNY (about 42 to 85 USD); international upscale hotels 900 CNY and above (about 125 USD+). Confirm that your hotel accepts foreign guests; most mid-range and international chains do.',
        ],
      },
      {
        heading: '6. A practical 3-day Chengdu itinerary',
        paragraphs: [
          'Day 1 — Pandas and the old city. Take an early taxi or the metro to the Chengdu Research Base of Giant Panda Breeding and aim to be at the gate at opening time (usually around 7:30 am; check the official announcements). Tickets are roughly 55 CNY and must be booked online with your passport, often several days ahead during holidays. Spend two to three hours there, then return to the city for lunch. In the afternoon, visit People\'s Park and drink tea at the Heming teahouse, then walk through Kuanzhai Alley in the early evening and finish with hot pot.',
          'Day 2 — Temples, tea, and the city at night. Start at Wenshu Monastery, an active Buddhist temple with a well-known vegetarian restaurant. Next, visit the Wuhou Shrine and the adjacent Jinli Street, then the nearby Tibetan quarter for a contrasting neighbourhood. After dark, Taikoo Li and Chunxi Road are lively, and the Anshun Bridge area along the Jin River is lit up for evening walks. A Sichuan Opera show with face-changing is a popular, if touristy, evening option.',
          'Day 3 — Day trip. Choose one: the Leshan Giant Buddha (about 1 hour by high-speed train each way, plus local bus or taxi), the Dujiangyan irrigation system and Mount Qingcheng (about 1 hour by train), or, for a short trip, Huanglongxi ancient town. Leshan is the most dramatic; arrive early, because the descending stairway beside the Buddha can involve a long queue. Return to Chengdu for a final dinner of skewers (chuan chuan) or dan dan noodles.',
        ],
      },
      {
        heading: '7. What to eat and how to order',
        paragraphs: [
          'Hot pot is the signature meal. You choose a broth (spicy, mild, or a split "yuanyang" pot with both), then order raw ingredients to cook at the table. If spice is a concern, ask for "wei la" (slightly spicy) or the split pot. Expect roughly 80 to 150 CNY per person at a popular chain.',
          'Other essentials include mapo tofu, twice-cooked pork, kung pao chicken in its original form, dan dan noodles, zhong dumplings in chili oil, and rabbit dishes, which are a local specialty. Chuan chuan xiang, skewers cooked in a communal broth and charged by the stick, is one of the most fun and affordable meals in the city.',
          'For breakfast, look for steamed buns and bowls of noodles near any metro station; 10 to 20 CNY is enough. Many restaurants use QR-code ordering at the table, which works through Alipay or WeChat, and often has photos even if the text is in Chinese. A translation app with camera mode makes paper menus easy.',
        ],
      },
      {
        heading: '8. Budget: what three days in Chengdu really cost',
        paragraphs: [
          'All figures are approximate per person per day, excluding international flights, and assume 1 USD ≈ 7.1 CNY. Exchange rates and prices change, so treat these as planning ranges.',
          'Budget traveler: 250 to 400 CNY (about 35 to 55 USD) — hostel bed or simple room, street food and noodle shops, metro only, one paid attraction.',
          'Mid-range traveler: 600 to 1,000 CNY (about 85 to 140 USD) — comfortable hotel, sit-down meals including hot pot, a mix of metro and ride-hailing, the panda base and a day trip.',
          'Comfort traveler: 1,500 CNY and up (about 210 USD+) — international hotel, private driver for the day trip, and upscale dining.',
        ],
      },
      {
        heading: '9. Practical tips and common mistakes',
        paragraphs: [
          'Book the panda base online in advance using your passport, and bring the same passport on the day; tickets are tied to the document.',
          'Do not plan the panda base for the afternoon. Pandas are most active around feeding time in the morning, and many visitors leave disappointed after a midday visit.',
          'Check which airport you fly into and leave plenty of time to reach Tianfu, which is far from the centre.',
          'Mala heat builds over a meal. Start mild, order rice or a cold drink to balance it, and ask for less oil if you have a sensitive stomach.',
          'Keep your passport on you: train stations, some attractions, and hotels require it, and police registration is handled by your hotel.',
        ],
      },
    ],
    faq: {
      question: 'How many days do I need in Chengdu?',
      answer:
        'Three days is ideal for a first visit: one day for the pandas and the old city, one for temples, teahouses, and nightlife, and one for a day trip to Leshan or Dujiangyan. Two days is enough if you skip the day trip.',
    },
    internalLinks: [
      { slug: 'beijing-shanghai-chengdu-first-trip-comparison', anchor: 'See how Chengdu compares with Beijing and Shanghai' },
      { slug: 'chongqing-travel-guide-first-trip', anchor: 'Continue to Chongqing, about an hour away by high-speed train' },
      { slug: 'china-visa-payment-checklist-first-timers', anchor: 'Finish your visa and payment setup before you fly' },
      { slug: 'best-time-to-visit-china-first-trip', anchor: 'Check seasonal windows across China' },
    ],
    updateSummary: [
      'New guide: complete first-visit plan for Chengdu with a 3-day itinerary and budget bands.',
      'Visa-free transit and payment details checked against official sources in November 2026.',
    ],
    sources: [
      { name: 'National Immigration Administration of China', url: 'https://en.nia.gov.cn/n147418/n147463/c183412/content.html', note: '240-hour visa-free transit countries, ports, and permitted areas.' },
      { name: 'Gov.cn: visa-free access extension', url: 'https://english.www.gov.cn/news/202511/04/content_WS69094ae0c6d00ca5f9a07472.html', note: 'Unilateral visa-exemption extended to 31 December 2026.' },
      { name: 'Chengdu Research Base of Giant Panda Breeding', url: 'https://www.panda.org.cn/', note: 'Official opening hours and ticket reservations.' },
      { name: 'UNESCO Creative Cities Network', url: 'https://en.unesco.org/creative-cities/chengdu', note: 'Chengdu City of Gastronomy designation.' },
    ],
    reviewer: REVIEWER_TEAM_NAME,
  },
  {
    slug: 'xian-travel-guide-first-trip',
    title: "Xi'an Travel Guide for First-Time Visitors: Terracotta Army, City Wall, and a 3-Day Plan",
    titleVariants: {
      A: "Xi'an Travel Guide for First-Time Visitors",
      B: "Xi'an in 3 Days: Terracotta Warriors, Muslim Quarter Food, and the Ancient Wall",
    },
    description:
      "Plan a first trip to Xi'an: best season, visa-free transit, getting to the Terracotta Army without a tour, where to stay inside or outside the wall, food to try, a 3-day itinerary, and realistic budgets.",
    intro:
      "Xi'an was the capital of China for more than a thousand years and the eastern starting point of the Silk Road. Today it is one of the few places where you can cycle on a complete Ming-dynasty city wall in the morning and stand in front of a 2,200-year-old clay army in the afternoon. This guide shows how to see the essentials without rushing or overpaying.",
    keyPoints: [
      'Reserve Terracotta Army tickets online with your passport, and go early on a weekday.',
      'Stay inside or just outside the city wall so most sights are walkable.',
      "Spring and autumn are the best seasons; summer is hot and winter can be cold with occasional smog.",
      'The Muslim Quarter is the food highlight, but the best stalls are often on the side streets rather than the main lane.',
    ],
    sections: [
      {
        heading: "1. Why Xi'an belongs on a first China trip",
        paragraphs: [
          "If Beijing shows you imperial China, Xi'an shows you where it began. Thirteen dynasties ruled from here, including the Qin, which first unified the country, and the Tang, often seen as a golden age of Chinese culture. The result is a city layered with history at a very walkable scale.",
          "The Terracotta Army is the famous draw: thousands of life-size soldiers, horses, and chariots buried to guard the tomb of the first emperor, Qin Shi Huang. Seeing the first pit for the first time is one of the most memorable moments in Chinese travel. But Xi'an also rewards travelers who stay longer than the obligatory day trip, with its intact city wall, a lively Hui Muslim food district, and some of the country's best history museums.",
          "Compared with Beijing and Shanghai, Xi'an is cheaper, more compact, and easier to combine with other destinations by high-speed rail. It works well as a second stop after Beijing or as a link between Beijing and Chengdu.",
        ],
      },
      {
        heading: "2. Best time to visit Xi'an",
        paragraphs: [
          'April to May and September to October offer mild temperatures and generally clear skies, ideal for cycling the wall and long walking days.',
          'June to August is hot, often above 35°C, so schedule outdoor sights for early morning and evening and spend the middle of the day in museums. December to February is cold and dry, sometimes with poor air quality, but crowds at the Terracotta Army are much smaller, and the Spring Festival lantern displays on the wall can be spectacular.',
          'As elsewhere in China, avoid the October Golden Week and the main Spring Festival travel days if you dislike crowds; the Terracotta Army museum can reach its daily visitor cap.',
        ],
      },
      {
        heading: '3. Getting there and entry rules',
        paragraphs: [
          "Xi'an Xianyang International Airport (XIY) has direct flights from several Asian and European cities and good domestic connections. Metro Line 14 links the airport to the city; plan on about an hour to the centre. A taxi takes roughly 45 to 60 minutes depending on traffic.",
          "High-speed rail is often more convenient than flying. Beijing to Xi'an North takes about 4.5 to 6 hours, Chengdu about 3.5 to 4.5 hours, and Luoyang (for the Longmen Grottoes) about 1.5 hours. Xi'an North station is outside the wall but connected by metro Lines 2 and 4.",
          "Many travelers can now visit without a visa. China grants 30-day visa-free entry to citizens of a long list of countries (currently extended to 31 December 2026) and 240-hour visa-free transit to citizens of 57 countries who continue to a third country or region. Xianyang airport is an eligible transit port, and the permitted area covers the whole of Shaanxi Province. Always confirm the latest rules with official sources before you travel.",
        ],
      },
      {
        heading: '4. Getting around and paying',
        paragraphs: [
          'Inside the wall, most sights are within walking distance or a short metro ride. Metro Lines 2 and 6 cross the old city, and rides cost a few yuan. Public bike-share is convenient for short hops and can be unlocked through Alipay.',
          "To reach the Terracotta Army, take a high-speed train from Xi'an North to Lintong South, then a local bus or taxi; or take the public tourist bus from the east square of Xi'an Railway Station, which takes about an hour. Ignore people at the station who claim the official bus is full and offer private transport; this is a well-known tout tactic.",
          'Set up Alipay or WeChat Pay with an international card before arriving, since most vendors in the Muslim Quarter and at museums expect QR payments. Keep some cash for small stalls just in case.',
        ],
      },
      {
        heading: "5. Where to stay in Xi'an",
        paragraphs: [
          'Around the Bell Tower and Drum Tower: the most central option, steps from the Muslim Quarter, with many hotels in every price class. It is busy at night but very convenient.',
          'Near the South Gate (Yongningmen) and the Forest of Stone Steles: slightly quieter, with an artsy, traditional feel and easy access to the wall. A good choice for couples and repeat visitors.',
          'Qujiang and the Big Wild Goose Pagoda area: outside the wall to the south, modern and well-lit, with the Tang-themed Datang Everbright City walking street. Hotels here are newer, but you will rely more on the metro.',
          'Approximate nightly rates: hostels 60 to 150 CNY (about 8 to 21 USD), mid-range hotels 250 to 500 CNY (about 35 to 70 USD), upscale 700 CNY and up (about 100 USD+).',
        ],
      },
      {
        heading: "6. A practical 3-day Xi'an itinerary",
        paragraphs: [
          "Day 1 — The old city. Begin with the city wall in the morning: walk or rent a bike for the 13.7 km loop (about 2 to 3 hours by bike). Entry is roughly 54 CNY. After lunch, visit the Forest of Stone Steles museum near the South Gate, then the Bell and Drum Towers. In the evening, eat your way through the Muslim Quarter and the Great Mosque area.",
          'Day 2 — Terracotta Army. Leave early to reach the museum near opening time. Admission is roughly 120 CNY in the main season and includes the Qin Shi Huang mausoleum site; book online with your passport. Visit Pit 1 last if you want to end on the most impressive view, or first if you want to beat the crowds. Allow at least three to four hours. On the way back, stop at Huaqing Palace if you still have energy, then rest in the evening.',
          'Day 3 — Museums and the Tang city. Book the Shaanxi History Museum in advance; free tickets for the main exhibition sell out quickly, and the special treasure galleries charge extra. Afterwards, walk to the Big Wild Goose Pagoda. Stay into the evening for the fountain show (schedule varies) and the illuminated Datang Everbright City.',
        ],
      },
      {
        heading: "7. What to eat in Xi'an",
        paragraphs: [
          "Xi'an is a noodle city. Biangbiang noodles are wide, hand-pulled ribbons topped with chili oil and garlic. Roujiamo, sometimes called the Chinese burger, is shredded braised meat in a crisp flatbread; in the Muslim Quarter, it is usually beef or lamb.",
          'Yangrou paomo is a lamb soup into which you tear flatbread yourself; ask the staff how small to break it. Liangpi, cold wheat or rice noodles in a sour and spicy sauce, is perfect in summer. Persimmon cakes and lamb skewers round out a street-food evening.',
          'A satisfying meal at a local noodle shop costs 15 to 35 CNY. A full evening of grazing in the Muslim Quarter is usually 60 to 120 CNY per person. Prices on the main tourist lane are higher than on the side streets.',
        ],
      },
      {
        heading: "8. Budget for three days in Xi'an",
        paragraphs: [
          'Approximate per person per day, excluding flights, at about 7.1 CNY per USD:',
          'Budget: 200 to 350 CNY (about 28 to 50 USD) — hostel, street food, public bus to the Terracotta Army.',
          'Mid-range: 500 to 900 CNY (about 70 to 125 USD) — central hotel, sit-down meals, high-speed train or taxi to Lintong, audio guides.',
          'Comfort: 1,300 CNY and up (about 180 USD+) — upscale hotel, private driver and licensed guide for the Terracotta Army, show tickets.',
        ],
      },
      {
        heading: '9. Practical tips and common mistakes',
        paragraphs: [
          'Hire guides only at the official counter inside the Terracotta Army site or through your hotel. Unlicensed guides and drivers outside often add shopping stops.',
          'Book the Shaanxi History Museum the moment reservations open, typically several days ahead.',
          'Drink plenty of water while cycling the wall; there is little shade.',
          'Muslim Quarter restaurants are halal; do not bring pork or alcohol into them.',
          'If you continue to Chengdu or Beijing, book the high-speed train ahead of holidays, when seats sell out.',
        ],
      },
    ],
    faq: {
      question: "Is one day enough for Xi'an?",
      answer:
        "One day is enough only for the Terracotta Army. Two days lets you add the city wall and the Muslim Quarter, and three days is ideal for including the Shaanxi History Museum and the Big Wild Goose Pagoda without rushing.",
    },
    internalLinks: [
      { slug: 'best-city-to-visit-in-china-first-time', anchor: "See where Xi'an fits among first-trip cities" },
      { slug: 'how-many-days-in-first-china-city', anchor: 'Choose a 3-, 4-, or 5-day structure' },
      { slug: 'china-visa-payment-checklist-first-timers', anchor: 'Prepare visa and mobile payments before travel' },
    ],
    updateSummary: [
      "New guide: complete first-visit plan for Xi'an with a 3-day itinerary and budget bands.",
      'Entry rules checked against official sources in November 2026.',
    ],
    sources: [
      { name: 'National Immigration Administration of China', url: 'https://en.nia.gov.cn/n147418/n147463/c183412/content.html', note: 'Visa-free transit ports and permitted areas.' },
      { name: 'Emperor Qinshihuang\'s Mausoleum Site Museum', url: 'http://www.bmy.com.cn/', note: 'Official tickets and opening hours.' },
      { name: 'Shaanxi History Museum', url: 'https://www.sxhm.com/', note: 'Reservation rules for free and paid galleries.' },
      { name: 'UNESCO World Heritage: Mausoleum of the First Qin Emperor', url: 'https://whc.unesco.org/en/list/441', note: 'Historical background.' },
    ],
    reviewer: REVIEWER_TEAM_NAME,
  },
  {
    slug: 'guilin-yangshuo-travel-guide-first-trip',
    title: 'Guilin and Yangshuo Travel Guide: Li River, Karst Peaks, and a 3-Day Plan',
    titleVariants: {
      A: 'Guilin and Yangshuo Travel Guide for First-Time Visitors',
      B: 'Guilin vs Yangshuo: Where to Stay, How to Cruise the Li River, and a 3-Day Plan',
    },
    description:
      'A first-timer guide to Guilin and Yangshuo: when to go, visa-free entry, Li River cruise versus bamboo raft, where to stay, cycling routes, local food, a 3-day itinerary, budgets in CNY and USD, and scams to avoid.',
    intro:
      "The limestone peaks around Guilin are the landscape printed on China's 20-yuan note, and in person they look even less real. This region is the best antidote to big-city fatigue on a first China trip: river cruises, cycling between rice fields, and evenings in a lively small town. Here is how to plan it well.",
    keyPoints: [
      'Use Guilin as the transport hub and Yangshuo as the base for scenery and outdoor activities.',
      'April to October is green and lush but rainy at times; September to November is often the sweet spot.',
      'Choose between a Li River cruise (relaxing, longer stretch) and a Yulong River bamboo raft (quiet, closer to the water).',
      'Book river trips through official channels or your hotel to avoid inflated "discount" offers.',
    ],
    sections: [
      {
        heading: '1. Why Guilin and Yangshuo are worth the detour',
        paragraphs: [
          'Most of China\'s headline cities are about history or urban energy. Guilin and Yangshuo are about landscape. Thousands of steep, rounded karst peaks rise from flat farmland and rivers, creating scenery that has inspired Chinese painters and poets for centuries.',
          'The two places complement each other. Guilin is a mid-size city with the airport and high-speed rail station, a few pleasant parks, and good food. Yangshuo, about 60 km downstream, is a small town surrounded by the most photogenic countryside, with cycling, hiking, rock climbing, and river rafting right outside the door.',
          'For first-time visitors, the region also offers a gentler pace. After several days in Beijing or Shanghai, two or three days of fresh air and open views can make the whole trip feel more balanced.',
        ],
      },
      {
        heading: '2. Best time to visit',
        paragraphs: [
          'The region is subtropical. April to June is green but rainy, and river levels can be high. July and August are hot and humid with heavy showers, though the landscape is at its most lush. September to November is usually the best balance of clear skies, comfortable temperatures, and good river levels, though water can drop late in the season.',
          'Winter, December to February, is cool and often misty. The mist can make the peaks look like an ink painting, but some days are grey and cold, and boats may run on shortened routes when the water is low.',
          'Domestic tourism peaks during the October Golden Week, the May Day holiday, and summer school holidays. Book accommodation and cruises early for those dates.',
        ],
      },
      {
        heading: '3. Getting there and entry rules',
        paragraphs: [
          'Guilin Liangjiang International Airport (KWL) has domestic flights from most major cities and some international routes in Asia. An airport shuttle bus or taxi reaches central Guilin in 40 to 60 minutes. Direct buses also go to Yangshuo.',
          'High-speed trains reach Guilin from Guangzhou in about 2.5 to 3 hours, from Shenzhen or Hong Kong West Kowloon in about 3 to 3.5 hours, and from Shanghai or Beijing in a long day of travel. Yangshuo has its own high-speed station about 30 minutes from town, which is convenient if you skip Guilin entirely.',
          'Guilin airport is an eligible port for 240-hour visa-free transit, and the permitted area includes Guilin and eleven other cities in Guangxi. Many travelers can also use China\'s 30-day unilateral visa-free entry, currently extended to 31 December 2026. Confirm your eligibility with official sources before booking.',
        ],
      },
      {
        heading: '4. Getting around: rivers, bikes, and payments',
        paragraphs: [
          'The classic Li River cruise runs from piers south of Guilin to Yangshuo and takes about four to five hours. Ticket prices vary widely by boat class, from roughly 215 to 450 CNY or more per person including the bus back. The alternative is a shorter bamboo-style raft on the Xingping to Nine Horses stretch, which covers the 20-yuan note view.',
          'In Yangshuo, rent a bicycle or electric scooter and ride along the Yulong River countryside. Bike rental is roughly 20 to 50 CNY a day; e-bikes cost more. Ride-hailing through DiDi in Alipay works in both Guilin and Yangshuo for longer distances.',
          'As in the rest of China, link a foreign card to Alipay or WeChat Pay before arrival. Small rural vendors and raft operators sometimes prefer cash, so carry a few hundred yuan.',
        ],
      },
      {
        heading: '5. Where to stay: Guilin or Yangshuo?',
        paragraphs: [
          'If you have only one night, stay in Yangshuo. It puts you next to the countryside, and West Street offers plenty of restaurants and nightlife, though it can be loud and touristy.',
          'For quieter nights, choose a guesthouse in the countryside along the Yulong River or near Xingping, many of which have terraces facing the peaks. They are often the most memorable stays of a China trip, but you will need a taxi or bike to reach town.',
          'Stay in Guilin if you arrive late or leave early by plane, or if you want a city base with more hotel choice. The Two Rivers and Four Lakes area in the centre is pleasant in the evening.',
          'Approximate nightly rates: guesthouses 150 to 350 CNY (about 21 to 50 USD), boutique countryside hotels 400 to 900 CNY (about 55 to 125 USD), upscale resorts 1,200 CNY and up (about 170 USD+).',
        ],
      },
      {
        heading: '6. A practical 3-day itinerary',
        paragraphs: [
          'Day 1 — Guilin city. Arrive in Guilin and visit Elephant Trunk Hill, the city\'s emblem, then Reed Flute Cave with its illuminated rock formations. In the evening, walk around the lakes in the centre and try Guilin rice noodles.',
          'Day 2 — Li River to Yangshuo. Take the morning cruise from Guilin to Yangshuo, enjoying the most famous stretch of scenery from the deck. Check into your hotel, then walk West Street or watch the outdoor performance "Impression Liu Sanjie", staged on the river with the peaks lit up as a backdrop.',
          'Day 3 — Countryside and viewpoints. Cycle along the Yulong River in the morning, and take a bamboo raft for part of the way. In the late afternoon, climb Moon Hill or the Xianggong Hill viewpoint for sunset over the peaks (Xianggong is best at sunrise). Alternatively, go to Xingping for the 20-yuan note view and an old riverside village.',
          'Optional fourth day: the Longji (Dragon\'s Backbone) rice terraces, about two hours from Guilin, are spectacular in late spring and early autumn.',
        ],
      },
      {
        heading: '7. What to eat',
        paragraphs: [
          'Guilin rice noodles are the breakfast of choice: soft round noodles in a savoury broth with braised meat, pickles, and peanuts. A bowl costs about 8 to 15 CNY.',
          'In Yangshuo, the signature dish is beer fish: river fish cooked in a sauce made with local beer, tomato, and chili. Ask for the price per jin (500 g) before choosing your fish, because this is a common place for surprise bills. Stuffed river snails and stuffed vegetables (niang) are also local specialties.',
          'Expect 50 to 120 CNY per person for a sit-down dinner in Yangshuo, less in Guilin.',
        ],
      },
      {
        heading: '8. Budget for three days',
        paragraphs: [
          'Approximate per person per day, excluding long-distance transport, at about 7.1 CNY per USD:',
          'Budget: 250 to 400 CNY (about 35 to 55 USD) — guesthouse, noodles and simple meals, bike rental, raft instead of a full cruise.',
          'Mid-range: 600 to 1,000 CNY (about 85 to 140 USD) — boutique countryside hotel, Li River cruise, an evening show.',
          'Comfort: 1,500 CNY and up (about 210 USD+) — resort hotel, private driver, upper-class cruise.',
        ],
      },
      {
        heading: '9. Practical tips and common mistakes',
        paragraphs: [
          'Buy cruise tickets through the official platform, a trusted agency, or your hotel, and check exactly which stretch of river and boat type you are paying for.',
          'Check river levels before your trip in late autumn and winter; low water can shorten routes.',
          'Bring sun protection and rain gear year-round, and waterproof bags for raft trips.',
          'Confirm prices before ordering food or hiring a raft, and agree on the end point in advance.',
          'Do not try to fit Guilin, Yangshuo, and the rice terraces into two days; three to four days is a much better pace.',
        ],
      },
    ],
    faq: {
      question: 'Should I stay in Guilin or Yangshuo?',
      answer:
        'Stay in Yangshuo for most of your time, because the best scenery and outdoor activities are right outside town. Use Guilin mainly as an arrival and departure point, or for one night if your flight times require it.',
    },
    internalLinks: [
      { slug: 'best-china-cities-by-travel-style', anchor: 'See which travel styles suit landscape destinations' },
      { slug: 'zhangjiajie-travel-guide-first-trip', anchor: 'Compare the Li River karst with Zhangjiajie\'s sandstone pillars' },
      { slug: 'guangzhou-travel-guide-first-trip', anchor: 'Start or finish in Guangzhou, a few hours away by high-speed train' },
      { slug: 'best-time-to-visit-china-first-trip', anchor: 'Compare seasons across China' },
      { slug: 'china-first-trip-budget-by-city', anchor: 'Compare budgets with other first-trip cities' },
    ],
    updateSummary: [
      'New guide: Guilin and Yangshuo plan with cruise options, 3-day itinerary, and budget bands.',
      'Entry rules checked against official sources in November 2026.',
    ],
    sources: [
      { name: 'National Immigration Administration of China', url: 'https://en.nia.gov.cn/n147418/n147463/c183412/content.html', note: 'Visa-free transit ports, including Guilin Liangjiang.' },
      { name: 'Gov.cn: visa-free access extension', url: 'https://english.www.gov.cn/news/202511/04/content_WS69094ae0c6d00ca5f9a07472.html', note: 'Unilateral visa-exemption through 2026.' },
      { name: 'UNESCO World Heritage: South China Karst', url: 'https://whc.unesco.org/en/list/1248', note: 'Guilin karst inscription background.' },
    ],
    reviewer: REVIEWER_TEAM_NAME,
  },
{
  "slug": "hangzhou-travel-guide-first-trip",
  "title": "Hangzhou Travel Guide for First-Time Visitors: West Lake, Tea, and a 3-Day Plan",
  "titleVariants": {
    "A": "Hangzhou Travel Guide for First-Time Visitors",
    "B": "Hangzhou in 3 Days: West Lake, Longjing Tea, and the Grand Canal"
  },
  "description": "A first-visit Hangzhou plan: when to go, visa-free entry, mobile payments, where to stay near West Lake, what to eat, a 3-day itinerary, approximate budgets in CNY and USD, and mistakes to avoid.",
  "intro": "Hangzhou is the city Chinese travelers name when they want a lake, a walk, and a slower afternoon. West Lake sits against low hills on the west side of town, and the rest of the city is a large, wealthy provincial capital with fast trains to Shanghai. This guide is a three-day plan that keeps the lake, the tea hills, and one older street, without trying to see every pavilion.",
  "keyPoints": [
    "Walk the lake. The shoreline, causeways, and parks are free; boats, pagodas, and a few gardens are the parts that charge.",
    "Late March to May and September to early November are the easiest months for walking. June is often rainy, and July and August are hot.",
    "Stay near the eastern or southern shore if you want to walk to the lake, or near Hangzhou East station if the train timetable matters more.",
    "Bind a foreign card in Alipay or WeChat Pay before you land. Hangzhou is one of the most thoroughly cashless cities in the country."
  ],
  "sections": [
    {
      "heading": "1. Why Hangzhou is worth a first trip",
      "paragraphs": [
        "West Lake is not a single viewpoint. It is a designed landscape: two long causeways, three small islands, and a ring of hills that poets have been writing about since the Tang dynasty. UNESCO inscribed the West Lake Cultural Landscape in 2011 because that human shaping of the shore, not just the water, is the point. You feel it on an ordinary morning, when people are jogging the Bai Causeway and the far shore is still in haze.",
        "The city around the lake is useful in a way the poems do not mention. Hangzhou is the capital of Zhejiang, a high-speed rail junction, and the place where Alipay was built, so day-to-day logistics are smoother than in many older tourist towns. You can arrive from Shanghai after breakfast and be on the causeway before lunch. That combination, a famous landscape plus easy transport, is why Hangzhou works as a first China stop or as a two-night break from Shanghai.",
        "It is also a food and tea city, not only a scenery city. Longjing, the green tea grown in the hills just west of the lake, is sold everywhere and is easy to waste money on. The dishes associated with the lake, vinegar fish, Dongpo pork, and shrimp cooked with tea, are restaurant food rather than street snacks. Plan one proper meal and keep the rest simple."
      ]
    },
    {
      "heading": "2. Best time to visit Hangzhou",
      "paragraphs": [
        "March, April, and May are the classic months. Peach and cherry blossoms show up around the lake, temperatures are comfortable for a full day outside, and the hills are green rather than brown. September through early November is the other good window. Osmanthus trees flower in late September and October, and the scent carries across the southern shore on still evenings.",
        "June is the plum-rain period. Days can be grey, sticky, and wet even when the forecast looks mild. July and August are hot and humid, often above 35°C, and the lake paths have little shade at midday. Winter is rarely severe, but it is damp, and some days the hills disappear. The lake is still worth a walk; just do not build the trip around sunset colours.",
        "National Day at the start of October, the May Day holiday, and weekends with a flower festival fill the causeways and the reservation slots at Lingyin. If those dates are your only option, stay one night longer and do the lake at opening time."
      ]
    },
    {
      "heading": "3. Getting there and entry rules",
      "paragraphs": [
        "Hangzhou Xiaoshan International Airport (HGH) handles domestic flights and a growing set of international routes. The airport metro and airport buses reach the city; allow about an hour to the lake, longer in evening traffic. Hangzhou East is the main high-speed station. Trains from Shanghai Hongqiao often take roughly 45 to 75 minutes. Trains from Suzhou, Nanjing, and Huangshan North are routine daytime rides. Book on the official 12306 site or app with your passport.",
        "Many visitors can enter China without a visa. A unilateral visa-free stay of up to 30 days, for citizens of the countries on the current list, has been extended through 31 December 2026. Separately, nationals of 57 countries can use 240-hour visa-free transit if they hold an onward ticket to a third country or region and stay inside the published area. Hangzhou Xiaoshan is an eligible transit port. The permitted area is a defined list, not \"anywhere in China\", so read the National Immigration Administration page before you plan a side trip that leaves Zhejiang.",
        "A Hangzhou trip pairs cleanly with Shanghai or Suzhou because those cities sit inside the same broad Yangtze River Delta transport network. If you are on a 240-hour transit stay, confirm that every overnight stop is inside the permitted area before you buy the train ticket. A standard visa or the 30-day visa-free entry is the simpler choice if you want to add Huangshan, which is in Anhui."
      ]
    },
    {
      "heading": "4. Getting around and paying",
      "paragraphs": [
        "The metro covers the lake's eastern edge, Hangzhou East, the railway station, and Xiaoshan. Single rides cost a few yuan. Inside Alipay or WeChat, the local transit QR code is the least fussy way to ride. Buses around the lake are slow at weekends. A hired bicycle, or one of the dockless bikes unlocked in Alipay, is the better tool for the causeways. The Bai Causeway is flat. The hills behind the lake are not.",
        "Taxis and DiDi, the ride-hailing service inside Alipay, are inexpensive by European or US standards. A cross-town ride is often 20 to 50 CNY outside rush hour. Drivers rarely expect a tip. Agree on the app price rather than a verbal \"special tour\" price offered outside a station.",
        "Link an international Visa, Mastercard, or other supported card in Alipay or WeChat Pay before arrival, and try a tiny payment at the airport so you know the card works. Fee rules are shown in the app and can differ for small and larger amounts. Carry a few hundred yuan in cash. Most cafes will never ask for it, but a tea farmer on a hillside path might."
      ]
    },
    {
      "heading": "5. Where to stay in Hangzhou",
      "paragraphs": [
        "The east shore around Hubin and the south-east corner near Nanshan Road put you within walking distance of the lake and of restaurants. Rooms here cost more, and weekend traffic is real, but you will not spend the morning on a metro just to start your walk. Hefang Street, a restored commercial lane just east of the lake, is lively and a little staged; it is a convenient base if you want street food at night.",
        "Hangzhou East station suits a one-night train stop. Hotels in that district are newer and often cheaper, and you give up the morning walk. The Xixi wetland side, to the west, is quieter and greener, with a longer ride to the classic viewpoints.",
        "Approximate nightly rates in a normal season, excluding holiday spikes: simple guesthouses 150 to 300 CNY (about 21 to 42 USD); comfortable mid-range hotels 400 to 800 CNY (about 55 to 110 USD); lake-view and international hotels 1,000 CNY and up (about 140 USD+). Golden Week can double the lake-side rates. Confirm the hotel accepts foreign guests when you book."
      ]
    },
    {
      "heading": "6. A practical 3-day Hangzhou itinerary",
      "paragraphs": [
        "Day 1 is the lake, done in one direction so you are not circling. Start at Broken Bridge on the north-east shore, walk the Bai Causeway to the far side, and continue toward the Su Causeway if your legs are willing. Leifeng Pagoda, on the south shore, is a paid climb with a wide view back over the water. A boat to the mid-lake island of Three Pools Mirroring the Moon is worth it on a clear day and skippable in thick rain. Evening is for a slow loop of the east shore. The music fountain near Hubin runs on a posted schedule and is crowded; watch it once and leave.",
        "Day 2 is the hills. Lingyin and the Feilai Feng cliffs sit west of the lake. From 1 December 2025 the scenic area, including Lingyin Temple, dropped the old combined entrance charge and switched to free entry with a real-name, timed reservation and a daily visitor cap. Book the day before, and go in the morning slot. Afterwards, continue into the Longjing tea hills. Meijiawu and the villages above it are close enough for a taxi. Taste tea, then buy a small tin only after you have seen a price in a shop with a listed grade, not from someone who stops you on the path.",
        "Day 3 is the city that is not the lake. The Grand Canal has a museum and a walking stretch in Gongshu, north of the centre, which shows Hangzhou as a trading city rather than a postcard. If you would rather leave town, a high-speed train to Suzhou takes about an hour and a half or less depending on the stop pattern, and you can be in a garden by late morning. Wuzhen, a canal town to the north, is the other common day trip. Pick one. Doing Suzhou and Wuzhen and the lake in the same day is how people end up seeing all three from a bus window."
      ]
    },
    {
      "heading": "7. What to eat in Hangzhou",
      "paragraphs": [
        "West Lake vinegar fish is carp or grass carp with a sweet-sour sauce. Dongpo pork is a square of belly braised until the fat goes quiet, named after the Song-dynasty poet Su Dongpo, who was once a local official. Shrimp stir-fried with Longjing tea is a spring dish and a bit of a performance; order it at a sit-down restaurant, not as your only meal. A more ordinary and very good breakfast is a bowl of pian'er chuan, small wontons in a light broth, or noodles from a shop near the metro.",
        "A noodle or wonton breakfast is often 15 to 30 CNY. A mid-range restaurant meal with one lake dish and rice is often 80 to 150 CNY per person. The famous restaurants next to the water charge more for the address than for a better fish. If a tea shop quotes a very low price for \"authentic Longjing\", assume you are looking at a lower grade or a different green tea with a famous name on the tin."
      ]
    },
    {
      "heading": "8. Budget for three days in Hangzhou",
      "paragraphs": [
        "Figures are approximate, per person per day, excluding long-distance trains and international flights, at about 7.1 CNY to 1 USD. They move with the season and the exchange rate.",
        "Budget: 300 to 450 CNY (about 42 to 65 USD). A simple room away from the shore, noodles and one restaurant meal, metro and a bike, free lake walking, and the Lingyin reservation.",
        "Mid-range: 700 to 1,200 CNY (about 100 to 170 USD). A hotel within walking distance of the lake, a boat ticket, taxis when the hills call for them, and one serious dinner.",
        "Comfort: 1,800 CNY and up (about 250 USD+). A lake-view room, a private car for the tea villages, and meals at the better-known restaurants."
      ]
    },
    {
      "heading": "9. Practical tips and common mistakes",
      "paragraphs": [
        "Do not try to \"finish\" West Lake. The Ten Scenes are a literary list, not a checklist you owe anyone. Two causeways, one pagoda, and a boat or a hill path are a full day.",
        "Reserve Lingyin before you go, and carry the same passport you used to book. Showing up at a peak weekend without a slot is how a free temple becomes a wasted morning.",
        "Keep holiday dates off the lake if you can. The paths are wide, but the photo stops at Broken Bridge and Leifeng lock up.",
        "Buy tea in grams, not in souvenir chests. A 50-gram tin of a mid grade is enough to know whether you like it.",
        "If you add Suzhou or Huangshan, book the train when you book the hotel. Friday afternoon trains toward Shanghai fill up first."
      ]
    }
  ],
  "faq": {
    "question": "Is Hangzhou worth it if I am already going to Shanghai?",
    "answer": "Yes, if you have two or three nights. Shanghai is a river metropolis. Hangzhou is a lake, a set of hills, and a much quieter evening. The train is short enough that Hangzhou works as the second city rather than as a rushed day trip."
  },
  "internalLinks": [
    {
      "slug": "suzhou-classical-gardens-travel-guide",
      "anchor": "Add Suzhou if you want classical gardens after the lake"
    },
    {
      "slug": "huangshan-travel-guide-first-trip",
      "anchor": "Continue to Huangshan when you want a mountain overnight"
    },
    {
      "slug": "beijing-vs-shanghai-for-first-trip",
      "anchor": "Compare Shanghai with Beijing before you lock the first city"
    },
    {
      "slug": "china-visa-payment-checklist-first-timers",
      "anchor": "Set up visa and mobile payments before you travel"
    }
  ],
  "updateSummary": [
    "New guide: first-visit Hangzhou plan with a 3-day itinerary, tea-hill advice, and budget bands.",
    "Entry rules and Lingyin reservation notes checked against official sources in November 2026."
  ],
  "sources": [
    {
      "name": "UNESCO World Heritage: West Lake Cultural Landscape of Hangzhou",
      "url": "https://whc.unesco.org/en/list/1334/",
      "note": "Inscription and description of the lake landscape."
    },
    {
      "name": "Xinhua: Lingyin and Feilai Feng free entry",
      "url": "https://www.news.cn/20251119/72b13e875f2f434b94365ba8c31d7fc8/c.html",
      "note": "Free admission from 1 December 2025 and reservation caps."
    },
    {
      "name": "National Immigration Administration of China",
      "url": "https://en.nia.gov.cn/n147418/n147463/c183412/content.html",
      "note": "240-hour visa-free transit rules, updated 20 August 2026."
    },
    {
      "name": "Gov.cn: visa-free access extension",
      "url": "https://english.www.gov.cn/news/202511/04/content_WS69094ae0c6d00ca5f9a07472.html",
      "note": "Unilateral visa-exemption extended through 31 December 2026."
    }
  ],
  reviewer: REVIEWER_TEAM_NAME
},
{
  "slug": "suzhou-classical-gardens-travel-guide",
  "title": "Suzhou Travel Guide for First-Time Visitors: Classical Gardens and a 3-Day Plan",
  "titleVariants": {
    "A": "Suzhou Travel Guide for First-Time Visitors",
    "B": "Suzhou in 3 Days: Gardens, Canals, and a Night at the Master of the Nets"
  },
  "description": "Plan a first trip to Suzhou: which classical gardens to book, when to go, how to arrive via Shanghai, where to stay, what to eat, a 3-day itinerary, and approximate costs in CNY and USD.",
  "intro": "Suzhou is a canal city whose real fame sits behind garden walls. Nine of those gardens are a UNESCO World Heritage site, and they are small enough that two in a day is plenty if you actually sit down. This guide picks a three-day route from Shanghai or Hangzhou, names current ticket patterns, and leaves the rest of the city as canals, noodles, and one optional water town.",
  "keyPoints": [
    "Two gardens a day is the right pace. The Humble Administrator's Garden plus one smaller garden beats a five-garden sprint.",
    "The municipal garden bureau posts peak and off-peak adult prices. Peak months on that list are April, May, July, August, September, and October.",
    "Suzhou has no major international airport of its own. Use Shanghai, Hangzhou, or Sunan Shuofang in Wuxi, then a short train.",
    "Weekend crowds come from Shanghai. A Tuesday in April is a different city from a Saturday in October."
  ],
  "sections": [
    {
      "heading": "1. Why Suzhou belongs on a first China trip",
      "paragraphs": [
        "Classical Chinese gardens try to fit a mountain, a lake, and a poem into a space the size of a large house. Suzhou is where that idea was worked out most carefully, by scholars and retired officials who built private compounds from the 11th century onward. UNESCO inscribed the Classical Gardens of Suzhou in 1997 and later extended the listing. The nine named gardens include the Humble Administrator's Garden, the Lingering Garden, the Master of the Nets Garden, the Lion Grove, and the Canglang Pavilion, among others.",
        "The city around them is not a museum. Suzhou is a large, prosperous prefecture on the Grand Canal, with a modern lakeside district at Jinji Lake and an older grid of narrow water lanes. Pingjiang Road is the lane most visitors walk. It is commercial, and it is also the easiest way to understand how houses, bridges, and small docks still share a street.",
        "For a first trip, Suzhou is the right companion to Shanghai or Hangzhou rather than a substitute for them. You do not come for a skyline. You come to spend two hours in one garden, eat a sweet-savory noodle lunch, and be back on a train before dinner if you have to. Stay two nights and the place stops feeling like a day trip."
      ]
    },
    {
      "heading": "2. Best time to visit Suzhou",
      "paragraphs": [
        "April is the month garden people argue for. Wisteria, late magnolia, and new leaves show up together, and the rockeries look wet and dark instead of dusty. Late September and October are the other comfortable window, with clearer air and osmanthus in some courtyards. Both periods are also peak ticket months on the garden bureau price list, so you pay the higher adult fare and you meet more people.",
        "July and August are hot, bright, and officially peak-priced as well. The gardens have shade, which helps, but the lanes do not. Winter is off-peak on the price list (along with January, February, March, June, November, and December) and much quieter. Plum blossom at a few courtyards is the winter reason to come. June can be rainy in the same plum-rain pattern as Hangzhou.",
        "The single date to avoid if you dislike crowds is a Saturday or Sunday when Shanghai schools are out, plus National Day and the May Day holiday. The Humble Administrator's Garden has a finite number of paths. They fill."
      ]
    },
    {
      "heading": "3. Getting there and entry rules",
      "paragraphs": [
        "High-speed trains are the normal way in. Shanghai Hongqiao to Suzhou or Suzhou North often takes about 25 to 40 minutes. Hangzhou East to Suzhou is commonly around an hour to an hour and a half, depending on stops. Suzhou station sits near the old centre. Suzhou North is farther out and better for some Jinji Lake hotels. Check which station your ticket uses before you promise yourself a walk to the garden.",
        "Flying internationally, use Shanghai Pudong or Hongqiao, Hangzhou Xiaoshan, or Sunan Shuofang, the Wuxi airport that the immigration authorities added to the 240-hour transit port list. There is no need to invent a Suzhou airport connection that does not exist.",
        "Entry rules match the rest of the country. Citizens of listed countries can use the 30-day unilateral visa-free policy, currently extended through 31 December 2026. Nationals of 57 countries can use 240-hour visa-free transit with an onward ticket to a third country or region, entering at an eligible port and staying inside the published area. Shanghai, Hangzhou, and Sunan Shuofang are the practical ports for a Suzhou stay. Confirm the area list still includes Suzhou before you treat a transit admission as permission to roam Jiangsu."
      ]
    },
    {
      "heading": "4. Getting around and paying",
      "paragraphs": [
        "The metro connects Suzhou station, the old city, and Jinji Lake. Rides cost a few yuan. For the gardens inside the old moat, walking is realistic: the Humble Administrator's Garden, the Lion Grove, and Pingjiang Road sit in the same north-east quarter. The Lingering Garden is farther west, near another gate, and is a short taxi or metro hop rather than a stroll from Pingjiang.",
        "Bikes are available through Alipay and are useful along the outer moat. They are a poor idea inside the narrowest lanes, which are full of pedestrians and the occasional delivery scooter. Taxis and DiDi cover the jump to Jinji Lake or to Tongli.",
        "Gardens use real-name tickets. Book in the official channel or a major platform with the passport you will carry, and do not buy the same slot twice. Alipay or WeChat Pay with a foreign card covers metro, taxis, and most restaurants. Keep a little cash for a snack stall that has not updated its QR code."
      ]
    },
    {
      "heading": "5. Where to stay in Suzhou",
      "paragraphs": [
        "Pingjiang Road and the blocks around Guanqian Street are the base that puts gardens at the door. You will hear evening foot traffic. That is the trade for walking to the Humble Administrator's Garden in ten minutes. Shantang Street, on the north-west side, is another restored canal lane, busier with tour groups and a reasonable place to sleep if you want the Lingering Garden nearby.",
        "Jinji Lake, east of the old city, is the modern hotel district: newer rooms, lakeside malls, and a metro ride back to the gardens. Choose it if you care more about the room than about stepping out onto a stone bridge.",
        "Approximate nightly rates outside holiday peaks: guesthouses and simple hotels 180 to 350 CNY (about 25 to 50 USD); mid-range courtyard or business hotels 400 to 800 CNY (about 55 to 110 USD); upscale lakeside hotels 1,000 CNY and up (about 140 USD+). Weekend rates rise because of Shanghai weekenders. Book the garden tickets before you celebrate a cheap room."
      ]
    },
    {
      "heading": "6. A practical 3-day Suzhou itinerary",
      "paragraphs": [
        "Day 1 starts at the Humble Administrator's Garden, the largest of the famous set, built around a series of ponds. The Suzhou garden bureau lists the adult ticket at 80 CNY in peak months and 70 CNY in off-peak months. Go at opening. When you leave, walk south to the Lion Grove, a smaller rock garden whose adult price on the same list is 40 CNY peak and 30 CNY off-peak. Stop there. Spend the afternoon on Pingjiang Road without a goal, and eat noodles when you are hungry rather than when an itinerary says so.",
        "Day 2 is the Lingering Garden, west of the old centre, listed at 55 CNY peak and 45 CNY off-peak. It is tighter and, to many visitors, more satisfying than a second giant water garden. Use the rest of the day for the old city wall gate area, the Suzhou Museum if you reserved a slot, or a slow loop of the outer moat. In the evening, the Master of the Nets Garden runs a separate night opening. The bureau list shows a night-garden ticket of 120 CNY, which is a different product from the daytime 40 CNY peak or 30 CNY off-peak entry. The night visit is the one time these gardens are lit as a stage. Book it on its own and do not assume a daytime ticket lets you back in after dark.",
        "Day 3 is either the city you skipped or a water town. Tongli and Zhouzhuang both sit outside Suzhou and both sell an old-street experience with boats and shops. One is enough. Tongli is the usual choice if you want a slightly smaller lane. If water towns do not appeal, stay in the city: Tiger Hill on the north-west edge, a silk museum, and an early train out. Canglang Pavilion and the Couple's Garden are worthwhile leftovers if you still want a garden and you have not already overloaded the first two days."
      ]
    },
    {
      "heading": "7. What to eat in Suzhou",
      "paragraphs": [
        "Suzhou cooking is on the sweet side of Jiangsu cuisine, which surprises people arriving from Sichuan. Noodles come in a soy-and-sugar broth with pickles and sometimes eel or pork. Squirrel-shaped mandarin fish, songshu guiyu, is the banquet dish: a deboned fish scored, fried, and coated in sweet-sour sauce so it curls like a squirrel's tail. It is a restaurant order, usually priced by size. Biluochun is the local green tea, grown around Taihu, and the same caution applies as with Longjing in Hangzhou. Buy a small amount from a shop that can say where the leaves were picked.",
        "A noodle lunch is often 20 to 40 CNY. A sit-down dinner with fish and a vegetable is often 100 to 180 CNY per person in the old city, more in a courtyard aimed at visitors. Pastry shops sell small sweet cakes that travel well on the train back to Shanghai."
      ]
    },
    {
      "heading": "8. Budget for three days in Suzhou",
      "paragraphs": [
        "Approximate figures, per person per day, excluding tickets into Shanghai and international flights, at about 7.1 CNY to 1 USD.",
        "Budget: 280 to 450 CNY (about 40 to 65 USD). A simple room, noodles, two garden tickets, and the metro. Skip the night garden and the water town boat.",
        "Mid-range: 650 to 1,100 CNY (about 90 to 155 USD). A courtyard hotel near Pingjiang, the night opening at the Master of the Nets, taxis, and one fish dinner.",
        "Comfort: 1,600 CNY and up (about 225 USD+). A Jinji Lake hotel, a driver for Tongli, and meals chosen for the room rather than the queue."
      ]
    },
    {
      "heading": "9. Practical tips and common mistakes",
      "paragraphs": [
        "Read the month before you memorise a ticket price. The garden bureau uses a peak list and an off-peak list, and a June visit is not priced like a May visit.",
        "Do not stack four gardens in one day. The third one becomes a corridor you walk while looking at your phone.",
        "Keep your passport on you. Real-name checks at the gate are ordinary, and a photo of the passport on your phone is not always accepted.",
        "Water-town boat rides and \"ancient costume\" photo stalls are optional. Ask the price before you step into the boat, and ignore anyone who says the official path is closed.",
        "If the trip is only a Shanghai weekend, stay one night in Suzhou anyway. A same-day return spends the best light on the train."
      ]
    }
  ],
  "faq": {
    "question": "How many Suzhou gardens should I visit?",
    "answer": "Two or three across the whole trip is the right number for a first visit. Make one of them the Humble Administrator's Garden or the Lingering Garden, add a smaller garden such as the Lion Grove or the Master of the Nets, and leave the rest for a return."
  },
  "internalLinks": [
    {
      "slug": "hangzhou-travel-guide-first-trip",
      "anchor": "Pair Suzhou with Hangzhou and West Lake"
    },
    {
      "slug": "beijing-vs-shanghai-for-first-trip",
      "anchor": "Decide whether Shanghai or Beijing should be the main city"
    },
    {
      "slug": "huangshan-travel-guide-first-trip",
      "anchor": "Leave the gardens for Huangshan if you want a mountain"
    },
    {
      "slug": "china-visa-payment-checklist-first-timers",
      "anchor": "Check visa and payment setup before you book trains"
    }
  ],
  "updateSummary": [
    "New guide: first-visit Suzhou plan with garden prices, a 3-day route, and budget bands.",
    "Garden fares checked against the Suzhou municipal garden bureau list in November 2026."
  ],
  "sources": [
    {
      "name": "UNESCO World Heritage: Classical Gardens of Suzhou",
      "url": "https://whc.unesco.org/en/list/813/",
      "note": "The nine-garden inscription and why these compounds matter."
    },
    {
      "name": "Suzhou Municipal Garden and Landscaping Bureau",
      "url": "https://ylj.suzhou.gov.cn/szsylj/mpjg/wztt.shtml",
      "note": "Posted peak and off-peak adult ticket prices."
    },
    {
      "name": "National Immigration Administration of China",
      "url": "https://en.nia.gov.cn/n147418/n147463/c183412/content.html",
      "note": "240-hour transit ports, including Sunan Shuofang."
    },
    {
      "name": "China Railway 12306",
      "url": "https://www.12306.cn/",
      "note": "Official train times and passport booking."
    }
  ],
  reviewer: REVIEWER_TEAM_NAME
},
{
  "slug": "zhangjiajie-travel-guide-first-trip",
  "title": "Zhangjiajie Travel Guide for First-Time Visitors: Wulingyuan Pillars and a 3-Day Plan",
  "titleVariants": {
    "A": "Zhangjiajie Travel Guide for First-Time Visitors",
    "B": "Zhangjiajie in 3 Days: Wulingyuan, the Bailong Elevator, and Tianmen Mountain"
  },
  "description": "A first-timer guide to Zhangjiajie: Wulingyuan ticket choices, cableways, where to sleep, Tianmen Mountain as a separate site, a 3-day plan, approximate budgets in CNY and USD, and how not to get stranded in fog.",
  "intro": "Zhangjiajie is a sandstone forest. Thousands of narrow pillars stand in a park that takes longer to cross than most visitors expect, and the town most people sleep in is not the same place as the airport city. This guide separates the UNESCO core from the extra mountains, prices the official gate ticket, and builds three days that include rest instead of four cableways before lunch.",
  "keyPoints": [
    "The Wulingyuan core ticket is the one that matters. A single adult ticket is 165 CNY and is valid for four consecutive days. The version that includes the in-park eco buses is 236 CNY.",
    "Cableways and the Bailong elevator are extra. On the park's own booking pages they are priced per one-way ride, not folded into the gate.",
    "Sleep in Wulingyuan town if the park is your reason for coming. Zhangjiajie city is the right base only for Tianmen Mountain and the airport.",
    "April to June and September to November are the most reliable months. Fog can hide the pillars in any season, so keep one day flexible."
  ],
  "sections": [
    {
      "heading": "1. Why Zhangjiajie is worth the trip",
      "paragraphs": [
        "Wulingyuan, in north-west Hunan, is a UNESCO World Heritage site inscribed in 1992 for its scenery. The listing describes more than 3,000 narrow pillars, many taller than 200 metres, standing in quartz sandstone country with ravines and streams between them. Walking under them feels different from seeing a photograph. The scale only shows up when a bus ride that you thought was \"inside the park\" takes half an hour.",
        "Travelers often connect these pillars with the floating mountains in the film Avatar, and one spire has been promoted under the name Avatar Hallelujah Mountain. The film is a footnote. The draw is the geology, and you should not expect a theme-park version of a movie set.",
        "Tianmen Mountain and the Zhangjiajie Grand Canyon, home of a long glass bridge, sit outside that core ticket. They are striking, and they are separate businesses with separate queues. A first visit that tries to do the core, Tianmen, and the glass bridge in two days usually does all three badly. This plan keeps Tianmen optional and leaves the glass bridge off the must-do list."
      ]
    },
    {
      "heading": "2. Best time to visit Zhangjiajie",
      "paragraphs": [
        "April, May, and June are green, and the streams have water. September, October, and November are cooler and often clearer, which matters because these pillars disappear in cloud. Both windows can include rain. A wet day in the park is still a good day if you switch to a lower trail such as Golden Whip Stream instead of standing on an exposed platform waiting for a view.",
        "July and August are hot in town and unpredictable on the summits. Summer cloud can be beautiful and can also erase the reason you climbed. Winter is cold, some paths ice over, and individual cableways close. Come in winter only if you like quiet and you have checked which rides are running that week.",
        "National Day and the May holiday push the Bailong elevator and the Yuanjiajie platforms to capacity. If you must travel then, book the gate ticket and the elevator for a timed entry, and start with the first bus."
      ]
    },
    {
      "heading": "3. Getting there and entry rules",
      "paragraphs": [
        "Zhangjiajie Hehua International Airport is the local airport, and it is one of the ports added when China expanded 240-hour visa-free transit. The airport sits closer to Zhangjiajie city than to Wulingyuan town. A taxi or shuttle to Wulingyuan often takes 40 to 70 minutes. High-speed trains reach Zhangjiajie West from Changsha and other Hunan cities; from the station you still need a ride to Wulingyuan if that is your hotel.",
        "There is no useful way to \"pass through\" this park on the way to somewhere else in an afternoon. Treat it as a destination, not a stopover. The nearest large cities on a traveler's map are Changsha, Chongqing, and, much farther east, the Guilin karst. Guilin is a different landscape and a different trip. Do not schedule them back to back unless you have a spare travel day.",
        "Visa rules are the national ones. The 30-day unilateral visa-free policy, extended through 31 December 2026 for citizens of the listed countries, is the straightforward option. The 240-hour transit policy covers nationals of 57 countries who arrive at an eligible port, including Zhangjiajie Hehua, with an onward ticket to a third country or region, and who stay inside the permitted area. Hunan's permitted area is defined by the immigration authorities. Read it before you add a night in another province."
      ]
    },
    {
      "heading": "4. Getting around and paying",
      "paragraphs": [
        "Inside Wulingyuan, eco buses link the trailheads. The 236 CNY adult ticket sold on the official Wulingyuan site includes those buses and excludes cableways, the elevator, and the voluntary insurance line of a few yuan. The 165 CNY ticket is the gate only. For almost every first-timer the bus-inclusive ticket is the one to buy, because the road distance between Yuanjiajie, Tianzi Mountain, and the lower valleys is not a pleasant walk.",
        "The add-on rides, listed on the same official ticket pages, are one way. The Bailong elevator is 65 CNY. The Huangshizhai cableway is 65 CNY. The Tianzi Mountain cableway is 72 CNY. A common pattern is elevator up and cableway down, so you are not retracing a staircase, and so you are not paying for every machine in the park. Buy them in the official mini program or at the park window, not from a hotel tout who bundles \"a discount\" with a shop stop.",
        "Alipay and WeChat Pay work in Wulingyuan hotels and larger restaurants. Village stalls and some ticket windows still prefer cash or a local QR code that a foreign card cannot scan. Carry a few hundred yuan. Passport checks are normal at the gate because tickets are real-name."
      ]
    },
    {
      "heading": "5. Where to stay",
      "paragraphs": [
        "Wulingyuan town, by the east gate, is the practical base. You can be at the gate for opening, return for a shower at midday if the weather collapses, and eat dinner outside park prices. Rooms range from plain hotels to newer resort-style blocks. The town itself is ordinary. That is fine. You are there to sleep.",
        "Zhangjiajie city is the right bed only on the night you land late or the night before a Tianmen Mountain morning. Staying there and commuting into Wulingyuan eats the best hours. Tianmen has its own road and its own cable car up from the city side, which is why it pairs with a city hotel and not with a Wulingyuan hotel.",
        "Approximate nightly rates: simple hotels in Wulingyuan 200 to 400 CNY (about 28 to 55 USD); mid-range 450 to 800 CNY (about 65 to 110 USD); upscale 1,000 CNY and up (about 140 USD+). Park-gate hotels charge more in October. Book a room with heating if you are traveling in winter, and ask whether the hotel can store luggage on the day you move to the city."
      ]
    },
    {
      "heading": "6. A practical 3-day itinerary",
      "paragraphs": [
        "Day 1 is arrival and, if you landed in the morning with energy, Tianmen Mountain. The mountain is a separate ticket from Wulingyuan, with a long cable car and a glass skywalk that is optional and often wind-closed. Do it on the city day so you are not crossing town twice. If your flight lands late, skip Tianmen without guilt and go to bed in Wulingyuan. The core park is the reason to be here.",
        "Day 2 is the upper park. Enter at opening with the bus-inclusive ticket. A workable loop is the Bailong elevator up to the Yuanjiajie area, a slow walk among the platforms, then a bus toward Tianzi Mountain and a cableway down. Eat a packed lunch. Restaurant food inside the park is convenient and dull and priced for a captive audience. Be down before the last bus if you are not sure of the timetable, which is posted at the gate and shortens in winter.",
        "Day 3 is a lower, kinder route. Golden Whip Stream is a valley walk with water and fewer stairs, and it is the right choice if your knees complained on day 2. Huangshizhai, reached by its own cableway or by a long staircase, is the choice if you still want a summit. Leave the park by mid-afternoon if you have a flight. Fog insurance is built into this day: if day 2 was a white-out, swap these plans and go up again when the forecast clears."
      ]
    },
    {
      "heading": "7. What to eat",
      "paragraphs": [
        "Hunan food is hot in a fresh-chili way, sharper and less numbing than Sichuan pepper. Cured pork, smoked bacon with dried chili, and simple vegetable stir-fries are the local plates. Tujia-style restaurants in Wulingyuan town serve sour fish soups and mountain greens. None of this is delicate. Order one spicy dish and one plain one.",
        "Budget for meals outside the gate. Breakfast in town is often 15 to 30 CNY. Dinner is often 50 to 100 CNY per person. Inside the park, expect to pay more for worse noodles, which is another reason to carry snacks on the long day."
      ]
    },
    {
      "heading": "8. Budget for three days",
      "paragraphs": [
        "Approximate figures, per person per day, at about 7.1 CNY to 1 USD, excluding long-haul flights. Park transport is the line that surprises people, so it is called out separately.",
        "The core ticket with buses is 236 CNY once, not per day, and covers four consecutive days. Two one-way rides, for example the elevator and one cableway, add roughly 130 to 140 CNY. Tianmen, if you add it, is another ticket on top. Check the live price, because it is not part of the Wulingyuan notice.",
        "Budget: 350 to 550 CNY (about 50 to 75 USD) on a park day, less on a town day. A simple room, town meals, the shared gate ticket, and one ride.",
        "Mid-range: 700 to 1,100 CNY (about 100 to 155 USD). A better hotel, elevator plus cableway, taxis to the gate, and Tianmen on one of the days.",
        "Comfort: 1,500 CNY and up (about 210 USD+). A private driver between city and park and a hotel that will actually feel quiet at night."
      ]
    },
    {
      "heading": "9. Practical tips and common mistakes",
      "paragraphs": [
        "Wear shoes with grip. The paths are stone, often wet, and occasionally polished by traffic. A poncho beats an umbrella on the platforms.",
        "Do not buy a bundle from someone at the airport who says the official ticket is sold out. The official site and mini program are the queue that matters.",
        "Give the pillars a second chance if the first morning is fog. The four-day validity on the gate ticket exists for this reason. A one-night stay throws that advantage away.",
        "The glass bridge and Tianmen are optional. Skipping both still leaves you with a complete Wulingyuan visit.",
        "Altitude here is modest compared with Yunnan, but the stair counts are not. If your knees are a known problem, take the machines in both directions and walk the flat sections only."
      ]
    }
  ],
  "faq": {
    "question": "Is Zhangjiajie the same place as Tianmen Mountain?",
    "answer": "No. Tianmen Mountain rises on the edge of Zhangjiajie city and has its own cable car and ticket. The sandstone pillars visitors come for are in the Wulingyuan core, a drive away, covered by the national-park ticket described above."
  },
  "internalLinks": [
    {
      "slug": "guilin-yangshuo-travel-guide-first-trip",
      "anchor": "Compare Zhangjiajie with the Guilin and Yangshuo karst"
    },
    {
      "slug": "chongqing-travel-guide-first-trip",
      "anchor": "Combine the park with a Chongqing city break if the routing works"
    },
    {
      "slug": "best-time-to-visit-china-first-trip",
      "anchor": "Check how Hunan weather sits against a wider China trip"
    },
    {
      "slug": "china-visa-payment-checklist-first-timers",
      "anchor": "Confirm visa and payment tools before a park-heavy trip"
    }
  ],
  "updateSummary": [
    "New guide: Wulingyuan-first Zhangjiajie plan with official ticket types and a 3-day route.",
    "Gate and cableway prices checked against the Wulingyuan tourism site in November 2026."
  ],
  "sources": [
    {
      "name": "UNESCO World Heritage: Wulingyuan",
      "url": "https://whc.unesco.org/en/list/640/",
      "note": "Inscription and the scale of the sandstone pillars."
    },
    {
      "name": "Wulingyuan official ticket page",
      "url": "http://www.hnzjj.com/index.php/Ticket/show/2.html",
      "note": "Adult gate fares, four-day validity, and what the eco bus does and does not include."
    },
    {
      "name": "Wulingyuan ride tickets",
      "url": "http://www.hnzjj.com/index.php/Ticket/list/44.html",
      "note": "One-way prices for the Bailong elevator and the main cableways."
    },
    {
      "name": "National Immigration Administration of China",
      "url": "https://en.nia.gov.cn/n147418/n147463/c183412/content.html",
      "note": "240-hour transit policy. Zhangjiajie Hehua was added as an entry port."
    }
  ],
  reviewer: REVIEWER_TEAM_NAME
},
{
  "slug": "yunnan-kunming-dali-lijiang-travel-guide",
  "title": "Yunnan Travel Guide: Kunming, Dali, and Lijiang for a First Visit",
  "titleVariants": {
    "A": "Yunnan Travel Guide for Kunming, Dali, and Lijiang",
    "B": "Kunming, Dali, and Lijiang: Trains, Altitude, and a Realistic First Route"
  },
  "description": "A first Yunnan route through Kunming, Dali, and Lijiang: seasons, trains, altitude, where to stay, food, a realistic 3-day sampler, what a proper week looks like, and approximate budgets in CNY and USD.",
  "intro": "Yunnan is the south-west province people add when a China trip has been all capitals and concrete. Kunming, Dali, and Lijiang sit in a line that high-speed trains can cover, and they are not the same place: a spring-climate provincial capital, a lakeside valley, and a stone old town at 2,400 metres. Three days can sample the line. It cannot do it justice. This guide gives you the short version and says plainly when to add nights.",
  "keyPoints": [
    "A real Kunming-Dali-Lijiang trip wants about six or seven days. The 3-day plan below is a sampler with early trains and one sight per stop.",
    "Kunming to Dali is often around two hours. Dali to Lijiang is often about one and a half to two and a half hours, with fewer trains, so book that leg first.",
    "Lijiang old town sits at about 2,400 metres. Do not stack Jade Dragon Snow Mountain on the day you arrive from sea level.",
    "March to May and September to November are the easiest months. June to August is the wetter season in the west of the province."
  ],
  "sections": [
    {
      "heading": "1. Why this route is worth taking",
      "paragraphs": [
        "Kunming is the capital, set on a plateau around 1,900 metres, with a reputation as a spring city because winters stay mild and summers rarely turn into the furnace weather of Chongqing or Wuhan. It is the airport and the rail hub. The Stone Forest at Shilin, a limestone area that forms part of the South China Karst World Heritage listing, is the classic day trip. The city itself is pleasant and not the reason most people cross the country.",
        "Dali sits between Cangshan mountain and Erhai lake. The walled old town is heavily restored and full of cafes. The better hours are on the lake: a village such as Xizhou, a bike on the east shore, and a view back at the mountain. It is the stop where a rushed itinerary most wants an extra night.",
        "Lijiang's Dayan old town is a UNESCO site, inscribed in 1997, together with the smaller clusters at Baisha and Shuhe. UNESCO describes a town at about 2,400 metres, fed by canals from the Black Dragon Pool, with timber houses that mix cultures along the old trade routes. The Naxi people are the local majority in the old streets. The town is beautiful at breakfast and overcrowded by mid-afternoon in peak season. Both things are true, and the first is still worth the train."
      ]
    },
    {
      "heading": "2. Best time to visit",
      "paragraphs": [
        "March, April, and May are clear enough for lake views and warm enough for old-town evenings. September, October, and November are the other good window, with autumn light on Cangshan and cooler nights in Lijiang. These months also include Chinese holiday peaks, especially the first week of October, when Lijiang's lanes stop moving.",
        "June through August brings more rain, especially as you go west. Trails and mountain roads can close for an afternoon. The landscape is greener, and hotel prices outside the holidays are often kinder. Winter is a reasonable time for Kunming, cold at night in Dali, and properly cold in Lijiang, where heating in older guesthouses can be a space heater rather than a system.",
        "If you only have three days, pick the season for the one place you will actually linger. A wet week hurts a lake day more than it hurts a Kunming museum morning."
      ]
    },
    {
      "heading": "3. Getting there, trains, and entry rules",
      "paragraphs": [
        "Kunming Changshui International Airport is the main international gate and an eligible port for 240-hour visa-free transit. Lijiang has its own airport, which is useful if you are skipping Kunming on the way out. Dali's airport is a smaller option. For most first trips the pattern is fly into Kunming, train north, and fly home from Lijiang or back from Kunming.",
        "On the high-speed line, Kunming to Dali commonly takes around two hours, sometimes a little more from Kunming South than from the central Kunming station. Dali to Lijiang is often about 90 minutes to two and a half hours, and there are far fewer departures than on the Kunming-Dali stretch, so that ticket is the one that sells out on weekends. Second-class fares on ordinary days are often in a rough band of about 80 to 150 CNY for these hops. Read the live price on 12306 and book with your passport. The old advice to take a four-hour bus from Dali to Lijiang is out of date for anyone who can get a train seat.",
        "The 30-day unilateral visa-free policy, extended through 31 December 2026, is the clean way to ride this whole line. The 240-hour transit policy can work through Kunming Changshui for nationals of 57 countries with an onward ticket, but only inside the published stay area. A Kunming-Dali-Lijiang route is legal on that stay only if every stop is inside the area list. Check the National Immigration Administration page before you ticket three cities on a transit admission. When in doubt, use a normal visa or the 30-day visa-free entry."
      ]
    },
    {
      "heading": "4. Getting around and paying",
      "paragraphs": [
        "Kunming's metro links the main stations and Changshui airport. In Dali, the old town is walkable and Erhai needs a bike, an e-bike, or a driver for the day. Agree the e-bike price and the return time in the shop. In Lijiang, Dayan is pedestrian. Shuhe and Baisha are short taxi rides. Jade Dragon Snow Mountain is not a casual add-on: it is a separate scenic area with its own ticket, cableway, and quota, at a higher altitude than the town.",
        "Alipay and WeChat Pay cover cities and most old-town restaurants. Guesthouses in village lanes sometimes still want cash or a personal QR code that foreign cards cannot pay. Carry cash in Yunnan even if you did not need it in Shanghai. Keep the passport handy for trains and for scenic-area checks.",
        "Maps: Amap or Apple Maps, plus an offline translation app. English signage is good in the old towns and thin on village buses."
      ]
    },
    {
      "heading": "5. Where to stay",
      "paragraphs": [
        "In Kunming, stay near Green Lake or the railway if you are leaving early, and near the metro if you are not. There is little reason to sleep at the airport unless the flight demands it.",
        "In Dali, the old town is convenient and noisy at night. A guesthouse toward Xizhou or the quieter lanes east of the main bar street buys you a better morning. On Erhai, a lake hotel is the splurge that makes a short trip feel longer.",
        "In Lijiang, sleep just inside Dayan if you want to walk out at dawn, or in Shuhe if you want fewer bars. Upper floors of old wooden houses can be cold and can carry corridor noise. Read recent notes about heating before you book a cheap courtyard in winter.",
        "Approximate nightly rates: Kunming mid-range hotels 300 to 600 CNY (about 42 to 85 USD); Dali guesthouses 200 to 500 CNY (about 28 to 70 USD); Lijiang old-town inns 250 to 700 CNY (about 35 to 100 USD), with holiday weeks far above that. Lake and snow-mountain resorts sit in a different band, often 800 CNY and up."
      ]
    },
    {
      "heading": "6. A practical 3-day sampler, and the trip you actually want",
      "paragraphs": [
        "The honest schedule for all three places is about a week: one full day in Kunming with the Stone Forest, two nights in Dali, two or three nights in Lijiang, and the train hours in between. Jade Dragon Snow Mountain, if you want it, takes one of the Lijiang days and should not be your first morning at altitude. Baisha murals and a slow canal walk are the better use of a second Lijiang day for most first-timers.",
        "If you truly have three days, treat them as a sampler and cut without apology. Day 1: land in Kunming, walk Green Lake, and go to the Stone Forest only if you arrived before noon and can be back for a reasonable bedtime. Day 2: an early train to Dali, the old town walls, and either a short Erhai ride or Xizhou, not both. Day 3: a morning train to Lijiang, Dayan and the canals while the tour groups are still at breakfast, then an evening flight or a night train plan you booked before you left home. You will not see Jade Dragon. You will not see Shangri-La. Write that down so the trip does not feel like a failure.",
        "A stronger three-day alternative, if Kunming is only an airport, is to fly into Lijiang, spend two nights there, and one night in Dali, then fly out. You sacrifice the Stone Forest and gain a morning in the old town when it is actually quiet."
      ]
    },
    {
      "heading": "7. What to eat",
      "paragraphs": [
        "Kunming's breakfast classic is crossing-the-bridge rice noodles: a bowl of hot broth, a plate of raw rice noodles and meat, and a short ritual of sliding them into the soup. A good bowl is often 20 to 40 CNY. In Dali, look for claypot fish from the lake and the local fried cheese called rushan, which is milder than the name suggests. In Lijiang, Naxi baba is a wheat flatbread cooked on a griddle, often with scallion or sweet fillings, and it is the right snack between courtyards.",
        "Mushrooms, cured ham, and yak meat show up across the north of the province. Spice is present and usually gentler than in Hunan. Altitude plus alcohol is a bad mix on a first Lijiang night. Drink water, order one drink if you want it, and save the bar street for a night when you do not have a dawn walk planned."
      ]
    },
    {
      "heading": "8. Budget for the sampler and for a week",
      "paragraphs": [
        "Approximate costs, per person, at about 7.1 CNY to 1 USD, excluding international flights. Trains are cheap relative to hotels. Holiday weeks in Lijiang are not.",
        "Three-day sampler, mid-range: about 700 to 1,200 CNY per day (about 100 to 170 USD), covering a decent room, trains, the Stone Forest or a lake bike, and sit-down meals. A budget version that uses simple inns and noodles can sit nearer 350 to 550 CNY a day (about 50 to 75 USD).",
        "A six- or seven-day trip costs less per day if you stay in guesthouses, and more in total because of the extra nights. Add a separate ticket budget for Jade Dragon if you go. The mountain's full set of cableway and park fees is large enough to matter; check the official scenic-area channel before you promise anyone the glacier."
      ]
    },
    {
      "heading": "9. Practical tips and common mistakes",
      "paragraphs": [
        "Book the Dali-Lijiang train before you book a third museum. Seats, not sights, are the scarce item on that segment.",
        "Give Lijiang a morning. The old town after 11:00 in October is a queue with shopfronts. The same street at 7:30 is the one in the photographs.",
        "Treat altitude as a plan, not a personality test. Headache, poor sleep, and no appetite are common on night one at 2,400 metres and commoner on Jade Dragon. Ibuprofen is not a substitute for a slower first day.",
        "Ignore \"minority costume\" photo packages and unofficial jade certificates in Dayan. A walk and a bakery are the better souvenirs.",
        "Do not chain Yunnan onto Zhangjiajie or Guilin in the same three days. The trains between those regions are long. Pick one landscape."
      ]
    }
  ],
  "faq": {
    "question": "Can I see Kunming, Dali, and Lijiang in three days?",
    "answer": "You can set foot in all three if the trains line up, and you will only have a few hours in each. For a first visit that feels like Yunnan rather than like a station tour, allow about six or seven days, or cut the route to Dali plus Lijiang."
  },
  "internalLinks": [
    {
      "slug": "chengdu-travel-guide-first-trip",
      "anchor": "Compare Yunnan with a Chengdu city stay if you only have one extra region"
    },
    {
      "slug": "how-many-days-in-first-china-city",
      "anchor": "Use a day-count framework before you add another overnight stop"
    },
    {
      "slug": "guilin-yangshuo-travel-guide-first-trip",
      "anchor": "Choose between Yunnan and the Guilin karst if the trip is short"
    },
    {
      "slug": "best-time-to-visit-china-first-trip",
      "anchor": "Match Yunnan's dry months to the rest of the itinerary"
    }
  ],
  "updateSummary": [
    "New guide: Kunming, Dali, and Lijiang first route, with a 3-day sampler and a more realistic week.",
    "Rail pattern and entry rules checked against official sources in November 2026."
  ],
  "sources": [
    {
      "name": "UNESCO World Heritage: Old Town of Lijiang",
      "url": "https://whc.unesco.org/en/list/811/",
      "note": "Inscription, altitude, and the canal town layout."
    },
    {
      "name": "UNESCO World Heritage: South China Karst",
      "url": "https://whc.unesco.org/en/list/1248/",
      "note": "Shilin Stone Forest as part of the karst listing."
    },
    {
      "name": "China Railway 12306",
      "url": "https://www.12306.cn/",
      "note": "Live Kunming-Dali-Lijiang times and passport booking."
    },
    {
      "name": "National Immigration Administration of China",
      "url": "https://en.nia.gov.cn/n147418/n147463/c183412/content.html",
      "note": "240-hour transit limits that apply to a multi-city Yunnan route."
    }
  ],
  reviewer: REVIEWER_TEAM_NAME
},
{
  "slug": "chongqing-travel-guide-first-trip",
  "title": "Chongqing Travel Guide for First-Time Visitors: River City, Hot Pot, and a 3-Day Plan",
  "titleVariants": {
    "A": "Chongqing Travel Guide for First-Time Visitors",
    "B": "Chongqing in 3 Days: Hills, Night Views, and Hot Pot"
  },
  "description": "A practical first trip to Chongqing: when to go, visa-free entry, metro and river crossings, where to stay, hot pot, a 3-day itinerary, approximate budgets in CNY and USD, and hillside mistakes.",
  "intro": "Chongqing is a mountain port where the Yangtze meets the Jialing. Roads stack on top of each other, a metro train runs through a residential tower, and dinner is a pot of chili oil. It is not a delicate city, and it is one of the most rewarding places to spend three days if your first China impressions have all been flat and planned. This guide keeps you in the peninsula and on the night views, with Chengdu an hour away if you want a second city.",
  "keyPoints": [
    "Stay in Yuzhong, around Jiefangbei or Lianglukou, so the hills and the night river are walkable.",
    "Go to Hongyadong at dusk for the outside view. The building itself is a stack of restaurants and shops, and the photograph is better from across the street.",
    "Spring and autumn are the walking seasons. Summer is one of the hottest, stickiest stretches in urban China.",
    "High-speed trains to Chengdu often take about one to one and a half hours. Do not try to do both cities properly inside a single weekend."
  ],
  "sections": [
    {
      "heading": "1. Why Chongqing deserves three days",
      "paragraphs": [
        "Chongqing is a municipality, not a prefecture inside another province, and it behaves like one: a huge population, a real airport, and a centre that still feels like a port. The drama is vertical. You can leave a metro station, walk what you think is one block, and find you have changed elevation by ten storeys. Maps underestimate this. Your knees will not.",
        "The sights are urban rather than imperial. Hongyadong, a stilt complex on the Jialing bank, is the night photograph everyone has seen. Liziba, on Metro Line 2, is the station that passes through a residential building. The Yangtze cableway is a short public ride between Yuzhong and Nan'an that locals still use. None of these is a museum piece. They work because the city is still living on a cliff.",
        "Food is the other half of the case. Chongqing hot pot is a local identity, heavier on beef tallow and dried chili than the Chengdu version many travelers meet first. You can eat extremely well for the price of a casual dinner at home, and you can also overdo it on night one. The plan below puts hot pot on night two, after you know where your hotel is."
      ]
    },
    {
      "heading": "2. Best time to visit Chongqing",
      "paragraphs": [
        "March to May and October to November are the months when walking the peninsula is a pleasure. Skies are not always clear, but temperatures let you stay outside for a night view without melting or shivering.",
        "June, July, and August are the problem. Chongqing is grouped with the traditional \"furnace\" cities. Daytime highs often sit in the mid or high 30s Celsius, nights stay warm, and rain arrives as a downpour rather than a drizzle. If you come in summer, put museums and malls in the middle of the day and keep the river walk for after 6 pm.",
        "Winter is damp and grey more than frozen. Buildings can feel colder than the forecast because heating is patchy compared with north China. The payback is fewer visitors at the photo platforms. Avoid National Day week if you want to see the Hongyadong steps at all."
      ]
    },
    {
      "heading": "3. Getting there and entry rules",
      "paragraphs": [
        "Chongqing Jiangbei International Airport is the main air gate and a long-standing port for visa-free transit. Metro and airport buses reach the centre; allow 45 to 75 minutes depending on the terminal and the hour. Taxis and DiDi are straightforward if you have Alipay working.",
        "High-speed rail is the better link to Chengdu: often about one hour to an hour and a half between the main stations. Trains toward Zhangjiajie or the Three Gorges cities take longer and should not be squeezed into the same three days. A Yangtze cruise toward Yichang is a separate multi-day trip with its own boat, not an afternoon add-on.",
        "Citizens of the countries on China's unilateral list can use 30-day visa-free entry, extended through 31 December 2026. Nationals of 57 countries can use 240-hour transit if they enter at an eligible port such as Jiangbei, hold an onward ticket to a third country or region, and remain inside the permitted area. The municipality is large. A day trip that leaves the published area is not a casual decision. Read the National Immigration Administration note before you book a cruise or a train that crosses into Hubei."
      ]
    },
    {
      "heading": "4. Getting around and paying",
      "paragraphs": [
        "Metro Lines 1, 2, and 6 do most of the tourist work in the centre. Line 2 is the one to ride through Liziba even if you also stare at it from the outside platform. Single fares are a few yuan, paid with the transit QR code in Alipay or WeChat. Escalators in this city are part of the transport network. Some of them climb whole hillsides and are free. Use them. A walking route that looks short on a flat map can be a stair workout.",
        "The Yangtze cableway sells a simple single ride at a low local fare. Check the posted price at the station, because it changes, and go off-peak if you want a window rather than a crowd. Ferries also cross the rivers and show you the cliff from water level.",
        "Mobile payment is the default. Bind a foreign card before you arrive, and carry cash as a backup for a small noodle shop. Passports are checked at hotels, at the train station, and at some museums. The Three Gorges Museum often requires a reservation even when the ticket itself is free. Book that the day before."
      ]
    },
    {
      "heading": "5. Where to stay in Chongqing",
      "paragraphs": [
        "Jiefangbei and the streets down toward Lianglukou put you in the commercial centre, with food, metro, and a walkable if hilly route toward the river. It is busy and it is the right first base. Hotels here range from older business towers to newer international brands.",
        "Nanbin Road, on the south bank, looks back at Hongyadong and the peninsula skyline. Stay here if the view is the point of the trip and you do not mind a cableway or metro ride into the centre for dinner. Elin Park and the ridge above Yuzhong are quieter and better for a morning walk than for a late arrival.",
        "Approximate nightly rates outside Golden Week: simple hotels 200 to 350 CNY (about 28 to 50 USD); mid-range 400 to 750 CNY (about 55 to 105 USD); skyline and international hotels 900 CNY and up (about 125 USD+). Ask for a room that is not facing a nightclub street if you are near the river steps."
      ]
    },
    {
      "heading": "6. A practical 3-day Chongqing itinerary",
      "paragraphs": [
        "Day 1 is the peninsula on foot, with machines where the hill demands them. Start at Jiefangbei so you understand the centre, then drop toward the river. Ride the Yangtze cableway across and back, or one way and return by metro. In the afternoon, ride Line 2 through Liziba and get off for a look from the viewing side if the platform is not jammed. Be at Hongyadong from the outside just as the lights come on. Eat something light. The big hot pot can wait.",
        "Day 2 is a neighbourhood and a museum. Ciqikou, an older market street on the Jialing, fills with visitors by late morning, so go early and leave when the snack stalls blur together. The Three Gorges Museum, if you reserved, is the indoor contrast: it explains the river you are looking at. Eling Park or a late ride up to a ridge viewpoint covers sunset. Night two is hot pot. Choose a split pot if you are unsure about chili, and a beef-tallow spicy side if you are sure.",
        "Day 3 can stay in the city or leave it. In the city, walk a morning market, revisit one viewpoint in daylight, and eat xiaomian noodles before the train. Out of the city, the Dazu rock carvings are a UNESCO site of Buddhist sculpture roughly an hour and a half to two hours away, and they deserve most of a day. Do Dazu instead of a second night viewpoint, not on top of one. A Chengdu transfer also fits this day if Chongqing was the second stop and you planned the train in advance."
      ]
    },
    {
      "heading": "7. What to eat",
      "paragraphs": [
        "Hot pot is the meal. You will be offered a pot of chili and beef tallow, a mild pot, or a split yuanyang pot. Order plain vegetables and tofu alongside tripe and beef slices so you can keep eating after the oil builds up. A lively local meal is often 80 to 150 CNY per person. Fancier rooms with a view of the river charge more for the window.",
        "Daytime food is noodles. Chongqing xiaomian is a small bowl of wheat noodles with chili oil, garlic, and often peas or minced pork, eaten in ten minutes, often for 10 to 20 CNY. Grilled fish and a spicy chicken dish locals order as a main are the other sit-down options if you need a night off from the pot. Breakfast stalls near any metro do dumplings and soy milk for the price of a coffee at home."
      ]
    },
    {
      "heading": "8. Budget for three days",
      "paragraphs": [
        "Approximate per person per day, excluding intercity trains and flights, at about 7.1 CNY to 1 USD.",
        "Budget: 250 to 400 CNY (about 35 to 55 USD). A simple hotel, noodles plus one hot pot, and the metro. The cableway will not change this number much.",
        "Mid-range: 600 to 1,000 CNY (about 85 to 140 USD). A central hotel, taxis when the hills win, a museum day, and a hotter, longer dinner.",
        "Comfort: 1,500 CNY and up (about 210 USD+). A river-view room, a private driver for Dazu, and hot pot somewhere that takes a reservation."
      ]
    },
    {
      "heading": "9. Practical tips and common mistakes",
      "paragraphs": [
        "Trust elevation more than distance. A 15-minute walk on the map can be a climb. Look for the public escalator or the metro before you commit.",
        "Photograph Hongyadong from the outside steps and the opposite bank. Fighting through the restaurant floors for a view you could have had on the street wastes the evening.",
        "Start mild at hot pot even if you like spice at home. The tallow carries the chili further than a dry stir-fry does.",
        "Summer midday plans should be indoors. The \"furnace\" label is not a slogan.",
        "If Chengdu is next, book the high-speed seat once your hotel night is fixed. The ride is short and the popular trains still fill on Fridays."
      ]
    }
  ],
  "faq": {
    "question": "Should I visit Chongqing or Chengdu first?",
    "answer": "Choose Chongqing if you want a river city, night views, and a rougher skyline. Choose Chengdu if you want pandas, teahouses, and a flatter day. They are close by train and they do not feel the same, so a first trip that has time for only one should follow that preference rather than a ranking."
  },
  "internalLinks": [
    {
      "slug": "chengdu-travel-guide-first-trip",
      "anchor": "Compare the pace with Chengdu before you book both"
    },
    {
      "slug": "zhangjiajie-travel-guide-first-trip",
      "anchor": "Add Zhangjiajie only if you have days to spare beyond the city"
    },
    {
      "slug": "china-first-trip-budget-by-city",
      "anchor": "Place Chongqing on a wider first-trip budget"
    },
    {
      "slug": "china-visa-payment-checklist-first-timers",
      "anchor": "Set up entry and mobile payments first"
    }
  ],
  "updateSummary": [
    "New guide: first-visit Chongqing plan with a 3-day peninsula route and budget bands.",
    "Entry rules checked against official sources in November 2026."
  ],
  "sources": [
    {
      "name": "National Immigration Administration of China",
      "url": "https://en.nia.gov.cn/n147418/n147463/c183412/content.html",
      "note": "240-hour visa-free transit ports and stay areas."
    },
    {
      "name": "Gov.cn: visa-free access extension",
      "url": "https://english.www.gov.cn/news/202511/04/content_WS69094ae0c6d00ca5f9a07472.html",
      "note": "Unilateral visa-exemption through 31 December 2026."
    },
    {
      "name": "UNESCO World Heritage: Dazu Rock Carvings",
      "url": "https://whc.unesco.org/en/list/912/",
      "note": "Background for the optional day trip outside the city."
    },
    {
      "name": "China Railway 12306",
      "url": "https://www.12306.cn/",
      "note": "Chengdu-Chongqing high-speed times and passport booking."
    }
  ],
  reviewer: REVIEWER_TEAM_NAME
},
{
  "slug": "harbin-winter-travel-guide",
  "title": "Harbin Winter Travel Guide: Ice and Snow World, Central Street, and a 3-Day Plan",
  "titleVariants": {
    "A": "Harbin Winter Travel Guide for First-Time Visitors",
    "B": "Harbin in Winter: What to Wear, Where to Sleep, and How to See the Ice"
  },
  "description": "A winter Harbin guide: how cold it really is, what is confirmed for Ice and Snow World, Central Street and St Sophia, where to stay, food, a 3-day plan, approximate budgets in CNY and USD, and cold-weather mistakes.",
  "intro": "Harbin is a summer city that the world visits in winter. The reason is ice: whole buildings cut from the Songhua River, lit after dark, in a provincial capital that already looks a little like a Russian railway town. The cold is the attraction and the constraint. This guide plans three winter days around what you can actually stand, and it separates the coming season's confirmed facts from last season's ticket price.",
  "keyPoints": [
    "January daytime temperatures often sit around −15°C to −20°C, before wind. Pack for standing still, not for a city stroll.",
    "The 28th Harbin Ice and Snow World is confirmed for the 2026-27 winter at 1.25 million square metres. An opening date and a ticket price were not part of that October 2026 announcement.",
    "Last season is a guide, not a price list. The 27th edition opened on 17 December 2025, charged 328 CNY for a standard adult ticket after an opening discount, and closed early on 21 February 2026 when the weather turned warm.",
    "Stay near Central Street so you can go indoors between outdoor sessions."
  ],
  "sections": [
    {
      "heading": "1. Why Harbin in winter",
      "paragraphs": [
        "Harbin is the capital of Heilongjiang, in the far north-east, built up as a railway city with a strong Russian presence in the early twentieth century. That history is still on the street. Central Street is a cobbled pedestrian avenue of bakeries and stone facades. St Sophia is a former Orthodox cathedral, now a museum, in the middle of a square. In summer this is a pleasant northern city. In winter it becomes something else, because the river ice is thick enough to build with.",
        "Ice and Snow World is the set-piece: a ticketed park of ice architecture on the riverbank, lit in colour after dark. It is not the whole of Harbin, and it is not the same thing as the city-wide ice festival that opens inside the season. Zhaolin Park's ice lanterns and the snow sculptures on Sun Island are separate sites with their own tickets and, usually, a calmer crowd. A good three-day trip uses the big park once and a smaller site once.",
        "You come for the spectacle and for the odd experience of eating dumplings in a city that is genuinely equipped for this weather. Indoor heating in Harbin is serious, unlike in southern China. The risk is not the hotel. The risk is the forty minutes you spend outside with a dying phone battery, thin gloves, and a plan to \"just see one more tower\"."
      ]
    },
    {
      "heading": "2. Best time to visit, and what is confirmed for 2026-27",
      "paragraphs": [
        "The heart of the season is late December through early February. January is typically the coldest month. Plan on daytime temperatures around −15°C to −20°C and colder nights, with wind on the river making exposed skin hurt faster than the forecast suggests. Late February is the risky end. Warm spells soften the sculptures.",
        "On 12 October 2026 the Heilongjiang government announced that the 28th Ice and Snow World would open in the 2026-27 winter, with the park expanded to 1.25 million square metres and about 400,000 cubic metres of ice and snow. That announcement did not set an opening day or a ticket price. Recent seasons have published the opening only a day or two beforehand, because the build depends on the freeze. Do not buy a dated ticket from an unofficial reseller who claims the opening day is guaranteed.",
        "For scale, the previous edition is documented. The provincial culture and tourism department said the 27th Ice and Snow World would open at 10:00 on 17 December 2025, with a standard adult ticket of 298 CNY through 23 December and 328 CNY after that. On 19 February 2026 the operator posted that it would close temporarily because temperatures had risen above freezing, and the park then ended the season early, on 21 February, with refunds through the original sales channel. Treat 328 CNY as last winter's adult price, not as this winter's."
      ]
    },
    {
      "heading": "3. Getting there and entry rules",
      "paragraphs": [
        "Harbin Taiping International Airport is the air gate, with a metro or taxi into the centre. In winter, leave extra time for airport roads. High-speed trains from Beijing often take roughly five to eight hours depending on the service. An overnight train is the other option if you want to save a hotel night and you sleep well in a berth. Book on 12306 with your passport.",
        "The 30-day unilateral visa-free policy, extended through 31 December 2026, covers many visitors and is the simple choice for a winter holiday. Harbin Taiping is among the ports used for 240-hour visa-free transit for nationals of 57 countries who continue to a third country or region. Confirm the port is on the current National Immigration Administration list when you book, and remember that 240 hours is an awkward box for a festival whose dates move.",
        "Buy Ice and Snow World tickets only through channels the operator names for that season. For the 27th edition, the culture department pointed travelers to the park's official WeChat account and to major Chinese platforms including Alipay. The service line printed on the February 2026 closure notice was 400-639-1999. Use whatever the new season's notice repeats. A passport number may be required at purchase or at the gate."
      ]
    },
    {
      "heading": "4. Getting around and paying",
      "paragraphs": [
        "The metro is the warm way across town and runs to the main stations. Taxis and DiDi work, and in January they are worth using for any hop that would be a long exposed walk. Zhongyang Street itself is pedestrian. The riverfront promenade facing the ice park is the coldest walk you will do, because wind comes off the ice.",
        "Alipay and WeChat Pay work in hotels, metros, and restaurants. Outdoor booths at an ice park are a worse bet: gloves, frozen screens, and QR codes that will not scan. Carry cash, and keep one card ready. Put a power bank in an inner pocket. Phones shut down quickly in this cold if they live in an outer jacket.",
        "English signage is decent on Central Street and thin elsewhere. A translation app with the camera download installed offline will cover menus."
      ]
    },
    {
      "heading": "5. Where to stay in Harbin",
      "paragraphs": [
        "Central Street and the blocks around St Sophia are the practical base. You can step inside for tea whenever the cold wins, and you are a short ride from the river. Book early for January weekends. Winter is high season here, which is the reverse of most of China.",
        "A hotel near the ice park saves one taxi and loses the city. Stay there only if the park is your single goal and you do not care about breakfast on Central Street. Check that heating is central and that the window seals. Harbin hotels generally understand winter. A suspiciously cheap room may not.",
        "Approximate January rates: simple hotels 250 to 450 CNY (about 35 to 65 USD); comfortable mid-range 500 to 900 CNY (about 70 to 125 USD); international hotels 1,100 CNY and up (about 155 USD+). Prices drop sharply outside the ice season, which does not help a winter trip."
      ]
    },
    {
      "heading": "6. A practical 3-day winter itinerary",
      "paragraphs": [
        "Day 1 is acclimatising, not heroics. Walk Central Street in the late morning, go into St Sophia, and eat a long indoor lunch. In the afternoon, walk only as far as the river promenade and back. Look at the ice across the water if the park is lit, and do not start your visit then. The point of day 1 is to learn how many minutes your gloves actually buy you.",
        "Day 2 is Ice and Snow World after dark, when the lights are the show. Arrive fed, with chemical hand warmers, spare batteries, and a plan to leave before you are miserable rather than after. Two hours is a successful visit for many first-timers. The slides and snow activities close in extreme cold or wind, so treat them as a bonus. If the season has not opened yet, or has already closed for a thaw, switch this day to Zhaolin Park or Sun Island and do not let a reseller talk you into a \"private ice village\" at twice the price.",
        "Day 3 is the smaller site you skipped, plus food. Sun Island's snow sculptures photograph well in the morning light. Zhaolin Park is the easier, more central lantern alternative. Keep the afternoon for a bakery, a dumpling lunch, and the station or airport. Three outdoor sessions in three days is too many. Two is the shape that people remember fondly."
      ]
    },
    {
      "heading": "7. What to eat",
      "paragraphs": [
        "Dumplings are the correct winter food, ordered by the basket in a heated room. Guobaorou, a dish of crispy pork in a sweet-sour sauce, is the local plate most restaurants will steer you toward. Smoked sausage and dense Russian-style bread, often called lieba, show up in the bakeries on Central Street and make a better snack than hunting for a food court in the cold.",
        "A dumpling lunch is often 40 to 80 CNY. A sit-down dinner with pork and a hot dish is often 80 to 150 CNY per person. Hot drinks are part of the budget. Alcohol feels warming for about ten minutes and then makes the walk back worse. Save it for the hotel."
      ]
    },
    {
      "heading": "8. Budget for three winter days",
      "paragraphs": [
        "Approximate per person per day, excluding long-distance trains and flights, at about 7.1 CNY to 1 USD. The ice-park ticket can distort one of the days.",
        "If the coming season repeats last winter's 328 CNY adult ticket, that single entry is about 46 USD before you eat. Until the operator publishes a 2026-27 price, carry that figure only as a planning estimate and check the official notice the week you travel.",
        "Budget: 400 to 650 CNY (about 55 to 90 USD) averaged across three days. A simple heated room, dumplings, the metro, and one big park ticket spread over the stay.",
        "Mid-range: 800 to 1,300 CNY (about 110 to 185 USD). A Central Street hotel, taxis, the ice park, and a second smaller attraction.",
        "Comfort: 1,800 CNY and up (about 250 USD+). An international hotel, a private transfer, and meals you do not have to hunt for."
      ]
    },
    {
      "heading": "9. Practical tips and common mistakes",
      "paragraphs": [
        "Clothes: insulated boots with grip, wool socks, a coat that covers the hips, a hat, a scarf or balaclava, and mittens that let you use a phone for thirty seconds at a time. Jeans and a fashion coat are how people end day 1 in the hotel.",
        "Frostbite is a real limit on ears, fingers, and toes. If skin goes numb and white, go indoors. The sculpture will still be there.",
        "Do not build the trip around a late-February date unless your hotel and ticket are refundable. The 2026 closure happened because the ice was no longer safe.",
        "Buy the park ticket from the named official channel, with the passport you will carry. Keep the purchase record for a refund if the park closes.",
        "Skip animal parks that advertise close contact with big cats. A winter city does not need that side trip to be complete."
      ]
    }
  ],
  "faq": {
    "question": "Is Harbin too cold for a first China trip?",
    "answer": "It is too cold for a first China trip that was supposed to be temples and street food in a light coat. It is a reasonable first trip if winter is the point, you own or can buy real cold-weather gear, and you keep outdoor sessions short. If you want a milder first city, go somewhere else and save Harbin for a dedicated winter week."
  },
  "internalLinks": [
    {
      "slug": "best-time-to-visit-china-first-trip",
      "anchor": "See how a Harbin winter sits next to milder China seasons"
    },
    {
      "slug": "china-visa-payment-checklist-first-timers",
      "anchor": "Sort entry rules and mobile pay before a peak-season trip"
    },
    {
      "slug": "china-first-trip-budget-by-city",
      "anchor": "Compare a winter city budget with warmer first-trip cities"
    },
    {
      "slug": "how-many-days-in-first-china-city",
      "anchor": "Decide whether three days is the right length before you book"
    }
  ],
  "updateSummary": [
    "New guide: winter Harbin plan with Ice and Snow World dates separated from last season's prices.",
    "Provincial announcements checked in November 2026."
  ],
  "sources": [
    {
      "name": "Heilongjiang provincial government, 2026-27 season announcement",
      "url": "https://hlj.gov.cn/hlj/c107856/202610/c00_31983393.shtml",
      "note": "28th Ice and Snow World confirmed for winter 2026-27 at 1.25 million square metres."
    },
    {
      "name": "Heilongjiang Department of Culture and Tourism",
      "url": "https://wlt.hlj.gov.cn/wlt/c114169/202512/c00_31897123.shtml",
      "note": "27th edition opening on 17 December 2025 and the 298 then 328 CNY adult prices."
    },
    {
      "name": "Ice and Snow World closure notice",
      "url": "https://wlt.hlj.gov.cn/wlt/c114145/202602/c00_31916064.shtml",
      "note": "February 2026 warm-weather closure and the operator hotline."
    },
    {
      "name": "National Immigration Administration of China",
      "url": "https://en.nia.gov.cn/n147418/n147463/c183412/content.html",
      "note": "240-hour transit rules to confirm for Harbin Taiping."
    }
  ],
  reviewer: REVIEWER_TEAM_NAME
},
{
  "slug": "guangzhou-travel-guide-first-trip",
  "title": "Guangzhou Travel Guide for First-Time Visitors: Dim Sum, the Pearl River, and a 3-Day Plan",
  "titleVariants": {
    "A": "Guangzhou Travel Guide for First-Time Visitors",
    "B": "Guangzhou in 3 Days: Morning Tea, Shamian, and the Canton Tower"
  },
  "description": "A first-visit Guangzhou guide: dim sum in the morning, Shamian and the old centre, Canton Tower, visa-free entry, where to stay, a 3-day plan, approximate budgets in CNY and USD, and Canton Fair weeks to avoid.",
  "intro": "Guangzhou is the city where Cantonese food is an ordinary morning, not a special dinner. It is bigger and older than Shenzhen, less international-looking than Hong Kong, and easier to enjoy if you care about a teahouse more than a skyline. This guide uses three days for the historic centre, one proper yum cha, and a river evening, and it tells you when the Canton Fair will take your hotel.",
  "keyPoints": [
    "Eat dim sum in the morning, ideally before 11:00. It is a breakfast culture, not only a dinner menu.",
    "October to December and March to April are the comfortable months. Summer is long, hot, and inside the typhoon season.",
    "Check Canton Fair dates before you book. The twice-yearly trade fair fills Pazhou hotels.",
    "High-speed trains from Guangzhou South reach Hong Kong West Kowloon in about 50 minutes on some services, and Shenzhen North faster than that."
  ],
  "sections": [
    {
      "heading": "1. Why Guangzhou is worth a first trip",
      "paragraphs": [
        "Guangzhou is the capital of Guangdong and the historic centre of Cantonese culture. People have been trading here for centuries, and the city still feels like a port that happens to have a metro. Shamian Island keeps a grid of shaded colonial streets. The Chen Clan Ancestral Hall is one of the finest pieces of Lingnan architecture you can walk through. Yuexiu Park holds the Five Rams statue the city uses as its emblem. None of this is quiet, and none of it is fake-old in the way a rebuilt water town can be.",
        "The food argument is stronger than the monument argument. Cantonese cooking is about timing, stock, and dim sum, the small dishes that travel around a teahouse with tea. You can eat a better breakfast here than in almost any other Chinese city, and you can do it for the price of a bakery visit at home. Travelers who \"do not like Chinese food\" and then sit down for har gow and rice-noodle rolls often revise that sentence.",
        "Guangzhou is also the practical hinge for the south. Hong Kong and Shenzhen are short train rides. Guilin is a few hours by high-speed rail if you want karst after the city. You do not have to do those trips. The point is that a Guangzhou base does not trap you."
      ]
    },
    {
      "heading": "2. Best time to visit Guangzhou",
      "paragraphs": [
        "November, December, March, and April are the months when walking Shamian is pleasant and the humidity drops. Late autumn is especially kind. The city does not really do a hard winter. A jacket is usually enough.",
        "May through September is hot and wet. Afternoon thunderstorms are normal, and typhoons crossing the South China Sea can cancel ferries and delay trains even when the centre of the storm is elsewhere. Build indoor time into a summer day: a teahouse, the Chen Clan halls, a museum.",
        "The China Import and Export Fair, the Canton Fair, runs in spring and autumn sessions at the Pazhou complex. It is one of the largest trade fairs in the world, and it pulls hotel inventory out of the city. If your dates overlap a session, book early or stay outside Pazhou and ride the metro. The fair's own site is the calendar to trust."
      ]
    },
    {
      "heading": "3. Getting there and entry rules",
      "paragraphs": [
        "Guangzhou Baiyun International Airport is a major international hub, linked to the city by metro. Allow an hour or more to the old centre. Guangzhou South is the high-speed station for Hong Kong, Shenzhen, and Guilin. On the MTR high-speed timetable, some services from Hong Kong West Kowloon reach Shenzhen North in about 20 minutes and Guangzhou South in about 50 minutes. The return direction is similar. Guangzhou station and Guangzhou East serve other rail lines. Read the station name on the ticket before you tell a driver \"the train station\".",
        "Entry is a national rule, not a city one. Many travelers qualify for 30-day unilateral visa-free entry, extended through 31 December 2026. Nationals of 57 countries may use 240-hour visa-free transit with an onward ticket to a third country or region. Guangzhou Baiyun is an eligible airport, and the immigration authorities have also designated the Pazhou ferry terminal as a transit port. The permitted area in Guangdong is broad, but it is still a published area. A day trip to Hong Kong is a separate immigration event and is a bad thing to improvise in the middle of a 240-hour mainland transit. Use a normal visa or the 30-day visa-free stay if Hong Kong is part of the plan.",
        "Passports are the train ticket on this corridor. Book through 12306 or the Hong Kong high-speed counters, and carry the same document."
      ]
    },
    {
      "heading": "4. Getting around and paying",
      "paragraphs": [
        "The metro is large, bilingual enough to use, and the right tool between Shamian, Yuexiu, Tianhe, and Canton Tower. Fares are a few yuan. Ferries and the Pearl River cruise boats are the scenic alternative at night. Taxis and DiDi fill the gaps. Traffic in the old centre is slow at meal times, so a two-stop metro ride can beat a cab.",
        "Alipay and WeChat Pay with a foreign card work widely. Bind the card and test it at the airport. Cash is a backup, not the plan. Menus in the best teahouses may be Chinese only, often with photos or a pencil-and-paper order sheet. A camera translation app is more useful here than in Shanghai.",
        "Cantonese is the street language. Mandarin works in hotels, stations, and many restaurants, and it does not work everywhere. Pointing at a dish is a complete transaction. People are used to it."
      ]
    },
    {
      "heading": "5. Where to stay in Guangzhou",
      "paragraphs": [
        "Liwan and the streets around Shamian put you in the older city, near morning tea and within walking distance of the Chen Clan halls. Rooms can be older. The location is the point. Beijing Road, east of there, is louder and more commercial.",
        "Zhujiang New Town and Tianhe are the modern side: newer hotels, malls, and a straight metro ride to Canton Tower and to Guangzhou East or the financial district. Stay here if you want a quieter night and you do not mind starting each morning on the train.",
        "Approximate nightly rates outside fair weeks: simple hotels 250 to 450 CNY (about 35 to 65 USD); mid-range 500 to 900 CNY (about 70 to 125 USD); international hotels 1,100 CNY and up (about 155 USD+). During a Canton Fair session, multiply before you assume those bands still exist."
      ]
    },
    {
      "heading": "6. A practical 3-day Guangzhou itinerary",
      "paragraphs": [
        "Day 1 starts with dim sum, not with a monument. Pick a teahouse near Liwan or a well-known room that takes a morning queue, and be there when it opens. Order har gow, siu mai, cheung fun, a barbecue-pork bun, and egg tarts, plus tea. Walk Shamian afterwards while you are full and slow. In the afternoon, visit the Chen Clan Ancestral Hall. The carving is the sight. Give it an hour, not a photograph from the gate.",
        "Day 2 is parks and the river. Yuexiu Park and the Five Rams statue fill a morning. The Guangdong Museum or the Sun Yat-sen Memorial Hall is the indoor alternative if it rains. In the evening, go up Canton Tower or simply walk the riverfront and look at it. The tower's official site lists an outdoor deck at 488 metres among its ticketed levels. Buy from the tower or its mini program and read which level you are paying for. A Pearl River boat is the other night plan. Do one, not both, unless you enjoy queues.",
        "Day 3 is a choice. Stay for Beijing Road, a temple, and another teahouse, which is a perfectly good use of the day. Or take the train to Shenzhen or Hong Kong if those cities are the next chapter and you already have the right entry papers. Foshan, just west of Guangzhou, is the smaller day trip, with an ancestral temple and a reputation for kung fu. It rewards a full morning and a return before dinner. Do not add Guilin on this day. The ride is a few hours and the landscape wants a night of its own."
      ]
    },
    {
      "heading": "7. What to eat, and how morning tea works",
      "paragraphs": [
        "Yum cha means drinking tea while dim sum arrives. You sit, you are given a pot, and you order off a sheet or from a cart depending on the house. Popular dishes beyond the basics include spare ribs with black bean, turnip cake, and steamed custard buns. Go hungry. A serious morning can replace lunch. Expect roughly 60 to 120 CNY per person at a busy local room, more at a famous one with a view.",
        "Later in the day, roast goose, blanched greens with oyster sauce, and claypot rice are the meals that explain the cuisine better than a banquet. White cut chicken and a simple soup are there if you overdid the chili elsewhere in China. Night markets exist and vary in quality. A second teahouse the next morning will teach you more than a random skewer street."
      ]
    },
    {
      "heading": "8. Budget for three days",
      "paragraphs": [
        "Approximate per person per day, excluding high-speed tickets out of the city and international flights, at about 7.1 CNY to 1 USD.",
        "Budget: 300 to 500 CNY (about 42 to 70 USD). A simple hotel, two teahouse meals, the metro, and one paid hall or tower ticket.",
        "Mid-range: 700 to 1,200 CNY (about 100 to 170 USD). A better room in Liwan or Tianhe, taxis when the heat wins, Canton Tower, and a river evening.",
        "Comfort: 1,800 CNY and up (about 250 USD+). An international hotel, a booked private room at a famous teahouse, and a day trip with a driver."
      ]
    },
    {
      "heading": "9. Practical tips and common mistakes",
      "paragraphs": [
        "Do not arrive at a famous teahouse at 1 pm and expect the full cart. Morning is the meal.",
        "Check the Canton Fair calendar before you call a hotel \"expensive\". The fair, not the skyline, is what moves the rates.",
        "Watch for tea-ceremony invitations from strangers around Beijing Road and the stations. The pattern is a friendly tasting that becomes a closed-door sales pitch for tea at a price you would not pay in a shop. Decline and walk.",
        "Typhoon days are not the day to take a Pearl River boat. Follow the city's weather warnings and move the river plan.",
        "If Hong Kong is next, confirm you are allowed to enter Hong Kong on your passport, and do not assume a mainland visa-free stamp covers it. It does not."
      ]
    }
  ],
  "faq": {
    "question": "Is Guangzhou or Shenzhen better for a first visit?",
    "answer": "Choose Guangzhou if food, older streets, and a real Cantonese morning matter. Choose Shenzhen if you want a newer city, easier English in some districts, and a quicker hop to Hong Kong. They are close enough by train that a longer south China trip can include both without much friction."
  },
  "internalLinks": [
    {
      "slug": "shenzhen-hong-kong-combo-travel-guide",
      "anchor": "Continue to Shenzhen and Hong Kong if your entry status allows it"
    },
    {
      "slug": "guilin-yangshuo-travel-guide-first-trip",
      "anchor": "Ride on to Guilin and Yangshuo when you want a landscape after the city"
    },
    {
      "slug": "china-visa-payment-checklist-first-timers",
      "anchor": "Confirm visa and payment setup before you book"
    },
    {
      "slug": "best-time-to-visit-china-first-trip",
      "anchor": "Match Guangzhou's mild winter to the rest of the route"
    }
  ],
  "updateSummary": [
    "New guide: first-visit Guangzhou plan built around morning tea, Shamian, and the river.",
    "Entry rules and rail pattern checked against official sources in November 2026."
  ],
  "sources": [
    {
      "name": "Canton Tower",
      "url": "https://www.cantontower.com/",
      "note": "Official levels, including the 488-metre outdoor deck."
    },
    {
      "name": "China Import and Export Fair",
      "url": "https://www.cantonfair.org.cn/",
      "note": "Session dates that move Guangzhou hotel prices."
    },
    {
      "name": "MTR High Speed Rail timetable",
      "url": "https://www.highspeed.mtr.com.hk/res/pdf/long-haul-train-timetable-en.pdf",
      "note": "Sample West Kowloon, Shenzhen North, and Guangzhou South times."
    },
    {
      "name": "National Immigration Administration of China",
      "url": "https://en.nia.gov.cn/n147418/n147463/c183412/content.html",
      "note": "240-hour transit ports, including Guangzhou additions such as Pazhou."
    }
  ],
  reviewer: REVIEWER_TEAM_NAME
},
{
  "slug": "shenzhen-hong-kong-combo-travel-guide",
  "title": "Shenzhen and Hong Kong Combo Trip: Borders, Trains, and a 3-Day Plan",
  "titleVariants": {
    "A": "Shenzhen and Hong Kong Combo Guide for First-Time Visitors",
    "B": "Two Cities, Two Borders: Shenzhen and Hong Kong in Three Days"
  },
  "description": "How to combine Shenzhen and Hong Kong: separate immigration, checkpoint hours, Octopus versus Alipay, where to sleep, what to eat, a tight 3-day plan, and approximate budgets in CNY, HKD, and USD.",
  "intro": "Shenzhen and Hong Kong share a river and almost nothing else about how you enter, pay, or ride a train. One is a mainland city that grew up in a generation. The other is a separate customs territory with its own currency and its own visa rules. A combo trip is excellent and easy to botch. This guide treats the border as the main logistics problem and then builds three days that accept how short three days is.",
  "keyPoints": [
    "A mainland visa, 30-day visa-free entry, or 240-hour transit does not admit you to Hong Kong. Hong Kong entry permission does not admit you to the mainland. You clear immigration twice.",
    "Do not put a Hong Kong hop in the middle of a 240-hour mainland transit unless you have confirmed in writing that your route is allowed. A normal visa or 30-day visa-free entry plus separate Hong Kong permission is the clean combo.",
    "Lok Ma Chau Spur Line closes at 22:30. Lo Wu runs until midnight. West Kowloon high-speed station runs 6:30 to 23:30. Missing the last crossing is a hotel problem.",
    "Pay in Shenzhen with Alipay or WeChat. Pay in Hong Kong with Octopus, a contactless card, or HKD cash."
  ],
  "sections": [
    {
      "heading": "1. Why put these two cities on one trip",
      "paragraphs": [
        "Shenzhen is the mainland city that makes the most sense next to Hong Kong. It is new, dense, and practical: a bay, a design district, and some of the easiest metro connections in China. It is not where you go for an ancient wall. It is where you go to see the country that built a metropolis on a fishing county, and to cross into Hong Kong without taking a flight.",
        "Hong Kong is a harbour city with its own food culture, its own transit system, and a skyline that still earns the ferry ride. Victoria Peak, the Star Ferry, and a bowl of wonton noodles are a complete short visit if you do not try to add Disney, Lantau, and a list of neighbourhoods. Three days for both cities means one full day on each side and one day that is mostly the crossing.",
        "The combo works best when the paperwork is boring. Sort entry before you sort viewpoints. Everything else on this route is simple by comparison."
      ]
    },
    {
      "heading": "2. Best time to visit",
      "paragraphs": [
        "November to early April is the comfortable season on both sides of the border. Humidity drops, walking the harbour is pleasant, and typhoons are unlikely. Chinese New Year is the exception: families move in both directions, hotels jump, and checkpoints slow down.",
        "May to September is hot and wet. Shenzhen and Hong Kong both sit in the typhoon belt. A signal raised in Hong Kong can shut ferries, Peak Tram, and outdoor plans even if Shenzhen is only rainy. Keep one indoor day in the plan during those months.",
        "Weekends are the land-border crush, especially Sunday evening when people return from shopping. Cross on a weekday morning if you can."
      ]
    },
    {
      "heading": "3. Borders, trains, and entry rules",
      "paragraphs": [
        "Hong Kong's Immigration Department lists the land control points and their hours. Lo Wu is open from 6:30 to midnight and connects to Shenzhen's Luohu on Metro Line 1. Lok Ma Chau Spur Line is open from 6:30 to 22:30 and connects to Futian Checkpoint. Shenzhen Bay is open for passengers from 6:30 to midnight. The Hong Kong-Zhuhai-Macao Bridge port is 24 hours and is the wrong tool for a simple Shenzhen day. Express Rail Link West Kowloon is open from 6:30 to 23:30. Shenzhen's own port page matches these land crossings closely enough to plan on, and you should still re-check both sites the week you travel.",
        "The high-speed train is the most comfortable crossing. West Kowloon and Futian or Shenzhen North are about 15 to 25 minutes apart on many services. You pass mainland and Hong Kong immigration inside the West Kowloon process before you board toward the mainland, and the reverse when you leave. Your passport is the ticket. The MTR high-speed guide explains e-tickets and the document gates.",
        "Immigration rules do not follow the train. Hong Kong decides its own visit conditions. Many nationalities can enter visa-free for a short stay; the length depends on the passport, and the Immigration Department page is the source. Mainland China's 30-day unilateral visa-free policy, extended through 31 December 2026, and the 240-hour transit policy for 57 countries, are different documents and different stamps. West Kowloon is a mainland 240-hour entry port. That does not mean you can wander into Hong Kong and back on the same transit permission. If the combo is the trip, travel on an entry status that explicitly allows you to leave and re-enter the mainland, or structure the nights so you do not need to."
      ]
    },
    {
      "heading": "4. Getting around and paying on each side",
      "paragraphs": [
        "In Shenzhen, use the metro. Line 1 ends at Luohu. Line 4 ends at Futian Checkpoint. Line 11 and others reach the airport and the bay. Alipay or WeChat Pay with a foreign card covers almost everything. RMB is the currency. DiDi works. English signage is better than in many mainland cities and still not something to rely on in a hurry.",
        "In Hong Kong, use the MTR and the Star Ferry. Octopus is the stored-value card that locals use for transit and for convenience stores. You can buy one at the airport or an MTR station, pay a refundable deposit, and return it when you leave. Contactless Visa and Mastercard work at many MTR gates now, and cash in HKD still works in taxis and dai pai dong stalls. A mainland Alipay wallet sometimes pays at larger shops and often fails at a neighbourhood cafe. Do not make it your only method.",
        "Phones: a mainland SIM may not include Hong Kong data. Buy a short roaming pass, an eSIM that covers both, or a local Hong Kong SIM if the Hong Kong days are the ones with maps. Plugs in Hong Kong are the UK-style three pin. Shenzhen uses the mainland two-pin and three-pin mix. A small adapter avoids a useless hotel evening."
      ]
    },
    {
      "heading": "5. Where to stay",
      "paragraphs": [
        "On a three-day combo, change hotels once, not twice. A practical split is two nights in Hong Kong and one in Shenzhen, or the reverse if your flight lands at Shenzhen Bao'an and leaves from Hong Kong, or the other way around. Sleeping in Luohu or Futian on the Shenzhen side makes an early crossing shorter. Nanshan and Shekou are pleasanter Shenzhen neighbourhoods and add a metro ride to the checkpoint.",
        "In Hong Kong, Tsim Sha Tsui, Yau Ma Tei, and the area around Central or Sheung Wan cover different budgets and the same harbour. You are paying for a small room. That is normal. Read the size, not only the star rating.",
        "Approximate nightly rates: Shenzhen mid-range hotels 450 to 800 CNY (about 65 to 110 USD); Hong Kong mid-range hotels often 1,000 to 2,000 HKD, which at typical rates is roughly 130 to 260 USD. Hostel beds exist on both sides and are the realistic way to keep a short combo inside a modest budget. Holiday and fair dates break these bands."
      ]
    },
    {
      "heading": "6. A practical 3-day combo itinerary",
      "paragraphs": [
        "Day 1 is Shenzhen, assuming you landed there. Nanshan's Shenzhen Bay park gives you a flat walk and a look toward Hong Kong. OCT Loft, the old factory creative district nearby, is a better hour than a mall if you like design shops. Eat in Nanshan or in a Chaoshan beef restaurant, which is one of Shenzhen's real food reasons. Sleep near Futian or Luohu if day 2 starts with a land crossing.",
        "Day 2 is the crossing and Hong Kong Island. Use Futian-Lok Ma Chau or the high-speed train in the morning, while the halls are merely busy. Drop bags if you can. Ride the Star Ferry across the harbour, then go up Victoria Peak by the Peak Tram or a bus if the tram queue is a wall. Walk one neighbourhood at street level, Sheung Wan or Central, instead of collecting viewpoints. Wonton noodles or a dai pai dong dinner beats a harbour restaurant with a minimum spend.",
        "Day 3 is Kowloon in the morning and a departure. The Tsim Sha Tsui promenade, a market street if you like that sort of hour, and a bakery are enough. Leave for Hong Kong International Airport by MTR with more time than the map suggests, or return to Shenzhen before Lok Ma Chau closes if your flight is at Bao'an. A same-day dash to Macau does not fit. Neither does a Disney day. The combo is already two cities."
      ]
    },
    {
      "heading": "7. What to eat on each side",
      "paragraphs": [
        "Shenzhen eats broadly: Cantonese seafood, Chaoshan beef hotpot or beef balls, and a lot of casual chains that are genuinely good. A solid dinner is often 80 to 150 CNY per person. The city is not a dim-sum capital in the way Guangzhou is. If morning tea is the priority, spend that morning in Guangzhou instead and use Shenzhen as the border.",
        "Hong Kong rewards the ordinary: wonton noodles, milk tea, egg tarts, roast goose, and pineapple buns that do not contain pineapple. A noodle shop lunch is often 50 to 90 HKD. A sit-down dinner is easy to push past 250 HKD per person without ordering anything extravagant. Tipping is not required in local places. Some hotel restaurants add a service charge, which the bill will show."
      ]
    },
    {
      "heading": "8. Budget for three days",
      "paragraphs": [
        "Approximate per person per day at about 7.1 CNY to 1 USD. Hong Kong figures below use a rough planning rate near 7.8 HKD to 1 USD. Both rates move.",
        "Shenzhen days, mid-range: 600 to 1,000 CNY (about 85 to 140 USD), including a decent hotel and meals. A tighter day with a simple room can sit nearer 350 to 550 CNY.",
        "Hong Kong days, mid-range: 1,200 to 2,200 HKD (about 150 to 280 USD), mostly the room. Food and the MTR are not the expensive part. A hostel version can cut that sharply if you accept a bunk.",
        "Crossings: an MTR high-speed ticket between West Kowloon and Shenzhen is usually a modest fare compared with the hotels. Land-border MTR rides are cheaper still. The expensive mistake is a last-minute taxi between airports when a train would do."
      ]
    },
    {
      "heading": "9. Practical tips and common mistakes",
      "paragraphs": [
        "Screenshot the checkpoint closing time and set an alarm. A good Kowloon dinner that ends at 22:45 is how people miss Lok Ma Chau.",
        "Keep both entry stamps in mind at hotels. Mainland hotels register your passport with the police. Hong Kong hotels record your stay as well. Carry the passport, not a photo of it, at every gate.",
        "Traffic keeps left in Hong Kong and right in Shenzhen. It matters the moment you step off a curb while looking at a map.",
        "Do not carry a large undeclared amount of cash across. Both sides have declaration rules. Cards and Octopus remove the reason to try.",
        "If your only goal is Hong Kong, fly there directly. The combo is for people who want both cities, not a way to save money on a Hong Kong flight."
      ]
    }
  ],
  "faq": {
    "question": "Can I visit Hong Kong during a 240-hour visa-free transit in Shenzhen?",
    "answer": "Do not assume so. The 240-hour policy admits you to a published mainland area for a transit stay. Hong Kong is a separate immigration authority. Leaving the mainland can end the transit permission or leave you unable to re-enter. Use a visa or a visa-free status that allows the mainland trips you planned, plus Hong Kong's own visit rules, and confirm the route before you buy non-refundable tickets."
  },
  "internalLinks": [
    {
      "slug": "guangzhou-travel-guide-first-trip",
      "anchor": "Add Guangzhou if you want a Cantonese city as well as the border"
    },
    {
      "slug": "guilin-yangshuo-travel-guide-first-trip",
      "anchor": "Continue inland to Guilin only when the combo already has enough days"
    },
    {
      "slug": "china-visa-payment-checklist-first-timers",
      "anchor": "Read the entry and payment checklist before a two-system trip"
    },
    {
      "slug": "china-first-trip-budget-by-city",
      "anchor": "Compare a Hong Kong night with mainland city budgets"
    }
  ],
  "updateSummary": [
    "New guide: Shenzhen and Hong Kong combo with checkpoint hours, payment split, and a 3-day plan.",
    "Control-point hours and transit cautions checked against official sources in November 2026."
  ],
  "sources": [
    {
      "name": "Hong Kong Immigration Department: control points",
      "url": "https://www.immd.gov.hk/eng/contactus/control_points.html",
      "note": "Opening hours for Lo Wu, Lok Ma Chau, West Kowloon, Shenzhen Bay, and the bridge."
    },
    {
      "name": "Hong Kong Immigration Department: visit visas",
      "url": "https://www.immd.gov.hk/eng/services/visas/visit_transit/visit_visa_entry.html",
      "note": "Hong Kong visit conditions are separate from mainland rules."
    },
    {
      "name": "Shenzhen ports",
      "url": "https://www.szgm.gov.cn/english/services/checkpoints/",
      "note": "Mainland-side checkpoint hours, including Luohu and Futian."
    },
    {
      "name": "National Immigration Administration of China",
      "url": "https://en.nia.gov.cn/n147418/n147463/c183412/content.html",
      "note": "240-hour transit rules, including West Kowloon as a mainland port."
    }
  ],
  reviewer: REVIEWER_TEAM_NAME
},
{
  "slug": "huangshan-travel-guide-first-trip",
  "title": "Huangshan Travel Guide for First-Time Visitors: Peaks, Cableways, and a 3-Day Plan",
  "titleVariants": {
    "A": "Huangshan Travel Guide for First-Time Visitors",
    "B": "Huangshan in 3 Days: Which Gate, Whether to Sleep on the Summit, and What It Costs"
  },
  "description": "A first Huangshan plan: official hours, reservation rules, cableway choices, where to sleep on or off the mountain, Hongcun, a 3-day itinerary, approximate budgets in CNY and USD, and weather traps.",
  "intro": "Huangshan is a granite mountain in southern Anhui that Chinese painters treated as the model of a mountain. Pines grow out of rock, stairs go on longer than the brochure implies, and the famous sea of clouds is a weather event, not a guarantee. This guide uses the scenic area's own hours and reservation rules, and it plans three days so you can sleep once on the summit instead of racing the last cableway.",
  "keyPoints": [
    "Reserve a real-name, timed ticket on the official Huangshan platform before you go. The gate does not sell walk-up tickets.",
    "From 5 March through 30 November 2026, weekday hours are 7:00 to 17:10 and weekend hours are 6:30 to 17:40. Winter hours are shorter. Hiking gates stop admitting people at 15:00.",
    "The 2025 price policy set the adult ticket at 190 CNY in the regular season and 150 CNY in the winter window, with cableways extra. Promotions change. The mini program is the live price.",
    "One night on the summit is what makes sunrise possible. A single long day from the south gate is a workout, not a relaxed first visit."
  ],
  "sections": [
    {
      "heading": "1. Why Huangshan is worth the stairs",
      "paragraphs": [
        "UNESCO inscribed Mount Huangshan in 1990 as a mixed cultural and natural site. The mountain has been a subject for poets and painters since the Tang dynasty. The landscape people came for is specific: granite peaks, twisted pines, and a deck of cloud that sometimes fills the valleys so the summits look like islands. UNESCO notes 77 peaks over 1,000 metres. The highest, Lotus Peak, reaches 1,864 metres. That is not Himalayan altitude, and it is still a full day of stone steps.",
        "The cultural layer is why the mountain is not only a hike. The same views fed the \"mountain and water\" painting tradition. You notice it when a railing has been placed exactly where a pine and a drop line up. You do not need to care about painting to enjoy the walk. It helps explain why the paths are where they are.",
        "Hongcun and Xidi, the ancient villages in southern Anhui, are a separate UNESCO site in the valleys below. They are white walls, dark roofs, and a lot of visitors. Used as the arrival day, Hongcun stops the trip from being only stairs. Used as a third mountain, it makes the trip silly."
      ]
    },
    {
      "heading": "2. Best time to visit Huangshan",
      "paragraphs": [
        "April, May, early June, late September, October, and November are the practical months. Temperatures on the trails are cooler than in the town, pines look alive, and cloud seas are a reasonable hope after a change in the weather. They are never owed to you. A clear day with long views is also a success.",
        "July and August are crowded and stormy. Lightning closes exposed peaks and can stop cableways. Winter, roughly December into early March, is the snow season people photograph, and it is also when ice shuts stairs, when hours shrink, and when a reservation still will not get you onto a closed trail. Check the day's closure notice before you leave Tunxi.",
        "National Day and the May holiday fill both the cableways and the summit hotels. If those are your dates, book the room first and the scenery second. Sunrise at Bright Top means you are already sleeping up there. You cannot reasonably start from the town at 3 am and walk it."
      ]
    },
    {
      "heading": "3. Getting there and entry rules",
      "paragraphs": [
        "Huangshan North is the high-speed station. A shuttle or taxi to the south gate at Tangkou often takes 40 to 70 minutes. Tunxi, the old airport town also called Huangshan city, is where most people sleep the night before. Huangshan Tunxi International Airport is one of the ports added for 240-hour visa-free transit. From Hangzhou East, the train is a few hours and a sensible link. This is a poor place to arrive at 4 pm and expect to be on a summit for sunset.",
        "The scenic-area committee's notice of 4 March 2026 sets the hours. From 5 March to 30 November, the mountain, the shuttle buses, and the Yungu, Yuping, and Taiping cableways run 7:00 to 17:10 on weekdays and 6:30 to 17:40 on weekends and short holidays. From 1 December to 4 March the window is 8:00 to 16:40. Hiking ticket gates stop taking new walkers at 15:00 and become exit-only. Golden Week hours are announced separately. An east gate and the East Sea cableway opened on 11 June 2026. There is no hiking path on that side. The cableway is the only way in or out, which matters if weather stops it.",
        "Tickets are real-name, timed, and tied to a direction of entry. The committee tells visitors to book at least a day ahead on the official Huangshan mini program inside WeChat or Alipay, and three days ahead on holidays. The identity on the ticket must match the person at the gate. The published service line is 0559-2590999. The price policy released for the 2025 season, and still the reference figure until a newer full price list replaces it, set a regular adult ticket at 190 CNY and a winter-window adult ticket at 150 CNY. Cableways were extra: Yuping about 90 CNY one way in the regular season and 75 in the winter window, Yungu and Taiping about 80 and 65. The committee also runs short free-ticket promotions. Pay whatever the official platform shows for your date, not a blog's memory.",
        "Visa context matches the rest of China. The 30-day unilateral visa-free policy runs through 31 December 2026 for listed countries. The 240-hour transit policy can include arrival at Tunxi for nationals of 57 countries with an onward ticket, inside the permitted area. Anhui was added as a whole-province stay area when the transit rules were widened. Confirm that wording still applies before you overnight in Hangzhou on the same transit stamp."
      ]
    },
    {
      "heading": "4. Getting around and paying",
      "paragraphs": [
        "You do not drive on the mountain. A shuttle connects the south-gate area with cableway bases on a timetable published with the hours. On the summit, walking is the transport. Porters with bamboo poles will offer to carry bags. Agree a price before they touch the strap. The steps between Yuping and the north side are the part first-timers underestimate.",
        "A sensible first routing is one cableway up and a different one down so you are not walking the same ridge twice. Yuping, from the south, arrives near the Greeting Pine. Yungu arrives nearer the north scenic area. Taiping is the north gate approach. The east cableway is the new fourth option and, because there is no trail beside it, a bad one to miss the last car on.",
        "Buy the mountain ticket and the cableway inside the official mini program. That means Alipay or WeChat needs to be working with your foreign card before you leave the hotel. Cash does not solve a failed reservation. Carry some anyway for a summit noodle shop and for the porter if you hire one."
      ]
    },
    {
      "heading": "5. Where to stay",
      "paragraphs": [
        "Night one belongs in Tunxi or in Tangkou, the south-gate town. Tunxi has more restaurants and an easier airport link. Tangkou has an earlier start. Either is fine. Do not try to reach a summit hotel on the day your long-haul flight lands.",
        "Night two, if you want sunrise, belongs in a summit hotel. Rooms are plain, expensive for what they are, and booked out in good weather. Reserve them when you reserve the ticket, and read the cancellation rule. If the cloud is solid and the hotel will refund, a Tangkou night plus a later start can be the better walk. If you stay down, drop the sunrise goal rather than hiking in the dark.",
        "Approximate rates: Tunxi or Tangkou mid-range hotels 300 to 600 CNY (about 42 to 85 USD); summit hotels often 800 to 1,800 CNY (about 110 to 250 USD) for a basic room in season, higher on holiday peaks. The summit price is the experience of being there at dawn, not the mattress."
      ]
    },
    {
      "heading": "6. A practical 3-day itinerary",
      "paragraphs": [
        "Day 1 is the valley. Arrive in Tunxi, leave bags, and go to Hongcun if you still have daylight. The village is walkable in two hours. Stay for the late light on the pond if you are not rushing, then sleep in town. Xidi is the alternative, not the addition, on a short day.",
        "Day 2 is the ascent. Take the morning shuttle to the cableway you reserved, ride up, and walk a loop you can finish before dinner: Greeting Pine and a section of the West Sea if that canyon is open. Lotus Peak has been on a rest rotation; the March 2026 notice said it was closed to visitors. Other peaks, including Tiandu, open and close on their own schedule. Check the day's list instead of promising a summit in the itinerary title. Sleep on the mountain.",
        "Day 3 is sunrise, a slow walk toward the cableway you have not used, and a descent by early afternoon. Be at the base with enough time for the shuttle to Tunxi and your onward train. If a storm is forecast, leave earlier than you want to. Cableways stop for wind and lightning, and the last ride is not a suggestion. A clear sunrise plus a calm walk down is the whole point of the third day. Do not add a second village after it."
      ]
    },
    {
      "heading": "7. What to eat",
      "paragraphs": [
        "Tunxi has normal Anhui restaurants: bamboo shoots, river fish, and tofu. Eat a large dinner there on night one. On the mountain, food is noodles, rice sets, and expensive water. Carry snacks and a bottle you can refill where signs allow. A summit bowl of noodles can cost as much as a town lunch.",
        "There is no reason to plan a famous banquet on this trip. Calories and an early night matter more. If you want one regional meal, have it in Tunxi on the way out, not at 7 pm on a summit after the kitchen you hoped for has closed."
      ]
    },
    {
      "heading": "8. Budget for three days",
      "paragraphs": [
        "Approximate per person, at about 7.1 CNY to 1 USD, excluding long-distance trains. The mountain itself is a known set of tickets. The hotel is the variable.",
        "A regular-season adult gate ticket near 190 CNY plus two cableway rides near 80 to 90 CNY each is roughly 350 to 370 CNY before shuttles. Winter window prices are lower if the published discount is running. Confirm both on the official platform.",
        "Mid-range three-day total, per person, is often about 2,000 to 3,500 CNY (about 280 to 490 USD): one town night, one summit night, tickets, simple meals, and the shuttle. A budget version that sleeps both nights in Tangkou and walks more than it rides can sit nearer 1,200 to 1,800 CNY. A holiday summit room can exceed the mid-range total by itself."
      ]
    },
    {
      "heading": "9. Practical tips and common mistakes",
      "paragraphs": [
        "Shoes with grip, a rain jacket, and a warm layer in the pack are the minimum. The town can be mild while the summit is in cloud and close to freezing. Stone steps stay wet.",
        "No reservation means no entry. Do not travel to Tangkou on the strength of a screenshot from an unofficial seller.",
        "Read which peaks are resting. A closure is a conservation measure, not a rumour, and it can include a famous name.",
        "Sea of clouds is a bonus. Build the walk so a clear view or a misty pine is enough.",
        "Do not start a hike up after the 15:00 walking-gate cutoff, and do not leave the summit so late that you depend on the final cable car of the day."
      ]
    }
  ],
  "faq": {
    "question": "Do I need to stay overnight on Huangshan?",
    "answer": "You need to if sunrise is the reason you came. A day trip from the south gate with a cableway up and down can show you the pines and one ridge, and it will not put you at Bright Top at dawn. First-timers with three days should sleep one night on the summit and one night in Tunxi or Tangkou."
  },
  "internalLinks": [
    {
      "slug": "hangzhou-travel-guide-first-trip",
      "anchor": "Link Huangshan with Hangzhou by train if the entry rules allow it"
    },
    {
      "slug": "suzhou-classical-gardens-travel-guide",
      "anchor": "Add Suzhou only when the mountain days are already secure"
    },
    {
      "slug": "how-many-days-in-first-china-city",
      "anchor": "Check day count before you attach another city to a summit night"
    },
    {
      "slug": "china-visa-payment-checklist-first-timers",
      "anchor": "Set up the mini program and your visa before you reserve a gate time"
    }
  ],
  "updateSummary": [
    "New guide: Huangshan first-visit plan using the 2026 hours notice and official reservation rules.",
    "Ticket bands and cableway pattern checked against the scenic-area committee in November 2026."
  ],
  "sources": [
    {
      "name": "UNESCO World Heritage: Mount Huangshan",
      "url": "https://whc.unesco.org/en/list/547",
      "note": "Inscription, Lotus Peak height, and the number of high peaks."
    },
    {
      "name": "Huangshan Scenic Area hours notice",
      "url": "http://hsgwh.huangshan.gov.cn/xwzx/tzgg/9320577.html",
      "note": "2026 opening hours, 15:00 hiking cutoff, and reservation rules."
    },
    {
      "name": "Huangshan Scenic Area ticket index",
      "url": "https://hsgwh.huangshan.gov.cn/lyfw/lyfw/mp/index.html",
      "note": "Committee page that points to the current price and promotion notices."
    },
    {
      "name": "UNESCO World Heritage: Ancient Villages in Southern Anhui",
      "url": "https://whc.unesco.org/en/list/1002",
      "note": "Hongcun and Xidi, the valley villages used on the arrival day."
    }
  ],
  reviewer: REVIEWER_TEAM_NAME
},
]

export const CONTENT_UPDATE_LOG = [
  {
    dateISO: '2026-11-02',
    dateText: 'November 2, 2026',
    summary: 'Published first-visit guides for Hangzhou, Suzhou, Zhangjiajie, Yunnan, Chongqing, Harbin, Guangzhou, Shenzhen with Hong Kong, and Huangshan.',
    guideSlugs: [
      'hangzhou-travel-guide-first-trip',
      'suzhou-classical-gardens-travel-guide',
      'zhangjiajie-travel-guide-first-trip',
      'yunnan-kunming-dali-lijiang-travel-guide',
      'chongqing-travel-guide-first-trip',
      'harbin-winter-travel-guide',
      'guangzhou-travel-guide-first-trip',
      'shenzhen-hong-kong-combo-travel-guide',
      'huangshan-travel-guide-first-trip',
    ],
  },
  {
    dateISO: '2026-11-02',
    dateText: 'November 2, 2026',
    summary: 'Published first-visit guides for Chengdu, Xi\'an, and Guilin with Yangshuo.',
    guideSlugs: [
      'chengdu-travel-guide-first-trip',
      'xian-travel-guide-first-trip',
      'guilin-yangshuo-travel-guide-first-trip',
    ],
  },
  {
    dateISO: '2026-02-21',
    dateText: 'February 21, 2026',
    summary: 'Expanded the guide cluster with budget, season, and entry-readiness content for first-time China travelers.',
    guideSlugs: [
      'china-first-trip-budget-by-city',
      'best-time-to-visit-china-first-trip',
      'china-visa-payment-checklist-first-timers',
      'beijing-shanghai-chengdu-first-trip-comparison',
    ],
  },
  {
    dateISO: '2026-02-18',
    dateText: 'February 18, 2026',
    summary: 'Refreshed Beijing and Shanghai comparison with friction and pace-based decision rules.',
    guideSlugs: ['beijing-vs-shanghai-for-first-trip', 'how-many-days-in-first-china-city'],
  },
  {
    dateISO: '2026-02-14',
    dateText: 'February 14, 2026',
    summary: 'Updated first-city decision framework and added style-based internal links.',
    guideSlugs: ['best-city-to-visit-in-china-first-time', 'best-china-cities-by-travel-style'],
  },
]

function inferGuidePublishedDateISO(slug: string): string {
  for (let i = CONTENT_UPDATE_LOG.length - 1; i >= 0; i -= 1) {
    const entry = CONTENT_UPDATE_LOG[i]
    if (entry.guideSlugs.includes(slug)) return entry.dateISO
  }
  return CONTENT_UPDATE_LOG[CONTENT_UPDATE_LOG.length - 1]?.dateISO ?? '2026-02-14'
}

function buildEvidenceBlocks(guide: RawGuide): GuideEvidenceBlock[] {
  const decisionPoints = guide.keyPoints.slice(0, 2)
  const firstSection = guide.sections[0]?.paragraphs[0]
  const secondSection = guide.sections[1]?.paragraphs[0]

  return [
    {
      title: 'Decision checkpoints',
      points: [
        ...decisionPoints,
        firstSection ?? 'Validate your city fit against itinerary friction before payment.',
      ],
    },
    {
      title: 'Execution safeguards',
      points: [
        secondSection ?? 'Prepare one fallback city to protect your first-trip schedule.',
        'Re-check entry, payment, weather, and transfer assumptions within seven days of departure.',
      ],
    },
  ]
}

export const ALL_GUIDES: Guide[] = RAW_GUIDES.map((guide) => ({
  ...guide,
  authorId: DEFAULT_AUTHOR_ID,
  reviewerId: DEFAULT_REVIEWER_ID,
  datePublishedISO: inferGuidePublishedDateISO(guide.slug),
  heroImage: '/og-image.svg',
  evidenceBlocks: buildEvidenceBlocks(guide),
}))

export const GUIDE_BY_SLUG = new Map(ALL_GUIDES.map((guide) => [guide.slug, guide]))
