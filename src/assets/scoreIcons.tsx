export function GrowthIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 16l4-5 3 3 5-7" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 7h4v4" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function TrustIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 2l2.5 1.5L15 5v4c0 3.5-2 6.5-5 8-3-1.5-5-4.5-5-8V5l2.5-1.5L10 2z" stroke="#3b82f6" strokeWidth="2" strokeLinejoin="round" />
      <path d="M7.5 10l1.5 1.5L12 8" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ControlIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="10" cy="10" r="7" stroke="#f59e0b" strokeWidth="2" />
      <path d="M10 6v4l3 2" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function MomentumIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11 2L5 12h5l-1 6 6-10h-5l1-6z" stroke="#a855f7" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

export const scoreIcons = {
  growth: GrowthIcon,
  trust: TrustIcon,
  control: ControlIcon,
  momentum: MomentumIcon,
};

export const scoreColors: Record<string, string> = {
  growth: '#22c55e',
  trust: '#3b82f6',
  control: '#f59e0b',
  momentum: '#a855f7',
};
