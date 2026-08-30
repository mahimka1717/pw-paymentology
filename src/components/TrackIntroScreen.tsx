import type { CSSProperties } from 'react';
import { Track, tracks } from '../data/tracks';
import type { Phase } from './App';
import { animationMs } from '../utils/animationTiming';

interface Props {
  phase: Phase;
  track: Track;
  onStart: () => void;
}

function cascade(phase: Phase, index: number, total = 3): CSSProperties {
  if (phase === 'idle') return {};
  if (phase === 'enter') return { opacity: 0, animation: `cascade-in ${animationMs(500)} ease ${animationMs(index * 150)} forwards` };
  return { animation: `cascade-out ${animationMs(333)} ease ${animationMs((total - 1 - index) * 100)} forwards` };
}

export function TrackIntroScreen({ phase, track, onStart }: Props) {
  return (
    <div className="min-h-[calc(100vh-var(--topbar-h))] flex items-center justify-center overflow-x-hidden px-6 pt-0 pb-10 lg:overflow-x-visible">
      <div className="w-full max-w-[87.50vw]">
        <div className="w-full lg:w-[40%] min-h-[calc(100vh-var(--topbar-h)-40px)] md:min-h-[750px] lg:min-h-[clamp(650px,calc(100vh-var(--topbar-h)-2.5rem),750px)] flex flex-col">
          <h1 className="text-[22px] leading-[28px] font-bold mb-[30px] text-left uppercase text-white md:text-[30px] md:leading-[36px] md:mb-[50px] lg:hidden" style={cascade(phase, 0, 4)}>
            {track.name}
          </h1>
          <h1 className="mb-[50px] hidden text-left text-[30px] font-bold uppercase leading-[36px] text-white lg:block" style={phase === 'exit' ? {} : cascade(phase, 0, 4)}>
            {track.name}
          </h1>
          <div className="max-w-[620px] text-[16px] leading-[22px] md:text-[20px] md:leading-[28px] text-left mb-0 lg:mb-[92px] text-white flex flex-col gap-4" style={{ fontFamily: "'Inter', sans-serif", ...cascade(phase, 1, 4) }}>
            {track.intro.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
          <div className="flex-1 lg:hidden" />
          <div className={`relative my-0 w-[120vw] -translate-x-1/2 overflow-hidden lg:hidden ${track.id === 'telco' ? 'left-[calc(50%-20px)]' : track.id === 'digital-banks' || track.id === 'banks' || track.id === 'remittance' ? 'left-[calc(50%-10px)]' : 'left-1/2'}`}>
            <img
              src={`/img/buildings/building${tracks.findIndex(t => t.id === track.id)}.png`}
              alt=""
              className="w-full h-auto object-contain"
              style={phase === 'idle' ? {} : phase === 'enter' ? { opacity: 0, animation: `city-in ${animationMs(500)} ease ${animationMs(300)} forwards` } : { animation: `city-out ${animationMs(333)} ease ${animationMs(100)} forwards` }}
              draggable={false}
            />
          </div>
          <div className="mt-[10px] flex justify-center lg:mt-0 lg:justify-start" style={cascade(phase, 3, 4)}>
            <button
              onClick={onStart}
              className="group flex h-[44px] w-auto items-center justify-center gap-[10px] rounded-[29px] border-2 border-white bg-transparent px-[25px] text-[16px] font-normal text-white transition-all active:!border-white active:!bg-transparent active:!text-white md:h-[66px] md:w-[212px] md:gap-6 md:rounded-[33px] md:px-0 md:text-[24px] md:font-semibold lg:border-4 lg:border-[#773cf5] lg:text-[#773cf5]"
              style={{ fontFamily: "'Inter', sans-serif", lineHeight: 1 }}
            >
              Let's go
              <svg className="h-[22px] w-[22px] shrink-0 transition-transform duration-200 ease-out group-hover:translate-x-[10px] md:h-6 md:w-6" viewBox="0 0 26 24" fill="none" aria-hidden="true">
                <path className="stroke-[2px] lg:stroke-[4px]" d="M2 12H22M14 4L22 12L14 20" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
          <div className="flex-1 lg:hidden" />
        </div>
      </div>
    </div>
  );
}
