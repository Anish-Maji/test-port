import React, { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import TicTacToeGame from '../components/TicTacToeGame';
import '../styles/PlayPage.css';

// ============================================================================
// PAGE TITLE CONFIGURATION
// Change the string below to update the browser tab title for this page.
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

        {/* Main Game Interface */}
        <main className="play-main-area">
          <TicTacToeGame />
        </main>
      </div>
    </div>
  );
};

export default PlayPage;
