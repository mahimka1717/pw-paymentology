import { scoreIcons } from '../assets/scoreIcons';
import { Score } from '../data/tracks';

interface Props {
  totalScore: Score;
  lastDelta: Score | null;
}

const pillars: { key: keyof Score; label: string }[] = [
  { key: 'growth', label: 'Growth' },
  { key: 'trust', label: 'Trust' },
  { key: 'control', label: 'Control' },
  { key: 'momentum', label: 'Momentum' },
];

const MAX_ABS = 12; // max possible absolute value across all tracks
const CIRCLE_PCT = 50 / MAX_ABS; // percentage of half-bar that the circle occupies (treat circle as ~1 unit)

export function ScoreBars({ totalScore, lastDelta }: Props) {
  return (
    <div className="flex gap-[2%] items-center justify-between py-4 w-full backdrop-blur">
      {pillars.map(({ key, label }) => {
        const Icon = scoreIcons[key];
        const value = totalScore[key];
        const delta = lastDelta?.[key] ?? null;
        // Fill percentage of the half-bar with minimum so small values are visible
        const rawPct = Math.abs(value) / MAX_ABS * 50;
        const fillPct = value !== 0 ? Math.max(rawPct, 10) : 0;

        return (
          <div key={key} className="flex flex-col items-center flex-1 gap-1">
            {/* Bar with centered circle */}
            <div className="relative w-full flex items-center">
              {/* Bar track — gray background, px-4 reserves space for numbers */}
              <div className="relative flex-1 h-6 rounded-full bg-gray-200 px-4">
                {/* Colored fill bar */}
                {value !== 0 && (
                  <div
                    className="absolute top-0 h-full transition-all duration-700 ease-out"
                    style={value > 0
                      ? {
                          left: '50%',
                          width: `${fillPct}%`,
                          borderRadius: '0 9999px 9999px 0',
                          background: 'linear-gradient(to right, #fed7aa, #f97316)',
                        }
                      : {
                          right: '50%',
                          width: `${fillPct}%`,
                          borderRadius: '9999px 0 0 9999px',
                          background: 'linear-gradient(to left, #e9d5ff, #8b5cf6)',
                        }
                    }
                  />
                )}

                {/* Value label at the edge of the fill bar */}
                {value !== 0 && (
                  <span
                    className="absolute top-1/2 -translate-y-1/2 text-[10px] font-bold font-mono text-black leading-none z-20"
                    style={value > 0
                      ? { left: `calc(50% + ${fillPct}% + 5px)` }
                      : { right: `calc(50% + ${fillPct}% + 5px)` }
                    }
                  >
                    {value}
                  </span>
                )}

                {/* Center circle with icon */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-white border-2 border-indigo-950 flex items-center justify-center z-10">
                  <Icon className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Delta animation — centered above the circle */}
              {delta !== null && delta !== 0 && (
                <span
                  key={`${key}-${Date.now()}`}
                  className="absolute left-1/2 -translate-x-1/2 -top-4 text-[11px] font-bold animate-score-pop z-30"
                  style={{ color: delta > 0 ? '#f97316' : '#8b5cf6' }}
                >
                  {delta > 0 ? `+${delta}` : delta}
                </span>
              )}
            </div>

            {/* Label centered */}
            <span className="text-[9px] font-medium text-indigo-950 uppercase tracking-wider">{label}</span>
          </div>
        );
      })}
    </div>
  );
}
