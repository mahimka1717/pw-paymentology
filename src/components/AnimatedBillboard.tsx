import { useEffect, useRef, type CSSProperties } from 'react';
import { useImageReady } from '../hooks/useImageReady';
import { animationMs } from '../utils/animationTiming';
import { asset } from '../utils/asset';

interface BillboardDistortion {
  rotate?: number;
  skewX?: number;
  skewY?: number;
  perspective?: number;
  rotateX?: number;
  rotateY?: number;
  origin?: string;
}

interface Props {
  x: number;
  y: number;
  width: number;
  height: number;
  referenceWidth: number;
  referenceHeight: number;
  scale?: number;
  distortion?: BillboardDistortion;
  image?: string;
  firstImage?: string;
  secondImage?: string;
  duration?: number;
  delay?: number;
  brightness?: number;
  saturation?: number;
  className?: string;
}

export function AnimatedBillboard({
  x,
  y,
  width,
  height,
  referenceWidth,
  referenceHeight,
  scale = 1,
  distortion = {},
  image,
  firstImage = asset('/board1.jpg'),
  secondImage = asset('/board2.jpg'),
  duration = 8000,
  delay = 0,
  brightness = 0.82,
  saturation = 0.9,
  className = '',
}: Props) {
  const transforms = [
    distortion.perspective ? `perspective(${distortion.perspective}px)` : '',
    distortion.rotateX ? `rotateX(${distortion.rotateX}deg)` : '',
    distortion.rotateY ? `rotateY(${distortion.rotateY}deg)` : '',
    distortion.rotate ? `rotate(${distortion.rotate}deg)` : '',
    distortion.skewX ? `skewX(${distortion.skewX}deg)` : '',
    distortion.skewY ? `skewY(${distortion.skewY}deg)` : '',
    `scale(${scale})`,
  ].filter(Boolean).join(' ');
  // The billboard switches on with a fade once its poster is in; a poster already in memory shows straight away.
  const [imageRef, imageReady] = useImageReady(image ?? firstImage);
  const nextImageRef = useRef<HTMLImageElement>(null);

  // Posters are heavy: if the billboard leaves the screen mid-download, stop it so the next screen gets the bandwidth.
  useEffect(() => {
    const images = [imageRef.current, nextImageRef.current];
    return () => {
      for (const image of images) {
        if (image && !image.complete) image.src = '';
      }
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className={`animated-billboard pointer-events-none absolute ${image ? 'animated-billboard--static' : ''} ${className}`}
      style={{
        left: `${x / referenceWidth * 100}%`,
        top: `${y / referenceHeight * 100}%`,
        width: `${width / referenceWidth * 100}%`,
        height: `${height / referenceHeight * 100}%`,
        transform: transforms,
        transformOrigin: distortion.origin ?? 'center',
        filter: `brightness(${brightness}) saturate(${saturation})`,
        opacity: imageReady ? 1 : 0,
        transition: `opacity ${animationMs(400)} ease-out`,
        '--billboard-duration': animationMs(duration),
        '--billboard-delay': animationMs(delay),
      } as CSSProperties}
    >
      <img ref={imageRef} className="animated-billboard-image" src={image ?? firstImage} alt="" draggable={false} decoding="async" />
      {!image && <img ref={nextImageRef} className="animated-billboard-image animated-billboard-image-next" src={secondImage} alt="" draggable={false} decoding="async" />}
    </div>
  );
}
