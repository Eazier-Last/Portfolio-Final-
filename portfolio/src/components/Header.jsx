import React, { useState, useEffect } from 'react';
import '../styles/header.css';

const Header = () => {
  const [activeLink, setActiveLink] = useState('home');
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'skills', label: 'Skills' },
    { id: 'portfolio', label: 'Posters' },
    { id: 'logo-designs', label: 'Logo Designs' },
    { id: '3d-models', label: '3D Models' },
  ];

  const handleClick = (id, e) => {
    e.preventDefault();
    setActiveLink(id);
    setMenuOpen(false);
    
    const element = document.getElementById(id);
    if (element) {
      const headerHeight = isMobile ? 140 : 100;
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

  return (
    <header className="main-header">
      <div className="header-container">
        <div className="header-logo">
          <span className="logo-text">EL</span>
          <span className="logo-name">Ezekiel Labay</span>
        </div>
        
        {isMobile ? (
          <>
            <button 
              className="mobile-menu-toggle"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                {menuOpen ? (
                  <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                ) : (
                  <path d="M3 12h18M3 6h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                )}
              </svg>
            </button>
            
            {menuOpen && (
              <nav className="mobile-nav">
                {navItems.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={`mobile-nav-link ${activeLink === item.id ? 'active' : ''}`}
                    onClick={(e) => handleClick(item.id, e)}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            )}
          </>
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