
import React, { useState, useEffect, useRef } from 'react';
import '../styles/header.css';

const Header = () => {
  const [activeLink, setActiveLink] = useState('home');
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const navItems = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'skills', label: 'Skills', icon: '🛠️' },
    { id: 'portfolio', label: 'Posters', icon: '🎨' },
    { id: 'logo-designs', label: 'Logo Designs', icon: '✨' },
    { id: '3d-models', label: '3D Models', icon: '🧊' },
  ];

  const handleClick = (id, e) => {
    e.preventDefault();
    setActiveLink(id);
    setMenuOpen(false);
    
    const element = document.getElementById(id);
    if (element) {
      const headerHeight = isMobile ? 56 : 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      
      const sections = navItems
        .map(item => {
          const element = document.getElementById(item.id);
          if (!element) return null;
          
          const rect = element.getBoundingClientRect();
          const top = window.pageYOffset + rect.top;
          const bottom = top + rect.height;
          
          return { id: item.id, top, bottom };
        })
        .filter(section => section !== null);
      
      let currentSection = 'home';
      
      for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        
        if (scrollPosition >= section.top - 50 && scrollPosition < section.bottom - 50) {
          currentSection = section.id;
          break;
        }
      }
      
      setActiveLink(currentSection);
    };

    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener('scroll', throttledScroll);
  }, [navItems]);

  // Close menu when clicking outside or scrolling
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuOpen && menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };

    const handleScroll = () => {
      if (menuOpen) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      document.removeEventListener('click', handleClickOutside);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [menuOpen]);

  return (
    <header className={`main-header ${isMobile ? 'mobile-header' : ''}`}>
      <div className="header-container">
        <div className="header-left">
          <div className="header-logo">
            <span className="logo-text">EL</span>
            <span className="logo-name">Ezekiel Labay</span>
          </div>
        </div>
        
        {isMobile ? (
          <div className="header-right" ref={menuRef}>
            <button 
              className="mobile-menu-toggle"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="menu-icon">
                {menuOpen ? (
                  <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                ) : (
                  <path d="M3 12h18M3 6h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                )}
              </svg>
            </button>
            
            {menuOpen && (
              <>
                <div className="mobile-menu-overlay" onClick={() => setMenuOpen(false)} />
                <nav className="mobile-nav">
                  <div className="mobile-nav-items">
                    {navItems.map((item) => (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        className={`mobile-nav-link ${activeLink === item.id ? 'active' : ''}`}
                        onClick={(e) => handleClick(item.id, e)}
                      >
                        <span className="mobile-nav-icon">{item.icon}</span>
                        <span className="mobile-nav-text">{item.label}</span>
                        {activeLink === item.id && (
                          <span className="mobile-nav-indicator">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" fill="#667eea"/>
                            </svg>
                          </span>
                        )}
                      </a>
                    ))}
                  </div>
                </nav>
              </>
            )}
          </div>
        ) : (
          <nav className="header-nav">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`nav-link ${activeLink === item.id ? 'active' : ''}`}
                onClick={(e) => handleClick(item.id, e)}
              >
                {item.label}
              </a>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
