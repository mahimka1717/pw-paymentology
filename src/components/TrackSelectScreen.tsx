import { tracks } from '../data/tracks';
import { trackIcons } from '../assets/trackIcons';

interface Props {
  onSelect: (trackId: string) => void;
}

export function TrackSelectScreen({ onSelect }: Props) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <div className="max-w-4xl w-full text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-indigo-950">
          The Issuer's Edge
        </h1>
        <p className="text-lg text-indigo-950 max-w-2xl mx-auto">
          This scenario-based gameplay transforms the complexities of next-generation issuer processing
          into a fast, engaging experience. Choose your track and make pivotal decisions on launch, risk,
          growth, and expansion — every move shapes the outcome.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-3xl w-full">
        {tracks.map((track) => {
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
        })}
      </div>
    </div>
  );
}
