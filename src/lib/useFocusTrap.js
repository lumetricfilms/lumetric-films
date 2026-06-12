import { useEffect, useRef } from 'react';

// Note: cross origin iframes are intentionally excluded (callers give them
// tabindex -1) so they cannot become an un-trappable tab boundary.
const FOCUSABLE =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

// Modal session behavior shared by the mobile nav drawer and the video
// lightbox: focus the initial element, trap Tab inside `containerRef`, lock
// body scroll, close on Escape, and restore focus to the opener on close.
export default function useFocusTrap({ active, containerRef, initialFocusRef, onClose }) {
  // Keep the latest onClose without re-arming the trap when a host passes a
  // fresh closure each render (re-arming would yank focus mid-session).
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  });

  useEffect(() => {
    if (!active) return undefined;

    const opener = document.activeElement;
    initialFocusRef?.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        onCloseRef.current();
        return;
      }
      if (event.key !== 'Tab' || !containerRef.current) return;
      const items = Array.from(containerRef.current.querySelectorAll(FOCUSABLE)).filter(
        (el) => !el.hasAttribute('disabled') && el.offsetParent !== null,
      );
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
      if (opener && typeof opener.focus === 'function') opener.focus();
    };
  }, [active, containerRef, initialFocusRef]);
}
