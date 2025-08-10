import React from 'react';
import styled from 'styled-components';

const AboutSection = styled.section`
  position: relative;
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.95), rgba(20, 0, 40, 0.9));
  backdrop-filter: blur(10px);
  padding: 120px 40px 40px 40px;
  box-sizing: border-box;
`;

const AboutContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  color: white;
`;

const AboutTitle = styled.h1`
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

const AboutText = styled.div`
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

const ScrollableAbout = () => {
  return (
    <AboutSection>
      <AboutContent>
        <AboutTitle>Edit Smarter. Create Faster.</AboutTitle>
        <AboutText>
          <p>
            Our AI-powered video editing platform makes professional-quality editing available to everyone. Just upload your footage, pick your preferred style, and let our advanced AI handle the rest — cutting, enhancing, and styling your video to perfection. No editing skills required, no complicated tools — just your story, elevated.
          </p>
        </AboutText>
      </AboutContent>
    </AboutSection>
  );
};

export default ScrollableAbout;
