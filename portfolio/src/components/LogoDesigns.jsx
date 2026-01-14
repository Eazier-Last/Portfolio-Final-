import React, { useState, useEffect, useRef } from 'react';
import '../styles/logodesigns.css';

const LogoDesigns = () => {
  const [logos, setLogos] = useState([
    {
      id: 1,
      title: "Zenith Tech Solutions",
      category: "Technology Logo",
      description: "Modern tech company logo combining geometric precision with organic curves. Represents innovation, stability, and forward-thinking approach in the tech industry.",
      image: "https://images.unsplash.com/photo-1634942537034-2531766767d1?w=800",
      thumbnail: "https://images.unsplash.com/photo-1634942537034-2531766767d1?w=400",
      color: "#4361EE",
      year: "2024",
      mockups: [
        "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400",
        "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400",
        "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400"
      ],
      typography: {
        primary: "Inter",
        secondary: "Montserrat",
        weights: ["Light", "Regular", "Medium", "SemiBold", "Bold"]
      },
      colorPalette: [
        { name: "Primary Blue", value: "#4361EE" },
        { name: "Dark Blue", value: "#2A3EB1" },
        { name: "Light Blue", value: "#7B8EFF" },
        { name: "Neutral Gray", value: "#4A5568" },
        { name: "White", value: "#FFFFFF" }
      ]
    },
    {
      id: 2,
      title: "Bloom Natural Cosmetics",
      category: "Beauty & Wellness",
      description: "Elegant logo for an organic cosmetics brand featuring floral elements and soft typography. Designed to convey purity, natural beauty, and sustainability.",
      image: "https://images.unsplash.com/photo-1545235617-9465d2a55698?w=800",
      thumbnail: "https://images.unsplash.com/photo-1545235617-9465d2a55698?w=400",
      color: "#F72585",
      year: "2023",
      mockups: [
        "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400",
        "https://images.unsplash.com/photo-1556228578-9c360e5d0c80?w=400",
        "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400"
      ],
      typography: {
        primary: "Playfair Display",
        secondary: "Lato",
        weights: ["Regular", "Medium", "SemiBold", "Bold"]
      },
      colorPalette: [
        { name: "Blossom Pink", value: "#F72585" },
        { name: "Leaf Green", value: "#4CC9F0" },
        { name: "Earth Brown", value: "#7209B7" },
        { name: "Cream", value: "#F8F9FA" },
        { name: "Charcoal", value: "#212529" }
      ]
    },
    {
      id: 3,
      title: "Urban Brew Coffee Co.",
      category: "Food & Beverage",
      description: "Rustic yet modern logo for a specialty coffee roaster. Combines coffee bean motifs with urban typography to appeal to both traditional and contemporary coffee lovers.",
      image: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=800",
      thumbnail: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=400",
      color: "#7209B7",
      year: "2024",
      mockups: [
        "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400",
        "https://images.unsplash.com/photo-1511537190424-bbbab87ac5eb?w=400",
        "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400"
      ],
      typography: {
        primary: "Space Grotesk",
        secondary: "Open Sans",
        weights: ["Regular", "Medium", "SemiBold", "Bold", "Black"]
      },
      colorPalette: [
        { name: "Royal Purple", value: "#7209B7" },
        { name: "Coffee Brown", value: "#8B4513" },
        { name: "Cream", value: "#F5E6CA" },
        { name: "Dark Roast", value: "#2D1B00" },
        { name: "Accent Gold", value: "#FFD700" }
      ]
    },
    {
      id: 4,
      title: "Apex Fitness Studio",
      category: "Fitness & Sports",
      description: "Dynamic logo for a premium fitness studio featuring abstract human forms in motion. Represents energy, strength, and peak physical performance.",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800",
      thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400",
      color: "#FF9E00",
      year: "2023",
      mockups: [
        "https://images.unsplash.com/photo-1534367507877-0edd93bd013b?w=400",
        "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=400",
        "https://images.unsplash.com/photo-1599058917765-a780eda07a3e?w=400"
      ],
      typography: {
        primary: "Bebas Neue",
        secondary: "Roboto",
        weights: ["Regular", "Bold"]
      },
      colorPalette: [
        { name: "Energy Orange", value: "#FF9E00" },
        { name: "Power Red", value: "#FF2E00" },
        { name: "Cool Gray", value: "#4A5568" },
        { name: "White", value: "#FFFFFF" },
        { name: "Black", value: "#000000" }
      ]
    }
  ]);

  const [activeLogoIndex, setActiveLogoIndex] = useState(0);
  const [isLogoAnimating, setIsLogoAnimating] = useState(false);
  const [isLogoSticky, setIsLogoSticky] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const logoDesignsRef = useRef(null);
  const logoThumbnailRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!logoDesignsRef.current) return;
      
      const logoDesignsRect = logoDesignsRef.current.getBoundingClientRect();
      const skillsSection = document.getElementById('skills');
      
      const isLogoDesignsInView = logoDesignsRect.top <= 100 && logoDesignsRect.bottom >= 100;
      
      if (skillsSection) {
        const skillsRect = skillsSection.getBoundingClientRect();
        const shouldBeSticky = isLogoDesignsInView && skillsRect.top > window.innerHeight;
        setIsLogoSticky(shouldBeSticky);
      } else {
        setIsLogoSticky(isLogoDesignsInView);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogoSelect = (index) => {
    if (isLogoAnimating || index === activeLogoIndex) return;
    
    setIsLogoAnimating(true);
    setActiveLogoIndex(index);
    
    setTimeout(() => {
      setIsLogoAnimating(false);
    }, 400);
  };

  const handleLogoNext = () => {
    if (isLogoAnimating) return;
    const nextIndex = (activeLogoIndex + 1) % logos.length;
    handleLogoSelect(nextIndex);
  };

  const handleLogoPrevious = () => {
    if (isLogoAnimating) return;
    const prevIndex = (activeLogoIndex - 1 + logos.length) % logos.length;
    handleLogoSelect(prevIndex);
  };

  const activeLogo = logos[activeLogoIndex];

  return (
    <section className="logo-designs-section" id="logo-designs" ref={logoDesignsRef}>
      <div className="section-header">
        <h2 className="section-title" style={isMobile ? { fontSize: '2.5rem' } : {}}>
          Logo Designs
        </h2>
        <p className="section-subtitle" style={isMobile ? { fontSize: '0.9rem' } : {}}>
          Brand Identity & Logo Portfolio
        </p>
      </div>
      
      <div className="logo-designs-container">
        <div 
          className={`logo-thumbnails-container ${isLogoSticky ? 'sticky-active' : ''}`} 
          ref={logoThumbnailRef}
        >
          <div className="logo-thumbnails">
            {logos.map((logo, index) => (
              <div
                key={logo.id}
                className={`logo-thumbnail ${index === activeLogoIndex ? 'active' : ''} ${isLogoAnimating ? 'animating' : ''}`}
                onClick={() => handleLogoSelect(index)}
                style={{ '--thumb-color': logo.color }}
              >
                <div className="logo-thumbnail-frame">
                  <div className="logo-thumbnail-image-container">
                    <img 
                      src={logo.thumbnail} 
                      alt={logo.title}
                      className="logo-thumbnail-image"
                    />
                    <div className="logo-thumbnail-overlay" />
                    {index === activeLogoIndex && (
                      <div className="logo-thumbnail-active-indicator" style={{ backgroundColor: logo.color }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="logo-showcase">
          <div className={`logo-showcase-content ${isLogoAnimating ? 'fade-animation' : ''}`}>
            <div className="logo-main-section">
              <div className="logo-preview-main">
                <div className="main-logo-container" style={isMobile ? { position: 'relative', paddingBottom: '100px' } : {}}>
                  <img 
                    src={activeLogo.image} 
                    alt={activeLogo.title}
                    className="main-logo-image"
                    style={isMobile ? { marginBottom: '20px' } : {}}
                  />
                  <div className="logo-preview-overlay" style={{ background: `linear-gradient(45deg, ${activeLogo.color}15, transparent)` }} />
                  
                  {/* Color Palette INSIDE main logo container for mobile */}
                  {isMobile && (
                    <div 
                      className="mobile-color-palette"
                      style={{
                        position: 'absolute',
                        bottom: '20px',
                        left: '20px',
                        right: '20px',
                        padding: '15px',
                        background: 'rgba(255, 255, 255, 0.02)',
                        borderRadius: '12px',
                        border: '1px solid rgba(255, 255, 255, 0.05)'
                      }}
                    >
                      <h4 style={{ 
                        fontSize: '0.9rem', 
                        fontWeight: '600', 
                        color: '#fff', 
                        margin: '0 0 12px 0',
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 9 6.5 9 8 9.67 8 10.5 7.33 12 6.5 12zm3-4C8.67 8 8 7.33 8 6.5S8.67 5 9.5 5s1.5.67 1.5 1.5S10.33 8 9.5 8zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 5 14.5 5s1.5.67 1.5 1.5S15.33 8 14.5 8zm3 4c-.83 0-1.5-.67-1.5-1.5S16.67 9 17.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" fill={activeLogo.color}/>
                        </svg>
                        Color Palette
                      </h4>
                      <div 
                        style={{
                          display: 'flex',
                          overflowX: 'auto',
                          gap: '8px',
                          paddingBottom: '5px',
                          WebkitOverflowScrolling: 'touch'
                        }}
                      >
                        {activeLogo.colorPalette.map((color, index) => (
                          <div 
                            key={index}
                            style={{
                              flex: '0 0 auto',
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              gap: '4px',
                              minWidth: '60px'
                            }}
                          >
                            <div 
                              style={{ 
                                backgroundColor: color.value,
                                width: '40px',
                                height: '40px',
                                borderRadius: '8px',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'flex-end',
                                justifyContent: 'center',
                                position: 'relative',
                                overflow: 'hidden'
                              }}
                              onClick={() => navigator.clipboard.writeText(color.value)}
                            >
                              <span style={{
                                fontSize: '0.6rem',
                                fontWeight: '600',
                                color: 'white',
                                background: 'rgba(0, 0, 0, 0.7)',
                                padding: '2px 4px',
                                borderRadius: '3px',
                                opacity: '0',
                                transition: 'opacity 0.3s ease'
                              }}>
                                {color.value}
                              </span>
                            </div>
                            <span style={{
                              fontSize: '0.65rem',
                              color: '#888',
                              textAlign: 'center',
                              lineHeight: '1.2',
                              width: '100%',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap'
                            }}>
                              {color.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="mockups-section">
                  <h3 className="section-title" style={isMobile ? { fontSize: '1.1rem' } : {}}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ marginRight: '10px' }}>
                      <path d="M21 16V4c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zm-2 0H5V4h14v12zm-7-1c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z" fill={activeLogo.color}/>
                    </svg>
                    Logo Mockups
                  </h3>
                  <div className="mockups-grid">
                    {activeLogo.mockups.map((mockup, index) => (
                      <div key={index} className="mockup-item">
                        <img src={mockup} alt={`Mockup ${index + 1}`} className="mockup-image" />
                        <div className="mockup-overlay" style={{ backgroundColor: `${activeLogo.color}20` }}></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="logo-details-section">
              <div className="logo-project-info">
                <div className="logo-project-header">
                  <div className="logo-meta">
                    <span className="logo-category" style={{ color: activeLogo.color }}>
                      {activeLogo.category}
                    </span>
                    <span className="logo-year">{activeLogo.year}</span>
                  </div>
                  <h2 className="logo-title" style={isMobile ? { fontSize: '2rem' } : {}}>{activeLogo.title}</h2>
                  <p className="logo-description" style={isMobile ? { fontSize: '0.95rem' } : {}}>{activeLogo.description}</p>
                </div>
              </div>
              
              <div className="typography-section">
                <h3 className="section-title" style={isMobile ? { fontSize: '1.1rem' } : {}}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ marginRight: '10px' }}>
                    <path d="M9 4v3h5v12h3V7h5V4H9zm-6 8h3v7h3v-7h3V9H3v3z" fill={activeLogo.color}/>
                  </svg>
                  Typography
                </h3>
                <div className="typography-details">
                  <div className="font-family primary-font">
                    <h4 className="font-name" style={isMobile ? { fontSize: '1.2rem' } : {}}>{activeLogo.typography.primary}</h4>
                    <span className="font-role">Primary Font</span>
                    <div className="font-weights">
                      {activeLogo.typography.weights.map((weight, idx) => (
                        <span key={idx} className="font-weight" style={{ backgroundColor: `${activeLogo.color}20` }}>
                          {weight}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="font-family secondary-font">
                    <h4 className="font-name" style={isMobile ? { fontSize: '1.2rem' } : {}}>{activeLogo.typography.secondary}</h4>
                    <span className="font-role">Secondary Font</span>
                    <p className="font-usage">Used for body text and supporting content</p>
                  </div>
                </div>
              </div>
              
              {/* Color Palette Section - Only show on desktop */}
              {!isMobile && (
                <div className="color-palette-section">
                  <h3 className="section-title">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ marginRight: '10px' }}>
                      <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 9 6.5 9 8 9.67 8 10.5 7.33 12 6.5 12zm3-4C8.67 8 8 7.33 8 6.5S8.67 5 9.5 5s1.5.67 1.5 1.5S10.33 8 9.5 8zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 5 14.5 5s1.5.67 1.5 1.5S15.33 8 14.5 8zm3 4c-.83 0-1.5-.67-1.5-1.5S16.67 9 17.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" fill={activeLogo.color}/>
                    </svg>
                    Color Palette
                  </h3>
                  <div className="color-palette-grid">
                    {activeLogo.colorPalette.map((color, index) => (
                      <div key={index} className="color-palette-item">
                        <div 
                          className="color-swatch" 
                          style={{ backgroundColor: color.value }}
                          onClick={() => navigator.clipboard.writeText(color.value)}
                        >
                          <span className="color-hex">{color.value}</span>
                        </div>
                        <span className="color-name">{color.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div 
            className="logo-preview-navigation"
            style={isMobile ? {
              display: 'flex',
              flexDirection: 'row',
              gap: '10px',
              justifyContent: 'center',
              marginTop: '30px',
              paddingTop: '20px'
            } : {}}
          >
            <button 
              className="logo-preview-nav prev"
              onClick={handleLogoPrevious}
              disabled={isLogoAnimating}
              style={isMobile ? { 
                fontSize: '0.85rem', 
                padding: '12px 15px',
                flex: '1',
                marginLeft: '0',
                justifyContent: 'center'
              } : {}}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ marginRight: '8px' }}>
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Previous
            </button>
            <button 
              className="logo-preview-nav next"
              onClick={handleLogoNext}
              disabled={isLogoAnimating}
              style={isMobile ? { 
                fontSize: '0.85rem', 
                padding: '12px 15px',
                flex: '1',
                marginLeft: '0',
                justifyContent: 'center'
              } : {}}
            >
              Next
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ marginLeft: '8px' }}>
                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LogoDesigns;