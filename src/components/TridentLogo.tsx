export function TridentLogo({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M32 4 L32 60" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <path d="M12 8 L12 22 Q12 32 22 32" stroke="currentColor" strokeWidth="4" strokeLinecap="round" fill="none" />
      <path d="M52 8 L52 22 Q52 32 42 32" stroke="currentColor" strokeWidth="4" strokeLinecap="round" fill="none" />
      <path d="M22 4 L22 14" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <path d="M32 4 L32 14" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <path d="M42 4 L42 14" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <path d="M20 56 L44 56" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}
