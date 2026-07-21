import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import '../styles/Navbar.css';

const navItems = [
  { id: 'work', label: 'Work', href: '#work' },
  { id: 'play', label: 'Play', href: '#play' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'cv', label: 'CV', href: '#cv' },
];

export const Navbar = ({ onNavigateHome, activePage = 'home' }) => {
  const [activeSection, setActiveSection] = useState('work');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  const handleNavClick = (e, id) => {
    setActiveSection(id);
    setIsMobileMenuOpen(false);

    if (activePage === 'swap-station') {
      if (onNavigateHome) {
        onNavigateHome();
      }
    }
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-container">

        {/* Brand Text */}
        <a
          href="#work"
          className="brand-text"
          onClick={(e) => handleNavClick(e, 'work')}
        >
          a.niche
        </a>

        {/* Desktop & Tablet Navigation links */}
        <nav className="desktop-nav">
          <div className="nav-menu">
            {navItems.map((item) => {
              const isActive = activePage === 'home' && activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  className={`nav-link ${isActive ? 'active' : ''}`}
                  onClick={(e) => handleNavClick(e, item.id)}
                >
                  {item.label}
                </a>
              );
            })}
          </div>
        </nav>

        {/* Mobile Hamburger Toggle Button */}
        <button
          className="mobile-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>

        {/* Mobile Navigation Drawer */}
        <div className={`mobile-drawer ${isMobileMenuOpen ? 'open' : ''}`}>
          <div className="mobile-nav-list">
            {navItems.map((item) => {
              const isActive = activePage === 'home' && activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  className={`mobile-nav-item ${isActive ? 'active' : ''}`}
                  onClick={(e) => handleNavClick(e, item.id)}
                >
                  {item.label}
                </a>
              );
            })}
          </div>
        </div>

      </div>
    </header>
  );
};

export default Navbar;
