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
