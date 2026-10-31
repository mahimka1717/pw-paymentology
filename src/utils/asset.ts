// Files in public/ are addressed relative to the page (Vite `base: './'`), so the game also runs from a sub-path on the hub.
export function asset(path: string) {
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;
}
