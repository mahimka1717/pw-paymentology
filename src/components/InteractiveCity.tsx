import { trackTheme } from '../data/theme';

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

function calloutDelay(trackId: string, step: 'dot' | 'line' | 'label') {
  const order = calloutOrder.indexOf(trackId);
  const stepDelay = step === 'dot' ? 0 : step === 'line' ? 150 : 500;
  return `${500 + order * 50 + stepDelay}ms`;
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
  return (
    <div
      data-interactive-city
      className={`relative aspect-[2670/2508] select-none ${className}`}
      style={{ isolation: 'auto', containerType: 'inline-size' }}
    >
      <img
        src="/img/city/city.png"
        alt="Choose a Paymentology track from the interactive city"
        className="city-base-enter absolute inset-0 h-full w-full object-contain"
        draggable={false}
      />

      {cityTracks.map((track) => (
        <img
          key={track.id}
          src={`/img/city/city-${track.image}.png`}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full object-contain transition-opacity duration-200"
          style={{
            opacity: hoveredTrackId === track.id ? 1 : 0,
            mixBlendMode: 'soft-light',
          }}
          draggable={false}
        />
      ))}

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
        {cityTracks.map((track) => {
          const active = hoveredTrackId === track.id;
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
              <circle className="city-callout-dot lg:hidden" cx={mobileAnchor[0]} cy={mobileAnchor[1]} r="14" fill={color} style={{ animationDelay: calloutDelay(track.id, 'dot') }} />
              <circle className="city-callout-dot hidden lg:block" cx={track.anchor[0]} cy={track.anchor[1]} r="14" fill={color} style={{ animationDelay: calloutDelay(track.id, 'dot') }} />
            </g>
          );
        })}
      </svg>

      {cityTracks.map((track) => {
        const active = hoveredTrackId === track.id;
        const labelOnRight = track.endpoint[0] > track.anchor[0];
        const labelOnTop = track.mobileEndpoint[1] < track.anchor[1];
        return (
          <div key={`${track.id}-callout-label`}>
            <button
              type="button"
              className="city-callout-label absolute z-30 whitespace-nowrap border-0 text-white outline-none transition-colors lg:hidden"
              style={{
                animationDelay: calloutDelay(track.id, 'label'),
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
                backgroundColor: active ? trackTheme[track.id].accent : 'transparent',
                fontFamily: "'PP Monument Wide', sans-serif",
                fontSize: '2.8cqw',
                fontWeight: 900,
                lineHeight: 1,
              }}
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
              className="city-callout-label absolute z-30 hidden whitespace-nowrap border-0 text-white outline-none transition-colors lg:block"
              style={{
                animationDelay: calloutDelay(track.id, 'label'),
                left: `${track.endpoint[0] / calloutWidth * 100}%`,
                top: `${track.endpoint[1] / calloutHeight * 100}%`,
                transform: labelOnRight ? 'translateY(-50%)' : 'translate(-100%, -50%)',
                padding: '2.222cqw 3.333cqw',
                borderRadius: '3.333cqw',
                backgroundColor: active ? trackTheme[track.id].accent : 'transparent',
                fontFamily: "'PP Monument Wide', sans-serif",
                fontSize: '2.222cqw',
                fontWeight: 900,
                lineHeight: 1,
              }}
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
