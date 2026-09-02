import { useState } from 'react';
import { animationMs } from '../utils/animationTiming';

interface Props {
  title: string;
  description: string;
  optionId: 'A' | 'B' | 'C';
  selected: boolean;
  disabled: boolean;
  resetting: boolean;
  accentColor: string;
  accentTextColor: string;
  onSelect: () => void;
  animDelay?: number;
}

export function OptionCard({ title, description, optionId, selected, disabled, resetting, onSelect, animDelay = 0 }: Props) {
  const [animDone, setAnimDone] = useState(false);

  return (
    <div
      className="h-full"
      onAnimationEnd={(event) => {
        if (event.target === event.currentTarget) setAnimDone(true);
      }}
      style={animDone
        ? undefined
        : {
            opacity: 0,
            animation: `option-card-in ${animationMs(450)} cubic-bezier(0.22,1,0.36,1) ${animationMs(animDelay)} forwards`,
          }
      }
    >
      <button
        data-option-card
        data-analytics-id={`scenario_option_${optionId.toLowerCase()}`}
        onClick={onSelect}
        onMouseDown={selected ? event => event.stopPropagation() : undefined}
        disabled={disabled && !resetting}
        className={`group relative flex h-full w-full lg:min-h-[174px] flex-col text-left py-[14px] px-[14px] lg:py-[25px] lg:px-[20px] rounded-[12px] lg:rounded-[16px] shadow-[5px_5px_10px_0_rgba(0,0,0,0.20)] ${resetting ? 'pointer-events-none bg-white opacity-100 transition-[background-color,box-shadow,opacity] duration-[350ms] ease-in-out' : ''} ${
          selected && !resetting
            ? 'bg-[#151547] shadow-[2px_2px_6px_0_rgba(0,0,0,0.1)]'
            : disabled && !resetting
              ? 'bg-white/50 opacity-50 cursor-not-allowed'
              : resetting ? '' : 'game-option-interactive bg-white cursor-pointer'
        }`}
        style={{ WebkitTapHighlightColor: 'transparent' }}
      >
        <h4
          className={`game-option-title relative z-10 mb-[10px] lg:mb-[20px] uppercase text-[12px] leading-[17px] md:text-[17px] md:leading-[21px] lg:text-[15px] lg:leading-[18px] min-[1025px]:max-[1260px]:text-[14px] min-[1025px]:max-[1260px]:leading-[17px] ${resetting ? 'transition-colors duration-[350ms] ease-in-out' : ''} ${selected && !resetting ? 'text-[#CCB0F9]' : 'text-[#703ff5]'}`}
          style={{ fontFamily: "'PP Monument Extended'", fontWeight: 900 }}
        >
          {title}
        </h4>
        <p
          style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400 }}
          className={`game-option-copy relative z-10 text-[14px] leading-[16px] md:text-[16px] md:leading-[19px] ${resetting ? 'transition-colors duration-[350ms] ease-in-out' : ''} ${selected && !resetting ? 'text-white' : 'text-[#4B5563]'}`}
        >
          {description}
        </p>
      </button>
    </div>
  );
}
