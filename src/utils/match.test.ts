import { describe, it, expect } from "vitest";
import { calcUserScores, calcMatchPercentage, getRankedCities, type Answers } from "./match";
import { cities } from "../data/cities";
import { questions } from "../data/questions";


describe("calcUserScores", () => {
  it("returns all-100 scores when every answer picks the highest-scoring option", () => {
    // For each question, find which option has the highest score
    const answers: Answers = {};
    questions.forEach((q, i) => {
      const maxScore = Math.max(...q.options.map((o) => o.score));
      const idx = q.options.findIndex((o) => o.score === maxScore);
      answers[i] = idx;
    });
    const scores = calcUserScores(answers);
    // All dimensions should be 100 (since max option for every question is 100)
    expect(scores.history).toBe(100);
    expect(scores.natureUrban).toBe(100);
    expect(scores.culturalComfort).toBe(100);
    expect(scores.activityLevel).toBe(100);
    expect(scores.socialVibe).toBe(100);
    expect(scores.adventure).toBe(100);
  });

  it("returns minimum possible scores when every answer picks the lowest-scoring option", () => {
    const answers: Answers = {};
    questions.forEach((q, i) => {
      const minScore = Math.min(...q.options.map((o) => o.score));
      const idx = q.options.findIndex((o) => o.score === minScore);
      answers[i] = idx;
    });
    const scores = calcUserScores(answers);
    expect(scores.history).toBe(0);
    expect(scores.natureUrban).toBe(0);
    expect(scores.culturalComfort).toBe(0);
    // Q10 minimum option is 20 (not 0), so average of [20,0,0]/3 ≈ 7
    expect(scores.activityLevel).toBe(7);
    expect(scores.socialVibe).toBe(0);
    expect(scores.adventure).toBe(0);
  });

  it("returns neutral score (50) for a dimension with no answers", () => {
    // Only answer history questions (indices 0,1,2)
    const partialAnswers: Answers = { 0: 0, 1: 0, 2: 0 };
    const scores = calcUserScores(partialAnswers);
    expect(scores.history).toBe(100);
    // Unanswered dimensions should fall back to 50
    expect(scores.natureUrban).toBe(50);
    expect(scores.culturalComfort).toBe(50);
    expect(scores.activityLevel).toBe(50);
    expect(scores.socialVibe).toBe(50);
    expect(scores.adventure).toBe(50);
  });

  it("averages correctly for a mixed answer set", () => {
    // Q1 option 0 = 100, Q2 option 1 = 60, Q3 option 2 = 35 → avg = (100+60+35)/3 = 65
    const answers: Answers = { 0: 0, 1: 1, 2: 2 };
    // fill rest with any value to avoid unanswered fallback
    questions.forEach((_q, i) => {
      if (answers[i] === undefined) answers[i] = 0;
    });
    const scores = calcUserScores(answers);
    expect(scores.history).toBe(65);
  });
});

describe("calcMatchPercentage", () => {
  it("returns 100 for identical scores", () => {
    const s = { history: 50, natureUrban: 50, culturalComfort: 50, activityLevel: 50, socialVibe: 50, adventure: 50 };
    expect(calcMatchPercentage(s, s)).toBe(100);
  });

  it("returns 0 for maximally opposite scores", () => {
    const user = { history: 100, natureUrban: 100, culturalComfort: 100, activityLevel: 100, socialVibe: 100, adventure: 100 };
    const city = { history: 0, natureUrban: 0, culturalComfort: 0, activityLevel: 0, socialVibe: 0, adventure: 0 };
    expect(calcMatchPercentage(user, city)).toBe(0);
  });

  it("calculates partial distance correctly", () => {
    // Difference of 30 per dimension × 6 = 180; (1 - 180/600) * 100 = 70
    const user = { history: 80, natureUrban: 80, culturalComfort: 80, activityLevel: 80, socialVibe: 80, adventure: 80 };
    const city = { history: 50, natureUrban: 50, culturalComfort: 50, activityLevel: 50, socialVibe: 50, adventure: 50 };
    expect(calcMatchPercentage(user, city)).toBe(70);
  });
});

describe("getRankedCities", () => {
  it("returns all cities in the runtime pool", () => {
    const scores = { history: 50, natureUrban: 50, culturalComfort: 50, activityLevel: 50, socialVibe: 50, adventure: 50 };
    const ranked = getRankedCities(scores);
    expect(ranked).toHaveLength(cities.length);
    expect(ranked).toHaveLength(24);
  });

  it("returns cities sorted by matchPercentage descending", () => {
    const scores = { history: 50, natureUrban: 50, culturalComfort: 50, activityLevel: 50, socialVibe: 50, adventure: 50 };
    const ranked = getRankedCities(scores);
    for (let i = 1; i < ranked.length; i++) {
      expect(ranked[i - 1].matchPercentage).toBeGreaterThanOrEqual(ranked[i].matchPercentage);
    }
  });

  it("returns Dunhuang as best match for max adventure/history, low social/urban", () => {
    // Dunhuang scores: history:85, natureUrban:12, culturalComfort:90, activityLevel:70, socialVibe:20, adventure:95
    const scores = { history: 100, natureUrban: 0, culturalComfort: 100, activityLevel: 100, socialVibe: 0, adventure: 100 };
    const ranked = getRankedCities(scores);
    expect(ranked[0].city.id).toBe("dunhuang");
  });

  it("returns Shanghai as best match for max urban/social, low history/adventure", () => {
    // Shanghai: history:30, natureUrban:90, culturalComfort:25, activityLevel:75, socialVibe:90, adventure:30
    const scores = { history: 0, natureUrban: 100, culturalComfort: 0, activityLevel: 100, socialVibe: 100, adventure: 0 };
    const ranked = getRankedCities(scores);
    expect(ranked[0].city.id).toBe("shanghai");
  });

  it("matchPercentage values are between 0 and 100 inclusive", () => {
    const scores = { history: 50, natureUrban: 50, culturalComfort: 50, activityLevel: 50, socialVibe: 50, adventure: 50 };
    const ranked = getRankedCities(scores);
    ranked.forEach(({ matchPercentage }) => {
      expect(matchPercentage).toBeGreaterThanOrEqual(0);
      expect(matchPercentage).toBeLessThanOrEqual(100);
    });
  });
});
