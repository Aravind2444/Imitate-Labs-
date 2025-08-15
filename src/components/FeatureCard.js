import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

const Card = styled.div.attrs(props => ({
  style: {
    opacity: props.$isActive ? 1 : 0,
    transform: props.$isActive ? 'translateX(0)' : 'translateX(30px)',
    transitionDelay: props.$isActive ? `${0.4 + props.$index * 0.1}s` : '0s'
  }
}))`
  background: linear-gradient(135deg, 
    rgba(132, 0, 255, 0.08) 0%, 
    rgba(255, 255, 255, 0.04) 50%, 
    rgba(132, 0, 255, 0.06) 100%);
  border-radius: 24px;
  padding: 30px;
  backdrop-filter: blur(15px) saturate(1.2) brightness(1.02);
  border: 1px solid rgba(132, 0, 255, 0.2);
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
  box-shadow: 
    0 4px 20px rgba(132, 0, 255, 0.08),
    0 2px 8px rgba(0, 0, 0, 0.05),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  
  /* Glow effect variables */
  --glow-x: 50%;
  --glow-y: 50%;
  --glow-intensity: 0;
  --glow-radius: 300px;

  /* Subtle shimmer animation */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(132, 0, 255, 0.08),
      transparent
    );
    transition: left 0.5s;
    z-index: 1;
  }

  &:hover {
    transform: translateY(-5px) scale(1.01);
    background: linear-gradient(135deg, 
      rgba(132, 0, 255, 0.12) 0%, 
      rgba(255, 255, 255, 0.06) 50%, 
      rgba(132, 0, 255, 0.1) 100%);
    border-color: rgba(132, 0, 255, 0.3);
    box-shadow: 
      0 12px 40px rgba(132, 0, 255, 0.15),
      0 4px 16px rgba(0, 0, 0, 0.1),
      inset 0 1px 0 rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(18px) saturate(1.4) brightness(1.05);

    &::before {
      left: 100%;
    }
  }

  /* Subtle border glow effect */
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    padding: 2px;
    background: radial-gradient(var(--glow-radius) circle at var(--glow-x) var(--glow-y),
      rgba(132, 0, 255, calc(var(--glow-intensity) * 0.6)) 0%,
      rgba(132, 0, 255, calc(var(--glow-intensity) * 0.3)) 30%,
      transparent 60%);
    border-radius: inherit;
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask-composite: subtract;
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    pointer-events: none;
    transition: opacity 0.3s ease;
    z-index: 2;
  }

  @keyframes shimmer {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
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
      // Reset transform with transition
      cardRef.current.style.transition = 'transform 0.5s ease-out';
      cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translate(0px, 0px) scale(1)';
      // Reset transition after animation
      setTimeout(() => {
        if (cardRef.current) {
          cardRef.current.style.transition = '';
        }
      }, 500);
    }
  };

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Calculate normalized position (-1 to 1)
    const normalizedX = (x - centerX) / centerX;
    const normalizedY = (y - centerY) / centerY;
    
    // Smooth out the tilt effect with damping
    const tiltX = normalizedY * -10; // Inverted for natural tilt
    const tiltY = normalizedX * 10;
    
    // Magnetism effect with exponential falloff
    const distance = Math.sqrt(Math.pow(normalizedX, 2) + Math.pow(normalizedY, 2));
    const magnetStrength = Math.max(0, 1 - distance) * 15; // Stronger at center
    const magnetX = normalizedX * magnetStrength;
    const magnetY = normalizedY * magnetStrength;
    
    // Apply transforms in correct order with smooth transition
    cardRef.current.style.transition = 'transform 0.1s ease-out';
    cardRef.current.style.transform = `
      perspective(1000px)
      translate3d(${magnetX}px, ${magnetY}px, 0)
      rotateX(${tiltX}deg)
      rotateY(${tiltY}deg)
      scale(1.01)
    `;
    
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
      $isActive={isActive}
      $index={index}
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
