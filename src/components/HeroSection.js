import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import FeatureCard from './FeatureCard';

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
  background: linear-gradient(135deg, rgba(20, 0, 40, 0.95), rgba(40, 0, 80, 0.9));
  backdrop-filter: blur(10px);
  padding: 120px 40px 40px 40px;
  box-sizing: border-box;
`;

const ContactContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  color: white;
`;

const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 40px;
`;

const FormField = styled.div`
  position: relative;
`;

const FloatingInput = styled.input`
  width: 100%;
  padding: 15px 20px;
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid rgba(132, 0, 255, 0.2);
  border-radius: 10px;
  color: white;
  font-size: 1rem;
  font-family: Arial, sans-serif;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: rgba(132, 0, 255, 0.6);
    box-shadow: 
      0 0 20px rgba(132, 0, 255, 0.3),
      inset 0 0 20px rgba(132, 0, 255, 0.1);
    background: rgba(255, 255, 255, 0.08);
  }

  &:hover {
    border-color: rgba(132, 0, 255, 0.4);
    box-shadow: 0 0 15px rgba(132, 0, 255, 0.2);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

const FloatingTextarea = styled.textarea`
  width: 100%;
  padding: 15px 20px;
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid rgba(132, 0, 255, 0.2);
  border-radius: 10px;
  color: white;
  font-size: 1rem;
  font-family: Arial, sans-serif;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  box-sizing: border-box;
  min-height: 120px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: rgba(132, 0, 255, 0.6);
    box-shadow: 
      0 0 20px rgba(132, 0, 255, 0.3),
      inset 0 0 20px rgba(132, 0, 255, 0.1);
    background: rgba(255, 255, 255, 0.08);
  }

  &:hover {
    border-color: rgba(132, 0, 255, 0.4);
    box-shadow: 0 0 15px rgba(132, 0, 255, 0.2);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

const SubmitButton = styled.button`
  padding: 15px 30px;
  background: linear-gradient(135deg, #9333ea, #7c3aed);
  border: none;
  border-radius: 10px;
  color: white;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(147, 51, 234, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(147, 51, 234, 0.4);
    background: linear-gradient(135deg, #a855f7, #8b5cf6);
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
              <p>
                Our AI-powered video editing platform makes professional-quality editing available to everyone. Just upload your footage, pick your preferred style, and let our advanced AI handle the rest — cutting, enhancing, and styling your video to perfection. No editing skills required, no complicated tools — just your story, elevated.
              </p>
            </SectionText>
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
            
            <ContactForm onSubmit={handleSubmit}>
              <FormField>
                <FloatingInput
                  name="name"
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </FormField>
              
              <FormField>
                <FloatingInput
                  name="email"
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </FormField>
              
              <FormField>
                <FloatingInput
                  name="subject"
                  type="text"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </FormField>
              
              <FormField>
                <FloatingTextarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </FormField>
              
              <SubmitButton type="submit">Send Message</SubmitButton>
            </ContactForm>
          </ContactContent>
        </ContactSection>
      </ContentWrapper>
    </HeroContainer>
  );
};

export default HeroSection;
