import { Track } from '../data/tracks';
import type { Phase } from './App';
import type { CSSProperties } from 'react';
import { animationMs } from '../utils/animationTiming';

interface Props {
  phase: Phase;
  track: Track;
}

export function TrackSidebar({ phase, track }: Props) {
  const h2Style: CSSProperties = phase === 'exit'
      ? { color: '#FFFFFF', animation: `cascade-out ${animationMs(333)} ease forwards` }
      : { color: '#FFFFFF' };

  return (
    <div className="relative h-full w-full overflow-hidden">
      <h2 className="w-full text-left text-xl font-bold uppercase md:text-2xl lg:text-[30px] lg:leading-[36px]" style={h2Style}>
        {track.name}
      </h2>
    </div>
  );
}
