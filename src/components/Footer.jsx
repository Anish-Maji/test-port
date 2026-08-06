import React, { useState, useEffect } from 'react';
import { ArrowRight, ArrowUpRight, Mail } from 'lucide-react';
import '../styles/Footer.css';

const verbs = ['design', 'create', 'build'];

function AnimatedVerb() {
  const [index, setIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsExiting(true);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % verbs.length);
        setIsExiting(false);
      }, 400); // match fadeOut duration
    }, 2400);

    return () => clearInterval(interval);
  }, []);

  return (
    <span className="animated-verb-container">
      <span key={index} className={`animated-verb-word ${isExiting ? 'exit' : 'enter'}`}>
        {verbs[index]}
      </span>
    </span>
  );
}

const LinkedinIcon = ({ size = 18 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <circle cx="4" cy="3.8" r="2.2" />
    <path d="M1.8 9h4.4v13H1.8zM9.8 9h4.2v1.9c.7-1.2 2.1-2.1 4.2-2.1 3.2 0 4.8 2.1 4.8 5.8V22h-4.4v-6.6c0-1.8-.6-2.9-2.1-2.9-1.2 0-2 .9-2.2 1.7-.1.3-.1.7-.1 1.1V22H9.8V9z" />
  </svg>
);

const BehanceIcon = ({ size = 18 }) => (
  <svg
    width={size}
    height={Math.round(size * (417 / 667))}
    viewBox="0 0 667 417"
    fill="currentColor"
  >
    <path d="M611.103 55.555H416.663V0H611.103V55.555ZM659.05 333.33C646.77 369.357 602.687 416.663 517.357 416.663C431.967 416.663 362.8 368.633 362.8 259.023C362.8 150.417 427.383 94.5823 514.633 94.5823C600.243 94.5823 652.52 144.083 663.937 217.527C666.103 231.58 666.963 250.527 666.577 276.97H443.607C447.217 366.163 540.357 368.967 571.05 333.33H659.05ZM445.55 222.22H583.467C580.55 179.247 551.91 160.58 514.66 160.58C473.94 160.58 451.413 181.913 445.55 222.22ZM179.609 416.33H0V0.583331H193.137C345.247 2.83333 348.137 151.803 268.69 192.413C364.83 227.413 368.05 416.33 179.609 416.33ZM83.3323 166.663H182.887C252.553 166.663 263.608 83.3323 174.22 83.3323H83.3323V166.663ZM177.526 249.997H83.3323V333.773H176.137C260.997 333.773 255.803 249.997 177.526 249.997Z" />
  </svg>
);

export function Footer() {
  return (
    <footer id="contact" className="site-footer">
      <div className="footer-top-grid">
        {/* Left Block: Open for Roles CTA */}
        <div className="footer-cta-col">
          <h2 className="footer-cta-heading">
            Let's <AnimatedVerb /> <br />incredible works together.
          </h2>
          <a className="footer-get-in-touch">
            <span>Email: masteranishmaji@gmail.com</span>
          </a>
        </div>

        {/* Right Block: Social Cards Grid */}
        <div className="footer-social-cards">
          {/* Card 1: LinkedIn */}
          <a
            href="https://www.linkedin.com/in/anish-maji/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-social-card highlight"
          >
            <div className="social-card-top">
              <div className="social-icon-badge highlight-badge">
                <LinkedinIcon size={18} />
              </div>
            </div>
            <span className="social-card-title">LinkedIn</span>
            <div className="social-card-bottom">
              <div className="social-arrow-box highlight-arrow">
                <ArrowUpRight size={14} />
              </div>
            </div>
          </a>

          {/* Card 2: Gmail */}
          <a
            href="mailto:masteranishmaji@gmail.com"
            className="footer-social-card"
          >
            <div className="social-card-top">
              <div className="social-icon-badge">
                <Mail size={18} />
              </div>
            </div>
            <span className="social-card-title">Gmail</span>
            <div className="social-card-bottom">
              <div className="social-arrow-box">
                <ArrowUpRight size={14} />
              </div>
            </div>
          </a>

          {/* Card 3: Behance */}
          <a
            href="https://www.behance.net/anishmaji_"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-social-card"
          >
            <div className="social-card-top">
              <div className="social-icon-badge">
                <BehanceIcon size={20} />
              </div>
            </div>
            <span className="social-card-title">Behance</span>
            <div className="social-card-bottom">
              <div className="social-arrow-box">
                <ArrowUpRight size={14} />
              </div>
            </div>
          </a>
        </div>
      </div>

      {/* Bottom copyright bar */}
      <div className="footer-bottom-bar">
        <div className="footer-copyright">
          &bull; 2026 ANISH - ALL RIGHTS RESERVED
        </div>
        <div className="footer-status-badge">
          <span className="status-dot"></span>
          <span>AVAILABLE FOR ROLES</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
