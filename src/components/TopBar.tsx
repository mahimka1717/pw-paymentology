import { useEffect, useRef, useState } from 'react';

export function TopBar() {
  const [backHovered, setBackHovered] = useState(false);
  const [backPressed, setBackPressed] = useState(false);
  const [touchLabelOpen, setTouchLabelOpen] = useState(false);
  const [logoHovered, setLogoHovered] = useState(false);
  const [logoPressed, setLogoPressed] = useState(false);
  const backControlRef = useRef<HTMLDivElement>(null);
  const lastPointerTypeRef = useRef('mouse');

  const backColor = backPressed ? '#A586FF' : 'white';
  const logoFill = logoPressed ? '#A586FF' : logoHovered ? '#D2AFFE' : 'white';
  const showBackLabel = backHovered || touchLabelOpen;

  useEffect(() => {
    if (!touchLabelOpen) return;

    const timeout = setTimeout(() => setTouchLabelOpen(false), 15000);
    const closeOnOutsidePointer = (event: PointerEvent) => {
      if (!backControlRef.current?.contains(event.target as Node)) {
        setTouchLabelOpen(false);
      }
    };
    const closeOnScroll = () => setTouchLabelOpen(false);

    document.addEventListener('pointerdown', closeOnOutsidePointer);
    window.addEventListener('scroll', closeOnScroll, { passive: true, capture: true });
    return () => {
      clearTimeout(timeout);
      document.removeEventListener('pointerdown', closeOnOutsidePointer);
      window.removeEventListener('scroll', closeOnScroll, true);
    };
  }, [touchLabelOpen]);

  const navigateBack = () => {
    window.location.href = '/';
  };

  const handleBackClick = () => {
    const isTouchInteraction = lastPointerTypeRef.current !== 'mouse'
      || window.matchMedia('(hover: none), (pointer: coarse)').matches;

    if (isTouchInteraction) {
      setTouchLabelOpen((open) => !open);
      return;
    }

    navigateBack();
  };

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-4 lg:px-14 lg:py-[var(--topbar-padding-y)] lg:bg-transparent"
      style={{ background: 'linear-gradient(to bottom, rgba(10,10,10,0.8), rgba(10,10,10,0))' }}
    >
      {/* Back button */}
      <div
        ref={backControlRef}
        className="flex items-center gap-3 bg-transparent border-0 outline-none p-0 cursor-pointer"
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
          aria-label="Show return link"
          aria-expanded={touchLabelOpen}
          onPointerDown={(event) => {
            lastPointerTypeRef.current = event.pointerType;
            if (event.pointerType !== 'mouse') setBackHovered(false);
            setBackPressed(true);
          }}
          onPointerUp={() => setBackPressed(false)}
          onPointerCancel={() => setBackPressed(false)}
          onClick={handleBackClick}
        >
          <svg
            className="block h-7 w-7 lg:h-12 lg:w-12"
            viewBox="0 0 49 49"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="24.3" cy="24.3" r="21.8" stroke={backColor} strokeWidth="5" />
            <circle
              cx="24.3"
              cy="24.3"
              r="4.94"
              fill={backColor}
              style={{
                transformBox: 'fill-box',
                transformOrigin: 'center',
                transform: showBackLabel ? 'scale(3.24)' : 'scale(1)',
                transition: 'transform 0.25s ease',
              }}
            />
          </svg>
        </button>
        {showBackLabel && (
          <button
            type="button"
            className="animate-fade-in whitespace-nowrap border-0 bg-transparent p-0 text-sm"
            style={{ color: backColor, fontWeight: 900 }}
            onClick={navigateBack}
          >
            Return to The Issuer Academy
          </button>
        )}
      </div>

      {/* Logo link */}
      <a
        href="https://www.paymentology.com"
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setLogoHovered(true)}
        onMouseLeave={() => { setLogoHovered(false); setLogoPressed(false); }}
        onMouseDown={() => setLogoPressed(true)}
        onMouseUp={() => setLogoPressed(false)}
      >
        <svg
          className="w-7 h-7 lg:w-[38px] lg:h-10"
          viewBox="0 0 61 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ fill: logoFill, transition: 'fill 0.15s ease' }}
        >
          <path d="M58.15 0.0400085H31.03C29.8 0.0400085 28.64 0.510005 27.77 1.38L1.34 27.84C0.469996 28.71 0 29.87 0 31.06V61.29C0 62.05 0.430004 62.7 1.16 63.03C1.41 63.14 1.63 63.17 1.88 63.17C2.35 63.17 2.81999 62.99 3.17999 62.63L15.89 49.89H40.65C51.73 49.89 60.78 40.88 60.78 29.76V2.64001C60.78 1.19001 59.59 0 58.14 0V0.0400085H58.15ZM43.93 16.33C44.22 16.33 44.47 16.58 44.47 16.87V33.05C44.47 33.34 44.22 33.59 43.93 33.59H16.85C16.56 33.59 16.31 33.34 16.31 33.05V16.87C16.31 16.58 16.56 16.33 16.85 16.33H43.97H43.93Z" />
        </svg>
      </a>
    </div>
  );
}
