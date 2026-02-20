import { cities, type City, type CityScores } from "../data/cities";
import { questions, type Dimension } from "../data/questions";

/** Map from question index (0-based) to the selected option index (0-based) */
export type Answers = Record<number, number>;

/**
 * Step 1: Calculate the user's six-dimension scores from their answers.
 * Each dimension score is the arithmetic mean of the selected option scores
 * for all questions in that dimension.
 */
export function calcUserScores(answers: Answers): CityScores {
  const sums: Record<Dimension, number> = {
    history: 0,
    natureUrban: 0,
    culturalComfort: 0,
    activityLevel: 0,
    socialVibe: 0,
    adventure: 0,
  };
  const counts: Record<Dimension, number> = {
    history: 0,
    natureUrban: 0,
    culturalComfort: 0,
    activityLevel: 0,
    socialVibe: 0,
    adventure: 0,
  };

  for (const question of questions) {
    const optionIndex = answers[question.id - 1];
    if (optionIndex !== undefined) {
      sums[question.dimension] += question.options[optionIndex].score;
      counts[question.dimension]++;
    }
  }

  const score = (dim: Dimension): number => {
    if (counts[dim] === 0) return 50; // neutral fallback
    return Math.round(sums[dim] / counts[dim]);
  };

  return {
    history: score("history"),
    natureUrban: score("natureUrban"),
    culturalComfort: score("culturalComfort"),
    activityLevel: score("activityLevel"),
    socialVibe: score("socialVibe"),
    adventure: score("adventure"),
  };
}

/**
 * Step 2: Calculate the match percentage between user scores and a city's scores.
 * Uses L1 (Manhattan) distance across 6 dimensions, equal weight.
 * Formula: (1 - totalDifference / 600) × 100
 */
export function calcMatchPercentage(userScores: CityScores, cityScores: CityScores): number {
  const dimensions: (keyof CityScores)[] = [
    "history",
    "natureUrban",
    "culturalComfort",
    "activityLevel",
    "socialVibe",
    "adventure",
  ];

  const totalDifference = dimensions.reduce(
    (sum, dim) => sum + Math.abs(userScores[dim] - cityScores[dim]),
    0,
  );

  return Math.round((1 - totalDifference / 600) * 100);
}

export interface RankedCity {
  city: City;
  matchPercentage: number;
}

type WeightedTag = { key: string; weight: number }

/** Derive up to 3 city highlight tag i18n keys from a city's score profile. */
export function getCityHighlightTagKeys(scores: CityScores): string[] {
  const tags: WeightedTag[] = []
  if (scores.history >= 70) tags.push({ key: 'result.tags.city.ancientHeritage', weight: scores.history })
  if (scores.natureUrban <= 20) tags.push({ key: 'result.tags.city.naturalWonder', weight: 100 - scores.natureUrban })
  if (scores.natureUrban >= 80) tags.push({ key: 'result.tags.city.modernMetropolis', weight: scores.natureUrban })
  if (scores.culturalComfort >= 70) tags.push({ key: 'result.tags.city.immersiveLocal', weight: scores.culturalComfort })
  if (scores.activityLevel <= 35) tags.push({ key: 'result.tags.city.relaxedPace', weight: 100 - scores.activityLevel })
  if (scores.activityLevel >= 70) tags.push({ key: 'result.tags.city.packedItinerary', weight: scores.activityLevel })
  if (scores.socialVibe >= 75) tags.push({ key: 'result.tags.city.foodAndNightlife', weight: scores.socialVibe })
  if (scores.socialVibe <= 25) tags.push({ key: 'result.tags.city.peacefulRetreat', weight: 100 - scores.socialVibe })
  if (scores.adventure >= 75) tags.push({ key: 'result.tags.city.offBeatGems', weight: scores.adventure })
  // Fallback: lower thresholds to guarantee ≥2 tags
  if (tags.length < 2) {
    if (scores.history >= 50 && !tags.find(t => t.key.includes('Heritage')))
      tags.push({ key: 'result.tags.city.ancientHeritage', weight: scores.history })
    if (scores.natureUrban <= 40 && !tags.find(t => t.key.includes('naturalWonder')))
      tags.push({ key: 'result.tags.city.naturalWonder', weight: 100 - scores.natureUrban })
    if (scores.socialVibe >= 60 && !tags.find(t => t.key.includes('food')))
      tags.push({ key: 'result.tags.city.foodAndNightlife', weight: scores.socialVibe })
    if (scores.activityLevel <= 50 && !tags.find(t => t.key.includes('relaxed')))
      tags.push({ key: 'result.tags.city.relaxedPace', weight: 100 - scores.activityLevel })
  }
  return tags.sort((a, b) => b.weight - a.weight).slice(0, 3).map(t => t.key)
}

/** Derive up to 3 user personality tag i18n keys from the user's score profile. */
export function getUserPersonalityTagKeys(scores: CityScores): string[] {
  const tags: WeightedTag[] = []
  if (scores.history >= 60) tags.push({ key: 'result.tags.user.historyBuff', weight: scores.history })
  if (scores.natureUrban <= 30) tags.push({ key: 'result.tags.user.natureLover', weight: 100 - scores.natureUrban })
  if (scores.natureUrban >= 70) tags.push({ key: 'result.tags.user.cityExplorer', weight: scores.natureUrban })
  if (scores.culturalComfort >= 65) tags.push({ key: 'result.tags.user.culturalDiver', weight: scores.culturalComfort })
  if (scores.culturalComfort <= 30) tags.push({ key: 'result.tags.user.comfortSeeker', weight: 100 - scores.culturalComfort })
  if (scores.activityLevel <= 35) tags.push({ key: 'result.tags.user.slowTraveler', weight: 100 - scores.activityLevel })
  if (scores.activityLevel >= 65) tags.push({ key: 'result.tags.user.activeTraveler', weight: scores.activityLevel })
  if (scores.socialVibe >= 65) tags.push({ key: 'result.tags.user.socializer', weight: scores.socialVibe })
  if (scores.socialVibe <= 30) tags.push({ key: 'result.tags.user.soloWanderer', weight: 100 - scores.socialVibe })
  if (scores.adventure >= 65) tags.push({ key: 'result.tags.user.adventurer', weight: scores.adventure })
  if (tags.length === 0) tags.push({ key: 'result.tags.user.culturalDiver', weight: 50 })
  return tags.sort((a, b) => b.weight - a.weight).slice(0, 3).map(t => t.key)
}

/**
 * Step 3: Rank all 15 cities by match percentage (descending).
 * Returns the full ranked array.
 */
export function getRankedCities(userScores: CityScores): RankedCity[] {
  return cities
    .map((city) => ({
      city,
      matchPercentage: calcMatchPercentage(userScores, city.scores),
    }))
    .sort((a, b) => b.matchPercentage - a.matchPercentage);
}
