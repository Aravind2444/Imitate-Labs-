import { useEffect, useState } from "react";
import "./App.css";
import HeroSection from "./sections/HeroSection";
import Tagline from "./sections/Tagline";
import BlobCursor from "./components/BlobCursor"; 

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

  // Animation trigger after 2 seconds
  useEffect(() => {
    const triggerTimeout = setTimeout(() => {
      setAnimationTriggered(true);

      // Hide logo after animation
      setTimeout(() => {
        setLogoVisible(false);
      }, 2000);
    }, 2000);

    return () => clearTimeout(triggerTimeout);
  }, []);

  return (
    <main className="app-container">
      {/* Initial Logo Animation */}
      <div
        className={`logo-container ${logoVisible ? "visible" : ""} ${
          animationTriggered ? "timed_out" : ""
        }`}
        style={{
          display: logoVisible || !animationTriggered ? "flex" : "none",
        }}
      >
        <div className="logo-circle">
          <div className="logo-letter"></div>
        </div>
      </div>

      

      {/* Content Wrapper */}
      <div className="content-wrapper">
        {!logoVisible && animationTriggered && (
          <>
            <div className="hero-wrapper">
              <HeroSection />
            </div>
            <div className="tagline-wrapper">
              <Tagline />
            </div>
          </>
        )}
      </div>
    </main>
  );
}

export default App;
