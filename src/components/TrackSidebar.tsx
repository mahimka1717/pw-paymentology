import { Track } from '../data/tracks';
import type { Phase } from './App';
import type { CSSProperties } from 'react';

interface Props {
  phase: Phase;
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

export function TrackSidebar({ phase, track }: Props) {
  const titleColor = trackTitleColor[track.id] ?? '#FFFFFF';

  const h2Style: CSSProperties = phase === 'enter'
    ? { color: titleColor, opacity: 0, animation: 'cascade-in 500ms ease forwards' }
    : phase === 'exit'
      ? { color: titleColor, animation: 'cascade-out 333ms ease forwards' }
      : { color: titleColor };

  return (
    <div className="relative h-full w-full overflow-hidden">
      <h2 className="w-full text-left text-2xl font-bold uppercase" style={h2Style}>
        {track.name}
      </h2>
    </div>
  );
}
