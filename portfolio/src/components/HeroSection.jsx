
import React, { useState, useEffect } from 'react';
import '../styles/hero.css';
import Profile from '../assets/profile.png'; 

const HeroSection = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section className="hero-section" id="home">
      <div className="hero-container">
        {isMobile && (
          <div className="hero-avatar mobile-first">
            <div className="avatar-container">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400"
                alt="Ezekiel Labay"
                className="avatar-image"
              />
              <div className="avatar-decoration"></div>
              
              <div className="avatar-badge">
                <div className="availability-dot"></div>
                <span className="availability-text">Available for hire</span>
              </div>
            </div>
          </div>
        )}
        
        <div className="hero-content">
          <h1 className="hero-title">
            Hello, I'm <br />
            <span className="hero-name">Ezekiel Labay</span>
          </h1>
          
          <h2 className="hero-subtitle">
            Graphic Designer
          </h2>
          
          <p className="hero-description">
            IT graduate with hands‑on experience from freelance work and a corporate internship. I create clean, effective logos and branding that help businesses grow and connect.
          </p>
          
          <div className="hero-contact-info">
            <div className="contact-item">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ marginRight: '12px' }}>
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M22 6l-10 7L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <a href="mailto:ezekiellabaycarable@gmail.com" className="contact-link">
                ezekiellabaycarable@gmail.com
              </a>
            </div>
            
            <div className="contact-item">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ marginRight: '12px' }}>
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <a href="tel:+639262942918" className="contact-link">
                +63 926-294-2918
              </a>
            </div>
            
            <div className="contact-item">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ marginRight: '12px' }}>
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 13a3 3 0 100-6 3 3 0 000 6z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="contact-text">
                Available for Remote Work <br />based in Batangas, Philippines
              </span>
            </div>
          </div>
          
          <div className="hero-buttons">
            <button className="btn-primary hero-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ marginRight: '10px' }}>
                <path d="M12 16L12 8M12 8L15 11M12 8L9 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M4 16V17C4 18.6569 5.34315 20 7 20H17C18.6569 20 20 18.6569 20 17V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M7 10H6C4.34315 10 3 11.3431 3 13V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M17 10H18C19.6569 10 21 11.3431 21 13V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Download Resume
            </button>
          </div>
        </div>
        
        {!isMobile && (
          <div className="hero-avatar">
            <div className="avatar-container">
              <img 
                src={Profile}
                alt="Ezekiel Labay"
                className="avatar-image"
              />
              <div className="avatar-decoration"></div>
              
              <div className="avatar-badge">
                <div className="availability-dot"></div>
                <span className="availability-text">Available for hire</span>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Only show scroll indicator on desktop */}
      {!isMobile && (
        <div className="scroll-indicator">
          <span>Scroll to see my work</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      )}
    </section>
  );
};

export default HeroSection;
