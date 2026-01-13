import React from 'react';
import '../styles/skills.css';

const TechnicalSkills = () => {
  const skills = [
    {
      name: "Photoshop",
      icon: "Ps",
      color: "#31A8FF",
      description: "Photo editing, compositing, digital painting and retouching with advanced layer management"
    },
    {
      name: "Illustrator",
      icon: "Ai",
      color: "#FF9A00",
      description: "Vector graphics, logo design, illustrations and scalable artwork creation"
    },
    {
      name: "Figma",
      icon: "Fg",
      color: "#F24E1E",
      description: "UI/UX design, prototyping, design systems and collaborative interface design"
    },
    {
      name: "Blender",
      icon: "Bl",
      color: "#E87D0D",
      description: "3D modeling, animation, rendering and visual effects for motion graphics"
    },
    {
      name: "After Effects",
      icon: "Ae",
      color: "#D291FF",
      description: "Motion graphics, visual effects, animation and dynamic video content creation"
    },
    {
      name: "Premiere Pro",
      icon: "Pr",
      color: "#EA77FF",
      description: "Video editing, color grading, audio mixing and professional post-production"
    }
  ];

  return (
    <section className="skills-section" id="skills">
      <div className="section-header">
        <h2 className="section-title">Technical Skills</h2>
        <p className="section-subtitle">Adobe Creative Suite & Design Tools Mastery</p>
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
                  <p className="skill-description">{skill.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechnicalSkills;