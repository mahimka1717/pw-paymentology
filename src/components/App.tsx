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
import { trackTheme } from '../data/theme';
import { buildingNeonLayers } from '../data/buildingNeon';
import { AnimatedBillboard } from './AnimatedBillboard';

export type Phase = 'enter' | 'idle' | 'exit';

interface BuildingMaskPixels {
  data: Uint8ClampedArray;
  width: number;
  height: number;
}

const buildingMaskCache = new Map<number, Promise<BuildingMaskPixels>>();

const standaloneBillboards: Record<string, {
  x: number;
  y: number;
  width: number;
  height: number;
  rotate: number;
  skewY: number;
}> = {
  fintech: { x: 670, y: 837, width: 50, height: 86, rotate: 0, skewY: -10.5 },
  telco: { x: 469, y: 661, width: 70, height: 130, rotate: -2, skewY: 6 },
  remittance: { x: 742, y: 796.5, width: 55, height: 92, rotate: 0, skewY: -12.4 },
  'digital-banks': { x: 583, y: 756, width: 54, height: 100, rotate: 0, skewY: -13 },
  banks: { x: 549, y: 730, width: 55, height: 96, rotate: -1, skewY: -14 },
};

function loadBuildingMaskPixels(buildingIndex: number) {
  const cached = buildingMaskCache.get(buildingIndex);
  if (cached) return cached;

  const pending = new Promise<BuildingMaskPixels>((resolve, reject) => {
    const image = new Image();
    image.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = Math.ceil(image.naturalWidth / 4);
      canvas.height = Math.ceil(image.naturalHeight / 4);
      const context = canvas.getContext('2d', { willReadFrequently: true });
      if (!context) {
        reject(new Error('Unable to read building mask'));
        return;
      }
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      const pixels = context.getImageData(0, 0, canvas.width, canvas.height);
      resolve({ data: pixels.data, width: pixels.width, height: pixels.height });
    };
    image.onerror = reject;
    image.src = `/img/buildings/building${buildingIndex}_mask.png`;
  });

  buildingMaskCache.set(buildingIndex, pending);
  return pending;
}

export default function App() {
  const game = useGameState();
  const [phase, setPhase] = useState<Phase>('enter');
  const [hoveredTrackId, setHoveredTrackId] = useState<string | null>(null);
  const gameStartedAt = useRef<number | null>(null);
  const lastScreenView = useRef<string | null>(null);
  const gameCompletionTracked = useRef(false);
  const buildingRef = useRef<HTMLDivElement>(null);
  const buildingMaskPixelsRef = useRef<BuildingMaskPixels | null>(null);

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

  const startGame = useCallback(() => {
    gameStartedAt.current = Date.now();
    trackEvent('game_started', { track_id: game.trackId ?? undefined });
    triggerTransition(() => game.startGame(), 650);
  }, [game.startGame, game.trackId, triggerTransition]);

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
                buildingImage.src = `/img/buildings/building${selectedBuildingIndex}_ws.png`;
                const buildingIcon = new Image();
                buildingIcon.src = `/img/buildings/building${selectedBuildingIndex}_icon.png`;
                void loadBuildingMaskPixels(selectedBuildingIndex);
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
            onStart={startGame}
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
  const buildingAccent = game.trackId ? trackTheme[game.trackId]?.accent : '#FFFFFF';
  const buildingMaskUrl = `/img/buildings/building${buildingIndex}_mask.png`;
  const standaloneBillboard = game.trackId ? standaloneBillboards[game.trackId] : undefined;
  const buildingNeonLayer = buildingNeonLayers[buildingIndex];

  useEffect(() => {
    buildingMaskPixelsRef.current = null;
    if (!buildingScreen || buildingIndex < 0) return;

    let cancelled = false;
    void loadBuildingMaskPixels(buildingIndex).then((pixels) => {
      if (!cancelled) buildingMaskPixelsRef.current = pixels;
    });

    return () => {
      cancelled = true;
    };
  }, [buildingIndex, buildingMaskUrl, buildingScreen]);

  useEffect(() => {
    const building = buildingRef.current;
    if (!buildingScreen || !building) return;

    const isPointOnBuilding = (clientX: number, clientY: number) => {
      const bounds = building.getBoundingClientRect();
      const relativeX = (clientX - bounds.left) / bounds.width;
      const relativeY = (clientY - bounds.top) / bounds.height;
      const mask = buildingMaskPixelsRef.current;
      const insideBounds = relativeX >= 0 && relativeX <= 1 && relativeY >= 0 && relativeY <= 1;
      const pixelX = insideBounds && mask ? Math.min(mask.width - 1, Math.floor(relativeX * mask.width)) : 0;
      const pixelY = insideBounds && mask ? Math.min(mask.height - 1, Math.floor(relativeY * mask.height)) : 0;
      const alpha = mask ? mask.data[(pixelY * mask.width + pixelX) * 4 + 3] : 0;
      return insideBounds && alpha > 16;
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;
      building.classList.toggle('is-hovered', isPointOnBuilding(event.clientX, event.clientY));
    };

    const handleClick = (event: MouseEvent) => {
      if (game.screen !== 'intro' || phase === 'exit') return;
      if (isPointOnBuilding(event.clientX, event.clientY)) startGame();
    };

    const clearHover = () => building.classList.remove('is-hovered');
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('click', handleClick);
    document.documentElement.addEventListener('mouseleave', clearHover);
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('click', handleClick);
      document.documentElement.removeEventListener('mouseleave', clearHover);
      clearHover();
    };
  }, [buildingScreen, game.screen, game.trackId, phase, startGame]);

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
              <div
                ref={buildingRef}
                className="standalone-building relative h-full w-full"
                style={{
                  transform: `translateX(${buildingAtIntroPosition ? introBuildingOffset : 0}px) scale(${buildingOnIntroOrGame && game.trackId === 'telco' ? 0.8 : buildingOnIntroOrGame && (game.trackId === 'digital-banks' || game.trackId === 'banks') ? 0.9 : 1})`,
                  transition: game.screen === 'intro' && phase === 'exit' || game.screen === 'game'
                    ? `transform ${animationMs(800)} cubic-bezier(0.22, 0.61, 0.36, 1) ${buildingMoveDelay}`
                    : undefined,
                }}
              >
                <img
                  key={game.trackId}
                  src={`/img/buildings/building${buildingIndex}_ws.png`}
                  alt=""
                  className="absolute inset-0 h-full w-full object-contain"
                  draggable={false}
                />
                <img
                  src={`/img/buildings/building${buildingIndex}_icon.png`}
                  alt=""
                  aria-hidden="true"
                  className="standalone-building-neon pointer-events-none absolute object-contain"
                  style={{
                    '--building-neon-delay': animationMs(buildingIndex * 430),
                    left: `${buildingNeonLayer.x / 1920 * 100}%`,
                    top: `${buildingNeonLayer.y / 1080 * 100}%`,
                    width: `${buildingNeonLayer.width / 1920 * 100}%`,
                    height: buildingNeonLayer.height ? `${buildingNeonLayer.height / 1080 * 100}%` : undefined,
                  } as React.CSSProperties}
                  draggable={false}
                />
                {standaloneBillboard && (
                  <AnimatedBillboard
                    x={standaloneBillboard.x}
                    y={standaloneBillboard.y}
                    width={standaloneBillboard.width}
                    height={standaloneBillboard.height}
                    referenceWidth={1920}
                    referenceHeight={1080}
                    distortion={{
                      rotate: standaloneBillboard.rotate,
                      skewY: standaloneBillboard.skewY,
                      origin: 'top left',
                    }}
                  />
                )}
                <div
                  aria-hidden="true"
                  className="standalone-building-highlight pointer-events-none absolute inset-0 h-full w-full"
                >
                  <div
                    className="standalone-building-highlight-mask h-full w-full"
                    style={{
                      backgroundColor: buildingAccent,
                      WebkitMaskImage: `url(${buildingMaskUrl})`,
                      maskImage: `url(${buildingMaskUrl})`,
                    }}
                  />
                </div>
              </div>
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
