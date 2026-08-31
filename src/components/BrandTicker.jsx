import React from 'react';
import baazBikesLogo from '../assets/brand logos/webp logos/baaz-bikes.webp';
import crimsonLogo from '../assets/brand logos/webp logos/crimson.webp';
import globalEsportsLogo from '../assets/brand logos/webp logos/global-esports.webp';
import smartivityLogo from '../assets/brand logos/webp logos/smartivity.webp';
import tangleLogo from '../assets/brand logos/webp logos/tangle.webp';
import '../styles/BrandTicker.css';

const brandLogos = [
  { name: 'Baaz Bikes', src: baazBikesLogo },
  { name: 'Smartivity', src: smartivityLogo },
  { name: 'Tangle Design', src: tangleLogo },
  { name: 'Crimson Healthcare', src: crimsonLogo },
  { name: 'Global Esports', src: globalEsportsLogo },
];

export const BrandTicker = () => {
  // Repeat logos 5 times to ensure smooth infinite marquee loop across wide viewports
  const repeatedLogos = [
    ...brandLogos,
    ...brandLogos,
    ...brandLogos,
    ...brandLogos,
    ...brandLogos,
  ];

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
                width={500}
                height={500}
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
                width={500}
                height={500}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandTicker;
