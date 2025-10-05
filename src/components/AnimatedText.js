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

    // Set initial state - left to right animation
    gsap.set(chars, {
      opacity: 0,
      x: "-100%",
      transformOrigin: "0% 50%",
      transformStyle: "preserve-3d",
      filter: "blur(8px)"
    })

    // Create the main animation timeline with reduced delay
    const tl = gsap.timeline({
      delay: 0.2 // Reduced delay for faster loading
    })

    // Main reveal animation - left to right
    tl.to(chars, {
      opacity: 1,
      x: "0%",
      filter: "blur(0px)",
      duration: 0.8, // Faster animation
      ease: "power3.out",
      stagger: 0.04, // Faster stagger between letters
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
