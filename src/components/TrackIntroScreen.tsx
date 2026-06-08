import { Track } from '../data/tracks';
import { trackTheme } from '../data/theme';

interface Props {
  track: Track;
  onStart: () => void;
}

export function TrackIntroScreen({ track, onStart }: Props) {
  const theme = trackTheme[track.id] ?? { accent: '#FFFFFF', accentText: '#000000' };

  return (
    <div className="min-h-[calc(100vh-var(--topbar-h))] flex items-center justify-center px-6 pt-0 pb-10">
      <div className="w-full max-w-[83.33vw]">
        <div className="min-h-[750px] w-[40%]">
          <h1 className="text-[30px] leading-[36px] font-bold mb-[50px] text-left uppercase" style={{ color: theme.accent }}>
            {track.name}
          </h1>
          <div className="text-[20px] leading-[28px] text-left mb-[120px] text-white flex flex-col gap-4">
            {track.intro.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
          <div className="flex justify-center">
            <button
              onClick={onStart}
              className="h-[92px] w-[235px] rounded-[46px] transition-opacity hover:opacity-90"
              style={{ backgroundColor: theme.accent, color: theme.accentText, fontFamily: "'PP Monument Wide'", fontSize: '30px', lineHeight: 1, fontWeight: 900 }}
            >
              Let's go
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
