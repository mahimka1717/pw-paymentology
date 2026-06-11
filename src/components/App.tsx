import { useCallback, useEffect, useState } from 'react';
import { useGameState } from '../hooks/useGameState';
import { tracks } from '../data/tracks';
import { TrackSelectScreen } from './TrackSelectScreen';
import { TrackIntroScreen } from './TrackIntroScreen';
import { GameScreen } from './GameScreen';
import { ResultScreen } from './ResultScreen';
import { TopBar } from './TopBar';
import { smoothScrollTo } from '../utils/smoothScroll';

export type Phase = 'enter' | 'idle' | 'exit';

export default function App() {
  const game = useGameState();
  const [phase, setPhase] = useState<Phase>('enter');

  useEffect(() => {
    if (phase === 'enter') {
      const t = setTimeout(() => setPhase('idle'), 850);
      return () => clearTimeout(t);
    }
  }, [phase]);

  const triggerTransition = useCallback((action: () => void) => {
    setPhase('exit');
    smoothScrollTo(0, 1200);
    setTimeout(() => {
      action();
      setPhase('enter');
    }, 550);
  }, []);

  function renderScreen() {
    switch (game.screen) {
      case 'select':
        return <TrackSelectScreen phase={phase} onSelect={(id) => triggerTransition(() => game.selectTrack(id))} />;

      case 'intro':
        return (
          <TrackIntroScreen
            phase={phase}
            track={game.currentTrack!}
            onStart={() => triggerTransition(() => game.startGame())}
          />
        );

      case 'game':
        return (
          <GameScreen
            phase={phase}
            track={game.currentTrack!}
            scenario={game.currentScenario!}
            scenarioIndex={game.scenarioIndex}
            totalScenarios={game.totalScenarios}
            totalScore={game.totalScore}
            lastDelta={game.lastDelta}
            selectedOption={game.selectedOption}
            onChoose={game.chooseOption}
            onNext={game.scenarioIndex === game.totalScenarios - 1
              ? () => triggerTransition(() => game.nextScenario())
              : game.nextScenario
            }
          />
        );

      case 'result':
        return (
          <ResultScreen
            phase={phase}
            outcome={game.result!.outcome}
            style={game.result!.style}
            normalized={game.result!.normalized}
            totalScore={game.totalScore}
            trackName={game.currentTrack!.name}
            onRestart={() => triggerTransition(() => game.restart())}
          />
        );
    }
  }

  const cityVisible = game.screen === 'select' && phase !== 'exit';
  const buildingScreen = game.screen === 'intro' || (game.screen === 'game' && phase !== 'exit');
  const buildingIndex = game.trackId ? tracks.findIndex(t => t.id === game.trackId) : 0;
  const buildingTransform = (game.screen === 'intro' && phase !== 'exit')
    ? 'scale(1)'
    : (game.screen === 'intro' && phase === 'exit') || game.screen === 'game'
      ? 'translate(calc(-25vw - 400px), 100px) scale(0.667)'
      : game.screen === 'result'
        ? 'translate(calc(-25vw - 400px), 100px) scale(0.667)'
        : 'scale(0.6)';

  return (
    <>
      <TopBar />

      {/* City background — behind all screens */}
      <div className="fixed inset-0 hidden lg:flex items-center justify-center pointer-events-none" style={{ zIndex: 0 }}>
        <div
          className="city transition-all duration-700 ease-in-out"
          style={{
            width: '58.65vw',
            height: '58.65vw',
            transformOrigin: 'center center',
            opacity: cityVisible ? 1 : 0,
            transform: cityVisible ? 'translate(250px, 100px) scale(1)' : 'translate(250px, 100px) scale(1.4)',
          }}
        >
          <img
            src="/img/city.png"
            alt=""
            className="w-full h-full object-contain"
            draggable={false}
          />
        </div>
      </div>

      {/* Building background — behind all screens, visible on intro */}
      <div className="fixed inset-0 hidden lg:flex items-center justify-center pointer-events-none" style={{ zIndex: 0 }}>
        <div
          className="building ease-in-out"
          style={{
            width: '100vw',
            height: '56.25vw',
            transformOrigin: '65% 65%',
            transition: 'transform 800ms cubic-bezier(0.22, 0.61, 0.36, 1), opacity 700ms ease-in-out',
            opacity: buildingScreen ? 1 : 0,
            transform: buildingTransform,
          }}
        >
          <img
            src={`/img/building${buildingIndex}.png`}
            alt=""
            className="w-full h-full object-contain"
            style={{ transform: 'translateX(200px)' }}
            draggable={false}
          />
        </div>
      </div>

      <div style={{ paddingTop: 'var(--topbar-h)', position: 'relative', zIndex: 1 }}>
        {renderScreen()}
      </div>
    </>
  );
}
