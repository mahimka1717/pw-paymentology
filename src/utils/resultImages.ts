import type { Outcome } from '../data/scoring';
import { asset } from './asset';

export const outcomeImages: Record<Outcome, string> = {
  'Built to Scale': asset('/img/result/result0.webp'),
  'Fast but Fragile': asset('/img/result/result1.webp'),
  'Trusted Operator': asset('/img/result/result2.webp'),
  'Stuck in Neutral': asset('/img/result/result3.webp'),
};

const preloaded = new Set<Outcome>();

/** The outcome is known as soon as the last question is answered: fetch its image while the player reads the feedback. */
export function preloadOutcomeImage(outcome: Outcome) {
  if (preloaded.has(outcome)) return;
  preloaded.add(outcome);
  new Image().src = outcomeImages[outcome];
}
