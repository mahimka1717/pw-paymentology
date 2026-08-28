import type { CSSProperties } from 'react';
import { Score } from '../data/tracks';
import { outcomeDescriptions, Outcome, Style } from '../data/scoring';
import type { Phase } from './App';

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
  if (phase === 'enter') return { opacity: 0, animation: `cascade-in 500ms ease ${index * 150}ms forwards` };
  return { animation: `cascade-out 333ms ease ${(total - 1 - index) * 100}ms forwards` };
}

const outcomeImages: Record<Outcome, string> = {
  'Built to Scale': '/img/result/result0.jpg',
  'Fast but Fragile': '/img/result/result1.jpg',
  'Trusted Operator': '/img/result/result2.jpg',
  'Stuck in Neutral': '/img/result/result3.jpg',
};

const styleDescriptions: Record<Style, string> = {
  'Consistent Aggressive': 'You backed yourself early and kept pushing. The fact that trust and growth moved together under that kind of pace says something. You have good instincts for knowing when the model can take the pressure.',
  'Consistent Cautious': 'You earned this the patient way. Every move was considered before it was made, and the outcome reflects that discipline. Where others hoped the foundations would hold, you made sure they would.',
  'Situational': 'You knew which moments to push and which to protect. Not every opportunity was worth chasing, and you seemed to know the difference. That kind of read is harder to teach than most people admit.',
};

function StyleIcon({ style }: { style: Style }) {
  if (style === 'Consistent Aggressive') {
    return (
      <svg width="78" height="44" viewBox="0 0 78 44" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4.53003 43.9101C7.03188 43.9101 9.06 41.882 9.06 39.3801C9.06 36.8783 7.03188 34.8501 4.53003 34.8501C2.02818 34.8501 0 36.8783 0 39.3801C0 41.882 2.02818 43.9101 4.53003 43.9101Z" fill="white"/>
        <path d="M32.29 39.4101C34.7919 39.4101 36.8199 37.382 36.8199 34.8801C36.8199 32.3783 34.7919 30.3501 32.29 30.3501C29.7882 30.3501 27.76 32.3783 27.76 34.8801C27.76 37.382 29.7882 39.4101 32.29 39.4101Z" fill="white"/>
        <path d="M56.0601 26.81C58.5619 26.81 60.59 24.7818 60.59 22.28C60.59 19.7781 58.5619 17.75 56.0601 17.75C53.5582 17.75 51.53 19.7781 51.53 22.28C51.53 24.7818 53.5582 26.81 56.0601 26.81Z" fill="white"/>
        <path d="M72.6301 9.06C75.132 9.06 77.1602 7.03182 77.1602 4.52997C77.1602 2.02812 75.132 0 72.6301 0C70.1283 0 68.1001 2.02812 68.1001 4.52997C68.1001 7.03182 70.1283 9.06 72.6301 9.06Z" fill="white"/>
        <path d="M4.53003 39.1898L20.38 37.6098C38.04 35.8498 54.27 27.1098 65.47 13.3398L72.63 4.52979" stroke="white" strokeWidth="2" strokeMiterlimit="10"/>
      </svg>
    );
  }
  if (style === 'Situational') {
    return (
      <svg width="78" height="44" viewBox="0 0 78 44" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4.53003 43.9199C7.03188 43.9199 9.06 41.8917 9.06 39.3899C9.06 36.888 7.03188 34.8599 4.53003 34.8599C2.02818 34.8599 0 36.888 0 39.3899C0 41.8917 2.02818 43.9199 4.53003 43.9199Z" fill="white"/>
        <path d="M27.2297 26.4897C29.7315 26.4897 31.7597 24.4616 31.7597 21.9597C31.7597 19.4579 29.7315 17.4297 27.2297 17.4297C24.7278 17.4297 22.6997 19.4579 22.6997 21.9597C22.6997 24.4616 24.7278 26.4897 27.2297 26.4897Z" fill="white"/>
        <path d="M49.9299 32.2997C52.4318 32.2997 54.46 30.2716 54.46 27.7698C54.46 25.2679 52.4318 23.2397 49.9299 23.2397C47.4281 23.2397 45.3999 25.2679 45.3999 27.7698C45.3999 30.2716 47.4281 32.2997 49.9299 32.2997Z" fill="white"/>
        <path d="M72.6301 9.06C75.132 9.06 77.1602 7.03182 77.1602 4.52997C77.1602 2.02812 75.132 0 72.6301 0C70.1283 0 68.1001 2.02812 68.1001 4.52997C68.1001 7.03182 70.1283 9.06 72.6301 9.06Z" fill="white"/>
        <path d="M4.52979 39.3898L27.2297 21.9598L49.9298 27.7698L72.6298 4.52979" stroke="white" strokeWidth="2" strokeMiterlimit="10"/>
      </svg>
    );
  }
  // Consistent Cautious
  return (
    <svg width="78" height="10" viewBox="0 0 78 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4.53003 9.06C7.03188 9.06 9.06 7.03188 9.06 4.53003C9.06 2.02818 7.03188 0 4.53003 0C2.02818 0 0 2.02818 0 4.53003C0 7.03188 2.02818 9.06 4.53003 9.06Z" fill="white"/>
      <path d="M27.2302 9.06C29.732 9.06 31.7602 7.03188 31.7602 4.53003C31.7602 2.02818 29.732 0 27.2302 0C24.7283 0 22.7002 2.02818 22.7002 4.53003C22.7002 7.03188 24.7283 9.06 27.2302 9.06Z" fill="white"/>
      <path d="M49.9299 9.06C52.4318 9.06 54.46 7.03188 54.46 4.53003C54.46 2.02818 52.4318 0 49.9299 0C47.4281 0 45.3999 2.02818 45.3999 4.53003C45.3999 7.03188 47.4281 9.06 49.9299 9.06Z" fill="white"/>
      <path d="M72.6301 9.06C75.132 9.06 77.1602 7.03188 77.1602 4.53003C77.1602 2.02818 75.132 0 72.6301 0C70.1283 0 68.1001 2.02812 68.1001 4.52997C68.1001 7.03182 70.1283 9.06 72.6301 9.06Z" fill="white"/>
      <path d="M4.52979 4.52979H72.6298" stroke="white" strokeWidth="2" strokeMiterlimit="10"/>
    </svg>
  );
}

export function ResultScreen({ phase, outcome, style, onRestart }: Props) {
  return (
    <div className="min-h-[calc(100vh-var(--topbar-h))] flex items-center justify-center px-4 md:px-6 pt-0 pb-4 md:pb-10">
      <div className="w-full max-w-[87.50vw] flex flex-col gap-[16px] lg:gap-0">

        {/* Part 1 — Outcome box */}
        <div className="flex flex-col overflow-hidden rounded-[16px] lg:mr-[70px] lg:flex-row" style={{ boxShadow: '5px 5px 10px 0 rgba(0,0,0,0.20)', ...cascade(phase, 0) }}>
          {/* Left — image */}
          <div className="flex-shrink-0 w-full lg:w-[43%]">
            <img
              src={outcomeImages[outcome]}
              alt={outcome}
              className="w-full h-[180px] lg:h-full object-cover"
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
              className="text-[13px] leading-[17px] md:text-[30px] md:leading-[36px] mt-[16px] md:mt-[56px]"
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
                backgroundColor: '#ccb0f9',
                top: '20px',
                left: '-96px',
                transformOrigin: 'center center',
                ...(phase === 'enter'
                  ? { opacity: 0, animation: 'scale-in 500ms ease 300ms forwards' }
                  : phase === 'exit'
                    ? { animation: 'cascade-out 333ms ease forwards' }
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
                  backgroundColor: '#A586FF',
                  top: '-10px',
                  right: '-10px',
                  transformOrigin: 'center center',
                  ...(phase === 'enter'
                    ? { opacity: 0, animation: 'scale-in 500ms ease 300ms forwards' }
                    : phase === 'exit'
                      ? { animation: 'cascade-out 333ms ease forwards' }
                      : {}),
                }}
              >
                <div style={{ transform: 'scale(0.6)' }}>
                  <StyleIcon style={style} />
                </div>
              </div>
              <p
                className="uppercase"
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
                className="mt-[16px] text-[22px] leading-[28px] uppercase md:mt-[18px] md:text-[30px] md:leading-[36px]"
                style={{
                  fontFamily: "'PP Monument Extended'",
                  fontWeight: 900,
                }}
              >
                {style}
              </h2>
              <p
                className="text-[13px] leading-[16px] md:text-[17px] md:leading-[22px] mt-[20px] md:mt-[30px]"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 400,
                }}
              >
                {styleDescriptions[style]}
              </p>
            </div>
          </div>

          {/* Restart */}
          <div className="mt-4 flex justify-center lg:absolute lg:bottom-[78px] lg:left-0 lg:mt-0 lg:justify-start" style={{ zIndex: 10, ...(phase === 'enter' ? { opacity: 0, animation: 'cascade-in 500ms ease 300ms forwards' } : phase === 'exit' ? { animation: 'cascade-out 333ms ease forwards' } : {}) }}>
            <button
              onClick={onRestart}
              className="group flex h-[66px] w-[212px] items-center justify-center gap-6 rounded-[33px] border-4 border-white bg-transparent text-[22px] text-white transition-all active:scale-[1.2] active:!bg-[#773cf5] md:text-[24px]"
              style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, lineHeight: 1 }}
            >
              Play Again
              <svg className="h-6 w-6 shrink-0 transition-transform duration-200 ease-out group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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
