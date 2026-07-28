import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './ProjectsSection.css';

export default function ProjectsSection({ worksData, onOpenCaseStudy }) {
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Mouse Drag State
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);

  const checkScrollability = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (el) {
      el.addEventListener('scroll', checkScrollability);
      window.addEventListener('resize', checkScrollability);
      checkScrollability();
    }
    return () => {
      if (el) el.removeEventListener('scroll', checkScrollability);
      window.removeEventListener('resize', checkScrollability);
    };
  }, []);

  const handleScroll = (direction) => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = 420;
    scrollContainerRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  // Drag-to-scroll Event Handlers
  const handleMouseDown = (e) => {
    if (!scrollContainerRef.current) return;
    setIsMouseDown(true);
    setIsDragging(false);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeftState(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseLeaveOrUp = () => {
    setIsMouseDown(false);
    setTimeout(() => {
      setIsDragging(false);
    }, 50);
  };

  const handleMouseMove = (e) => {
    if (!isMouseDown || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    if (Math.abs(walk) > 5) {
      setIsDragging(true);
    }
    scrollContainerRef.current.scrollLeft = scrollLeftState - walk;
  };

  return (
    <section className="projects-redesign-section" id="work">
      {/* Header Bar */}
      <div className="projects-header-container">
        <div className="projects-header-left">
          <div className="projects-terminal-title">
            <span className="projects-prompt-symbol">&gt;</span>
            <span className="projects-title-text">_//some.projects.workitems//</span>
            <span className="projects-blinking-cursor">_</span>
          </div>
          <p className="projects-header-subtitle">(HAVE FUN EXPLORING)</p>
        </div>

        <div className="projects-header-center">
          <span className="projects-count-badge">{worksData.length}</span>
        </div>

        <div className="projects-header-right">
          <button 
            className="projects-view-all-btn"
            onClick={() => {
              if (scrollContainerRef.current) {
                scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
              }
            }}
          >
            &#123;view.all.projects&#125;
          </button>
        </div>
      </div>

      {/* Carousel Track Wrapper with Fade Overlays & Controls */}
      <div className="projects-carousel-wrapper">
        {/* Left Fade Overlay */}
        <div className={`projects-fade-overlay left ${canScrollLeft ? 'visible' : ''}`} />
        
        {/* Right Fade Overlay */}
        <div className={`projects-fade-overlay right ${canScrollRight ? 'visible' : ''}`} />

        {/* Scroll Navigation Buttons */}
        {canScrollLeft && (
          <button
            className="projects-nav-arrow left"
            onClick={() => handleScroll('left')}
            aria-label="Scroll Left"
          >
            <ChevronLeft size={20} />
          </button>
        )}

        {canScrollRight && (
          <button
            className="projects-nav-arrow right"
            onClick={() => handleScroll('right')}
            aria-label="Scroll Right"
          >
            <ChevronRight size={20} />
          </button>
        )}

        {/* Horizontal Card Container (Draggable) */}
        <div 
          className={`projects-scroll-track ${isDragging ? 'dragging' : ''}`}
          ref={scrollContainerRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeaveOrUp}
          onMouseUp={handleMouseLeaveOrUp}
          onMouseMove={handleMouseMove}
        >
          {worksData.map((work) => (
            <div
              key={work.id}
              className={`projects-card ${work.isInteractive ? 'interactive' : ''}`}
              onClick={() => {
                if (!isDragging && work.isInteractive && onOpenCaseStudy) {
                  onOpenCaseStudy(work.id);
                }
              }}
              role={work.isInteractive ? 'button' : undefined}
              tabIndex={work.isInteractive ? 0 : undefined}
              onKeyDown={(e) => {
                if (!isDragging && work.isInteractive && onOpenCaseStudy && e.key === 'Enter') {
                  onOpenCaseStudy(work.id);
                }
              }}
            >
              {/* Media Preview Container */}
              <div
                className="projects-card-media"
                style={{ background: work.bgColor || '#f4f4f5' }}
              >
                <img
                  src={work.image}
                  alt={work.title}
                  className="projects-card-image"
                  loading="lazy"
                  draggable={false}
                />
              </div>

              {/* Card Meta / Details Container */}
              <div className="projects-card-details">
                <div className="projects-card-row">
                  <h3 className="projects-card-title">{work.shortTitle || work.title}</h3>
                  <span className="projects-card-tag">
                    &#123;{work.categoryTag || 'project'}&#125;
                  </span>
                </div>
                <p className="projects-card-subtitle">
                  {work.subtitle || work.meta}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
