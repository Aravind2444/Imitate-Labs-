import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [animationTriggered, setAnimationTriggered] = useState(false);
  const [logoVisible, setLogoVisible] = useState(false);

  // Show logo after short delay (like setTimeout on page load)
  useEffect(() => {
    const timeout = setTimeout(() => {
      setLogoVisible(true);
    }, 100);

    return () => clearTimeout(timeout);
  }, []);

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;

      if (scrollTop > 50 && !animationTriggered) {
        setAnimationTriggered(true);

        setTimeout(() => {
          setLogoVisible(false);
        }, 2000); // Same delay as your original
      }

      if (scrollTop <= 50 && animationTriggered) {
        setAnimationTriggered(false);

        // Delay the re-show for smoother effect
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

      {/* Next Section */}
      <div className={`next-section ${animationTriggered ? 'show' : ''}`}>
        <h1>Welcome to Imitate Labs...</h1>
      </div>
    </>
  );
}

export default App;
