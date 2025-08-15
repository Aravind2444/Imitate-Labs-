import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import LogoAnimation from './components/LogoAnimation';
import BlurText from './components/BlurText';
import HeroSection from './components/HeroSection';
import Navigation from './components/Navigation';
import DarkVeilCanvas from './components/DarkVeilCanvas';
import GlobalSpotlight from './components/GlobalSpotlight';
import './styles/App.css';

const AppContainer = styled.div.attrs(props => ({
  // This filters out the isHeroStage prop from being passed to the DOM
  style: {
    overflow: props.$isHeroStage ? 'hidden' : 'auto'
  }
}))`
  background-color: black;
  min-height: 100vh;
  position: relative;
`;

function App() {
  const [currentStage, setCurrentStage] = useState('logo'); // logo, tagline, hero
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Stage progression timing
    const logoTimer = setTimeout(() => setCurrentStage('tagline'), 5300);
    const taglineTimer = setTimeout(() => {
      setCurrentStage('hero');
      // Enable scrolling after hero appears
      setTimeout(() => {
        document.body.style.overflow = 'auto';
      }, 2000);
    }, 9300);

    return () => {
      clearTimeout(logoTimer);
      clearTimeout(taglineTimer);
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const showPage = (pageId) => {
    // Scroll to the appropriate section within the hero
    const element = document.getElementById(`${pageId}-section`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const showContactModal = (pageId) => {
    // Scroll to contact section within the hero
    const element = document.getElementById(`${pageId}-section`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <AppContainer $isHeroStage={currentStage !== 'hero'}>
      {/* Logo Animation Stage */}
      {currentStage === 'logo' && (
        <LogoAnimation />
      )}

      {/* Tagline Stage */}
      {currentStage === 'tagline' && (
        <BlurText text="Empowering seamless video edits in the style you love" />
      )}

      {/* Hero Stage with All Content */}
      {currentStage === 'hero' && (
        <div style={{ position: 'relative', height: '100vh' }}>
          <DarkVeilCanvas />
          <HeroSection mousePosition={mousePosition} />
          <Navigation onNavigate={showPage} onContactClick={showContactModal} />
          <GlobalSpotlight 
            mousePosition={mousePosition} 
            isVisible={true} 
          />
        </div>
      )}
    </AppContainer>
  );
}

export default App;
