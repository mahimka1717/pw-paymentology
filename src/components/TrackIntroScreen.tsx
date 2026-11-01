import type { CSSProperties } from 'react';
import { Track, tracks } from '../data/tracks';
import { buildingNeonLayers } from '../data/buildingNeon';
import { standaloneBillboards } from '../data/standaloneBillboards';
import type { Phase } from './App';
import { animationMs } from '../utils/animationTiming';
import { AnimatedBillboard } from './AnimatedBillboard';
import { asset } from '../utils/asset';
import { buildingImage, buildingImageSizes } from '../utils/buildingImages';
import { useImageReady } from '../hooks/useImageReady';

interface Props {
  phase: Phase;
  track: Track;
  onStart: () => void;
  /** Moving to or from the game: the desktop track title stays in place instead of animating in or out. */
  keepTitle: boolean;
}

function cascade(phase: Phase, index: number, total = 3): CSSProperties {
  if (phase === 'idle') return {};
  if (phase === 'enter') return { opacity: 0, animation: `cascade-in ${animationMs(500)} ease ${animationMs(index * 150)} forwards` };
  return { animation: `cascade-out ${animationMs(333)} ease ${animationMs((total - 1 - index) * 100)} forwards` };
}

export function TrackIntroScreen({ phase, track, onStart, keepTitle }: Props) {
  const buildingIndex = tracks.findIndex(t => t.id === track.id);
  const buildingNeonLayer = buildingNeonLayers[buildingIndex];
  const standaloneBillboard = standaloneBillboards[track.id];
  const [buildingImageRef, buildingImageReady] = useImageReady(track.id);

  return (
    <div className="min-h-[calc(100vh-var(--topbar-h))] flex items-center justify-center overflow-x-hidden px-6 pt-0 pb-[calc(80px+env(safe-area-inset-bottom))] lg:min-h-[920px] lg:overflow-x-visible lg:pb-10">
      <div className="w-full max-w-[87.50vw] md:max-w-[672px] lg:max-w-[1680px]">
        <div className="w-full lg:w-[40%] min-h-[calc(100vh-var(--topbar-h)-40px)] md:min-h-[750px] lg:min-h-[750px] flex flex-col">
          <h1 className="text-[22px] leading-[28px] font-bold mb-[30px] text-left uppercase text-white md:text-[30px] md:leading-[36px] md:mb-[50px] lg:hidden" style={cascade(phase, 0, 4)}>
            {track.name}
          </h1>
          <h1 className="track-intro-title mb-[50px] hidden text-left text-[30px] font-bold uppercase leading-[36px] text-white lg:block" style={keepTitle ? {} : cascade(phase, 0, 4)}>
            {track.name}
          </h1>
          <div className="track-intro-copy max-w-[620px] text-[16px] leading-[22px] md:text-[20px] md:leading-[28px] text-left mb-0 lg:mb-[92px] text-white flex flex-col gap-4" style={{ fontFamily: "'Inter', sans-serif", ...cascade(phase, 1, 4) }}>
            {track.intro.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
          <div className="flex-1 lg:hidden" />
          <div className={`relative my-0 w-[120vw] -translate-x-1/2 overflow-hidden lg:hidden ${track.id === 'telco' ? 'left-[calc(50%-20px)]' : track.id === 'digital-banks' || track.id === 'banks' || track.id === 'remittance' ? 'left-[calc(50%-10px)]' : 'left-1/2'}`}>
            <div
              // Waits for the building image: its paused fade-in then plays with the badge and billboard together.
              className={`relative aspect-[16/9] w-full cursor-pointer ${buildingImageReady ? '' : 'awaiting-image'}`}
              // Keep the enter animation through idle: it ends at 800ms, so a late start on a busy phone would get it cut off when the 850ms enter phase ends.
              style={phase === 'idle' || phase === 'enter' ? { opacity: 0, animation: `city-in ${animationMs(500)} ease ${animationMs(300)} forwards` } : { animation: `city-out ${animationMs(333)} ease ${animationMs(100)} forwards` }}
              onClick={onStart}
              role="button"
              tabIndex={0}
              aria-label="Start"
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  onStart();
                }
              }}
            >
              <img
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
                } as CSSProperties}
                draggable={false}
                decoding="async"
              />
              {standaloneBillboard && (
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
            </div>
          </div>
          {/* The button's enter animation (450ms delay + 500ms) outlasts the 850ms enter phase, so keep it through idle instead of cutting it off mid-way. */}
          <div className="mt-[10px] flex justify-center lg:mt-0 lg:justify-start" style={cascade(phase === 'idle' ? 'enter' : phase, 3, 4)}>
            <button
              onClick={onStart}
              className="track-intro-start group flex h-[44px] w-auto items-center justify-center gap-[10px] rounded-[29px] border-2 border-white bg-transparent px-[25px] text-[16px] font-normal text-white transition-all active:!border-white active:!bg-transparent active:!text-white md:h-[66px] md:w-[212px] md:gap-6 md:rounded-[33px] md:px-0 md:text-[24px] md:font-semibold"
              style={{ fontFamily: "'Inter', sans-serif", lineHeight: 1 }}
            >
              Let's go
              <svg className="h-[22px] w-[22px] shrink-0 transition-transform duration-200 ease-out group-hover:translate-x-[10px] md:h-6 md:w-6" viewBox="0 0 26 24" fill="none" aria-hidden="true">
                <path className="stroke-[2px]" d="M2 12H22M14 4L22 12L14 20" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
          <div className="flex-1 lg:hidden" />
        </div>
      </div>
    </div>
  );
}
