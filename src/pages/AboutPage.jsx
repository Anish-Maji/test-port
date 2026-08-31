import React, { useState, useEffect, useRef } from 'react';
import { FileText, GraduationCap } from 'lucide-react';
import cvFile from '../assets/CV/cv.pdf';

// Brand Logos
import baazBikesLogo from '../assets/brand logos/webp logos/baaz-bikes.webp';
import smartivityLogo from '../assets/brand logos/webp logos/smartivity.webp';
import tangleLogo from '../assets/brand logos/webp logos/tangle.webp';
import crimsonLogo from '../assets/brand logos/webp logos/crimson.webp';
import globalEsportsLogo from '../assets/brand logos/webp logos/global-esports.webp';
import iiitLogo from '../assets/brand logos/webp logos/iiit.webp';

// Interactive Eye-Tracking Images
import imgCenter from '../assets/about-me/personal/center.webp';
import imgTop from '../assets/about-me/personal/top.webp';
import imgBottom from '../assets/about-me/personal/bottom.webp';
import imgCenterLeft from '../assets/about-me/personal/center-left.webp';
import imgCenterRight from '../assets/about-me/personal/center-right.webp';
import imgTopLeft from '../assets/about-me/personal/top-left.webp';
import imgTopRight from '../assets/about-me/personal/top-right.webp';
import imgBottomLeft from '../assets/about-me/personal/bottom-left.webp';
import imgBottomRight from '../assets/about-me/personal/bottom-right.webp';

import post1 from '../assets/instagram/post 1.webp';
import post2 from '../assets/instagram/post 2.webp';
import post3 from '../assets/instagram/post 3.webp';
import post4 from '../assets/instagram/post 4.webp';
import post5 from '../assets/instagram/post 5.webp';

import '../styles/AboutPage.css';

const EYE_TRACKING_IMAGES = {
  'center': imgCenter,
  'top': imgTop,
  'bottom': imgBottom,
  'center-left': imgCenterLeft,
  'center-right': imgCenterRight,
  'top-left': imgTopLeft,
  'top-right': imgTopRight,
  'bottom-left': imgBottomLeft,
  'bottom-right': imgBottomRight,
};

const photoItemsData = [
  { id: 'dharmashala', image: post1 },
  { id: 'andamans', image: post2 },
  { id: 'yamuna', image: post3 },
  { id: 'kolkata', image: post4 },
  { id: 'delhi', image: post5 }
];

const journeyData = [
  {
    id: 'baaz',
    role: 'Product Designer',
    organization: 'Baaz Bikes',
    employmentType: 'Full-time',
    period: 'June 2023 – Present',
    location: 'Gurugram, Haryana, India',
    logo: baazBikesLogo,
    logoAlt: 'Baaz Bikes',
    description: 'Lead end-to-end product design across Baaz Mobility’s EV ecosystem, including driver mobile apps, touch kiosk swap station interfaces, and internal operations dashboards. Redesigned battery swapping workflows from 90 seconds to under 50 seconds and built scalable design systems.',
  },
  {
    id: 'tangle',
    role: 'UI/UX Design Intern',
    organization: 'Tangle Design',
    employmentType: 'Internship',
    period: 'March 2023 – June 2023',
    location: 'Pune, Maharashtra, India',
    logo: tangleLogo,
    logoAlt: 'Tangle Design',
    description: 'Designed user experiences, web & mobile UI screens, design systems, and interactive prototypes for client digital products.',
  },
  {
    id: 'smartivity',
    role: 'Visual Designer Freelancer',
    organization: 'Smartivity Labs',
    employmentType: 'Freelance',
    period: 'August 2022 – October 2022',
    location: 'New Delhi, India',
    logo: smartivityLogo,
    logoAlt: 'Smartivity',
    description: 'Designed engaging STEAM toy packaging, brand identity assets, instructional visual guides, and interactive companion mobile app assets for global distribution.',
  },
  {
    id: 'crimson',
    role: 'Visual Design Intern',
    organization: 'Crimson Healthcare Pvt Ltd',
    employmentType: 'Internship',
    period: 'May 2022 – July 2022',
    location: 'New Delhi, India',
    logo: crimsonLogo,
    logoAlt: 'Crimson Healthcare',
    description: 'Developed medical technology visual systems, product documentation manuals, and digital marketing materials for specialized clinical ostomy care devices.',
  },
  {
    id: 'global-esports',
    role: 'Visual & Production Designer',
    organization: 'Global Esports',
    employmentType: 'Part-time / Contract',
    period: 'Sep 2020 – Feb 2022',
    location: 'Mumbai, India',
    logo: globalEsportsLogo,
    logoAlt: 'Global Esports',
    description: 'Crafted tournament broadcast graphics, esports event visual campaigns, social media assets, YouTube thumbnails, and brand identity collateral for India’s premier esports organization.',
  },
  {
    id: 'education',
    role: 'Bachelor of Design (B.Des)',
    organization: 'Indian Institute of Information Technology, Design & Manufacturing (IIITDM) Jabalpur',
    employmentType: 'Interaction Design',
    period: '2020 – 2024',
    location: 'Jabalpur, Madhya Pradesh, India',
    isEducation: true,
    logo: iiitLogo,
    logoAlt: 'IIITDM Jabalpur',
    description: 'Specialized in Interaction Design & Industrial Design. Core focus on Human-Computer Interaction (HCI), user research, ergonomics, design thinking, physical computing, and digital design systems.',
  }
];

const DEFAULT_PAGE_TITLE = "About Anish | a.niche Portfolio";

export default function AboutPage({ onBackToWork, pageTitle = DEFAULT_PAGE_TITLE }) {
  const [activeEyeImage, setActiveEyeImage] = useState('center');
  const cardRef = useRef(null);

  useEffect(() => {
    document.title = pageTitle;
  }, [pageTitle]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const cardCenterX = rect.left + rect.width / 2;
      const cardCenterY = rect.top + rect.height / 2;

      const deltaX = e.clientX - cardCenterX;
      const deltaY = e.clientY - cardCenterY;
      const distance = Math.hypot(deltaX, deltaY);

      if (distance < 40) {
        setActiveEyeImage('center');
        return;
      }

      const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);

      if (angle >= -22.5 && angle < 22.5) {
        setActiveEyeImage('center-right');
      } else if (angle >= 22.5 && angle < 67.5) {
        setActiveEyeImage('bottom-right');
      } else if (angle >= 67.5 && angle < 112.5) {
        setActiveEyeImage('bottom');
      } else if (angle >= 112.5 && angle < 157.5) {
        setActiveEyeImage('bottom-left');
      } else if (angle >= 157.5 || angle < -157.5) {
        setActiveEyeImage('center-left');
      } else if (angle >= -157.5 && angle < -112.5) {
        setActiveEyeImage('top-left');
      } else if (angle >= -112.5 && angle < -67.5) {
        setActiveEyeImage('top');
      } else if (angle >= -67.5 && angle < -22.5) {
        setActiveEyeImage('top-right');
      }
    };

    const handleMouseLeave = () => {
      setActiveEyeImage('center');
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const carouselItems = [
    ...photoItemsData,
    ...photoItemsData,
    ...photoItemsData,
  ];

  return (
    <div className="about-page-root">
      <div className="about-page-container">
        {/* Tier 1: Hero Section (2-Column Grid) */}
        <section className="about-hero-section">
          <div className="about-hero-left">
            <h1 className="about-hero-heading">
              I am a designer by passion and explorer by heart. I love the things that I am doing.
            </h1>
            <p className="about-hero-description">
              I grew up in the Cultural Capital of India, Kolkata and am now exploring the magical world of tech and design at Gurgaon.
            </p>
            <div className="about-resume-cta-wrap">
              <a
                href={cvFile}
                target="_blank"
                rel="noopener noreferrer"
                className="about-resume-btn"
                title="Download my resume"
              >
                <span className="about-resume-text">download my resume</span>
                <FileText size={18} className="about-resume-icon" />
              </a>
            </div>
          </div>

          <div className="about-hero-right">
            <div className="about-photo-card" ref={cardRef}>
              {Object.entries(EYE_TRACKING_IMAGES).map(([key, src]) => (
                <img
                  key={key}
                  src={src}
                  alt="Anish looking towards cursor"
                  loading="eager"
                  decoding="sync"
                  className={`about-photo-img ${key === 'center' ? 'is-base' : ''} ${activeEyeImage === key ? 'is-active' : ''}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="about-divider"></div>

        {/* Tier 2: Continuous 1:1 Photo Carousel */}
        <section className="about-carousel-section">
          <div className="about-carousel-header">
            <h2 className="about-carousel-title">director's cut</h2>
          </div>

          <div className="about-carousel-wrapper">
            <div className="about-carousel-track">
              {carouselItems.map((item, index) => (
                <div
                  key={`${item.id}-${index}`}
                  className="about-carousel-card-item"
                >
                  <div className="about-carousel-card">
                    <img
                      src={item.image}
                      alt=""
                      className="about-carousel-img"
                      loading="lazy"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="about-divider"></div>

        {/* Tier 3: Revamped Journey So Far / Experience & Education Timeline */}
        <section className="about-journey-section">
          <div className="about-journey-header">
            <span className="about-journey-badge">EXPERIENCE</span>
            <h2 className="about-journey-title">Journey so far</h2>
            <p className="about-journey-subtitle">
              From leading product and visual systems to crafting interactive hardware & EV mobility platforms.
            </p>
          </div>

          <div className="about-journey-timeline">
            {journeyData.map((item, idx) => (
              <div key={item.id || idx} className="journey-timeline-item">
                {/* Left Column: Brand Logo with vertical timeline line */}
                <div className="journey-logo-column">
                  <div className="journey-logo-wrap">
                    {item.logo ? (
                      <img
                        src={item.logo}
                        alt={item.logoAlt || item.organization}
                        className="journey-logo-img"
                        loading="lazy"
                      />
                    ) : (
                      <div className="journey-edu-logo-badge">
                        <GraduationCap size={20} className="journey-edu-icon" />
                        <span>{item.logoText || 'IIITDM'}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Column: Experience Details */}
                <div className="journey-content-column">
                  <h3 className="journey-role-title">{item.role}</h3>
                  <p className="journey-org-meta">
                    {item.organization} &bull; {item.employmentType}
                  </p>
                  <div className="journey-time-loc">
                    <span>{item.period}</span>
                    <span>{item.location}</span>
                  </div>
                  <p className="journey-description">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
