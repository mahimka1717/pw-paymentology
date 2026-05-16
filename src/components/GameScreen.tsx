import { useState } from 'react';
import { Track, Scenario, Score } from '../data/tracks';
import { ScoreBars } from './ScoreBars';
import { TrackSidebar } from './TrackSidebar';
import { ScenarioQuestion } from './ScenarioQuestion';
import { InsightPopup } from './InsightPopup';
import { FeedbackPopup } from './FeedbackPopup';

interface Props {
  track: Track;
  scenario: Scenario;
  scenarioIndex: number;
  totalScenarios: number;
  totalScore: Score;
  lastDelta: Score | null;
  selectedOption: number | null;
  showFeedback: boolean;
  onChoose: (index: number, delta: Score, aggressive: boolean) => void;
  onNext: () => void;
}

type PopupPhase = 'none' | 'feedback' | 'insight';

export function GameScreen({
  track,
  scenario,
  scenarioIndex,
  totalScenarios,
  totalScore,
  lastDelta,
  selectedOption,
  showFeedback,
  onChoose,
  onNext,
}: Props) {
  const [popupPhase, setPopupPhase] = useState<PopupPhase>('none');

  const handleChoose = (index: number, delta: Score, aggressive: boolean) => {
    onChoose(index, delta, aggressive);
    setPopupPhase('feedback');
  };

  const handleCloseFeedback = () => {
    setPopupPhase('insight');
  };

  const handleCloseInsight = () => {
    setPopupPhase('none');
    onNext();
  };

  const handleNext = () => {
    setPopupPhase('none');
    onNext();
  };

  const selectedOpt = selectedOption !== null ? scenario.options[selectedOption] : null;

  return (
    <div className="min-h-screen flex">
      {/* Left sidebar — full height */}
      <aside className="hidden lg:flex w-[30%] flex-shrink-0">
        <TrackSidebar
          track={track}
          scenarioIndex={scenarioIndex}
          totalScenarios={totalScenarios}
        />
      </aside>

      {/* Right content */}
      <main className="flex-1 flex flex-col p-6 md:p-8 lg:p-10 overflow-auto">
        {/* Score bars above question */}
        <ScoreBars totalScore={totalScore} lastDelta={popupPhase === 'feedback' ? lastDelta : null} />

        <div className="mt-6" />

        <ScenarioQuestion
          key={scenario.id}
          scenario={scenario}
          selectedOption={selectedOption}
          showFeedback={showFeedback}
          onChoose={handleChoose}
          onNext={handleNext}
        />
      </main>

      {/* Feedback popup */}
      {popupPhase === 'feedback' && selectedOpt && (
        <FeedbackPopup
          feedback={selectedOpt.feedback}
          optionTitle={selectedOpt.title}
          onClose={handleCloseFeedback}
        />
      )}

      {/* Insight popup */}
      {popupPhase === 'insight' && (
        <InsightPopup
          insight={scenario.insight}
          onClose={handleCloseInsight}
        />
      )}
    </div>
  );
}
