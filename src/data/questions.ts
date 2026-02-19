export type Dimension =
  | "history"
  | "natureUrban"
  | "culturalComfort"
  | "activityLevel"
  | "socialVibe"
  | "adventure";

export interface Option {
  text: string;
  score: number;
}

export interface Question {
  id: number;
  dimension: Dimension;
  text: string;
  options: Option[];
}

export const questions: Question[] = [
  // Dimension 1 — History Appetite
  {
    id: 1,
    dimension: "history",
    text: "When you walk into an old city, what's your instinct?",
    options: [
      { text: "Head straight for the oldest temple or ruin I can find", score: 100 },
      { text: "I'll check out the highlights, but I don't need to read every sign", score: 60 },
      { text: "I'd rather find a cool local café nearby", score: 30 },
      { text: "Old buildings kind of all look the same to me", score: 0 },
    ],
  },
  {
    id: 2,
    dimension: "history",
    text: "How do you feel about museums?",
    options: [
      { text: "I could spend a whole day in one — history is fascinating", score: 100 },
      { text: "A couple of hours is enough for me", score: 60 },
      { text: "I only go if it's world-famous or very visual", score: 30 },
      { text: "I'd rather be outside than in a museum", score: 0 },
    ],
  },
  {
    id: 3,
    dimension: "history",
    text: "If a city has ancient ruins but is a bit hard to get around, would you still go?",
    options: [
      { text: "Absolutely — that's exactly the kind of place I want", score: 100 },
      { text: "Yes, if the ruins are truly significant", score: 65 },
      { text: "Maybe, depends on how hard it really is", score: 35 },
      { text: "Probably not — I'd pick somewhere easier", score: 0 },
    ],
  },

  // Dimension 2 — Nature vs Urban
  {
    id: 4,
    dimension: "natureUrban",
    text: "Your perfect travel photo is…",
    options: [
      { text: "Misty mountains, rice terraces, or a river winding through karst peaks", score: 0 },
      { text: "A dense forest trail or dramatic cliff viewpoint", score: 20 },
      { text: "A lively night market or colorful alley", score: 70 },
      { text: "A glittering skyline from a rooftop bar", score: 100 },
    ],
  },
  {
    id: 5,
    dimension: "natureUrban",
    text: "On a free afternoon, you'd rather…",
    options: [
      { text: "Find a scenic hiking trail or lake to sit by", score: 0 },
      { text: "Wander through a village or countryside", score: 25 },
      { text: "Explore neighborhoods, shops, and street food", score: 75 },
      { text: "Hit a mall, art gallery, or trendy urban spot", score: 100 },
    ],
  },
  {
    id: 6,
    dimension: "natureUrban",
    text: "Which sounds more exhausting to you?",
    options: [
      { text: "Two hours on a crowded subway", score: 0 },
      { text: "A long uphill hike with a heavy bag", score: 100 },
      { text: "Both sound fine honestly", score: 50 },
      { text: "Both sound terrible", score: 50 },
    ],
  },

  // Dimension 3 — Cultural Comfort
  {
    id: 7,
    dimension: "culturalComfort",
    text: "You're at a local restaurant with no English menu and no pictures. You…",
    options: [
      { text: "Pull out Google Translate and point at random — this is the fun part", score: 100 },
      { text: "Try to figure it out, maybe ask a local for help", score: 70 },
      { text: "Look for something recognizable, play it safe", score: 30 },
      { text: "Quietly look for another restaurant with photos", score: 0 },
    ],
  },
  {
    id: 8,
    dimension: "culturalComfort",
    text: "How important is it that a place has good English signage and English-speaking staff?",
    options: [
      { text: "Not important at all — I like figuring things out", score: 100 },
      { text: "Nice to have, but I can manage without it", score: 65 },
      { text: "Fairly important — it reduces stress a lot", score: 30 },
      { text: "Very important — I need it to feel comfortable", score: 0 },
    ],
  },
  {
    id: 9,
    dimension: "culturalComfort",
    text: "Which accommodation sounds most appealing?",
    options: [
      { text: "A family-run guesthouse where you eat breakfast with the owners", score: 100 },
      { text: "A local boutique hotel with some character", score: 65 },
      { text: "A reliable international chain hotel", score: 25 },
      { text: "A well-known international brand — I know exactly what I'm getting", score: 0 },
    ],
  },

  // Dimension 4 — Activity Level
  {
    id: 10,
    dimension: "activityLevel",
    text: "How do you typically plan a trip?",
    options: [
      { text: "A loose idea of where I'm going — I'll figure it out as I go", score: 20 },
      { text: "A rough framework, but lots of flexibility", score: 45 },
      { text: "A solid itinerary with key sites planned in advance", score: 75 },
      { text: "Every day mapped out — I don't want to waste a minute", score: 100 },
    ],
  },
  {
    id: 11,
    dimension: "activityLevel",
    text: "By day 3 of a trip, you're usually…",
    options: [
      { text: "Still on day 1's vibe — I found a spot I love and I'm staying", score: 0 },
      { text: "Taking it easy, letting the city come to me", score: 35 },
      { text: "Moving through my list but taking breaks", score: 65 },
      { text: "Already thinking about what I might have missed and how to fit more in", score: 100 },
    ],
  },
  {
    id: 12,
    dimension: "activityLevel",
    text: "A long hike with stunning views at the top — are you in?",
    options: [
      { text: "Yes, 100% — that's what travel is about", score: 100 },
      { text: "Yes if it's not too intense", score: 65 },
      { text: "Maybe — depends on how long and how hot", score: 35 },
      { text: "I'll look at photos from the bottom, thanks", score: 0 },
    ],
  },

  // Dimension 5 — Social Vibe
  {
    id: 13,
    dimension: "socialVibe",
    text: "What's your ideal evening on a trip?",
    options: [
      { text: "A rooftop bar, meeting other travelers, staying out late", score: 100 },
      { text: "A lively local restaurant with good food and buzz around me", score: 70 },
      { text: "A quiet dinner at a place with great atmosphere", score: 35 },
      { text: "In my room, decompressing with a book or show", score: 0 },
    ],
  },
  {
    id: 14,
    dimension: "socialVibe",
    text: "When you travel, how do you feel about interacting with locals?",
    options: [
      { text: "It's one of my favorite parts — I love the connections", score: 100 },
      { text: "I enjoy it when it happens naturally", score: 65 },
      { text: "I'm a bit shy but open to it", score: 35 },
      { text: "I prefer to observe from a comfortable distance", score: 0 },
    ],
  },
  {
    id: 15,
    dimension: "socialVibe",
    text: "Your dream city has…",
    options: [
      { text: "A wild nightlife scene and always something going on", score: 100 },
      { text: "A social but not overwhelming energy", score: 60 },
      { text: "A calm, pleasant atmosphere", score: 30 },
      { text: "Peaceful streets where I can hear myself think", score: 0 },
    ],
  },

  // Dimension 6 — Adventure Appetite
  {
    id: 16,
    dimension: "adventure",
    text: "How do you feel about going somewhere most tourists skip?",
    options: [
      { text: "That's exactly why I'd go there", score: 100 },
      { text: "Exciting, if I know there's something worth seeing", score: 70 },
      { text: "A bit nervous, but I'd consider it", score: 35 },
      { text: "I prefer places with a clear tourist trail — it's easier and safer", score: 0 },
    ],
  },
  {
    id: 17,
    dimension: "adventure",
    text: "You show up and your original plan falls through. Your reaction?",
    options: [
      { text: "Great — now I'll discover something I never would have planned", score: 100 },
      { text: "Annoyed at first, but I'd adapt quickly", score: 65 },
      { text: "Pretty stressed — I'd work hard to fix the plan", score: 30 },
      { text: "This is why I over-plan everything", score: 0 },
    ],
  },
  {
    id: 18,
    dimension: "adventure",
    text: "Which experience sounds most exciting?",
    options: [
      { text: "A village accessible only by a 3-hour boat ride", score: 100 },
      { text: "A hidden local neighborhood most tourists never find", score: 70 },
      { text: "A famous landmark, done properly with good context", score: 35 },
      { text: "A well-organized tour that covers all the highlights efficiently", score: 0 },
    ],
  },
];
