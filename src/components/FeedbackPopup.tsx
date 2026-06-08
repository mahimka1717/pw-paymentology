import { useEffect, useRef } from 'react';

interface Props {
  feedback: string;
  onClose: () => void;
}

export function FeedbackPopup({ feedback, onClose }: Props) {
  const ref = useRef<HTMLDivElement>(null);

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
          width: '550px',
          background: 'linear-gradient(to right, #3E4D9C, #D2AFFE)',
          padding: '40px 48px 40px 36px',
          borderRadius: '16px',
          boxShadow: '5px 5px 10px 0 rgba(0,0,0,0.20)',
          position: 'relative',
        }}
      >
        <button
          onClick={onClose}
          className="close-btn-spin"
          style={{ position: 'absolute', top: '12px', right: '12px', background: 'none', border: 'none', color: '#FFFFFF', cursor: 'pointer', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" overflow="visible" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="5" strokeLinecap="butt"/>
          </svg>
        </button>
        <p
          style={{ fontFamily: "'PP Monument Wide', sans-serif", fontWeight: 900, fontSize: '25px', lineHeight: '30px', color: '#FFFFFF' }}
        >{feedback}</p>
      </div>
    </div>
  );
}
