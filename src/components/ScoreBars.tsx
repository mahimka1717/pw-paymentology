import { scoreIcons } from '../assets/scoreIcons';
import { Score } from '../data/tracks';

interface Props {
  totalScore: Score;
  lastDelta?: Score | null;
}

const pillars: { key: keyof Score; label: string }[] = [
  { key: 'growth', label: 'Growth' },
  { key: 'trust', label: 'Trust' },
  { key: 'control', label: 'Control' },
  { key: 'momentum', label: 'Momentum' },
];

const MAX_ABS = 12; // max possible absolute value across all tracks

export function ScoreBars({ totalScore, lastDelta }: Props) {
  return (
    <div className="flex items-center justify-between w-full" style={{ gap: '12px' }}>
      {pillars.map(({ key, label }) => {
        const Icon = scoreIcons[key];
        const rawValue = Number(totalScore[key]);
        const value = Number.isFinite(rawValue)
          ? Math.max(-MAX_ABS, Math.min(MAX_ABS, rawValue))
          : 0;
        const delta = lastDelta?.[key] ?? null;
        const positionPct = ((value + MAX_ABS) / (MAX_ABS * 2)) * 100;
        const deltaColor = delta !== null && delta > 0 ? '#AAFF6E' : '#FFA0E6';

        return (
          <div key={key} className="flex flex-col items-center flex-1 gap-1.5 min-w-0">
            <div
              className="relative w-full"
              style={{
                height: '40px',
                borderRadius: '20px',
                background: 'linear-gradient(to right, #FFA0E6, #A586FF, #AAFF6E)',
              }}
            >
              <div
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 transition-all duration-700 ease-out"
                style={{ left: `${positionPct}%` }}
              >
                {delta !== null && delta !== 0 && (
                  <span
                    key={`${key}-${value}`}
                    className="score-delta-pop absolute left-1/2 -translate-x-1/2 text-[11px] font-bold leading-none pointer-events-none"
                    style={{
                      bottom: '100%',
                      marginBottom: '2px',
                      color: deltaColor,
                      textShadow: '0 1px 3px rgba(0,0,0,0.4)',
                    }}
                  >
                    {delta > 0 ? `+${delta}` : delta}
                  </span>
                )}
                <div className="relative w-[34px] h-[34px]">
                  {delta !== null && delta !== 0 &&
                    Array.from({ length: Math.abs(delta) }).map((_, i) => (
                      <div
                        key={`ripple-${key}-${value}-${i}`}
                        className="score-ripple absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 rounded-full pointer-events-none"
                        style={{
                          backgroundColor: delta > 0 ? '#AAFF6E' : '#FFA0E6',
                          animationDelay: `${i * 0.42}s`,
                        }}
                      />
                    ))
                  }
                  <div className="relative z-10 w-[34px] h-[34px] rounded-full bg-white/95 grid place-items-center overflow-hidden shadow-[5px_5px_10px_0_rgba(0,0,0,0.20)]">
                    <span
                      className="grid place-items-center leading-none"
                      style={key === 'trust' ? { transform: 'translate(1px, 1px)' } : undefined}
                    >
                      <Icon className="block" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <span
              className="tracking-[0.04em]"
              style={{
                fontFamily: "'PP Monument Normal', sans-serif",
                fontWeight: 400,
                fontSize: '10px',
                lineHeight: '12px',
                color: '#FFFFFF',
              }}
            >
              {label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
