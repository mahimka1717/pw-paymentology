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

const preloaded = new Set<number>();

/**
 * Starts downloading a building and its neon badge as soon as it is picked. The billboard poster is left out:
 * it is animated and heavy, so it loads once the building is on screen.
 */
export function preloadBuilding(index: number) {
  if (preloaded.has(index)) return;
  preloaded.add(index);

  const image = new Image();
  const { src, srcSet } = buildingImage(index);
  image.sizes = buildingImageSizes;
  image.srcset = srcSet;
  image.src = src;
  new Image().src = asset(`/img/buildings/building${index}_icon.png`);
}
