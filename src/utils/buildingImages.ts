import { asset } from './asset';

// One 1920px file for every screen: on retina a 2560px version was ~50% heavier and looked the same.
export function buildingImage(index: number) {
  return asset(`/img/buildings/building${index}_ws-1920.webp`);
}

const preloaded = new Set<number>();

/**
 * Starts downloading a building and its neon badge as soon as it is picked. The billboard poster is left out:
 * it is animated and heavy, so it loads once the building is on screen.
 */
export function preloadBuilding(index: number) {
  if (preloaded.has(index)) return;
  preloaded.add(index);

  new Image().src = buildingImage(index);
  new Image().src = asset(`/img/buildings/building${index}_icon.png`);
}
