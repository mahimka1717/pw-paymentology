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
}

const imageWidth = 2670;
const imageHeight = 2508;
const calloutWidth = 900;
const calloutHeight = calloutWidth * imageHeight / imageWidth;

const cityTracks: CityTrack[] = [
  { id: 'fintech', name: 'Fintech', image: 'fintech', bounds: [759, 336, 1171, 1303], anchor: [319, 275.5], endpoint: [72.5, 275.5] },
  { id: 'remittance', name: 'Remittance', image: 'remittance', bounds: [1140, 378, 1590, 1192], anchor: [497.35, 156.6], endpoint: [682.95, 156.6] },
  { id: 'digital-banks', name: 'Digital Banks', image: 'digitalbanks', bounds: [1513, 597, 2242, 1494], anchor: [600.3, 301.6], endpoint: [788.8, 301.6] },
  { id: 'telco', name: 'Telco', image: 'telco', bounds: [288, 864, 958, 1707], anchor: [226.2, 485.75], endpoint: [-46.4, 485.75] },
  { id: 'banks', name: 'Banks', image: 'bank', bounds: [931, 1139, 1675, 1773], anchor: [423.4, 488.65], endpoint: [933.8, 488.65] },
  { id: 'government', name: 'Government', image: 'government', bounds: [1458, 1537, 2081, 1960], anchor: [616.25, 609], endpoint: [822.15, 609] },
];

export function InteractiveCity({ hoveredTrackId, onHoverTrack, onSelectTrack, className = '' }: Props) {
  return (
    <div
      className={`relative aspect-[2670/2508] select-none ${className}`}
      style={{ isolation: 'auto', containerType: 'inline-size' }}
    >
      <img
        src="/img/city/city.png"
        alt="Choose a Paymentology track from the interactive city"
        className="absolute inset-0 h-full w-full object-contain"
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
                if (event.key === 'Enter' || event.key === ' ') onSelectTrack(track.id);
              }}
            >
              <line
                x1={track.anchor[0]}
                y1={track.anchor[1]}
                x2={track.endpoint[0]}
                y2={track.endpoint[1]}
                stroke={color}
                strokeWidth="1"
              />
              <line
                x1={track.anchor[0]}
                y1={track.anchor[1]}
                x2={track.endpoint[0]}
                y2={track.endpoint[1]}
                stroke="transparent"
                strokeWidth="21"
                pointerEvents="stroke"
              />
              <circle cx={track.anchor[0]} cy={track.anchor[1]} r="14" fill={color} />
            </g>
          );
        })}
      </svg>

      {cityTracks.map((track) => {
        const active = hoveredTrackId === track.id;
        const labelOnRight = track.endpoint[0] > track.anchor[0];
        return (
          <button
            key={`${track.id}-callout-label`}
            type="button"
            className="absolute z-30 whitespace-nowrap border-0 text-white outline-none transition-colors"
            style={{
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
        );
      })}
    </div>
  );
}
