import { useEffect, useRef } from 'react';

interface Props {
  feedback: string;
  optionIndex: number;
  onClose: () => void;
}

export function FeedbackPopup({ feedback, optionIndex, onClose }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const pointerPosition = optionIndex === 0
    ? { left: '65px' }
    : optionIndex === 2
      ? { right: '65px' }
      : { left: '50%', transform: 'translateX(-50%)' };

  useEffect(() => {
    const t = setTimeout(onClose, 15000);
    return () => clearTimeout(t);
  }, [onClose]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [onClose]);

  return (
    <div
      ref={ref}
      className="animate-fade-in"
      style={{ position: 'relative', zIndex: 40 }}
    >
      <div
        style={{
          background: 'linear-gradient(to top right, #ED84F8, #7240F6)',
          borderRadius: '16px',
          boxShadow: '5px 5px 10px 0 rgba(0,0,0,0.20)',
          position: 'relative',
        }}
        className="w-full lg:w-[550px] p-[16px] pr-[44px] md:p-[40px_48px_40px_36px]"
      >
        <button
          onClick={onClose}
          data-analytics-id="feedback_close"
          aria-label="Close feedback"
          className="close-btn-spin"
          style={{ position: 'absolute', top: '12px', right: '12px', background: 'none', border: 'none', color: '#FFFFFF', cursor: 'pointer', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" overflow="visible" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="butt"/>
          </svg>
        </button>
        <p
          className="feedback-copy text-[18px] leading-[22px] md:text-[20px] md:leading-[24px]"
          style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, color: '#FFFFFF' }}
        >{feedback}</p>
        <div
          style={{
            position: 'absolute',
            bottom: '-7px',
            ...pointerPosition,
            width: 0,
            height: 0,
            borderLeft: '7px solid transparent',
            borderRight: '7px solid transparent',
            borderTop: '7px solid #ED84F8',
          }}
        />
      </div>
    </div>
  );
}
