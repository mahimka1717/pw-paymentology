import type { CSSProperties } from 'react';
import { Track } from '../data/tracks';
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
        <div className="min-h-[750px] w-[40%]">
          <h1 className="text-[30px] leading-[36px] font-bold mb-[50px] text-left uppercase" style={{ color: theme.accent, ...cascade(phase, 0) }}>
            {track.name}
          </h1>
          <div className="text-[20px] leading-[28px] text-left mb-[120px] text-white flex flex-col gap-4" style={cascade(phase, 1)}>
            {track.intro.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
          <div className="flex justify-center" style={cascade(phase, 2)}>
            <button
              onClick={onStart}
              className="h-[92px] w-[235px] rounded-[46px] transition-all hover:!bg-white active:!bg-[var(--btn-bg)] active:scale-[1.2]"
              style={{ '--btn-bg': theme.accent, backgroundColor: theme.accent, color: theme.accentText, fontFamily: "'PP Monument Wide'", fontSize: '30px', lineHeight: 1, fontWeight: 900 } as React.CSSProperties}
            >
              Let's go!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
