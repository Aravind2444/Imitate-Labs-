import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import FeatureCard from './FeatureCard';
import AboutCard from './AboutCard';

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
  height: 100vh;
  overflow-y: auto;
  z-index: 5;
  pointer-events: auto;
`;

const ContentWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
`;

// Hero Section
const MainHeroSection = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
  padding: 0;
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

// About Section
const AboutSection = styled.section`
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

const AboutGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 20px;
  margin-top: 40px;
  padding: 20px;
  position: relative;
`;

const SectionTitle = styled.h1`
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

const SectionText = styled.div`
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

// Features Section
const FeaturesSection = styled.section`
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(135deg, rgba(10, 0, 20, 0.95), rgba(30, 0, 60, 0.9));
  backdrop-filter: blur(10px);
  padding: 120px 40px 40px 40px;
  box-sizing: border-box;
`;

const FeaturesContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  color: white;
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 20px;
  margin-top: 40px;
  padding: 20px;
  position: relative;
`;

// Contact Section
const ContactSection = styled.section`
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(135deg, 
    rgba(0, 0, 0, 0.95) 0%, 
    rgba(10, 0, 20, 0.9) 50%, 
    rgba(20, 0, 40, 0.95) 100%);
  backdrop-filter: blur(25px) saturate(1.5) brightness(0.8);
  padding: 120px 40px 40px 40px;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
  border-top: 1px solid rgba(255, 255, 255, 0.05);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
      circle at 30% 40%, 
      rgba(132, 0, 255, 0.05) 0%, 
      transparent 60%
    );
    pointer-events: none;
    z-index: 0;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.02) 0%,
      transparent 20%,
      transparent 80%,
      rgba(0, 0, 0, 0.1) 100%
    );
    pointer-events: none;
    z-index: 1;
  }
`;

const ContactContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  color: white;
  position: relative;
  z-index: 2;
`;

const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 40px;
  background: linear-gradient(135deg, 
    rgba(255, 255, 255, 0.08) 0%, 
    rgba(132, 0, 255, 0.05) 50%, 
    rgba(255, 255, 255, 0.06) 100%);
  padding: 40px;
  border-radius: 24px;
  backdrop-filter: blur(25px) saturate(1.5) brightness(1.1);
  border: 1px solid rgba(132, 0, 255, 0.2);
  box-shadow: 
    0 16px 50px rgba(132, 0, 255, 0.15),
    0 8px 25px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.15);
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
      rgba(132, 0, 255, 0.1),
      transparent
    );
    transition: left 0.8s ease;
    z-index: 0;
  }

  &:hover::before {
    left: 100%;
  }
`;

const FormField = styled.div`
  position: relative;
  z-index: 1;
`;

const FloatingInput = styled.input`
  width: 100%;
  padding: 18px 24px;
  background: linear-gradient(135deg, 
    rgba(255, 255, 255, 0.08) 0%, 
    rgba(132, 0, 255, 0.05) 50%, 
    rgba(255, 255, 255, 0.06) 100%);
  border: 1px solid rgba(132, 0, 255, 0.3);
  border-radius: 16px;
  color: white;
  font-size: 1rem;
  font-family: Arial, sans-serif;
  backdrop-filter: blur(15px) saturate(1.5);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-sizing: border-box;
  box-shadow: 
    0 4px 16px rgba(132, 0, 255, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  position: relative;
  z-index: 1;

  &:focus {
    outline: none;
    border-color: rgba(132, 0, 255, 0.6);
    background: linear-gradient(135deg, 
      rgba(255, 255, 255, 0.12) 0%, 
      rgba(132, 0, 255, 0.08) 50%, 
      rgba(255, 255, 255, 0.1) 100%);
    box-shadow: 
      0 0 30px rgba(132, 0, 255, 0.4),
      0 8px 25px rgba(132, 0, 255, 0.2),
      inset 0 0 25px rgba(132, 0, 255, 0.1),
      inset 0 1px 0 rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(20px) saturate(1.8) brightness(1.1);
    transform: translateY(-2px);
  }

  &:hover {
    border-color: rgba(132, 0, 255, 0.5);
    background: linear-gradient(135deg, 
      rgba(255, 255, 255, 0.1) 0%, 
      rgba(132, 0, 255, 0.06) 50%, 
      rgba(255, 255, 255, 0.08) 100%);
    box-shadow: 
      0 6px 20px rgba(132, 0, 255, 0.2),
      inset 0 1px 0 rgba(255, 255, 255, 0.15);
    transform: translateY(-1px);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }
`;

const FloatingTextarea = styled.textarea`
  width: 100%;
  padding: 18px 24px;
  background: linear-gradient(135deg, 
    rgba(255, 255, 255, 0.08) 0%, 
    rgba(132, 0, 255, 0.05) 50%, 
    rgba(255, 255, 255, 0.06) 100%);
  border: 1px solid rgba(132, 0, 255, 0.3);
  border-radius: 16px;
  color: white;
  font-size: 1rem;
  font-family: Arial, sans-serif;
  backdrop-filter: blur(15px) saturate(1.5);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-sizing: border-box;
  min-height: 120px;
  resize: vertical;
  box-shadow: 
    0 4px 16px rgba(132, 0, 255, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);

  &:focus {
    outline: none;
    border-color: rgba(132, 0, 255, 0.6);
    background: linear-gradient(135deg, 
      rgba(255, 255, 255, 0.12) 0%, 
      rgba(132, 0, 255, 0.08) 50%, 
      rgba(255, 255, 255, 0.1) 100%);
    box-shadow: 
      0 0 30px rgba(132, 0, 255, 0.4),
      0 8px 25px rgba(132, 0, 255, 0.2),
      inset 0 0 25px rgba(132, 0, 255, 0.1),
      inset 0 1px 0 rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(20px) saturate(1.8) brightness(1.1);
    transform: translateY(-2px);
  }

  &:hover {
    border-color: rgba(132, 0, 255, 0.5);
    background: linear-gradient(135deg, 
      rgba(255, 255, 255, 0.1) 0%, 
      rgba(132, 0, 255, 0.06) 50%, 
      rgba(255, 255, 255, 0.08) 100%);
    box-shadow: 
      0 6px 20px rgba(132, 0, 255, 0.2),
      inset 0 1px 0 rgba(255, 255, 255, 0.15);
    transform: translateY(-1px);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }
`;

const SubmitButton = styled.button`
  padding: 18px 36px;
  background: linear-gradient(135deg, 
    rgba(147, 51, 234, 0.9) 0%, 
    rgba(124, 58, 237, 0.8) 50%, 
    rgba(132, 0, 255, 0.9) 100%);
  border: 1px solid rgba(147, 51, 234, 0.4);
  border-radius: 16px;
  color: white;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(15px) saturate(1.5);
  box-shadow: 
    0 8px 32px rgba(147, 51, 234, 0.3),
    0 4px 16px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  position: relative;
  overflow: hidden;
  z-index: 1;

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
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: left 0.6s ease;
    z-index: -1;
  }

  &:hover {
    transform: translateY(-3px) scale(1.02);
    background: linear-gradient(135deg, 
      rgba(168, 85, 247, 0.95) 0%, 
      rgba(139, 92, 246, 0.9) 50%, 
      rgba(147, 51, 234, 0.95) 100%);
    border-color: rgba(168, 85, 247, 0.6);
    box-shadow: 
      0 16px 50px rgba(147, 51, 234, 0.5),
      0 8px 25px rgba(0, 0, 0, 0.2),
      inset 0 1px 0 rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(20px) saturate(1.8) brightness(1.1);

    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(-1px) scale(1.01);
  }
`;

// Social Media Section
const SocialMediaSection = styled.div`
  margin-top: 60px;
  padding: 40px;
  background: linear-gradient(135deg, 
    rgba(132, 0, 255, 0.08) 0%, 
    rgba(255, 255, 255, 0.04) 50%, 
    rgba(132, 0, 255, 0.06) 100%);
  border-radius: 24px;
  backdrop-filter: blur(15px) saturate(1.2) brightness(1.02);
  border: 1px solid rgba(132, 0, 255, 0.2);
  box-shadow: 
    0 4px 20px rgba(132, 0, 255, 0.08),
    0 2px 8px rgba(0, 0, 0, 0.05),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  position: relative;
  overflow: hidden;

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

  &:hover::before {
    left: 100%;
  }
`;

const SocialTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.95);
  margin-bottom: 20px;
  text-align: center;
  position: relative;
  z-index: 2;
`;

const SocialGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 15px;
  position: relative;
  z-index: 2;
`;

const SocialItem = styled.div`
  padding: 15px 20px;
  background: linear-gradient(135deg, 
    rgba(132, 0, 255, 0.05) 0%, 
    rgba(255, 255, 255, 0.02) 50%, 
    rgba(132, 0, 255, 0.04) 100%);
  border: 1px solid rgba(132, 0, 255, 0.15);
  border-radius: 12px;
  color: rgba(255, 255, 255, 0.9);
  text-align: center;
  font-weight: 500;
  backdrop-filter: blur(10px) saturate(1.1);
  transition: all 0.3s ease;
  box-shadow: 
    0 2px 8px rgba(132, 0, 255, 0.05),
    inset 0 1px 0 rgba(255, 255, 255, 0.08);

  &:hover {
    background: linear-gradient(135deg, 
      rgba(132, 0, 255, 0.08) 0%, 
      rgba(255, 255, 255, 0.04) 50%, 
      rgba(132, 0, 255, 0.06) 100%);
    border-color: rgba(132, 0, 255, 0.25);
    transform: translateY(-2px);
    box-shadow: 
      0 4px 12px rgba(132, 0, 255, 0.08),
      inset 0 1px 0 rgba(255, 255, 255, 0.12);
  }
`;

const features = [
  {
    title: "🌟 Instant AI Editing",
    description: "From raw footage to a finished masterpiece in minutes."
  },
  {
    title: "🎨 Style Customization",
    description: "Choose from cinematic, vlog, business, documentary, or social media formats."
  },
  {
    title: "🪄 Intelligent Enhancements",
    description: "Automatic color correction, noise reduction, and smooth transitions."
  },
  {
    title: "✂️ Smart Scene Detection",
    description: "Cuts and syncs perfectly to match flow and mood."
  },
  {
    title: "📝 Auto Subtitles & Captions",
    description: "Generate accurate captions instantly in multiple languages."
  },
  {
    title: "⚡ Cloud-Based Performance",
    description: "Edit anywhere, anytime — no heavy downloads."
  }
];

const aboutCards = [
  {
    title: "🤖 AI-Powered Platform",
    brief: "Advanced artificial intelligence that understands your creative vision",
    details: "Our proprietary AI technology analyzes thousands of editing styles and learns to replicate any creator's unique approach. It's not just automation - it's intelligent assistance that understands context, mood, and artistic intent to deliver professional-quality results."
  },
  {
    title: "🎬 Style Learning",
    brief: "Learn and replicate any editing style with precision",
    details: "Simply describe the style you want - 'Edit like Emma Chamberlain with casual pacing and jump cuts' - and our AI will analyze the requirements, understand the aesthetic, and deliver a fully edited video that matches that exact style perfectly."
  },
  {
    title: "⚡ Instant Results",
    brief: "From raw footage to polished video in minutes",
    details: "Upload your footage, select your preferred style, and let our AI handle everything - cutting, color correction, audio enhancement, transitions, and even thumbnail generation. What used to take hours now happens in minutes."
  },
  {
    title: "🎯 No Skills Required",
    brief: "Professional editing without the learning curve",
    details: "You don't need to learn complex editing software or techniques. Our platform makes professional-quality video editing accessible to everyone, regardless of their technical background or experience level."
  },
  {
    title: "☁️ Cloud-Based",
    brief: "Edit anywhere, anytime with powerful cloud processing",
    details: "Our cloud infrastructure provides unlimited processing power, so you can edit videos of any length or complexity without worrying about your device's capabilities. Access your projects from anywhere with an internet connection."
  },
  {
    title: "🚀 Smart Automation",
    brief: "Intelligent agent that acts on your behalf",
    details: "Unlike traditional platforms that give you tools, Imitate Labs is an AI agent that acts on your behalf. It understands your preferences, learns your style, and delivers exactly what you envision without manual intervention."
  }
];

const HeroSection = ({ mousePosition }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <HeroContainer>
      <ContentWrapper>
        {/* Main Hero */}
        <MainHeroSection>
          <TextContainer>
            <Title>Imitate Labs</Title>
            <Tagline>Empowering seamless video edits in the style you love</Tagline>
          </TextContainer>
          <Logo src="Group 6.png" alt="Imitate Labs Logo" />
        </MainHeroSection>

        {/* About Section */}
        <AboutSection id="about-section">
          <AboutContent>
            <SectionTitle>Edit Smarter. Create Faster.</SectionTitle>
            <SectionText>
              <p style={{ textAlign: 'center' }}>
                Our AI-powered video editing platform makes professional-quality editing available to everyone. Discover what makes Imitate Labs different.
              </p>
            </SectionText>
            
            <AboutGrid>
              {aboutCards.map((card, index) => (
                <AboutCard
                  key={index}
                  title={card.title}
                  brief={card.brief}
                  details={card.details}
                  index={index}
                  mousePosition={mousePosition}
                />
              ))}
            </AboutGrid>
          </AboutContent>
        </AboutSection>

        {/* Features Section */}
        <FeaturesSection id="features-section">
          <FeaturesContent>
            <SectionTitle>Features</SectionTitle>
            <SectionText>
              <p style={{ textAlign: 'center' }}>
                Experience the future of video editing with our intelligent AI agent that transforms your creative vision into reality.
              </p>
            </SectionText>
            
            <FeatureGrid>
              {features.map((feature, index) => (
                <FeatureCard
                  key={index}
                  title={feature.title}
                  description={feature.description}
                  index={index}
                  isActive={true}
                  mousePosition={mousePosition}
                />
              ))}
            </FeatureGrid>
          </FeaturesContent>
        </FeaturesSection>

        {/* Contact Section */}
        <ContactSection id="contact-section">
          <ContactContent>
            <SectionTitle>Contact Us</SectionTitle>
            
            <SocialMediaSection>
              <SocialTitle>Follow Us On</SocialTitle>
              <SocialGrid>
                <SocialItem>Discord</SocialItem>
                <SocialItem>Instagram</SocialItem>
                <SocialItem>Twitter/X</SocialItem>
                <SocialItem>YouTube</SocialItem>
                <SocialItem>TikTok</SocialItem>
                <SocialItem>LinkedIn</SocialItem>
              </SocialGrid>
            </SocialMediaSection>
          </ContactContent>
        </ContactSection>
      </ContentWrapper>
    </HeroContainer>
  );
};

export default HeroSection;
