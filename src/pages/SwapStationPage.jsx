import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  Zap,
  Clock,
  Users,
  CheckCircle2,
  ShieldCheck,
  Smartphone,
  BatteryCharging,
  Layers,
  Share2,
  Bookmark,
  ChevronRight,
  Sparkles,
  Maximize2,
  MoveDownRight,
  ArrowUpRight
} from 'lucide-react';
import '../styles/SwapStationPage.css';
import swapMockupImg from '../assets/Frame 34768.png';
import swapFlowImg from '../assets/swap_flow_diagram.png';
import swapSol1Video from '../assets/solution 1.webm';
import baazLogo from '../assets/brand logos/Baaz-Bikes-LOGO.png';
import ssProblemImg from '../assets/ss-problem.png';
import ssPieImg from '../assets/ss-pie-chart.png';
import ssInitialFindingImg from '../assets/ss-initial-finding-2.png';

const tocItems = [
  { id: 'tldr', label: 'Tl;dr' },
  { id: 'solution', label: 'Solution' },
  { id: 'overview', label: 'Overview' },
  { id: 'problem', label: 'Problem' },
  { id: 'findings', label: 'Initial findings' },
  { id: 'goals', label: 'Goals' },
  { id: 'process', label: 'Design process' },
  { id: 'testing', label: 'Test & launch' },
  { id: 'outcome', label: 'Outcome' },
  { id: 'reflection', label: 'Reflection' },
];

export function SwapStationPage({ onBackToWork }) {
  const [activeSection, setActiveSection] = useState('tldr');
  const [activeTab, setActiveTab] = useState('mobile');
  const [copied, setCopied] = useState(false);

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
    <div className="case-study-root">
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
              <span className="detail-value">4 months</span>
            </div>
            <div className="detail-column">
              <span className="detail-label">ROLE</span>
              <span className="detail-value">Lead Product Designer (Me!)</span>
            </div>
            <div className="detail-column">
              <span className="detail-label">TEAM</span>
              <div className="detail-team-list">
                <span>Design Manager</span>
                <span>Product Managers</span>
                <span>Developers</span>
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
                  <div className="metric-label">Fewer Sets</div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Solution */}
          <section id="solution" className="case-study-section">
            <div className="detail-label" style={{ marginBottom: "var(--gap-md)" }}>SOLUTION</div>
            <h2 className="section-heading">Here are some of the key flows</h2>

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
                  <div className="flow-media-container">
                    <img
                      src={swapFlowImg}
                      alt="Leading with transparency"
                      className="flow-media-image"
                    />
                  </div>
                </div>
                <div className="flow-text-col">
                  <h3 className="flow-title">Leading with transparency</h3>
                  <p className="flow-desc">
                    Station locker details lead with glanceable information, then progressively disclose locker unlock steps when a rider arrives. Unfamiliar status messages link to quick guide overlays. Everything updates real-time when lockers open or latch.
                  </p>
                </div>
              </div>

              {/* Flow 3 */}
              <div className="solution-flow-item">
                <div className="flow-media-col">
                  <div className="flow-media-container">
                    <img
                      src={swapMockupImg}
                      alt="Automated battery health tracking"
                      className="flow-media-image"
                    />
                  </div>
                </div>
                <div className="flow-text-col">
                  <h3 className="flow-title">Automated battery health tracking</h3>
                  <p className="flow-desc">
                    Battery state-of-charge and range estimates are updated in real-time as soon as a battery is inserted into the locker, ensuring riders always depart with clear range transparency and zero unexpected drop-offs.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Overview */}
          <section id="overview" className="case-study-section">
            <h2 className="detail-label" style={{ marginBottom: "var(--gap-md)" }}>Overview</h2>
            <h3 className="body-header">
              Baaz operates a battery swapping network for commercial EV two-wheelers, where rider uptime directly impacts earnings and fleet efficiency.
            </h3>

            <p className="paragraph-body">
              Battery swapping is a critical touchpoint, connecting vehicles, stations, and the rider app. Any friction in this high-frequency flow increases rider downtime, reduces deliveries, which ultimately results in lower system throughput. However, the existing experience introduced hesitation and inconsistency at key steps, slowing down what should be a fast, repeatable action. At scale, even small delays per swap compound into lost delivery capacity, lower rider earnings, and reduced system throughput.
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
              The swap station is a self-serve platform — there is no staff member guiding the rider through the process. The HMI carries that responsibility entirely. When the FSM states weren't reflected accurately on screen, riders had no way to know what the system was doing or what to do next. Every gap between system state and screen state became a potential support call.
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
              Delivery riders are paid per order. Time spent at a swap station is time not moving — and not earning. A swap that should take 90 seconds stretching to 3–4 minutes doesn't just frustrate the rider, it compounds across every shift. At scale, across hundreds of riders doing multiple swaps daily, the lost time translates directly into lost income. A better HMI isn't just a usability improvement — it's a livelihood improvement.
            </p>
          </section>

          {/* Section 5: Initial findings */}
          <section id="findings" className="case-study-section">
            <h2 className="detail-label" style={{ marginBottom: "var(--gap-md)" }}>Initial findings</h2>
            <div>
              <h3 className="body-header">
                The support calls were not about confusion, but about a lack of transparency of the HMI or evern the FSM.
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
                The physical hardware, the rider app, and ops training all touched the swap experience. But only one touchpoint sits at the exact intersection of rider pain and business cost — and has no fallback when it fails.
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
              <p className="paragraph-body">
                The physical hardware, the rider app, and ops training all touched the swap experience. But only one touchpoint sits at the exact intersection of rider pain and business cost — and has no fallback when it fails.
              </p>
            </div>
          </section>

          {/* Section 6: Goals */}
          <section id="goals" className="case-study-section">
            <h2 className="section-heading">Goals</h2>
            <div className="goals-grid">
              <div className="goal-card">
                <div className="goal-icon-wrapper"><Clock size={20} /></div>
                <h4>Sub-15s Swap Time</h4>
                <p>Reduce total elapsed time at station from 3.5 minutes down to under 15 seconds per swap.</p>
              </div>

              <div className="goal-card">
                <div className="goal-icon-wrapper"><Users size={20} /></div>
                <h4>Cut Call Volume by 50%</h4>
                <p>Provide self-serve station status, automated error handling, and instant locker retry directly in-app.</p>
              </div>

              <div className="goal-card">
                <div className="goal-icon-wrapper"><ShieldCheck size={20} /></div>
                <h4>99.9% Swap Reliability</h4>
                <p>Establish real-time offline sync between station IoT hardware and the rider mobile app.</p>
              </div>
            </div>
          </section>

          {/* Section 7: Design process */}
          <section id="process" className="case-study-section">
            <h2 className="section-heading">Design process</h2>
            <p className="paragraph-body">
              We took an iterative, hardware-inclusive design approach—testing prototypes both in Figma and physically at operational station kiosks.
            </p>

            <div className="process-timeline">
              <div className="process-step">
                <div className="step-badge">Phase 1</div>
                <div className="step-details">
                  <h4>Information Architecture & User Mapping</h4>
                  <p>Streamlined the 7-step legacy swap flow into a streamlined 2-step Tap & Swap experience.</p>
                </div>
              </div>

              <div className="process-step">
                <div className="step-badge">Phase 2</div>
                <div className="step-details">
                  <h4>High-Contrast Outdoor Design System</h4>
                  <p>Developed high-contrast color tokens, bold 18pt+ typography scales, and tap targets exceeding 56px to accommodate glove usage.</p>
                </div>
              </div>

              <div className="process-step">
                <div className="step-badge">Phase 3</div>
                <div className="step-details">
                  <h4>Interactive Kiosk & Mobile Prototypes</h4>
                  <p>Built synchronized prototypes connecting smartphone NFC trigger events to simulated hardware station locker responses.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 8: Test & launch */}
          <section id="testing" className="case-study-section">
            <h2 className="section-heading">Test & launch</h2>
            <p className="paragraph-body">
              We conducted a 4-week pilot test with 45 delivery drivers across 3 busy urban swap hubs prior to full network rollout.
            </p>
            <div className="test-results-box">
              <div className="test-stat">
                <span className="stat-value">45 / 45</span>
                <span className="stat-desc">Drivers completed swaps under 15 seconds on first attempt</span>
              </div>
              <div className="test-stat">
                <span className="stat-value">0</span>
                <span className="stat-desc">Reported locker drawer assignment errors during pilot</span>
              </div>
            </div>
          </section>

          {/* Section 9: Outcome */}
          <section id="outcome" className="case-study-section">
            <h2 className="section-heading">Outcome</h2>
            <p className="paragraph-body">
              The redesigned Swap Station platform rolled out across all 14 markets in late 2025 with overwhelming positive response from drivers, fleet partners, and internal operations.
            </p>

            <div className="outcome-banner">
              <div className="outcome-item">
                <div className="outcome-num">395%</div>
                <div className="outcome-lbl">Increase in monthly automated swaps</div>
              </div>
              <div className="outcome-item">
                <div className="outcome-num">64%</div>
                <div className="outcome-lbl">Boost in rider satisfaction score (CSAT)</div>
              </div>
              <div className="outcome-item">
                <div className="outcome-num">-29%</div>
                <div className="outcome-lbl">Reduction in average station queue wait times</div>
              </div>
            </div>
          </section>

          {/* Section 10: Reflection */}
          <section id="reflection" className="case-study-section">
            <h2 className="section-heading">Reflection</h2>
            <p className="paragraph-body">
              Designing Swap Station reinforced that designing software for physical hardware requires treating environmental variables—sunlight, gloves, rain, IoT network latency—as core design constraints. By prioritizing radical clarity and automated self-healing hardware workflows, we created a seamless tool that empowers thousands of riders every day.
            </p>
          </section>

          {/* Bottom Navigation / Next Project Footer */}
          <footer className="case-study-footer">
            <button className="footer-back-btn" onClick={onBackToWork}>
              <ArrowLeft size={18} />
              <span>Back to all works</span>
            </button>
          </footer>

        </main>

      </div>
    </div >
  );
}

export default SwapStationPage;
