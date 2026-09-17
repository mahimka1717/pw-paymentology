import { useEffect, useRef, useState } from 'react';
import { trackTheme } from '../data/theme';
import { animationMs, scaledMs } from '../utils/animationTiming';
import { cityAnimationType } from '../utils/cityAnimation';
import { AnimatedBillboard } from './AnimatedBillboard';

interface Props {
  hoveredTrackId: string | null;
  selectedTrackId?: string | null;
  onHoverTrack: (trackId: string | null) => void;
  onSelectTrack: (trackId: string, pointerType?: string) => void;
  className?: string;
  showPlaneAnimation?: boolean;
  showAnimatedPosters?: boolean;
}

interface CityTrack {
  id: string;
  name: string;
  image: string;
  bounds: [number, number, number, number];
  anchor: [number, number];
  endpoint: [number, number];
  mobileAnchor?: [number, number];
  mobileEndpoint: [number, number];
}

const imageWidth = 2670;
const imageHeight = 2508;
const calloutWidth = 900;
const calloutHeight = calloutWidth * imageHeight / imageWidth;
const calloutOrder = ['government', 'fintech', 'banks', 'remittance', 'digital-banks', 'telco'];
const calloutBaseDelay = 500;
const calloutStagger = 50;
const calloutLabelDelay = 500;
const calloutLabelDuration = 280;
const calloutEntranceDuration = calloutBaseDelay
  + (calloutOrder.length - 1) * calloutStagger
  + calloutLabelDelay
  + calloutLabelDuration;
const calloutCycleStartDelay = 500;
const calloutCycleDuration = 3300;
const ambientParticles = Array.from({ length: 34 }, (_, index) => ({
  left: `${13 + (index * 19) % 75}%`,
  top: `${31 + (index * 29) % 52}%`,
  size: `${2 + index % 4}px`,
  drift: `${(index % 2 === 0 ? 1 : -1) * (8 + index % 19)}px`,
  rise: `${38 + index % 43}px`,
  duration: 3600 + index % 8 * 420,
  delay: 750 + index * 190,
}));

function calloutDelay(trackId: string, step: 'dot' | 'line' | 'label') {
  const order = calloutOrder.indexOf(trackId);
  const stepDelay = step === 'dot' ? 0 : step === 'line' ? 150 : calloutLabelDelay;
  return animationMs(calloutBaseDelay + order * calloutStagger + stepDelay);
}

const cityTracks: CityTrack[] = [
  { id: 'fintech', name: 'Fintech', image: 'fintech', bounds: [759, 336, 1171, 1303], anchor: [319, 275.5], endpoint: [72.5, 275.5], mobileEndpoint: [319, 90] },
  { id: 'remittance', name: 'Remittance', image: 'remittance', bounds: [1140, 378, 1590, 1192], anchor: [497.35, 156.6], endpoint: [682.95, 156.6], mobileEndpoint: [497.35, 50] },
  { id: 'digital-banks', name: 'Digital Banks', image: 'digitalbanks', bounds: [1513, 597, 2242, 1494], anchor: [600.3, 301.6], endpoint: [788.8, 301.6], mobileAnchor: [700.3, 301.6], mobileEndpoint: [700.3, 140] },
  { id: 'telco', name: 'Telco', image: 'telco', bounds: [288, 864, 958, 1707], anchor: [226.2, 485.75], endpoint: [-46.4, 485.75], mobileEndpoint: [226.2, 90] },
  { id: 'banks', name: 'Banks', image: 'bank', bounds: [931, 1139, 1675, 1773], anchor: [423.4, 488.65], endpoint: [933.8, 488.65], mobileEndpoint: [423.4, 75] },
  { id: 'government', name: 'Government', image: 'government', bounds: [1458, 1537, 2081, 1960], anchor: [616.25, 609], endpoint: [822.15, 609], mobileEndpoint: [616.25, 115] },
];

const planeSegmentFrames = 11;
const planeSegmentStartFrame = 33;

const planeCycleDuration = 7000;
const planeFlyDuration = 3000;
const planeFlyStart = 1000;
const planeFadeDuration = 400;
const planeBaseTop = 2;
const planeArcHeight = 4;

function PlaneSequence() {
  const [frame, setFrame] = useState(planeSegmentStartFrame);
  const [style, setStyle] = useState<{ left: string; top: string; opacity: number }>({ left: '100%', top: `${planeBaseTop}%`, opacity: 0 });

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      setFrame(planeSegmentStartFrame);
      setStyle({ left: '50%', top: `${planeBaseTop}%`, opacity: 1 });
      return;
    }

    const startTime = performance.now();
    const frameDuration = planeFlyDuration / planeSegmentFrames;
    const flyEnd = planeFlyStart + planeFlyDuration;

    const tick = (now: number) => {
      const elapsed = (now - startTime) % planeCycleDuration;

      if (elapsed < planeFlyStart) {
        setStyle({ left: '100%', top: `${planeBaseTop}%`, opacity: 0 });
        setFrame(planeSegmentStartFrame);
      } else if (elapsed < flyEnd) {
        const flyElapsed = elapsed - planeFlyStart;
        const progress = flyElapsed / planeFlyDuration;
        const left = 100 - progress * 110;
        const top = planeBaseTop + 4 * planeArcHeight * progress * (1 - progress);
        let opacity = 1;
        if (flyElapsed < planeFadeDuration) {
          opacity = flyElapsed / planeFadeDuration;
        } else if (flyElapsed > planeFlyDuration - planeFadeDuration) {
          opacity = (planeFlyDuration - flyElapsed) / planeFadeDuration;
        }
        const frameIndex = Math.min(
          Math.floor(flyElapsed / frameDuration),
          planeSegmentFrames - 1,
        );
        setStyle({ left: `${left}%`, top: `${top}%`, opacity });
        setFrame(planeSegmentStartFrame + frameIndex);
      }

      rafId = requestAnimationFrame(tick);
    };

    let rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  const segment = Math.floor(frame / 11) + 1;
  const frameInSegment = (frame % 11) + 1;

  return (
    <img
      src={`/img/city/plane/${segment}_${frameInSegment}.png`}
      alt=""
      className="city-plane"
      style={{ left: style.left, top: style.top, opacity: style.opacity, transform: 'none' }}
      draggable={false}
      decoding="async"
    />
  );
}

export function InteractiveCity({ hoveredTrackId, selectedTrackId = null, onHoverTrack, onSelectTrack, className = '', showPlaneAnimation = false, showAnimatedPosters = true }: Props) {
  const [idleTrackIndex, setIdleTrackIndex] = useState(0);
  const [entranceComplete, setEntranceComplete] = useState(false);
  const overlaysPrefetched = useRef(false);
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const idleAnimationEnabled = cityAnimationType === 1 && !reducedMotion;
  const ambientAnimationEnabled = cityAnimationType === 2 && !reducedMotion;
  const interactiveTrackId = selectedTrackId ?? hoveredTrackId;
  const idleTrackId = idleAnimationEnabled && entranceComplete && !interactiveTrackId ? cityTracks[idleTrackIndex].id : null;

  useEffect(() => {
    if (!idleAnimationEnabled) return;

    const timeout = window.setTimeout(
      () => setEntranceComplete(true),
      scaledMs(calloutEntranceDuration + calloutCycleStartDelay),
    );
    return () => window.clearTimeout(timeout);
  }, [idleAnimationEnabled]);

  useEffect(() => {
    if (!idleAnimationEnabled || !entranceComplete || hoveredTrackId || selectedTrackId) return;

    const interval = window.setInterval(() => {
      setIdleTrackIndex(current => (current + 1) % cityTracks.length);
    }, scaledMs(calloutCycleDuration));

    return () => window.clearInterval(interval);
  }, [entranceComplete, hoveredTrackId, idleAnimationEnabled, selectedTrackId]);

  return (
    <div
      data-interactive-city
      data-animation-type={cityAnimationType}
      className={`city-parallax relative aspect-[2670/2508] select-none ${ambientAnimationEnabled ? 'city-ambient-active' : ''} ${hoveredTrackId ? 'has-hover' : ''} ${selectedTrackId ? 'selection-locked' : ''} ${className}`}
      style={{ isolation: 'auto', containerType: 'inline-size' }}
      onPointerMove={event => {
        if (!overlaysPrefetched.current) {
          overlaysPrefetched.current = true;
          cityTracks.forEach(track => {
            const image = new Image();
            image.src = `/img/city/city-${track.image}-900.webp`;
          });
        }
        if (!idleAnimationEnabled || event.pointerType !== 'mouse') return;
        const bounds = event.currentTarget.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width - 0.5;
        const y = (event.clientY - bounds.top) / bounds.height - 0.5;
        event.currentTarget.style.setProperty('--city-parallax-x', `${x * 8}px`);
        event.currentTarget.style.setProperty('--city-parallax-y', `${y * 8}px`);
      }}
      onPointerLeave={event => {
        event.currentTarget.style.setProperty('--city-parallax-x', '0px');
        event.currentTarget.style.setProperty('--city-parallax-y', '0px');
      }}
    >
      <div className="city-base-enter absolute inset-0">
        <img
          src="/img/city/city-900.webp"
          srcSet="/img/city/city-900.webp 900w, /img/city/city-1800.webp 1800w"
          sizes="(min-width: 1024px) 900px, 100vw"
          width={2670}
          height={2508}
          alt="Choose a Paymentology track from the interactive city"
          className="absolute inset-0 h-full w-full object-contain"
          draggable={false}
          decoding="async"
        />

        <div
          aria-hidden="true"
          className="city-car pointer-events-none absolute z-10"
          style={{
            '--car-start-left': `${100 / imageWidth * 100}%`,
            '--car-start-top': `${1540 / imageHeight * 100}%`,
            '--car-end-left': `${1380 / imageWidth * 100}%`,
            '--car-end-top': `${2085 / imageHeight * 100}%`,
            '--car-translate-x': `${(1380 - 100) / 147 * 100}%`,
            '--car-translate-y': `${(2085 - 1540) / 147 * (922 / 655) * 100}%`,
            width: `${147 / imageWidth * 100}%`,
            aspectRatio: '922 / 655',
          } as React.CSSProperties}
        >
          {[
            ['01_drive_right.webp', 1, 0, 0],
            ['02_turn_rear_side.webp', 0.86, 0.07, 0],
            ['03_rear.webp', 0.95, 0.025, -0.02],
            ['04_drive_left.webp', 0.87, 0.065, 0],
            ['05_turn_front_side.webp', 0.86, 0.07, -0.04],
            ['06_front.webp', 0.95, 0.025, -0.07],
          ].map(([file, width, left, top], index) => (
            <img
              key={file}
              src={`/img/city/car/${file}`}
              alt=""
              className={`city-car-frame city-car-frame-${index + 1} absolute object-contain`}
              style={{
                left: `${Number(left) * 100}%`,
                top: `${Number(top) * 100}%`,
                width: `${Number(width) * 100}%`,
              }}
              draggable={false}
              decoding="async"
            />
          ))}
        </div>

        {showPlaneAnimation && <PlaneSequence />}

        {showAnimatedPosters && (
          <>
            <AnimatedBillboard
              x={624}
              y={1688}
              width={32}
              height={74}
              referenceWidth={imageWidth}
              referenceHeight={imageHeight}
              distortion={{ rotate: 0, skewY: 22, origin: 'bottom center' }}
              image="/img/posters/p_0.webp"
              brightness={0.9}
              saturation={0.95}
            />
            <AnimatedBillboard
              x={2306}
              y={1596}
              width={38}
              height={71}
              referenceWidth={imageWidth}
              referenceHeight={imageHeight}
              distortion={{ rotate: 3, skewY: 16, origin: 'bottom center' }}
              image="/img/posters/p_2.webp"
              brightness={0.88}
              saturation={0.92}
              delay={4000}
            />
          </>
        )}
      </div>

      {ambientAnimationEnabled && (
        <div className="city-ambient-particles pointer-events-none absolute inset-0" aria-hidden="true">
          {ambientParticles.map((particle, index) => (
            <span
              key={`particle-${index}`}
              className="city-ambient-particle absolute"
              style={{
                left: particle.left,
                top: particle.top,
                width: particle.size,
                height: particle.size,
                '--particle-drift': particle.drift,
                '--particle-rise': particle.rise,
                animationDuration: animationMs(particle.duration),
                animationDelay: animationMs(particle.delay),
              } as React.CSSProperties}
            />
          ))}
        </div>
      )}

      {cityTracks.map((track, index) => {
        const imageUrl = `/img/city/city-${track.image}-900.webp`;
        const districtVisible = ambientAnimationEnabled || interactiveTrackId === track.id;
        return (
          <div key={track.id}>
            {districtVisible && (
              <img
                src={imageUrl}
                alt=""
                aria-hidden="true"
                className={`city-district-layer pointer-events-none absolute inset-0 h-full w-full object-contain ${ambientAnimationEnabled ? 'is-ambient' : ''} ${interactiveTrackId === track.id ? 'is-hovered' : ''}`}
                style={{
                  opacity: ambientAnimationEnabled ? 0.24 : 0,
                  mixBlendMode: 'soft-light',
                  animationDelay: ambientAnimationEnabled ? animationMs(750 + index * 850) : undefined,
                }}
                draggable={false}
                decoding="async"
              />
            )}
            {ambientAnimationEnabled && (
              <div
                aria-hidden="true"
                className="city-district-sheen pointer-events-none absolute inset-0"
                style={{
                  WebkitMaskImage: `url(${imageUrl})`,
                  maskImage: `url(${imageUrl})`,
                  animationDelay: animationMs(750 + index * 1300),
                }}
              />
            )}
          </div>
        );
      })}

      {cityTracks.map((track) => {
        const [left, top, right, bottom] = track.bounds;
        return (
          <button
            key={`${track.id}-hit-area`}
            type="button"
            aria-label={`Choose ${track.name}`}
            className="pointer-events-auto absolute z-10 cursor-pointer border-0 bg-transparent p-0 outline-none"
            style={{
              left: `${left / imageWidth * 100}%`,
              top: `${top / imageHeight * 100}%`,
              width: `${(right - left) / imageWidth * 100}%`,
              height: `${(bottom - top) / imageHeight * 100}%`,
            }}
            onPointerEnter={() => onHoverTrack(track.id)}
            onPointerLeave={() => onHoverTrack(null)}
            onFocus={() => onHoverTrack(track.id)}
            onBlur={() => onHoverTrack(null)}
            onClick={(event) => onSelectTrack(track.id, (event.nativeEvent as PointerEvent).pointerType)}
          />
        );
      })}

      <svg
        className="pointer-events-none absolute inset-0 z-20 h-full w-full overflow-visible"
        viewBox={`0 0 ${calloutWidth} ${calloutHeight}`}
      >
        {cityTracks.map((track, index) => {
          const interactive = interactiveTrackId === track.id;
          const dotActive = interactive || idleTrackId === track.id;
          const calloutColor = interactive ? trackTheme[track.id].accent : '#FFFFFF';
          const dotColor = dotActive ? trackTheme[track.id].accent : '#FFFFFF';
          const mobileAnchor = track.mobileAnchor ?? track.anchor;
          return (
            <g
              key={track.id}
              className={`pointer-events-auto cursor-pointer outline-none ${selectedTrackId === track.id ? 'is-touch-selected' : ''}`}
              role="button"
              tabIndex={0}
              aria-label={`Highlight ${track.name}`}
              onPointerEnter={() => onHoverTrack(track.id)}
              onPointerLeave={() => onHoverTrack(null)}
              onFocus={() => onHoverTrack(track.id)}
              onBlur={() => onHoverTrack(null)}
              onClick={(event) => onSelectTrack(track.id, (event.nativeEvent as PointerEvent).pointerType)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                    onSelectTrack(track.id, 'keyboard');
                }
              }}
            >
              <line
                className={`city-callout-line lg:hidden ${interactive ? 'is-visible' : ''}`}
                x1={mobileAnchor[0]}
                y1={mobileAnchor[1]}
                x2={track.mobileEndpoint[0]}
                y2={track.mobileEndpoint[1]}
                stroke={calloutColor}
                strokeWidth="1"
                pathLength="1"
              />
              {(idleAnimationEnabled || ambientAnimationEnabled) && (
                <line
                  className={`city-callout-impulse lg:hidden ${idleAnimationEnabled && interactive ? 'is-active' : ''} ${ambientAnimationEnabled ? 'is-ambient' : ''}`}
                  x1={mobileAnchor[0]}
                  y1={mobileAnchor[1]}
                  x2={track.mobileEndpoint[0]}
                  y2={track.mobileEndpoint[1]}
                  stroke={ambientAnimationEnabled ? trackTheme[track.id].accent : calloutColor}
                  strokeWidth="2"
                  pathLength="1"
                  style={{ animationDelay: ambientAnimationEnabled ? animationMs(750 + index * 1100) : idleAnimationEnabled && interactive ? animationMs(300) : undefined }}
                />
              )}
              <line
                className="lg:hidden"
                x1={mobileAnchor[0]}
                y1={mobileAnchor[1]}
                x2={track.mobileEndpoint[0]}
                y2={track.mobileEndpoint[1]}
                stroke="transparent"
                strokeWidth="21"
                pointerEvents="stroke"
              />
              <line
                className={`city-callout-line hidden lg:block ${interactive ? 'is-visible' : ''}`}
                x1={track.anchor[0]}
                y1={track.anchor[1]}
                x2={track.endpoint[0]}
                y2={track.endpoint[1]}
                stroke={calloutColor}
                strokeWidth="1"
                pathLength="1"
              />
              {(idleAnimationEnabled || ambientAnimationEnabled) && (
                <line
                  className={`city-callout-impulse hidden lg:block ${idleAnimationEnabled && interactive ? 'is-active' : ''} ${ambientAnimationEnabled ? 'is-ambient' : ''}`}
                  x1={track.anchor[0]}
                  y1={track.anchor[1]}
                  x2={track.endpoint[0]}
                  y2={track.endpoint[1]}
                  stroke={ambientAnimationEnabled ? trackTheme[track.id].accent : calloutColor}
                  strokeWidth="2"
                  pathLength="1"
                  style={{ animationDelay: ambientAnimationEnabled ? animationMs(750 + index * 1100) : idleAnimationEnabled && interactive ? animationMs(300) : undefined }}
                />
              )}
              <line
                className="hidden lg:block"
                x1={track.anchor[0]}
                y1={track.anchor[1]}
                x2={track.endpoint[0]}
                y2={track.endpoint[1]}
                stroke="transparent"
                strokeWidth="21"
                pointerEvents="stroke"
              />
              <circle className="city-callout-dot lg:hidden" cx={mobileAnchor[0]} cy={mobileAnchor[1]} r="12.5" fill={dotColor} stroke="#FFFFFF" strokeWidth="3" style={{ animationDelay: calloutDelay(track.id, 'dot') }} />
              <circle className="city-callout-dot hidden lg:block" cx={track.anchor[0]} cy={track.anchor[1]} r="12.5" fill={dotColor} stroke="#FFFFFF" strokeWidth="3" style={{ animationDelay: calloutDelay(track.id, 'dot') }} />
              {(idleAnimationEnabled || ambientAnimationEnabled) && (
                <>
                  <circle className={`city-callout-pulse lg:hidden ${idleAnimationEnabled && dotActive ? 'is-active' : ''} ${ambientAnimationEnabled ? 'is-ambient' : ''}`} cx={mobileAnchor[0]} cy={mobileAnchor[1]} r="14" stroke={ambientAnimationEnabled ? trackTheme[track.id].accent : dotColor} strokeWidth="3" fill="none" style={{ animationDelay: ambientAnimationEnabled ? animationMs(750 + index * 700) : undefined }} />
                  <circle className={`city-callout-pulse hidden lg:block ${idleAnimationEnabled && dotActive ? 'is-active' : ''} ${ambientAnimationEnabled ? 'is-ambient' : ''}`} cx={track.anchor[0]} cy={track.anchor[1]} r="14" stroke={ambientAnimationEnabled ? trackTheme[track.id].accent : dotColor} strokeWidth="3" fill="none" style={{ animationDelay: ambientAnimationEnabled ? animationMs(750 + index * 700) : undefined }} />
                </>
              )}
            </g>
          );
        })}
      </svg>

      {cityTracks.map((track) => {
        const interactive = interactiveTrackId === track.id;
        const labelOnRight = track.endpoint[0] > track.anchor[0];
        const labelOnTop = track.mobileEndpoint[1] < track.anchor[1];
        return (
          <div key={`${track.id}-callout-label`}>
            <button
              type="button"
              className={`city-callout-label absolute z-30 whitespace-nowrap border-0 text-white outline-none lg:hidden ${interactive ? 'is-visible has-background' : ''} ${selectedTrackId === track.id ? 'is-touch-selected' : ''}`}
              style={{
                '--callout-background': trackTheme[track.id].accent,
                left: `${track.mobileEndpoint[0] / calloutWidth * 100}%`,
                top: `${track.mobileEndpoint[1] / calloutHeight * 100}%`,
                transform: labelOnTop
                  ? track.id === 'fintech'
                    ? 'translate(-75%, -100%)'
                    : track.id === 'telco'
                      ? 'translate(-75%, -100%)'
                      : track.id === 'government'
                        ? 'translate(-25%, -100%)'
                        : 'translate(-50%, -100%)'
                  : track.id === 'fintech'
                    ? 'translate(-75%, 0)'
                    : track.id === 'telco'
                      ? 'translate(-75%, 0)'
                      : track.id === 'government'
                        ? 'translate(-25%, 0)'
                        : 'translate(-50%, 0)',
                padding: '2.222cqw 3.333cqw',
                borderRadius: '3.333cqw',
                fontFamily: "'PP Monument Wide', sans-serif",
                fontSize: '2.8cqw',
                fontWeight: 900,
                lineHeight: 1,
              } as React.CSSProperties}
              onPointerEnter={() => onHoverTrack(track.id)}
              onPointerLeave={() => onHoverTrack(null)}
              onFocus={() => onHoverTrack(track.id)}
              onBlur={() => onHoverTrack(null)}
              onClick={(event) => onSelectTrack(track.id, (event.nativeEvent as PointerEvent).pointerType)}
            >
              {track.name.toUpperCase()}
            </button>
            <button
              type="button"
              className={`city-callout-label absolute z-30 hidden whitespace-nowrap border-0 text-white outline-none lg:block ${interactive ? 'is-visible has-background' : ''} ${selectedTrackId === track.id ? 'is-touch-selected' : ''}`}
              style={{
                '--callout-background': trackTheme[track.id].accent,
                left: `${track.endpoint[0] / calloutWidth * 100}%`,
                top: `${track.endpoint[1] / calloutHeight * 100}%`,
                transform: labelOnRight ? 'translateY(-50%)' : 'translate(-100%, -50%)',
                padding: '2.222cqw 3.333cqw',
                borderRadius: '3.333cqw',
                fontFamily: "'PP Monument Wide', sans-serif",
                fontSize: '2.222cqw',
                fontWeight: 900,
                lineHeight: 1,
              } as React.CSSProperties}
              onPointerEnter={() => onHoverTrack(track.id)}
              onPointerLeave={() => onHoverTrack(null)}
              onFocus={() => onHoverTrack(track.id)}
              onBlur={() => onHoverTrack(null)}
              onClick={(event) => onSelectTrack(track.id, (event.nativeEvent as PointerEvent).pointerType)}
            >
              {track.name.toUpperCase()}
            </button>
          </div>
        );
      })}
    </div>
  );
}
