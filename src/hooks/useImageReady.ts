import { useLayoutEffect, useRef, useState } from 'react';

// Gives up waiting after this long, so a very slow image never keeps its layer hidden for good.
const maxWaitMs = 8000;

/**
 * Tells when the <img> behind `ref` has loaded (or failed, or the wait ran out). An image that is already
 * in the browser's memory counts as ready before the first paint, so cached screens show up exactly as before.
 * `key` restarts the wait when the image changes.
 */
export function useImageReady(key: unknown) {
  const ref = useRef<HTMLImageElement>(null);
  const [ready, setReady] = useState(false);

  useLayoutEffect(() => {
    const image = ref.current;
    if (!image || image.complete) {
      setReady(true);
      return;
    }

    setReady(false);
    const done = () => setReady(true);
    const timeout = window.setTimeout(done, maxWaitMs);
    image.addEventListener('load', done);
    image.addEventListener('error', done);
    return () => {
      window.clearTimeout(timeout);
      image.removeEventListener('load', done);
      image.removeEventListener('error', done);
    };
  }, [key]);

  return [ref, ready] as const;
}
