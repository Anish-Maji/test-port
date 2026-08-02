import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import BrandTicker from './components/BrandTicker';
import ShapeGrid from './components/ShapeGrid';
import Shuffle from './components/Shuffle';
import SwapStationPage from './pages/SwapStationPage';
import CvPage from './pages/CvPage';
import PlayPage from './pages/PlayPage';
import Footer from './components/Footer';

import ToolstackSection from './components/ToolstackSection';
import BooksSection from './components/BooksSection';
import VisualPlaygroundSection from './components/VisualPlaygroundSection';
import CinematicBrainSection from './components/CinematicBrainSection';
import ProjectsSection from './components/ProjectsSection';
import WebsiteLoader from './components/WebsiteLoader';
import swapMockupImg from './assets/home/projects-ss.webp';
import laundryVideo from './assets/home/laundry-thumbnail.webm';
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
    shortTitle: "Baaz Swap Station",
    categoryTag: "ev.cleantech",
    subtitle: "Battery swap station platform for EV smart mobility",
    meta: "BAAZ MOBILITY • EV & CLEAN TECH • 2025",
    image: swapMockupImg,
    bgColor: "linear-gradient(135deg, #f3e8ff 0%, #e0e7ff 100%)",
    isInteractive: true,
  },
  {
    id: 'hostel-laundry',
    title: "Revolutionizing Laundry in Hostels",
    shortTitle: "Revolutionizing Laundry in Hostels",
    categoryTag: "product.design",
    subtitle: "Hooked ideology based laundry service for college students",
    meta: "BEHANCE • PRODUCT DESIGN • 2024",
    video: laundryVideo,
    externalUrl: "https://www.behance.net/gallery/193222351/Revolutionizing-Laundry-in-Hostels",
    bgColor: "#111827",
    isInteractive: true,
  },
  {
    id: 'global-esports',
    title: "Global Esports — Brand Identity & Gaming Hub",
    shortTitle: "Global Esports",
    categoryTag: "gaming.media",
    subtitle: "Brand identity & digital gaming hub experience",
    meta: "GLOBAL ESPORTS • GAMING & MEDIA • 2024",
    image: globalEsportsImg,
    bgColor: "linear-gradient(135deg, #e0f2fe 0%, #dbeafe 100%)",
    isInteractive: false,
  },
  {
    id: 'kiosk-hmi',
    title: "Station Touchscreen Kiosk Interface System",
    shortTitle: "Kiosk Touchscreen HMI",
    categoryTag: "hardware.hmi",
    subtitle: "Station touchscreen interface system for battery swapping",
    meta: "BAAZ MOBILITY • HARDWARE HMI • 2025",
    image: kioskScreenImg,
    bgColor: "#f1f5f9",
    isInteractive: false,
  },
  {
    id: 'rider-app',
    title: "Rider Mobile Swap & Live Status Companion",
    shortTitle: "Rider Companion App",
    categoryTag: "mobile.app",
    subtitle: "Rider mobile swap & live status companion app",
    meta: "BAAZ MOBILITY • MOBILE APP • 2024",
    image: historyScreenImg,
    bgColor: "#fef3c7",
    isInteractive: false,
  },
  {
    id: 'fleet-portal',
    title: "IoT Fleet Operations & Analytics Dashboard",
    shortTitle: "IoT Fleet Operations",
    categoryTag: "iot.saas",
    subtitle: "IoT fleet operations & real-time analytics dashboard",
    meta: "BAAZ MOBILITY • SAAS DASHBOARD • 2025",
    image: frameImg,
    bgColor: "linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)",
    isInteractive: false,
  },
];



export function App() {
  const [currentView, setCurrentView] = useState(() => {
    if (window.location.hash.includes('swap-station')) return 'swap-station';
    if (window.location.hash.includes('cv')) return 'cv';
    if (window.location.hash.includes('play')) return 'play';
    return 'home';
  });

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.includes('swap-station')) {
        setCurrentView('swap-station');
        window.scrollTo(0, 0);
      } else if (hash.includes('cv')) {
        setCurrentView('cv');
        window.scrollTo(0, 0);
      } else if (hash.includes('play')) {
        setCurrentView('play');
        window.scrollTo(0, 0);
      } else if (currentView !== 'home' && (hash === '#work' || hash === '' || hash === '#about')) {
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

  if (currentView === 'cv') {
    return (
      <div className="app-layout">
        <Navbar onNavigateHome={handleBackToWork} activePage="cv" />
        <CvPage onBackToWork={handleBackToWork} />
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

      </main>

      <Footer />
    </div>
  );
}

export default App;

