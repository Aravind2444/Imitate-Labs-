import React from 'react';
import styled from 'styled-components';

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

const AboutPage = ({ isActive, onClose, isScrollable = false }) => {
  return (
    <PageSection isActive={isActive} isScrollable={isScrollable}>
      <CloseButton isActive={isActive} isScrollable={isScrollable} onClick={onClose}>
        &times;
      </CloseButton>
      <PageContent isActive={isActive} isScrollable={isScrollable}>
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
