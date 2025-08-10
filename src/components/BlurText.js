import React, { useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';

const showText = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const showChar = keyframes`
  0% {
    opacity: 0;
    transform: translateY(20px);
    filter: blur(10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
    filter: blur(0);
  }
`;

const BlurTextContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 3;
  opacity: 0;
  color: white;
  font-size: 2.5rem;
  font-family: Arial, sans-serif;
  font-weight: 600;
  text-align: center;
  max-width: 80%;
  line-height: 1.2;
  animation: ${showText} 2s ease-out forwards;
  animation-delay: 0.5s;

  span {
    display: inline-block;
    opacity: 0;
    transform: translateY(20px);
    filter: blur(10px);
    animation: ${showChar} 0.5s ease-out forwards;
  }
`;

const BlurText = ({ text }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Clear container
    container.innerHTML = '';

    // Split by words and create spans for each character
    text.split(' ').forEach((word, wordIndex) => {
      word.split('').forEach((char, charIndex) => {
        const span = document.createElement('span');
        span.textContent = char;
        
        // Set animation delay for staggered effect
        const totalDelay = (wordIndex * 5 + charIndex) * 0.1;
        span.style.animationDelay = `${0.5 + totalDelay}s`;
        container.appendChild(span);
      });
      
      if (wordIndex < text.split(' ').length - 1) {
        container.appendChild(document.createTextNode(' '));
      }
    });
  }, [text]);

  return <BlurTextContainer ref={containerRef} />;
};

export default BlurText;
