import React, { useState, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import HowrahScene from './HowrahScene';
import { ClaudeLogo, PixelHeart } from './FooterBadges';
import '../styles/Footer.css';

const EMAIL = 'masteranishmaji@gmail.com';
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

// Current time in Kolkata, refreshed every 20s
function useKolkataTime() {
  const format = () =>
    new Date().toLocaleTimeString('en-GB', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit' });
  const [time, setTime] = useState(format);
  useEffect(() => {
    const timer = setInterval(() => setTime(format()), 20000);
    return () => clearInterval(timer);
  }, []);
  return time;
}

function CopyEmail() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  return (
    <div className="footer-email-pill">
      <a href={`mailto:${EMAIL}`} className="footer-email-link">{EMAIL}</a>
      <button type="button" className="footer-copy-btn" onClick={copy} aria-live="polite">
        {copied ? 'Copied' : 'Copy'}
      </button>
    </div>
  );
}

export function Footer() {
  const time = useKolkataTime();

  return (
    <footer id="contact" className="site-footer">
      {/* Pixel-art Howrah Bridge behind the contact block */}
      <div className="footer-stage">
        <HowrahScene className="footer-scene" />

        <div className="footer-content">
          <h2 className="footer-heading">
            Let's <AnimatedVerb /> something<span className="footer-heading-dot">.</span>
          </h2>
          <p className="footer-copy">
            Have a messy problem, an ambitious idea, or a product that needs untangling?
            I'd love to hear about it.
          </p>
          <CopyEmail />
          <div className="footer-links">
            <a href="https://www.linkedin.com/in/anish-maji/" target="_blank" rel="noopener noreferrer" className="footer-link-pill">
              LinkedIn <ArrowUpRight size={12} aria-hidden="true" />
            </a>
            <a href="https://www.behance.net/anishmaji_" target="_blank" rel="noopener noreferrer" className="footer-link-pill">
              Behance <ArrowUpRight size={12} aria-hidden="true" />
            </a>
          </div>
        </div>

        <p className="footer-scene-hint">Click anywhere to light up the sky</p>
      </div>

      {/* Bottom bar */}
      <div className="footer-bottom-bar">
        <span>&copy; 2026 Anish Maji</span>
        <span className="footer-bottom-meta">
          Gurugram &middot; {time} IST &middot; Built with
          <PixelHeart className="footer-heart" />
          in
          <ClaudeLogo className="footer-claude" />
        </span>
        <span className="footer-status-badge">
          <span className="status-dot" aria-hidden="true"></span>
          Available for roles
        </span>
      </div>
    </footer>
  );
}

export default Footer;
