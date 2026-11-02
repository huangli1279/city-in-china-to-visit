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
]

export const CONTENT_UPDATE_LOG = [
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
