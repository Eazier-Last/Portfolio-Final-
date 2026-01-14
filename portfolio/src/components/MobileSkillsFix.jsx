
import React, { useEffect } from 'react';

const MobileSkillsFix = () => {
  useEffect(() => {
    // This runs on EVERY device and adds a mobile class if needed
    const checkAndFixMobileSkills = () => {
      const skillsGrid = document.querySelector('.skills-grid');
      const skillsSection = document.querySelector('.skills-section');
      
      if (!skillsGrid || !skillsSection) return;
      
      // Check if it's mobile (simulated or real)
      const isMobile = window.innerWidth <= 768;
      
      if (isMobile) {
        // Apply mobile styles directly via JavaScript
        skillsGrid.style.display = 'grid';
        skillsGrid.style.gridTemplateColumns = 'repeat(2, 1fr)';
        skillsGrid.style.gap = '12px';
        skillsGrid.style.width = '100%';
        
        // Add mobile class to section for other mobile styles
        skillsSection.classList.add('mobile-active');
      } else {
        skillsGrid.style.cssText = ''; // Reset styles
        skillsSection.classList.remove('mobile-active');
      }
    };
    
    // Run immediately
    checkAndFixMobileSkills();
    
    // Run on resize
    window.addEventListener('resize', checkAndFixMobileSkills);
    
    return () => {
      window.removeEventListener('resize', checkAndFixMobileSkills);
    };
  }, []);
  
  return null; // This component doesn't render anything
};

export default MobileSkillsFix;
