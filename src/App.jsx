import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import BrandTicker from './components/BrandTicker';
import ShapeGrid from './components/ShapeGrid';
import Shuffle from './components/Shuffle';
import SwapStationPage from './pages/SwapStationPage';
import ReferralSystemPage from './pages/ReferralSystemPage';
import PlayPage from './pages/PlayPage';
import AboutPage from './pages/AboutPage';
import Footer from './components/Footer';

import ToolstackSection from './components/ToolstackSection';
import BooksSection from './components/BooksSection';
import VisualPlaygroundSection from './components/VisualPlaygroundSection';
import CinematicBrainSection from './components/CinematicBrainSection';
import TestimonialsSection from './components/TestimonialsSection';
import ProjectsSection from './components/ProjectsSection';
import WebsiteLoader from './components/WebsiteLoader';
import worksData from './data/worksData';
import swapMockupImg from './assets/home/projects-ss.webp';
import referralHeroImg from './assets/referral_hero.png';
import laundryVideo from './assets/home/laundry-thumbnail.webm';
import nintendoImg from './assets/home/nintendo.png';
import crimsonImg from './assets/brand logos/crimson_healthcare_pvt_ltd_cover.jpeg';
import globalEsportsImg from './assets/brand logos/Global esports.webp';
import kioskScreenImg from './assets/swap_flow_kiosk_screen.png';
import historyScreenImg from './assets/swap_flow_history_screen.png';
import frameImg from './assets/Frame 34768.png';
import referralthumb from './assets/home/referral.webm';

import project1 from './assets/playground/project-1.webp';
import project2 from './assets/playground/project-2.webp';
import project3 from './assets/playground/project-3.webp';
import project4 from './assets/playground/project-4.webp';
import project5 from './assets/playground/project-5.webp';
import project6 from './assets/playground/project-6.webp';
import arihant from './assets/home/arihant-coming-soon.webm';

import './App.css';

const heroSlideshowImages = [
  swapMockupImg,
  project2,
  project1,
  project3,
  project4,
  project5,
  project6,
];

// worksData is imported from ./data/worksData




// ============================================================================
// HOME PAGE TITLE CONFIGURATION
// Change the string below to update the browser tab title for the homepage.
// ============================================================================
const HOME_PAGE_TITLE = "a.niche | Anish Maji - Product Designer";

export function App() {
  const [currentView, setCurrentView] = useState(() => {
    if (window.location.hash.includes('swap-station')) return 'swap-station';
    if (window.location.hash.includes('referral-system')) return 'referral-system';
    if (window.location.hash.includes('play')) return 'play';
    if (window.location.hash.includes('about')) return 'about';
    return 'home';
  });

  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  useEffect(() => {
    if (currentView === 'home') {
      document.title = HOME_PAGE_TITLE;
    }
  }, [currentView]);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlideIndex((prev) => (prev + 1) % heroSlideshowImages.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.includes('swap-station')) {
        setCurrentView('swap-station');
        window.scrollTo(0, 0);
      } else if (hash.includes('referral-system')) {
        setCurrentView('referral-system');
        window.scrollTo(0, 0);
      } else if (hash.includes('play')) {
        setCurrentView('play');
        window.scrollTo(0, 0);
      } else if (hash.includes('about')) {
        setCurrentView('about');
        window.scrollTo(0, 0);
      } else if (currentView !== 'home' && (hash === '#work' || hash === '')) {
        setCurrentView('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [currentView]);

  const handleOpenCaseStudy = (id = 'swap-station') => {
    if (id === 'referral-system') {
      setCurrentView('referral-system');
      window.location.hash = 'referral-system';
      window.scrollTo(0, 0);
    } else {
      setCurrentView('swap-station');
      window.location.hash = 'swap-station';
      window.scrollTo(0, 0);
    }
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
        <SwapStationPage onBackToWork={handleBackToWork} worksData={worksData} onOpenCaseStudy={handleOpenCaseStudy} />
        <Footer />
      </div>
    );
  }

  if (currentView === 'referral-system') {
    return (
      <div className="app-layout">
        <Navbar onNavigateHome={handleBackToWork} activePage="referral-system" />
        <ReferralSystemPage onBackToWork={handleBackToWork} />
        <Footer />
      </div>
    );
  }

  if (currentView === 'play') {
    return (
      <div className="app-layout">
        <Navbar onNavigateHome={handleBackToWork} activePage="play" />
        <PlayPage onBackToWork={handleBackToWork} />
        <Footer />
      </div>
    );
  }

  if (currentView === 'about') {
    return (
      <div className="app-layout">
        <Navbar onNavigateHome={handleBackToWork} activePage="about" />
        <AboutPage onBackToWork={handleBackToWork} />
        <Footer />
      </div>
    );
  }

  return (
    <div className="app-layout">
      {/* Preloading Website Loader */}
      <WebsiteLoader />

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

          <div className="hero-layout-grid">
            {/* Left Content Column */}
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
              <div className='hero-all'>
                <p className="hero-designation">
                  PRODUCT DESIGNER
                </p>
                <p className="hero-sub">
                  /anish/
                </p>
                <p className="hero-description">
                  a.niche. a place where ideas find their purpose. A personal space for thoughtful design, experimentation, and craftsmanship.
                </p>
              </div>
            </div>

            {/* Right Column: Nintendo Game Boy SP Device & Screen Slideshow */}
            <div className="hero-device-container">
              <div className="nintendo-device-wrapper">
                <img
                  src={nintendoImg}
                  alt="Nintendo Game Boy SP"
                  className="nintendo-device-img"
                  draggable={false}
                />
                <div className="nintendo-screen-viewport">
                  {heroSlideshowImages.map((src, idx) => (
                    <img
                      key={idx}
                      src={src}
                      alt={`Project Slide ${idx + 1}`}
                      className={`nintendo-screen-slide ${idx === activeSlideIndex ? 'active' : ''}`}
                      loading="eager"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="simple-divider"></div>

        {/* Infinite Brand Logo Ticker */}
        <BrandTicker />

        <div className="simple-divider"></div>

        {/* Redesigned Works / Case Studies Section */}
        <ProjectsSection worksData={worksData} onOpenCaseStudy={handleOpenCaseStudy} />

        <div className="simple-divider"></div>

        {/* Toolstack Section */}
        <ToolstackSection />

        <div className="simple-divider"></div>

        {/* How I Get Inspired - Books Showcase Section */}
        <BooksSection />

        <div className="simple-divider"></div>

        {/* Visual Playground / Archive Section */}
        <VisualPlaygroundSection />

        <div className="simple-divider"></div>

        {/* My Cinematic Brain / Instagram Feed Section */}
        <CinematicBrainSection />

        <div className="simple-divider"></div>

        {/* Testimonials Section */}
        <TestimonialsSection />

        <div className="simple-divider"></div>

      </main>

      <Footer />
    </div>
  );
}

export default App;

