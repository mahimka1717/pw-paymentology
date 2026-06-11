import { useState } from 'react';

interface Props {
  title: string;
  description: string;
  optionId: 'A' | 'B' | 'C';
  selected: boolean;
  disabled: boolean;
  accentColor: string;
  accentTextColor: string;
  onSelect: () => void;
  animDelay?: number;
}

export function OptionCard({ title, description, selected, disabled, accentColor, accentTextColor, onSelect, animDelay = 0 }: Props) {
  const [animDone, setAnimDone] = useState(false);

  return (
    <button
      onClick={onSelect}
      disabled={disabled}
      onAnimationEnd={() => setAnimDone(true)}
      className={`relative flex min-h-[80px] md:min-h-[174px] flex-col text-left py-[14px] px-[14px] md:py-[25px] md:px-[20px] rounded-[12px] md:rounded-[16px] shadow-[5px_5px_10px_0_rgba(0,0,0,0.20)] transition-[box-shadow,opacity] duration-200 ${
        selected
          ? 'shadow-[2px_2px_6px_0_rgba(0,0,0,0.1)]'
          : disabled
            ? 'bg-white/50 opacity-50 cursor-not-allowed'
            : 'bg-white hover:shadow-[2px_2px_6px_0_rgba(0,0,0,0.1)] cursor-pointer'
      }`}
      style={{
        ...(selected ? { background: accentColor } : undefined),
        ...(animDone
          ? {}
          : { opacity: 0, animation: `option-card-in 450ms cubic-bezier(0.22,1,0.36,1) ${animDelay}ms forwards` }),
      }}
    >
      <h4
        className="mb-[10px] md:mb-[20px] uppercase text-[14px] leading-[17px] md:text-[15px] md:leading-[18px]"
        style={{ fontFamily: "'PP Monument Extended'", fontWeight: 900, color: selected ? accentTextColor : '#111827' }}
      >
        {title}
      </h4>
      <p
        style={{ fontFamily: "'PP Monument Wide'", fontWeight: 400, fontSize: '12px', lineHeight: '14px', color: selected ? accentTextColor : '#4B5563' }}
      >
        {description}
      </p>
    </button>
  );
}
