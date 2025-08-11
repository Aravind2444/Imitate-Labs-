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

const PageSection = styled.div`
  position: ${props => props.isScrollable ? 'relative' : 'fixed'};
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.95), rgba(20, 0, 40, 0.9));
  backdrop-filter: blur(10px);
  z-index: ${props => props.isScrollable ? 1 : 10};
  opacity: ${props => props.isActive ? 1 : 0};
  visibility: ${props => props.isActive ? 'visible' : 'hidden'};
  transform: translateX(${props => props.isActive ? '0' : '100%'});
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  overflow-y: auto;
  padding: 120px 40px 40px 40px;
  box-sizing: border-box;
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
  animation-delay: 0.5s;
  background: linear-gradient(135deg, 
    rgba(255, 255, 255, 0.08) 0%, 
    rgba(255, 255, 255, 0.03) 50%, 
    rgba(255, 255, 255, 0.05) 100%);
  backdrop-filter: blur(25px) saturate(1.8) brightness(1.1);
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 
    inset 0 1px 0 0 rgba(255, 255, 255, 0.2),
    inset 0 -1px 0 0 rgba(255, 255, 255, 0.1),
    0 8px 32px rgba(0, 0, 0, 0.1),
    0 4px 16px rgba(255, 255, 255, 0.05);
  
  /* Enhanced glass effect with shimmer */
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
      rgba(255, 255, 255, 0.1),
      transparent
    );
    border-radius: inherit;
    transition: left 0.8s ease;
  }

  &:hover::before {
    left: 100%;
  }
`;

const NavContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 40px;
  border-radius: inherit;
  position: relative;
  z-index: 1;
`;

const NavBrand = styled.div`
  color: rgba(255, 255, 255, 0.95);
  font-family: Arial, sans-serif;
  font-size: 1.2rem;
  font-weight: 600;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(2px);
`;

const NavItems = styled.div`
  display: flex;
  align-items: center;
  gap: 40px;
`;

const NavItem = styled.button`
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  font-family: Arial, sans-serif;
  font-size: 0.9rem;
  font-weight: 500;
  padding: 12px 20px;
  border-radius: 25px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  background: linear-gradient(135deg, 
    rgba(255, 255, 255, 0.08) 0%, 
    rgba(255, 255, 255, 0.04) 100%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  cursor: pointer;
  backdrop-filter: blur(15px);
  box-shadow: 
    inset 0 1px 0 rgba(255, 255, 255, 0.1),
    0 2px 8px rgba(0, 0, 0, 0.1);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  position: relative;
  overflow: hidden;

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
      rgba(255, 255, 255, 0.15),
      transparent
    );
    transition: left 0.6s ease;
    z-index: 0;
  }

  &:hover {
    color: rgba(255, 255, 255, 1);
    background: linear-gradient(135deg, 
      rgba(255, 255, 255, 0.15) 0%, 
      rgba(255, 255, 255, 0.08) 100%);
    border: 1px solid rgba(255, 255, 255, 0.25);
    transform: translateY(-2px) scale(1.05);
    backdrop-filter: blur(20px) saturate(1.5);
    box-shadow: 
      inset 0 1px 0 rgba(255, 255, 255, 0.2),
      0 8px 25px rgba(0, 0, 0, 0.15),
      0 4px 12px rgba(255, 255, 255, 0.1);

    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(-1px) scale(1.02);
  }
`;

const PageContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  color: white;
  opacity: ${props => props.isActive ? 1 : 0};
  transform: translateX(${props => props.isActive ? '0' : '50px'});
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.3s;
  margin-top: 40px;
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

const AboutPage = ({ isActive, onClose, onNavigate, onContactClick, isScrollable = false }) => {
  return (
    <PageSection isActive={isActive} isScrollable={isScrollable}>
      <GlassNav>
        <NavContent>
          <NavBrand>Imitate Labs</NavBrand>
          <NavItems>
            <NavItem onClick={() => onNavigate('home')}>Home</NavItem>
            <NavItem onClick={() => onNavigate('features')}>Features</NavItem>
            <NavItem onClick={() => onContactClick('contact')}>Contact</NavItem>
            <NavItem onClick={onClose}>Close</NavItem>
          </NavItems>
        </NavContent>
      </GlassNav>
      <PageContent isActive={isActive}>
        <PageTitle>About Imitate Labs</PageTitle>
        <PageText>
          <p>
            Imitate Labs is not just a platform. It is an AI agent. While a platform gives users tools, 
            an agent acts on their behalf.
          </p>
          
          <p>
            They'll say, "Edit this like Emma Chamberlain with casual pacing, jump cuts, and vlog-style text," 
            and the agent will learn the style, analyze the footage, and deliver a fully edited video, 
            thumbnail, and title all autonomously.
          </p>
          
          <p>
            Post MVP, no reference will even be needed. Through peer group mapping, the AI understands 
            how the end user would like the video to be edited simply by saying "edit this video."
          </p>
          
          <p>
            The platform is just the interface. The real magic is the intelligent agent doing the heavy lifting. 
            We are not building another editing tool. We are building a smart, scalable editor in the cloud.
          </p>
        </PageText>
      </PageContent>
    </PageSection>
  );
};

export default AboutPage;
