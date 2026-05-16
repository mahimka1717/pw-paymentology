interface Props {
  title: string;
  description: string;
  optionId: 'A' | 'B' | 'C';
  selected: boolean;
  disabled: boolean;
  onSelect: () => void;
}

export function OptionCard({ title, description, optionId, selected, disabled, onSelect }: Props) {
  return (
    <button
      onClick={onSelect}
      disabled={disabled}
      className={`relative flex flex-col text-left p-3 rounded-xl border-2 transition-all duration-200 ${
        selected
          ? 'border-indigo-500 bg-white shadow-lg shadow-indigo-500/20'
          : disabled
            ? 'border-gray-200 bg-white/50 opacity-50 cursor-not-allowed'
            : 'border-gray-200 bg-white hover:border-indigo-300 hover:shadow-md cursor-pointer'
      }`}
    >
      <span className="text-xs font-bold text-indigo-600 mb-1">OPTION {optionId}</span>
      <h4 className="text-sm font-semibold text-gray-900 mb-1">{title}</h4>
      <p className="text-xs text-gray-600 leading-relaxed">{description}</p>
    </button>
  );
}
