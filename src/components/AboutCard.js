import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

const Card = styled.div`
  background: linear-gradient(135deg, 
    rgba(255, 255, 255, 0.1) 0%,
    rgba(255, 255, 255, 0.05) 50%,
    rgba(255, 255, 255, 0.02) 100%);
  border-radius: 24px;
  padding: 30px;
  backdrop-filter: blur(20px) saturate(1.8) brightness(1.1);
  -webkit-backdrop-filter: blur(20px) saturate(1.8) brightness(1.1);
  border: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.2),
    inset 0 -1px 0 rgba(255, 255, 255, 0.1);
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  opacity: 1;
  transform: translateX(0);
  position: relative;
  overflow: hidden;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
  
  /* Fluid glass animation */
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(45deg,
      transparent 30%,
      rgba(255, 255, 255, 0.1) 50%,
      transparent 70%);
    transform: rotate(-45deg);
    transition: all 0.6s ease;
    opacity: 0;
  }
  
  /* Glow effect variables */
  --glow-x: 50%;
  --glow-y: 50%;
  --glow-intensity: 0;
  --glow-radius: 300px;

  &:hover {
    transform: translateY(-8px) scale(1.02);
    background: linear-gradient(135deg, 
      rgba(255, 255, 255, 0.15) 0%,
      rgba(255, 255, 255, 0.08) 50%,
      rgba(255, 255, 255, 0.04) 100%);
    border: 1px solid rgba(255, 255, 255, 0.25);
    box-shadow: 
      0 16px 64px rgba(132, 0, 255, 0.25),
      0 8px 32px rgba(0, 0, 0, 0.4),
      inset 0 1px 0 rgba(255, 255, 255, 0.3),
      inset 0 -1px 0 rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(25px) saturate(2) brightness(1.2);
    -webkit-backdrop-filter: blur(25px) saturate(2) brightness(1.2);
    
    &::before {
      opacity: 1;
      animation: shimmer 2s ease-in-out infinite;
    }
  }

  @keyframes shimmer {
    0% { transform: translateX(-100%) translateY(-100%) rotate(-45deg); }
    50% { transform: translateX(0%) translateY(0%) rotate(-45deg); }
    100% { transform: translateX(100%) translateY(100%) rotate(-45deg); }
  }

  /* Enhanced border glow effect */
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    padding: 2px;
    background: radial-gradient(var(--glow-radius) circle at var(--glow-x) var(--glow-y),
      rgba(132, 0, 255, calc(var(--glow-intensity) * 0.6)) 0%,
      rgba(147, 51, 234, calc(var(--glow-intensity) * 0.4)) 30%,
      rgba(168, 85, 247, calc(var(--glow-intensity) * 0.2)) 60%,
      transparent 80%);
    border-radius: inherit;
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask-composite: subtract;
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    pointer-events: none;
    transition: opacity 0.4s ease;
    z-index: 1;
  }
`;

const AboutTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 15px;
  color: #e0c3fc;
  position: relative;
  z-index: 2;
`;

const AboutBrief = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.8);
  position: relative;
  z-index: 2;
  transition: all 0.3s ease;
`;

const AboutDetails = styled.div.attrs(props => ({
  style: {
    opacity: props.$isHovered ? 1 : 0,
    visibility: props.$isHovered ? 'visible' : 'hidden',
    transform: props.$isHovered ? 'scale(1)' : 'scale(0.95)'
  }
}))`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, 
    rgba(0, 0, 0, 0.9) 0%,
    rgba(20, 0, 40, 0.95) 50%,
    rgba(40, 0, 80, 0.9) 100%);
  backdrop-filter: blur(30px) saturate(1.5);
  -webkit-backdrop-filter: blur(30px) saturate(1.5);
  border-radius: 24px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  z-index: 3;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 
    0 12px 40px rgba(0, 0, 0, 0.5),
    inset 0 1px 0 rgba(255, 255, 255, 0.15);
`;

const DetailTitle = styled.h4`
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 15px;
  color: #9bb5ff;
`;

const DetailText = styled.p`
  font-size: 0.95rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.9);
`;



const AboutCard = ({ title, brief, details, index, mousePosition }) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const updateCardGlow = (mouseX, mouseY, intensity) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const x = ((mouseX - rect.left) / rect.width) * 100;
      const y = ((mouseY - rect.top) / rect.height) * 100;
      
      cardRef.current.style.setProperty('--glow-x', `${x}%`);
      cardRef.current.style.setProperty('--glow-y', `${y}%`);
      cardRef.current.style.setProperty('--glow-intensity', intensity);
    }
  };

  const handleMouseEnter = (e) => {
    setIsHovered(true);
    updateCardGlow(e.clientX, e.clientY, 0.8);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    updateCardGlow(0, 0, 0);
  };

  const handleMouseMove = (e) => {
    if (isHovered) {
      updateCardGlow(e.clientX, e.clientY, 0.8);
    }
  };

  // Update glow based on global mouse position
  useEffect(() => {
    if (cardRef.current && mousePosition && !isHovered) {
      const rect = cardRef.current.getBoundingClientRect();
      const distance = Math.sqrt(
        Math.pow(mousePosition.x - (rect.left + rect.width / 2), 2) +
        Math.pow(mousePosition.y - (rect.top + rect.height / 2), 2)
      );
      
      const maxDistance = 300;
      const intensity = Math.max(0, (maxDistance - distance) / maxDistance) * 0.3;
      
      if (intensity > 0) {
        updateCardGlow(mousePosition.x, mousePosition.y, intensity);
      }
    }
  }, [mousePosition, isHovered]);

  return (
    <Card
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      <AboutTitle>{title}</AboutTitle>
      <AboutBrief>{brief}</AboutBrief>
      
      <AboutDetails $isHovered={isHovered}>
        <DetailTitle>{title}</DetailTitle>
        <DetailText>{details}</DetailText>
      </AboutDetails>
    </Card>
  );
};

export default AboutCard;
