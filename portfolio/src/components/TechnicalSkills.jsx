
import React, { useState, useEffect } from 'react';
import '../styles/skills.css';
import MobileSkillsFix from './MobileSkillsFix'; // Import the fix

const TechnicalSkills = () => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const skills = [
    {
      name: "Photoshop",
      icon: "Ps",
      color: "#31A8FF",
      description: "Photo editing, compositing, digital painting"
    },
    {
      name: "Illustrator",
      icon: "Ai",
      color: "#FF9A00",
      description: "Vector graphics, logo design, illustrations"
    },
    {
      name: "Figma",
      icon: "Fg",
      color: "#F24E1E",
      description: "UI/UX design, prototyping"
    },
    {
      name: "Blender",
      icon: "Bl",
      color: "#E87D0D",
      description: "3D modeling, animation, rendering"
    },
    {
      name: "After Effects",
      icon: "Ae",
      color: "#D291FF",
      description: "Motion graphics, visual effects"
    },
    {
      name: "Premiere Pro",
      icon: "Pr",
      color: "#EA77FF",
      description: "Video editing, post-production"
    }
  ];

  return (
    <>
      <MobileSkillsFix /> {/* Add the fix component */}
      <section className="skills-section" id="skills">
        <div className="section-header">
          <h2 className="section-title">Technical Skills</h2>
          <p className="section-subtitle">Adobe Creative Suite & Design Tools</p>
        </div>
        
        <div className="skills-container">
          <div className="skills-grid">
            {skills.map((skill) => (
              <div 
                key={skill.name} 
                className="skill-card"
                style={{ '--skill-color': skill.color }}
              >
                <div className="skill-header">
                  <div className="skill-icon" style={{ backgroundColor: skill.color }}>
                    {skill.icon}
                  </div>
                  <div className="skill-info">
                    <h3 className="skill-name">{skill.name}</h3>
                    {!isMobile && (
                      <p className="skill-description">{skill.description}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default TechnicalSkills;
