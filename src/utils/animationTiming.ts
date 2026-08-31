const rawAnimationScale = new URLSearchParams(window.location.search).get('animationScale');
const parsedAnimationScale = rawAnimationScale === null ? 2 : Number(rawAnimationScale);

export const animationScale = Number.isFinite(parsedAnimationScale) && parsedAnimationScale > 0
  ? parsedAnimationScale
  : 2;

document.documentElement.style.setProperty('--animation-scale', String(animationScale));

for (const milliseconds of [250, 260, 280, 350, 380, 400, 450, 500]) {
  document.documentElement.style.setProperty(`--animation-${milliseconds}ms`, `${milliseconds * animationScale}ms`);
}

export function scaledMs(milliseconds: number) {
  return milliseconds * animationScale;
}

export function animationMs(milliseconds: number) {
  return `${scaledMs(milliseconds)}ms`;
}