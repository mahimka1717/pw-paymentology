import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { Track, Scenario, Score } from '../data/tracks';
import { ScoreBars } from './ScoreBars';
import { TrackSidebar } from './TrackSidebar';
import { ProgressDots, ScenarioQuestion } from './ScenarioQuestion';
import { smoothScrollTo } from '../utils/smoothScroll';
import type { Phase } from './App';
import { animationMs, scaledMs } from '../utils/animationTiming';
import { trackEvent } from '../utils/analytics';
import { DESKTOP_QUERY, useMediaQuery } from '../hooks/useMediaQuery';

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
  onResetOption: () => void;
  onNext: () => void;
  /** Bumped by the app to go back a question; the question leaves the same way as on Next, then onBack runs. */
  backRequest: number;
  onBack: () => void;
  /** Going back to the intro: the desktop track title stays in place instead of animating out. */
  keepTitle: boolean;
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
  onResetOption,
  onNext,
  backRequest,
  onBack,
  keepTitle,
}: Props) {
  const [showFeedback, setShowFeedback] = useState(false);
  const [showScoreDelta, setShowScoreDelta] = useState(false);
  const [showActionButtons, setShowActionButtons] = useState(false);
  const [showInsight, setShowInsight] = useState(false);
  const [isClosingInsight, setIsClosingInsight] = useState(false);
  const [buttonsExiting, setButtonsExiting] = useState(false);
  const [questionExiting, setQuestionExiting] = useState(false);
  const [exitWithFeedbackOpen, setExitWithFeedbackOpen] = useState(false);
  const [exitWithInsightOpen, setExitWithInsightOpen] = useState(false);
  const [resettingOption, setResettingOption] = useState(false);
  const [insightHintSeen, setInsightHintSeen] = useState(false);
  const revealTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const insightPopupRef = useRef<HTMLDivElement>(null);
  const insightToggleRef = useRef<HTMLButtonElement>(null);
  const mascotRef = useRef<HTMLDivElement>(null);
  const buttonsAreaRef = useRef<HTMLDivElement>(null);
  const questionRef = useRef<HTMLDivElement>(null);
  const [questionHeight, setQuestionHeight] = useState<number | null>(null);
  const isDesktop = useMediaQuery(DESKTOP_QUERY);

  // Below desktop the question panel's background lives here, outside the per-question ScenarioQuestion,
  // so it can grow or shrink smoothly to each new question's height.
  useLayoutEffect(() => {
    const question = questionRef.current;
    if (isDesktop || !question) return;
    const observer = new ResizeObserver(() => setQuestionHeight(question.offsetHeight));
    observer.observe(question);
    return () => observer.disconnect();
  }, [isDesktop]);

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
    return () => {
      if (revealTimeoutRef.current) clearTimeout(revealTimeoutRef.current);
    };
  }, []);

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
    onChoose(index, delta, aggressive);
    setShowScoreDelta(true);
    setShowInsight(false);
    if (revealTimeoutRef.current) clearTimeout(revealTimeoutRef.current);
    revealTimeoutRef.current = setTimeout(() => {
      trackEvent('feedback_opened', {
        track_id: track.id,
        scenario_id: scenario.id,
        scenario_number: scenarioIndex + 1,
        method: 'automatic',
      });
      setShowFeedback(true);
      setShowActionButtons(true);
      revealTimeoutRef.current = null;
    }, scaledMs(700));
  };

  const handleNext = () => {
    if (questionExiting) return;
    const isLastScenario = scenarioIndex === totalScenarios - 1;

    trackEvent('scenario_advanced', {
      track_id: track.id,
      scenario_id: scenario.id,
      scenario_number: scenarioIndex + 1,
      completes_game: isLastScenario,
    });
    leaveQuestion(isLastScenario, onNext);
  };

  const lastBackRequest = useRef(backRequest);
  useEffect(() => {
    if (backRequest === lastBackRequest.current) return;
    lastBackRequest.current = backRequest;
    if (questionExiting) return;
    leaveQuestion(false, onBack);
  }, [backRequest]);

  // Shared by Next and Go back: closes popups and plays the question's exit before switching question.
  function leaveQuestion(isLastScenario: boolean, onDone: () => void) {
    setExitWithFeedbackOpen(showFeedback);
    setExitWithInsightOpen(showInsight);
    if (revealTimeoutRef.current) {
      clearTimeout(revealTimeoutRef.current);
      revealTimeoutRef.current = null;
    }
    setButtonsExiting(true);
    setQuestionExiting(!isLastScenario);
    setShowFeedback(false);
    setShowScoreDelta(false);
    setShowInsight(false);
    smoothScrollTo(0, scaledMs(1200));
    setTimeout(() => {
      setButtonsExiting(false);
      setQuestionExiting(false);
      setShowActionButtons(false);
      if (!isLastScenario) {
        setExitWithFeedbackOpen(false);
        setExitWithInsightOpen(false);
      }
      onDone();
    }, scaledMs(isLastScenario ? 250 : 400));
  }

  const handleResetOption = () => {
    if (resettingOption) return;

    if (revealTimeoutRef.current) {
      clearTimeout(revealTimeoutRef.current);
      revealTimeoutRef.current = null;
    }
    setResettingOption(true);
    setButtonsExiting(true);
    setShowScoreDelta(false);
    setShowFeedback(false);
    if (showInsight) setIsClosingInsight(true);
    setTimeout(() => {
      onResetOption();
      setShowInsight(false);
      setIsClosingInsight(false);
      setButtonsExiting(false);
      setResettingOption(false);
      setShowActionButtons(false);
    }, scaledMs(700));
  };

  const displayedScore = resettingOption && lastDelta
    ? {
        growth: totalScore.growth - lastDelta.growth,
        trust: totalScore.trust - lastDelta.trust,
        control: totalScore.control - lastDelta.control,
        momentum: totalScore.momentum - lastDelta.momentum,
      }
    : totalScore;

  return (
    <div className="min-h-[calc(100vh-var(--topbar-h))] flex items-start lg:items-center justify-center px-4 md:px-6 md:pb-10 lg:min-h-[920px]">
      <div className="w-full max-w-[87.5vw] md:max-w-[672px] lg:max-w-[1680px]">
        <div className="flex flex-col lg:h-[750px] lg:flex-row lg:items-stretch lg:gap-6">

          {/* Left col — 4/12 */}
          <aside className="game-sidebar hidden flex-shrink-0 lg:block lg:w-[41%]">
            <TrackSidebar phase={keepTitle ? 'idle' : phase} track={track} />
          </aside>

          {/* Right col — 8/12 */}
          <main className="relative flex-1 flex flex-col min-h-[calc(100vh-var(--topbar-h)-32px)] lg:min-h-0 lg:[--insight-anchor-x:max(0px,calc(100%_-_1106px))]">
            {showInsight && (
              <div className="pointer-events-none absolute bottom-0 left-[calc(var(--insight-anchor-x)-30px)] z-40 hidden h-[150px] w-[108px] -translate-x-1/2 overflow-hidden lg:flex items-center justify-center">
                <div className={isClosingInsight ? 'slide-down-hide' : 'slide-up-reveal'}>
                  <img src="/mascot.webp" alt="" className="max-h-full max-w-full" draggable={false} decoding="async" />
                </div>
              </div>
            )}
            {showInsight && !isClosingInsight && (
              <div
                ref={insightPopupRef}
                className="absolute bottom-[20px] left-[calc(var(--insight-anchor-x)-604px)] z-40 hidden w-[500px] rounded-[16px] bg-white p-[40px] shadow-[5px_5px_10px_0_rgba(0,0,0,0.20)] lg:block"
                style={{ animation: `slide-in-from-right ${animationMs(500)} cubic-bezier(0.22,0.61,0.36,1) forwards` }}
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
                  className="absolute bottom-[50px] right-[-13px] h-0 w-0 border-y-[8px] border-l-[14px] border-y-transparent border-l-white"
                />
              </div>
            )}

            <div style={cascade(phase, 0)}>
              <ScoreBars totalScore={displayedScore} lastDelta={showScoreDelta ? lastDelta : null} />
            </div>

            {/* Spacer: a fixed gap on mobile so the question panel stays put under the score bars as questions change height */}
            <div className="game-question-spacer min-h-[1.5rem] lg:min-h-0 lg:mt-[90px]" />

            {/* Mobile track title */}
            <div className="hidden mb-[10px]" style={cascade(phase, 1)}>
              <h2
                className="text-[18px] leading-[20px] md:text-[40px] md:leading-[48px] font-bold uppercase"
                style={{ color: `#fff`, fontFamily: "'PP Monument Wide', sans-serif" }}
              >
                {track.name}
              </h2>
            </div>

            <div className="relative lg:flex-1 min-h-0" style={cascade(phase, 2)}>
              {!isDesktop && (
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 rounded-[20px] shadow-[5px_5px_10px_0_rgba(0,0,0,0.20)]"
                  style={{
                    background: '#703ff6',
                    height: questionHeight ?? '100%',
                    transition: `height ${animationMs(400)} cubic-bezier(0.22,1,0.36,1)`,
                  }}
                >
                  <div className="absolute inset-x-0 bottom-[20px] flex justify-center px-[20px] md:bottom-[40px] md:pl-[48px] md:pr-[52px]">
                    <ProgressDots scenarioIndex={scenarioIndex} totalScenarios={totalScenarios} />
                  </div>
                </div>
              )}
              <div ref={questionRef} className="relative lg:h-full">
                <ScenarioQuestion
                  key={scenario.id}
                  scenario={scenario}
                  scenarioIndex={scenarioIndex}
                  totalScenarios={totalScenarios}
                  selectedOption={selectedOption}
                  exiting={questionExiting}
                  enteringWithScreen={phase === 'enter'}
                  resettingOption={resettingOption}
                  showFeedback={showFeedback}
                  canToggleFeedback={showActionButtons}
                  showInsight={showInsight}
                  exitWithFeedbackOpen={exitWithFeedbackOpen}
                  exitWithInsightOpen={exitWithInsightOpen}
                  onCloseFeedback={() => {
                    if (resettingOption) return;
                    setShowFeedback(false);
                    setShowScoreDelta(false);
                  }}
                  onToggleFeedback={() => {
                    if (resettingOption) return;
                    trackEvent(showFeedback ? 'feedback_closed' : 'feedback_opened', {
                      track_id: track.id,
                      scenario_id: scenario.id,
                      scenario_number: scenarioIndex + 1,
                      method: 'selected_option',
                    });
                    setShowInsight(false);
                    setIsClosingInsight(false);
                    setShowFeedback(!showFeedback);
                    setShowScoreDelta(false);
                  }}
                  onChoose={handleChoose}
                  onResetOption={handleResetOption}
                  onNext={handleNext}
                />
              </div>
            </div>

            {/* Buttons area — fixed to bottom on mobile (hidden until answered), always reserves space on desktop */}
            <div ref={buttonsAreaRef} className={`game-actions-area p-[20px] pb-[calc(20px+env(safe-area-inset-bottom))] bg-[#783cff] lg:static lg:mt-[28px] lg:mb-0 lg:p-0 lg:pb-0 lg:bg-transparent h-auto flex flex-row flex-wrap items-center justify-center gap-3 md:gap-4 ${selectedOption !== null && showActionButtons && phase !== 'exit' ? `game-actions-area-fixed-mobile ${buttonsExiting ? 'is-hiding' : ''}` : 'hidden lg:flex'} lg:min-h-[48px]`}>
              {selectedOption !== null && showActionButtons && phase !== 'exit' && (
                <>
                  {/* Mobile insight popup */}
                  {showInsight && (
                    <div
                      ref={insightPopupRef}
                      className="z-40 lg:hidden left-0 right-0 mx-auto w-full max-w-[300px] md:max-w-[350px] p-[16px] pr-[36px] md:p-[24px] md:pr-[48px]"
                      style={{
                        position: 'absolute',
                        bottom: 'calc(100% + 79px)',
                        overflow: 'visible',
                        background: '#FFFFFF',
                        borderRadius: '12px',
                        boxShadow: '5px 5px 10px 0 rgba(0,0,0,0.20)',
                        animation: isClosingInsight
                          ? `slide-up-out ${animationMs(300)} ease forwards`
                          : `slide-down-in ${animationMs(500)} cubic-bezier(0.22,0.61,0.36,1) forwards`,
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
                        bottom: '-8px',
                        left: '30%',
                        transform: 'translateX(-50%)',
                        width: 0,
                        height: 0,
                        borderLeft: '10px solid transparent',
                        borderRight: '10px solid transparent',
                        borderTop: '8px solid #FFFFFF',
                      }} />
                    </div>
                  )}

                  {/* Did you know mascot + button */}
                  <div className={`relative ${buttonsExiting ? 'game-button-exit' : 'game-button-enter'}`}>
                    {showInsight && (
                      <div
                        ref={mascotRef}
                        className="absolute bottom-[calc(100%+2px)] left-1/2 z-40 h-[150px] w-[108px] -translate-x-1/2 overflow-hidden lg:hidden flex items-end justify-center"
                      >
                        <div className={isClosingInsight ? 'slide-down-hide' : 'slide-up-reveal'}>
                          <img src="/mascot.webp" alt="" className="max-h-full max-w-full translate-y-[10px]" draggable={false} decoding="async" />
                        </div>
                      </div>
                    )}
                    <button
                      ref={insightToggleRef}
                      onClick={() => {
                        setInsightHintSeen(true);
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
                      className={`game-action-button h-[44px] whitespace-nowrap text-[14px] transition-colors hover:!bg-white hover:!text-[#15154A] active:!bg-[#D2AFFE] active:!text-[#15154A] md:h-[48px] md:text-[20px] ${!insightHintSeen && !buttonsExiting ? 'insight-hint' : ''}`}
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
                    className={`game-action-button group flex h-[44px] items-center justify-center gap-[10px] whitespace-nowrap px-[20px] text-[14px] transition-colors md:h-[48px] md:text-[20px] ${buttonsExiting ? 'game-button-exit' : 'game-button-enter'}`}
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 400,
                      lineHeight: '24px',
                      color: '#FFFFFF',
                      background: 'transparent',
                      borderRadius: '26px',
                      border: '2px solid #FFFFFF',
                      cursor: 'pointer',
                      ...(buttonsExiting ? {} : { '--enter-delay': animationMs(50) } as CSSProperties),
                    }}
                  >
                    {scenarioIndex === totalScenarios - 1 ? 'Your decision-making style' : 'Next'}
                    <svg className="h-6 w-6 shrink-0 transition-transform duration-200 ease-out group-hover:translate-x-[10px]" viewBox="0 0 26 24" fill="none" aria-hidden="true">
                      <path d="M2 12H22M14 4L22 12L14 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </>
              )}
            </div>

            {/* Bottom spacer: keeps the fixed mobile bar from covering content (persistent so layout never jumps).
                Taller on the last question, where the longer button can wrap onto a second row on narrow phones. */}
            <div className={`${scenarioIndex === totalScenarios - 1 ? 'h-[180px]' : 'h-[120px]'} md:h-[60px] lg:hidden`} />

            {/* Bottom spacer: mirrors top spacer for vertical centering on mobile */}
            <div className="flex-1 lg:hidden" />

          </main>

        </div>
      </div>
    </div>
  );
}
