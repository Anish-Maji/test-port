import React, { useRef, useEffect } from 'react';
import '../styles/TestimonialsSection.css';

// ============================================================================
// SPEED CONFIGURATION CONSTANTS (Tweak these for slower/faster scrolling!)
// ============================================================================
const DEFAULT_NORMAL_SPEED = 0.4;  // Very calm & slow default scroll speed (px per frame)
const DEFAULT_HOVER_SPEED = 0.1;   // Near-pause speed on hover (px per frame)
const DEFAULT_EASING = 0.2;        // Instant responsive speed transition (0.05 - 0.5)
// ============================================================================

const testimonialsData = [
  {
    id: 1,
    quote: (
      <>
        I had a very good experience with Anish and his team for redesigning my company logo. He is very creative, particular and passionate with his work. He also simply managed to work on every change to produce the best result. I am satisfied with his work and would definitely recommend him for all sorts of branding and re-branding !
      </>
    ),
    author: 'Shashwat Jhatakia',
    role: 'OWNER • ARIHANT',
  },
  {
    id: 2,
    quote: (
      <>
        Worked with Anish on freelance projects. Reliable. Clear communication. Ensures minimum revisions after 1st round of feedback.
      </>
    ),
    author: 'Rajat Jain',
    role: 'CO-FOUNDER • SMARTIVITY',
  },
  {
    id: 3,
    quote: (
      <>
        I have enjoyed working with Anish on a couple of projects. He is sincere and creative, with a great eye for visual design. Beyond his design skills, he is thoughtful, collaborative and genuinely committed to doing great work. It has been a pleasure working with him and I would happily recommend him!
      </>
    ),
    author: 'Vijay Singh Thakur',
    role: 'SENIOR PRODUCT DESIGNER • CIPLA',
  },
  {
    id: 4,
    quote: (
      <>
        "I've seen him enhance UX keeping in mind the use case, the flow of information and end user persona in mind. As a person, Anish is intelligent, curious, creative and has a great work ethic. He can communicate really well and works well with people across teams."
      </>
    ),
    author: 'Prasad Prabhu',
    role: 'VP ENGINEERING • APOLLO',
  },
];

export default function TestimonialsSection({
  normalSpeed = DEFAULT_NORMAL_SPEED,
  hoverSpeed = DEFAULT_HOVER_SPEED,
  easing = DEFAULT_EASING,
}) {
  const trackRef = useRef(null);
  const posRef = useRef(0);
  const currentSpeedRef = useRef(normalSpeed);
  const isHoveredRef = useRef(false);
  const animFrameId = useRef(null);

  // Store speed values in refs so modifications update the animation loop immediately
  const normalSpeedRef = useRef(normalSpeed);
  const hoverSpeedRef = useRef(hoverSpeed);
  const easingRef = useRef(easing);

  normalSpeedRef.current = normalSpeed;
  hoverSpeedRef.current = hoverSpeed;
  easingRef.current = easing;

  // Duplicate array 3 times for continuous looping
  const marqueeItems = [...testimonialsData, ...testimonialsData, ...testimonialsData];

  useEffect(() => {
    const animate = () => {
      const targetSpeed = isHoveredRef.current ? hoverSpeedRef.current : normalSpeedRef.current;
      currentSpeedRef.current += (targetSpeed - currentSpeedRef.current) * easingRef.current;

      if (trackRef.current) {
        posRef.current -= currentSpeedRef.current;
        const totalWidth = trackRef.current.scrollWidth;
        const singleSetWidth = totalWidth / 3;

        // Reset position seamlessly when one set has passed
        if (singleSetWidth > 0 && Math.abs(posRef.current) >= singleSetWidth) {
          posRef.current += singleSetWidth;
        }

        trackRef.current.style.transform = `translate3d(${posRef.current}px, 0, 0)`;
      }

      animFrameId.current = requestAnimationFrame(animate);
    };

    animFrameId.current = requestAnimationFrame(animate);

    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, []);

  return (
    <section className="testimonials-section" id="testimonials">
      <div className="testimonials-container">
        {/* Header Section */}
        <div className="testimonials-header-wrapper">
          <h2 className="testimonials-title">what they say about me....</h2>
        </div>

        {/* Marquee Track Container */}
        <div
          className="testimonials-marquee-container"
          onMouseEnter={() => {
            isHoveredRef.current = true;
          }}
          onMouseLeave={() => {
            isHoveredRef.current = false;
          }}
        >
          <div className="testimonials-marquee-track" ref={trackRef}>
            {marqueeItems.map((item, index) => (
              <div key={`${item.id}-${index}`} className="testimonial-card">
                <div className="testimonial-quote-box">
                  <p className="testimonial-quote">{item.quote}</p>
                </div>
                <div className="testimonial-author-box">
                  <div className="testimonial-author-info">
                    <h4 className="testimonial-author-name">{item.author}</h4>
                    <span className="testimonial-author-role">{item.role}</span>
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
