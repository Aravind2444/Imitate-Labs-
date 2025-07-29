import { useEffect, useState } from "react";
import SplitText from "../components/SplitText";

const Tagline = () => {
  const [startAnimation, setStartAnimation] = useState(false);

  useEffect(() => {
    // Start animation after a short delay
    const timer = setTimeout(() => {
      setStartAnimation(true);
    }, 800); // Delay to ensure it starts after hero section

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="tagline-container">
      {startAnimation && (
        <SplitText
          text="Seamless edits in the style that you love"
          className="tagline-text"
          delay={100}
          duration={1.8}
          ease="power2.inOut"
          splitType="chars"
          from={{ opacity: 0, x:100  }} // Start from right
          to={{ opacity: 1, x: 0 }} // Move to original position
          threshold={0.1}
          textAlign="none"
        />
      )}
    </div>
  );
};

export default Tagline;


