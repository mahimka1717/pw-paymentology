interface Props {
  feedback: string;
  optionTitle: string;
  onClose: () => void;
}

export function FeedbackPopup({ feedback, optionTitle, onClose }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={onClose}>
      <div
        className="bg-gray-900 border border-indigo-500/30 rounded-xl p-6 max-w-md mx-4 shadow-2xl animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg">📊</span>
          <h3 className="text-sm font-semibold text-indigo-400 uppercase tracking-wider">Instant Feedback</h3>
        </div>
        <p className="text-xs text-gray-500 mb-2">You chose: <span className="text-white font-medium">{optionTitle}</span></p>
        <p className="text-sm text-gray-300 leading-relaxed">{feedback}</p>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 text-sm bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors w-full"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
