import { Track } from '../data/tracks';
import { trackIcons } from '../assets/trackIcons';

interface Props {
  track: Track;
  scenarioIndex: number;
  totalScenarios: number;
}

export function TrackSidebar({ track, scenarioIndex, totalScenarios }: Props) {
  const Icon = trackIcons[track.id];

  return (
    <div className="flex flex-col items-center justify-center text-center p-6 h-full space-y-6">
      <h2 className="text-2xl font-bold text-indigo-950">{track.name}</h2>
      <p className="text-base text-indigo-950 leading-relaxed line-clamp-4">
        {track.intro}
      </p>
      <div className="text-indigo-950 mt-8">
        <Icon className="w-44 h-44" />
      </div>
      <div className="flex gap-1.5 mt-4">
        {Array.from({ length: totalScenarios }).map((_, i) => (
          <div
            key={i}
            className={`w-2.5 h-2.5 rounded-full transition-colors ${
              i < scenarioIndex
                ? 'bg-indigo-500'
                : i === scenarioIndex
                  ? 'bg-indigo-400 ring-2 ring-indigo-400/30'
                  : 'bg-gray-700'
            }`}
          />
        ))}
      </div>
      <span className="text-xs text-gray-500">
        {scenarioIndex + 1} / {totalScenarios}
      </span>
    </div>
  );
}
