import { useCallback, useEffect, useRef, useState } from 'react';
import { useGameState } from '../hooks/useGameState';
import { tracks } from '../data/tracks';
import { TrackSelectScreen } from './TrackSelectScreen';
import { TrackIntroScreen } from './TrackIntroScreen';
import { GameScreen } from './GameScreen';
import { ResultScreen } from './ResultScreen';
import { TopBar } from './TopBar';
import { smoothScrollTo } from '../utils/smoothScroll';
import { animationMs, scaledMs } from '../utils/animationTiming';
import { trackEvent } from '../utils/analytics';

export type Phase = 'enter' | 'idle' | 'exit';

export default function App() {
  const game = useGameState();
  const [phase, setPhase] = useState<Phase>('enter');
  const [hoveredTrackId, setHoveredTrackId] = useState<string | null>(null);
  const gameStartedAt = useRef<number | null>(null);
  const lastScreenView = useRef<string | null>(null);
  const gameCompletionTracked = useRef(false);

  useEffect(() => {
    document.body.dataset.screen = game.screen;

    return () => {
      delete document.body.dataset.screen;
    };
  }, [game.screen]);

  useEffect(() => {
    const screenViewKey = `${game.screen}:${game.trackId ?? ''}:${game.currentScenario?.id ?? ''}`;
    if (lastScreenView.current !== screenViewKey) {
      lastScreenView.current = screenViewKey;
      trackEvent('game_screen_view', {
        screen_name: game.screen,
        track_id: game.trackId ?? undefined,
        scenario_id: game.screen === 'game' ? game.currentScenario?.id : undefined,
        scenario_number: game.screen === 'game' ? game.scenarioIndex + 1 : undefined,
      });
    }

    if (game.screen === 'result' && game.result && !gameCompletionTracked.current) {
      gameCompletionTracked.current = true;
      trackEvent('game_completed', {
        track_id: game.trackId ?? undefined,
        outcome: game.result.outcome,
        decision_style: game.result.style,
        duration_seconds: gameStartedAt.current === null
          ? undefined
          : Math.round((Date.now() - gameStartedAt.current) / 1000),
        growth_score: game.totalScore.growth,
        trust_score: game.totalScore.trust,
        control_score: game.totalScore.control,
        momentum_score: game.totalScore.momentum,
      });
    }
  }, [game.currentScenario?.id, game.scenarioIndex, game.screen, game.trackId]);

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
            onSelect={(id) => {
              trackEvent('track_selected', { track_id: id });
              const selectedBuildingIndex = tracks.findIndex(track => track.id === id);
              if (selectedBuildingIndex >= 0) {
                const buildingImage = new Image();
                buildingImage.src = `/img/buildings/building${selectedBuildingIndex}.png`;
              }
              triggerTransition(() => {
                setHoveredTrackId(null);
                game.selectTrack(id);
              });
            }}
          />
        );

      case 'intro':
        return (
          <TrackIntroScreen
            phase={phase}
            track={game.currentTrack!}
            onStart={() => {
              gameStartedAt.current = Date.now();
              trackEvent('game_started', { track_id: game.trackId ?? undefined });
              triggerTransition(() => game.startGame(), 650);
            }}
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
            onResetOption={game.resetOption}
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
            onRestart={() => {
              trackEvent('game_restarted', {
                track_id: game.trackId ?? undefined,
                outcome: game.result?.outcome,
              });
              gameStartedAt.current = null;
              gameCompletionTracked.current = false;
              triggerTransition(() => {
                setHoveredTrackId(null);
                game.restart();
              });
            }}
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
    ? 'scale(var(--building-size, 1))'
    : (game.screen === 'intro' && phase === 'exit') || game.screen === 'game'
      ? 'translate(-660px, 40px) scale(calc(0.71 * var(--building-size, 1)))'
      : game.screen === 'result'
        ? 'translate(-660px, 40px) scale(calc(0.71 * var(--building-size, 1)))'
        : 'scale(calc(0.6 * var(--building-size, 1)))';

  return (
    <>
      <TopBar />

      <div className="game-canvas">
        {/* Building background — behind all screens, visible on intro */}
        <div className="fixed inset-0 hidden lg:flex items-center justify-center pointer-events-none" style={{ zIndex: 0 }}>
          <div
            className="building ease-in-out"
            style={{
              width: '1920px',
              height: '1080px',
              transformOrigin: '65% 65%',
              transition: `transform ${animationMs(800)} cubic-bezier(0.22, 0.61, 0.36, 1) ${buildingMoveDelay}, opacity ${animationMs(700)} ease-in-out`,
              opacity: buildingScreen ? 1 : 0,
              transform: buildingTransform,
            }}
          >
            {game.trackId && buildingIndex >= 0 && (
              <img
                key={game.trackId}
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
            )}
          </div>
        </div>

        <div style={{ paddingTop: 'var(--topbar-h)', position: 'relative', zIndex: 1 }}>
          {renderScreen()}
        </div>
      </div>
    </>
  );
}
