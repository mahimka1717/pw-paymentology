import { useEffect, useRef, useState } from 'react';
import { tracks } from '../data/tracks';
import { InteractiveCity } from './InteractiveCity';
import { animationMs } from '../utils/animationTiming';

import type { Phase } from './App';
import type { CSSProperties, KeyboardEvent } from 'react';

interface Props {
  phase: Phase;
  hoveredTrackId: string | null;
  onHoverTrack: (trackId: string | null) => void;
  onSelect: (trackId: string) => void;
}

function cascade(phase: Phase, index: number, total = 3): CSSProperties {
  if (phase === 'idle') return {};
  if (phase === 'enter') return { opacity: 0, animation: `cascade-in ${animationMs(500)} ease ${animationMs(index * 150)} forwards` };
  return { animation: `cascade-out ${animationMs(333)} ease ${animationMs((total - 1 - index) * 100)} forwards` };
}

export function TrackSelectScreen({ phase, hoveredTrackId, onHoverTrack, onSelect }: Props) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedTrackName, setSelectedTrackName] = useState('Select your track');
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const selectButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!dropdownRef.current) return;
      if (!dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleTrackSelect = (trackId: string, trackName: string) => {
    setSelectedTrackName(trackName);
    setIsDropdownOpen(false);
    onSelect(trackId);
  };

  const focusTrackOption = (index: number) => {
    setTimeout(() => {
      const options = dropdownRef.current?.querySelectorAll<HTMLButtonElement>('[role="option"]');
      options?.[index]?.focus();
    }, 0);
  };

  const handleSelectKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;

    event.preventDefault();
    setIsDropdownOpen(true);
    focusTrackOption(event.key === 'ArrowDown' ? 0 : tracks.length - 1);
  };

  const handleOptionsKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const options = Array.from(event.currentTarget.querySelectorAll<HTMLButtonElement>('[role="option"]'));
    const currentIndex = options.indexOf(document.activeElement as HTMLButtonElement);

    if (event.key === 'Escape') {
      event.preventDefault();
      setIsDropdownOpen(false);
      selectButtonRef.current?.focus();
      return;
    }

    if (currentIndex === -1) return;

    let nextIndex: number | null = null;
    if (event.key === 'ArrowDown') nextIndex = (currentIndex + 1) % options.length;
    if (event.key === 'ArrowUp') nextIndex = (currentIndex - 1 + options.length) % options.length;
    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = options.length - 1;

    if (nextIndex !== null) {
      event.preventDefault();
      options[nextIndex].focus();
    }
  };

  return (
    <div className="min-h-[calc(100vh-var(--topbar-h))] flex items-stretch overflow-x-hidden px-6 pt-0 lg:items-center lg:pb-10">
      <div
        className="city fixed left-1/2 top-1/2 z-20 hidden transition-all ease-in-out lg:block"
        style={{
          transitionDuration: animationMs(700),
          width: 'clamp(380px, calc(71.6253vw - 353.358px), 900px)',
          transformOrigin: 'center center',
          opacity: phase === 'exit' ? 0 : 1,
          transform: phase === 'exit'
            ? 'translate(calc(-50% + 242px), calc(-50% + clamp(95px, calc(16.6667vh - 35px), 145px))) scale(1.4)'
            : 'translate(calc(-50% + 242px), calc(-50% + clamp(95px, calc(16.6667vh - 35px), 145px))) scale(1)',
        }}
      >
        <InteractiveCity
          hoveredTrackId={hoveredTrackId}
          onHoverTrack={onHoverTrack}
          onSelectTrack={onSelect}
          className="w-full"
        />
      </div>

      <div className="mx-auto flex w-full max-w-[87.50vw] flex-col gap-10 lg:flex-row lg:items-start lg:gap-12">
        <div className="w-full lg:w-1/2 md:min-h-[750px] lg:min-h-[clamp(550px,calc(100vh-var(--topbar-h)-2.5rem),750px)] flex-1 lg:flex-none flex flex-col lg:block">
          <h1 className="text-[22px] leading-[28px] md:text-[30px] md:leading-[36px] font-bold mb-[20px] md:mb-[50px] text-left uppercase" style={cascade(phase, 0, 4)}>
            Issuer's Playbook
          </h1>
          <p className="text-[16px] leading-[22px] md:text-[20px] md:leading-[28px] text-left mb-[30px] md:mb-[70px]" style={{ fontFamily: "'Inter', sans-serif", ...cascade(phase, 1, 4) }}>
            This scenario-based gameplay transforms the complexities of next-generation issuer processing
            into a fast, engaging experience. Choose your track and make pivotal decisions on launch, risk,
            growth, and expansion. Every move shapes the outcome.
          </p>
          <div className="flex-1 lg:hidden" />
          <div ref={dropdownRef} className="relative z-30 order-2 mt-[60px] w-[94%] max-w-[300px] md:w-full md:max-w-[320px] lg:order-none lg:mt-0" style={cascade(phase, 2, 4)}>
            <button
              ref={selectButtonRef}
              type="button"
              className="relative z-30 h-12 w-full rounded-full bg-white px-5 pr-12 text-left text-[18px] text-black outline-none transition-[background-color,box-shadow,transform] duration-200 hover:scale-[1.025] hover:bg-[#D2AFFE] hover:shadow-[0_8px_24px_rgba(21,21,74,0.28)] active:scale-[0.985] md:text-[20px]"
              style={{ fontFamily: "'Inter', sans-serif" }}
              onClick={() => setIsDropdownOpen((prev) => !prev)}
              onKeyDown={handleSelectKeyDown}
              aria-haspopup="listbox"
              aria-expanded={isDropdownOpen}
            >
              {selectedTrackName}
            </button>
            <span
              className="track-select-arrow pointer-events-none absolute right-7 top-1/2 z-30 h-0 w-0 border-l-[9px] border-r-[9px] border-t-[12px] border-l-transparent border-r-transparent border-t-black"
              data-open={isDropdownOpen}
              aria-hidden="true"
            />
            {isDropdownOpen && (
              <div
                className="absolute bottom-[calc(100%+10px)] z-20 w-full overflow-hidden rounded-[24px] py-3 lg:bottom-auto lg:top-[calc(100%+10px)]"
                style={{ background: '#703ff5' }}
                role="listbox"
                onKeyDown={handleOptionsKeyDown}
              >
                {tracks.map((track) => (
                  <button
                    key={track.id}
                    type="button"
                    role="option"
                    aria-selected={selectedTrackName === track.name}
                    className={`dropdown-track-item block w-full px-5 text-left text-white uppercase transition-colors ${hoveredTrackId === track.id ? 'is-highlighted' : ''}`}
                    onMouseEnter={() => onHoverTrack(track.id)}
                    onMouseLeave={() => onHoverTrack(null)}
                    onFocus={() => onHoverTrack(track.id)}
                    onBlur={() => onHoverTrack(null)}
                    onClick={() => handleTrackSelect(track.id, track.name)}
                  >
                    {track.name}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="relative left-1/2 order-1 w-screen -translate-x-1/2 md:left-auto md:mx-auto md:w-[85%] md:translate-x-0 lg:hidden" style={phase === 'exit' ? { animation: `mobile-city-out ${animationMs(333)} ease forwards` } : {}}>
            <InteractiveCity
              hoveredTrackId={hoveredTrackId}
              onHoverTrack={onHoverTrack}
              onSelectTrack={onSelect}
              className="w-full"
            />
          </div>
          <div className="order-3 flex-1 lg:hidden" />
        </div>

        <div className="w-full lg:w-1/2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            {/* {tracks.map((track) => {
              const Icon = trackIcons[track.id];
              return (
                <button
                  key={track.id}
                  onClick={() => onSelect(track.id)}
                  className="group bg-gray-900 hover:bg-gray-800 border border-gray-800 hover:border-indigo-500/50 rounded-xl p-6 text-left transition-all duration-200 hover:shadow-lg hover:shadow-indigo-500/10"
                >
                  <div className="text-indigo-400 group-hover:text-indigo-300 transition-colors mb-3">
                    <Icon className="w-12 h-12" />
                  </div>
                  <h3 className="text-lg font-semibold text-white group-hover:text-indigo-300 transition-colors">
                    {track.name}
                  </h3>
                </button>
              );
            })} */}
          </div>
        </div>
      </div>
    </div>
  );
}
