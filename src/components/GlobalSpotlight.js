import React from 'react';
import styled from 'styled-components';

const Spotlight = styled.div.attrs(props => ({
  style: {
    opacity: props.$isVisible ? props.$opacity : 0,
    left: `${props.$x}px`,
    top: `${props.$y}px`
  }
}))`
  position: fixed;
  width: 800px;
  height: 800px;
  border-radius: 50%;
  pointer-events: none;
  background: radial-gradient(circle,
    rgba(132, 0, 255, 0.15) 0%,
    rgba(132, 0, 255, 0.08) 15%,
    rgba(132, 0, 255, 0.04) 25%,
    rgba(132, 0, 255, 0.02) 40%,
    rgba(132, 0, 255, 0.01) 65%,
    transparent 70%
  );
  z-index: 200;
  transform: translate(-50%, -50%);
  mix-blend-mode: screen;
  transition: opacity 0.3s ease;
`;

const GlobalSpotlight = ({ mousePosition, isVisible }) => {
  if (!mousePosition) return null;

  return (
    <Spotlight
      $x={mousePosition.x}
      $y={mousePosition.y}
      $isVisible={isVisible}
      $opacity={0.8}
    />
  );
};

export default GlobalSpotlight;
