import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [animationTriggered, setAnimationTriggered] = useState(false);
  const [logoVisible, setLogoVisible] = useState(false);

  // Show logo after short delay
  useEffect(() => {
    const timeout = setTimeout(() => {
      setLogoVisible(true);
    }, 100);

    return () => clearTimeout(timeout);
  }, []);

  // Scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;

      if (scrollTop > 50 && !animationTriggered) {
        setAnimationTriggered(true);

        setTimeout(() => {
          setLogoVisible(false);
        }, 2000);
      }

      if (scrollTop <= 50 && animationTriggered) {
        setAnimationTriggered(false);

        setTimeout(() => {
          setLogoVisible(true);
        }, 50);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [animationTriggered]);

  return (
    <>
      {/* Logo */}
      <div
        className={`logo-container ${logoVisible ? 'visible' : ''} ${
          animationTriggered ? 'scrolled' : ''
        }`}
        style={{ display: logoVisible || !animationTriggered ? 'flex' : 'none' }}
      >
        <div className="logo-circle">
          <div className="logo-letter"></div>
        </div>
      </div>

      {/* 🔜 Tagline section will go here next */}
    </>
  );
}

export default App;
