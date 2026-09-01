import { useEffect, useRef, useState } from 'react';

export function TopBar() {
  const [backHovered, setBackHovered] = useState(false);
  const [backPressed, setBackPressed] = useState(false);
  const [touchLabelOpen, setTouchLabelOpen] = useState(false);
  const [logoHovered, setLogoHovered] = useState(false);
  const [logoPressed, setLogoPressed] = useState(false);
  const [touchHomeLabelOpen, setTouchHomeLabelOpen] = useState(false);
  const backControlRef = useRef<HTMLDivElement>(null);
  const homeControlRef = useRef<HTMLDivElement>(null);
  const lastPointerTypeRef = useRef('mouse');
  const lastHomePointerTypeRef = useRef('mouse');

  const backColor = backPressed ? '#A586FF' : 'white';
  const logoFill = logoPressed ? '#A586FF' : logoHovered ? '#D2AFFE' : 'white';
  const showBackLabel = backHovered || touchLabelOpen;
  const showHomeLabel = logoHovered || touchHomeLabelOpen;

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

  useEffect(() => {
    if (!touchHomeLabelOpen) return;

    const timeout = setTimeout(() => setTouchHomeLabelOpen(false), 15000);
    const closeOnOutsidePointer = (event: PointerEvent) => {
      if (!homeControlRef.current?.contains(event.target as Node)) {
        setTouchHomeLabelOpen(false);
      }
    };
    const closeOnScroll = () => setTouchHomeLabelOpen(false);

    document.addEventListener('pointerdown', closeOnOutsidePointer);
    window.addEventListener('scroll', closeOnScroll, { passive: true, capture: true });
    return () => {
      clearTimeout(timeout);
      document.removeEventListener('pointerdown', closeOnOutsidePointer);
      window.removeEventListener('scroll', closeOnScroll, true);
    };
  }, [touchHomeLabelOpen]);

  const reloadPage = () => window.location.reload();

  const handleBackClick = () => {
    const isTouchInteraction = lastPointerTypeRef.current !== 'mouse'
      || window.matchMedia('(hover: none), (pointer: coarse)').matches;

    if (isTouchInteraction) {
      setTouchLabelOpen((open) => !open);
      return;
    }

    reloadPage();
  };

  const handleHomeClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const isTouchInteraction = lastHomePointerTypeRef.current !== 'mouse'
      || window.matchMedia('(hover: none), (pointer: coarse)').matches;

    if (isTouchInteraction && !touchHomeLabelOpen) {
      event.preventDefault();
      setTouchHomeLabelOpen(true);
    }
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
          aria-label="Play again"
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
            className="topbar-back-icon block h-[22px] w-[22px]"
            viewBox="0 0 49 49"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M39.5 17.5A17 17 0 1 0 40.8 29"
              stroke={backColor}
              strokeWidth="4"
              strokeLinecap="round"
            />
            <path d="M39.5 8.5V17.5H30.5" stroke={backColor} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        {showBackLabel && (
          <button
            type="button"
            className="animate-fade-in whitespace-nowrap border-0 bg-transparent p-0 text-sm"
            style={{ color: backColor, fontWeight: 900 }}
            onClick={reloadPage}
          >
            Play again
          </button>
        )}
      </div>

      {/* Home link */}
      <div
        ref={homeControlRef}
        className="flex items-center gap-3"
        onPointerEnter={(event) => {
          if (event.pointerType === 'mouse') setLogoHovered(true);
        }}
        onPointerLeave={(event) => {
          if (event.pointerType === 'mouse') setLogoHovered(false);
          setLogoPressed(false);
        }}
      >
        {showHomeLabel && (
          <span
            className="animate-fade-in whitespace-nowrap text-sm"
            style={{ color: logoFill, fontWeight: 900 }}
          >
            Return to The Issuer Academy
          </span>
        )}
        <a
          href="https://www.paymentology.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Return to The Issuer Academy"
          onPointerDown={(event) => {
            lastHomePointerTypeRef.current = event.pointerType;
            setLogoPressed(true);
          }}
          onPointerUp={() => setLogoPressed(false)}
          onPointerCancel={() => setLogoPressed(false)}
          onClick={handleHomeClick}
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
        </a>
      </div>
    </div>
  );
}
