import React from 'react';
import { ArrowRight, ArrowUpRight, Mail, FileText } from 'lucide-react';
import '../styles/Footer.css';


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

export function Footer() {
  return (
    <footer id="contact" className="site-footer">
      <div className="footer-top-grid">
        {/* Left Block: Open for Roles CTA */}
        <div className="footer-cta-col">
          <h2 className="footer-cta-heading">
            I'm open for senior product designer or PD II roles.
          </h2>
          <a href="mailto:anish@example.com" className="footer-get-in-touch">
            <span>Get in touch</span>
            <ArrowRight size={16} />
          </a>
        </div>

        {/* Right Block: Social Cards Grid */}
        <div className="footer-social-cards">
          {/* Card 1: LinkedIn */}
          <a
            href="https://linkedin.com"
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
            href="mailto:anish@example.com"
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

          {/* Card 3: Substack */}
          <a
            href="https://substack.com"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-social-card"
          >
            <div className="social-card-top">
              <div className="social-icon-badge">
                <FileText size={18} />
              </div>
            </div>
            <span className="social-card-title">Substack</span>
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
