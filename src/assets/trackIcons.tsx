export function TrackIconFintech({ className = 'w-24 h-24' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="24" width="80" height="52" rx="8" stroke="currentColor" strokeWidth="2" />
      <path d="M8 36h80" stroke="currentColor" strokeWidth="2" />
      <rect x="16" y="44" width="24" height="4" rx="2" fill="currentColor" opacity="0.4" />
      <rect x="16" y="52" width="16" height="4" rx="2" fill="currentColor" opacity="0.4" />
      <circle cx="72" cy="56" r="8" stroke="currentColor" strokeWidth="2" />
      <path d="M69 56l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function TrackIconGovernment({ className = 'w-24 h-24' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M48 12L12 32h72L48 12z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <rect x="20" y="36" width="8" height="32" rx="1" stroke="currentColor" strokeWidth="2" />
      <rect x="36" y="36" width="8" height="32" rx="1" stroke="currentColor" strokeWidth="2" />
      <rect x="52" y="36" width="8" height="32" rx="1" stroke="currentColor" strokeWidth="2" />
      <rect x="68" y="36" width="8" height="32" rx="1" stroke="currentColor" strokeWidth="2" />
      <rect x="12" y="68" width="72" height="8" rx="2" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export function TrackIconTelco({ className = 'w-24 h-24' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="28" y="8" width="40" height="72" rx="8" stroke="currentColor" strokeWidth="2" />
      <rect x="36" y="16" width="24" height="40" rx="4" fill="currentColor" opacity="0.15" />
      <circle cx="48" cy="68" r="4" stroke="currentColor" strokeWidth="2" />
      <path d="M60 4c6 4 10 10 10 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M56 10c4 3 6 7 6 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function TrackIconRemittance({ className = 'w-24 h-24' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="48" r="20" stroke="currentColor" strokeWidth="2" />
      <circle cx="64" cy="48" r="20" stroke="currentColor" strokeWidth="2" />
      <path d="M40 42l8 6-8 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M56 42l-8 6 8 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function TrackIconDigitalBanks({ className = 'w-24 h-24' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="16" y="20" width="64" height="48" rx="8" stroke="currentColor" strokeWidth="2" />
      <rect x="24" y="28" width="20" height="14" rx="4" fill="currentColor" opacity="0.2" />
      <path d="M24 50h48" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
      <path d="M24 56h32" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
      <circle cx="64" cy="36" r="6" stroke="currentColor" strokeWidth="2" />
      <path d="M62 36h4M64 34v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <rect x="36" y="72" width="24" height="4" rx="2" fill="currentColor" opacity="0.4" />
    </svg>
  );
}

export function TrackIconBanks({ className = 'w-24 h-24' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="12" y="28" width="72" height="48" rx="4" stroke="currentColor" strokeWidth="2" />
      <path d="M12 40h72" stroke="currentColor" strokeWidth="2" />
      <rect x="20" y="48" width="20" height="12" rx="2" fill="currentColor" opacity="0.15" />
      <circle cx="68" cy="54" r="8" stroke="currentColor" strokeWidth="2" />
      <circle cx="62" cy="54" r="8" stroke="currentColor" strokeWidth="2" />
      <path d="M48 20l-8-8M48 20l8-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export const trackIcons: Record<string, React.FC<{ className?: string }>> = {
  fintech: TrackIconFintech,
  government: TrackIconGovernment,
  telco: TrackIconTelco,
  remittance: TrackIconRemittance,
  'digital-banks': TrackIconDigitalBanks,
  banks: TrackIconBanks,
};
