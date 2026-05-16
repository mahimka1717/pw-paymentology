import { Scenario, Score } from '../data/tracks';
import { OptionCard } from './OptionCard';

interface Props {
  scenario: Scenario;
  selectedOption: number | null;
  showFeedback: boolean;
  onChoose: (index: number, delta: Score, aggressive: boolean) => void;
  onNext: () => void;
}

export function ScenarioQuestion({ scenario, selectedOption, onChoose }: Props) {
  return (
    <div className="flex flex-col h-full rounded-2xl p-6" style={{ background: 'linear-gradient(to right, #1e3a8a, #0a0a0a)' }}>
      {/* Decorative image */}
      <div className="w-full rounded-xl overflow-hidden mb-10 flex-[5]">
        <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 400 160" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="sceneBg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="1" />
              <stop offset="50%" stopColor="#a78bfa" stopOpacity="1" />
              <stop offset="100%" stopColor="#f9a8d4" stopOpacity="1" />
            </linearGradient>
            <radialGradient id="glow1" cx="25%" cy="40%">
              <stop offset="0%" stopColor="#818cf8" stopOpacity="1" />
              <stop offset="100%" stopColor="#818cf8" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="glow2" cx="75%" cy="60%">
              <stop offset="0%" stopColor="#f472b6" stopOpacity="1" />
              <stop offset="100%" stopColor="#f472b6" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="400" height="160" fill="url(#sceneBg)" />
          <circle cx="100" cy="60" r="80" fill="url(#glow1)" />
          <circle cx="300" cy="100" r="70" fill="url(#glow2)" />
          <circle cx="200" cy="40" r="3" fill="#a78bfa" opacity="1" />
          <circle cx="150" cy="100" r="2" fill="#6366f1" opacity="1" />
          <circle cx="320" cy="50" r="2.5" fill="#f472b6" opacity="1" />
          <circle cx="80" cy="130" r="2" fill="#818cf8" opacity="1" />
          <circle cx="350" cy="130" r="1.5" fill="#a78bfa" opacity="1" />
          <path d="M0 140 Q100 120 200 135 T400 125 V160 H0Z" fill="white" opacity="0.3" />
        </svg>
      </div>

      {/* Scenario header — single line */}
      <div className="mb-10 flex items-baseline gap-3 flex-wrap">
        <span className="text-xs font-semibold text-indigo-300 uppercase tracking-wider whitespace-nowrap">
          Scenario {scenario.id}
        </span>
        <h2 className="text-xl font-bold text-white whitespace-nowrap">
          {scenario.title}
        </h2>
        <p className="text-sm text-gray-300 leading-relaxed">
          {scenario.description}
        </p>
      </div>

      {/* Option cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-[3]">
        {scenario.options.map((option, index) => (
          <OptionCard
            key={option.id}
            optionId={option.id}
            title={option.title}
            description={option.description}
            selected={selectedOption === index}
            disabled={selectedOption !== null && selectedOption !== index}
            onSelect={() => {
              if (selectedOption === null) {
                onChoose(index, option.score, option.aggressive ?? false);
              }
            }}
          />
        ))}
      </div>

      {/* Next button */}
    </div>
  );
}
