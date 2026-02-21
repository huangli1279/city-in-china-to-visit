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
}

const REVIEWER_TEAM_NAME = 'City Vibe Matcher Research Desk'

export const ALL_GUIDES: Guide[] = [
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
]

export const GUIDE_BY_SLUG = new Map(ALL_GUIDES.map((guide) => [guide.slug, guide]))

export const CONTENT_UPDATE_LOG = [
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
