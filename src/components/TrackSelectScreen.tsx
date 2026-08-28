import { useEffect, useRef, useState } from 'react';
import { tracks } from '../data/tracks';
import { InteractiveCity } from './InteractiveCity';

import type { Phase } from './App';
import type { CSSProperties } from 'react';

interface Props {
  phase: Phase;
  hoveredTrackId: string | null;
  onHoverTrack: (trackId: string | null) => void;
  onSelect: (trackId: string) => void;
}

function cascade(phase: Phase, index: number, total = 3): CSSProperties {
  if (phase === 'idle') return {};
  if (phase === 'enter') return { opacity: 0, animation: `cascade-in 500ms ease ${index * 150}ms forwards` };
  return { animation: `cascade-out 333ms ease ${(total - 1 - index) * 100}ms forwards` };
}

export function TrackSelectScreen({ phase, hoveredTrackId, onHoverTrack, onSelect }: Props) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedTrackName, setSelectedTrackName] = useState('Select your track');
  const dropdownRef = useRef<HTMLDivElement | null>(null);

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

  return (
    <div className="min-h-[calc(100vh-var(--topbar-h))] flex items-stretch px-6 pt-0 pb-10">
      <div
        className="city fixed left-1/2 top-1/2 z-20 hidden transition-all duration-700 ease-in-out lg:block"
        style={{
          width: '900px',
          transformOrigin: 'center center',
          opacity: phase === 'exit' ? 0 : 1,
          transform: phase === 'exit'
            ? 'translate(calc(-50% + 242px), calc(-50% + 145px)) scale(1.4)'
            : 'translate(calc(-50% + 242px), calc(-50% + 145px)) scale(1)',
        }}
      >
        <InteractiveCity
          hoveredTrackId={hoveredTrackId}
          onHoverTrack={onHoverTrack}
          onSelectTrack={onSelect}
          className="w-full"
        />
      </div>

      <div className="mx-auto mt-[65px] flex w-full max-w-[87.50vw] flex-col gap-10 lg:flex-row lg:items-start lg:gap-12">
        <div className="w-full lg:w-1/2 md:min-h-[750px] flex-1 lg:flex-none flex flex-col lg:block">
          <h1 className="text-[22px] leading-[28px] md:text-[30px] md:leading-[36px] font-bold mb-[30px] md:mb-[50px] text-left uppercase" style={cascade(phase, 0, 4)}>
            Issuer's Playbook
          </h1>
          <p className="text-[16px] leading-[22px] md:text-[20px] md:leading-[28px] text-left mb-[30px] md:mb-[70px]" style={{ fontFamily: "'Inter', sans-serif", ...cascade(phase, 1, 4) }}>
            This scenario-based gameplay transforms the complexities of next-generation issuer processing
            into a fast, engaging experience. Choose your track and make pivotal decisions on launch, risk,
            growth, and expansion. Every move shapes the outcome.
          </p>
          <div className="flex-1 lg:hidden" />
          <div ref={dropdownRef} className="relative z-30 w-full max-w-[320px]" style={cascade(phase, 2, 4)}>
            <button
              type="button"
              className="relative z-30 h-12 w-full rounded-full bg-white px-5 pr-12 text-left text-[20px] text-black outline-none transition-colors"
              style={{ fontFamily: "'Inter', sans-serif" }}
              onClick={() => setIsDropdownOpen((prev) => !prev)}
              aria-haspopup="listbox"
              aria-expanded={isDropdownOpen}
            >
              {selectedTrackName}
            </button>
            <span
              className={`pointer-events-none absolute right-7 top-1/2 z-30 h-0 w-0 -translate-y-1/2 border-l-[9px] border-r-[9px] border-t-[12px] border-l-transparent border-r-transparent border-t-black ${isDropdownOpen ? 'rotate-180' : 'rotate-0'}`}
              aria-hidden="true"
            />
            {isDropdownOpen && (
              <div
                className="absolute top-[calc(100%+10px)] z-20 w-full overflow-hidden rounded-[24px] py-3"
                style={{ background: '#703ff5' }}
                role="listbox"
              >
                {tracks.map((track) => (
                  <button
                    key={track.id}
                    type="button"
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
          <div className="lg:hidden" style={phase === 'idle' ? {} : phase === 'enter' ? { opacity: 0, animation: 'city-in 500ms ease 450ms forwards' } : { animation: 'city-out 333ms ease forwards' }}>
            <InteractiveCity
              hoveredTrackId={hoveredTrackId}
              onHoverTrack={onHoverTrack}
              onSelectTrack={onSelect}
              className="w-full"
            />
          </div>
          <div className="flex-1 lg:hidden" />
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
