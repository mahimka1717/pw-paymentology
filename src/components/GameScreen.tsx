import { useEffect, useRef, useState } from 'react';
import { Track, Scenario, Score } from '../data/tracks';
import { ScoreBars } from './ScoreBars';
import { TrackSidebar } from './TrackSidebar';
import { ScenarioQuestion } from './ScenarioQuestion';
import { DidYouKnowMascot } from './DidYouKnowMascot';
import { trackTheme } from '../data/theme';

interface Props {
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

export function GameScreen({
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
    setShowFeedback(false);
    setShowInsight(false);
    onNext();
  };

  const theme = trackTheme[track.id] ?? { accent: '#FFFFFF', accentText: '#000000' };

  return (
    <div className="min-h-[calc(100vh-var(--topbar-h))] flex items-center justify-center px-6 pt-0 pb-10">
      <div className="w-full max-w-[83.33vw]">
        <div className="flex gap-6 items-stretch h-[750px]">

          {/* Left col — 4/12 */}
          <aside className="w-4/12 flex-shrink-0">
            <TrackSidebar track={track} />
          </aside>

          {/* Right col — 8/12 */}
          <main className="flex-1 flex flex-col">
            <ScoreBars totalScore={totalScore} lastDelta={showFeedback ? lastDelta : null} />
            <div className="mt-[90px]" />
            <div className="flex-1 min-h-0">
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
            <div className="mt-[28px] h-[52px] flex flex-row items-center justify-center gap-4">
              {selectedOption !== null && (
                <>
                  {/* Did you know mascot + button */}
                  <div className="relative">
                    {showInsight && (
                      <>
                        {/* Mascot */}
                        <div
                          className="absolute z-40"
                          style={{
                            bottom: 'calc(100% + 2px)',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: '108px',
                            height: '150px',
                            overflow: 'hidden',
                          }}
                        >
                          <div className={isClosingInsight ? 'slide-down-hide' : 'slide-up-reveal'}>
                            <DidYouKnowMascot accent={theme.accent} />
                          </div>
                        </div>
                        {/* Insight text popup — left of mascot, 20px gap, 20px above button */}
                        {!isClosingInsight && <div
                          ref={insightPopupRef}
                          className="absolute slide-in-from-right z-40"
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
                          {/* Triangle pointer — right side, 30px from bottom */}
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
                        </div>}
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
                      className="hover:opacity-90 transition-opacity"
                      style={{
                        fontFamily: "'PP Monument Wide', sans-serif",
                        fontWeight: 400,
                        fontSize: '20px',
                        lineHeight: '24px',
                        color: '#FFFFFF',
                        background: '#15154A',
                        width: 'auto',
                        paddingLeft: '30px',
                        paddingRight: '30px',
                        height: '52px',
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
                    className="hover:opacity-90 transition-opacity"
                    style={{
                      fontFamily: "'PP Monument Wide', sans-serif",
                      fontWeight: 900,
                      fontSize: '20px',
                      lineHeight: '24px',
                      color: '#000000',
                      background: '#D8ACFF',
                      width: '120px',
                      height: '52px',
                      borderRadius: '26px',
                      border: 'none',
                      cursor: 'pointer',
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
