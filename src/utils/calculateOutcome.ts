import { Score } from '../data/tracks';
import { trackRanges, Outcome, Style } from '../data/scoring';

type Pillar = 'growth' | 'trust' | 'control' | 'momentum';

interface PillarEntry {
  pillar: Pillar;
  value: number;
}

function normalize(raw: number, min: number, max: number): number {
  if (max === min) return 0.5;
  return (raw - min) / (max - min);
}

export function calculateOutcome(
  trackId: string,
  totalScore: Score,
  aggressiveCount: number,
): { outcome: Outcome; style: Style; normalized: Score } {
  const range = trackRanges[trackId];

  const gNorm = normalize(totalScore.growth, range.gMin, range.gMax);
  const tNorm = normalize(totalScore.trust, range.tMin, range.tMax);
  const cNorm = normalize(totalScore.control, range.cMin, range.cMax);
  const mNorm = normalize(totalScore.momentum, range.mMin, range.mMax);

  const pillars: PillarEntry[] = [
    { pillar: 'growth', value: gNorm },
    { pillar: 'trust', value: tNorm },
    { pillar: 'control', value: cNorm },
    { pillar: 'momentum', value: mNorm },
  ];

  pillars.sort((a, b) => b.value - a.value);
  const top1 = pillars[0].pillar;
  const top2 = pillars[1].pillar;
  const topTwo = new Set([top1, top2]);

  let outcome: Outcome;

  // Rule 1
  if (topTwo.has('growth') && topTwo.has('trust')) {
    outcome = 'Built to Scale';
  }
  // Rule 2
  else if (topTwo.has('growth') && topTwo.has('momentum')) {
    outcome = 'Fast but Fragile';
  }
  // Rule 3
  else if ((top1 === 'growth' || top1 === 'momentum') && tNorm < 0.40) {
    outcome = 'Fast but Fragile';
  }
  // Rule 4
  else if (topTwo.has('trust') && topTwo.has('control')) {
    outcome = 'Trusted Operator';
  }
  // Rule 5
  else if ((top1 === 'trust' || top1 === 'control') && gNorm < 0.45) {
    outcome = 'Trusted Operator';
  }
  // Rule 6
  else {
    outcome = 'Stuck in Neutral';
  }

  let style: Style;
  if (aggressiveCount >= 4) style = 'Bold';
  else if (aggressiveCount === 3) style = 'Situational';
  else if (aggressiveCount === 2) style = 'Deliberate';
  else style = 'Disciplined';

  return {
    outcome,
    style,
    normalized: { growth: gNorm, trust: tNorm, control: cNorm, momentum: mNorm },
  };
}
