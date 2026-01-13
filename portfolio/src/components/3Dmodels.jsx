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
              
              {/* OrbitControls - allow rotation but lights will appear to move */}
              // In the ModelCard component, replace the OrbitControls with this:
<OrbitControls
  ref={controlsRef}
  enableZoom={true}
  enablePan={false}
  enableRotate={true}
  autoRotate={true}  // Let OrbitControls handle the auto-rotate logic
  autoRotateSpeed={2}
  // Remove onStart and onEnd - let OrbitControls handle interaction detection
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
           
            
            {/* <div className="model-tags">
              {model.tags.map((tag, index) => (
                <span 
                  key={index} 
                  className="model-tag"
                  style={{ 
                    backgroundColor: `${model.bgColor}20`,
                    color: model.bgColor
                  }}
                >
                  {tag}
                </span>
              ))}
            </div> */}
            
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

// Main Component
const ThreeDModelsSection = () => {
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
      // DISTANCE SETTINGS FOR THIS MODEL
      defaultDistance: 10,  // Initial camera distance
      minDistance: 3,      // Minimum zoom-in distance
      maxDistance: 10,     // Maximum zoom-out distance
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
      // DISTANCE SETTINGS FOR THIS MODEL
      defaultDistance: 7,  // Initial camera distance
      minDistance: 3,      // Minimum zoom-in distance (can get closer for details)
      maxDistance: 15,     // Maximum zoom-out distance
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
      // DISTANCE SETTINGS FOR THIS MODEL
      defaultDistance: 8,  // Initial camera distance
      minDistance: 5,      // Minimum zoom-in distance
      maxDistance: 20,     // Maximum zoom-out distance (vehicle might be larger)
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
      // DISTANCE SETTINGS FOR THIS MODEL
      defaultDistance: 5,  // Initial camera distance
      minDistance: 3,      // Minimum zoom-in distance
      maxDistance: 10,     // Maximum zoom-out distance
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
      // DISTANCE SETTINGS FOR THIS MODEL
      defaultDistance: 9,  // Initial camera distance
      minDistance: 6,      // Minimum zoom-in distance
      maxDistance: 25,     // Maximum zoom-out distance (architecture can be large)
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
      // DISTANCE SETTINGS FOR THIS MODEL
      defaultDistance: 7,  // Initial camera distance
      minDistance: 4,      // Minimum zoom-in distance
      maxDistance: 18,     // Maximum zoom-out distance
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
      // DISTANCE SETTINGS FOR THIS MODEL
      defaultDistance: 6,  // Initial camera distance
      minDistance: 3,      // Minimum zoom-in distance
      maxDistance: 12,     // Maximum zoom-out distance
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
      // DISTANCE SETTINGS FOR THIS MODEL
      defaultDistance: 4,  // Initial camera distance (jewelry is small)
      minDistance: 2,      // Minimum zoom-in distance (can get very close)
      maxDistance: 8,      // Maximum zoom-out distance
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
      // DISTANCE SETTINGS FOR THIS MODEL
      defaultDistance: 5,  // Initial camera distance
      minDistance: 3,      // Minimum zoom-in distance
      maxDistance: 10,     // Maximum zoom-out distance
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
    <section className="threeD-models-section" id="3d-models">
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
    </section>
  );
};

export default ThreeDModelsSection;