import React, { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { AnimatedGroup } from '@/components/core/animated-group';
import './ProjectsSection.css';

const getTags = (work) => {
  if (Array.isArray(work.tags) && work.tags.length > 0) {
    return work.tags;
  }
  const raw = work.bentoMeta || work.meta || 'CASE STUDY';
  return raw
    .split(/[•·.]/)
    .map((t) => t.trim())
    .filter(Boolean)
    .map((tag) => {
      if (/^[A-Z\s]+$/.test(tag) && tag.length > 3) {
        return tag
          .toLowerCase()
          .split(' ')
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(' ');
      }
      return tag;
    });
};

export default function ProjectsSection({ worksData, onOpenCaseStudy, isLoaded = true }) {
  const videoRefs = useRef({});

  const handleCardMouseEnter = (work) => {
    const video = videoRefs.current[work.id];
    if (video) {
      video.currentTime = 0;
      video.play().catch(() => { });
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

      {/* Bento Grid Wrapper */}
      <div className="projects-grid-wrapper">
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
                  {/* Read Time & Turning Arrow Badge */}
                  <div className="bento-action-badge">
                    <span className="bento-badge-text">
                      {work.readTime || '3 mins read'}
                    </span>
                    <ArrowRight size={14} className="bento-badge-arrow" />
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
                  <div className="bento-card-tags">
                    {getTags(work).map((tag, idx) => (
                      <span key={idx} className="bento-tag-pill">
                        {tag}
                      </span>
                    ))}
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
      </div>
    </section>
  );
}
