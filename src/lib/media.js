// Live media-query checks, evaluated at call time so changes (e.g. enabling
// Reduce Motion mid-session) are picked up on the next interaction instead of
// requiring a reload.
function matches(query) {
  return (
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia(query).matches
  );
}

export function prefersReducedMotion() {
  return matches('(prefers-reduced-motion: reduce)');
}

export function hoverCapable() {
  return matches('(hover: hover) and (pointer: fine)');
}
