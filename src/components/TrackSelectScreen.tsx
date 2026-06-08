import { useEffect, useRef, useState } from 'react';
import { tracks } from '../data/tracks';
import { trackIcons } from '../assets/trackIcons';

interface Props {
  onSelect: (trackId: string) => void;
}

export function TrackSelectScreen({ onSelect }: Props) {
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
        <div className="w-full lg:w-1/2 min-h-[750px]">
          <h1 className="text-[30px] leading-[36px] font-bold mb-[50px] text-left uppercase">
            Issuer's Playbook
          </h1>
          <p className="text-[20px] leading-[28px] text-left mb-[50px]">
            This scenario-based gameplay transforms the complexities of next-generation issuer processing
            into a fast, engaging experience. Choose your track and make pivotal decisions on launch, risk,
            growth, and expansion — every move shapes the outcome.
          </p>
          <div ref={dropdownRef} className="mt-6 relative w-full max-w-[320px]">
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
                style={{ background: 'linear-gradient(to bottom, #BF97FF, #9475C600)' }}
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
