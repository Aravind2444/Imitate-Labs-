import React from 'react';
import styled from 'styled-components';
import FeatureCard from './FeatureCard';

const FeaturesSection = styled.section`
  position: relative;
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(135deg, rgba(10, 0, 20, 0.95), rgba(30, 0, 60, 0.9));
  backdrop-filter: blur(10px);
  padding: 120px 40px 40px 40px;
  box-sizing: border-box;
`;

const FeaturesContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  color: white;
`;

const FeaturesTitle = styled.h1`
  font-size: 3.5rem;
  font-family: Arial, sans-serif;
  font-weight: 700;
  margin-bottom: 30px;
  text-align: center;
  background: linear-gradient(45deg, #fff, #e0c3fc, #9bb5ff);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const FeaturesText = styled.div`
  font-size: 1.2rem;
  font-family: Arial, sans-serif;
  font-weight: 400;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 30px;
  text-align: center;

  p {
    margin-bottom: 20px;
  }
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 20px;
  margin-top: 40px;
  padding: 20px;
  position: relative;
`;

const features = [
  {
    title: "🌟 Instant AI Editing",
    description: "From raw footage to a finished masterpiece in minutes."
  },
  {
    title: "🎨 Style Customization",
    description: "Choose from cinematic, vlog, business, documentary, or social media formats."
  },
  {
    title: "🪄 Intelligent Enhancements",
    description: "Automatic color correction, noise reduction, and smooth transitions."
  },
  {
    title: "✂️ Smart Scene Detection",
    description: "Cuts and syncs perfectly to match flow and mood."
  },
  {
    title: "📝 Auto Subtitles & Captions",
    description: "Generate accurate captions instantly in multiple languages."
  },
  {
    title: "⚡ Cloud-Based Performance",
    description: "Edit anywhere, anytime — no heavy downloads."
  }
];

const ScrollableFeatures = ({ mousePosition }) => {
  return (
    <FeaturesSection>
      <FeaturesContent>
        <FeaturesTitle>Features</FeaturesTitle>
        <FeaturesText>
          <p>
            Experience the future of video editing with our intelligent AI agent that transforms 
            your creative vision into reality.
          </p>
        </FeaturesText>
        
        <FeatureGrid>
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              index={index}
              isActive={true}
              mousePosition={mousePosition}
            />
          ))}
        </FeatureGrid>
      </FeaturesContent>
    </FeaturesSection>
  );
};

export default ScrollableFeatures;
