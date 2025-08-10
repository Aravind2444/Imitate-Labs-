import React, { useState } from 'react';
import styled from 'styled-components';

const PageSection = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.95), rgba(20, 0, 40, 0.9));
  backdrop-filter: blur(10px);
  z-index: 10;
  opacity: ${props => props.isActive ? 1 : 0};
  visibility: ${props => props.isActive ? 'visible' : 'hidden'};
  transform: translateX(${props => props.isActive ? '0' : '100%'});
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  overflow-y: auto;
  padding: 120px 40px 40px 40px;
  box-sizing: border-box;
`;

const PageContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  color: white;
  opacity: ${props => props.isActive ? 1 : 0};
  transform: translateX(${props => props.isActive ? '0' : '50px'});
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
  opacity: ${props => props.isActive ? 1 : 0};
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

const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 40px;
`;

const FormField = styled.div`
  position: relative;
  opacity: ${props => props.isActive ? 1 : 0};
  transform: translateY(${props => props.isActive ? '0' : '20px'});
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  transition-delay: ${props => `${0.5 + props.index * 0.1}s`};
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
  min-height: 120px;
  resize: vertical;
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

const SubmitButton = styled.button`
  padding: 15px 30px;
  background: linear-gradient(45deg, rgba(132, 0, 255, 0.8), rgba(132, 0, 255, 0.6));
  border: 2px solid rgba(132, 0, 255, 0.4);
  border-radius: 10px;
  color: white;
  font-size: 1.1rem;
  font-weight: 600;
  font-family: Arial, sans-serif;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;

  &:hover {
    background: linear-gradient(45deg, rgba(132, 0, 255, 1), rgba(132, 0, 255, 0.8));
    border-color: rgba(132, 0, 255, 0.8);
    box-shadow: 
      0 5px 25px rgba(132, 0, 255, 0.4),
      inset 0 0 20px rgba(255, 255, 255, 0.1);
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transition: width 0.6s ease, height 0.6s ease;
  }

  &:active::before {
    width: 300px;
    height: 300px;
  }
`;

const ContactPage = ({ isActive, onClose }) => {
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
    // Handle form submission here
    console.log('Form submitted:', formData);
    // Add particle effect or success message
  };

  const formFields = [
    { name: 'name', type: 'text', placeholder: 'Your Name', component: FloatingInput },
    { name: 'email', type: 'email', placeholder: 'Your Email', component: FloatingInput },
    { name: 'subject', type: 'text', placeholder: 'Subject', component: FloatingInput },
    { name: 'message', type: 'textarea', placeholder: 'Your Message', component: FloatingTextarea }
  ];

  return (
    <PageSection isActive={isActive}>
      <CloseButton isActive={isActive} onClick={onClose}>
        &times;
      </CloseButton>
      <PageContent isActive={isActive}>
        <PageTitle>Contact Us</PageTitle>
        
        <ContactForm onSubmit={handleSubmit}>
          {formFields.map((field, index) => {
            const Component = field.component;
            return (
              <FormField key={field.name} isActive={isActive} index={index}>
                <Component
                  name={field.name}
                  type={field.type !== 'textarea' ? field.type : undefined}
                  placeholder={field.placeholder}
                  value={formData[field.name]}
                  onChange={handleChange}
                  required
                />
              </FormField>
            );
          })}
          
          <FormField isActive={isActive} index={formFields.length}>
            <SubmitButton type="submit">
              Send Message
            </SubmitButton>
          </FormField>
        </ContactForm>
      </PageContent>
    </PageSection>
  );
};

export default ContactPage;
