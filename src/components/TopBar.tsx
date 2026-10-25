import { useState } from 'react';

interface Props {
  showNavigation: boolean;
  onGoBack: () => void;
  onPlayAgain: () => void;
}

export function TopBar({ showNavigation, onGoBack, onPlayAgain }: Props) {
  const [backHovered, setBackHovered] = useState(false);
  const [backPressed, setBackPressed] = useState(false);
  const [logoHovered, setLogoHovered] = useState(false);
  const [logoPressed, setLogoPressed] = useState(false);

  const backColor = backPressed ? '#A586FF' : 'white';
  const logoFill = logoPressed ? '#A586FF' : logoHovered ? '#D2AFFE' : 'white';

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-4 lg:px-14 lg:py-[var(--topbar-padding-y)] lg:bg-transparent"
      style={{ background: 'linear-gradient(to bottom, rgba(10,10,10,0.8), rgba(10,10,10,0))' }}
    >
      {/* Back button */}
      <div
        className={`flex items-center gap-3 bg-transparent border-0 outline-none p-0 cursor-pointer transition-opacity duration-300 ${showNavigation ? 'opacity-100' : 'invisible opacity-0 pointer-events-none'}`}
        aria-hidden={!showNavigation}
        onPointerEnter={(event) => {
          if (event.pointerType === 'mouse') setBackHovered(true);
        }}
        onPointerLeave={(event) => {
          if (event.pointerType === 'mouse') setBackHovered(false);
          setBackPressed(false);
        }}
      >
        <button
          type="button"
          className="border-0 bg-transparent p-0"
          aria-label="Go back"
          onPointerDown={(event) => {
            if (event.pointerType !== 'mouse') setBackHovered(false);
            setBackPressed(true);
          }}
          onPointerUp={() => setBackPressed(false)}
          onPointerCancel={() => setBackPressed(false)}
          onClick={onGoBack}
        >
          <svg
            className="topbar-back-icon block h-[22px] w-[22px]"
            viewBox="0 0 49 49"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M42 24.5H8M21 11.5L8 24.5L21 37.5" stroke={backColor} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        {backHovered && (
          <button
            type="button"
            className="animate-fade-in whitespace-nowrap border-0 bg-transparent p-0 text-sm"
            style={{ color: backColor, fontWeight: 900 }}
            onClick={onGoBack}
          >
            Go back
          </button>
        )}
        </div>

      {/* Play again */}
      <div
        className={`flex items-center gap-3 transition-opacity duration-300 ${showNavigation ? 'opacity-100' : 'invisible opacity-0 pointer-events-none'}`}
        aria-hidden={!showNavigation}
        onPointerEnter={(event) => {
          if (event.pointerType === 'mouse') setLogoHovered(true);
        }}
        onPointerLeave={(event) => {
          if (event.pointerType === 'mouse') setLogoHovered(false);
          setLogoPressed(false);
        }}
      >
        {logoHovered && (
          <span
            className="animate-fade-in whitespace-nowrap text-sm"
            style={{ color: logoFill, fontWeight: 900 }}
          >
            Play again
          </span>
        )}
        <button
          type="button"
          className="border-0 bg-transparent p-0"
          aria-label="Play again"
          onPointerDown={() => {
            setLogoPressed(true);
          }}
          onPointerUp={() => setLogoPressed(false)}
          onPointerCancel={() => setLogoPressed(false)}
          onClick={onPlayAgain}
        >
          <svg
            className="topbar-logo-icon h-[27px] w-[27px]"
            viewBox="0 0 38 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ color: logoFill, transition: 'color 0.15s ease' }}
          >
            <path className="topbar-logo-path" d="M5 18L19 5L33 18V35H23V24H15V35H5V18Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
