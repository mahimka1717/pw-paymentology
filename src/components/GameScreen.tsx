import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { Track, Scenario, Score } from '../data/tracks';
import { ScoreBars } from './ScoreBars';
import { TrackSidebar } from './TrackSidebar';
import { ScenarioQuestion } from './ScenarioQuestion';
import { DidYouKnowMascot } from './DidYouKnowMascot';
import { trackTheme } from '../data/theme';
import { smoothScrollTo } from '../utils/smoothScroll';
import type { Phase } from './App';
import { animationMs, scaledMs } from '../utils/animationTiming';
import { trackEvent } from '../utils/analytics';

interface Props {
  phase: Phase;
  track: Track;
  scenario: Scenario;
  scenarioIndex: number;
  totalScenarios: number;
  totalScore: Score;
  lastDelta: Score | null;
  selectedOption: number | null;
  onChoose: (index: number, delta: Score, aggressive: boolean) => void;
  onNext: () => void;
}

function cascade(phase: Phase, index: number, total = 3): CSSProperties {
  if (phase === 'idle') return {};
  if (phase === 'enter') return { opacity: 0, animation: `cascade-in ${animationMs(500)} ease ${animationMs(index * 150)} forwards` };
  return { animation: `cascade-out ${animationMs(333)} ease ${animationMs((total - 1 - index) * 100)} forwards` };
}

export function GameScreen({
  phase,
  track,
  scenario,
  scenarioIndex,
  totalScenarios,
  totalScore,
  lastDelta,
  selectedOption,
  onChoose,
  onNext,
}: Props) {
  const [showFeedback, setShowFeedback] = useState(false);
  const [showInsight, setShowInsight] = useState(false);
  const [isClosingInsight, setIsClosingInsight] = useState(false);
  const [buttonsExiting, setButtonsExiting] = useState(false);
  const insightPopupRef = useRef<HTMLDivElement>(null);
  const insightToggleRef = useRef<HTMLButtonElement>(null);
  const mascotRef = useRef<HTMLDivElement>(null);
  const buttonsAreaRef = useRef<HTMLDivElement>(null);

  const handleCloseInsight = () => {
    trackEvent('insight_closed', {
      track_id: track.id,
      scenario_id: scenario.id,
      scenario_number: scenarioIndex + 1,
    });
    setIsClosingInsight(true);
    setTimeout(() => {
      setShowInsight(false);
      setIsClosingInsight(false);
    }, scaledMs(350));
  };

  useEffect(() => {
    if (!showInsight || isClosingInsight) return;
    const handler = (e: MouseEvent) => {
      const target = e.target as Node;
      if (insightPopupRef.current?.contains(target)) return;
      if (insightToggleRef.current?.contains(target)) return;
      handleCloseInsight();
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [showInsight, isClosingInsight]);

  const handleChoose = (index: number, delta: Score, aggressive: boolean) => {
    trackEvent('scenario_option_selected', {
      track_id: track.id,
      scenario_id: scenario.id,
      scenario_number: scenarioIndex + 1,
      option_id: scenario.options[index].id,
      aggressive,
      growth_delta: delta.growth,
      trust_delta: delta.trust,
      control_delta: delta.control,
      momentum_delta: delta.momentum,
    });
    trackEvent('feedback_opened', {
      track_id: track.id,
      scenario_id: scenario.id,
      scenario_number: scenarioIndex + 1,
      method: 'automatic',
    });
    onChoose(index, delta, aggressive);
    setShowFeedback(true);
    setShowInsight(false);
    setTimeout(() => {
      if (window.innerWidth < 768) {
        smoothScrollTo(document.documentElement.scrollHeight, scaledMs(1200));
      }
    }, scaledMs(100));
  };

  const handleNext = () => {
    trackEvent('scenario_advanced', {
      track_id: track.id,
      scenario_id: scenario.id,
      scenario_number: scenarioIndex + 1,
      completes_game: scenarioIndex === totalScenarios - 1,
    });
    setButtonsExiting(true);
    smoothScrollTo(0, scaledMs(1200));
    setTimeout(() => {
      setButtonsExiting(false);
      setShowFeedback(false);
      setShowInsight(false);
      onNext();
    }, scaledMs(250));
  };

  const theme = trackTheme[track.id] ?? { accent: '#FFFFFF', accentText: '#000000' };

  return (
    <div className="min-h-[calc(100vh-var(--topbar-h))] flex items-center lg:items-center justify-center px-4 md:px-6 md:pb-10 lg:min-h-[920px]">
      <div className="w-full max-w-[87.5vw] lg:max-w-[1680px]">
        <div className="flex flex-col lg:h-[750px] lg:flex-row lg:items-stretch lg:gap-6">

          {/* Left col — 4/12 */}
          <aside className="game-sidebar hidden flex-shrink-0 lg:block lg:w-[41%]">
            <TrackSidebar phase={phase} track={track} />
          </aside>

          {/* Right col — 8/12 */}
          <main className="relative flex-1 flex flex-col min-h-[calc(100vh-var(--topbar-h)-32px)] lg:min-h-0 lg:[--insight-anchor-x:max(0px,calc(100%_-_1106px))]">
            {showInsight && (
              <div className="pointer-events-none absolute bottom-0 left-[calc(var(--insight-anchor-x)-30px)] z-40 hidden h-[150px] w-[108px] -translate-x-1/2 overflow-hidden lg:block">
                <div className={isClosingInsight ? 'slide-down-hide' : 'slide-up-reveal'}>
                  <DidYouKnowMascot />
                </div>
              </div>
            )}
            {showInsight && !isClosingInsight && (
              <div
                ref={insightPopupRef}
                className="absolute bottom-[20px] left-[calc(var(--insight-anchor-x)-604px)] z-40 hidden w-[500px] rounded-[16px] bg-white p-[40px] shadow-[5px_5px_10px_0_rgba(0,0,0,0.20)] lg:block"
                style={{ animation: `slide-in-from-right ${animationMs(400)} cubic-bezier(0.22,1,0.36,1) forwards` }}
              >
                <button
                  onClick={handleCloseInsight}
                  data-analytics-id="insight_close"
                  aria-label="Close insight"
                  className="close-btn-spin"
                  style={{ position: 'absolute', top: '12px', right: '12px', background: 'none', border: 'none', color: '#3E4D9C', cursor: 'pointer', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 }}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" overflow="visible" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="butt"/>
                  </svg>
                </button>
                <p className="insight-copy" style={{ fontFamily: "'PP Monument Normal', sans-serif", fontWeight: 600, fontSize: '20px', lineHeight: '26px', color: '#3E4D9C' }}>
                  {scenario.insight}
                </p>
                <div
                  className="absolute bottom-[50px] right-[-14px] h-0 w-0 border-y-[8px] border-l-[14px] border-y-transparent border-l-white"
                />
              </div>
            )}

            <div style={cascade(phase, 0)}>
              <ScoreBars totalScore={totalScore} lastDelta={showFeedback ? lastDelta : null} />
            </div>

            {/* Spacer: pushes content group to vertical center on mobile */}
            <div className="game-question-spacer flex-1 min-h-[1.5rem] lg:flex-none lg:min-h-0 lg:mt-[90px]" />

            {/* Mobile track title */}
            <div className="lg:hidden mb-[10px]" style={cascade(phase, 1)}>
              <h2
                className="text-[18px] leading-[20px] md:text-[40px] md:leading-[48px] font-bold uppercase"
                style={{ color: `#fff`, fontFamily: "'PP Monument Wide', sans-serif" }}
              >
                {track.name}
              </h2>
            </div>

            <div className="lg:flex-1 min-h-0" style={cascade(phase, 2)}>
              <ScenarioQuestion
                key={scenario.id}
                scenario={scenario}
                scenarioIndex={scenarioIndex}
                totalScenarios={totalScenarios}
                selectedOption={selectedOption}
                accentColor={theme.accent}
                accentTextColor={theme.accentText}
                showFeedback={showFeedback}
                onCloseFeedback={() => setShowFeedback(false)}
                onToggleFeedback={() => {
                  trackEvent(showFeedback ? 'feedback_closed' : 'feedback_opened', {
                    track_id: track.id,
                    scenario_id: scenario.id,
                    scenario_number: scenarioIndex + 1,
                    method: 'selected_option',
                  });
                  setShowFeedback(!showFeedback);
                }}
                onChoose={handleChoose}
                onNext={handleNext}
              />
            </div>

            {/* Buttons area — space always reserved */}
            <div ref={buttonsAreaRef} className="game-actions-area relative mt-[16px] mb-[16px] lg:mt-[28px] lg:mb-0 h-[48px] flex flex-row items-center justify-center gap-3 md:gap-4">
              {selectedOption !== null && phase !== 'exit' && (
                <>
                  {/* Mobile insight popup */}
                  {showInsight && (
                    <div
                      ref={insightPopupRef}
                      className="z-40 lg:hidden left-[16px] right-[16px] md:left-[32px] md:right-[32px] p-[16px] pr-[36px] md:p-[24px] md:pr-[48px]"
                      style={{
                        position: 'absolute',
                        bottom: 'calc(100% + 99px)',
                        overflow: 'visible',
                        background: '#FFFFFF',
                        borderRadius: '12px',
                        boxShadow: '5px 5px 10px 0 rgba(0,0,0,0.20)',
                        animation: isClosingInsight
                          ? `slide-up-out ${animationMs(300)} ease forwards`
                          : `slide-down-in ${animationMs(400)} cubic-bezier(0.22,1,0.36,1) forwards`,
                      }}
                    >
                      <button
                        onClick={handleCloseInsight}
                        data-analytics-id="insight_close"
                        aria-label="Close insight"
                        className="close-btn-spin"
                        style={{ position: 'absolute', top: '8px', right: '8px', background: 'none', border: 'none', color: '#3E4D9C', cursor: 'pointer', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 }}
                      >
                        <svg width="10" height="10" viewBox="0 0 14 14" fill="none" overflow="visible" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="butt"/>
                        </svg>
                      </button>
                      <p className="text-[12px] leading-[18px] md:text-[17px] md:leading-[24px]" style={{ fontFamily: "'PP Monument Normal', sans-serif", fontWeight: 600, color: '#3E4D9C' }}>
                        {scenario.insight}
                      </p>
                      {/* Triangle pointer — bottom 1/3 */}
                      <div style={{
                        position: 'absolute',
                        bottom: '-12px',
                        left: '33.33%',
                        transform: 'translateX(-50%)',
                        width: 0,
                        height: 0,
                        borderLeft: '8px solid transparent',
                        borderRight: '8px solid transparent',
                        borderTop: '12px solid #FFFFFF',
                      }} />
                    </div>
                  )}

                  {/* Did you know mascot + button */}
                  <div className="relative" style={buttonsExiting
                    ? { animation: `fade-out ${animationMs(250)} ease forwards` }
                    : { opacity: 0, animation: `fade-in-only ${animationMs(500)} ease forwards` }
                  }>
                    {showInsight && (
                      <div
                        ref={mascotRef}
                        className="absolute bottom-[calc(100%+2px)] left-1/2 z-40 h-[75px] w-[54px] -translate-x-1/2 overflow-hidden lg:hidden"
                      >
                        <div className={isClosingInsight ? 'slide-down-hide' : 'slide-up-reveal'}>
                          <div className="scale-50 origin-top-left lg:scale-100">
                            <DidYouKnowMascot dark />
                          </div>
                        </div>
                      </div>
                    )}
                    <button
                      ref={insightToggleRef}
                      onClick={() => {
                        if (showInsight) {
                          handleCloseInsight();
                        } else {
                          setShowFeedback(false);
                          trackEvent('insight_opened', {
                            track_id: track.id,
                            scenario_id: scenario.id,
                            scenario_number: scenarioIndex + 1,
                          });
                          setShowInsight(true);
                        }
                      }}
                      className="game-action-button h-[44px] text-[14px] transition-colors hover:!bg-white hover:!text-[#15154A] active:!bg-[#D2AFFE] active:!text-[#15154A] md:h-[48px] md:text-[20px]"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 400,
                        lineHeight: '24px',
                        color: '#FFFFFF',
                        background: '#703ff6',
                        width: 'auto',
                        paddingLeft: '20px',
                        paddingRight: '20px',
                        borderRadius: '26px',
                        border: 'none',
                        cursor: 'pointer',
                      }}
                    >
                      Did you know?
                    </button>
                  </div>

                  {/* Next button */}
                  <button
                    onClick={handleNext}
                    className="game-action-button group flex h-[44px] items-center justify-center gap-[10px] px-[20px] text-[14px] transition-colors md:h-[48px] md:text-[20px]"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 400,
                      lineHeight: '24px',
                      color: '#FFFFFF',
                      background: 'transparent',
                      borderRadius: '26px',
                      border: '2px solid #FFFFFF',
                      cursor: 'pointer',
                      ...(buttonsExiting
                        ? { animation: `fade-out ${animationMs(250)} ease forwards` }
                        : { opacity: 0, animation: `fade-in-only ${animationMs(500)} ease ${animationMs(50)} forwards` }),
                    }}
                  >
                    Next
                    <svg className="h-6 w-6 shrink-0 transition-transform duration-200 ease-out group-hover:translate-x-[10px]" viewBox="0 0 26 24" fill="none" aria-hidden="true">
                      <path d="M2 12H22M14 4L22 12L14 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </>
              )}
            </div>

            {/* Bottom spacer: mirrors top spacer for vertical centering on mobile */}
            <div className="flex-1 lg:hidden" />

          </main>

        </div>
      </div>
    </div>
  );
}
