import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { Track, Scenario, Score } from '../data/tracks';
import { ScoreBars } from './ScoreBars';
import { TrackSidebar } from './TrackSidebar';
import { ScenarioQuestion } from './ScenarioQuestion';
import { DidYouKnowMascot } from './DidYouKnowMascot';
import { trackTheme } from '../data/theme';
import type { Phase } from './App';

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
  if (phase === 'enter') return { opacity: 0, animation: `cascade-in 500ms ease ${index * 150}ms forwards` };
  return { animation: `cascade-out 333ms ease ${(total - 1 - index) * 100}ms forwards` };
}

function cardAnim(phase: Phase, delay: number): CSSProperties {
  if (phase === 'idle') return {};
  if (phase === 'enter') return { opacity: 0, animation: `card-in 600ms cubic-bezier(0.22,1,0.36,1) ${delay}ms forwards` };
  return { animation: `card-out 400ms ease forwards` };
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

  const handleCloseInsight = () => {
    setIsClosingInsight(true);
    setTimeout(() => {
      setShowInsight(false);
      setIsClosingInsight(false);
    }, 350);
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
    onChoose(index, delta, aggressive);
    setShowFeedback(true);
    setShowInsight(false);
  };

  const handleNext = () => {
    setButtonsExiting(true);
    setTimeout(() => {
      setButtonsExiting(false);
      setShowFeedback(false);
      setShowInsight(false);
      onNext();
    }, 250);
  };

  const theme = trackTheme[track.id] ?? { accent: '#FFFFFF', accentText: '#000000' };

  return (
    <div className="min-h-[calc(100vh-var(--topbar-h))] flex items-start md:items-center justify-center px-4 md:px-6 pt-0 pb-4 md:pb-10">
      <div className="w-full max-w-[83.33vw]">
        <div className="flex flex-col md:flex-row md:gap-6 md:items-stretch md:h-[750px]">

          {/* Left col — 4/12 */}
          <aside className="hidden md:block w-4/12 flex-shrink-0">
            <TrackSidebar phase={phase} track={track} />
          </aside>

          {/* Right col — 8/12 */}
          <main className="flex-1 flex flex-col">
            <div style={cascade(phase, 1)}>
              <ScoreBars totalScore={totalScore} lastDelta={showFeedback ? lastDelta : null} />
            </div>
            <div className="mt-[20px] md:mt-[90px]" />
            <div className="flex-1 min-h-0" style={cardAnim(phase, 300)}>
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
                onChoose={handleChoose}
                onNext={handleNext}
              />
            </div>

            {/* Buttons area — space always reserved */}
            <div className="mt-[12px] md:mt-[28px] h-[42px] md:h-[52px] flex flex-row items-center justify-center gap-3 md:gap-4">
              {selectedOption !== null && (
                <>
                  {/* Did you know mascot + button */}
                  <div className="relative" style={buttonsExiting
                    ? { animation: 'fade-out 250ms ease forwards' }
                    : { opacity: 0, animation: 'fade-in-only 500ms ease forwards' }
                  }>
                    {showInsight && (
                      <>
                        {/* Mascot */}
                        <div
                          className="absolute z-40"
                          style={{
                            bottom: 'calc(100% + 2px)',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: window.innerWidth >= 768 ? '108px' : '54px',
                            height: window.innerWidth >= 768 ? '150px' : '75px',
                            overflow: 'hidden',
                          }}
                        >
                          <div className={isClosingInsight ? 'slide-down-hide' : 'slide-up-reveal'}>
                            <div className="scale-50 origin-top-left md:scale-100">
                              <DidYouKnowMascot accent={theme.accent} />
                            </div>
                          </div>
                        </div>
                        {/* Insight text popup — desktop: left of mascot; mobile: above mascot */}
                        {!isClosingInsight && <>
                          {/* Desktop popup */}
                          <div
                            ref={insightPopupRef}
                            className="absolute slide-in-from-right z-40 hidden md:block"
                            style={{
                              bottom: 'calc(100% + 20px)',
                              right: 'calc(50% + 74px)',
                              width: '500px',
                              background: '#FFFFFF',
                              borderRadius: '16px',
                              padding: '40px',
                              boxShadow: '5px 5px 10px 0 rgba(0,0,0,0.20)',
                            }}
                          >
                            <button
                              onClick={handleCloseInsight}
                              className="close-btn-spin"
                              style={{ position: 'absolute', top: '12px', right: '12px', background: 'none', border: 'none', color: '#3E4D9C', cursor: 'pointer', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 }}
                            >
                              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" overflow="visible" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="5" strokeLinecap="butt"/>
                              </svg>
                            </button>
                            <p style={{ fontFamily: "'PP Monument Normal', sans-serif", fontWeight: 400, fontSize: '20px', lineHeight: '24px', color: '#3E4D9C' }}>
                              {scenario.insight}
                            </p>
                            {/* Triangle pointer — right side */}
                            <div style={{
                              position: 'absolute',
                              right: '-14px',
                              bottom: '30px',
                              width: 0,
                              height: 0,
                              borderTop: '8px solid transparent',
                              borderBottom: '8px solid transparent',
                              borderLeft: '14px solid #FFFFFF',
                            }} />
                          </div>
                          {/* Mobile popup — above mascot, centered on screen */}
                          <div
                            ref={insightPopupRef}
                            className="absolute slide-in-from-right z-40 md:hidden"
                            style={{
                              bottom: 'calc(100% + 100px)',
                              left: '0',
                              width: 'min(calc(100vw - 48px), 300px)',
                              overflow: 'visible',
                              background: '#FFFFFF',
                              borderRadius: '12px',
                              padding: '12px 30px 12px 12px',
                              boxShadow: '5px 5px 10px 0 rgba(0,0,0,0.20)',
                            }}
                          >
                            <button
                              onClick={handleCloseInsight}
                              className="close-btn-spin"
                              style={{ position: 'absolute', top: '8px', right: '8px', background: 'none', border: 'none', color: '#3E4D9C', cursor: 'pointer', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 }}
                            >
                              <svg width="10" height="10" viewBox="0 0 14 14" fill="none" overflow="visible" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="5" strokeLinecap="butt"/>
                              </svg>
                            </button>
                            <p style={{ fontFamily: "'PP Monument Normal', sans-serif", fontWeight: 400, fontSize: '11px', lineHeight: '15px', color: '#3E4D9C' }}>
                              {scenario.insight}
                            </p>
                            {/* Triangle pointer — bottom left */}
                            <div style={{
                              position: 'absolute',
                              bottom: '-12px',
                              left: '50px',
                              width: 0,
                              height: 0,
                              borderLeft: '8px solid transparent',
                              borderRight: '8px solid transparent',
                              borderTop: '12px solid #FFFFFF',
                            }} />
                          </div>
                        </>}
                      </>
                    )}
                    <button
                      ref={insightToggleRef}
                      onClick={() => {
                        if (showInsight) {
                          handleCloseInsight();
                        } else {
                          setShowFeedback(false);
                          setShowInsight(true);
                        }
                      }}
                      className="transition-colors hover:!bg-white hover:!text-[#15154A] active:!bg-[#D2AFFE] active:!text-[#15154A]"
                      style={{
                        fontFamily: "'PP Monument Wide', sans-serif",
                        fontWeight: 400,
                        fontSize: '14px',
                        lineHeight: '18px',
                        color: '#FFFFFF',
                        background: '#15154A',
                        width: 'auto',
                        paddingLeft: '20px',
                        paddingRight: '20px',
                        height: '42px',
                        borderRadius: '21px',
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
                    className="transition-colors hover:!bg-white"
                    style={{
                      fontFamily: "'PP Monument Wide', sans-serif",
                      fontWeight: 900,
                      fontSize: '14px',
                      lineHeight: '18px',
                      color: '#000000',
                      background: '#D8ACFF',
                      width: '100px',
                      height: '42px',
                      borderRadius: '21px',
                      border: 'none',
                      cursor: 'pointer',
                      ...(buttonsExiting
                        ? { animation: 'fade-out 250ms ease forwards' }
                        : { opacity: 0, animation: 'fade-in-only 500ms ease 150ms forwards' }),
                    }}
                  >
                    Next
                  </button>
                </>
              )}
            </div>

          </main>

        </div>
      </div>
    </div>
  );
}
