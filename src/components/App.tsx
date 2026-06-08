import { useGameState } from '../hooks/useGameState';
import { TrackSelectScreen } from './TrackSelectScreen';
import { TrackIntroScreen } from './TrackIntroScreen';
import { GameScreen } from './GameScreen';
import { ResultScreen } from './ResultScreen';
import { TopBar } from './TopBar';

export default function App() {
  const game = useGameState();

  function renderScreen() {
    switch (game.screen) {
      case 'select':
        return <TrackSelectScreen onSelect={game.selectTrack} />;

      case 'intro':
        return (
          <TrackIntroScreen
            track={game.currentTrack!}
            onStart={game.startGame}
          />
        );

      case 'game':
        return (
          <GameScreen
            track={game.currentTrack!}
            scenario={game.currentScenario!}
            scenarioIndex={game.scenarioIndex}
            totalScenarios={game.totalScenarios}
            totalScore={game.totalScore}
            lastDelta={game.lastDelta}
            selectedOption={game.selectedOption}
            onChoose={game.chooseOption}
            onNext={game.nextScenario}
          />
        );

      case 'result':
        return (
          <ResultScreen
            outcome={game.result!.outcome}
            style={game.result!.style}
            normalized={game.result!.normalized}
            totalScore={game.totalScore}
            trackName={game.currentTrack!.name}
            onRestart={game.restart}
          />
        );
    }
  }

  return (
    <>
      <TopBar />
      <div style={{ paddingTop: 'var(--topbar-h)' }}>
        {renderScreen()}
      </div>
    </>
  );
}
