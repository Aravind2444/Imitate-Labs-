import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

const Card = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  padding: 30px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(132, 0, 255, 0.2);
  transition: all 0.3s ease;
  opacity: 1;
  transform: translateX(0);
  position: relative;
  overflow: hidden;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
  
  /* Glow effect variables */
  --glow-x: 50%;
  --glow-y: 50%;
  --glow-intensity: 0;
  --glow-radius: 300px;

  &:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(132, 0, 255, 0.4);
    box-shadow: 0 8px 32px rgba(132, 0, 255, 0.2);
  }

  /* Border glow effect */
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    padding: 2px;
    background: radial-gradient(var(--glow-radius) circle at var(--glow-x) var(--glow-y),
      rgba(132, 0, 255, calc(var(--glow-intensity) * 0.8)) 0%,
      rgba(132, 0, 255, calc(var(--glow-intensity) * 0.4)) 30%,
      transparent 60%);
    border-radius: inherit;
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask-composite: subtract;
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    pointer-events: none;
    transition: opacity 0.3s ease;
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

const AboutDetails = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.95);
  border-radius: 20px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  opacity: ${props => props.isHovered ? 1 : 0};
  visibility: ${props => props.isHovered ? 'visible' : 'hidden'};
  transform: ${props => props.isHovered ? 'scale(1)' : 'scale(0.95)'};
  transition: all 0.3s ease;
  z-index: 3;
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

const Particle = styled.div`
  position: absolute;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: rgba(132, 0, 255, 1);
  box-shadow: 0 0 6px rgba(132, 0, 255, 0.6);
  pointer-events: none;
  z-index: 100;
`;

const AboutCard = ({ title, brief, details, index, mousePosition }) => {
  const cardRef = useRef(null);
  const [particles, setParticles] = useState([]);
  const [isHovered, setIsHovered] = useState(false);

  const createParticles = (x, y) => {
    const newParticles = [];
    for (let i = 0; i < 3; i++) {
      newParticles.push({
        id: Date.now() + i,
        x: x + (Math.random() - 0.5) * 20,
        y: y + (Math.random() - 0.5) * 20,
        vx: (Math.random() - 0.5) * 4,
        vy: (Math.random() - 0.5) * 4,
        life: 1,
        decay: 0.02 + Math.random() * 0.02
      });
    }
    setParticles(prev => [...prev, ...newParticles]);
  };

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
      createParticles(e.clientX, e.clientY);
    }
  };

  const handleClick = (e) => {
    createParticles(e.clientX, e.clientY);
  };

  // Update particles
  useEffect(() => {
    if (particles.length === 0) return;

    const interval = setInterval(() => {
      setParticles(prev => prev
        .map(particle => ({
          ...particle,
          x: particle.x + particle.vx,
          y: particle.y + particle.vy,
          life: particle.life - particle.decay
        }))
        .filter(particle => particle.life > 0)
      );
    }, 16);

    return () => clearInterval(interval);
  }, [particles]);

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
    <>
      <Card
        ref={cardRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        onClick={handleClick}
      >
        <AboutTitle>{title}</AboutTitle>
        <AboutBrief>{brief}</AboutBrief>
        
        <AboutDetails isHovered={isHovered}>
          <DetailTitle>{title}</DetailTitle>
          <DetailText>{details}</DetailText>
        </AboutDetails>
      </Card>

      {/* Render particles */}
      {particles.map(particle => (
        <Particle
          key={particle.id}
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            opacity: particle.life,
            transform: `scale(${particle.life})`
          }}
        />
      ))}
    </>
  );
};

export default AboutCard;
