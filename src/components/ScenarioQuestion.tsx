import type { CSSProperties } from 'react';
import { Scenario, Score } from '../data/tracks';
import { OptionCard } from './OptionCard';
import { FeedbackPopup } from './FeedbackPopup';

interface Props {
  scenario: Scenario;
  scenarioIndex: number;
  totalScenarios: number;
  selectedOption: number | null;
  accentColor: string;
  accentTextColor: string;
  showFeedback: boolean;
  onCloseFeedback: () => void;
  onChoose: (index: number, delta: Score, aggressive: boolean) => void;
  onNext: () => void;
}

export function ScenarioQuestion({ scenario, scenarioIndex, totalScenarios, selectedOption, accentColor, accentTextColor, showFeedback, onCloseFeedback, onChoose }: Props) {
  const getPopupX = (idx: number): CSSProperties => {
    if (idx === 0) return { left: 'calc((100% - 40px) / 3 - 15px)' };
    if (idx === 1) return { right: '50%' };
    return { right: 'calc((100% - 40px) / 3 - 15px)' };
  };
  return (
    <div className="h-full flex flex-col rounded-[20px] md:rounded-[32px] pt-[20px] pr-[16px] pb-[20px] pl-[16px] md:pt-[46px] md:pr-[60px] md:pb-[20px] md:pl-[36px] shadow-[5px_5px_10px_0_rgba(0,0,0,0.20)]" style={{ background: 'linear-gradient(to bottom, #FFFFFF, #A3A3EC, #E4C3FF)' }}>
      {/* Scenario header — single line */}
      <div className="mb-[24px] md:mb-[50px] flex items-baseline flex-wrap gap-[16px] md:gap-[50px]">
        <h2 className="whitespace-nowrap uppercase text-[16px] leading-[20px] md:text-[20px] md:leading-[24px]" style={{ color: '#15154A', fontFamily: "'PP Monument Extended'", fontWeight: 900, opacity: 0, animation: 'text-slide-in 400ms ease forwards' }}>
          {scenario.title}
        </h2>
        <p className="mb-[0] text-[12px] leading-[15px] md:text-[15px] md:leading-[18px]" style={{ color: '#15154A', fontFamily: "'PP Monument Wide'", fontWeight: 400, opacity: 0, animation: 'text-slide-in 400ms ease 100ms forwards' }}>
          {scenario.description}
        </p>
      </div>

      {/* Option cards */}
      <div className="relative flex-[3] min-h-0">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-5 h-full">
          {scenario.options.map((option, index) => (
            <div key={option.id} className="relative">
              {/* Mobile feedback — above selected card */}
              {showFeedback && selectedOption === index && (
                <div
                  className="absolute z-40 pointer-events-none md:hidden left-1/2 -translate-x-1/2"
                  style={{ bottom: 'calc(100% + 4px)' }}
                >
                  <div className="pointer-events-auto">
                    <FeedbackPopup
                      feedback={scenario.options[selectedOption].feedback}
                      onClose={onCloseFeedback}
                    />
                  </div>
                </div>
              )}
              <OptionCard
                optionId={option.id}
                title={option.title}
                description={option.description}
                selected={selectedOption === index}
                disabled={selectedOption !== null && selectedOption !== index}
                accentColor={accentColor}
                accentTextColor={accentTextColor}
                animDelay={200 + index * 100}
                onSelect={() => {
                  if (selectedOption === null) {
                    onChoose(index, option.score, option.aggressive ?? false);
                  }
                }}
              />
            </div>
          ))}
        </div>
        {/* Desktop feedback — positioned by option column */}
        {showFeedback && selectedOption !== null && (
          <div
            className="absolute z-40 pointer-events-none hidden md:block"
            style={{ bottom: 'calc(100% - 15px)', ...getPopupX(selectedOption) }}
          >
            <div className="pointer-events-auto">
              <FeedbackPopup
                feedback={scenario.options[selectedOption].feedback}
                onClose={onCloseFeedback}
              />
            </div>
          </div>
        )}
      </div>

      <div className="mt-[24px] md:mt-[20px] flex justify-center flex-shrink-0">
        <div className="flex gap-1.5">
          {Array.from({ length: totalScenarios }).map((_, i) => (
            <div
              key={i}
              className={`h-2 w-2 rounded-full transition-colors ${
                i <= scenarioIndex
                  ? 'bg-[#3E4D9C]'
                  : 'bg-white'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
