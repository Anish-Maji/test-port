import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, ArrowUpRight, Share2, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import '../styles/SwapStationPage.css';
import ssProcessVideo from '../assets/SS Project/ss-process.webm';
import swapMockupImg from '../assets/Frame 34768.png';
import swapFlowImg from '../assets/swap_flow_diagram.png';
import swapSol1Video from '../assets/solution 1.webm';
import swapSol2Video from '../assets/SS Project/solution 2.webm';
import baazLogo from '../assets/brand logos/Baaz-Bikes-LOGO.png';
import ssProblemImg from '../assets/ss-problem.png';
import ssPieImg from '../assets/ss-pie-chart.png';
import ssInitialFindingImg from '../assets/ss-initial-finding-2.png';
import goalSwapImg from '../assets/SS Project/goal-swap.png';
import goalLangImg from '../assets/SS Project/goal-language.webp';
import goalFeedbackImg from '../assets/SS Project/goal-feedback.png';
import ssFsmVideo from '../assets/SS Project/ss-fsm.webm';
import ss1before from '../assets/SS Project/ss-1-before.webp';
import ss1after from '../assets/SS Project/ss-1-after.webp';
import ss2before from '../assets/SS Project/ss-2-before.webp';
import ss2after from '../assets/SS Project/ss-2-after.webp';
import ss3before from '../assets/SS Project/ss-3-before.webp';
import ss3after from '../assets/SS Project/ss-3-after.webp';
import ssAllScreens from '../assets/SS Project/ss-all-screens.webp';
import ssTechnicianScreens from '../assets/SS Project/ss-technician-screens.webp';
import ssDesignSystem from '../assets/SS Project/ss-design-system.webp';
import ssWorkflow from '../assets/SS Project/ss-workflow.webp';
import ssConstrainsBefore from '../assets/SS Project/ss-constrains-before.webp';
import ssConstrainsAfter from '../assets/SS Project/ss-constrains-after.webp';
import ssPovVideo from '../assets/SS Project/ss-pov-video.webm';
import ssTestDaynightVideo from '../assets/SS Project/ss-test-daynight.webm';
import ssOutcome1a from '../assets/SS Project/outcome-metrics-1a.webp';
import ssOutcome1b from '../assets/SS Project/outcome-metrics-1b.webp';
import ssOutcome2a from '../assets/SS Project/outcome-metrics-2a.webp';
import ssOutcome2b from '../assets/SS Project/outcome-metrics-2b.webp';
import ssSwapStartedAudio from '../assets/SS Project/swap started.mp3';
import PasswordProtect from '../components/PasswordProtect';



const tocItems = [
  { id: 'tldr', label: 'Tl;dr' },
  { id: 'solution', label: 'Solution' },
  { id: 'overview', label: 'Overview' },
  { id: 'problem', label: 'Problem' },
  { id: 'findings', label: 'Initial findings' },
  { id: 'goals', label: 'Goals' },
  { id: 'process', label: 'Design process' },
  { id: 'qa-and-testing', label: 'Test & launch' },
  { id: 'outcome', label: 'Outcome' },
  { id: 'reflection', label: 'Reflection' },
];



// ============================================================================
// PAGE TITLE CONFIGURATION
// Change the string below to update the browser tab title for this page.
// ============================================================================
const DEFAULT_PAGE_TITLE = "Baaz Swap Station | a.niche";

// ============================================================================
// PASSWORD PROTECTION TOGGLE
// Set to `true` to require password protection for this case study.
// Set to `false` to disable password protection (case study becomes freely accessible).
// ============================================================================
const ENABLE_PASSWORD_PROTECTION = true;

export function SwapStationPage({ onBackToWork, pageTitle = DEFAULT_PAGE_TITLE }) {
  useEffect(() => {
    document.title = pageTitle;
  }, [pageTitle]);

  const [isUnlocked, setIsUnlocked] = useState(() => {
    if (!ENABLE_PASSWORD_PROTECTION) return true;
    return sessionStorage.getItem('ss_unlocked') === 'true';
  });
  const [activeSection, setActiveSection] = useState('tldr');
  const [activeTab, setActiveTab] = useState('mobile');
  const [copied, setCopied] = useState(false);

  // QA section video player states & refs
  const [isPovPlaying, setIsPovPlaying] = useState(true);
  const [isDaynightPlaying, setIsDaynightPlaying] = useState(true);
  const povVideoRef = useRef(null);
  const daynightVideoRef = useRef(null);

  const togglePovPlay = () => {
    if (povVideoRef.current) {
      if (isPovPlaying) {
        povVideoRef.current.pause();
      } else {
        povVideoRef.current.play().catch(err => console.log('Playback error:', err));
      }
    }
  };

  const toggleDaynightPlay = () => {
    if (daynightVideoRef.current) {
      if (isDaynightPlaying) {
        daynightVideoRef.current.pause();
      } else {
        daynightVideoRef.current.play().catch(err => console.log('Playback error:', err));
      }
    }
  };

  // Audio narration states & refs
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const audioPlayerRef = useRef(null);

  const toggleAudio = () => {
    if (audioPlayerRef.current) {
      if (isAudioPlaying) {
        audioPlayerRef.current.pause();
      } else {
        audioPlayerRef.current.play().catch(err => console.log('Audio playback error:', err));
      }
      setIsAudioPlaying(!isAudioPlaying);
    }
  };

  // Flow 2 Audio narration states & refs
  const [isFlow2AudioPlaying, setIsFlow2AudioPlaying] = useState(false);
  const flow2AudioPlayerRef = useRef(null);

  const toggleFlow2Audio = () => {
    if (flow2AudioPlayerRef.current) {
      if (isFlow2AudioPlaying) {
        flow2AudioPlayerRef.current.pause();
      } else {
        flow2AudioPlayerRef.current.play().catch(err => console.log('Audio playback error:', err));
      }
      setIsFlow2AudioPlaying(!isFlow2AudioPlaying);
    }
  };

  // States and refs for custom video player controls
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);
  const circleRef = useRef(null);
  const animationFrameRef = useRef(null);

  const updateProgress = () => {
    if (videoRef.current && circleRef.current) {
      const progress = videoRef.current.currentTime / videoRef.current.duration || 0;
      const circumference = 138.23;
      const offset = circumference - progress * circumference;
      circleRef.current.setAttribute('stroke-dashoffset', offset);
    }
    if (videoRef.current && !videoRef.current.paused) {
      animationFrameRef.current = requestAnimationFrame(updateProgress);
    }
  };

  const handlePlay = () => {
    setIsPlaying(true);
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    animationFrameRef.current = requestAnimationFrame(updateProgress);
  };

  const handlePause = () => {
    setIsPlaying(false);
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(err => console.log('Playback interrupted:', err));
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Setup loop cleanup on unmount
  useEffect(() => {
    // If video is initially playing (autoplay), start progress loop
    if (videoRef.current && !videoRef.current.paused) {
      animationFrameRef.current = requestAnimationFrame(updateProgress);
    }
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Scroll spy effect to highlight active sidebar item
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 180;

      for (let i = tocItems.length - 1; i >= 0; i--) {
        const item = tocItems[i];
        const element = document.getElementById(item.id);
        if (element) {
          const top = element.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -100;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const isPasswordRequired = ENABLE_PASSWORD_PROTECTION && !isUnlocked;

  return (
    <div className={`case-study-root ${isPasswordRequired ? 'nda-locked' : ''}`}>
      <div className="case-study-container">

        {/* Left Sticky Sidebar / Content Bar */}
        <aside className="case-study-sidebar">
          <div className="sidebar-sticky-inner">
            <button
              className="back-link-btn"
              onClick={onBackToWork}
              aria-label="Back to work"
            >
              <ArrowLeft size={16} />
              <span>Back to work</span>
            </button>

            <nav className="toc-nav" aria-label="Table of Contents">
              <ul className="toc-list">
                {tocItems.map((item) => {
                  const isActive = activeSection === item.id;
                  return (
                    <li key={item.id} className="toc-item">
                      <button
                        className={`toc-btn ${isActive ? 'active' : ''}`}
                        onClick={() => scrollToSection(item.id)}
                      >
                        {item.label}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="sidebar-footer-actions">
              <button className="action-icon-btn" onClick={handleShare} title="Share case study">
                <Share2 size={16} />
                <span>{copied ? 'Link Copied!' : 'Share'}</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Main Case Study Right Column */}
        <main className="case-study-main">

          {/* Header Metadata & Category */}
          <header className="case-study-header">
            <div className="category-meta-tag">
              SWAP STATION &bull; EV & CLEAN TECH &bull; 2025
            </div>
            <h1 className="case-study-title">
              Redesigning Swap Station HMI <br /> <span style={{ fontStyle: 'italic', color: '#C94F1E' }}>to make battery swaps under 50 second.</span>
            </h1>
          </header>

          {isPasswordRequired && (
            <PasswordProtect
              correctPassword="baaz2025"
              onUnlock={() => {
                setIsUnlocked(true);
                sessionStorage.setItem('ss_unlocked', 'true');
              }}
            />
          )}

          <div className="case-study-body-content">

            {/* Hero Mint Green Banner Container with Phone Mockup */}
            <div className="hero-banner-container">
              <div className="hero-banner-inner">
                <img
                  src={swapMockupImg}
                  alt="Swap Station Mobile App Mockup on mint green background"
                  className="hero-banner-image"
                />
              </div>
            </div>

            {/* Project Details Grid (Timeline, Role, Team) */}
            <div className="project-details-grid">
              <div className="detail-column">
                <span className="detail-label">TIMELINE</span>
                <span className="detail-value">5 months</span>
              </div>
              <div className="detail-column">
                <span className="detail-label">ROLE</span>
                <span className="detail-value">Product Designer (Me!)</span>
              </div>
              <div className="detail-column">
                <span className="detail-label">TEAM</span>
                <div className="detail-team-list">
                  <span>Design Manager</span>
                  <span>CGI Designer</span>
                  <span>Product Managers</span>
                  <span>Firmware Engineers</span>
                </div>
              </div>
            </div>

            {/* Section 1: TL;DR */}
            <section id="tldr" className="case-study-section section-tldr">
              <div className="tldr-card-box">
                <div className="tldr-badge">TL ; DR</div>
                <p className="tldr-text">
                  Delivery riders swap batteries multiple times a shift. Every second spent at a station is a second off the road. The experience needed to be fast enough to disappear, so riders could focus on what actually matters: the delivery.
                </p>

                {/* Key Impact Metrics Row */}
                <div className="tldr-metrics-row">
                  <div className="metric-card positive">
                    <div className="metric-number">
                      <ArrowUpRight size={24} className="metric-icon" />
                      <span className="metric-number-data">~60%</span>
                    </div>
                    <div className="metric-label">Swap Time</div>
                  </div>

                  <div className="metric-card positive">
                    <div className="metric-number">
                      <ArrowUpRight size={24} className="metric-icon" />
                      <span className="metric-number-data">~85%</span>
                    </div>
                    <div className="metric-label">Reduction in staff calls</div>
                  </div>

                  <div className="metric-card highlight">
                    <div className="metric-number">
                      <ArrowUpRight size={24} className="metric-icon" />
                      <span className="metric-number-data">~40%</span>
                    </div>
                    <div className="metric-label">Fewer steps in swaps</div>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 2: Solution */}
            <section id="solution" className="case-study-section">
              <div className="detail-label" style={{ marginBottom: "var(--gap-md)" }}>SOLUTION</div>
              <h2 className="section-heading">Here are some of the key design principles</h2>

              <div className="solution-flows-list">
                {/* Flow 1 */}
                <div className="solution-flow-item">
                  <div className="flow-media-col">
                    <div className="flow-media-container">
                      <video autoPlay loop muted>
                        <source src={swapSol1Video} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  </div>
                  <div className="flow-text-col">
                    <h3 className="flow-title">Leading with transparency</h3>
                    <p className="flow-desc">
                      Riders can access current station queue times and battery availability with a single glance from the map, with relevant details displayed based on their distance from the station.
                    </p>
                  </div>
                </div>

                {/* Flow 2 */}
                <div className="solution-flow-item">
                  <div className="flow-media-col">
                    <div className="flow-media-container solution-audio-container">
                      <img
                        src={ssOutcome2b}
                        alt="Speaking the language of the rider"
                        className="flow-media-image"
                      />
                      <button
                        className={`hear-audio-btn absolute-btn ${isFlow2AudioPlaying ? 'playing' : ''}`}
                        onClick={toggleFlow2Audio}
                        aria-label="Play audio narration"
                      >
                        <span>{isFlow2AudioPlaying ? 'Playing audio' : 'Hear it yourself'}</span>
                        <span className="play-icon-circle">
                          {isFlow2AudioPlaying ? (
                            <Pause size={10} fill="#000000" color="#000000" />
                          ) : (
                            <Play size={10} fill="#000000" color="#000000" style={{ marginLeft: '1px' }} />
                          )}
                        </span>
                      </button>
                      <audio
                        ref={flow2AudioPlayerRef}
                        src={ssSwapStartedAudio}
                        onEnded={() => setIsFlow2AudioPlaying(false)}
                      />
                    </div>
                  </div>
                  <div className="flow-text-col">
                    <h3 className="flow-title">Speaking the language of the rider</h3>
                    <p className="flow-desc">
                      A wide range of riders may participate in the switching process thanks to localized text and audio instruction, which lowers language barriers and boosts confidence in each exchange.
                    </p>
                  </div>
                </div>

                {/* Flow 3 */}
                <div className="solution-flow-item">
                  <div className="flow-media-col">
                    <div className="flow-media-container">
                      <video autoPlay loop muted playsInline>
                        <source src={swapSol2Video} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  </div>
                  <div className="flow-text-col">
                    <h3 className="flow-title">Turning system complexity into simple interactions</h3>
                    <p className="flow-desc">
                      The interface converts the dozens of machine states that the Swap Station controls in the background into understandable, contextual interactions so that riders are always aware of what is going on and what needs to be done.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 3: Overview */}
            <section id="overview" className="case-study-section">
              <h2 className="detail-label" style={{ marginBottom: "var(--gap-md)" }}>Overview</h2>
              <h3 className="body-header">
                Baaz operates mobility infrastructure for commercial EV two-wheelers, where rider uptime directly impacts earnings and fleet efficiency.
              </h3>

              <p className="paragraph-body">
                Battery swapping is a critical touchpoint, connecting vehicles, stations, and the rider app. Any friction in this high-frequency flow increases rider downtime, reduces deliveries, which ultimately results in lower system throughput. However, the existing HMI experience introduced hesitation and inconsistency at key steps, thus slowing down a fast, repeatable action. At scale, even small delays per swap compound into lost delivery capacity, lower rider earnings, and reduced system output.
              </p>
              {/* <div className="info-quote-box">
              <p>
                "For gig drivers, every 5 minutes spent stuck in a station queue or dealing with a jammed locker directly impacts their daily earnings. Transparency isn't just nice to have—it's essential revenue infrastructure."
              </p>
            </div> */}

              <a
                href="https://www.baaz.bike/"
                target="_blank"
                rel="noopener noreferrer"
                className="company-relink-card"
              >
                <div className="company-logo-box">
                  <img src={baazLogo} alt="Baaz Mobility" className="company-logo-img" />
                </div>
                <div className="company-relink-info">
                  <div className="company-relink-name">
                    <span>Baaz Mobility</span>
                    <ArrowUpRight className="relink-arrow-icon" size={15} />
                  </div>
                  <div className="company-relink-sub">
                    baazbikes.com
                  </div>
                </div>
              </a>
            </section>

            {/* Section 4: Problem */}
            <section id="problem" className="case-study-section">
              <h2 className="detail-label" style={{ marginBottom: "var(--gap-md)" }}>Problem</h2>

              {/* Problem 1 */}
              <h3 className="body-header">
                High swap time due to an unoptimised FSM, leading to higher support calls and operational cost.
              </h3>
              <p className="paragraph-body">
                The swap station is a self serve platform. There is no employee assisting the rider with the swap. That is the sole duty of the HMI. Riders were unable to understand what the system was doing or what to do next when the FSM states were not accurately displayed on the screen. Every discrepancy between the screen and system states turned into a possible support call.
              </p>

              <div className="problem-image-container">
                <img
                  src={ssProblemImg}
                  alt="Monthly usage comparison showing phone support calls vs app logins"
                  className="problem-image"
                />
              </div>

              {/* Problem 2 */}
              <h3 className="body-header">
                An unoptimised swap flow directly reduces earning potential for delivery riders.
              </h3>
              <p className="paragraph-body">
                Delivery riders get compensated according to each order. Spending time at a swap station means that you are not working or making money. The rider is not only irritated when a change that should take 50 seconds takes three to four minutes, but it becomes worse every shift.
                When hundreds of riders perform several exchanges per day, the lost time directly translates into lost revenue. A better HMI improves livelihood as well as usability.
              </p>
            </section>

            {/* Section 5: Initial findings */}
            <section id="findings" className="case-study-section">
              <h2 className="detail-label" style={{ marginBottom: "var(--gap-md)" }}>Initial findings</h2>
              <div>
                <h3 className="body-header">
                  The support calls were not about confusion, but about a lack of transparency of the HMI or even the FSM.
                </h3>
                <p className="paragraph-body">
                  Riders were calling not because they did not understand the interface but because the system was encountering real issues like stuck battery,
                  doors that did not open, and so on. The FSM or HMI failed to provide the riders with clarity of the situation, which in turn let to Frustration and hesitancy.
                </p>

                <div className="initial-finding-image-container">
                  <img
                    src={ssPieImg}
                    alt="Monthly usage comparison showing phone support calls vs app logins"
                    className="initial-finding-image"
                  />
                </div>
              </div>

              <div>
                <h3 className="body-header">
                  Why HMI, and not something else?
                </h3>
                <p className="paragraph-body">
                  The physical hardware, the rider app, and operations training all touched the swap experience. But only one touchpoint sits at the exact intersection of rider pain and business cost, the swap station HMI display and it has no fallback when it fails.
                </p>

                <div className="initial-finding-image-container-2">
                  <img
                    src={ssInitialFindingImg}
                    alt="Monthly usage comparison showing phone support calls vs app logins"
                    className="initial-finding-image-2"
                  />
                </div>
              </div>
              <div>
                <h3 className="body-header has-dash">
                  Riders interact with the HMI at the highest-stakes moment of their shift.
                </h3>
                <p className="paragraph-body" style={{ marginBottom: "var(--gap-lg)" }}>
                  The rider app handles account management, earnings, and route planning. It is used before and after the swap, not during the swapping process. The physical station handles that side of the process, but stuck doors and non-functional battery locks are hardware constraints outside design scope. Operations training helps new riders, but it does not cater to the scale or fix a broken feedback system.
                </p>
                <p className="paragraph-body">
                  The swap station's HMI is the only touchpoint present during the swapping process, and the only thing that us fully within design control. So that's where we started.
                </p>
              </div>

              {/* 3 Stack at the end of Initial Findings */}
              <div className="initial-findings-three-stack">
                <div className="finding-stack-card">
                  <h4 className="finding-stack-heading">Highest Frequency</h4>
                  <p className="finding-stack-text">
                    Riders interact with it 2-5 times a day per shift, every working day. No other touch point is used so often in the entire Baaz Ecosystem.
                  </p>
                </div>

                <div className="finding-stack-card">
                  <h4 className="finding-stack-heading">No Fallback</h4>
                  <p className="finding-stack-text">
                    Every other surface has a workaround, but the HMI does not. When it fails silently, the only option for the rider is to call the customer support.
                  </p>
                </div>

                <div className="finding-stack-card">
                  <h4 className="finding-stack-heading">Fully with design control</h4>
                  <p className="finding-stack-text">
                    Hardware failure need engineers. App changes need product priotization. The HMI was our to fix.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 6: Goals */}
            <section id="goals" className="case-study-section">
              <h2 className="detail-label" style={{ marginBottom: "var(--gap-xl)" }}>GOALS</h2>

              <div className="goals-list-container">
                {/* Row 1 */}
                <div className="goal-row-item">
                  <div className="goal-illustration-box">
                    <img src={goalSwapImg} alt="Goal Swap" className="goal-illustration-img" />
                  </div>
                  <div className="goal-details-col">
                    <div className="goal-pair-block">
                      <h4 className="goal-pair-title">Complete the battery swap confidently under 50s</h4>
                      <span className="goal-pair-label">User goal</span>
                    </div>
                    <div className="goal-pair-block">
                      <h4 className="goal-pair-title">Reduce staff intervention and operational cost</h4>
                      <span className="goal-pair-label">Business goal</span>
                    </div>
                  </div>
                </div>

                {/* Row 2 */}
                <div className="goal-row-item">
                  <div className="goal-illustration-box">
                    <img src={goalLangImg} alt="Goal Time" className="goal-illustration-img" />
                  </div>
                  <div className="goal-details-col">
                    <div className="goal-pair-block">
                      <h4 className="goal-pair-title">Comprehend each instruction in the language of their choice.</h4>
                      <span className="goal-pair-label">User goal</span>
                    </div>
                    <div className="goal-pair-block">
                      <h4 className="goal-pair-title">Lower language barrier, increasing the effectiveness of first-time exchanges.</h4>
                      <span className="goal-pair-label">Business goal</span>
                    </div>
                  </div>
                </div>

                {/* Row 3 */}
                <div className="goal-row-item">
                  <div className="goal-illustration-box">
                    <img src={goalFeedbackImg} alt="Goal Feedback" className="goal-illustration-img" />
                  </div>
                  <div className="goal-details-col">
                    <div className="goal-pair-block">
                      <h4 className="goal-pair-title">Always know what the system is doing</h4>
                      <span className="goal-pair-label">User goal</span>
                    </div>
                    <div className="goal-pair-block">
                      <h4 className="goal-pair-title">Reduce the chances of service calls for self recorverable errors</h4>
                      <span className="goal-pair-label">Business goal</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 7: Design process */}
            <section id="process" className="case-study-section">
              <h2 className="detail-label" style={{ marginBottom: "var(--gap-lg)" }}>Design process</h2>
              <h3 className='body-header'>
                Working my way down, thinking from a high level structure...
              </h3>
              <p className="paragraph-body">
                I began with the information architecture, also known as the Final State Machine (FSM), and then I moved on to the home screen. I then proceeded screen by screen. The main working principle was to maintain transparency of the exact state of the swap station to the delivery rides, to reduce cognative load.
              </p>

              <div className="fsm-video-container">
                <video autoPlay loop muted playsInline className="fsm-video">
                  <source src={ssFsmVideo} type="video/webm" />
                  Your browser does not support the video tag.
                </video>
              </div>

              <h3 className="body-header">
                Finding areas of improvement in the current experience and trying 'transparency forward' during the iterations.
              </h3>
              <p className='body-description'>
                By studying the existing interface, I identified opportunities to simplify information, improve visual hierarchy, and make battery availability easier to understand at a glance. Each iteration focused on increasing transparency while reducing the cognitive effort required during a swap.
              </p>

              {/* Comparison 1 */}
              <div className="comparison-grid">
                <div className="comparison-column">
                  <div className="comparison-card before">
                    <img
                      src={ss1before}
                      alt="Before redesign: complex manual flow with low visibility"
                      className="comparison-image"
                    />
                  </div>
                  <div className="comparison-meta-col">
                    <span className="comparison-badge before">BEFORE</span>
                    <p className="comparison-description">
                      Too many data points increase the cognitive load on the user, as per Hick's Law.                 </p>
                  </div>
                </div>

                <div className="comparison-column">
                  <div className="comparison-card after">
                    <img
                      src={ss1after}
                      alt="After redesign: streamlined automated slot guidance"
                      className="comparison-image"
                    />
                  </div>
                  <div className="comparison-meta-col">
                    <span className="comparison-badge after">AFTER</span>
                    <p className="comparison-description">
                      Simplified home screen, looking at which the rider can quickly figure out how many charged batteries are available at the particular swap station.
                    </p>
                  </div>
                </div>
              </div>

              {/* Comparison 2 */}
              <div className="comparison-grid">
                <div className="comparison-column">
                  <div className="comparison-card before">
                    <img
                      src={ss2before}
                      alt="Before redesign: complex manual flow with low visibility"
                      className="comparison-image"
                    />
                  </div>
                  <div className="comparison-meta-col">
                    <span className="comparison-badge before">BEFORE</span>
                    <p className="comparison-description">
                      The existing screen lacked contextual guidance, causing hesitation during a critical step of the battery swap.
                    </p>
                  </div>
                </div>

                <div className="comparison-column">
                  <div className="comparison-card after">
                    <img
                      src={ss2after}
                      alt="After redesign: streamlined automated slot guidance"
                      className="comparison-image"
                    />
                  </div>
                  <div className="comparison-meta-col">
                    <span className="comparison-badge after">AFTER</span>
                    <p className="comparison-description">
                      Visual instructions, like which door is opening and progress feedback reduce ambiguity, enabling a faster and more predictable experience.
                    </p>
                  </div>
                </div>
              </div>

              {/* Comparison 3 */}
              <div className="comparison-grid">
                <div className="comparison-column">
                  <div className="comparison-card before">
                    <img
                      src={ss3before}
                      alt="Before redesign: complex manual flow with low visibility"
                      className="comparison-image"
                    />
                  </div>
                  <div className="comparison-meta-col">
                    <span className="comparison-badge before">BEFORE</span>
                    <p className="comparison-description">
                      The existing error screens are very vague, and do not address the real issue that is occurring in the swap station, keeping the riders in the wind.
                    </p>
                  </div>
                </div>

                <div className="comparison-column">
                  <div className="comparison-card after">
                    <img
                      src={ss3after}
                      alt="After redesign: streamlined automated slot guidance"
                      className="comparison-image"
                    />
                  </div>
                  <div className="comparison-meta-col">
                    <span className="comparison-badge after">AFTER</span>
                    <p className="comparison-description">
                      Added new error screens, addressing the particular error that has occured, and what the rider need to do to solve the problem
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className='body-header'>
                  Building out a swapping flow with multiple states and edge cases.
                </h3>
                <p className="paragraph-body">
                  I mapped out the complete battery swapping journey, considering every possible rider interaction and system state. The redesign focused on making critical information easier to understand at a glance, improving navigation across different scenarios, and ensuring the interface gracefully handled edge cases such as battery availability, door states, swap failures, and system errors.
                  <br />
                  <br />
                  I used progressive disclosure to make sure the information isn't overwhelming and would surface only when the user wants to dive deep.
                </p>
                <div className="all-screens-image-container">
                  <img
                    src={ssAllScreens}
                    alt="All Screens and States Map"
                    className="all-screens-image"
                  />
                </div>
              </div>

              <div>
                <p className="paragraph-body">
                  I did the same for the technician (people responsible for fixing the swap stations) screens.
                  Except the use-cases were different. The design direction of the technician screens are different from the rider screens to make the screen easily distinguishable.
                  Also, there are lots of terminologies which are specific to the technicians.
                </p>
                <div className="all-screens-image-container">
                  <img
                    src={ssTechnicianScreens}
                    alt="Technician Screens and States Map"
                    className="all-screens-image"
                  />
                </div>
              </div>
              <div>
                <h3 className="body-header">
                  Finally, the first version was ready for a cross team meeting.
                </h3>
                <p className="paragraph-body">
                  I mapped every state of the FSM to a HMI screen: home, positive swap, errors and the edges in between.
                  The positive swap mostly had a linear flow, starting with the home state. We had regular cross-team meeting with the Firmware team and Design managers.
                  There is a snapshot to the positive flow for the swap station along with the audio.
                </p>
                <div className="process-video-wrapper">
                  <div className="process-video-container">
                    <video
                      ref={videoRef}
                      src={ssProcessVideo}
                      autoPlay
                      loop
                      muted={isMuted}
                      playsInline
                      onPlay={handlePlay}
                      onPause={handlePause}
                      className="process-video"
                    />
                    <div className="video-custom-controls">
                      {/* Play/Pause Button with SVG Circular Progress Ring */}
                      <button className="control-circle-btn play-pause-btn" onClick={togglePlay} aria-label={isPlaying ? 'Pause' : 'Play'}>
                        <svg className="progress-ring" width="48" height="48">
                          <circle
                            ref={circleRef}
                            className="progress-ring-circle"
                            stroke="#000000"
                            strokeWidth="2"
                            fill="transparent"
                            r="22"
                            cx="24"
                            cy="24"
                            strokeDasharray="138.23"
                            strokeDashoffset="138.23"
                            strokeLinecap="round"
                          />
                        </svg>
                        <div className="control-icon-inner">
                          {isPlaying ? <Pause size={16} fill="#000000" color="#000000" /> : <Play size={16} fill="#000000" color="#000000" />}
                        </div>
                      </button>

                      {/* Mute/Unmute Button */}
                      <button className="control-circle-btn mute-btn" onClick={toggleMute} aria-label={isMuted ? 'Unmute' : 'Mute'}>
                        <div className="control-icon-inner">
                          {isMuted ? <VolumeX size={16} color="#000000" /> : <Volume2 size={16} color="#000000" />}
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className='body-header'>
                  Refining the experience through continuous feedback
                </h3>
                <p className="paragraph-body">
                  The Swap Station interface went through several rounds of reviews with different stakeholders, each bringing a unique perspective. Product validated the user journey, Engineering assessed technical feasibility, and Operations highlighted real-world scenarios. These iterations helped create a robust interface that performs reliably across everyday use and exceptional situations.              </p>
                <div className="all-screens-image-container">
                  <img
                    src={ssWorkflow}
                    alt="Continuous Feedback Workflow"
                    className="all-screens-image"
                  />
                </div>
              </div>
            </section>


            {/* Designing with constrains */}
            <section id="designing-with-constrains" className="case-study-section">
              <h2 className="detail-label" style={{ marginBottom: "var(--gap-lg)" }}>Designing with constrains</h2>
              <h3 className='body-header'>Designing for hardware constraints instead of unlimited possibilities</h3>
              <p className="paragraph-body">
                Unlike mobile applications, the swap station interface runs on dedicated hardware where every interaction must be lightweight and reliable.
                Limited memory, processing power, and UI capabilities meant modern interface patterns weren't feasible, so every screen had to be simplified without compromising usability.
                The challenge was to create a responsive, intuitive experience while working within the platform's technical constraints.
              </p>


              <div className="comparison-grid">
                <div className="comparison-column">
                  <div className="comparison-card before">
                    <img
                      src={ssConstrainsBefore}
                      alt="Before redesign: complex manual flow with low visibility"
                      className="comparison-image"
                    />
                  </div>
                  <div className="comparison-meta-col">
                    <span className="comparison-badge before">BEFORE</span>
                    <p className="comparison-description">
                      Designing within the limitations of the Nextion HMI editor required balancing usability with restricted UI components, memory, and processing capabilities.                 </p>
                  </div>
                </div>

                <div className="comparison-column">
                  <div className="comparison-card after">
                    <img
                      src={ssConstrainsAfter}
                      alt="After redesign: streamlined automated slot guidance"
                      className="comparison-image"
                    />
                  </div>
                  <div className="comparison-meta-col">
                    <span className="comparison-badge after">AFTER</span>
                    <p className="comparison-description">
                      A simplified, reusable interface optimized for the embedded hardware, delivering a consistent experience without exceeding platform constraints.
                    </p>
                  </div>
                </div>
              </div>


            </section>


            {/* Section 8: design system */}
            <section id="design-system" className="case-study-section">
              <h2 className="detail-label" style={{ marginBottom: "var(--gap-lg)" }}>Design system</h2>
              <h3 className='body-header'>Adding new reusable components and documentation to Figma.</h3>
              <p className="paragraph-body">
                To maintain consistency across dozens of machine states and screens, I built a reusable component library in Figma. Standardizing cards, buttons, status indicators, and layouts made the interface easier to scale, iterate, and hand off for development.
              </p>
              <div className="all-screens-image-container">
                <img
                  src={ssDesignSystem}
                  alt="Swap Station Design System Components"
                  className="all-screens-image"
                />
              </div>
            </section>

            {/* Section 8: QA & testing*/}
            <section id="qa-and-testing" className="case-study-section">
              <h2 className="detail-label" style={{ marginBottom: "var(--gap-lg)" }}>Real World Validation</h2>
              <h3 className='body-header'>I tested the HMI screens in the real world scenario, through day, night and rain. Here, we are designing not just for the screens, but also for the riders.</h3>
              <p className="paragraph-body">
                Unlike traditional digital products, the swap station experience lives in unpredictable environments. I evaluated the interface across different lighting conditions and from a rider's perspective to ensure information remained visible, interactions stayed intuitive, and the swapping process felt effortless regardless of the surroundings.
                <br />
                <br />
                The redesign was reviewed through realistic scenarios, including daytime and nighttime usage, as well as a first-person swapping experience to validate readability, feedback, and overall interaction flow before deployment.
              </p>
              <div className="qa-videos-grid">
                <div className="qa-video-card">
                  <video
                    ref={povVideoRef}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="square-video"
                    onPlay={() => setIsPovPlaying(true)}
                    onPause={() => setIsPovPlaying(false)}
                  >
                    <source src={ssPovVideo} type="video/webm" />
                    Your browser does not support the video tag.
                  </video>
                  <button
                    className="video-play-pause-btn"
                    onClick={togglePovPlay}
                    aria-label={isPovPlaying ? "Pause video" : "Play video"}
                    title={isPovPlaying ? "Pause" : "Play"}
                  >
                    {isPovPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" style={{ marginLeft: '2px' }} />}
                  </button>
                </div>
                <div className="qa-video-card">
                  <video
                    ref={daynightVideoRef}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="square-video"
                    onPlay={() => setIsDaynightPlaying(true)}
                    onPause={() => setIsDaynightPlaying(false)}
                  >
                    <source src={ssTestDaynightVideo} type="video/webm" />
                    Your browser does not support the video tag.
                  </video>
                  <button
                    className="video-play-pause-btn"
                    onClick={toggleDaynightPlay}
                    aria-label={isDaynightPlaying ? "Pause video" : "Play video"}
                    title={isDaynightPlaying ? "Pause" : "Play"}
                  >
                    {isDaynightPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" style={{ marginLeft: '2px' }} />}
                  </button>
                </div>
              </div>
              <h3 className="body-header has-dash" style={{ marginBottom: "var(--gap-xxxxl)" }}>
                We launched the new version to 15 of our swap stations to test the waters...
              </h3>

              <div>
                <h3 className='body-header'>
                  Customer calls came down massively
                </h3>
                <p className="paragraph-body">
                  The redesign focused on making the Swap Station more self-explanatory. Clear messaging, multilingual support, and contextual feedback reduced confusion during swaps, improving rider confidence while lowering dependency on customer support.

                </p>
                {/* Outcome 1 */}
                <div className="metrics-comparison-block">
                  <div className="metrics-images-wrapper">
                    <div className="metrics-image-card">
                      <img
                        src={ssOutcome1a}
                        alt="Before: Vague error screen lacking clear feedback"
                      />
                    </div>
                    <div className="metrics-image-card">
                      <img
                        src={ssOutcome1b}
                        alt="After: Contextual error screen with self-recovery instructions"
                      />
                    </div>
                  </div>
                  <div className="metrics-text-col">
                    <div className="metrics-percentage">
                      <span className="initial-val">≈40% ↓</span>

                    </div>
                    <h4 className="paragraph-body">
                      There a clear decrease in the number of customer support calls through clear messaging.
                    </h4>
                  </div>
                </div>
                {/* Outcome 2 */}
                <div className="metrics-comparison-block">
                  <div className="metrics-images-wrapper">
                    <div className="metrics-image-card">
                      <img
                        src={ssOutcome2a}
                        alt="Before: Vague error screen lacking clear feedback"
                      />
                    </div>
                    <div className="metrics-image-card">
                      <img
                        src={ssOutcome2b}
                        alt="After: Contextual error screen with self-recovery instructions"
                      />
                    </div>
                  </div>
                  <div className="metrics-text-col">
                    <div className="metrics-percentage">
                      <span className="initial-val">≈20% ↓</span>

                    </div>
                    <h4 className="paragraph-body">
                      The time the rider sent on the swap station also decreased using localized text and voice prompts.
                    </h4>
                    <button
                      className={`hear-audio-btn ${isAudioPlaying ? 'playing' : ''}`}
                      onClick={toggleAudio}
                      aria-label="Play audio narration"
                    >
                      <span>{isAudioPlaying ? 'Playing audio' : 'Hear it yourself'}</span>
                      <span className="play-icon-circle">
                        {isAudioPlaying ? (
                          <Pause size={10} fill="#000000" color="#000000" />
                        ) : (
                          <Play size={10} fill="#000000" color="#000000" style={{ marginLeft: '1px' }} />
                        )}
                      </span>
                    </button>
                    <audio
                      ref={audioPlayerRef}
                      src={ssSwapStartedAudio}
                      onEnded={() => setIsAudioPlaying(false)}
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Section 9: Outcome */}
            <section id="outcome" className="case-study-section">
              <h2 className="body-heading" style={{ marginBottom: "var(--gap-lg)" }}>OUTCOME</h2>
              <h3 className="body-header">Impact 1 month post launch!</h3>
              <p className="paragraph-body">
                The redesigned Swap Station platform rolled out across all 14 markets in late 2025 with overwhelming positive response from drivers, fleet partners, and internal operations.
              </p>

              <div className="tldr-metrics-row">
                <div className="metric-card positive">
                  <div className="metric-number">
                    <ArrowUpRight size={24} className="metric-icon" />
                    <span className="metric-number-data">~60%</span>
                  </div>
                  <div className="metric-label">Swap Time</div>
                </div>

                <div className="metric-card positive">
                  <div className="metric-number">
                    <ArrowUpRight size={24} className="metric-icon" />
                    <span className="metric-number-data">~85%</span>
                  </div>
                  <div className="metric-label">Reduction in staff calls</div>
                </div>

                <div className="metric-card highlight">
                  <div className="metric-number">
                    <ArrowUpRight size={24} className="metric-icon" />
                    <span className="metric-number-data">~40%</span>
                  </div>
                  <div className="metric-label">Fewer steps </div>
                </div>
              </div>
            </section>

            {/* Section 10: Reflection */}
            <section id="reflection" className="case-study-section">
              <h2 className="body-heading" style={{ marginBottom: "var(--gap-lg)" }}>REFLECTION</h2>
              <div style={{ marginBottom: "var(--gap-xxxxl)" }}>
                <h3 className='body-header'>
                  My key takeaways and learnings!
                </h3>
                <div className="reflections-columns-grid" >
                  <div className="reflection-column">
                    <h4 className="reflection-col-title">State mapping early saves rework</h4>
                    <p className="reflection-col-body">
                      Mapping every machine state and edge case before designing screens helped uncover gaps early, reducing design iterations and keeping the interface consistent across the entire swapping journey.
                    </p>
                  </div>
                  <div className="reflection-column">
                    <h4 className="reflection-col-title">Validating in real environments matters</h4>
                    <p className="reflection-col-body">
                      Design decisions that looked effective in Figma felt very different at the station. Testing across lighting conditions and from a rider's perspective highlighted usability improvements that static mockups couldn't reveal.
                    </p>
                  </div>
                </div>
              </div>


              <h3 className='body-header'>
                How would I do differently with AI?
              </h3>

              <div className="reflections-columns-grid">
                <div className="reflection-column">
                  <h4 className="reflection-col-title">Rapid prototyping for testing</h4>
                  <p className="reflection-col-body">
                    I would have connected the Figma MCP directly to the Nextion software and prepare the screens for different conditions, and test those in real world senarios, through different languages and conditions.
                  </p>
                </div>
                <div className="reflection-column">
                  <h4 className="reflection-col-title">Prototype realistic rider scenarios</h4>
                  <p className="reflection-col-body">
                    It would be simpler to evaluate edge cases early in the design phase if AI-generated simulations could replicate various operational situations, such as failed swaps, low-light surroundings, and network outages.
                  </p>
                </div>
              </div>
            </section>


            {/* Contact me */}
            <div className="contact-prompt-box">
              <span className="contact-tag">CURIOUS TO KNOW MORE?</span>
              <p className="contact-text">
                This is just a small part of the design process, to get the full story <a href="mailto:masteranishmaji@gmail.com" className="contact-link">get in touch</a>.
              </p>
            </div>

            <div className="simple-divider" style={{ margin: "40px 0" }}></div>

            {/* Other Projects */}
            <div className="related-projects-section">
              <h3 className="related-section-title">Also check out..</h3>
              <div className="related-projects-grid">
                <div className="related-project-card">
                  <div className="related-card-media streamline-media-bg">
                    <svg width="60" height="60" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M75 25C65 15 50 15 40 25C30 35 30 45 40 55C50 65 70 65 80 75C90 85 75 95 65 95C55 95 45 90 35 80" stroke="#22c55e" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M25 75C35 85 50 85 60 75" stroke="#22c55e" strokeWidth="12" strokeLinecap="round" />
                    </svg>
                  </div>
                  <p className="related-card-meta">STREAMLINE &bull; B2B SAAS &bull; 2023</p>
                  <h4 className="related-card-title">Design tool for Streamline</h4>
                </div>

                <div className="related-project-card">
                  <div className="related-card-media checkmate-media-bg">
                    <div className="mockup-phone-body">
                      <div className="mockup-phone-island"></div>
                      <div className="mockup-phone-screen">
                        {/* Mock Widget 1 */}
                        <div className="mockup-widget" style={{ borderLeft: "3px solid #f472b6" }}>
                          <div className="mockup-widget-title">Today's Todo</div>
                          <div className="mockup-widget-item">
                            <span className="mockup-checkbox checked"></span>
                            <span className="mockup-bar"></span>
                          </div>
                          <div className="mockup-widget-item">
                            <span className="mockup-checkbox"></span>
                            <span className="mockup-bar short"></span>
                          </div>
                        </div>
                        {/* Mock Widget 2 */}
                        <div className="mockup-widget" style={{ borderLeft: "3px solid #3b82f6" }}>
                          <div className="mockup-widget-title">Shared Tasks</div>
                          <div className="mockup-widget-item">
                            <span className="mockup-checkbox"></span>
                            <span className="mockup-bar"></span>
                          </div>
                          <div className="mockup-widget-item">
                            <span className="mockup-checkbox checked"></span>
                            <span className="mockup-bar"></span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="related-card-meta">CHECKMATE &bull; PRODUCTIVITY &bull; 2026</p>
                  <h4 className="related-card-title">Checkmate: Collaborative todo for shared living</h4>
                </div>
              </div>
            </div>

            {/* Bottom Navigation / Next Project Footer */}
            <footer className="case-study-footer">
              <button className="footer-back-btn" onClick={onBackToWork}>
                <ArrowLeft size={18} />
                <span>Back to all works</span>
              </button>
            </footer>

          </div>
        </main>

      </div>
    </div >
  );
}

export default SwapStationPage;
