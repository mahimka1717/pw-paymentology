import { Score } from '../data/tracks';
import { outcomeDescriptions, Outcome, Style } from '../data/scoring';
import { scoreIcons } from '../assets/scoreIcons';

interface Props {
  outcome: Outcome;
  style: Style;
  normalized: Score;
  totalScore: Score;
  trackName: string;
  onRestart: () => void;
}

const outcomeEmoji: Record<Outcome, string> = {
  'Built to Scale': '🏗️',
  'Fast but Fragile': '⚡',
  'Trusted Operator': '🛡️',
  'Stuck in Neutral': '⚖️',
};

const styleDescriptions: Record<Style, string> = {
  'Consistent Aggressive': 'You consistently chose the boldest options, pushing for speed and growth at every turn.',
  'Consistent Cautious': 'You took a measured, careful approach — preferring control and trust over rapid moves.',
  'Situational': 'You adapted your strategy to each scenario, balancing aggression with caution.',
};

const pillars: { key: keyof Score; label: string }[] = [
  { key: 'growth', label: 'Growth' },
  { key: 'trust', label: 'Trust' },
  { key: 'control', label: 'Control' },
  { key: 'momentum', label: 'Momentum' },
];

export function ResultScreen({ outcome, style, totalScore, trackName, onRestart }: Props) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full space-y-8">
        {/* Outcome */}
        <div className="text-center">
          <span className="text-5xl mb-4 block">{outcomeEmoji[outcome]}</span>
          <p className="text-sm text-indigo-400 uppercase tracking-wider mb-2">{trackName} — Result</p>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{outcome}</h1>
          <p className="text-gray-400 leading-relaxed text-lg">{outcomeDescriptions[outcome]}</p>
        </div>

        {/* Style */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 text-center">
          <p className="text-sm text-gray-500 uppercase tracking-wider mb-1">Your Decision Style</p>
          <p className="text-lg font-semibold text-white mb-2">{style}</p>
          <p className="text-sm text-gray-400">{styleDescriptions[style]}</p>
        </div>

        {/* Score breakdown */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <p className="text-sm text-gray-500 uppercase tracking-wider mb-6 text-center">Final Scores</p>
          <div className="flex gap-[2%] items-center justify-between w-full">
            {pillars.map(({ key, label }) => {
              const Icon = scoreIcons[key];
              const value = totalScore[key];
              const rawPct = Math.abs(value) / 12 * 50;
              const fillPct = value !== 0 ? Math.max(rawPct, 10) : 0;

              return (
                <div key={key} className="flex flex-col items-center flex-1 gap-1">
                  <div className="relative w-full flex items-center">
                    <div className="relative flex-1 h-6 rounded-full bg-gray-700 px-4">
                      {/* Colored fill bar */}
                      {value !== 0 && (
                        <div
                          className="absolute top-0 h-full"
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

                      {/* Value label */}
                      {value !== 0 && (
                        <span
                          className="absolute top-1/2 -translate-y-1/2 text-[10px] font-bold font-mono text-white leading-none z-20"
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
                  </div>
                  <span className="text-[9px] font-medium text-gray-400 uppercase tracking-wider">{label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Restart */}
        <div className="text-center">
          <button
            onClick={onRestart}
            className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg transition-colors"
          >
            Play Again
          </button>
        </div>
      </div>
    </div>
  );
}
