import React, { useState } from 'react';
import { LockKeyhole, ArrowRight, X } from 'lucide-react';
import './PasswordProtect.css';

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

export default function PasswordProtect({ onUnlock, correctPassword = 'baaz2025', linkedinUrl = 'https://www.linkedin.com/in/anish-maji/' }) {
  const [showInput, setShowInput] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === correctPassword) {
      setError('');
      onUnlock();
    } else {
      setError('Incorrect password. Please try again or reach out.');
    }
  };

  return (
    <div className="password-protect-overlay">
      <div className="nda-card-container">
        {!showInput ? (
          <div className="nda-card-content">
            <div className="nda-card-row">
              {/* Left Badge */}
              <div className="nda-left-badge">
                <div className="nda-lock-circle">
                  <LockKeyhole size={24} strokeWidth="3px" color="#84CC16" />
                </div>
                <span className="nda-lock-title">NDA Restricted Content</span>
              </div>

              {/* Right Text */}
              <div className="nda-right-text-box">
                To respect confidentiality agreements, all the process artifacts are private.
                Should you think this is interesting, let's talk about my contribution in more detail over a DM.
              </div>
            </div>

            {/* Buttons Row */}
            <div className="nda-buttons-row">
              <button
                className="nda-btn btn-secondary"
                onClick={() => {
                  setShowInput(true);
                  setError('');
                }}
              >
                I know the password!
              </button>
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="nda-btn btn-primary"
              >
                <LinkedinIcon size={16} fill="none" color="#ffffff" />
                <span>Reach me on LinkedIn</span>
              </a>
            </div>
          </div>
        ) : (
          <div className="nda-card-content password-form-view">
            <div className="password-form-header">
              <h4 className="password-form-title">Enter Access Password</h4>
              <button
                className="password-form-close"
                onClick={() => setShowInput(false)}
                aria-label="Back"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="password-input-form">
              <div className="password-input-wrapper">
                <input
                  type="password"
                  placeholder="Enter case study password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="password-text-input"
                  autoFocus
                />
                <button type="submit" className="password-submit-btn">
                  <span>Unlock</span>
                  <ArrowRight size={14} />
                </button>
              </div>
              {error && <p className="password-error-message">{error}</p>}
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
