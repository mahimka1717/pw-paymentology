import { useEffect, useState } from 'react';
import { trackTheme } from '../data/theme';
import { animationMs, scaledMs } from '../utils/animationTiming';
import { cityAnimationType } from '../utils/cityAnimation';

interface Props {
  hoveredTrackId: string | null;
  onHoverTrack: (trackId: string | null) => void;
  onSelectTrack: (trackId: string) => void;
  className?: string;
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
  { id: 'telco', name: 'Telco', image: 'telco', bounds: [288, 864, 958, 1707], anchor: [226.2, 485.75], endpoint: [-46.4, 485.75], mobileEndpoint: [226.2, 755] },
  { id: 'banks', name: 'Banks', image: 'bank', bounds: [931, 1139, 1675, 1773], anchor: [423.4, 488.65], endpoint: [933.8, 488.65], mobileEndpoint: [423.4, 795] },
  { id: 'government', name: 'Government', image: 'government', bounds: [1458, 1537, 2081, 1960], anchor: [616.25, 609], endpoint: [822.15, 609], mobileEndpoint: [616.25, 755] },
];

export function InteractiveCity({ hoveredTrackId, onHoverTrack, onSelectTrack, className = '' }: Props) {
  const [idleTrackIndex, setIdleTrackIndex] = useState(0);
  const [entranceComplete, setEntranceComplete] = useState(false);
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const idleAnimationEnabled = cityAnimationType === 1 && !reducedMotion;
  const ambientAnimationEnabled = cityAnimationType === 2 && !reducedMotion;
  const animatedTrackId = hoveredTrackId ?? (idleAnimationEnabled && entranceComplete ? cityTracks[idleTrackIndex].id : null);

  useEffect(() => {
    if (!idleAnimationEnabled) return;

    const timeout = window.setTimeout(
      () => setEntranceComplete(true),
      scaledMs(calloutEntranceDuration + calloutCycleStartDelay),
    );
    return () => window.clearTimeout(timeout);
  }, [idleAnimationEnabled]);

  useEffect(() => {
    if (!idleAnimationEnabled || !entranceComplete || hoveredTrackId) return;

    const interval = window.setInterval(() => {
      setIdleTrackIndex(current => (current + 1) % cityTracks.length);
    }, scaledMs(calloutCycleDuration));

    return () => window.clearInterval(interval);
  }, [entranceComplete, hoveredTrackId, idleAnimationEnabled]);

  return (
    <div
      data-interactive-city
      data-animation-type={cityAnimationType}
      className={`city-parallax relative aspect-[2670/2508] select-none ${ambientAnimationEnabled ? 'city-ambient-active' : ''} ${hoveredTrackId ? 'has-hover' : ''} ${className}`}
      style={{ isolation: 'auto', containerType: 'inline-size' }}
      onPointerMove={event => {
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
      <img
        src="/img/city/city.png"
        alt="Choose a Paymentology track from the interactive city"
        className="city-base-enter absolute inset-0 h-full w-full object-contain"
        draggable={false}
      />

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
        const imageUrl = `/img/city/city-${track.image}.png`;
        return (
          <div key={track.id}>
            <img
              src={imageUrl}
              alt=""
              aria-hidden="true"
              className={`city-district-layer pointer-events-none absolute inset-0 h-full w-full object-contain ${animatedTrackId === track.id ? 'is-awake' : ''} ${ambientAnimationEnabled ? 'is-ambient' : ''} ${hoveredTrackId === track.id ? 'is-hovered' : ''}`}
              style={{
                opacity: ambientAnimationEnabled ? 0.24 : 0,
                mixBlendMode: 'soft-light',
                animationDelay: ambientAnimationEnabled ? animationMs(750 + index * 850) : undefined,
              }}
              draggable={false}
            />
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
            onClick={() => onSelectTrack(track.id)}
          />
        );
      })}

      <svg
        className="pointer-events-none absolute inset-0 z-20 h-full w-full overflow-visible"
        viewBox={`0 0 ${calloutWidth} ${calloutHeight}`}
      >
        {cityTracks.map((track, index) => {
          const active = animatedTrackId === track.id;
          const color = active ? trackTheme[track.id].accent : '#FFFFFF';
          const mobileAnchor = track.mobileAnchor ?? track.anchor;
          return (
            <g
              key={track.id}
              className="pointer-events-auto cursor-pointer outline-none"
              role="button"
              tabIndex={0}
              aria-label={`Highlight ${track.name}`}
              onPointerEnter={() => onHoverTrack(track.id)}
              onPointerLeave={() => onHoverTrack(null)}
              onFocus={() => onHoverTrack(track.id)}
              onBlur={() => onHoverTrack(null)}
              onClick={() => onSelectTrack(track.id)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  onSelectTrack(track.id);
                }
              }}
            >
              <line
                className="city-callout-line lg:hidden"
                x1={mobileAnchor[0]}
                y1={mobileAnchor[1]}
                x2={track.mobileEndpoint[0]}
                y2={track.mobileEndpoint[1]}
                stroke={color}
                strokeWidth="1"
                pathLength="1"
                style={{ animationDelay: calloutDelay(track.id, 'line') }}
              />
              {(idleAnimationEnabled || ambientAnimationEnabled) && (
                <line
                  className={`city-callout-impulse lg:hidden ${idleAnimationEnabled && active ? 'is-active' : ''} ${ambientAnimationEnabled ? 'is-ambient' : ''}`}
                  x1={mobileAnchor[0]}
                  y1={mobileAnchor[1]}
                  x2={track.mobileEndpoint[0]}
                  y2={track.mobileEndpoint[1]}
                  stroke={ambientAnimationEnabled ? trackTheme[track.id].accent : color}
                  strokeWidth="2"
                  pathLength="1"
                  style={{ animationDelay: ambientAnimationEnabled ? animationMs(750 + index * 1100) : undefined }}
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
                className="city-callout-line hidden lg:block"
                x1={track.anchor[0]}
                y1={track.anchor[1]}
                x2={track.endpoint[0]}
                y2={track.endpoint[1]}
                stroke={color}
                strokeWidth="1"
                pathLength="1"
                style={{ animationDelay: calloutDelay(track.id, 'line') }}
              />
              {(idleAnimationEnabled || ambientAnimationEnabled) && (
                <line
                  className={`city-callout-impulse hidden lg:block ${idleAnimationEnabled && active ? 'is-active' : ''} ${ambientAnimationEnabled ? 'is-ambient' : ''}`}
                  x1={track.anchor[0]}
                  y1={track.anchor[1]}
                  x2={track.endpoint[0]}
                  y2={track.endpoint[1]}
                  stroke={ambientAnimationEnabled ? trackTheme[track.id].accent : color}
                  strokeWidth="2"
                  pathLength="1"
                  style={{ animationDelay: ambientAnimationEnabled ? animationMs(750 + index * 1100) : undefined }}
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
              <circle className="city-callout-dot lg:hidden" cx={mobileAnchor[0]} cy={mobileAnchor[1]} r="12.5" fill={color} stroke="#FFFFFF" strokeWidth="3" style={{ animationDelay: calloutDelay(track.id, 'dot') }} />
              <circle className="city-callout-dot hidden lg:block" cx={track.anchor[0]} cy={track.anchor[1]} r="12.5" fill={color} stroke="#FFFFFF" strokeWidth="3" style={{ animationDelay: calloutDelay(track.id, 'dot') }} />
              {(idleAnimationEnabled || ambientAnimationEnabled) && (
                <>
                  <circle className={`city-callout-pulse lg:hidden ${idleAnimationEnabled && active ? 'is-active' : ''} ${ambientAnimationEnabled ? 'is-ambient' : ''}`} cx={mobileAnchor[0]} cy={mobileAnchor[1]} r="14" stroke={ambientAnimationEnabled ? trackTheme[track.id].accent : color} strokeWidth="3" fill="none" style={{ animationDelay: ambientAnimationEnabled ? animationMs(750 + index * 700) : undefined }} />
                  <circle className={`city-callout-pulse hidden lg:block ${idleAnimationEnabled && active ? 'is-active' : ''} ${ambientAnimationEnabled ? 'is-ambient' : ''}`} cx={track.anchor[0]} cy={track.anchor[1]} r="14" stroke={ambientAnimationEnabled ? trackTheme[track.id].accent : color} strokeWidth="3" fill="none" style={{ animationDelay: ambientAnimationEnabled ? animationMs(750 + index * 700) : undefined }} />
                </>
              )}
            </g>
          );
        })}
      </svg>

      {cityTracks.map((track) => {
        const backgroundActive = animatedTrackId === track.id;
        const labelOnRight = track.endpoint[0] > track.anchor[0];
        const labelOnTop = track.mobileEndpoint[1] < track.anchor[1];
        return (
          <div key={`${track.id}-callout-label`}>
            <button
              type="button"
              className={`city-callout-label absolute z-30 whitespace-nowrap border-0 text-white outline-none lg:hidden ${backgroundActive ? 'has-background' : ''}`}
              style={{
                animationDelay: calloutDelay(track.id, 'label'),
                '--callout-background': trackTheme[track.id].accent,
                left: `${track.mobileEndpoint[0] / calloutWidth * 100}%`,
                top: `${track.mobileEndpoint[1] / calloutHeight * 100}%`,
                transform: track.id === 'fintech'
                  ? 'translate(-75%, -100%)'
                  : track.id === 'telco'
                    ? 'translate(-75%, 0)'
                    : track.id === 'government'
                      ? 'translate(-25%, 0)'
                  : labelOnTop
                    ? 'translate(-50%, -100%)'
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
              onClick={() => onSelectTrack(track.id)}
            >
              {track.name.toUpperCase()}
            </button>
            <button
              type="button"
              className={`city-callout-label absolute z-30 hidden whitespace-nowrap border-0 text-white outline-none lg:block ${backgroundActive ? 'has-background' : ''}`}
              style={{
                animationDelay: calloutDelay(track.id, 'label'),
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
              onClick={() => onSelectTrack(track.id)}
            >
              {track.name.toUpperCase()}
            </button>
          </div>
        );
      })}
    </div>
  );
}
