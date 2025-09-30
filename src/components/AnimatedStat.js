'use client'

import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'

gsap.registerPlugin(ScrollTrigger)

const AnimatedStat = ({ number, caption, className = '' }) => {
  const wrapperRef = useRef(null)

  useEffect(() => {
    const el = wrapperRef.current
    if (!el) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none',
        markers: false
      }
    })

    tl.fromTo(
      el.querySelector('.stat-number'),
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }
    )
    tl.fromTo(
      el.querySelector('.stat-caption'),
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
      '-=0.3'
    )
  }, [])

  return (
    <div ref={wrapperRef} className={`text-center sm:text-left ${className}`}>
      <div className='stat-number text-black font-normal leading-none tracking-[-0.02em] text-[18vw] sm:text-8xl md:text-9xl'>
        {number}
      </div>
      <div className='stat-caption mt-2 text-black text-sm md:text-base'>{caption}</div>
    </div>
  )
}

export default AnimatedStat


