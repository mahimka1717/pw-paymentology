import { useLayoutEffect, useRef, useState } from 'react';

// Gives up waiting after this long, so a very slow image never keeps its layer hidden for good.
const maxWaitMs = 8000;
const nothingReady = Symbol('nothing ready');

/**
 * Tells when the <img> behind `ref` has loaded (or failed, or the wait ran out). An image that is already
 * in the browser's memory counts as ready before the first paint, so cached screens show up exactly as before.
 * `key` identifies the image: a new key is not ready from its very first render, so nothing waiting on it
 * (a billboard poster, say) mounts and starts downloading early.
 */
export function useImageReady(key: unknown) {
  const ref = useRef<HTMLImageElement>(null);
  const [readyKey, setReadyKey] = useState<unknown>(nothingReady);

  useLayoutEffect(() => {
    const image = ref.current;
    const done = () => setReadyKey(key);
    if (!image || image.complete) {
      done();
      return;
    }

    const timeout = window.setTimeout(done, maxWaitMs);
    image.addEventListener('load', done);
    image.addEventListener('error', done);
    return () => {
      window.clearTimeout(timeout);
      image.removeEventListener('load', done);
      image.removeEventListener('error', done);
    };
  }, [key]);

  return [ref, Object.is(readyKey, key)] as const;
}
