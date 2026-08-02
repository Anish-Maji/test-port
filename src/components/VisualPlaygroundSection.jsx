import React from 'react';
import '../styles/VisualPlaygroundSection.css';

import GenesisEdu from '../assets/playground/project-1.webp';
import goGlocal from '../assets/playground/project-2.webp';
import Garw from '../assets/playground/project-3.webp';
import Arihant from '../assets/playground/project-4.webp';
import Arihant1 from '../assets/playground/project-5.webp';
import Vini from '../assets/playground/project-6.webp';

const archiveItemsData = [
  {
    id: 'genesis-edu',
    title: 'Genesis Edu.',
    category: 'Education',
    year: '2023',
    tag: 'BRAND IDENTITY',
    image: GenesisEdu,
    description: 'Visual identity & website design for a Pune-based education firm offering K-12 programs and competitive exam preparation across offline and online mediums. Focused on structured layout, clean typography, and a vibrant identity system that balances professionalism with approachability.'
  },
  {
    id: 'goglocal',
    title: 'Go Glocal',
    category: 'Branding & Concept',
    year: '2020',
    tag: 'POP ART BRANDING',
    image: goGlocal,
    description: 'A humorous minimal pop-art concept campaign merging fast-food iconography with everyday apparel design.'
  },
  {
    id: 'harmonia-festival',
    title: 'HARMONIA — music festival brand identity',
    category: 'Posters & Identity',
    year: '2025',
    tag: 'MUSIC & CULTURE',
    image: Garw,
    description: 'Brutalist poster series and identity system designed for an indie music festival featuring vibrant magenta and acid electric accents.'
  },
  {
    id: 'arihant-family-fashion',
    title: 'Arihant Family Fashion Brand',
    category: 'Fashion',
    year: '2026',
    tag: 'BRAND IDENTITY',
    image: Arihant,
    description: 'A complete brand refresh for Arihant, a family-owned clothing store. The project included a new visual identity, packaging, signage, apparel labels, and branded stationery, creating a modern and cohesive brand experience while preserving the trust built over decades.'
  },
  {
    id: 'arihant-logo',
    title: 'Arihant Logo',
    category: 'Brand Identity',
    year: '2026',
    tag: 'BRAND IDENTITY',
    image: Arihant1,
    description: 'Logo and visual identity exploration for Arihant Family Fashion Brand.'
  },
  {
    id: 'glass-motion',
    title: 'Vinícius Júnior, Champions League Poster',
    category: 'Posters & Identity',
    year: '2023',
    tag: 'GRAPHICS',
    image: Vini,
    description: 'A personal exploration of sports branding and visual storytelling, focused on creating a bold, high-impact composition through contrast, scale, and layered imagery.'
  }
];

export default function VisualPlaygroundSection() {
  // Triple items array for 100% seamless, gap-free continuous carousel loop
  const carouselItems = [...archiveItemsData, ...archiveItemsData, ...archiveItemsData];

  return (
    <section className="playground-section" id="archive">
      <div className="playground-container">

        {/* Header Section */}
        <div className="playground-header-wrapper">
          <h2 className="playground-title">visual playground</h2>
          <p className="playground-details">
            A curated archive of visual experiments, brand identity concepts, posters, packaging, and micro-creations.
          </p>
        </div>

        {/* Carousel Track (Continuous loop without stopping on hover) */}
        <div className="playground-carousel-wrapper">
          <div className="playground-track">
            {carouselItems.map((item, index) => (
              <div
                key={`${item.id}-${index}`}
                className="playground-card-wrapper"
              >
                <div className="playground-card">
                  <div className="card-image-box">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="playground-card-img"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
