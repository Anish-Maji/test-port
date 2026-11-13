import React, { useEffect, useState } from 'react';
import '../styles/NameRoll.css';

// ============================================================================
// NAME ROLL
// The /anish/ tag beside A.NICHE. The slashes stay put while the name rolls up
// through Indian scripts and settles back on "anish". Every version sits in
// the same grid cell, so the tag is always as wide as the widest one and the
// title never shifts sideways.
// ============================================================================

const NAMES = [
  { text: 'anish', lang: 'en' },
  { text: 'अनीश', lang: 'hi' }, // Hindi / Marathi
  { text: 'অনীশ', lang: 'bn' }, // Bengali
  { text: 'அனீஷ்', lang: 'ta' }, // Tamil
  { text: 'ಅನೀಶ್', lang: 'kn' }, // Kannada
  { text: 'అనీష్', lang: 'te' }, // Telugu
  { text: 'અનીશ', lang: 'gu' }, // Gujarati
];

const HOLD_MS = 1600;
const HOLD_HOME_MS = 3200; // linger a little longer on "anish"

export default function NameRoll({ className = '' }) {
  const [index, setIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const timer = setTimeout(() => {
      setPrevIndex(index);
      setIndex((index + 1) % NAMES.length);
    }, index === 0 ? HOLD_HOME_MS : HOLD_MS);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <span className={`name-roll ${className}`}>
      <span className="name-roll-sr">anish</span>
      <span className="name-roll-slash" aria-hidden="true">/</span>
      <span className="name-roll-window" aria-hidden="true">
        {NAMES.map((name, i) => {
          let state = 'is-waiting';
          if (i === index) state = 'is-active';
          else if (i === prevIndex) state = 'is-leaving';
          return (
            <span key={name.lang} lang={name.lang} className={`name-roll-item ${state}`}>
              {name.text}
            </span>
          );
        })}
      </span>
      <span className="name-roll-slash" aria-hidden="true">/</span>
    </span>
  );
}
