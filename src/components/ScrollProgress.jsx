import { useEffect, useState } from 'react';

// Thin cyan line at the very top of the screen that tracks reading progress.
export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      setProgress(max > 0 ? (doc.scrollTop / max) * 100 : 0);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <div className="fixed inset-x-0 top-0 z-[60] h-0.5 bg-transparent" aria-hidden="true">
      <div
        className="h-full bg-gradient-to-r from-cyan-400 via-cyan-200 to-white shadow-[0_0_12px_rgba(34,211,238,.8)]"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
