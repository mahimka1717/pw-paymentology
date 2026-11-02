import { DESKTOP_QUERY } from '../hooks/useMediaQuery';
import { asset } from './asset';

/** The 1920px building: mobile layouts and non-retina desktops. */
export function buildingImage(index: number) {
  return asset(`/img/buildings/building${index}_ws-1920.webp`);
}

/** Desktop only: retina screens get the sharper 2560px version. */
export function desktopBuildingSrcSet(index: number) {
  return `${buildingImage(index)} 1x, ${asset(`/img/buildings/building${index}_ws-2560.webp`)} 2x`;
}

const preloaded = new Set<number>();

/**
 * Starts downloading a building and its neon badge as soon as it is picked, in the same size the screen will pick.
 * The billboard poster is left out: it is animated and heavy, so it loads once the building is on screen.
 */
export function preloadBuilding(index: number) {
  if (preloaded.has(index)) return;
  preloaded.add(index);

  const image = new Image();
  if (window.matchMedia(DESKTOP_QUERY).matches) image.srcset = desktopBuildingSrcSet(index);
  image.src = buildingImage(index);
  new Image().src = asset(`/img/buildings/building${index}_icon.png`);
}
