import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { PullCord } from 'pullcord';
import 'pullcord/pullcord.css';
import { Sun, Moon } from 'lucide-react';
import Navbar from './components/Navbar';
import BrandTicker from './components/BrandTicker';
import ShapeGrid from './components/ShapeGrid';
import Shuffle from './components/Shuffle';
import SwapStationPage from './pages/SwapStationPage';
import ReferralSystemPage from './pages/ReferralSystemPage';
import AboutPage from './pages/AboutPage';
import Footer from './components/Footer';

import ToolstackSection from './components/ToolstackSection';
import BooksSection from './components/BooksSection';
import TestimonialsSection from './components/TestimonialsSection';
import ProjectsSection from './components/ProjectsSection';
import SidequestsSection from './components/SidequestsSection';
import WebsiteLoader from './components/WebsiteLoader';
import SnakeResumeGame from './components/SnakeResumeGame';
import NameRoll from './components/NameRoll';
import cvFile from './assets/CV/cv.pdf';
import { motion } from 'motion/react';
import { TextEffect } from '@/components/core/text-effect';
import worksData from './data/worksData';
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
  // A downloads the resume and B (the heart) shows a thank-you on screen
  const [dpadActiveDir, setDpadActiveDir] = useState(null);
  const [isBtnAPressed, setIsBtnAPressed] = useState(false);
  const [isBtnBPressed, setIsBtnBPressed] = useState(false);
  // Set by SnakeResumeGame: { steer(direction), love() }
  const snakeControlsRef = useRef(null);

  const getNavSwitchImage = () => {
    switch (dpadActiveDir) {
      case 'top': return navSwitchTop;
      case 'bottom': return navSwitchBottom;
      case 'left': return navSwitchLeft;
      case 'right': return navSwitchRight;
      default: return navSwitchDefault;
    }
  };

  const handleDpadDown = (direction) => {
    setDpadActiveDir(direction);
    snakeControlsRef.current?.steer(direction);
  };

  const handleDpadUp = (direction) => {
    setDpadActiveDir((prev) => (prev === direction ? null : prev));
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

  // Keyboard arrows press the matching side of the D-pad. They only take over
  // while the Game Boy screen is mostly in view, so arrows still scroll elsewhere.
  const nintendoScreenRef = useRef(null);

  useEffect(() => {
    const screen = nintendoScreenRef.current;
    if (currentView !== 'home' || !screen) return undefined;

    const ARROW_DIRECTIONS = { ArrowUp: 'top', ArrowDown: 'bottom', ArrowLeft: 'left', ArrowRight: 'right' };
    let screenVisible = false;

    const observer = new IntersectionObserver(([entry]) => {
      screenVisible = entry.intersectionRatio >= 0.5;
    }, { threshold: [0, 0.5, 1] });
    observer.observe(screen);

    const isTyping = (target) =>
      target instanceof HTMLElement &&
      (target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName));

    const handleKeyDown = (e) => {
      const direction = ARROW_DIRECTIONS[e.key];
      if (!direction || !screenVisible || e.altKey || e.ctrlKey || e.metaKey || isTyping(e.target)) return;
      e.preventDefault();
      setDpadActiveDir(direction);
      // Holding a key repeats keydown; only the first press steers
      if (!e.repeat) snakeControlsRef.current?.steer(direction);
    };

    const handleKeyUp = (e) => {
      const direction = ARROW_DIRECTIONS[e.key];
      if (direction) setDpadActiveDir((prev) => (prev === direction ? null : prev));
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      observer.disconnect();
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [currentView]);

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
    snakeControlsRef.current?.love();
    setTimeout(() => setIsBtnBPressed(false), 200);
  };

  // The About page's photography section turns the whole site dark while it
  // (and anything below it, like the footer) is on screen. It never changes
  // the visitor's own theme choice, it only layers dark on top of it.
  const [inDarkZone, setInDarkZone] = useState(false);

  useEffect(() => {
    if (currentView !== 'about') setInDarkZone(false);
  }, [currentView]);

  const themeFadeTimer = useRef(null);

  useEffect(() => {
    const root = document.documentElement;
    const next = inDarkZone ? 'dark' : theme;
    if (root.getAttribute('data-theme') === next) return;
    // Fade colours instead of snapping (see .theme-fading in index.css)
    root.classList.add('theme-fading');
    root.setAttribute('data-theme', next);
    clearTimeout(themeFadeTimer.current);
    themeFadeTimer.current = setTimeout(() => root.classList.remove('theme-fading'), 700);
  }, [theme, inDarkZone]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    if (currentView === 'home') {
      document.title = HOME_PAGE_TITLE;
    }
  }, [currentView]);

  // Every page switch starts at the top. This runs before the new page paints
  // and jumps instantly: a plain scrollTo would be animated by the global
  // `scroll-behavior: smooth`, sliding up through the new page from wherever
  // the old one was scrolled to.
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [currentView]);

  // Stop the browser restoring old scroll positions on Back/Forward
  useEffect(() => {
    if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual';
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.includes('swap-station')) {
        setCurrentView('swap-station');
      } else if (hash.includes('referral-system')) {
        setCurrentView('referral-system');
      } else if (hash.includes('about')) {
        setCurrentView('about');
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
  };

  const handleBackToWork = () => {
    setCurrentView('home');
    window.location.hash = 'work';
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
        <AboutPage onDarkZoneChange={setInDarkZone} />
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
                <NameRoll className="hero-sub" />
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
                <div className="nintendo-screen-viewport" ref={nintendoScreenRef}>
                  <SnakeResumeGame controlsRef={snakeControlsRef} />
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
                    aria-label="Snake up"
                  />
                  <button
                    type="button"
                    className="dpad-btn dpad-btn-bottom"
                    {...getDpadHandlers('bottom')}
                    aria-label="Snake down"
                  />
                  <button
                    type="button"
                    className="dpad-btn dpad-btn-left"
                    {...getDpadHandlers('left')}
                    aria-label="Snake left"
                  />
                  <button
                    type="button"
                    className="dpad-btn dpad-btn-right"
                    {...getDpadHandlers('right')}
                    aria-label="Snake right"
                  />
                </div>

                {/* Interactive Button B (Lower-Left Green Highlighted Area) */}
                <button
                  type="button"
                  className={`nintendo-btn-b ${isBtnBPressed ? 'pressed' : ''}`}
                  onClick={handleBtnBPress}
                  aria-label="Button B - Send some love"
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

        {/* Sidequests Section */}
        <SidequestsSection />

        <div className="simple-divider"></div>

        {/* Toolstack Section */}
        <ToolstackSection />

        <div className="simple-divider"></div>

        {/* How I Get Inspired - Books Showcase Section */}
        <BooksSection />

        <div className="simple-divider"></div>

        {/* Testimonials Section */}
        <TestimonialsSection />

      </main >

      <Footer />
    </div >
  );
}

export default App;

