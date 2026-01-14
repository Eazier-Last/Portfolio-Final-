import React, { useState, useEffect, useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import '../styles/3Dmodels.css';

// Loading fallback component
const Loader = ({ color }) => (
  <div className="model-loading">
    <div className="loading-spinner" style={{ borderColor: color }}>
      <div className="spinner-inner" style={{ backgroundColor: color }} />
    </div>
  </div>
);

// 3D Model Component
const Model = ({ modelPath, isHovered, rotationSpeed }) => {
  const { scene: originalScene } = useGLTF(modelPath);
  const modelRef = useRef();
  const [clonedScene, setClonedScene] = useState(null);

  // Clone the scene once it loads
  useEffect(() => {
    if (originalScene && !clonedScene) {
      const cloned = originalScene.clone();
      setClonedScene(cloned);
    }
  }, [originalScene, clonedScene]);

  // Animation on hover - ONLY the model rotates
  useFrame((state, delta) => {
    if (modelRef.current && isHovered && clonedScene) {
      modelRef.current.rotation.y += rotationSpeed * delta * 60;
    }
  });

  if (!clonedScene) return null;

  return <primitive ref={modelRef} object={clonedScene} scale={1} position={[0, 0, 0]} />;
};

// Simple Two-Point Lighting
const SimpleLighting = ({ bgColor }) => {
  return (
    <>
      {/* Front light - illuminates the front */}
      <directionalLight 
        position={[0, 0, 5]} 
        intensity={3.2}
        color="#ffffff"
      />
      
      {/* Back light - illuminates the back with color */}
      <directionalLight 
        position={[0, 0, -5]} 
        intensity={3.2}
        color="#ffffff"
      />

      <directionalLight 
        position={[-5, 0, 0]} 
        intensity={3.2}
        color="#ffffff"
      />

      <directionalLight 
        position={[5, 0, 0]} 
        intensity={3.2}
        color="#ffffff"
      />

      <directionalLight 
        position={[0, 5, 0]} 
        intensity={3.2}
        color="#ffffff"
      />
      
      <directionalLight 
        position={[0, -5, 0]} 
        intensity={3.2}
        color="#ffffff"
      />
      
      {/* Soft ambient light */}
      <ambientLight intensity={0.3} color="#ffffff" />
    </>
  );
};

// Individual Card Component
const ModelCard = ({ model, isHovered, onMouseEnter, onMouseLeave }) => {
  const [userInteracting, setUserInteracting] = useState(false);
  const [wasHovered, setWasHovered] = useState(false);
  const controlsRef = useRef();

  // Track when hover state changes
  useEffect(() => {
    const isCurrentlyHovered = isHovered === model.id;
    
    // If we lose hover while interacting, reset the interaction state immediately
    if (!isCurrentlyHovered && userInteracting) {
      setUserInteracting(false);
    }
    
    // If we were hovered and now we're not, reset the view
    if (wasHovered && !isCurrentlyHovered && !userInteracting) {
      if (controlsRef.current) {
        // Reset the controls to default position
        controlsRef.current.reset();
        controlsRef.current.target.set(0, 0, 0);
        controlsRef.current.update();
      }
    }
    
    // Update wasHovered state
    setWasHovered(isCurrentlyHovered);
  }, [isHovered, model.id, userInteracting, wasHovered]);

  // Reset user interaction state after 2 seconds of inactivity (only while still hovered)
  useEffect(() => {
    let timeoutId;
    
    if (userInteracting && isHovered === model.id) {
      timeoutId = setTimeout(() => {
        setUserInteracting(false);
      }, 2000);
    }
    
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [userInteracting, isHovered, model.id]);

  const handleControlStart = () => {
    setUserInteracting(true);
  };

  const handleControlEnd = () => {
    // Don't immediately reset - let the timeout handle it
  };

  return (
    <div
      className="model-card"
      onMouseEnter={() => onMouseEnter(model.id)}
      onMouseLeave={onMouseLeave}
      style={{ 
        '--model-bg-color': model.bgColor,
        '--model-preview-color': model.previewColor
      }}
    >
      <div className="model-card-inner">
        <div className="model-preview">
          <Canvas
            camera={{ position: [0, 0, model.defaultDistance || 5], fov: 50 }}
            style={{ 
              background: `linear-gradient(135deg, ${model.bgColor}20 0%, ${model.bgColor}05 100%)`,
              width: '100%',
              height: '100%'
            }}
            gl={{ alpha: true, antialias: true }}
          >
            <Suspense fallback={null}>
              {/* Simple two-point lighting */}
              <SimpleLighting bgColor={model.bgColor} />
              
              {/* The model that rotates on hover */}
              <Model 
                modelPath={model.modelPath}
                isHovered={isHovered === model.id && !userInteracting}
                rotationSpeed={model.rotationSpeed}
              />
              
              {/* OrbitControls */}
              <OrbitControls
                ref={controlsRef}
                enableZoom={true}
                enablePan={false}
                enableRotate={true}
                autoRotate={true}
                autoRotateSpeed={2}
                maxPolarAngle={Math.PI / 1.5}
                minPolarAngle={Math.PI / 3}
                minDistance={model.minDistance || 8}
                maxDistance={model.maxDistance || 15}
                enableDamping={true}
                dampingFactor={0.05}
              />
            </Suspense>
          </Canvas>
        </div>
        
        <div className="model-card-content">
          <h3 className="model-title">{model.title}</h3>
          <p className="model-description">{model.description}</p>
          
          <div className="model-meta">
            <div className="software-tags">
              {model.software.map((software, index) => (
                <span 
                  key={index} 
                  className="software-tag"
                  style={{ 
                    backgroundColor: `${model.bgColor}15`,
                    color: model.bgColor,
                    borderColor: `${model.bgColor}30`
                  }}
                >
                  {software}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Modal Component
const MobileModelModal = ({ model, onClose, onNext, onPrev, currentIndex, total }) => {
  useEffect(() => {
    // Prevent body scroll when modal is open
    document.body.classList.add('modal-open');
    
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, []);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="mobile-model-modal" onClick={handleOverlayClick}>
      <div className="mobile-model-modal-content">
        <div className="mobile-model-modal-image-container">
          <img 
            src={model.image} 
            alt={model.title}
            className="mobile-model-modal-image"
          />
          
          <button 
            className="mobile-model-modal-close"
            onClick={onClose}
            aria-label="Close modal"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          
          <div className="mobile-model-modal-zoom-note">
            Pinch to zoom or tap to close
          </div>
        </div>
        
        <div className="mobile-model-modal-info">
          <div>
            <h3 className="mobile-model-modal-title">{model.title}</h3>
            <p className="mobile-model-modal-category">{model.category}</p>
            <p className="mobile-model-modal-description">
              View this model on desktop for the full interactive 3D experience with rotation and zoom controls.
            </p>
          </div>
          
          <div className="mobile-model-modal-navigation">
            <button 
              className="mobile-model-modal-nav"
              onClick={onPrev}
              disabled={currentIndex === 0}
              aria-label="Previous model"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            
            <div className="mobile-model-modal-counter">
              {currentIndex + 1} / {total}
            </div>
            
            <button 
              className="mobile-model-modal-nav"
              onClick={onNext}
              disabled={currentIndex === total - 1}
              aria-label="Next model"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Mobile Alternative Component - UPDATED FOR 2x4 IMAGE GRID WITH MODAL
const Mobile3DModels = () => {
  const [mobileModels] = useState([
    {
      id: 1,
      title: "Geometric Sculpture",
      category: "3D Model",
      description: "Modern geometric sculpture with clean lines and dynamic form. Created using Blender with 25k polygons.",
      image: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=800&auto=format&fit=crop",
      thumbnail: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=400&auto=format&fit=crop",
      bgColor: "#6366F1",
      software: ["Blender"]
    },
    {
      id: 2,
      title: "Organic Creature",
      category: "Character Design",
      description: "Fantasy creature with organic forms and detailed textures. Character modeling with 50k polygons.",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop",
      thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&auto=format&fit=crop",
      bgColor: "#10B981",
      software: ["Blender"]
    },
    {
      id: 3,
      title: "Future Vehicle",
      category: "Concept Design",
      description: "Concept vehicle for 2050 with aerodynamic curves and futuristic details.",
      image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&auto=format&fit=crop",
      thumbnail: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=400&auto=format&fit=crop",
      bgColor: "#F59E0B",
      software: ["Blender"]
    },
    {
      id: 4,
      title: "Abstract Composition",
      category: "Art Installation",
      description: "Non-representational composition exploring light, shadow, and geometric forms.",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&auto=format&fit=crop",
      thumbnail: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&auto=format&fit=crop",
      bgColor: "#8B5CF6",
      software: ["Blender"]
    },
    {
      id: 5,
      title: "Modular Architecture",
      category: "Architecture",
      description: "Modular building system for sustainable urban environments with reusable components.",
      image: "https://images.unsplash.com/photo-1503174971373-b1f69850bded?w=800&auto=format&fit=crop",
      thumbnail: "https://images.unsplash.com/photo-1503174971373-b1f69850bded?w=400&auto=format&fit=crop",
      bgColor: "#EF4444",
      software: ["Blender"]
    },
    {
      id: 6,
      title: "Mechanical Assembly",
      category: "Industrial Design",
      description: "Complex mechanical assembly with moving parts and intricate detailing.",
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&auto=format&fit=crop",
      thumbnail: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&auto=format&fit=crop",
      bgColor: "#06B6D4",
      software: ["Blender"]
    },
    {
      id: 7,
      title: "Alien Flora",
      category: "Environmental Design",
      description: "Alien plant life designed for a sci-fi environment with exotic shapes and colors.",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&auto=format&fit=crop",
      thumbnail: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&auto=format&fit=crop",
      bgColor: "#84CC16",
      software: ["Blender"]
    },
    {
      id: 8,
      title: "Jewelry Collection",
      category: "Jewelry Design",
      description: "High-end jewelry collection with intricate patterns, gemstones, and metallic finishes.",
      image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&auto=format&fit=crop",
      thumbnail: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&auto=format&fit=crop",
      bgColor: "#EC4899",
      software: ["Blender"]
    }
  ]);

  const [selectedModel, setSelectedModel] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleImageClick = (index) => {
    setSelectedIndex(index);
    setSelectedModel(mobileModels[index]);
  };

  const handleCloseModal = () => {
    setSelectedModel(null);
  };

  const handleNextModel = () => {
    if (selectedIndex < mobileModels.length - 1) {
      const nextIndex = selectedIndex + 1;
      setSelectedIndex(nextIndex);
      setSelectedModel(mobileModels[nextIndex]);
    }
  };

  const handlePrevModel = () => {
    if (selectedIndex > 0) {
      const prevIndex = selectedIndex - 1;
      setSelectedIndex(prevIndex);
      setSelectedModel(mobileModels[prevIndex]);
    }
  };

  // Handle keyboard navigation when modal is open
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedModel) return;
      
      if (e.key === 'Escape') {
        handleCloseModal();
      } else if (e.key === 'ArrowRight') {
        handleNextModel();
      } else if (e.key === 'ArrowLeft') {
        handlePrevModel();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedModel, selectedIndex]);

  return (
    <div className="mobile-models-container">
      <div className="mobile-models-header">
        <h2 className="mobile-models-title">3D Models</h2>
        <p className="mobile-models-subtitle">Tap images to preview • View on desktop for interactive 3D</p>
      </div>
      
      <div className="mobile-models-grid">
        {mobileModels.map((model, index) => (
          <div 
            key={model.id}
            className="mobile-model-image-item"
            onClick={() => handleImageClick(index)}
            role="button"
            tabIndex={0}
            aria-label={`View ${model.title}`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleImageClick(index);
                e.preventDefault();
              }
            }}
          >
            <img 
              src={model.thumbnail} 
              alt={model.title}
              className="mobile-model-image"
              loading="lazy"
            />
            <div className="mobile-model-overlay">
              <h3 className="mobile-model-title">{model.title}</h3>
              <span className="mobile-model-category">{model.category}</span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mobile-model-note">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ marginRight: '10px' }}>
          <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" stroke="currentColor" strokeWidth="2"/>
          <path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        <span>Tap any image to view in full screen. For interactive 3D controls, please visit on a desktop computer.</span>
      </div>
      
      {selectedModel && (
        <MobileModelModal
          model={selectedModel}
          onClose={handleCloseModal}
          onNext={handleNextModel}
          onPrev={handlePrevModel}
          currentIndex={selectedIndex}
          total={mobileModels.length}
        />
      )}
    </div>
  );
};

// Original Desktop Models Component
const Desktop3DModels = () => {
  const [models] = useState([
    {
      id: 1,
      title: "Geometric Sculpture",
      category: "Architecture",
      description: "Modern geometric sculpture with clean lines and dynamic form.",
      year: "2024",
      software: ["Blender"],
      polyCount: "25k",
      bgColor: "#6366F1",
      previewColor: "#818CF8",
      rotationSpeed: 0.01,
      defaultDistance: 10,
      minDistance: 3,
      maxDistance: 10,
      modelPath: "/models/model2.glb",
      modelFileName: "geometric_sculpture.glb"
    },
    {
      id: 2,
      title: "Organic Creature",
      category: "Character Design",
      description: "Fantasy creature with organic forms and detailed textures.",
      year: "2024",
      software: ["Blender"],
      polyCount: "50k",
      bgColor: "#10B981",
      previewColor: "#34D399",
      rotationSpeed: 0.01,
      defaultDistance: 7,
      minDistance: 3,
      maxDistance: 15,
      modelPath: "/models/model3.glb",
      modelFileName: "organic_creature.glb"
    },
    {
      id: 3,
      title: "Future Vehicle",
      category: "Product Design",
      description: "Concept vehicle for 2050 with aerodynamic curves.",
      year: "2024",
      software: ["Blender"],
      polyCount: "75k",
      bgColor: "#F59E0B",
      previewColor: "#FBBF24",
      rotationSpeed: 0.01,
      defaultDistance: 8,
      minDistance: 5,
      maxDistance: 20,
      modelPath: "/models/model2.glb",
      modelFileName: "future_vehicle.glb"
    },
    {
      id: 4,
      title: "Abstract Composition",
      category: "Art",
      description: "Non-representational composition exploring light and shadow.",
      year: "2023",
      software: ["Blender"],
      polyCount: "15k",
      bgColor: "#8B5CF6",
      previewColor: "#A78BFA",
      rotationSpeed: 0.01,
      defaultDistance: 5,
      minDistance: 3,
      maxDistance: 10,
      modelPath: "/models/model2.glb",
      modelFileName: "abstract_composition.glb"
    },
    {
      id: 5,
      title: "Modular Architecture",
      category: "Architecture",
      description: "Modular building system for sustainable urban environments.",
      year: "2024",
      software: ["Blender"],
      polyCount: "40k",
      bgColor: "#EF4444",
      previewColor: "#F87171",
      rotationSpeed: 0.01,
      defaultDistance: 9,
      minDistance: 6,
      maxDistance: 25,
      modelPath: "/models/model2.glb",
      modelFileName: "modular_architecture.glb"
    },
    {
      id: 6,
      title: "Mechanical Assembly",
      category: "Industrial Design",
      description: "Complex mechanical assembly with moving parts.",
      year: "2023",
      software: ["Blender"],
      polyCount: "100k",
      bgColor: "#06B6D4",
      previewColor: "#22D3EE",
      rotationSpeed: 0.01,
      defaultDistance: 7,
      minDistance: 4,
      maxDistance: 18,
      modelPath: "/models/model2.glb",
      modelFileName: "mechanical_assembly.glb"
    },
    {
      id: 7,
      title: "Strange Flora",
      category: "Environmental",
      description: "Alien plant life designed for a sci-fi environment.",
      year: "2024",
      software: ["Blender"],
      polyCount: "30k",
      bgColor: "#84CC16",
      previewColor: "#A3E635",
      rotationSpeed: 0.01,
      defaultDistance: 6,
      minDistance: 3,
      maxDistance: 12,
      modelPath: "/models/model2.glb",
      modelFileName: "strange_flora.glb"
    },
    {
      id: 8,
      title: "Jewelry Collection",
      category: "Jewelry Design",
      description: "High-end jewelry with intricate patterns and gems.",
      year: "2023",
      software: ["Blender"],
      polyCount: "10k",
      bgColor: "#EC4899",
      previewColor: "#F472B6",
      rotationSpeed: 0.01,
      defaultDistance: 4,
      minDistance: 2,
      maxDistance: 8,
      modelPath: "/models/model2.glb",
      modelFileName: "jewelry_collection.glb"
    },
    {
      id: 9,
      title: "Ancient Artifact",
      category: "Archaeology",
      description: "Recreation of ancient artifact with weathering effects.",
      year: "2024",
      software: ["Blender"],
      polyCount: "20k",
      bgColor: "#78716C",
      previewColor: "#A8A29E",
      rotationSpeed: 0.01,
      defaultDistance: 5,
      minDistance: 3,
      maxDistance: 10,
      modelPath: "/models/model2.glb",
      modelFileName: "ancient_artifact.glb"
    }
  ]);

  const [hoveredModel, setHoveredModel] = useState(null);

  const handleMouseEnter = (modelId) => {
    setHoveredModel(modelId);
  };

  const handleMouseLeave = () => {
    setHoveredModel(null);
  };

  // Preload all model paths (unique ones only)
  useEffect(() => {
    const uniqueModelPaths = [...new Set(models.map(model => model.modelPath))];
    uniqueModelPaths.forEach(path => {
      useGLTF.preload(path);
    });
  }, [models]);

  return (
    <>
      <div className="section-header">
        <h2 className="section-title">3D Models</h2>
        <p className="section-subtitle">Interactive 3D Portfolio</p>
      </div>
      
      <div className="models-grid-container">
        <Suspense fallback={<div className="models-loading">Loading 3D models...</div>}>
          <div className="models-grid">
            {models.map((model) => (
              <ModelCard
                key={model.id}
                model={model}
                isHovered={hoveredModel}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              />
            ))}
          </div>
        </Suspense>
      </div>
    </>
  );
};

// Main Component
const ThreeDModelsSection = () => {
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
    <section className="threeD-models-section" id="3d-models">
      {isMobile ? <Mobile3DModels /> : <Desktop3DModels />}
    </section>
  );
};

export default ThreeDModelsSection;