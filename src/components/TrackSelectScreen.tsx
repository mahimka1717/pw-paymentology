import { useEffect, useRef, useState } from 'react';
import { tracks } from '../data/tracks';

import type { Phase } from './App';
import type { CSSProperties } from 'react';

interface Props {
  phase: Phase;
  onSelect: (trackId: string) => void;
}

function cascade(phase: Phase, index: number, total = 3): CSSProperties {
  if (phase === 'idle') return {};
  if (phase === 'enter') return { opacity: 0, animation: `cascade-in 500ms ease ${index * 150}ms forwards` };
  return { animation: `cascade-out 333ms ease ${(total - 1 - index) * 100}ms forwards` };
}

export function TrackSelectScreen({ phase, onSelect }: Props) {
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
    <div className="min-h-[calc(100vh-var(--topbar-h))] flex items-center px-6 pt-0 pb-10">
      <div className="mx-auto flex w-full max-w-[83.33vw] flex-col gap-10 lg:flex-row lg:items-start lg:gap-12">
        <div className="w-full lg:w-1/2 md:min-h-[750px]">
          <h1 className="text-[22px] leading-[28px] md:text-[30px] md:leading-[36px] font-bold mb-[30px] md:mb-[50px] text-left uppercase" style={cascade(phase, 0, 4)}>
            Issuer's Playbook
          </h1>
          <p className="text-[16px] leading-[22px] md:text-[20px] md:leading-[28px] text-left mb-[30px] md:mb-[50px]" style={cascade(phase, 1, 4)}>
            This scenario-based gameplay transforms the complexities of next-generation issuer processing
            into a fast, engaging experience. Choose your track and make pivotal decisions on launch, risk,
            growth, and expansion — every move shapes the outcome.
          </p>
          <div ref={dropdownRef} className="mt-6 relative w-full max-w-[320px]" style={cascade(phase, 2, 4)}>
            <button
              type="button"
              className="relative z-30 h-12 w-full rounded-full bg-white px-5 pr-12 text-left text-black outline-none transition-colors"
              onClick={() => setIsDropdownOpen((prev) => !prev)}
              aria-haspopup="listbox"
              aria-expanded={isDropdownOpen}
            >
              {selectedTrackName}
            </button>
            <span
              className="pointer-events-none absolute right-5 top-1/2 z-30 h-0 w-0 -translate-y-1/2 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent border-t-black"
              aria-hidden="true"
            />
            {isDropdownOpen && (
              <div
                className="absolute top-full z-20 -mt-6 w-full overflow-hidden rounded-b-2xl pt-9 pb-3"
                style={{ background: window.innerWidth < 768
                  ? 'linear-gradient(to bottom, #BF97FF, rgba(148, 117, 198, 0.5))'
                  : 'linear-gradient(to bottom, #BF97FF, #9475C600)'
                }}
                role="listbox"
              >
                {tracks.map((track) => (
                  <button
                    key={track.id}
                    type="button"
                    className="dropdown-track-item block w-full px-5 text-left text-white uppercase transition-colors"
                    onClick={() => handleTrackSelect(track.id, track.name)}
                  >
                    {track.name}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="mt-[50px] md:hidden" style={phase === 'idle' ? {} : phase === 'enter' ? { opacity: 0, animation: 'city-in 500ms ease 450ms forwards' } : { animation: 'city-out 333ms ease forwards' }}>
            <img
              src="/img/city.png"
              alt=""
              className="w-full h-auto object-contain"
              draggable={false}
            />
          </div>
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
