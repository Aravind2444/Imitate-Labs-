import React from 'react';
import styled, { keyframes } from 'styled-components';

const showDarkVeilContent = keyframes`
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const HeroContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
  padding: 0;
  z-index: 5;
  pointer-events: none;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
`;

const Title = styled.div`
  font-size: 4rem;
  font-family: Arial, sans-serif;
  font-weight: 700;
  color: white;
  opacity: 0;
  animation: ${showDarkVeilContent} 1s ease-out forwards;
  animation-delay: 1s;
`;

const Tagline = styled.div`
  font-size: 1.2rem;
  font-family: Arial, sans-serif;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.8);
  opacity: 0;
  animation: ${showDarkVeilContent} 1s ease-out forwards;
  animation-delay: 1.5s;
  text-align: center;
  max-width: 400px;
`;

const Logo = styled.img`
  width: 250px;
  height: auto;
  opacity: 0;
  animation: ${showDarkVeilContent} 1s ease-out forwards;
  animation-delay: 1s;
`;

const HeroSection = () => {
  return (
    <HeroContainer>
      <TextContainer>
        <Title>Imitate Labs</Title>
        <Tagline>Empowering seamless video edits in the style you love</Tagline>
      </TextContainer>
      <Logo src="Group 6.png" alt="Imitate Labs Logo" />
    </HeroContainer>
  );
};

export default HeroSection;
