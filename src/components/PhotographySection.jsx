import React, { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import '../styles/PhotographySection.css';

// ============================================================================
// PHOTOGRAPHY
// A grid of tall photos at the end of the About page. Hovering zooms a photo
// slightly; clicking opens it full-size. Once the section scrolls into view
// the whole site switches to dark (via onDarkZoneChange), and it stays dark
// below it, so the footer is dark too. Scrolling back up above the section
// returns to the visitor's own theme.
//
// PHOTOS: every image in src/assets/photography is shown automatically
// (jpg, jpeg, png, webp, avif). They're sorted by file name, so a number
// prefix sets the order, and the rest of the name becomes the description
// screen readers announce: "07-sunset-in-goa.jpg" -> "Sunset in goa".
//
// Originals can be full camera size: vite-imagetools (vite.config.js) makes
// two WebP copies of each at build time. The grid shows a small one (shortest
// side 720px, sharp on retina at the grid's ~344px squares); the lightbox
// loads a larger one (longest side 1800px) only when a photo is opened.
// Full-size originals in the grid made the dark/light fade stall for 200ms+
// a frame while the browser re-decoded them, and cost visitors ~18MB.
// ============================================================================
// (Vite needs the folder pattern written out in full in each glob below)
const thumbFiles = import.meta.glob('../assets/photography/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP}', {
  eager: true,
  import: 'default',
  query: '?w=720&h=720&fit=outside&withoutEnlargement&format=webp&quality=78',
});

const fullFiles = import.meta.glob('../assets/photography/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP}', {
  eager: true,
  import: 'default',
  query: '?w=1800&h=1800&fit=inside&withoutEnlargement&format=webp&quality=82',
});

const describe = (path) => {
  const name = path
    .split('/')
    .pop()
    .replace(/\.[^.]+$/, '') // extension
    .replace(/^\d+[\s._-]*/, '') // order prefix
    .replace(/[-_]+/g, ' ')
    .trim();
  return name ? name.charAt(0).toUpperCase() + name.slice(1) : 'Photograph';
};

const PHOTOS = Object.keys(thumbFiles)
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
  .map((path) => ({ src: thumbFiles[path], full: fullFiles[path], alt: describe(path), key: path }));

// The site goes dark once the section's top passes this point of the screen
const DARK_TRIGGER = 0.55;

export default function PhotographySection({ onDarkZoneChange }) {
  const sectionRef = useRef(null);
  const closeRef = useRef(null);
  const [openPhoto, setOpenPhoto] = useState(null);

  useEffect(() => {
    if (!onDarkZoneChange) return undefined;
    let frame = null;
    let last = null;

    const check = () => {
      frame = null;
      const section = sectionRef.current;
      if (!section) return;
      const dark = section.getBoundingClientRect().top < window.innerHeight * DARK_TRIGGER;
      if (dark !== last) {
        last = dark;
        onDarkZoneChange(dark);
      }
    };

    const onScroll = () => {
      if (frame === null) frame = requestAnimationFrame(check);
    };

    check();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      onDarkZoneChange(false);
    };
  }, [onDarkZoneChange]);

  // Lightbox: Escape closes it, and the page behind doesn't scroll
  useEffect(() => {
    if (!openPhoto) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') setOpenPhoto(null);
    };
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [openPhoto]);

  return (
    <section className="photo-section" id="photography" ref={sectionRef}>
      {/* Same heading styles as "Journey so far" (AboutPage.css) */}
      <div className="about-journey-header">
        <h2 className="about-journey-title">Through my lens</h2>
        <p className="about-journey-subtitle">
          And hey, I love photography. A few frames from places that made me slow down.
        </p>
      </div>

      <ul className="photo-grid">
        {PHOTOS.map((photo) => (
          <li key={photo.key} className="photo-card">
            <button type="button" onClick={() => setOpenPhoto(photo)} aria-label={`View larger: ${photo.alt}`}>
              <img src={photo.src} alt={photo.alt} loading="lazy" draggable={false} />
            </button>
          </li>
        ))}
      </ul>

      {openPhoto && (
        <div
          className="photo-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={openPhoto.alt}
          onClick={() => setOpenPhoto(null)}
        >
          <img src={openPhoto.full} alt={openPhoto.alt} onClick={(e) => e.stopPropagation()} />
          <button
            ref={closeRef}
            type="button"
            className="photo-lightbox-close"
            onClick={() => setOpenPhoto(null)}
            aria-label="Close photo"
          >
            <X size={20} />
          </button>
        </div>
      )}
    </section>
  );
}
