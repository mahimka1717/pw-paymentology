const rawAnimationType = new URLSearchParams(window.location.search).get('animationType');
const parsedAnimationType = rawAnimationType === null ? 1 : Number(rawAnimationType);

export const cityAnimationType = Number.isInteger(parsedAnimationType) && parsedAnimationType >= 0 && parsedAnimationType <= 3
  ? parsedAnimationType
  : 1;