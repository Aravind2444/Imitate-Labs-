import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

const Card = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  padding: 30px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(132, 0, 255, 0.2);
  transition: all 0.3s ease;
  opacity: ${props => props.isActive ? 1 : 0};
  transform: translateX(${props => props.isActive ? '0' : '30px'});
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  transition-delay: ${props => props.isActive ? `${0.4 + props.index * 0.1}s` : '0s'};
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

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 15px;
  color: #e0c3fc;
  position: relative;
  z-index: 2;
`;

const FeatureDescription = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.8);
  position: relative;
  z-index: 2;
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

const FeatureCard = ({ title, description, index, isActive, mousePosition }) => {
  const cardRef = useRef(null);
  const [particles, setParticles] = useState([]);
  const [isHovered, setIsHovered] = useState(false);

  const createParticles = (x, y) => {
    const newParticles = [];
    const particleCount = 8;
    
    for (let i = 0; i < particleCount; i++) {
      const angle = (i / particleCount) * Math.PI * 2;
      const distance = 20 + Math.random() * 30;
      const particle = {
        id: Math.random(),
        x: x + Math.cos(angle) * distance,
        y: y + Math.sin(angle) * distance,
        vx: Math.cos(angle) * (2 + Math.random() * 3),
        vy: Math.sin(angle) * (2 + Math.random() * 3),
        life: 1,
        decay: 0.02 + Math.random() * 0.02
      };
      newParticles.push(particle);
    }
    
    setParticles(prev => [...prev, ...newParticles]);
  };

  const updateCardGlow = (mouseX, mouseY, intensity) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const relativeX = ((mouseX - rect.left) / rect.width) * 100;
    const relativeY = ((mouseY - rect.top) / rect.height) * 100;
    
    cardRef.current.style.setProperty('--glow-x', `${relativeX}%`);
    cardRef.current.style.setProperty('--glow-y', `${relativeY}%`);
    cardRef.current.style.setProperty('--glow-intensity', intensity.toString());
  };

  const handleMouseEnter = (e) => {
    setIsHovered(true);
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    createParticles(x, y);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setParticles([]);
    if (cardRef.current) {
      cardRef.current.style.setProperty('--glow-intensity', '0');
    }
  };

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Tilt effect
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;
    
    // Magnetism effect
    const magnetX = (x - centerX) * 0.05;
    const magnetY = (y - centerY) * 0.05;
    
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translate(${magnetX}px, ${magnetY}px) translateY(-5px)`;
    
    // Update glow
    updateCardGlow(e.clientX, e.clientY, 0.8);
  };

  const handleClick = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    createParticles(x, y);
  };

  // Update particles
  useEffect(() => {
    if (particles.length === 0) return;
    
    const interval = setInterval(() => {
      setParticles(prev => 
        prev
          .map(particle => ({
            ...particle,
            x: particle.x + particle.vx,
            y: particle.y + particle.vy,
            life: particle.life - particle.decay,
            vx: particle.vx * 0.98,
            vy: particle.vy * 0.98
          }))
          .filter(particle => particle.life > 0)
      );
    }, 16);

    return () => clearInterval(interval);
  }, [particles]);

  // Update glow based on global mouse position
  useEffect(() => {
    if (!isActive || !mousePosition) return;
    
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const distance = Math.sqrt(
        Math.pow(mousePosition.x - (rect.left + rect.width / 2), 2) +
        Math.pow(mousePosition.y - (rect.top + rect.height / 2), 2)
      );
      
      const maxDistance = 200;
      const glowIntensity = Math.max(0, 1 - distance / maxDistance) * 0.5;
      
      if (!isHovered) {
        updateCardGlow(mousePosition.x, mousePosition.y, glowIntensity);
      }
    }
  }, [mousePosition, isActive, isHovered]);

  return (
    <Card
      ref={cardRef}
      isActive={isActive}
      index={index}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      onClick={handleClick}
    >
      <FeatureTitle>{title}</FeatureTitle>
      <FeatureDescription>{description}</FeatureDescription>
      
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
    </Card>
  );
};

export default FeatureCard;
