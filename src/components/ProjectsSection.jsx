import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, ArrowDown, ArrowUp } from 'lucide-react';
import { AnimatedGroup } from '@/components/core/animated-group';
import './ProjectsSection.css';

export default function ProjectsSection({ worksData, onOpenCaseStudy, isLoaded = true }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1440
  );
  const videoRefs = useRef({});

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Desktop/Laptop (> 992px) within 1280px has 2 columns; Mobile (<= 992px) has 1 column
  const itemsInFirstRow = windowWidth > 992 ? 2 : 1;
  const hasMore = worksData.length > itemsInFirstRow;

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

  const isCollapsed = hasMore && !isExpanded;

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
      <div className={`projects-grid-wrapper ${isCollapsed ? 'collapsed' : 'expanded'}`}>
        <AnimatedGroup
          className="projects-bento-grid"
          trigger={isLoaded}
          variants={{
            container: {
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.05,
                  delayChildren: 0.1,
                },
              },
            },
            item: {
              hidden: { opacity: 0, y: 40, filter: 'blur(4px)' },
              visible: {
                opacity: 1,
                y: 0,
                filter: 'blur(0px)',
                transition: {
                  duration: 1.2,
                  type: 'spring',
                  bounce: 0.3,
                },
              },
            },
          }}
          viewport={{ once: true, amount: 0.1 }}
        >
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
                    {work.bentoMeta || work.meta || 'CASE STUDY'}
                  </div>
                  <h3 className="bento-card-title">{work.shortTitle || work.title}</h3>
                  <p className="bento-card-subtitle">
                    {work.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </AnimatedGroup>

        {/* Gradient mask visible only when collapsed */}
        {isCollapsed && <div className="projects-fade-mask"></div>}
      </div>

      {/* Show more / Show less trigger button (visible when there are more projects than row 1) */}
      {hasMore && (
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
      )}
    </section>
  );
}
