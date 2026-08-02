import React, { useState, useRef } from 'react';
import { ArrowRight, ArrowDown, ArrowUp } from 'lucide-react';
import './ProjectsSection.css';

export default function ProjectsSection({ worksData, onOpenCaseStudy }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const videoRefs = useRef({});

  const handleCardMouseEnter = (work) => {
    const video = videoRefs.current[work.id];
    if (video) {
      video.currentTime = 0;
      video.play().catch(() => {});
    }
  };

  const handleCardMouseLeave = (work) => {
    const video = videoRefs.current[work.id];
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  };

  const handleCardClick = (work) => {
    if (work.externalUrl) {
      window.open(work.externalUrl, '_blank', 'noopener,noreferrer');
    } else if (work.isInteractive && onOpenCaseStudy) {
      onOpenCaseStudy(work.id);
    }
  };

  return (
    <section className="projects-redesign-section" id="work">
      {/* Header Bar */}
      <div className="projects-header-container">
        <div className="projects-header-left">
          <div className="projects-terminal-title">
            <span className="projects-title-text">Some of my workitems</span>
            <span className="projects-blinking-cursor">_</span>
          </div>
          <p className="projects-header-subtitle">Have fun exploring!</p>
        </div>
      </div>

      {/* Bento Grid Wrapper with transition heights & gradient mask */}
      <div className={`projects-grid-wrapper ${isExpanded ? 'expanded' : 'collapsed'}`}>
        <div className="projects-bento-grid">
          {worksData.map((work) => {
            const isClickable = work.isInteractive || !!work.externalUrl;
            return (
              <div
                key={work.id}
                className={`bento-project-card ${isClickable ? 'interactive' : ''}`}
                onClick={() => handleCardClick(work)}
                onMouseEnter={() => handleCardMouseEnter(work)}
                onMouseLeave={() => handleCardMouseLeave(work)}
                role={isClickable ? 'button' : undefined}
                tabIndex={isClickable ? 0 : undefined}
                onKeyDown={(e) => {
                  if (isClickable && e.key === 'Enter') {
                    handleCardClick(work);
                  }
                }}
              >
                {/* Media Preview Container */}
                <div
                  className="bento-card-media"
                  style={{ background: work.bgColor || '#f4f4f5' }}
                >
                  {/* Arrow Circle */}
                  <div className="bento-arrow-circle">
                    <ArrowRight size={15} />
                  </div>

                  {work.video ? (
                    <video
                      ref={(el) => (videoRefs.current[work.id] = el)}
                      src={work.video}
                      className="bento-card-video"
                      muted
                      playsInline
                      loop={false}
                      preload="auto"
                    />
                  ) : (
                    <img
                      src={work.image}
                      alt={work.title}
                      className="bento-card-image"
                      loading="lazy"
                      draggable={false}
                    />
                  )}
                </div>

                {/* Details */}
                <div className="bento-card-details">
                  <div className="bento-card-meta">
                    CASE STUDY &bull; {work.id === 'swap-station' ? '2025' : '2024'}
                  </div>
                  <h3 className="bento-card-title">{work.shortTitle || work.title}</h3>
                  <p className="bento-card-subtitle">
                    {work.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Gradient mask visible only when collapsed */}
        {!isExpanded && <div className="projects-fade-mask"></div>}
      </div>

      {/* Show more / Show less trigger button */}
      <div className="show-more-container">
        <button
          className="show-more-btn"
          onClick={() => setIsExpanded(!isExpanded)}
          aria-label={isExpanded ? 'Show less projects' : 'Show more projects'}
        >
          <span className="arrow-down-circle">
            {isExpanded ? (
              <ArrowUp size={20} color="#ffffff" strokeWidth={2.5} />
            ) : (
              <ArrowDown size={20} color="#ffffff" strokeWidth={2.5} />
            )}
          </span>
          <span>{isExpanded ? 'Show less projects' : 'Show more projects'}</span>
        </button>
      </div>
    </section>
  );
}
