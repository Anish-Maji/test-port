import React, { useRef, useEffect } from 'react';
import '../styles/TestimonialsSection.css';

// ============================================================================
// MARQUEE SPEED CONFIGURATION (Tweak these values to suit your demand!)
// ============================================================================
const NORMAL_SPEED = 0.25;  // Default normal scroll speed (px per frame)
const HOVER_SPEED = 0.02;   // Ultra-slow scroll speed when HOVERED (10x slower!)
const EASING_FACTOR = 0.15; // Speed transition response factor (0.01 - 0.5)
// ============================================================================

const testimonialsData = [
  {
    id: 1,
    quote: (
      <>
        Anish's timely delivery of exceptional work is impressive. He reliably met deadlines, demonstrating his commitment. His creativity in tackling design challenges and keen eye for detail significantly raised our design quality.
      </>
    ),
    author: 'Vysak A',
    role: 'PRODUCT DESIGN LEADER • REVOLUT',
  },
  {
    id: 2,
    quote: (
      <>
        What truly sets Anish apart is his unwavering dedication to continuous improvement. He has proven to be an invaluable team player, collaborating with colleagues from diverse backgrounds and skill sets.
      </>
    ),
    author: 'Siddharth Jain',
    role: 'PRODUCT DESIGN LEAD • KUKU FM',
  },
  {
    id: 3,
    quote: (
      <>
        Anish has excellent problem-solving abilities in the area of UX design.He is knowledgeable about user issues, corporate requirements, and innovative problem - solving.
      </>
    ),
    author: 'C Subramanya',
    role: 'SENIOR PRODUCT DESIGNER • SWIGGY',
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

export default function TestimonialsSection() {
  const trackRef = useRef(null);
  const posRef = useRef(0);
  const isHoveredRef = useRef(false);
  const animFrameId = useRef(null);

  // Duplicate array 3 times for continuous looping
  const marqueeItems = [...testimonialsData, ...testimonialsData, ...testimonialsData];

  useEffect(() => {
    let currentSpeed = NORMAL_SPEED;

    const animate = () => {
      // Switches between HOVER_SPEED (0.02) and NORMAL_SPEED (0.25)
      const targetSpeed = isHoveredRef.current ? HOVER_SPEED : NORMAL_SPEED;
      currentSpeed += (targetSpeed - currentSpeed) * EASING_FACTOR;

      if (trackRef.current) {
        posRef.current -= currentSpeed;
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
          <h2 className="testimonials-title">...things they say behind my back</h2>
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
