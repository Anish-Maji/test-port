import React, { useEffect, useState } from 'react';
import '../styles/EdgeRulers.css';

// ============================================================================
// EDGE RULERS
// Design-tool style rulers fixed to the left and right edges of the screen.
// The ticks move with the page and the labels show the page position
// (400, 500, 600...). They only appear when the window is wide enough to fit
// them beside the 1280px content (see EdgeRulers.css).
// ============================================================================

const LABEL_STEP = 100;

// The rulers stop at the footer's top edge, so they never run over it
const footerOverlap = () => {
  const footer = document.querySelector('.site-footer');
  if (!footer) return 0;
  return Math.max(0, window.innerHeight - footer.getBoundingClientRect().top);
};

function useScrollPosition() {
  const read = () => ({ y: window.scrollY, height: window.innerHeight, cutoff: footerOverlap() });
  const [pos, setPos] = useState(read);

  useEffect(() => {
    let frame = null;
    const update = () => {
      frame = null;
      setPos(read());
    };
    const onChange = () => {
      if (frame === null) frame = requestAnimationFrame(update);
    };
    window.addEventListener('scroll', onChange, { passive: true });
    window.addEventListener('resize', onChange);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onChange);
      window.removeEventListener('resize', onChange);
    };
  }, []);

  return pos;
}

function Ruler({ side, y, height, cutoff }) {
  const first = Math.floor(y / LABEL_STEP) * LABEL_STEP;
  const labels = [];
  for (let value = first; value <= y + height - cutoff + LABEL_STEP; value += LABEL_STEP) labels.push(value);

  return (
    <div className={`edge-ruler edge-ruler-${side}`} style={{ bottom: cutoff }} aria-hidden="true">
      {/* Ticks repeat every 100px, so shifting by the remainder keeps them in step with the page */}
      <div className="edge-ruler-ticks" style={{ transform: `translateY(${-(y % LABEL_STEP)}px)` }} />
      {labels.map((value) => (
        <span key={value} className="edge-ruler-label" style={{ top: value - y }}>
          {value}
        </span>
      ))}
    </div>
  );
}

export default function EdgeRulers() {
  const { y, height, cutoff } = useScrollPosition();
  return (
    <>
      <Ruler side="left" y={y} height={height} cutoff={cutoff} />
      <Ruler side="right" y={y} height={height} cutoff={cutoff} />
    </>
  );
}
