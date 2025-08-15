import React from 'react';
import styled, { keyframes } from 'styled-components';

const showNavigation = keyframes`
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const GlassNav = styled.nav`
  position: absolute;
  top: 30px;
  left: 5%;
  width: 90vw;
  height: 60px;
  border-radius: 30px;
  z-index: 6;
  opacity: 0;
  animation: ${showNavigation} 1s ease-out forwards;
  animation-delay: 2s;
  background: rgba(255, 255, 255, 0.01);
  backdrop-filter: blur(4px) saturate(1.1) brightness(1.02);
  border: 1px solid rgba(255, 255, 255, 0.03);
  box-shadow: 
    inset 0 1px 0 0 rgba(255, 255, 255, 0.05),
    0 2px 8px 0 rgba(0, 0, 0, 0.05);
`;

const NavContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 30px;
  border-radius: inherit;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const LogoImage = styled.img`
  height: 32px;
  width: auto;
`;

const LogoText = styled.span`
  color: white;
  font-size: 1.2rem;
  font-weight: 600;
  font-family: Arial, sans-serif;
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 60px;
`;

const NavItem = styled.button`
  color: white;
  text-decoration: none;
  font-family: Arial, sans-serif;
  font-size: 0.9rem;
  font-weight: 500;
  padding: 8px 16px;
  border-radius: 20px;
  transition: all 0.3s ease;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.02);
  cursor: pointer;

  &:hover {
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.06);
    transform: scale(1.05);
    backdrop-filter: blur(3px);
  }

  &:last-child {
    margin-right: 50px;
  }
`;

const Navigation = ({ onNavigate, onContactClick }) => {
  return (
    <GlassNav>
      <NavContent>
        <LogoContainer>
          <LogoImage src="/Group 6.png" alt="Imitate Labs Logo" />
          <LogoText>Imitate Labs</LogoText>
        </LogoContainer>
        <NavLinks>
          <NavItem onClick={() => onNavigate('about')}>About</NavItem>
          <NavItem onClick={() => onNavigate('features')}>Features</NavItem>
          <NavItem onClick={() => onContactClick('contact')}>Contact</NavItem>
        </NavLinks>
      </NavContent>
    </GlassNav>
  );
};

export default Navigation;
