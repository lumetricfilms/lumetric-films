// Small uppercase section label with a glowing accent line, used across
// sections for a consistent editorial look.
export default function Eyebrow({ children, className = '' }) {
  return (
    <span
      className={`inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.32em] text-cyan-200 ${className}`}
    >
      <span className="h-px w-10 bg-gradient-to-r from-cyan-300 to-transparent shadow-[0_0_8px_rgba(34,211,238,.6)]" />
      {children}
    </span>
  );
}
