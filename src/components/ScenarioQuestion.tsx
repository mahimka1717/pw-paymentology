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
  exiting: boolean;
  showFeedback: boolean;
  onCloseFeedback: () => void;
  onToggleFeedback: () => void;
  onChoose: (index: number, delta: Score, aggressive: boolean) => void;
  onResetOption: () => void;
  onNext: () => void;
}

export function ScenarioQuestion({ scenario, scenarioIndex, totalScenarios, selectedOption, accentColor, accentTextColor, exiting, showFeedback, onCloseFeedback, onToggleFeedback, onChoose, onResetOption }: Props) {
  const questionParagraphs = scenario.description.split(/\n\s*\n/);

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
    <div className="game-question-panel relative h-full flex flex-col rounded-[20px] lg:rounded-[32px] p-[20px] md:pt-[40px] md:pr-[52px] md:pb-[40px] md:pl-[48px] lg:pt-[46px] lg:pb-[20px] shadow-[5px_5px_10px_0_rgba(0,0,0,0.20)]" style={{ background: '#703ff6' }}>
      <button
        type="button"
        className="absolute right-[18px] top-[18px] z-30 grid h-10 w-10 place-items-center rounded-full border-2 border-current bg-transparent text-white transition-colors enabled:hover:text-[#D2AFFE] enabled:active:text-[#A586FF] md:right-[24px] md:top-[24px]"
        aria-label="Reset answer"
        disabled={selectedOption === null}
        style={{ opacity: selectedOption === null ? 0.35 : 1, cursor: selectedOption === null ? 'default' : 'pointer' }}
        onClick={onResetOption}
      >
        <svg className="h-5 w-5" viewBox="0 0 49 49" fill="none" aria-hidden="true">
          <path d="M39.5 17.5A17 17 0 1 0 40.8 29" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
          <path d="M39.5 8.5V17.5H30.5" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Scenario header — single line */}
      <div
        className="mb-[12px] flex flex-col gap-[12px] pr-12 transition-opacity duration-200 md:pl-[20px] md:pr-14"
        style={exiting
          ? { animation: `question-content-out ${animationMs(300)} cubic-bezier(0.55,0,0.78,0) forwards` }
          : { opacity: showFeedback ? 0.5 : 1 }
        }
      >
        <h2 className="game-question-title uppercase text-[14px] leading-[20px] md:text-[19px] md:leading-[23px] lg:text-[20px] lg:leading-[24px]" style={{ color: '#FFFFFF', fontFamily: "'PP Monument Extended'", fontWeight: 900, opacity: 0, animation: `text-slide-in ${animationMs(400)} ease forwards` }}>
          {scenario.title}
        </h2>
        <div className="game-question-copy-wrap flex max-w-[85%] flex-col gap-[19px] lg:max-w-[75%]" style={{ color: '#FFFFFF', fontFamily: "'Inter', sans-serif", fontWeight: 400, opacity: 0, animation: `text-slide-in ${animationMs(400)} ease ${animationMs(100)} forwards` }}>
          {questionParagraphs.map((paragraph, index) => {
            const isEmphasizedLastParagraph = questionParagraphs.length > 1 && index === questionParagraphs.length - 1;

            return (
              <p
                key={index}
                className={isEmphasizedLastParagraph ? 'game-question-emphasis pt-[clamp(0px,calc(10.7143vh_-_85.714px),30px)] text-[16px] leading-[20px] md:text-[20px] md:leading-[24px] lg:pt-[30px]' : 'game-question-copy text-[14px] leading-[16px] md:text-[16px] md:leading-[19px]'}
                style={{ fontWeight: isEmphasizedLastParagraph ? 500 : 400 }}
              >
                {paragraph}
              </p>
            );
          })}
        </div>
      </div>

      {/* Option cards */}
      <div
        className="relative flex-[3] min-h-0"
        style={exiting
          ? { animation: `question-content-out ${animationMs(350)} cubic-bezier(0.55,0,0.78,0) ${animationMs(50)} forwards` }
          : undefined
        }
      >
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
                  } else if (selectedOption === index) {
                    onToggleFeedback();
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
