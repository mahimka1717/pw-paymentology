import type { CSSProperties } from 'react';
import { Score } from '../data/tracks';
import { outcomeDescriptions, resultStyleCopy, Outcome, Style } from '../data/scoring';
import type { Phase } from './App';
import { animationMs } from '../utils/animationTiming';
import { asset } from '../utils/asset';

interface Props {
  phase: Phase;
  outcome: Outcome;
  style: Style;
  normalized: Score;
  totalScore: Score;
  trackName: string;
  onRestart: () => void;
}

function cascade(phase: Phase, index: number, total = 3): CSSProperties {
  if (phase === 'idle') return {};
  if (phase === 'enter') return { opacity: 0, animation: `cascade-in ${animationMs(500)} ease ${animationMs(index * 150)} forwards` };
  return { animation: `cascade-out ${animationMs(333)} ease ${animationMs((total - 1 - index) * 100)} forwards` };
}

const outcomeImages: Record<Outcome, string> = {
  'Built to Scale': asset('/img/result/result0.jpg'),
  'Fast but Fragile': asset('/img/result/result1.jpg'),
  'Trusted Operator': asset('/img/result/result2.jpg'),
  'Stuck in Neutral': asset('/img/result/result3.jpg'),
};

const styleIcons: Record<Style, string> = {
  Bold: asset('/img/result/1.svg'),
  Situational: asset('/img/result/2.svg'),
  Deliberate: asset('/img/result/3.svg'),
  Disciplined: asset('/img/result/4.svg'),
};

function StyleIcon({ style }: { style: Style }) {
  return <img src={styleIcons[style]} alt={style} style={{ width: '100%', height: '100%', display: 'block' }} />;
}

export function ResultScreen({ phase, outcome, style, onRestart }: Props) {
  return (
    <div className="min-h-[calc(100vh-var(--topbar-h))] flex items-center justify-center px-4 md:px-6 pt-0 pb-4 md:pb-10 lg:min-h-[920px]">
      <div className="w-full max-w-[87.50vw] md:max-w-[672px] flex flex-col gap-[16px] lg:max-w-[1680px] lg:gap-0">

        {/* Part 1 — Outcome box */}
        <div className="flex flex-col overflow-hidden rounded-[16px] lg:mr-[70px] lg:flex-row" style={{ boxShadow: '5px 5px 10px 0 rgba(0,0,0,0.20)', ...cascade(phase, 0) }}>
          {/* Left — image */}
          <div className="flex-shrink-0 w-full lg:w-[43%]">
            <img
              src={outcomeImages[outcome]}
              alt={outcome}
              className="h-[180px] w-full object-cover md:h-[260px] lg:h-full"
            />
          </div>
          {/* Right — text */}
          <div
            className="flex flex-col justify-center text-white p-[24px_20px_30px_20px] lg:p-[100px_120px_160px_60px]"
            style={{
              flex: 1,
              background: '#703ff5',
            }}
          >
            <h1
              className="text-[20px] leading-[26px] uppercase md:text-[40px] md:leading-[48px]"
              style={{
                fontFamily: "'PP Monument Extended'",
                fontWeight: 900,
              }}
            >
              {outcome}
            </h1>
            <p
              className="mt-[16px] text-[13px] leading-[17px] md:mt-[30px] md:text-[24px] md:leading-[30px] lg:mt-[56px] lg:text-[30px] lg:leading-[36px]"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 400,
              }}
            >
              {outcomeDescriptions[outcome]}
            </p>
          </div>
        </div>

        {/* Part 2 — Decision Style card */}
        <div className="relative mb-0 flex flex-col lg:mb-[-100px] lg:flex-row lg:justify-end" style={cascade(phase, 1)}>
          <div
            className="relative w-full lg:w-[720px] translate-y-0 lg:translate-x-[-17px] lg:-translate-y-[78px]"
          >
            {/* Style icon circle — desktop */}
            <div
              className="hidden lg:flex absolute items-center justify-center"
              style={{
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                boxShadow: '5px 5px 10px 0 rgba(0,0,0,0.20)',
                top: '20px',
                left: '-96px',
                transformOrigin: 'center center',
                ...(phase === 'enter'
                  ? { opacity: 0, animation: `scale-in ${animationMs(500)} ease ${animationMs(300)} forwards` }
                  : phase === 'exit'
                    ? { animation: `cascade-out ${animationMs(333)} ease forwards` }
                    : {}),
              }}
            >
              <StyleIcon style={style} />
            </div>

            {/* Card */}
            <div
              className="text-[#15154A] p-[20px] md:p-[30px_50px]"
              style={{
                background: '#FFFFFF',
                borderRadius: '16px',
                boxShadow: '5px 5px 10px 0 rgba(0,0,0,0.20)',
              }}
            >
              {/* Style icon — mobile */}
              <div
                className="flex lg:hidden absolute items-center justify-center"
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  top: '-10px',
                  right: '-10px',
                  transformOrigin: 'center center',
                  ...(phase === 'enter'
                    ? { opacity: 0, animation: `scale-in ${animationMs(500)} ease ${animationMs(300)} forwards` }
                    : phase === 'exit'
                      ? { animation: `cascade-out ${animationMs(333)} ease forwards` }
                      : {}),
                }}
              >
                <div style={{ transform: 'scale(0.6)' }}>
                  <StyleIcon style={style} />
                </div>
              </div>
              <p
                className="result-style-label uppercase"
                style={{
                  color: '#703ff5',
                  fontFamily: "'PP Monument Wide'",
                  fontWeight: 900,
                  fontSize: '14px',
                  lineHeight: '16px',
                  letterSpacing: '3px',
                }}
              >
                Your Decision Style
              </p>
              <h2
                className="result-style-title mt-[16px] text-[22px] leading-[28px] uppercase md:mt-[18px] md:text-[30px] md:leading-[36px]"
                style={{
                  fontFamily: "'PP Monument Extended'",
                  fontWeight: 900,
                }}
              >
                {style}
              </h2>
              <p
                className="result-style-copy text-[13px] leading-[16px] md:text-[17px] md:leading-[22px] mt-[20px] md:mt-[30px]"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 400,
                }}
              >
                {resultStyleCopy[outcome][style]}
              </p>
            </div>
          </div>

          {/* Restart */}
          <div className="mt-4 flex justify-center lg:absolute lg:bottom-[78px] lg:left-0 lg:mt-0 lg:justify-start" style={{ zIndex: 10, ...(phase === 'enter' ? { opacity: 0, animation: `cascade-in ${animationMs(500)} ease ${animationMs(300)} forwards` } : phase === 'exit' ? { animation: `cascade-out ${animationMs(333)} ease forwards` } : {}) }}>
            <button
              onClick={onRestart}
              className="result-restart-button group flex h-[44px] w-auto items-center justify-center gap-[10px] rounded-[33px] border-2 border-white bg-transparent px-[20px] text-[16px] font-normal text-white transition-all active:scale-[1.2] active:!bg-[#773cf5] md:h-[66px] md:w-[212px] md:text-[24px] md:font-semibold"
              style={{ fontFamily: "'Inter', sans-serif", lineHeight: 1, visibility: 'hidden' }}
            >
              Play Again
              <svg className="h-6 w-6 shrink-0 stroke-[2px] transition-transform duration-200 ease-out group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                <path d="M3 3v5h5" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
