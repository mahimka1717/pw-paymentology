import { asset } from './asset';

// Shared by the desktop building (App) and the mobile intro, so a preload picks the same file the screen will use.
export const buildingImageSizes = '(min-width: 1024px) 1920px, 120vw';

export function buildingImage(index: number) {
  const src = asset(`/img/buildings/building${index}_ws-1920.webp`);
  return {
    src,
    srcSet: `${src} 1920w, ${asset(`/img/buildings/building${index}_ws-2560.webp`)} 2560w`,
  };
}

const preloads = new Map<number, Promise<void>>();

/**
 * Downloads a building, its neon badge and billboard poster into the browser cache ahead of the intro screen.
 * Resolves when the building itself is in (or failed), so callers can fetch one building at a time.
 */
export function preloadBuilding(index: number) {
  const existing = preloads.get(index);
  if (existing) return existing;

  const pending = new Promise<void>(resolve => {
    const image = new Image();
    const { src, srcSet } = buildingImage(index);
    image.onload = () => resolve();
    image.onerror = () => resolve();
    image.sizes = buildingImageSizes;
    image.srcset = srcSet;
    image.src = src;
  });
  new Image().src = asset(`/img/buildings/building${index}_icon.png`);
  new Image().src = asset(`/img/posters/p_${index}.webp`);
  preloads.set(index, pending);
  return pending;
}

/** Preloads every building one after another, so a slow connection still gives the player's pick most of the bandwidth. */
export function preloadAllBuildings(count: number, isCancelled: () => boolean) {
  void (async () => {
    for (let index = 0; index < count && !isCancelled(); index++) {
      await preloadBuilding(index);
    }
  })();
}
