import { Track } from '../data/tracks';
import { trackIcons } from '../assets/trackIcons';

interface Props {
  track: Track;
  onStart: () => void;
}

export function TrackIntroScreen({ track, onStart }: Props) {
  const Icon = trackIcons[track.id];

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="max-w-xl w-full text-center">
        <div className="text-indigo-400 flex justify-center mb-6">
          <Icon className="w-32 h-32" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-indigo-950">
          {track.name}
        </h1>
        <p className="text-indigo-950 text-lg mb-8 leading-relaxed">
          {track.intro}
        </p>
        <button
          onClick={onStart}
          className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg transition-colors text-lg"
        >
          Let's Go
        </button>
      </div>
    </div>
  );
}
