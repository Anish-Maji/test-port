import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import BrandTicker from './components/BrandTicker';
import ShapeGrid from './components/ShapeGrid';
import Shuffle from './components/Shuffle';
import SwapStationPage from './pages/SwapStationPage';
import Footer from './components/Footer';
import ToolstackSection from './components/ToolstackSection';
import swapMockupImg from './assets/swap_station_mockup.png';

import './App.css';



export function App() {
  const [currentView, setCurrentView] = useState(() => {
    return window.location.hash.includes('swap-station') ? 'swap-station' : 'home';
  });

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash.includes('swap-station')) {
        setCurrentView('swap-station');
        window.scrollTo(0, 0);
      } else if (currentView === 'swap-station' && window.location.hash === '#work') {
        setCurrentView('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [currentView]);

  const handleOpenCaseStudy = () => {
    setCurrentView('swap-station');
    window.location.hash = 'swap-station';
    window.scrollTo(0, 0);
  };

  const handleBackToWork = () => {
    setCurrentView('home');
    window.location.hash = 'work';
    setTimeout(() => {
      const workSection = document.getElementById('work');
      if (workSection) {
        workSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  if (currentView === 'swap-station') {
    return (
      <div className="app-layout">
        <Navbar onNavigateHome={handleBackToWork} activePage="swap-station" />
        <SwapStationPage onBackToWork={handleBackToWork} />
        <Footer />
      </div>
    );
  }

  return (
    <div className="app-layout">
      {/* Navigation Bar */}
      <Navbar onNavigateHome={handleBackToWork} activePage="home" />

      {/* Main Content Area */}
      <main className="main-content">
        {/* Hero Section */}
        <section id="work" className="hero-section container">
          <ShapeGrid
            speed={0.01}
            squareSize={40}
            direction="diagonal"
            borderColor="rgba(0, 0, 0, 0.06)"
            hoverFillColor="rgba(0, 0, 0, 0.12)"
            shape="square"
            hoverTrailAmount={5}
            className="hero-shapegrid-bg"
          />
          <div className="hero-content">
            <Shuffle
              text="a.niche"
              tag="h1"
              className="hero-title"
              shuffleDirection="right"
              duration={0.35}
              animationMode="evenodd"
              shuffleTimes={1}
              ease="power3.out"
              stagger={0.03}
              threshold={0.1}
              triggerOnce={true}
              triggerOnHover={true}
              respectReducedMotion={true}
              textAlign="left"
            />
            <p className="hero-designation">
              PRODUCT DESIGNER
              <br />
            </p>
            <p className="hero-sub">
              /anish/
            </p>
            <p className="hero-description">
              a.niche. a place where ideas find their purpose. A personal space for thoughtful design, experimentation, and craftsmanship.
            </p>
          </div>
        </section>

        <div className="simple-divider"></div>

        {/* Infinite Brand Logo Ticker */}
        <BrandTicker />

        <div className="simple-divider"></div>

        {/* Selected Works / Case Studies Section */}
        <section className="works-section container">
          <div className="works-header">
            <span className="works-section-tag">SELECTED CASE STUDIES</span>
            <h2 className="works-section-title">Featured Works</h2>
          </div>

          <div className="works-grid">
            {/* Swap Station Redesign Featured Card */}
            <div
              className="featured-work-card"
              onClick={handleOpenCaseStudy}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleOpenCaseStudy()}
            >
              <div className="work-card-media-box">
                <img
                  src={swapMockupImg}
                  alt="Baaz's battery swap station platform"
                  className="work-card-image"
                />
              </div>

              <div className="work-card-content">
                <div className="work-card-meta">
                  BAAZ MOBILITY &bull; EV & CLEAN TECH &bull; 2025
                </div>
                <h3 className="work-card-title">Baaz's battery swap station platform</h3>
              </div>
            </div>
          </div>
        </section>

        <div className="simple-divider"></div>

        {/* Toolstack Section */}
        <ToolstackSection />

        <div className="simple-divider"></div>

        {/* Portfolio Sections */}
        <section id="play" className="content-section container">
          <h2>Play Section</h2>
          <p>Creative experiments, side projects, animations, and personal work.</p>
        </section>

        <section id="about" className="content-section container">
          <h2>About Section</h2>
          <p>Bio, design philosophy, skills, and background story.</p>
        </section>

        <section id="cv" className="content-section container">
          <h2>CV / Resume</h2>
          <p>Downloadable CV, work experience timeline, and achievements.</p>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default App;

