import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
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
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const [isPaused, setIsPaused] = useState(false);

  // Triple items array for 100% seamless, gap-free continuous carousel loop
  const carouselItems = [...archiveItemsData, ...archiveItemsData, ...archiveItemsData];

  const handleOpenModal = (item) => {
    const origIndex = archiveItemsData.findIndex((i) => i.id === item.id);
    setSelectedItemIndex(origIndex !== -1 ? origIndex : 0);
  };

  const handleCloseModal = () => {
    setSelectedItemIndex(null);
  };

  const handlePrevItem = (e) => {
    e.stopPropagation();
    setSelectedItemIndex((prev) => (prev === 0 ? archiveItemsData.length - 1 : prev - 1));
  };

  const handleNextItem = (e) => {
    e.stopPropagation();
    setSelectedItemIndex((prev) => (prev === archiveItemsData.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedItemIndex === null) return;
      if (e.key === 'Escape') handleCloseModal();
      if (e.key === 'ArrowLeft') setSelectedItemIndex((prev) => (prev === 0 ? archiveItemsData.length - 1 : prev - 1));
      if (e.key === 'ArrowRight') setSelectedItemIndex((prev) => (prev === archiveItemsData.length - 1 ? 0 : prev + 1));
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedItemIndex]);

  const activeItem = selectedItemIndex !== null ? archiveItemsData[selectedItemIndex] : null;

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

        {/* Carousel Track */}
        <div
          className={`playground-carousel-wrapper ${isPaused ? 'paused' : ''}`}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="playground-track">
            {carouselItems.map((item, index) => (
              <div
                key={`${item.id}-${index}`}
                className="playground-card-wrapper"
                onClick={() => handleOpenModal(item)}
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

      {/* Lightbox / Modal */}
      {activeItem && (
        <div className="playground-modal-backdrop" onClick={handleCloseModal}>
          <div className="playground-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={handleCloseModal} aria-label="Close modal">
              <X size={20} />
            </button>

            <div className="modal-body">
              <div className="modal-image-container">
                <img src={activeItem.image} alt={activeItem.title} className="modal-image" />
              </div>

              <div className="modal-info-panel">
                <div className="modal-meta-row">
                  <span className="modal-tag">{activeItem.tag}</span>
                  <span className="modal-year">{activeItem.year}</span>
                </div>
                <h3 className="modal-title">{activeItem.title}</h3>
                <p className="modal-category">{activeItem.category}</p>
                <div className="modal-divider"></div>
                <p className="modal-description">{activeItem.description}</p>

                <div className="modal-nav-row">
                  <button className="modal-nav-btn" onClick={handlePrevItem}>
                    <ChevronLeft size={16} />
                    <span>Previous</span>
                  </button>
                  <span className="modal-counter">
                    {selectedItemIndex + 1} / {archiveItemsData.length}
                  </span>
                  <button className="modal-nav-btn" onClick={handleNextItem}>
                    <span>Next</span>
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
