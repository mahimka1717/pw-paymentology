export interface TrackRange {
  gMin: number; gMax: number;
  tMin: number; tMax: number;
  cMin: number; cMax: number;
  mMin: number; mMax: number;
}

export const trackRanges: Record<string, TrackRange> = {
  fintech:         { gMin: 1, gMax: 12, tMin: -1, tMax: 9, cMin: -8, cMax: 7, mMin: -4, mMax: 7 },
  government:      { gMin: 4, gMax: 8,  tMin: 4,  tMax: 12, cMin: -3, cMax: 11, mMin: -1, mMax: 8 },
  telco:           { gMin: 5, gMax: 11, tMin: 4,  tMax: 12, cMin: -1, cMax: 8,  mMin: 1,  mMax: 10 },
  remittance:      { gMin: 4, gMax: 12, tMin: 3,  tMax: 12, cMin: -3, cMax: 5,  mMin: 0,  mMax: 10 },
  'digital-banks': { gMin: 4, gMax: 11, tMin: 2,  tMax: 12, cMin: 0,  cMax: 8,  mMin: 0,  mMax: 9 },
  banks:           { gMin: 2, gMax: 10, tMin: 4,  tMax: 12, cMin: -2, cMax: 9,  mMin: -2, mMax: 8 },
};

export type Outcome = 'Built to Scale' | 'Fast but Fragile' | 'Trusted Operator' | 'Stuck in Neutral';
export type Style = 'Consistent Aggressive' | 'Consistent Cautious' | 'Situational';

export const outcomeDescriptions: Record<Outcome, string> = {
  'Built to Scale': "You found the sweet spot. Growth came through, trust held, and the model stayed under control as momentum built. You did not just launch something exciting, you built something with the shape and discipline to scale!",
  'Fast but Fragile': "You moved quickly and grabbed momentum, but the cracks are starting to show. Growth came first, while trust and control took a few hits along the way. Big upside, but the model may be running hotter than it can comfortably handle.",
  'Trusted Operator': "You built something that holds up. In a market where trust is easy to promise and hard to keep, you made decisions that protected the customer relationship, maintained discipline under pressure, and kept the model in control as it grew. That is not a default - it is a choice most organisations struggle to make consistently.",
  'Stuck in Neutral': "Nothing broke badly, but nothing really took off either. The organization stayed in the game, though it never found enough momentum to pull ahead. Safe enough to survive, but not sharp enough to stand out.",
};
