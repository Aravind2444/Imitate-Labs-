import React from 'react';
import styled from 'styled-components';
import FeatureCard from './FeatureCard';

const PageSection = styled.div`
  position: ${props => props.isScrollable ? 'relative' : 'fixed'};
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.95), rgba(20, 0, 40, 0.9));
  backdrop-filter: blur(10px);
  z-index: ${props => props.isScrollable ? 1 : 10};
  opacity: ${props => props.isScrollable ? 1 : (props.isActive ? 1 : 0)};
  visibility: ${props => props.isScrollable ? 'visible' : (props.isActive ? 'visible' : 'hidden')};
  transform: ${props => props.isScrollable ? 'none' : `translateX(${props.isActive ? '0' : '100%'})`};
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  overflow-y: auto;
  padding: 120px 40px 40px 40px;
  box-sizing: border-box;
`;

const PageContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  color: white;
  opacity: ${props => props.isScrollable ? 1 : (props.isActive ? 1 : 0)};
  transform: ${props => props.isScrollable ? 'none' : `translateX(${props.isActive ? '0' : '50px'})`};
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.3s;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 40px;
  right: 40px;
  width: 50px;
  height: 50px;
  border: none;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);
  opacity: ${props => props.isActive && !props.isScrollable ? 1 : 0};
  visibility: ${props => props.isActive && !props.isScrollable ? 'visible' : 'hidden'};
  transform: translateX(${props => props.isActive ? '0' : '50px'});
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1) 0.4s;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: scale(1.1);
  }
`;

const PageTitle = styled.h1`
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

const PageText = styled.div`
  font-size: 1.2rem;
  font-family: Arial, sans-serif;
  font-weight: 400;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 30px;
  text-align: left;

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
    title: "AI Style Learning",
    description: "Our AI analyzes thousands of editing styles and learns to replicate any creator's unique approach to video editing."
  },
  {
    title: "Autonomous Editing",
    description: "Simply describe the style you want, and our agent will edit your entire video autonomously with perfect pacing and cuts."
  },
  {
    title: "Smart Content Analysis",
    description: "Advanced computer vision understands your footage content and makes intelligent editing decisions based on the visual narrative."
  },
  {
    title: "Instant Thumbnails",
    description: "Generate compelling thumbnails that match your video's style and maximize click-through rates automatically."
  },
  {
    title: "Title Generation",
    description: "AI-powered title suggestions that align with your content and target audience preferences."
  },
  {
    title: "Cloud Processing",
    description: "Powerful cloud infrastructure ensures fast processing times regardless of video length or complexity."
  }
];

const FeaturesPage = ({ isActive, onClose, mousePosition, isScrollable = false }) => {
  return (
    <PageSection isActive={isActive} isScrollable={isScrollable}>
      <CloseButton isActive={isActive} isScrollable={isScrollable} onClick={onClose}>
        &times;
      </CloseButton>
      <PageContent isActive={isActive} isScrollable={isScrollable}>
        <PageTitle>Features</PageTitle>
        <PageText>
          <p>
            Experience the future of video editing with our intelligent AI agent that transforms 
            your creative vision into reality.
          </p>
        </PageText>
        
        <FeatureGrid>
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              index={index}
              isActive={isActive}
              mousePosition={mousePosition}
            />
          ))}
        </FeatureGrid>
      </PageContent>
    </PageSection>
  );
};

export default FeaturesPage;
