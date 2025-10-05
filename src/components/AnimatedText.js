"use client"
import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'

const AnimatedText = ({ 
  text, 
  className = '', 
  delay = 0,
  stagger = 0.1,
  duration = 1.2,
  ease = "power4.out"
}) => {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    const chars = containerRef.current.querySelectorAll('.animated-char')
    if (chars.length === 0) return

    // Set initial state - exactly matching Bykins.com
    gsap.set(chars, {
      opacity: 0,
      y: "120%",
      rotateX: -90,
      transformOrigin: "50% 100%",
      transformStyle: "preserve-3d",
      filter: "blur(20px)"
    })

    // Create the main animation timeline
    const tl = gsap.timeline({
      delay: delay
    })

    // Main reveal animation - exactly matching Bykins.com
    tl.to(chars, {
      opacity: 1,
      y: "0%",
      rotateX: 0,
      filter: "blur(0px)",
      duration: duration,
      ease: "power2.out", // Bykins uses power2 for smoother animation
      stagger: stagger,
      transformOrigin: "50% 50% 0"
    })

  }, [delay, stagger, duration, ease])

  // Split text into characters and wrap each in a span - exactly like Bykins.com
  const renderChars = () => {
    // Split the text into individual characters
    return text.split('').map((char, index) => (
      <span 
        key={index}
        className="animated-char inline-block will-change-transform"
        style={{
          backfaceVisibility: 'hidden',
          transformStyle: 'preserve-3d',
          display: 'inline-block',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  return (
    <div 
      ref={containerRef} 
      className={`${className} overflow-hidden`}
      style={{
        perspective: '1200px',
        transformStyle: 'preserve-3d',
        display: 'inline-block'
      }}
    >
      {renderChars()}
    </div>
  )
}

export default AnimatedText
