import React, { useState, useEffect } from 'react';
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
import EmojiBurst from './components/EmojiBurst';
import worksData from './data/worksData';
import swapMockupImg from './assets/home/projects-ss.webp';
import nintendoImg from './assets/home/nintendo.png';

import navSwitchDefault from './assets/home/nitendo-switches/nav-switch.png';
import navSwitchTop from './assets/home/nitendo-switches/nav-switch-top-clicked.png';
import navSwitchBottom from './assets/home/nitendo-switches/nav-switch-bottom-clicked.png';
import navSwitchLeft from './assets/home/nitendo-switches/nav-switch-left-clicked.png';
import navSwitchRight from './assets/home/nitendo-switches/nav-switch-right-clicked.png';

import likeBtnDefault from './assets/home/nitendo-switches/like-button.png';
import likeBtnClicked from './assets/home/nitendo-switches/like-button-clicked.png';

import project1 from './assets/playground/project-1.webp';
import project2 from './assets/playground/project-2.webp';
import project3 from './assets/playground/project-3.webp';
import project4 from './assets/playground/project-4.webp';
import project5 from './assets/playground/project-5.webp';
import project6 from './assets/playground/project-6.webp';

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
const HOME_PAGE_TITLE = "Anish Maji - Product Designer";

export function App() {
  const [currentView, setCurrentView] = useState(() => {
    if (window.location.hash.includes('swap-station')) return 'swap-station';
    if (window.location.hash.includes('referral-system')) return 'referral-system';
    if (window.location.hash.includes('play')) return 'play';
    if (window.location.hash.includes('about')) return 'about';
    return 'home';
  });

  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [theme, setTheme] = useState('light');

  // Interactive Nintendo Game Boy Control States
  const [dpadActiveDir, setDpadActiveDir] = useState(null);
  const [isBtnAPressed, setIsBtnAPressed] = useState(false);
  const [isBtnBPressed, setIsBtnBPressed] = useState(false);
  const [emojiParticles, setEmojiParticles] = useState([]);

  const EMOJI_POOL = ['❤️', '👍'];

  const triggerEmojiBurst = (e) => {
    let startX = window.innerWidth / 2;
    let startY = window.innerHeight / 2;

    if (e && e.currentTarget) {
      const rect = e.currentTarget.getBoundingClientRect();
      startX = rect.left + rect.width / 2;
      startY = rect.top + rect.height / 2;
    }

    const count = 9;
    const newParticles = Array.from({ length: count }).map((_, i) => ({
      id: `${Date.now()}-${Math.random()}-${i}`,
      emoji: EMOJI_POOL[Math.floor(Math.random() * EMOJI_POOL.length)],
      x: startX + (Math.random() * 24 - 12),
      y: startY + (Math.random() * 20 - 10),
      driftX: Math.random() * 100 - 50,
      floatY: -(130 + Math.random() * 110),
      scale: 0.85 + Math.random() * 0.5,
      rotate: Math.random() * 40 - 20,
      duration: 1.3 + Math.random() * 0.5,
      delay: i * 0.035,
    }));

    setEmojiParticles((prev) => [...prev, ...newParticles]);

    setTimeout(() => {
      const particleIds = new Set(newParticles.map((p) => p.id));
      setEmojiParticles((prev) => prev.filter((p) => !particleIds.has(p.id)));
    }, 2200);
  };

  const getNavSwitchImage = () => {
    switch (dpadActiveDir) {
      case 'top': return navSwitchTop;
      case 'bottom': return navSwitchBottom;
      case 'left': return navSwitchLeft;
      case 'right': return navSwitchRight;
      default: return navSwitchDefault;
    }
  };

  const handleDpadPress = (direction) => {
    setDpadActiveDir(direction);
    if (direction === 'left' || direction === 'bottom') {
      setActiveSlideIndex((prev) => (prev - 1 + heroSlideshowImages.length) % heroSlideshowImages.length);
    } else {
      setActiveSlideIndex((prev) => (prev + 1) % heroSlideshowImages.length);
    }
    setTimeout(() => setDpadActiveDir(null), 180);
  };

  const handleBtnAPress = (e) => {
    setIsBtnAPressed(true);
    triggerEmojiBurst(e);
    setTimeout(() => setIsBtnAPressed(false), 200);
  };

  const handleBtnBPress = (e) => {
    setIsBtnBPressed(true);
    triggerEmojiBurst(e);
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
      <WebsiteLoader />

      {/* YouTube Live Stream Style Emoji Reaction Burst */}
      <EmojiBurst particles={emojiParticles} />

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
            borderColor={theme === 'dark' ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.06)"}
            hoverFillColor={theme === 'dark' ? "rgba(255, 255, 255, 0.16)" : "rgba(0, 0, 0, 0.12)"}
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
                    onClick={() => handleDpadPress('top')}
                    aria-label="Previous Project Slide (Up)"
                  />
                  <button
                    type="button"
                    className="dpad-btn dpad-btn-bottom"
                    onClick={() => handleDpadPress('bottom')}
                    aria-label="Next Project Slide (Down)"
                  />
                  <button
                    type="button"
                    className="dpad-btn dpad-btn-left"
                    onClick={() => handleDpadPress('left')}
                    aria-label="Previous Project Slide (Left)"
                  />
                  <button
                    type="button"
                    className="dpad-btn dpad-btn-right"
                    onClick={() => handleDpadPress('right')}
                    aria-label="Next Project Slide (Right)"
                  />
                </div>

                {/* Interactive Button B (Lower-Left Green Highlighted Area) */}
                <button
                  type="button"
                  className={`nintendo-btn-b ${isBtnBPressed ? 'pressed' : ''}`}
                  onClick={handleBtnBPress}
                  aria-label="Button B - Previous Slide"
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
                  aria-label="Button A - Next Slide"
                >
                  <img
                    src={isBtnAPressed ? likeBtnClicked : likeBtnDefault}
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

