import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, ArrowUpRight, Share2, Play, Pause, Plus, Minus } from 'lucide-react';
import '../styles/ReferralSystemPage.css';

import referralHeroImg from '../assets/referral_hero.png';
import referHeroBannerVideo from '../assets/referral-system/refer-hero-banner.webm';
import baazLogo from '../assets/brand logos/Baaz-Bikes-LOGO.png';
import kioskScreenImg from '../assets/swap_flow_kiosk_screen.png';
import historyScreenImg from '../assets/swap_flow_history_screen.png';
import scooterRentingVideo from '../assets/referral-system/scooter-renting-video.webm';
import generateCodeFlowVideo from '../assets/referral-system/generate-code-flow.webm';
import flowImg from '../assets/referral-system/flow.webp';
import referralTwoFlowsImg from '../assets/referral-system/referral-two-flows.webp';
import ssPieImg from '../assets/ss-pie-chart.png';
import ssInitialFindingImg from '../assets/ss-initial-finding-2.png';
import goalSwapImg from '../assets/SS Project/goal-swap.png';
import goalLangImg from '../assets/SS Project/goal-language.webp';
import goalFeedbackImg from '../assets/SS Project/goal-feedback.png';
import dd1 from '../assets/referral-system/dd-1.webp';
import dd2 from '../assets/referral-system/dd-2.webp';
import dd3 from '../assets/referral-system/dd-3.webp';
import sol1 from '../assets/referral-system/solution-1.webm';
import sol2 from '../assets/referral-system/solution-2.webm';
import sol3 from '../assets/referral-system/solution-3.webp';

const tocItems = [
  { id: 'tldr', label: 'Tl;dr' },
  { id: 'solution', label: 'Solution' },
  { id: 'overview', label: 'Overview' },
  { id: 'problem', label: 'Problem' },
  { id: 'observations', label: 'Observations' },
  { id: 'hmw', label: 'How Might We' },
  { id: 'process', label: 'Design process' },
  { id: 'decisions', label: 'Design decisions' },
  { id: 'outcome', label: 'Outcome' },
  { id: 'reflection', label: 'Reflection' },
];

// ============================================================================
// PAGE TITLE CONFIGURATION
// Change the string below to update the browser tab title for this page.
// ============================================================================
const DEFAULT_PAGE_TITLE = "Baaz Referral System | a.niche";

export function ReferralSystemPage({ onBackToWork, pageTitle = DEFAULT_PAGE_TITLE }) {
  useEffect(() => {
    document.title = pageTitle;
  }, [pageTitle]);

  const [activeSection, setActiveSection] = useState('tldr');
  const [copied, setCopied] = useState(false);

  // Problem section video play/pause state & ref
  const [isProblemVideoPlaying, setIsProblemVideoPlaying] = useState(true);
  const problemVideoRef = useRef(null);

  const toggleProblemVideoPlay = () => {
    if (problemVideoRef.current) {
      if (isProblemVideoPlaying) {
        problemVideoRef.current.pause();
      } else {
        problemVideoRef.current.play().catch(err => console.log('Playback error:', err));
      }
    }
  };

  // Solution Flow 1 video play/pause state & ref
  const [isSol1Playing, setIsSol1Playing] = useState(true);
  const sol1VideoRef = useRef(null);

  const toggleSol1Play = () => {
    if (sol1VideoRef.current) {
      if (isSol1Playing) {
        sol1VideoRef.current.pause();
      } else {
        sol1VideoRef.current.play().catch(err => console.log('Playback error:', err));
      }
    }
  };

  // Solution Flow 2 video play/pause state & ref
  const [isSol2Playing, setIsSol2Playing] = useState(true);
  const sol2VideoRef = useRef(null);

  const toggleSol2Play = () => {
    if (sol2VideoRef.current) {
      if (isSol2Playing) {
        sol2VideoRef.current.pause();
      } else {
        sol2VideoRef.current.play().catch(err => console.log('Playback error:', err));
      }
    }
  };

  // Generate Code Flow video ref & IntersectionObserver (auto-plays when in viewport, no loop, resets on exit)
  const generateCodeVideoRef = useRef(null);

  useEffect(() => {
    const video = generateCodeVideoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch((err) => {
              console.log('Autoplay blocked:', err);
            });
          } else {
            video.pause();
            video.currentTime = 0;
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(video);

    return () => {
      if (video) {
        observer.unobserve(video);
      }
    };
  }, []);

  // Interactive flow diagram zoom & pan state with boundary clamping
  const [flowZoom, setFlowZoom] = useState(1);
  const [flowPan, setFlowPan] = useState({ x: 0, y: 0 });
  const [isDraggingFlow, setIsDraggingFlow] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const flowContainerRef = useRef(null);
  const flowImageRef = useRef(null);

  const clampPan = (x, y, zoomLevel) => {
    if (!flowContainerRef.current || !flowImageRef.current) return { x: 0, y: 0 };

    const containerWidth = flowContainerRef.current.clientWidth;
    const containerHeight = flowContainerRef.current.clientHeight;

    const imgWidth = flowImageRef.current.clientWidth;
    const imgHeight = flowImageRef.current.clientHeight;

    const scaledWidth = imgWidth * zoomLevel;
    const scaledHeight = imgHeight * zoomLevel;

    const maxX = Math.max(0, (scaledWidth - containerWidth) / 2);
    const maxY = Math.max(0, (scaledHeight - containerHeight) / 2);

    return {
      x: Math.min(Math.max(x, -maxX), maxX),
      y: Math.min(Math.max(y, -maxY), maxY)
    };
  };

  const handleZoomIn = () => {
    setFlowZoom((prevZoom) => {
      const nextZoom = Math.min(prevZoom + 0.3, 3);
      setFlowPan((prevPan) => clampPan(prevPan.x, prevPan.y, nextZoom));
      return nextZoom;
    });
  };

  const handleZoomOut = () => {
    setFlowZoom((prevZoom) => {
      const nextZoom = Math.max(prevZoom - 0.3, 1);
      if (nextZoom === 1) {
        setFlowPan({ x: 0, y: 0 });
      } else {
        setFlowPan((prevPan) => clampPan(prevPan.x, prevPan.y, nextZoom));
      }
      return nextZoom;
    });
  };

  const handleMouseDown = (e) => {
    if (flowZoom > 1) {
      setIsDraggingFlow(true);
      setDragStart({ x: e.clientX - flowPan.x, y: e.clientY - flowPan.y });
    }
  };

  const handleMouseMove = (e) => {
    if (isDraggingFlow && flowZoom > 1) {
      const rawX = e.clientX - dragStart.x;
      const rawY = e.clientY - dragStart.y;
      setFlowPan(clampPan(rawX, rawY, flowZoom));
    }
  };

  const handleMouseUp = () => {
    setIsDraggingFlow(false);
  };

  const handleTouchStart = (e) => {
    if (flowZoom > 1 && e.touches.length === 1) {
      setIsDraggingFlow(true);
      setDragStart({ x: e.touches[0].clientX - flowPan.x, y: e.touches[0].clientY - flowPan.y });
    }
  };

  const handleTouchMove = (e) => {
    if (isDraggingFlow && flowZoom > 1 && e.touches.length === 1) {
      const rawX = e.touches[0].clientX - dragStart.x;
      const rawY = e.touches[0].clientY - dragStart.y;
      setFlowPan(clampPan(rawX, rawY, flowZoom));
    }
  };

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

  return (
    <div className="referral-study-root">
      <div className="referral-study-container">

        {/* Left Sticky Sidebar / Content Bar */}
        <aside className="referral-study-sidebar">
          <div className="referral-sidebar-sticky-inner">
            <button
              className="referral-back-link-btn"
              onClick={onBackToWork}
              aria-label="Back to work"
            >
              <ArrowLeft size={16} />
              <span>Back to work</span>
            </button>

            <nav className="referral-toc-nav" aria-label="Table of Contents">
              <ul className="referral-toc-list">
                {tocItems.map((item) => {
                  const isActive = activeSection === item.id;
                  return (
                    <li key={item.id} className="referral-toc-item">
                      <button
                        className={`referral-toc-btn ${isActive ? 'active' : ''}`}
                        onClick={() => scrollToSection(item.id)}
                      >
                        {item.label}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="referral-sidebar-footer-actions">
              <button className="referral-action-icon-btn" onClick={handleShare} title="Share case study">
                <Share2 size={16} />
                <span>{copied ? 'Link Copied!' : 'Share'}</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Main Case Study Right Column */}
        <main className="referral-study-main">

          {/* Header Metadata & Category */}
          <header className="referral-study-header">
            <div className="referral-category-meta-tag">
              BAAZ MOBILITY &bull; REFERRAL SYSTEM &bull; 2025
            </div>
            <h1 className="referral-study-title">
              Designing Baaz Referral System <br />
              <span style={{ fontStyle: 'italic', color: '#c94f1e' }}>
                turning manual based referral process into a centralised system.
              </span>
            </h1>
          </header>

          <div className="referral-body-content">

            {/* Hero Banner Container */}
            <div className="referral-hero-banner-container">
              <div className="referral-hero-banner-inner">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="referral-hero-banner-video"
                >
                  <source src={referHeroBannerVideo} type="video/webm" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>

            {/* Project Details Grid (Timeline, Role, Team) */}
            <div className="referral-project-details-grid">
              <div className="referral-detail-column">
                <span className="referral-detail-label">TIMELINE</span>
                <span className="referral-detail-value">3 months</span>
              </div>
              <div className="referral-detail-column">
                <span className="referral-detail-label">ROLE</span>
                <span className="referral-detail-value">Product Designer</span>
              </div>
              <div className="referral-detail-column">
                <span className="referral-detail-label">TEAM</span>
                <div className="referral-detail-team-list">
                  <span>Growth PM</span>
                  <span>Product Manager</span>
                  <span>Mobile Engineers</span>
                  <span>Ops Lead</span>
                </div>
              </div>
            </div>

            {/* Section 1: TL;DR */}
            <section id="tldr" className="referral-study-section referral-section-tldr">
              <div className="referral-tldr-card-box">
                <div className="referral-tldr-badge">TL ; DR</div>
                <p className="referral-tldr-text">
                  Baaz already had a referral program, but it just was not a system. Riders had to physically bring their referral to a hub, where the referrer was paid ₹100 in cash. There was no way to track who referred whom, no record of what had already been paid, and referrals routinely fell through the cracks, while other competitors were peeping into Delhi NCR.
                  <br />
                  <br />
                  I designed a centralized, in-app referral flow for Baazigar in one week with fewer steps, clear status at every stage, and a saved-state experience for returning riders. Within two weeks of launch, the program brought in 200+ new riders, with 400+ referrals tracked end-to-end for the first time.
                </p>

                {/* Key Impact Metrics Row */}
                <div className="referral-tldr-metrics-row">
                  <div className="referral-metric-card positive">
                    <div className="referral-metric-number">
                      <ArrowUpRight size={24} className="referral-metric-icon" />
                      <span className="referral-metric-number-data">200 Riders</span>
                    </div>
                    <div className="referral-metric-label">Onboarded (1 week)</div>
                  </div>

                  <div className="referral-metric-card positive">
                    <div className="referral-metric-number">
                      <ArrowUpRight size={24} className="referral-metric-icon" />
                      <span className="referral-metric-number-data">400 + Referrals</span>
                    </div>
                    <div className="referral-metric-label">Tracked end-to-end</div>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 2: Solution */}
            <section id="solution" className="referral-study-section">
              <div className="referral-detail-label" style={{ marginBottom: "var(--gap-md)" }}>SOLUTION</div>
              <h2 className="referral-section-heading">Key pillars of the referral engine design</h2>

              <div className="referral-solution-flows-list">
                {/* Flow 1 */}
                <div className="referral-solution-flow-item">
                  <div className="referral-flow-media-col">
                    <div className="referral-flow-media-container">
                      <video
                        ref={sol1VideoRef}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="referral-flow-media-image"
                        onPlay={() => setIsSol1Playing(true)}
                        onPause={() => setIsSol1Playing(false)}
                      >
                        <source src={sol1} type="video/webm" />
                        Your browser does not support the video tag.
                      </video>
                      <button
                        className="referral-video-play-pause-btn"
                        onClick={toggleSol1Play}
                        aria-label={isSol1Playing ? "Pause video" : "Play video"}
                        title={isSol1Playing ? "Pause" : "Play"}
                      >
                        {isSol1Playing ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" style={{ marginLeft: '2px' }} />}
                      </button>
                    </div>
                  </div>
                  <div className="referral-flow-text-col">
                    <h3 className="referral-flow-title">One-tap referral, not a form to fill out</h3>
                    <p className="referral-flow-desc">
                      Generating and sharing a code takes a single tap from "Refer & Earn". There is no manual entry, no separate sign-up for the referrer. Share hands off straight into WhatsApp or any platform the rider already uses, with the code and link pre-filled.
                    </p>
                  </div>
                </div>

                {/* Flow 2 */}
                <div className="referral-solution-flow-item">
                  <div className="referral-flow-media-col">
                    <div className="referral-flow-media-container">
                      <video
                        ref={sol2VideoRef}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="referral-flow-media-image"
                        onPlay={() => setIsSol2Playing(true)}
                        onPause={() => setIsSol2Playing(false)}
                      >
                        <source src={sol2} type="video/webm" />
                        Your browser does not support the video tag.
                      </video>
                      <button
                        className="referral-video-play-pause-btn"
                        onClick={toggleSol2Play}
                        aria-label={isSol2Playing ? "Pause video" : "Play video"}
                        title={isSol2Playing ? "Pause" : "Play"}
                      >
                        {isSol2Playing ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" style={{ marginLeft: '2px' }} />}
                      </button>
                    </div>
                  </div>
                  <div className="referral-flow-text-col">
                    <h3 className="referral-flow-title">Transparency and agency for the redeeming rider</h3>
                    <p className="referral-flow-desc">
                      Every state of code entry (validating, applied, invalid, or expired) is named plainly and shown in real time, with a referrer's name attached on success. Whatever happens with the code, onboarding always continues; the new joiner is never blocked or forced to retry.
                    </p>
                  </div>
                </div>

                {/* Flow 3 */}
                <div className="referral-solution-flow-item">
                  <div className="referral-flow-media-col">
                    <div className="referral-flow-media-container">
                      <img
                        src={sol3}
                        alt="Milestone Tier Rewards"
                        className="referral-flow-media-image"
                      />
                    </div>
                  </div>
                  <div className="referral-flow-text-col">
                    <h3 className="referral-flow-title">One redemption system, not two</h3>
                    <p className="referral-flow-desc">
                      Referral credit doesn't live in a separate wallet screen. It runs through the same "Add coupon code" component used for every other discount at payment. One system to design, test, and explain, instead of building a parallel one just for referrals.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 3: Overview */}
            <section id="overview" className="referral-study-section">
              <h2 className="referral-detail-label" style={{ marginBottom: "var(--gap-md)" }}>Overview</h2>
              <h3 className="referral-body-header">
                Baaz operates mobility infrastructure for commercial EV two-wheelers, where rider uptime directly impacts earnings and fleet efficiency.
              </h3>

              <p className="referral-paragraph-body">
                Referrals are Baaz's lowest-cost growth lever, connecting existing riders, new riders, and hub operations in a single loop. Any friction in this loop delays new rider onboarding, discourages existing riders from referring again, and ultimately slows the program's growth compounding effect. However, the existing referral process ran entirely offline, a new rider had to be physically brought to a hub, where the referrer was paid ₹100 in cash, thus introducing inconsistency and zero traceability at every step. At scale, even small gaps in this process compound into missed referrals, disputed or duplicate payouts, and a growth channel Baaz couldn't reliably measure or trust.
              </p>

              <a
                href="https://www.baaz.bike/"
                target="_blank"
                rel="noopener noreferrer"
                className="referral-company-relink-card"
              >
                <div className="referral-company-logo-box">
                  <img src={baazLogo} alt="Baaz Mobility" className="referral-company-logo-img" />
                </div>
                <div className="referral-company-relink-info">
                  <div className="referral-company-relink-name">
                    <span>Baaz Mobility</span>
                    <ArrowUpRight className="referral-relink-arrow-icon" size={15} />
                  </div>
                  <div className="referral-company-relink-sub">
                    baazbikes.com
                  </div>
                </div>
              </a>
            </section>

            {/* Section 4: Problem */}
            <section id="problem" className="referral-study-section">
              <h2 className="referral-detail-label" style={{ marginBottom: "var(--gap-md)" }}>Problem</h2>

              <h3 className="referral-body-header">
                No centralized referral system, thus making every referral ran on trust and memory, not data.
              </h3>
              <p className="referral-paragraph-body">
                A new rider had to be physically brought to a hub by their referrer, who was then immediately given ₹100 in cash. The current referral method was completely manual. There was no procedure in place to stop repeated or contested payouts, no record of the referral, and no way to confirm it later. Referrals frequently went unnoticed; riders who brought in a buddy occasionally never received credit, and hub employes lacked a trustworthy method to verify who had referred whom.
              </p>

              <div className="referral-problem-image-container">
                <video
                  ref={problemVideoRef}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="referral-problem-image"
                  onPlay={() => setIsProblemVideoPlaying(true)}
                  onPause={() => setIsProblemVideoPlaying(false)}
                >
                  <source src={scooterRentingVideo} type="video/webm" />
                  Your browser does not support the video tag.
                </video>
                <button
                  className="referral-video-play-pause-btn"
                  onClick={toggleProblemVideoPlay}
                  aria-label={isProblemVideoPlaying ? "Pause video" : "Play video"}
                  title={isProblemVideoPlaying ? "Pause" : "Play"}
                >
                  {isProblemVideoPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" style={{ marginLeft: '2px' }} />}
                </button>
              </div>

              <h3 className="referral-body-header">
                Cash payouts at hubs made the reward a one-time transaction instead of a reason to stay.
              </h3>
              <p className="referral-paragraph-body">
                Paying ₹100 in cash meant the reward left the ecosystem the moment it was earned. It did nothing to bring the rider back into the app, nothing to offset their next rent payment, and gave Baaz no control over how or when the incentive was actually used, while it was still costing the same amount off the books.
              </p>
            </section>

            {/* Section 5: Obeservations */}
            <section id="observations" className="referral-study-section">
              <h2 className="referral-detail-label" style={{ marginBottom: "var(--gap-md)" }}>Observations</h2>
              <div>
                <h3 className="referral-body-header">
                  The riders were already referring people, so the program worked, but only the process did not.
                </h3>
                <p className="referral-paragraph-body">
                  The demand was never the issue. Riders were bringing in their friends to get on with Baaz without any in-app prompt, since in the delivery rider’s world, word of mouth brings in more trust than an in-app prompt. What was capping it was the friction around it: the referrer had to show up in person, and both people had to be at the hub at the same time.
                </p>

                {/* <div className="referral-initial-finding-image-container">
                  <img
                    src={ssPieImg}
                    alt="Driver motivation distribution chart"
                    className="referral-initial-finding-image"
                  />
                </div> */}
              </div>


            </section>

            {/* Section 6: HMW */}
            <section id="hmw" className="referral-study-section">
              <h2 className="referral-detail-label" style={{ marginBottom: "var(--gap-xl)" }}>HOW MIGHT WE</h2>

              <div className="referral-goals-list-container">
                <div className="referral-goal-row-item">
                  <div className="referral-goal-illustration-box">
                    <img src={goalSwapImg} alt="Referral Goal Illustration" className="referral-goal-illustration-img" />
                  </div>
                  <div className="referral-goal-details-col">
                    <div className="referral-goal-pair-block">
                      <h4 className="referral-goal-pair-title">Give riders visibility into their own referral status and earnings?</h4>
                      <span className="referral-goal-pair-label">User goal</span>
                    </div>
                    <div className="referral-goal-pair-block">
                      <h4 className="referral-goal-pair-title">Turn word-of-mouth into a trackable, scalable growth channel?</h4>
                      <span className="referral-goal-pair-label">Business goal</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 7: Design process */}
            <section id="process" className="referral-study-section">
              <h2 className="referral-detail-label" style={{ marginBottom: "var(--gap-lg)" }}>Design process</h2>
              <h3 className="referral-body-header">
                I mapped all three touchpoints first: who generates a code, who redeems it, and who gets paid.
              </h3>
              <p className="referral-paragraph-body">
                A referral is not a single flow, it's three people meeting the same system at different times. I traced the referrer's share screen, the new joiner's redemption during onboarding, and the referrer's payout redemption weeks later, including every failure state in between. That map shows exactly how the new process is much more useful, still keeping it as simple as possible.
              </p>

              {/* Interactive Zoomable Flow Diagram Container */}
              <div className="referral-flow-diagram-wrapper">
                <div
                  ref={flowContainerRef}
                  className={`referral-flow-diagram-container ${flowZoom > 1 ? 'is-zoomed' : ''} ${isDraggingFlow ? 'is-dragging' : ''}`}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleMouseUp}
                >
                  <img
                    ref={flowImageRef}
                    src={flowImg}
                    alt="Baaz Referral System User Flow Diagram"
                    className="referral-flow-diagram-image"
                    style={{
                      transform: `translate(${flowPan.x}px, ${flowPan.y}px) scale(${flowZoom})`,
                      transition: isDraggingFlow ? 'none' : 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                    draggable={false}
                  />
                </div>



                {/* Floating Zoom Controls Stack (Top Right) */}
                <div className="referral-zoom-controls-stack">
                  <button
                    className="referral-zoom-btn"
                    onClick={handleZoomIn}
                    disabled={flowZoom >= 3}
                    aria-label="Zoom in"
                    title="Zoom in"
                  >
                    <Plus size={18} />
                  </button>
                  <button
                    className="referral-zoom-btn"
                    onClick={handleZoomOut}
                    disabled={flowZoom <= 1}
                    aria-label="Zoom out"
                    title="Zoom out"
                  >
                    <Minus size={18} />
                  </button>
                </div>
              </div>

              <div>
                <h3 className="referral-body-header">
                  I split the work into two flows: earning and redeeming, because each carried a different kind of anxiety.
                </h3>
                <p className="referral-paragraph-body">
                  The referrer's flow was about trust: would the code actually work, and would the money actually show up later. The new joiner's flow was about speed and fairness: they were being asked to enter someone else's code mid-signup, with nothing in it for them, so it had to feel effortless and never like a tax on their own onboarding. Designing them as one flow would have optimized for neither.
                </p>
                <div className="referral-problem-image-container">
                  <img
                    src={referralTwoFlowsImg}
                    alt="Earning and redeeming referral flows diagram"
                    className="referral-problem-image"
                  />
                </div>
              </div>

              <div>
                <h3 className="referral-body-header">
                  Sharing had to feel like handing off, not leaving the app.
                </h3>
                <p className="referral-paragraph-body">
                  While designing, I kept in mind the idea of how we share a photo on any phone: you tap Share, and WhatsApp or any other app opens with the image already attached, no need to re-select, no re-typing or anything. I similarly designed the referral share. The redeemable amount can only be used for renewing the plan, unlike before, when the rider was handed over cash. The user just has to press Share, which in turn shares a pre-filled message with code and short explainer already embedded, straight into the referrer’s platform of choice.
                </p>
                <div className="referral-problem-image-container">
                  <video
                    ref={generateCodeVideoRef}
                    muted
                    playsInline
                    className="referral-problem-image"
                  >
                    <source src={generateCodeFlowVideo} type="video/webm" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            </section>

            {/* Section 8: Design decisions */}
            <section id="decisions" className="referral-study-section">
              <h2 className="referral-detail-label" style={{ marginBottom: "var(--gap-md)" }}>DESIGN DECISIONS</h2>
              <h3 className="referral-body-header">
                Trust had to be built into the system itself, since there was no hub staff left to vouch for it.
              </h3>

              {/* Decision Number 1 */}
              <div className="referral-decision-grid">
                <div className="referral-decision-image-col">
                  <img
                    src={dd1}
                    alt="Transparency to amount breakdown"
                    className="referral-decision-img"
                  />
                </div>
                <div className="referral-decision-text-col">
                  <h4 className="referral-decision-title">Clear messaging, everywhere it mattered</h4>
                  <p className="referral-decision-desc">
                    Every state in this system says exactly what is happening. A valid code shows who referred you by name. An invalid code either indicates that it is invalid or that it has expired. Nobody hands a stranger's code to a signup form without proof it's real, so every screen in this system had to earn that proof on its own.
                  </p>
                </div>
              </div>


              {/* Decision Number 2 */}
              <div className="referral-decision-grid">
                <div className="referral-decision-image-col">
                  <img
                    src={dd2}
                    alt="Transparency to amount breakdown"
                    className="referral-decision-img"
                  />
                </div>
                <div className="referral-decision-text-col">
                  <h4 className="referral-decision-title">Never let the referral hold the real transaction hostage</h4>
                  <p className="referral-decision-desc">
                    Whether a code is valid, invalid, or expired, onboarding never stops. Rent payment never stops. The referral is additive to the core transaction, never a gate in front of it, because the new joiner has no stake in the referral succeeding, and blocking them over someone else's mistake would cost Baaz a rider to save a discount.
                  </p>
                </div>
              </div>

              {/* Decision Number 3 */}
              <div className="referral-decision-grid">
                <div className="referral-decision-image-col">
                  <img
                    src={dd3}
                    alt="Transparency to amount breakdown"
                    className="referral-decision-img"
                  />
                </div>
                <div className="referral-decision-text-col">
                  <h4 className="referral-decision-title">One redemption system, not two</h4>
                  <p className="referral-decision-desc">
                    Referral credit and generic promo codes use the exact same "Add coupon code" component at checkout. There's no separate wallet screen, no separate rules engine. This kept the system small enough to actually maintain, at the cost of referral credit competing for attention with unrelated offers.
                  </p>
                </div>
              </div>

            </section>

            {/* Section 9: Outcome */}
            <section id="outcome" className="referral-study-section">
              <h2 className="referral-detail-label" style={{ marginBottom: "var(--gap-md)" }}>Outcome</h2>
              <h3 className="referral-body-header">
                A channel that didn't reliably exist now brings in riders on its own.
              </h3>
              <p className="referral-paragraph-body">
                In the two weeks following launch, referrals moved from an untracked, hub-dependent process to the app's first fully measurable growth channel, bringing in 200+ new riders without a single hub visit required.
              </p>

              <div className="referral-tldr-metrics-row">
                <div className="referral-metric-card positive">
                  <div className="referral-metric-number">
                    <Plus size={24} className="referral-metric-icon" />
                    <span className="referral-metric-number-data">200 Riders</span>
                  </div>
                  <div className="referral-metric-label">Onboarded (1 week)</div>
                </div>

                <div className="referral-metric-card positive">
                  <div className="referral-metric-number">
                    <Plus size={24} className="referral-metric-icon" />
                    <span className="referral-metric-number-data">400 + Referrals</span>
                  </div>
                  <div className="referral-metric-label">Tracked end-to-end</div>
                </div>
              </div>
            </section>

            {/* Section 10: Reflection */}
            <section id="reflection" className="referral-study-section">
              <h2 className="referral-detail-label" style={{ marginBottom: "var(--gap-md)" }}>REFLECTION</h2>
              <h3 className="referral-body-header">
                My key takeaways and learnings!
              </h3>

              <div className="referral-reflections-columns-grid">
                <div className="referral-reflection-column">
                  <h4 className="referral-reflection-col-title">
                    Working closely with PMs kept the scope tight to funnel data.
                  </h4>
                  <p className="referral-reflection-col-body">
                    Funnel drops, completion rates, and delinquency trends came from the PM's dashboards. I designed against those breakpoints.
                  </p>
                </div>

                <div className="referral-reflection-column">
                  <h4 className="referral-reflection-col-title">
                    The best growth mechanics are the ones that don't need to be clever.
                  </h4>
                  <p className="referral-reflection-col-body">
                    Nothing about the referral system is a novel interaction pattern; it is a core field, and following Jacob’s Law we kept it similar to what any other app in the world does. What made it work wasn't invention, it was making sure every one of those familiar pieces closed the trust gap the old process left open.
                  </p>
                </div>
              </div>
            </section>

          </div>
        </main>
      </div>
    </div>
  );
}

export default ReferralSystemPage;
