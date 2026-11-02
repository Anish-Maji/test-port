import React, { useState, useEffect, useRef } from 'react';
import { PullCord } from 'pullcord';
import 'pullcord/pullcord.css';
import { Sun, Moon } from 'lucide-react';
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
import PixelResumeGame from './components/PixelResumeGame';
import cvFile from './assets/CV/cv.pdf';
import { motion } from 'motion/react';
import { TextEffect } from '@/components/core/text-effect';
import worksData from './data/worksData';
import swapMockupImg from './assets/home/projects-ss.webp';
import nintendoImg from './assets/home/nintendo.png';
import baazBikesLogo from './assets/brand logos/webp logos/baaz-bikes.webp';

import navSwitchDefault from './assets/home/nitendo-switches/nav-switch.png';
import navSwitchTop from './assets/home/nitendo-switches/nav-switch-top-clicked.png';
import navSwitchBottom from './assets/home/nitendo-switches/nav-switch-bottom-clicked.png';
import navSwitchLeft from './assets/home/nitendo-switches/nav-switch-left-clicked.png';
import navSwitchRight from './assets/home/nitendo-switches/nav-switch-right-clicked.png';

import likeBtnDefault from './assets/home/nitendo-switches/like-button.png';
import likeBtnClicked from './assets/home/nitendo-switches/like-button-clicked.png';
import downloadBtnDefault from './assets/home/nitendo-switches/download-btn.webp';
import downloadBtnClicked from './assets/home/nitendo-switches/download-btn-clicked.webp';

import './App.css';

// worksData is imported from ./data/worksData




// ============================================================================
// HOME PAGE TITLE CONFIGURATION
// Change the string below to update the browser tab title for the homepage.
// ============================================================================
const HOME_PAGE_TITLE = "Anish Maji | Product Designer";

export function App() {
  const [currentView, setCurrentView] = useState(() => {
    if (window.location.hash.includes('swap-station')) return 'swap-station';
    if (window.location.hash.includes('referral-system')) return 'referral-system';
    if (window.location.hash.includes('play')) return 'play';
    if (window.location.hash.includes('about')) return 'about';
    return 'home';
  });

  const [theme, setTheme] = useState('light');
  const [isSiteLoaded, setIsSiteLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsSiteLoaded(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  // Interactive Nintendo Game Boy Controls: the D-pad drives the in-screen game,
  // A and B download the resume
  const [dpadActiveDir, setDpadActiveDir] = useState(null);
  const [isBtnAPressed, setIsBtnAPressed] = useState(false);
  const [isBtnBPressed, setIsBtnBPressed] = useState(false);
  const gameInputRef = useRef({ left: false, right: false, down: false, jump: false });

  const getNavSwitchImage = () => {
    switch (dpadActiveDir) {
      case 'top': return navSwitchTop;
      case 'bottom': return navSwitchBottom;
      case 'left': return navSwitchLeft;
      case 'right': return navSwitchRight;
      default: return navSwitchDefault;
    }
  };

  const DPAD_INPUT_KEYS = { left: 'left', right: 'right', bottom: 'down' };

  const handleDpadDown = (direction) => {
    setDpadActiveDir(direction);
    if (direction === 'top') {
      gameInputRef.current.jump = true;
    } else {
      gameInputRef.current[DPAD_INPUT_KEYS[direction]] = true;
    }
  };

  const handleDpadUp = (direction) => {
    setDpadActiveDir((prev) => (prev === direction ? null : prev));
    if (direction !== 'top') {
      gameInputRef.current[DPAD_INPUT_KEYS[direction]] = false;
    }
  };

  // Keyboard activation (Enter/Space) has no pointer events, so treat it as a short tap
  const handleDpadKeyboardClick = (e, direction) => {
    if (e.detail !== 0) return;
    handleDpadDown(direction);
    setTimeout(() => handleDpadUp(direction), 250);
  };

  const getDpadHandlers = (direction) => ({
    onPointerDown: (e) => {
      e.preventDefault();
      handleDpadDown(direction);
    },
    onPointerUp: () => handleDpadUp(direction),
    onPointerLeave: () => handleDpadUp(direction),
    onPointerCancel: () => handleDpadUp(direction),
    onContextMenu: (e) => e.preventDefault(),
    onClick: (e) => handleDpadKeyboardClick(e, direction),
  });

  const downloadResume = () => {
    const link = document.createElement('a');
    link.href = cvFile;
    link.download = 'Anish-Maji-Resume.pdf';
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const handleBtnAPress = () => {
    setIsBtnAPressed(true);
    downloadResume();
    setTimeout(() => setIsBtnAPressed(false), 200);
  };

  const handleBtnBPress = () => {
    setIsBtnBPressed(true);
    downloadResume();
    setTimeout(() => setIsBtnBPressed(false), 200);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    if (currentView === 'home') {
      document.title = HOME_PAGE_TITLE;
    }
  }, [currentView]);

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
    } else {
      setCurrentView('swap-station');
      window.location.hash = 'swap-station';
    }
    window.scrollTo(0, 0);
  };

  const handleBackToWork = () => {
    setCurrentView('home');
    window.location.hash = 'work';
    window.scrollTo(0, 0);
  };

  if (currentView === 'swap-station') {
    return (
      <div className="app-layout">
        <PullCord
          className="desktop-pullcord"
          onPull={toggleTheme}
          pulled={theme === 'dark'}
          ariaLabel="Toggle theme"
          config={{
            gravity: 1250,
            damping: 0.94,
            iterations: 20,
            stretchMax: 28,
          }}
        />
        <button
          className="mobile-theme-toggle-btn"
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} strokeWidth={2.2} />}
        </button>
        <Navbar onNavigateHome={handleBackToWork} activePage="swap-station" />
        <SwapStationPage onBackToWork={handleBackToWork} worksData={worksData} onOpenCaseStudy={handleOpenCaseStudy} />
        <Footer />
      </div>
    );
  }

  if (currentView === 'referral-system') {
    return (
      <div className="app-layout">
        <PullCord
          className="desktop-pullcord"
          onPull={toggleTheme}
          pulled={theme === 'dark'}
          ariaLabel="Toggle theme"
          config={{
            gravity: 1250,
            damping: 0.94,
            iterations: 20,
            stretchMax: 28,
          }}
        />
        <button
          className="mobile-theme-toggle-btn"
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} strokeWidth={2.2} />}
        </button>
        <Navbar onNavigateHome={handleBackToWork} activePage="referral-system" />
        <ReferralSystemPage onBackToWork={handleBackToWork} />
        <Footer />
      </div>
    );
  }

  if (currentView === 'play') {
    return (
      <div className="app-layout">
        <PullCord
          className="desktop-pullcord"
          onPull={toggleTheme}
          pulled={theme === 'dark'}
          ariaLabel="Toggle theme"
          config={{
            gravity: 1250,
            damping: 0.94,
            iterations: 20,
            stretchMax: 28,
          }}
        />
        <button
          className="mobile-theme-toggle-btn"
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} strokeWidth={2.2} />}
        </button>
        <Navbar onNavigateHome={handleBackToWork} activePage="play" />
        <PlayPage onBackToWork={handleBackToWork} />
        <Footer />
      </div>
    );
  }

  if (currentView === 'about') {
    return (
      <div className="app-layout">
        <PullCord
          className="desktop-pullcord"
          onPull={toggleTheme}
          pulled={theme === 'dark'}
          ariaLabel="Toggle theme"
          config={{
            gravity: 1250,
            damping: 0.94,
            iterations: 20,
            stretchMax: 28,
          }}
        />
        <button
          className="mobile-theme-toggle-btn"
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} strokeWidth={2.2} />}
        </button>
        <Navbar onNavigateHome={handleBackToWork} activePage="about" />
        <AboutPage onBackToWork={handleBackToWork} />
        <Footer />
      </div>
    );
  }

  return (
    <div className="app-layout">
      {/* Physics-based Hanging PullCord Theme Toggle (Desktop Only) */}
      <PullCord
        className="desktop-pullcord"
        onPull={toggleTheme}
        pulled={theme === 'dark'}
        ariaLabel="Toggle theme"
        config={{
          gravity: 1250,
          damping: 0.94,
          iterations: 20,
          stretchMax: 28,
        }}
      />

      {/* Floating Theme Toggle Button (Mobile Only) */}
      <button
        className="mobile-theme-toggle-btn"
        onClick={toggleTheme}
        aria-label="Toggle theme"
      >
        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} strokeWidth={2.2} />}
      </button>

      {/* Preloading Website Loader */}
      <WebsiteLoader onFinish={() => setIsSiteLoaded(true)} />

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
            borderColor={theme === 'dark' ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.04)"}
            hoverFillColor={theme === 'dark' ? "rgba(255, 255, 255, 0.10)" : "rgba(0, 0, 0, 0.07)"}
            shape="square"
            hoverTrailAmount={5}
            className="hero-shapegrid-bg"
          />

          <div className="hero-layout-grid">
            {/* Left Content Column */}
            <motion.div
              layout="position"
              transition={{
                duration: 0.85,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="hero-content"
            >
              <motion.div
                layout="position"
                transition={{
                  duration: 0.85,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="hero-title-row"
              >
                <Shuffle
                  text="A.NICHE"
                  tag="h1"
                  className="hero-title"
                  shuffleDirection="up"
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
                <span className="hero-sub">
                  /anish/
                </span>
              </motion.div>
              <motion.div
                layout="position"
                transition={{
                  duration: 0.85,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className='hero-all'
              >
                <div className="hero-designation-badge">
                  <a href="https://www.baaz.bike/" target="_blank" rel="noopener noreferrer">
                    <span>Product Designer at</span>
                  </a>
                  <img
                    src={baazBikesLogo}
                    alt="Baaz Bikes"
                    className="hero-designation-logo"
                  />
                </div>
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={isSiteLoaded ? { opacity: 1, height: 'auto' } : { opacity: 0, height: 0 }}
                  transition={{
                    height: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
                    opacity: { duration: 0.5, delay: 0.1 },
                  }}
                  style={{ overflow: 'hidden' }}
                >
                  <TextEffect
                    per='char'
                    preset='fade'
                    as='p'
                    className='hero-description'
                    trigger={isSiteLoaded}
                    delay={0.15}
                    speedReveal={1.3}
                  >
                    a.niche (n.) a designer's natural habitat, discovered by accident while spelling his own name. Small, cluttered, occasionally brilliant.
                  </TextEffect>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Right Column: Nintendo Game Boy SP Device & Interactive Controls */}
            <div className="hero-device-container">
              <div className="nintendo-device-wrapper">
                <img
                  src={nintendoImg}
                  alt="Nintendo Game Boy SP"
                  className="nintendo-device-img"
                  draggable={false}
                />
                <div className="nintendo-screen-viewport">
                  <PixelResumeGame inputRef={gameInputRef} />
                </div>

                {/* Interactive D-Pad (Red Highlighted Area) */}
                <div className="nintendo-dpad-container">
                  <img
                    src={getNavSwitchImage()}
                    alt="Navigation Switch"
                    className="nintendo-dpad-img"
                    draggable={false}
                  />
                  <button
                    type="button"
                    className="dpad-btn dpad-btn-top"
                    {...getDpadHandlers('top')}
                    aria-label="Jump (Up)"
                  />
                  <button
                    type="button"
                    className="dpad-btn dpad-btn-bottom"
                    {...getDpadHandlers('bottom')}
                    aria-label="Crouch (Down)"
                  />
                  <button
                    type="button"
                    className="dpad-btn dpad-btn-left"
                    {...getDpadHandlers('left')}
                    aria-label="Walk backward (Left)"
                  />
                  <button
                    type="button"
                    className="dpad-btn dpad-btn-right"
                    {...getDpadHandlers('right')}
                    aria-label="Walk forward (Right)"
                  />
                </div>

                {/* Interactive Button B (Lower-Left Green Highlighted Area) */}
                <button
                  type="button"
                  className={`nintendo-btn-b ${isBtnBPressed ? 'pressed' : ''}`}
                  onClick={handleBtnBPress}
                  aria-label="Button B - Download resume"
                >
                  <img
                    src={isBtnBPressed ? likeBtnClicked : likeBtnDefault}
                    alt="Button B"
                    className="nintendo-btn-img"
                    draggable={false}
                  />
                </button>

                {/* Interactive Button A (Upper-Right Green Highlighted Area) */}
                <button
                  type="button"
                  className={`nintendo-btn-a ${isBtnAPressed ? 'pressed' : ''}`}
                  onClick={handleBtnAPress}
                  aria-label="Button A - Download resume"
                >
                  <img
                    src={isBtnAPressed ? downloadBtnClicked : downloadBtnDefault}
                    alt="Button A"
                    className="nintendo-btn-img"
                    draggable={false}
                  />
                </button>
              </div>
            </div>
          </div>
        </section>

        <div className="simple-divider"></div>

        {/* Infinite Brand Logo Ticker */}
        <BrandTicker />

        <div className="simple-divider"></div>

        {/* Redesigned Works / Case Studies Section */}
        <ProjectsSection
          worksData={worksData}
          onOpenCaseStudy={handleOpenCaseStudy}
          isLoaded={isSiteLoaded}
        />

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

      </main >

      <Footer />
    </div >
  );
}

export default App;

