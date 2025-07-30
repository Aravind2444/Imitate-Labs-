import { useEffect, useState } from "react";
import SplitText from "../components/SplitText";
import LightRays from "../components/LightRays";
import Logo from "../assets/Logo.svg";


const HeroSection = () => {
  const [startAnimation, setStartAnimation] = useState(false);

  useEffect(() => {
    // Start the text animation with a longer delay for smoother transition
    const timer = setTimeout(() => {
      setStartAnimation(true);
    }, 1000); // 1 second delay after the logo animation

    return () => clearTimeout(timer);
  }, []);

  const handleAnimationComplete = () => {
    console.log("Text animation finished!");
  };

  return (
    
    
    <section className="hero-section">
      
      {/* Background Elements */}
      <div className="hero-background">
        {/* Add your background elements/shapes here */}
        <div className="bg-element">
          <LightRays
            raysOrigin="top-center"
            raysColor="#ffffffff"
            raysSpeed={0.8}
            lightSpread={0.6}
            rayLength={2.5}
            followMouse={true}
            mouseInfluence={0.05}
            noiseAmount={0.02}
            distortion={0.02}
            className="custom-rays"
          />
        </div>
      </div>

      {/* Main Content Container */}
      <div className="hero-content">
        {/* Left Side - Text Content */}
        <div className="hero-text-content">
          {startAnimation && (
            <>
              <SplitText
                text="Welcome to"
                className="hero-subtitle"
                delay={200}
                duration={1}
                ease="power.out"
                splitType="chars"
                from={{ opacity: 0, x: 30 }}
                to={{ opacity: 1, x: 0 }}
                threshold={0.1}
                rootMargin="-100px"
                textAlign="left"
                onLetterAnimationComplete={handleAnimationComplete}
              />
              <SplitText
                text="IMITATE"
                className="hero-title"
                delay={400}
                duration={1}
                ease="elastic.out(1,0.3)"
                splitType="chars"
                from={{ opacity: 0, x: 30 }}
                to={{ opacity: 1, x: 0 }}
                threshold={0.1}
                rootMargin="-100px"
                textAlign="left"
              />
              <SplitText
                text="LABS"
                className="hero-title2"
                delay={400}
                duration={1}
                ease="elastic.out(1,0.3)"
                splitType="chars"
                from={{ opacity: 0, x: 30 }}
                to={{ opacity: 1, x: 0 }}
                threshold={0.1}
                rootMargin="-100px"
                textAlign="left"
              />
            </>
          )}
        </div>

        {/* Right Side - Logo/Image */}
        <div className="hero-visual">
          <div className="side-logo">
            <img src={Logo} alt="Imitate Labs Logo" className="logo-image" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
