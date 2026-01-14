import React from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import DesignPortfolio from './components/DesignPortfolio';
import LogoDesigns from './components/LogoDesigns';
import TechnicalSkills from './components/TechnicalSkills';
import ThreeDModelsSection from './components/3Dmodels';
import Footer from './components/Footer';
import './styles/mobile-optimization.css';

import './App.css';

export default function App() {
  return (
    <div className="app">
      <Header />
      <HeroSection />
      <TechnicalSkills />
      <DesignPortfolio />
      <LogoDesigns />
      <ThreeDModelsSection />
      
      <Footer />
    </div>
  );
}