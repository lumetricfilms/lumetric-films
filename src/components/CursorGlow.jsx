import { useEffect, useRef } from 'react';
import { hoverCapable, prefersReducedMotion } from '../lib/media.js';

const enabled = () => hoverCapable() && !prefersReducedMotion();

// A soft cyan light that trails the cursor on desktop, for a cinematic feel.
export default function CursorGlow() {
  const ref = useRef(null);

  useEffect(() => {
    if (!enabled()) return undefined;
    const el = ref.current;
    if (!el) return undefined;

    let frame = 0;
    const onMove = (event) => {
      const { clientX, clientY } = event;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        el.style.transform = `translate(${clientX}px, ${clientY}px)`;
        el.style.opacity = '1';
      });
    };
    const onLeave = () => {
      el.style.opacity = '0';
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  if (!enabled()) return null;
  return <div ref={ref} aria-hidden="true" className="cursor-glow" />;
}
