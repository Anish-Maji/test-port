import React, { useState, useEffect } from 'react';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { ClawCaptcha } from 'playcaptcha';
import 'playcaptcha/clawcaptcha.css';
import TicTacToeGame from '../components/TicTacToeGame';
import DomeGallery from '../components/DomeGallery';
import '../styles/PlayPage.css';

// Automatically import all Global Esports WebP images using Vite import.meta.glob
const globalEsportsModules = import.meta.glob('../assets/about-me/global-esports/*.webp', { eager: true });
const GLOBAL_ESPORTS_IMAGES = Object.values(globalEsportsModules).map((mod, i) => ({
  src: mod.default,
  alt: `Global Esports Artwork ${i + 1}`
}));

const DEFAULT_PAGE_TITLE = "Play | a.niche Portfolio";

export const PlayPage = ({ onBackToWork, pageTitle = DEFAULT_PAGE_TITLE }) => {
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    document.title = pageTitle;
  }, [pageTitle]);

  return (
    <div className="play-page-container">
      <div className="play-content-wrapper">
        {/* Top Toolbar */}
        <div className="play-top-toolbar">
          <button className="back-btn" onClick={onBackToWork}>
            <ArrowLeft size={18} />
            <span>Back to Work</span>
          </button>
        </div>

        {/* Main Game Interface: Tic-Tac-Toe */}
        <main className="play-main-area">
          <TicTacToeGame />
        </main>

        {/* Section Divider */}
        <div className="play-section-divider"></div>

        {/* Arcade Claw Machine or Unlocked Dome Gallery */}
        {isVerified ? (
          <section className="dome-gallery-section">
            <div className="dome-gallery-header">
              <span className="claw-badge">Unlocked Gallery 🏆</span>
              <h2 className="claw-main-title">Global Esports Era 🌐</h2>
              <p className="claw-description">
                You grabbed the toy and unlocked Anish's Global Esports design vault! Drag in 3D space to rotate the dome sphere and click any tile to view full artwork.
              </p>
            </div>

            <div className="dome-gallery-container">
              <DomeGallery
                images={GLOBAL_ESPORTS_IMAGES}
                fit={0.85}
                minRadius={600}
                segments={24}
                dragDampening={2}
                grayscale={false}
                overlayBlurColor="var(--bg-primary)"
                openedImageWidth="640px"
                openedImageHeight="360px"
              />
            </div>
          </section>
        ) : (
          <section className="claw-game-container">
            {/* Left Column: Header & Description */}
            <div className="claw-header-content">
              <h2 className="claw-main-title">What to know my origin?</h2>
              <p className="claw-description">
                Steer the claw machine using the joystick (or arrow keys) to catch the requested plushie and drop it down the hatch to unlock the secret 3D gallery!
              </p>
              <button
                className="claw-quick-unlock-btn"
                onClick={() => setIsVerified(true)}
                title="Quick unlock for testing"
              >
                <Sparkles size={14} />
                <span>Quick Unlock Globe</span>
              </button>
            </div>

            {/* Right Column: Claw Machine Widget */}
            <div className="claw-machine-section">
              <ClawCaptcha
                title="Claw Machine Challenge"
                onVerify={() => setIsVerified(true)}
              />
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default PlayPage;
