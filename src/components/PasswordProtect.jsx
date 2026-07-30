import React, { useState } from 'react';
import { LockKeyhole, ArrowRight, X } from 'lucide-react';
import './PasswordProtect.css';

const LinkedinIcon = ({ size = 18, color = "currentColor", fill = "none" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={fill}
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function PasswordProtect({ onUnlock, correctPassword = 'baaz2025', linkedinUrl = 'https://www.linkedin.com/in/anishmaji/' }) {
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
                  <LockKeyhole size={24} strokeWidth="3px" color="#ea580c" />
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
