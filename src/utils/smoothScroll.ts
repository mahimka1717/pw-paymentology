export function smoothScrollTo(target: number, duration = 1200) {
  const start = window.scrollY;
  const distance = target - start;
  if (distance === 0) return;
  const startTime = performance.now();

  function step(currentTime: number) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease = progress < 0.5
      ? 4 * progress * progress * progress
      : 1 - Math.pow(-2 * progress + 2, 3) / 2;
    window.scrollTo(0, start + distance * ease);
    if (progress < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}
