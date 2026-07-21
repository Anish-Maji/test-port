import React from 'react';
import '../styles/BrandTicker.css';

// Automatically import all image formats from 'src/assets/brand logos/'
const logoModules = import.meta.glob('../assets/brand logos/*.{png,jpg,jpeg,webp,svg,gif}', {
  eager: true,
  import: 'default'
});

// Dynamically generate logo objects array
const dynamicBrandLogos = Object.entries(logoModules).map(([path, url]) => {
  const filename = path.split('/').pop() || '';
  const cleanName = filename
    .replace(/\.[^/.]+$/, '')
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());

  return {
    name: cleanName,
    src: url,
  };
});

export const BrandTicker = () => {
  const logoList = dynamicBrandLogos.length > 0 ? dynamicBrandLogos : [];

  // Repeat logos if few are present to ensure continuous marquee loop
  const repeatedLogos = logoList.length > 0 && logoList.length < 8
    ? [...logoList, ...logoList, ...logoList]
    : logoList;

  if (repeatedLogos.length === 0) {
    return null;
  }

  return (
    <section className="ticker-section" aria-label="Brands worked with">
      <div className="ticker-container">
        {/* Track 1 */}
        <div className="ticker-track">
          {repeatedLogos.map((brand, index) => (
            <div key={`brand-1-${index}`} className="ticker-item">
              <img
                src={brand.src}
                alt={brand.name}
                className="ticker-brand-image"
                loading="lazy"
              />
            </div>
          ))}
        </div>

        {/* Track 2 (Duplicate for seamless infinite marquee scrolling) */}
        <div className="ticker-track" aria-hidden="true">
          {repeatedLogos.map((brand, index) => (
            <div key={`brand-2-${index}`} className="ticker-item">
              <img
                src={brand.src}
                alt={brand.name}
                className="ticker-brand-image"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandTicker;
