export interface TrackRange {
  gMin: number; gMax: number;
  tMin: number; tMax: number;
  cMin: number; cMax: number;
  mMin: number; mMax: number;
}

export const trackRanges: Record<string, TrackRange> = {
  fintech:         { gMin: 2, gMax: 12, tMin: -1, tMax: 9, cMin: -8, cMax: 10, mMin: -3, mMax: 12 },
  government:      { gMin: 4, gMax: 8,  tMin: 4,  tMax: 12, cMin: -3, cMax: 11, mMin: -1, mMax: 12 },
  telco:           { gMin: 5, gMax: 11, tMin: 3,  tMax: 12, cMin: -1, cMax: 7,  mMin: 1,  mMax: 10 },
  remittance:      { gMin: 3, gMax: 12, tMin: 2,  tMax: 12, cMin: -3, cMax: 5,  mMin: 0,  mMax: 11 },
  'digital-banks': { gMin: 4, gMax: 11, tMin: 1,  tMax: 12, cMin: 0,  cMax: 8,  mMin: 0,  mMax: 10 },
  banks:           { gMin: 3, gMax: 10, tMin: 4,  tMax: 11, cMin: -2, cMax: 11, mMin: -2, mMax: 10 },
};

export type Outcome = 'Built to Scale' | 'Fast but Fragile' | 'Trusted Operator' | 'Stuck in Neutral';
export type Style = 'Bold' | 'Situational' | 'Deliberate' | 'Disciplined';

export const outcomeDescriptions: Record<Outcome, string> = {
  'Built to Scale': "You found the sweet spot. Growth came through, trust held, and the model stayed under control as momentum built. You created something exciting, with the shape and discipline to scale!",
  'Fast but Fragile': "You moved quickly and grabbed momentum, but the cracks are starting to show. Growth came first while trust and control took hits along the way. Big upside, but the model may be running hotter than it can comfortably handle.",
  'Trusted Operator': "You built something that holds up. In a market where trust is easy to promise and hard to keep, you protected the customer relationship, maintained discipline under pressure, and kept the model in control as it grew. That consistency comes from decisions most organisations struggle to make.",
  'Stuck in Neutral': "You kept things steady and avoided any major missteps. But the momentum never really came, leaving the organisation in the game without a clear edge. Safe enough to survive, but not sharp enough to stand out.",
};

export const resultStyleCopy: Record<Outcome, Record<Style, string>> = {
  'Built to Scale': {
    Bold: "Committing early to the bigger move and holding that position got you here, but what this result really shows is that your instincts were calibrated, not just fast. Speed without direction produces a different outcome entirely. You had both.",
    Situational: "You assessed each situation, adjusted your approach, and committed when the conditions were right. That kind of contextual judgment is what separates good decision-makers from consistent ones. You demonstrated both.",
    Deliberate: "Needing to understand a decision before making it is not a weakness. It is the reason the foundations held. People who move carefully and still build something ambitious are rarer than the industry pretends. You are one of them.",
    Disciplined: "You know what you are protecting and you rarely get talked out of it. The market rewards boldness loudly and consistency quietly. You chose consistency, and it compounded in ways that surprised even the model.",
  },
  'Fast but Fragile': {
    Bold: "Committing to the more expansive option at every turn gets you further than most, but it also means the foundations are always playing catch-up. That bias toward action is an asset. Knowing when to pause and let the model consolidate is the next one to build.",
    Situational: "Assessing each situation differently is a real skill, but this result suggests the moments you chose to push were not always the ones that needed pushing. Good judgment is not just about knowing when to move. It is about knowing which moves compound and which ones just create noise.",
    Deliberate: "Your choices were measured, yet the model still ended up running faster than the foundations can support. That is not a verdict on your judgment. In this context, careful choices still generate momentum. The trust and control needed to keep pace with it.",
    Disciplined: "You kept the expansive option at arm's length throughout, yet the model still ended up moving faster than the foundations beneath it. That says more about the environment than your judgment. Understanding that gap is where the real insight lives.",
  },
  'Trusted Operator': {
    Bold: "You consistently chose the more expansive option, and still landed here. The ambition you committed to happens to be the kind that earns confidence rather than undermines it. Expansive vision with earned credibility is a rarer combination than it looks.",
    Situational: "Knowing which decisions needed boldness and which needed a steadier hand, and acting on that distinction consistently is what trust is actually built on. Not blanket caution. Situational judgment. You seemed to know the difference when it mattered.",
    Deliberate: "Earning confidence the slow way is not a limitation, it is a strategy. In a market full of promises, a model that consistently does what it says is a competitive advantage most organisations underestimate. You built that, deliberately and without shortcuts.",
    Disciplined: "A clear internal compass, followed almost without exception, is what this outcome is built from. Most people know what the right call is. The rare thing is rarely talking yourself out of it. Across these six decisions, you almost never did.",
  },
  'Stuck in Neutral': {
    Bold: "The ambition was genuine, but committing to the expansive option across multiple dimensions simultaneously disperses energy rather than concentrating it. The drive is an asset. It needs a sharper target.",
    Situational: "Approaching each decision differently is a real skill, but without a consistent strategic thread connecting those decisions, each good call cancels out the next. Adaptability without direction is agility in neutral. The judgment was there. The pattern was not.",
    Deliberate: "Thinking carefully before acting is the right instinct, but considered independent choices did not add up to a coherent direction here. Deliberateness is a process quality. Strategy is a pattern quality. The gap between them is where this result lives.",
    Disciplined: "You consistently chose the steadier, more protective path at almost every turn, but your cautious choices pulled in different directions rather than reinforcing each other. Restraint is only as powerful as the direction it is protecting. That part was missing.",
  },
};
