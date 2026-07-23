import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import BrandTicker from './components/BrandTicker';
import ShapeGrid from './components/ShapeGrid';
import Shuffle from './components/Shuffle';
import SwapStationPage from './pages/SwapStationPage';
import Footer from './components/Footer';
import ToolstackSection from './components/ToolstackSection';
import BooksSection from './components/BooksSection';
import swapMockupImg from './assets/swap_station_mockup.png';
import crimsonImg from './assets/brand logos/crimson_healthcare_pvt_ltd_cover.jpeg';
import globalEsportsImg from './assets/brand logos/Global esports.webp';
import kioskScreenImg from './assets/swap_flow_kiosk_screen.png';
import historyScreenImg from './assets/swap_flow_history_screen.png';
import frameImg from './assets/Frame 34768.png';

import './App.css';

const worksData = [
  {
    id: 'swap-station',
    title: "Baaz's battery swap station platform",
    meta: "BAAZ MOBILITY • EV & CLEAN TECH • 2025",
    image: swapMockupImg,
    bgColor: "#98E4B7",
    isInteractive: true,
  },
  {
    id: 'crimson-healthcare',
    title: "Crimson Healthcare — MedTech Digital Platform",
    meta: "CRIMSON HEALTHCARE • MEDICAL TECH • 2024",
    image: crimsonImg,
    bgColor: "#F1F5F9",
    isInteractive: false,
  },
  {
    id: 'global-esports',
    title: "Global Esports — Brand Identity & Gaming Hub",
    meta: "GLOBAL ESPORTS • GAMING & MEDIA • 2024",
    image: globalEsportsImg,
    bgColor: "#18181B",
    isInteractive: false,
  },
  {
    id: 'kiosk-hmi',
    title: "Station Touchscreen Kiosk Interface System",
    meta: "BAAZ MOBILITY • HARDWARE HMI • 2025",
    image: kioskScreenImg,
    bgColor: "#E0E7FF",
    isInteractive: false,
  },
  {
    id: 'rider-app',
    title: "Rider Mobile Swap & Live Status Companion",
    meta: "BAAZ MOBILITY • MOBILE APP • 2024",
    image: historyScreenImg,
    bgColor: "#FEF3C7",
    isInteractive: false,
  },
  {
    id: 'fleet-portal',
    title: "IoT Fleet Operations & Analytics Dashboard",
    meta: "BAAZ MOBILITY • SAAS DASHBOARD • 2025",
    image: frameImg,
    bgColor: "#DCFCE7",
    isInteractive: false,
  },
];



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
          {/* <div className="works-header">
            <span className="works-section-tag">SELECTED CASE STUDIES</span>
            <h2 className="works-section-title">Featured Works</h2>
          </div> */}

          <div className="works-grid">
            {worksData.map((work) => (
              <div
                key={work.id}
                className="featured-work-card"
                onClick={work.isInteractive ? handleOpenCaseStudy : undefined}
                role={work.isInteractive ? "button" : undefined}
                tabIndex={work.isInteractive ? 0 : undefined}
                onKeyDown={
                  work.isInteractive
                    ? (e) => e.key === 'Enter' && handleOpenCaseStudy()
                    : undefined
                }
              >
                <div
                  className="work-card-media-box"
                  style={{ backgroundColor: work.bgColor }}
                >
                  <img
                    src={work.image}
                    alt={work.title}
                    className="work-card-image"
                  />
                </div>

                <div className="work-card-content">
                  <div className="category-meta-tag">
                    {work.meta}
                  </div>
                  <h3 className="work-card-title">{work.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="simple-divider"></div>

        {/* Toolstack Section */}
        <ToolstackSection />

        <div className="simple-divider"></div>

        {/* How I Get Inspired - Books Showcase Section */}
        <BooksSection />

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

