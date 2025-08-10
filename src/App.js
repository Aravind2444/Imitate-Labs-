import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import LogoAnimation from './components/LogoAnimation';
import BlurText from './components/BlurText';
import HeroSection from './components/HeroSection';
import Navigation from './components/Navigation';
import ScrollableAbout from './components/ScrollableAbout';
import ScrollableFeatures from './components/ScrollableFeatures';
import ContactPage from './components/ContactPage';
import DarkVeilCanvas from './components/DarkVeilCanvas';
import GlobalSpotlight from './components/GlobalSpotlight';
import './styles/App.css';

const AppContainer = styled.div`
  background-color: black;
  min-height: 100vh;
  overflow: ${props => props.isHeroStage ? 'hidden' : 'auto'};
  position: relative;
`;

function App() {
  const [currentStage, setCurrentStage] = useState('logo'); // logo, tagline, hero
  const [activePage, setActivePage] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Stage progression timing
    const logoTimer = setTimeout(() => setCurrentStage('tagline'), 6000);
    const taglineTimer = setTimeout(() => {
      setCurrentStage('hero');
      // Enable scrolling after hero appears
      setTimeout(() => {
        document.body.style.overflow = 'auto';
      }, 2000);
    }, 10000);

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
    // Scroll to the appropriate section instead of showing overlay
    const element = document.getElementById(`${pageId}-section`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const showContactModal = (pageId) => {
    setActivePage(pageId);
  };

  const closePage = () => {
    setActivePage(null);
  };

  return (
    <AppContainer isHeroStage={currentStage !== 'hero'}>
      {/* Logo Animation Stage */}
      {currentStage === 'logo' && (
        <LogoAnimation />
      )}

      {/* Tagline Stage */}
      {currentStage === 'tagline' && (
        <BlurText text="Empowering seamless video edits in the style you love" />
      )}

      {/* Hero Stage and Scrollable Content */}
      {currentStage === 'hero' && (
        <>
          {/* Fixed Hero Section */}
          <div style={{ position: 'relative', height: '100vh' }}>
            <DarkVeilCanvas />
            <HeroSection />
            <Navigation onNavigate={showPage} onContactClick={showContactModal} />
            <GlobalSpotlight 
              mousePosition={mousePosition} 
              isVisible={true} 
            />
          </div>

          {/* Scrollable Sections Below */}
          <div id="about-section">
            <ScrollableAbout />
          </div>
          
          <div id="features-section">
            <ScrollableFeatures mousePosition={mousePosition} />
          </div>

          {/* Contact Modal Overlay */}
          <ContactPage 
            isActive={activePage === 'contact'} 
            onClose={closePage} 
          />
        </>
      )}
    </AppContainer>
  );
}

export default App;
