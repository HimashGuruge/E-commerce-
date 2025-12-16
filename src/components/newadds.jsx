import React, { useState, useRef, useEffect } from 'react';

export default function Marquee({ 
  children, 
  direction = 'left',
  speed = 50,
  pauseOnHover = true,
  gradient = true,
  className = ''
}) {
  const [isPaused, setIsPaused] = useState(false);
  const marqueeRef = useRef(null);

  // Get keyframes based on direction
  const getKeyframes = () => {
    if (direction === 'right') {
      return `
        @keyframes marquee {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `;
    } else {
      return `
        @keyframes marquee {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
      `;
    }
  };

  const containerStyle = {
    position: 'relative',
    overflow: 'hidden',
    width: '100%',
  };

  const innerStyle = {
    display: 'flex',
    width: 'max-content',
    whiteSpace: 'nowrap',
    animation: `marquee ${speed}s linear infinite`,
    animationPlayState: isPaused ? 'paused' : 'running',
  };

  const contentStyle = {
    flexShrink: 0,
    display: 'flex',
  };

  const gradientStyle = {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: '100px',
    pointerEvents: 'none',
    zIndex: 2,
  };

  const gradientLeftStyle = {
    ...gradientStyle,
    left: 0,
    background: 'linear-gradient(to right, white, transparent)',
  };

  const gradientRightStyle = {
    ...gradientStyle,
    right: 0,
    background: 'linear-gradient(to left, white, transparent)',
  };

  return (
    <div 
      className={className}
      style={containerStyle}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
    >
      <style>{getKeyframes()}</style>
      
      <div 
        style={innerStyle}
        ref={marqueeRef}
      >
        <div style={contentStyle}>
          {children}
        </div>
        <div style={contentStyle} aria-hidden="true">
          {children}
        </div>
      </div>
      
      {gradient && (
        <>
          <div style={gradientLeftStyle}></div>
          <div style={gradientRightStyle}></div>
        </>
      )}
    </div>
  );
}