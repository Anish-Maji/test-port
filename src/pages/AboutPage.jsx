import React from 'react';
import { FileText } from 'lucide-react';
import cvFile from '../assets/CV/cv.pdf';
import aboutHeroImg from '../assets/about-hero-photo.webp';

import post1 from '../assets/instagram/post 1.webp';
import post2 from '../assets/instagram/post 2.webp';
import post3 from '../assets/instagram/post 3.webp';
import post4 from '../assets/instagram/post 4.webp';
import post5 from '../assets/instagram/post 5.webp';

import '../styles/AboutPage.css';

const photoItemsData = [
  { id: 'dharmashala', image: post1 },
  { id: 'andamans', image: post2 },
  { id: 'yamuna', image: post3 },
  { id: 'kolkata', image: post4 },
  { id: 'delhi', image: post5 }
];

const workExperiences = [
  {
    role: 'Product & Visual Designer',
    company: 'Baaz Bikes',
    period: '2023- Present',
    location: 'Gurugram, India'
  },
  {
    role: 'Visual Designer Freelancer',
    company: 'Smartivity',
    location: 'New Delhi, India',
    period: '2022- 2023'
  },
  {
    role: 'UI UX Design Intern',
    company: 'Tangle Design',
    location: 'Pune, India',
    period: 'Jun - Sep 2021'
  },
  {
    role: 'Visual Design Intern',
    company: 'Crimson Healthcare Pvt Ltd',
    location: 'New Delhi, India',
    period: 'May - Aug 2022'
  },
  {
    role: 'Visual & Production Designer',
    company: 'Global Esports India',
    location: 'Mumbai, India',
    period: '2020- 2022'
  }
];

const educationData = [
  {
    degree: 'Bachelor of Design',
    years: '2020-24',
    institution: 'Interaction Design, IIITDM Jabalpur'
  },

];

const socialLinks = [
  { name: 'EMAIL', href: 'mailto:masteranishmaji@gmail.com' },
  { name: 'LINKEDIN', href: 'www.linkedin.com/in/anish-maji', target: '_blank' },
  { name: 'INSTAGRAM', href: 'https://www.instagram.com/anishmaji_/', target: '_blank' },
  { name: 'BEHANCE', href: 'https://www.behance.net/anishmaji_', target: '_blank' }
];

export default function AboutPage({ onBackToWork }) {
  // Triple items array for 100% seamless, continuous carousel loop
  const carouselItems = [...photoItemsData, ...photoItemsData, ...photoItemsData];

  return (
    <div className="about-page-root">
      <div className="about-page-container">

        {/* ----------------------------------------------------------------- */}
        {/* Tier 1: Hero Section (2-Column Grid)                              */}
        {/* ----------------------------------------------------------------- */}
        <section className="about-hero-section">
          <div className="about-hero-left">
            <h1 className="about-hero-heading">
              I am a designer by passions and explorer by heart. I love the things that I am doing.
            </h1>

            <p className="about-hero-description">
              I grew up in the Cultural Capital of India, Kolkata and am now exploring the magical world of tech and design at Gurgaon.
            </p>

            <div className="about-resume-cta-wrap">
              <a
                href={cvFile}
                download="Anish_Maji_CV.pdf"
                className="about-resume-btn"
                title="Download my resume"
              >
                <span className="about-resume-text">download my resume</span>
                <FileText size={18} className="about-resume-icon" />
              </a>
            </div>
          </div>

          <div className="about-hero-right">
            <div className="about-photo-card">
              <img
                src={aboutHeroImg}
                alt="Anish outdoors on a hike"
                className="about-photo-img"
              />
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="about-divider"></div>

        {/* ----------------------------------------------------------------- */}
        {/* Tier 2: Continuous 1:1 Photo Carousel (with Section Header)      */}
        {/* ----------------------------------------------------------------- */}
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

        {/* ----------------------------------------------------------------- */}
        {/* Tier 3: 3-Column Experience / Education & Skills / Say Hello     */}
        {/* ----------------------------------------------------------------- */}
        <section className="about-details-section">
          <div className="about-details-grid">

            {/* Column 1: WORK EXPERIENCE */}
            <div className="about-col">
              <h3 className="about-col-title">WORK EXPERIENCE</h3>
              <div className="about-experience-list">
                {workExperiences.map((exp, index) => (
                  <div key={index} className="about-experience-item">
                    <h4 className="about-exp-role">
                      {exp.role}, <span className="about-exp-company">{exp.company}</span>
                    </h4>
                    {exp.location && <p className="about-exp-location">{exp.location}</p>}
                    <p className="about-exp-period">{exp.period}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Column 2: EDUCATION & SKILLS */}
            <div className="about-col">
              <div className="about-sub-block">
                <h3 className="about-col-title">EDUCATION</h3>
                <div className="about-education-list">
                  {educationData.map((edu, index) => (
                    <div key={index} className="about-edu-item">
                      <h4 className="about-edu-degree">
                        {edu.degree}, <span className="about-edu-years">{edu.years}</span>
                      </h4>
                      <p className="about-edu-institution">{edu.institution}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="about-sub-block skills-block">
                <h3 className="about-col-title">SKILLS</h3>
                <p className="about-skills-text">
                  Softwares- Figma, Sketch, Principle, Adobe Creative Suite (Photoshop, Illustrator, InDesign), FontLab, Glyphs
                </p>
              </div>
            </div>

            {/* Column 3: SAY HELLO */}
            <div className="about-col">
              <h3 className="about-col-title">SAY HELLO</h3>
              <div className="about-social-list">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    target={link.target || '_self'}
                    rel="noopener noreferrer"
                    className="about-social-link"
                  >
                    <span>{link.name}</span>
                  </a>
                ))}
              </div>
            </div>

          </div>
        </section>

      </div>
    </div>
  );
}
