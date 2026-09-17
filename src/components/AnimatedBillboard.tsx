import type { CSSProperties } from 'react';
import { animationMs } from '../utils/animationTiming';

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
  firstImage = '/board1.jpg',
  secondImage = '/board2.jpg',
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
        '--billboard-duration': animationMs(duration),
        '--billboard-delay': animationMs(delay),
      } as CSSProperties}
    >
      <img className="animated-billboard-image" src={image ?? firstImage} alt="" draggable={false} decoding="async" />
      {!image && <img className="animated-billboard-image animated-billboard-image-next" src={secondImage} alt="" draggable={false} decoding="async" />}
    </div>
  );
}
