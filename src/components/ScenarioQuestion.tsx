import { useEffect, useState } from 'react';
import type { CSSProperties } from 'react';
import { Scenario, Score } from '../data/tracks';
import { OptionCard } from './OptionCard';
import { FeedbackPopup } from './FeedbackPopup';
import { animationMs } from '../utils/animationTiming';

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

function getQuestionMaxWidth() {
  if (window.innerWidth < 1024) return '85%';

  const percentage = 100 - (window.innerHeight - 800) * 25 / 280;
  return `${Math.min(100, Math.max(75, percentage))}%`;
}

export function ScenarioQuestion({ scenario, scenarioIndex, totalScenarios, selectedOption, accentColor, accentTextColor, showFeedback, onCloseFeedback, onChoose }: Props) {
  const [questionMaxWidth, setQuestionMaxWidth] = useState(getQuestionMaxWidth);
  const questionParagraphs = scenario.description.split(/\n\s*\n/);

  useEffect(() => {
    const updateQuestionMaxWidth = () => setQuestionMaxWidth(getQuestionMaxWidth());

    window.addEventListener('resize', updateQuestionMaxWidth);
    return () => window.removeEventListener('resize', updateQuestionMaxWidth);
  }, []);

  const handleOptionKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) return;

    const options = Array.from(event.currentTarget.querySelectorAll<HTMLButtonElement>('[data-option-card]:not(:disabled)'));
    const currentIndex = options.indexOf(document.activeElement as HTMLButtonElement);
    if (currentIndex === -1 || options.length === 0) return;

    event.preventDefault();
    const direction = event.key === 'ArrowLeft' || event.key === 'ArrowUp' ? -1 : 1;
    options[(currentIndex + direction + options.length) % options.length].focus();
  };

  const getPopupX = (idx: number): CSSProperties => {
    if (idx === 0) return { left: 0 };
    if (idx === 1) return { left: '50%', transform: 'translateX(-50%)' };
    return { right: 0 };
  };
  return (
    <div className="h-full flex flex-col rounded-[20px] lg:rounded-[32px] p-[20px] md:pt-[40px] md:pr-[52px] md:pb-[40px] md:pl-[48px] lg:pt-[46px] lg:pb-[20px] shadow-[5px_5px_10px_0_rgba(0,0,0,0.20)]" style={{ background: '#703ff6' }}>
      {/* Scenario header — single line */}
      <div className="mb-[12px] flex flex-col gap-[12px] md:pl-[20px]">
        <h2 className="uppercase text-[14px] leading-[20px] md:text-[19px] md:leading-[23px] lg:text-[20px] lg:leading-[24px] min-[1024px]:max-[1260px]:text-[19px] min-[1024px]:max-[1260px]:leading-[23px]" style={{ color: '#FFFFFF', fontFamily: "'PP Monument Extended'", fontWeight: 900, opacity: 0, animation: `text-slide-in ${animationMs(400)} ease forwards` }}>
          {scenario.title}
        </h2>
        <div className="flex flex-col gap-[19px]" style={{ maxWidth: questionMaxWidth, color: '#FFFFFF', fontFamily: "'Inter', sans-serif", fontWeight: 400, opacity: 0, animation: `text-slide-in ${animationMs(400)} ease ${animationMs(100)} forwards` }}>
          {questionParagraphs.map((paragraph, index) => {
            const isEmphasizedLastParagraph = questionParagraphs.length > 1 && index === questionParagraphs.length - 1;

            return (
              <p
                key={index}
                className={isEmphasizedLastParagraph ? 'pt-[clamp(0px,calc(10.7143vh_-_85.714px),30px)] text-[16px] leading-[20px] md:text-[20px] md:leading-[24px]' : 'text-[14px] leading-[16px] md:text-[16px] md:leading-[19px]'}
                style={{ fontWeight: isEmphasizedLastParagraph ? 500 : 400 }}
              >
                {paragraph}
              </p>
            );
          })}
        </div>
      </div>

      {/* Option cards */}
      <div className="relative flex-[3] min-h-0">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 md:gap-5 lg:gap-5 h-full lg:auto-rows-[1fr]" onKeyDown={handleOptionKeyDown}>
          {scenario.options.map((option, index) => (
            <div key={option.id} className="relative h-full">
              {/* Mobile/tablet feedback — above selected card */}
              {showFeedback && selectedOption === index && (
                <div
                  className="absolute z-40 pointer-events-none lg:hidden left-0 w-full"
                  style={{ bottom: 'calc(100% + 15px)' }}
                >
                  <div className="pointer-events-auto">
                    <FeedbackPopup
                      feedback={scenario.options[selectedOption].feedback}
                      optionIndex={selectedOption}
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
            style={{ bottom: 'calc(100% + 15px)', ...getPopupX(selectedOption) }}
          >
            <div className="pointer-events-auto">
              <FeedbackPopup
                feedback={scenario.options[selectedOption].feedback}
                optionIndex={selectedOption}
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
                  ? 'bg-[#CCB0F9]'
                  : 'bg-white'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
