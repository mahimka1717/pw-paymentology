import type { CSSProperties } from 'react';
import { Track, tracks } from '../data/tracks';
import { trackTheme } from '../data/theme';
import type { Phase } from './App';

interface Props {
  phase: Phase;
  track: Track;
  onStart: () => void;
}

function cascade(phase: Phase, index: number, total = 3): CSSProperties {
  if (phase === 'idle') return {};
  if (phase === 'enter') return { opacity: 0, animation: `cascade-in 500ms ease ${index * 150}ms forwards` };
  return { animation: `cascade-out 333ms ease ${(total - 1 - index) * 100}ms forwards` };
}

export function TrackIntroScreen({ phase, track, onStart }: Props) {
  const theme = trackTheme[track.id] ?? { accent: '#FFFFFF', accentText: '#000000' };

  return (
    <div className="min-h-[calc(100vh-var(--topbar-h))] flex items-center justify-center px-6 pt-0 pb-10">
      <div className="w-full max-w-[83.33vw]">
        <div className="w-full md:w-[40%] min-h-[calc(100vh-var(--topbar-h)-40px)] md:min-h-[750px] flex flex-col">
          <h1 className="text-[22px] leading-[28px] md:text-[30px] md:leading-[36px] font-bold mb-[30px] md:mb-[50px] text-left uppercase" style={{ color: theme.accent, ...cascade(phase, 0, 4) }}>
            {track.name}
          </h1>
          <div className="text-[16px] leading-[22px] md:text-[20px] md:leading-[28px] text-left mb-0 md:mb-[120px] text-white flex flex-col gap-4" style={cascade(phase, 1, 4)}>
            {track.intro.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
          <div className="flex-1 md:hidden" />
          <div className="md:hidden my-0 overflow-hidden" style={phase === 'idle' ? {} : phase === 'enter' ? { opacity: 0, animation: 'city-in 500ms ease 300ms forwards' } : { animation: 'city-out 333ms ease 100ms forwards' }}>
            <img
              src={`/img/building${tracks.findIndex(t => t.id === track.id)}.png`}
              alt=""
              className="w-full h-auto object-contain scale-[1.4] -translate-x-[10%] -translate-y-[10%]"
              draggable={false}
            />
          </div>
          <div className="flex justify-center" style={cascade(phase, 3, 4)}>
            <button
              onClick={onStart}
              className="h-[72px] w-[180px] md:h-[92px] md:w-[235px] rounded-[46px] text-[22px] md:text-[30px] transition-all hover:!bg-white active:!bg-[var(--btn-bg)] active:scale-[1.2]"
              style={{ '--btn-bg': theme.accent, backgroundColor: theme.accent, color: theme.accentText, fontFamily: "'PP Monument Wide'", lineHeight: 1, fontWeight: 900 } as React.CSSProperties}
            >
              Let's go!
            </button>
          </div>
          <div className="flex-1 md:hidden" />
        </div>
      </div>
    </div>
  );
}
