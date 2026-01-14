import React, { useState, useEffect, useRef } from 'react';
import '../styles/portfolio.css';

const DesignPortfolio = () => {
  const [designs, setDesigns] = useState([
    {
      id: 1,
      title: "Music Festival Poster",
      category: "Poster Design",
      description: "Vibrant poster design for a summer music festival featuring bold typography and energetic color palette. Created for Sunset Sounds Festival to capture the energy of live music events.",
      image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800",
      thumbnail: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400",
      color: "#FF6B6B",
      year: "2023",
      client: "Sunset Sounds Festival",
      deliverables: ["Main Poster", "Social Media Assets", "Merchandise Design"],
      sampleImages: [
        "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=400",
        "https://images.unsplash.com/photo-1542744095-291d1f67b221?w=400",
      ]
    },
    {
      id: 2,
      title: "Coffee Brand Identity",
      category: "Branding",
      description: "Complete brand identity for artisanal coffee shop including logo, packaging, and store signage. Focused on creating a warm, inviting atmosphere through design.",
      image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800",
      thumbnail: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400",
      color: "#8B4513",
      year: "2024",
      client: "Brew & Co.",
      deliverables: ["Logo Design", "Packaging System", "Menu Design"],
      sampleImages: [
        "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400",
        "https://images.unsplash.com/photo-1556228578-9c360e5d0c80?w=400",
      ]
    },
    {
      id: 3,
      title: "Tech Conference Series",
      category: "Event Graphics",
      description: "Series of promotional materials for a tech conference including digital banners and print collateral. Modern design approach with tech-inspired visual elements.",
      image: "https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?w=800",
      thumbnail: "https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?w=400",
      color: "#4ECDC4",
      year: "2023",
      client: "TechForward Summit",
      deliverables: ["Conference Banner", "Speaker Cards", "Digital Invites"],
      sampleImages: [
        "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400",
        "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400",
      ]
    }
  ]);

  const [activeIndex, setActiveIndex] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const portfolioRef = useRef(null);
  const thumbnailRef = useRef(null);

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
      if (!portfolioRef.current) return;
      
      const portfolioRect = portfolioRef.current.getBoundingClientRect();
      const logoDesignsSection = document.getElementById('logo-designs');
      
      const isPortfolioInView = portfolioRect.top <= 100 && portfolioRect.bottom >= 100;
      
      if (logoDesignsSection) {
        const logoDesignsRect = logoDesignsSection.getBoundingClientRect();
        const shouldBeSticky = isPortfolioInView && logoDesignsRect.top > window.innerHeight;
        setIsSticky(shouldBeSticky);
      } else {
        setIsSticky(isPortfolioInView);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSelect = (index) => {
    if (isAnimating || index === activeIndex) return;
    
    setIsAnimating(true);
    setActiveIndex(index);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 400);
  };

  const handleNext = () => {
    if (isAnimating) return;
    const nextIndex = (activeIndex + 1) % designs.length;
    handleSelect(nextIndex);
  };

  const handlePrevious = () => {
    if (isAnimating) return;
    const prevIndex = (activeIndex - 1 + designs.length) % designs.length;
    handleSelect(prevIndex);
  };

  return (
    <section className="portfolio-section" id="portfolio" ref={portfolioRef}>
      <div className="section-header">
        <h2 className="section-title" style={isMobile ? { fontSize: '2.5rem' } : {}}>
          Posters
        </h2>
        <p className="section-subtitle" style={isMobile ? { fontSize: '0.9rem' } : {}}>
          Featured Designs
        </p>
      </div>
      
      <div className="portfolio-container">
        <div 
          className={`three-products-container ${isSticky ? 'sticky-active' : ''}`} 
          ref={thumbnailRef}
        >
          <div className="products-thumbnails">
            {designs.map((design, index) => (
              <div
                key={design.id}
                className={`product-thumbnail ${index === activeIndex ? 'active' : ''} ${isAnimating ? 'animating' : ''}`}
                onClick={() => handleSelect(index)}
                style={{ '--thumb-color': design.color }}
              >
                <div className="thumbnail-frame">
                  <div className="thumbnail-image-container">
                    <img 
                      src={design.thumbnail} 
                      alt={design.title}
                      className="thumbnail-image"
                    />
                    <div className="thumbnail-overlay" />
                    {index === activeIndex && (
                      <div className="thumbnail-active-indicator" style={{ backgroundColor: design.color }}>
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
        
        <div className="design-showcase">
          <div className={`showcase-content ${isAnimating ? 'fade-animation' : ''}`}>
            <div className="design-details">
              <div className="details-header">
                <div className="project-meta">
                  <div className="meta-left">
                    <span className="design-category" style={{ color: designs[activeIndex].color }}>
                      {designs[activeIndex].category}
                    </span>
                    <span className="design-year">{designs[activeIndex].year}</span>
                  </div>
                  <div className="client-info">
                    <span className="client-label">Client:</span>
                    <span className="client-name">{designs[activeIndex].client}</span>
                  </div>
                </div>
                
                <h2 className="design-title" style={isMobile ? { fontSize: '2rem' } : {}}>
                  {designs[activeIndex].title}
                </h2>
                <p className="design-description" style={isMobile ? { fontSize: '0.95rem' } : {}}>
                  {designs[activeIndex].description}
                </p>
              </div>
              
              <div 
                style={isMobile ? {
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '15px',
                  marginTop: '20px',
                  width: '100%'
                } : {}}
              >
                <div 
                  className="deliverables-section"
                  style={isMobile ? {
                    width: '100%',
                    margin: '0'
                  } : {}}
                >
                  <h3 
                    className="section-title"
                    style={isMobile ? { fontSize: '1.1rem' } : {}}
                  >
                    Project Deliverables
                  </h3>
                  <div 
                    className="deliverables-grid"
                    style={isMobile ? {
                      display: 'grid',
                      gridTemplateColumns: '1fr',
                      gap: '8px'
                    } : {}}
                  >
                    {designs[activeIndex].deliverables.map((item, index) => (
                      <div 
                        key={index} 
                        className="deliverable-item"
                        style={{ 
                          borderLeftColor: designs[activeIndex].color,
                          backgroundColor: `${designs[activeIndex].color}10`,
                          ...(isMobile ? {
                            padding: '10px 12px',
                            fontSize: '0.8rem',
                            marginBottom: '5px'
                          } : {})
                        }}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ marginRight: '10px', color: designs[activeIndex].color }}>
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" fill="currentColor"/>
                        </svg>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div 
                  className="design-process"
                  style={isMobile ? {
                    width: '100%',
                    margin: '0'
                  } : {}}
                >
                  <h3 
                    className="section-title"
                    style={isMobile ? { fontSize: '1.1rem' } : {}}
                  >
                    Design Approach
                  </h3>
                  <div 
                    className="process-steps"
                    style={isMobile ? {
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px'
                    } : {}}
                  >
                    <div 
                      className="process-step"
                      style={isMobile ? {
                        padding: '10px',
                        gap: '10px',
                        marginBottom: '5px'
                      } : {}}
                    >
                      <div 
                        className="step-number" 
                        style={{ 
                          backgroundColor: designs[activeIndex].color,
                          ...(isMobile ? {
                            width: '28px',
                            height: '28px',
                            fontSize: '0.8rem'
                          } : {})
                        }}
                      >
                        1
                      </div>
                      <div className="step-content">
                        <h4 style={isMobile ? { fontSize: '0.9rem', margin: '0' } : {}}>
                          Concept Development
                        </h4>
                        {!isMobile && <p>Research, mood boards, and initial concept sketches</p>}
                      </div>
                    </div>
                    <div 
                      className="process-step"
                      style={isMobile ? {
                        padding: '10px',
                        gap: '10px',
                        marginBottom: '5px'
                      } : {}}
                    >
                      <div 
                        className="step-number" 
                        style={{ 
                          backgroundColor: designs[activeIndex].color,
                          ...(isMobile ? {
                            width: '28px',
                            height: '28px',
                            fontSize: '0.8rem'
                          } : {})
                        }}
                      >
                        2
                      </div>
                      <div className="step-content">
                        <h4 style={isMobile ? { fontSize: '0.9rem', margin: '0' } : {}}>
                          Design Execution
                        </h4>
                        {!isMobile && <p>Digital design, typography, and color scheme refinement</p>}
                      </div>
                    </div>
                    <div 
                      className="process-step"
                      style={isMobile ? {
                        padding: '10px',
                        gap: '10px',
                        marginBottom: '5px'
                      } : {}}
                    >
                      <div 
                        className="step-number" 
                        style={{ 
                          backgroundColor: designs[activeIndex].color,
                          ...(isMobile ? {
                            width: '28px',
                            height: '28px',
                            fontSize: '0.8rem'
                          } : {})
                        }}
                      >
                        3
                      </div>
                      <div className="step-content">
                        <h4 style={isMobile ? { fontSize: '0.9rem', margin: '0' } : {}}>
                          Final Delivery
                        </h4>
                        {!isMobile && <p>Asset preparation, client review, and final adjustments</p>}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="design-preview">
              <div className="preview-main-container">
                <div className="main-preview-section">
                  <div className="preview-container">
                    <div className="preview-frame">
                      <img 
                        src={designs[activeIndex].image} 
                        alt={designs[activeIndex].title}
                        className="preview-image"
                      />
                      <div className="preview-overlay" style={{ background: `linear-gradient(45deg, ${designs[activeIndex].color}15, transparent)` }} />
                    </div>
                    
                    <div className="preview-meta">
                      <div className="meta-columns">
                        <div className="color-palette">
                          <h4 style={isMobile ? { fontSize: '0.9rem' } : {}}>Color Palette</h4>
                          <div className="colors">
                            <div className="color-sample" style={{ backgroundColor: designs[activeIndex].color }} />
                            <div className="color-sample" style={{ backgroundColor: `${designs[activeIndex].color}80` }} />
                            <div className="color-sample" style={{ backgroundColor: `${designs[activeIndex].color}40` }} />
                            <div className="color-sample" style={{ backgroundColor: '#FFFFFF' }} />
                            <div className="color-sample" style={{ backgroundColor: '#000000' }} />
                          </div>
                        </div>
                        
                        <div className="software-used">
                          <h4 style={isMobile ? { fontSize: '0.9rem' } : {}}>Software Used</h4>
                          <div className="software-icons">
                            <span 
                              className="software-icon" 
                              style={isMobile ? { fontSize: '0.8rem', padding: '6px 12px' } : {}}
                            >
                              Illustrator
                            </span>
                            <span 
                              className="software-icon" 
                              style={isMobile ? { fontSize: '0.8rem', padding: '6px 12px' } : {}}
                            >
                              Photoshop
                            </span>
                            <span 
                              className="software-icon" 
                              style={isMobile ? { fontSize: '0.8rem', padding: '6px 12px' } : {}}
                            >
                              InDesign
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="sample-images-sidebar">
                  <div className="sample-images-vertical">
                    {designs[activeIndex].sampleImages.map((sample, index) => (
                      <div key={index} className="sample-image-item">
                        <img 
                          src={sample} 
                          alt={`Sample ${index + 1}`}
                          className="sample-image"
                        />
                        <div className="sample-overlay" style={{ backgroundColor: `${designs[activeIndex].color}15` }}>
                          <span className="sample-label">Sample {index + 1}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* UPDATED: Navigation buttons - side by side on mobile */}
              <div 
                className="preview-navigation"
                style={isMobile ? {
                  display: 'flex',
                  flexDirection: 'row',
                  gap: '10px',
                  justifyContent: 'center',
                  marginTop: '20px'
                } : {}}
              >
                <button 
                  className="preview-nav prev"
                  onClick={handlePrevious}
                  disabled={isAnimating}
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
                  className="preview-nav next"
                  onClick={handleNext}
                  disabled={isAnimating}
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
        </div>
      </div>
    </section>
  );
};

export default DesignPortfolio;