import type { CSSProperties } from 'react';
import { Track, tracks } from '../data/tracks';
import type { Phase } from './App';

interface Props {
  phase: Phase;
  track: Track;
  onStart: () => void;
}

function cascade(phase: Phase, index: number, total = 3): CSSProperties {
  if (phase === 'idle') return {};
  if (phase === 'enter') return { opacity: 0, animation: `cascade-in 500ms ease ${index * 150}ms forwards` };
  return { animation: `cascade-out 333ms ease ${(total - 1 - index) * 100}ms forwards` };
}

export function TrackIntroScreen({ phase, track, onStart }: Props) {
  return (
    <div className="min-h-[calc(100vh-var(--topbar-h))] flex items-center justify-center px-6 pt-0 pb-10">
      <div className="w-full max-w-[87.50vw]">
        <div className="w-full lg:w-[40%] min-h-[calc(100vh-var(--topbar-h)-40px)] md:min-h-[750px] lg:min-h-[min(750px,calc(100vh-var(--topbar-h)-2.5rem))] flex flex-col">
          <h1 className="text-[22px] leading-[28px] md:text-[30px] md:leading-[36px] font-bold mb-[30px] md:mb-[50px] text-left uppercase text-white" style={cascade(phase, 0, 4)}>
            {track.name}
          </h1>
          <div className="max-w-[620px] text-[16px] leading-[22px] md:text-[20px] md:leading-[28px] text-left mb-0 lg:mb-[92px] text-white flex flex-col gap-4" style={{ fontFamily: "'Inter', sans-serif", ...cascade(phase, 1, 4) }}>
            {track.intro.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
          <div className="flex-1 lg:hidden" />
          <div className="lg:hidden my-0 overflow-hidden" style={phase === 'idle' ? {} : phase === 'enter' ? { opacity: 0, animation: 'city-in 500ms ease 300ms forwards' } : { animation: 'city-out 333ms ease 100ms forwards' }}>
            <img
              src={`/img/buildings/building${tracks.findIndex(t => t.id === track.id)}.png`}
              alt=""
              className="w-full h-auto object-contain scale-[1.4] -translate-x-[10%] -translate-y-[10%]"
              draggable={false}
            />
          </div>
          <div className="flex justify-start" style={cascade(phase, 3, 4)}>
            <button
              onClick={onStart}
              className="group flex h-[66px] w-[212px] items-center justify-center gap-6 rounded-[33px] border-4 border-[#773cf5] bg-transparent text-[22px] text-[#773cf5] transition-all active:!border-white active:!bg-transparent active:!text-white md:text-[24px]"
              style={{ fontFamily: "'Inter', sans-serif", lineHeight: 1, fontWeight: 600 }}
            >
              Let's go
              <svg className="h-6 w-6 shrink-0 transition-transform duration-200 ease-out group-hover:translate-x-[10px]" viewBox="0 0 26 24" fill="none" aria-hidden="true">
                <path d="M2 12H22M14 4L22 12L14 20" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
          <div className="flex-1 lg:hidden" />
        </div>
      </div>
    </div>
  );
}
