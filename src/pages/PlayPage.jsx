import React, { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { ClawCaptcha } from 'playcaptcha';
import 'playcaptcha/clawcaptcha.css';
import TicTacToeGame from '../components/TicTacToeGame';
import '../styles/PlayPage.css';

// ============================================================================
// PAGE TITLE CONFIGURATION
// ============================================================================
const DEFAULT_PAGE_TITLE = "Play | a.niche Portfolio";

export const PlayPage = ({ onBackToWork, pageTitle = DEFAULT_PAGE_TITLE }) => {
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

        {/* Arcade Claw Machine Section (2-Column Grid matching Tic-Tac-Toe) */}
        <section className="claw-game-container">
          {/* Left Column: Header & Description */}
          <div className="claw-header-content">
            <span className="claw-badge">Arcade Game</span>
            <h2 className="claw-main-title">Claw Machine Arcade</h2>
            <p className="claw-description">
              Steer the claw machine using the joystick (or arrow keys) to catch the requested plushie and drop it down the hatch!
            </p>
          </div>

          {/* Right Column: Claw Machine Widget */}
          <div className="claw-machine-section">
            <ClawCaptcha title="Claw Machine Challenge" />
          </div>
        </section>
      </div>
    </div>
  );
};

export default PlayPage;
