import { Track } from '../data/tracks';
import { tracks } from '../data/tracks';

interface Props {
  track: Track;
}

const trackTitleColor: Record<string, string> = {
  government: '#AAFF6E',
  telco: '#F0FF55',
  fintech: '#FF9966',
  remittance: '#A586FF',
  'digital-banks': '#FFA0E6',
  banks: '#3E4D9C',
};

const trackImageById = tracks.reduce<Record<string, string>>((result, item, index) => {
  result[item.id] = `/img/track${index}.png`;
  return result;
}, {});

export function TrackSidebar({ track }: Props) {
  const titleColor = trackTitleColor[track.id] ?? '#FFFFFF';
  const trackImage = trackImageById[track.id];

  return (
    <div className="relative h-full w-full overflow-hidden">
      <h2 className="w-full text-left text-2xl font-bold uppercase" style={{ color: titleColor }}>
        {track.name}
      </h2>
      {trackImage && (
        <img
          src={trackImage}
          alt={`${track.name} track`}
          className="absolute right-0 bottom-[80px] h-auto w-[92%] max-w-[430px] object-contain"
        />
      )}
    </div>
  );
}
