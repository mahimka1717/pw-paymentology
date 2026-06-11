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
    <div className="h-full flex flex-col rounded-[20px] lg:rounded-[32px] pt-[20px] pr-[16px] pb-[20px] pl-[16px] md:pt-[40px] md:pr-[32px] md:pb-[40px] md:pl-[32px] lg:pt-[46px] lg:pr-[60px] lg:pb-[20px] lg:pl-[36px] min-[1024px]:max-[1260px]:pr-[36px] min-[1024px]:max-[1260px]:pl-[36px] shadow-[5px_5px_10px_0_rgba(0,0,0,0.20)]" style={{ background: 'linear-gradient(to bottom, #FFFFFF, #A3A3EC, #E4C3FF)' }}>
      {/* Scenario header — single line */}
      <div className="mb-[24px] lg:mb-[50px] min-[1024px]:max-[1260px]:mb-[40px] flex items-baseline flex-wrap gap-[16px] md:gap-[24px] lg:gap-[50px] min-[1024px]:max-[1260px]:gap-[24px]">
        <h2 className="uppercase text-[16px] leading-[20px] md:text-[19px] md:leading-[23px] lg:text-[20px] lg:leading-[24px] min-[1024px]:max-[1260px]:text-[19px] min-[1024px]:max-[1260px]:leading-[23px]" style={{ color: '#15154A', fontFamily: "'PP Monument Extended'", fontWeight: 900, opacity: 0, animation: 'text-slide-in 400ms ease forwards' }}>
          {scenario.title}
        </h2>
        <p className="mb-[0] text-[12px] leading-[15px] md:text-[15px] md:leading-[19px] lg:text-[15px] lg:leading-[18px] min-[1024px]:max-[1260px]:text-[14px] min-[1024px]:max-[1260px]:leading-[17px]" style={{ color: '#15154A', fontFamily: "'PP Monument Wide'", fontWeight: 400, opacity: 0, animation: 'text-slide-in 400ms ease 100ms forwards' }}>
          {scenario.description}
        </p>
      </div>

      {/* Option cards */}
      <div className="relative flex-[3] min-h-0">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 md:gap-5 lg:gap-5 h-full lg:auto-rows-[1fr]">
          {scenario.options.map((option, index) => (
            <div key={option.id} className="relative h-full">
              {/* Mobile/tablet feedback — above selected card */}
              {showFeedback && selectedOption === index && (
                <div
                  className="absolute z-40 pointer-events-none lg:hidden left-0 w-full"
                  style={{ bottom: 'calc(100% + 8px)' }}
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
            className="absolute z-40 pointer-events-none hidden lg:block"
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

      <div className="mt-[24px] md:mt-[40px] lg:mt-[20px] flex justify-center flex-shrink-0">
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
