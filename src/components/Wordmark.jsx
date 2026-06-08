// Inline Lumetric wordmark, revealed in stages so the entrance reads as
// dot flickers -> "i" stem fades in slowly -> the rest of the wordmark appears.
// The dot (.i-dot) flickers on mount via CSS and is always present; the stem is
// gated by `stemRevealed`; everything else is gated by `revealed`. Decorative;
// the heading provides the accessible name.
export default function Wordmark({ className = '', revealed = true, stemRevealed = true }) {
  return (
    <svg
      className={className}
      viewBox="0 0 1200 420"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="lm-dot" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="50%" stopColor="#ffffff" />
          <stop offset="76%" stopColor="#67e8f9" />
          <stop offset="100%" stopColor="#0891b2" stopOpacity="0" />
        </radialGradient>
        <filter
          id="lm-glow"
          x="-120%"
          y="-120%"
          width="340%"
          height="340%"
          colorInterpolationFilters="sRGB"
        >
          <feGaussianBlur stdDeviation="12" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Everything except the "i", revealed after the flicker. */}
      <g style={{ opacity: revealed ? 1 : 0, transition: 'opacity 0.8s ease-out' }}>
        <g fill="none" stroke="#ffffff" strokeWidth="8" strokeLinecap="square">
          <path d="M72 178V92h86" />
          <path d="M1042 92h86v86" />
          <path d="M72 274v86h86" />
          <path d="M1128 274v86h-86" />
        </g>
        <text
          x="792"
          y="235"
          fill="#ffffff"
          textAnchor="end"
          fontFamily="Inter, Arial Black, Arial, sans-serif"
          fontSize="146"
          fontWeight="900"
          letterSpacing="4"
        >
          Lumetr
        </text>
        <text
          x="864"
          y="235"
          fill="#ffffff"
          textAnchor="start"
          fontFamily="Inter, Arial Black, Arial, sans-serif"
          fontSize="146"
          fontWeight="900"
          letterSpacing="4"
        >
          c
        </text>
        <text
          x="600"
          y="342"
          fill="#ffffff"
          textAnchor="middle"
          fontFamily="Inter, Arial Black, Arial, sans-serif"
          fontSize="58"
          fontWeight="800"
          letterSpacing="54"
        >
          Films
        </text>
      </g>

      {/* The "i" stem, sized to the lowercase x-height (matching the "r"),
          revealed slowly as the flicker stops. */}
      <rect
        x="812"
        y="155"
        width="34"
        height="80"
        rx="2"
        fill="#ffffff"
        style={{ opacity: stemRevealed ? 1 : 0, transition: 'opacity 0.9s ease-out' }}
      />

      {/* Only the dot flickers like a bulb at the start; always visible. */}
      <circle className="i-dot" cx="829" cy="110" r="36" fill="url(#lm-dot)" filter="url(#lm-glow)" />
    </svg>
  );
}
