import React from 'react';
import styled, { keyframes } from 'styled-components';

const autoScale = keyframes`
  0% {
    transform: scale(1) rotate(0deg);
  }
  100% {
    transform: scale(12) rotate(90deg);
  }
`;

const fadeToBlack = keyframes`
  0% {
    opacity: 0;
  }
  60% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const HeroSection = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: black;
  opacity: 0;
  pointer-events: none;
  z-index: 2;
  animation: ${fadeToBlack} 6s ease-in-out forwards;
  animation-delay: 1s;
`;

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
`;

const CenteredImage = styled.img`
  width: 300px;
  height: auto;
  transition: transform 3s cubic-bezier(0.4, 0, 0.2, 1);
  animation: ${autoScale} 6s ease-in-out forwards;
  animation-delay: 1s;
`;

const LogoAnimation = () => {
  return (
    <HeroSection>
      <Overlay />
      <Container>
        <CenteredImage src="Group 6.png" alt="Imitate Labs Logo" />
      </Container>
    </HeroSection>
  );
};

export default LogoAnimation;
