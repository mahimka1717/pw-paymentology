import { useCallback, useEffect, useState } from 'react';
import { useGameState } from '../hooks/useGameState';
import { tracks } from '../data/tracks';
import { TrackSelectScreen } from './TrackSelectScreen';
import { TrackIntroScreen } from './TrackIntroScreen';
import { GameScreen } from './GameScreen';
import { ResultScreen } from './ResultScreen';
import { TopBar } from './TopBar';
import { smoothScrollTo } from '../utils/smoothScroll';
import { animationMs, scaledMs } from '../utils/animationTiming';

export type Phase = 'enter' | 'idle' | 'exit';

export default function App() {
  const game = useGameState();
  const [phase, setPhase] = useState<Phase>('enter');
  const [hoveredTrackId, setHoveredTrackId] = useState<string | null>(null);

  useEffect(() => {
    document.body.dataset.screen = game.screen;

    return () => {
      delete document.body.dataset.screen;
    };
  }, [game.screen]);

  useEffect(() => {
    if (phase === 'enter') {
      const t = setTimeout(() => setPhase('idle'), scaledMs(850));
      return () => clearTimeout(t);
    }
  }, [phase]);

  const triggerTransition = useCallback((action: () => void, delay = 550) => {
    setPhase('exit');
    smoothScrollTo(0, scaledMs(1200));
    setTimeout(() => {
      action();
      setPhase('enter');
    }, scaledMs(delay));
  }, []);

  function renderScreen() {
    switch (game.screen) {
      case 'select':
        return (
          <TrackSelectScreen
            phase={phase}
            hoveredTrackId={hoveredTrackId}
            onHoverTrack={setHoveredTrackId}
            onSelect={(id) => triggerTransition(() => {
              setHoveredTrackId(null);
              game.selectTrack(id);
            })}
          />
        );

      case 'intro':
        return (
          <TrackIntroScreen
            phase={phase}
            track={game.currentTrack!}
            onStart={() => triggerTransition(() => game.startGame(), 650)}
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
            onRestart={() => triggerTransition(() => {
              setHoveredTrackId(null);
              game.restart();
            })}
          />
        );
    }
  }

  const buildingScreen = game.screen === 'intro' || (game.screen === 'game' && phase !== 'exit');
  const buildingIndex = game.trackId ? tracks.findIndex(t => t.id === game.trackId) : 0;
  const buildingOnIntroOrGame = game.screen === 'intro' || game.screen === 'game';
  const buildingAtIntroPosition = game.screen === 'intro' && phase !== 'exit';
  const buildingMoveDelay = animationMs(game.screen === 'intro' && phase === 'exit' ? 200 : 0);
  const introBuildingOffset = game.trackId === 'telco' || game.trackId === 'government' || game.trackId === 'digital-banks' || game.trackId === 'banks' ? 200 : 100;
  const buildingTransform = game.screen === 'intro' && phase !== 'exit'
    ? 'scale(1)'
    : (game.screen === 'intro' && phase === 'exit') || game.screen === 'game'
      ? 'translate(calc(-180px - 25vw), 40px) scale(0.71)'
      : game.screen === 'result'
        ? 'translate(calc(-180px - 25vw), 40px) scale(0.71)'
        : 'scale(0.6)';

  return (
    <>
      <TopBar />

      {/* Building background — behind all screens, visible on intro */}
      <div className="fixed inset-0 hidden lg:flex items-center justify-center pointer-events-none" style={{ zIndex: 0 }}>
        <div
          className="building ease-in-out"
          style={{
            width: buildingOnIntroOrGame ? 'min(100vw, 177.7778vh)' : '100vw',
            height: buildingOnIntroOrGame ? 'min(56.25vw, 100vh)' : '56.25vw',
            transformOrigin: '65% 65%',
            transition: `transform ${animationMs(800)} cubic-bezier(0.22, 0.61, 0.36, 1) ${buildingMoveDelay}, opacity ${animationMs(700)} ease-in-out`,
            opacity: buildingScreen ? 1 : 0,
            transform: buildingTransform,
          }}
        >
          <img
            src={`/img/buildings/building${buildingIndex}.png`}
            alt=""
            className="w-full h-full object-contain"
            style={{
              transform: `translateX(${buildingAtIntroPosition ? introBuildingOffset : 0}px) scale(${buildingOnIntroOrGame && game.trackId === 'telco' ? 0.8 : buildingOnIntroOrGame && (game.trackId === 'digital-banks' || game.trackId === 'banks') ? 0.9 : 1})`,
              transition: game.screen === 'intro' && phase === 'exit' || game.screen === 'game'
                ? `transform ${animationMs(800)} cubic-bezier(0.22, 0.61, 0.36, 1) ${buildingMoveDelay}`
                : undefined,
            }}
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
