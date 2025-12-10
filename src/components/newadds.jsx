import React, { useState, useRef, useEffect } from 'react';

export default function Marquee({
  children,
  direction = 'left',
  speed = 20, // lower = faster
  pauseOnHover = true,
  gradient = true,
  className = ''
}) {
  const [isPaused, setIsPaused] = useState(false);
  const marqueeRef = useRef(null);
  const [contentWidth, setContentWidth] = useState(0);

  // Measure content width dynamically
  useEffect(() => {
    if (marqueeRef.current) {
      setContentWidth(marqueeRef.current.scrollWidth);
    }
  }, [children]);

  return (
    <div
      className={`marquee-container ${className}`}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
    >
      <div
        className={`marquee-inner ${isPaused ? 'paused' : ''}`}
        style={{
          animation: `marquee ${speed}s linear infinite`,
          animationDirection: direction === 'right' ? 'reverse' : 'normal'
        }}
        ref={marqueeRef}
      >
        <div className="marquee-content">
          {children}
        </div>
        <div className="marquee-content" aria-hidden="true">
          {children}
        </div>
      </div>

      {gradient && (
        <>
          <div className="gradient-left"></div>
          <div className="gradient-right"></div>
        </>
      )}

      <style jsx>{`
        .marquee-container {
          position: relative;
          overflow: hidden;
          width: 100%;
        }

        .marquee-inner {
          display: flex;
          width: max-content;
        }

        .marquee-inner.paused {
          animation-play-state: paused;
        }

        .marquee-content {
          flex-shrink: 0;
          display: flex;
        }

        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .gradient-left,
        .gradient-right {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 100px;
          pointer-events: none;
          z-index: 2;
        }

        .gradient-left {
          left: 0;
          background: linear-gradient(to right, #fff, transparent);
        }

        .gradient-right {
          right: 0;
          background: linear-gradient(to left, #fff, transparent);
        }

        @media (max-width: 768px) {
          .gradient-left,
          .gradient-right {
            width: 50px;
          }
        }
      `}</style>
    </div>
  );
}
