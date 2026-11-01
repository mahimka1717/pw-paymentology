import { lazy, startTransition, Suspense, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useGameState } from '../hooks/useGameState';
import { useImageReady } from '../hooks/useImageReady';
import { DESKTOP_QUERY, useMediaQuery } from '../hooks/useMediaQuery';
import { tracks } from '../data/tracks';
import { TrackSelectScreen } from './TrackSelectScreen';
// Not lazy: on a slow connection its chunk would queue behind images and leave the intro blank.
import { TrackIntroScreen } from './TrackIntroScreen';
import { TopBar } from './TopBar';
import { smoothScrollTo } from '../utils/smoothScroll';
import { animationMs, scaledMs } from '../utils/animationTiming';
import { trackEvent } from '../utils/analytics';
import { trackTheme } from '../data/theme';
import { buildingNeonLayers } from '../data/buildingNeon';
import { standaloneBillboards } from '../data/standaloneBillboards';
import { AnimatedBillboard } from './AnimatedBillboard';
import { asset } from '../utils/asset';
import { buildingImage, buildingImageSizes, preloadBuilding } from '../utils/buildingImages';

const GameScreen = lazy(() =>
  import('./GameScreen').then(module => ({ default: module.GameScreen })),
);
const ResultScreen = lazy(() =>
  import('./ResultScreen').then(module => ({ default: module.ResultScreen })),
);

export type Phase = 'enter' | 'idle' | 'exit';

interface BuildingMaskPixels {
  data: Uint8ClampedArray;
  width: number;
  height: number;
}

const buildingMaskCache = new Map<number, Promise<BuildingMaskPixels>>();

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
    image.src = asset(`/img/buildings/building${buildingIndex}_mask.png`);
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
  // Browser history entries pushed for game steps since the select screen; Go back and the browser back button both pop them.
  const historyDepth = useRef(0);
  const previousStepOrder = useRef(0);
  const [gameBackRequests, setGameBackRequests] = useState(0);
  // Moving between the intro and the game (either way): the desktop track title stays put instead of animating.
  const [keepTrackTitle, setKeepTrackTitle] = useState(false);
  const gameCompletionTracked = useRef(false);
  const buildingRef = useRef<HTMLDivElement>(null);
  const buildingMaskPixelsRef = useRef<BuildingMaskPixels | null>(null);
  const bgVideoRef = useRef<HTMLVideoElement>(null);
  const previousMobileVideo = useRef<boolean | null>(null);
  const isMobileVideo = useMediaQuery('(max-width: 1023px)');
  const [videoReady, setVideoReady] = useState(false);
  // The background video only starts downloading once the city image is in, so it doesn't slow the city down.
  const [cityReady, setCityReady] = useState(false);
  const markCityReady = useCallback(() => setCityReady(true), []);
  const [videoFullyLoaded, setVideoFullyLoaded] = useState(false);
  // The video is hidden off the select screen: an unfinished download is dropped there so it doesn't slow the
  // next screen down, and carries on when the player comes back.
  const videoSourcesOn = cityReady && (game.screen === 'select' || videoFullyLoaded);
  const videoWasOn = useRef(false);

  const videoVisible = game.screen === 'select' && phase !== 'exit';
  const videoOpacity = videoVisible && videoReady ? 1 : 0;

  useEffect(() => {
    const video = bgVideoRef.current;
    if (!video) return;

    const markReady = () => setVideoReady(true);
    video.addEventListener('canplay', markReady);

    const breakpointChanged = previousMobileVideo.current !== null
      && previousMobileVideo.current !== isMobileVideo;
    previousMobileVideo.current = isMobileVideo;

    if (breakpointChanged) {
      setVideoReady(false);
      setVideoFullyLoaded(false);
      video.load();
    } else if (video.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) {
      markReady();
    }

    return () => video.removeEventListener('canplay', markReady);
  }, [isMobileVideo]);

  useEffect(() => {
    const video = bgVideoRef.current;
    if (!video) return;

    const checkFullyLoaded = () => {
      const { buffered, duration } = video;
      if (buffered.length && duration && buffered.end(buffered.length - 1) >= duration - 0.1) setVideoFullyLoaded(true);
    };
    video.addEventListener('progress', checkFullyLoaded);
    return () => video.removeEventListener('progress', checkFullyLoaded);
  }, []);

  useEffect(() => {
    const video = bgVideoRef.current;
    if (!video) return;
    // With its sources gone, load() aborts the download.
    if (!videoSourcesOn && videoWasOn.current) {
      setVideoReady(false);
      video.load();
    }
    videoWasOn.current = videoSourcesOn;
  }, [videoSourcesOn]);

  useEffect(() => {
    const video = bgVideoRef.current;
    if (!video) return;
    if (videoVisible) {
      video.play().catch(() => undefined);
    } else {
      video.pause();
    }
  }, [isMobileVideo, videoVisible]);

  // On desktop, set it in a layout effect so screen-specific CSS applies in the same frame as the new screen.
  useLayoutEffect(() => {
    if (!window.matchMedia(DESKTOP_QUERY).matches) return;
    document.body.dataset.screen = game.screen;

    return () => {
      delete document.body.dataset.screen;
    };
  }, [game.screen]);

  useEffect(() => {
    if (window.matchMedia(DESKTOP_QUERY).matches) return;
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
    if (phase === 'idle') setKeepTrackTitle(false);
    if (phase === 'enter') {
      const t = setTimeout(() => setPhase('idle'), scaledMs(850));
      return () => clearTimeout(t);
    }
  }, [phase]);

  const triggerTransition = useCallback((action: () => void, delay = 550, keepScreenWhileLoading = false) => {
    setPhase('exit');
    smoothScrollTo(0, scaledMs(1200));
    setTimeout(() => {
      const switchScreen = () => {
        action();
        setPhase('enter');
      };
      // On desktop, a transition keeps the current screen on display while a lazy screen loads,
      // instead of blanking everything via the Suspense fallback.
      if (keepScreenWhileLoading && window.matchMedia(DESKTOP_QUERY).matches) startTransition(switchScreen);
      else switchScreen();
    }, scaledMs(delay));
  }, []);

  const goBack = useCallback(() => {
    trackEvent('go_back', {
      screen_name: game.screen,
      track_id: game.trackId ?? undefined,
      scenario_number: game.screen === 'game' ? game.scenarioIndex + 1 : undefined,
    });
    // Between questions only the question animates, as on Next.
    if (game.screen === 'game' && game.scenarioIndex > 0) {
      setGameBackRequests(count => count + 1);
      return;
    }
    if (game.screen === 'game') setKeepTrackTitle(true);
    triggerTransition(() => {
      setHoveredTrackId(null);
      game.goBack();
    });
  }, [game.goBack, game.screen, game.scenarioIndex, game.trackId, triggerTransition]);

  const goBackRef = useRef(goBack);
  goBackRef.current = goBack;

  // Every forward step gets its own history entry, so the browser back button walks back through the game.
  const stepOrder = game.screen === 'select' ? 0 : game.screen === 'intro' ? 1 : game.screen === 'game' ? 2 + game.scenarioIndex : 1000;
  useEffect(() => {
    if (stepOrder > previousStepOrder.current) {
      historyDepth.current += 1;
      window.history.pushState({ gameDepth: historyDepth.current }, '');
    }
    previousStepOrder.current = stepOrder;
  }, [stepOrder]);

  useEffect(() => {
    // A reload mid-game keeps the old entry's depth; the game restarts at the select screen, so reset it.
    window.history.replaceState({ gameDepth: 0 }, '');

    const handlePopState = (event: PopStateEvent) => {
      const depth = typeof event.state?.gameDepth === 'number' ? event.state.gameDepth : 0;
      if (depth >= historyDepth.current) {
        // Browser forward (or our own resync): undo it, the game only moves forward through its own buttons.
        if (depth > historyDepth.current) window.history.go(historyDepth.current - depth);
        return;
      }
      historyDepth.current -= 1;
      goBackRef.current();
      // Jumped back several entries at once: step back once and move the browser to match.
      if (depth < historyDepth.current) window.history.go(historyDepth.current - depth);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Play again, from the result screen or the top bar: back to the select screen with a fresh game.
  const restartGame = useCallback(() => {
    trackEvent('game_restarted', {
      screen_name: game.screen,
      track_id: game.trackId ?? undefined,
      outcome: game.result?.outcome,
    });
    gameStartedAt.current = null;
    gameCompletionTracked.current = false;
    // Drop the game's history entries so browser back from the select screen leaves the game as before.
    if (historyDepth.current > 0) {
      const depth = historyDepth.current;
      historyDepth.current = 0;
      window.history.go(-depth);
    }
    triggerTransition(() => {
      setHoveredTrackId(null);
      game.restart();
    });
  }, [game.restart, game.result?.outcome, game.screen, game.trackId, triggerTransition]);

  const handleGoBack = useCallback(() => {
    if (historyDepth.current > 0) window.history.back();
  }, []);

  const startGame = useCallback(() => {
    gameStartedAt.current = Date.now();
    trackEvent('game_started', { track_id: game.trackId ?? undefined });
    void import('./GameScreen');
    setKeepTrackTitle(true);
    // Keep the intro on screen until the game screen loads so the track title doesn't blink.
    triggerTransition(() => game.startGame(), 650, true);
  }, [game.startGame, game.trackId, triggerTransition]);

  function renderScreen() {
    switch (game.screen) {
      case 'select':
        return (
          <TrackSelectScreen
            phase={phase}
            hoveredTrackId={hoveredTrackId}
            onHoverTrack={setHoveredTrackId}
            onCityReady={markCityReady}
            onSelect={(id) => {
              trackEvent('track_selected', { track_id: id });
              const selectedBuildingIndex = tracks.findIndex(track => track.id === id);
              if (selectedBuildingIndex >= 0) {
                preloadBuilding(selectedBuildingIndex);
                void loadBuildingMaskPixels(selectedBuildingIndex);
                void import('./GameScreen');
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
            keepTitle={keepTrackTitle}
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
            backRequest={gameBackRequests}
            onBack={game.goBack}
            keepTitle={keepTrackTitle}
            onNext={game.scenarioIndex === game.totalScenarios - 1
              ? () => {
                  void import('./ResultScreen');
                  triggerTransition(() => game.nextScenario());
                }
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
            onRestart={restartGame}
          />
        );
    }
  }

  // Leaving the intro: towards the game the building slides into the game position; back to the select screen it
  // reverses its entrance (shrinks and fades in place), finishing before the screen switches.
  // Going back from the game to the intro it stays visible and slides back from the game position.
  const buildingToGame = game.screen === 'intro' && phase === 'exit' && keepTrackTitle;
  const buildingToSelect = game.screen === 'intro' && phase === 'exit' && !keepTrackTitle;
  const buildingBackToIntro = game.screen === 'game' && phase === 'exit' && keepTrackTitle;
  // The slide back plays on the intro's enter, with the same timing as the slide to the game.
  const buildingSlidingBack = game.screen === 'intro' && phase !== 'exit' && keepTrackTitle;
  const buildingScreen = (game.screen === 'intro' && !buildingToSelect) || (game.screen === 'game' && (phase !== 'exit' || buildingBackToIntro));
  const buildingIndex = game.trackId ? tracks.findIndex(t => t.id === game.trackId) : 0;
  const buildingOnIntroOrGame = game.screen === 'intro' || game.screen === 'game';
  const buildingAtIntroPosition = game.screen === 'intro' && !buildingToGame;
  const buildingMoveDelay = animationMs(buildingToGame ? 200 : 0);
  const buildingMoveDuration = animationMs(buildingToGame || buildingSlidingBack || game.screen === 'game' ? 1000 : buildingToSelect ? 500 : 800);
  const buildingMoveEasing = buildingToGame || buildingSlidingBack || game.screen === 'game'
    ? 'ease-in-out'
    : buildingToSelect
      ? 'cubic-bezier(0.64, 0, 0.78, 0.39)'
      : 'cubic-bezier(0.22, 0.61, 0.36, 1)';
  const introBuildingOffset = game.trackId === 'telco' || game.trackId === 'government' || game.trackId === 'digital-banks' || game.trackId === 'banks' ? 200 : 100;
  const buildingTransform = game.screen === 'intro' && phase !== 'exit'
    ? 'scale(var(--building-size, 1))'
    : buildingToGame || game.screen === 'game'
      ? 'translate(-660px, 40px) scale(calc(0.71 * var(--building-size, 1)))'
      : game.screen === 'result'
        ? 'translate(-660px, 40px) scale(calc(0.71 * var(--building-size, 1)))'
        : 'scale(calc(0.6 * var(--building-size, 1)))';
  const buildingAccent = game.trackId ? trackTheme[game.trackId]?.accent : '#FFFFFF';
  const buildingMaskUrl = asset(`/img/buildings/building${buildingIndex}_mask.png`);
  const standaloneBillboard = game.trackId ? standaloneBillboards[game.trackId] : undefined;
  const buildingNeonLayer = buildingNeonLayers[buildingIndex];
  const [buildingImageRef, buildingImageReady] = useImageReady(game.trackId);

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
      <TopBar showNavigation={game.screen !== 'select'} onGoBack={handleGoBack} onPlayAgain={restartGame} />

      {/* Video background — fades on select screen */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: 0,
          opacity: videoOpacity,
          transition: `opacity ${animationMs(500)} ease-in-out`,
        }}
      >
        <video
          ref={bgVideoRef}
          className="h-full w-full object-cover bg-video"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        >
          {!videoSourcesOn ? null : isMobileVideo ? (
            <>
              <source src={asset('/video/bg9_16.webm')} type="video/webm" />
              <source src={asset('/video/bg9_16-compressed.mp4')} type="video/mp4" />
            </>
          ) : (
            <>
              <source src={asset('/video/bg.webm')} type="video/webm" />
              <source src={asset('/video/bg-compressed.mp4')} type="video/mp4" />
            </>
          )}
        </video>
      </div>

      <div className="game-canvas">
        {/* Building background — behind all screens, visible on intro */}
        <div className="fixed inset-0 hidden lg:flex items-center justify-center pointer-events-none" style={{ zIndex: 0 }}>
          <div
            className="building ease-in-out"
            style={{
              width: '1920px',
              height: '1080px',
              transformOrigin: '65% 65%',
              transition: `transform ${buildingMoveDuration} ${buildingMoveEasing} ${buildingMoveDelay}, opacity ${animationMs(buildingToSelect ? 500 : 700)} ease-in-out`,
              opacity: buildingScreen ? 1 : 0,
              transform: buildingTransform,
            }}
          >
            {game.trackId && buildingIndex >= 0 && (
              <div
                ref={buildingRef}
                className={`standalone-building relative h-full w-full ${buildingImageReady ? '' : 'awaiting-image'}`}
                style={{
                  transform: `translateX(${buildingAtIntroPosition ? introBuildingOffset : 0}px) scale(${buildingOnIntroOrGame && game.trackId === 'telco' ? 0.8 : buildingOnIntroOrGame && (game.trackId === 'digital-banks' || game.trackId === 'banks') ? 0.9 : 1})`,
                  // Always set, so the intro offset also animates on the way back from the game (it mounts without one).
                  transition: `transform ${buildingMoveDuration} ${buildingMoveEasing} ${buildingMoveDelay}, opacity ${animationMs(500)} ease-in-out`,
                }}
              >
                <img
                  key={game.trackId}
                  ref={buildingImageRef}
                  {...buildingImage(buildingIndex)}
                  sizes={buildingImageSizes}
                  alt=""
                  className="absolute inset-0 h-full w-full object-contain"
                  draggable={false}
                  decoding="async"
                />
                <img
                  src={asset(`/img/buildings/building${buildingIndex}_icon.png`)}
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
                {standaloneBillboard && buildingImageReady && (
                  <AnimatedBillboard
                    x={standaloneBillboard.x}
                    y={standaloneBillboard.y}
                    width={standaloneBillboard.width}
                    height={standaloneBillboard.height}
                    referenceWidth={1920}
                    referenceHeight={1080}
                    image={asset(`/img/posters/p_${buildingIndex}.webp`)}
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
          <Suspense fallback={null}>
            {renderScreen()}
          </Suspense>
        </div>
      </div>
    </>
  );
}
