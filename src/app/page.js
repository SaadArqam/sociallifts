"use client"

import React, { useState, useEffect, useRef } from 'react'
import { Waveform } from 'ldrs/react'
import 'ldrs/react/Waveform.css'
import { TiLocationArrow } from "react-icons/ti";
import Navbar from '../components/Navbar'
import AnimatedTitle from '@/components/AnimatedTitle'
import VideoSection from '../components/videosection'
import About from '../components/About'
import Footer from '../components/Footer'
import AnimatedStat from '../components/AnimatedStat'
import Link from 'next/link'
import Button from '../components/Button'
// import Contact from '../components/Contact'

const Page = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [scrollOpacity, setScrollOpacity] = useState(1)
  const whyUsSectionRef = useRef(null)
  const whyUsTitleRef = useRef(null)
  const [whyUsShiftY, setWhyUsShiftY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const windowHeight = window.innerHeight
      
      // Calculate opacity based on scroll position
      // Text starts fading immediately and becomes fully transparent after scrolling just 25% of viewport height
      const fadeDistance = windowHeight * 0.25
      const opacity = Math.max(0, 1 - (scrollY / fadeDistance))
      setScrollOpacity(opacity)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Reveal-on-scroll for stats section (throttled + one-time)
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll('[data-reveal]'))
    if (elements.length === 0) return

    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const viewportH = window.innerHeight || 0
        elements.forEach((el) => {
          if (el.dataset.revealed === 'true') return
          const rect = el.getBoundingClientRect()
          if (rect.top < viewportH * 0.92) {
            el.classList.add('is-visible')
            el.dataset.revealed = 'true'
          }
        })
        ticking = false
      })
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  // Parallax shift for "why lifts?" title
  useEffect(() => {
    const onScroll = () => {
      const section = whyUsSectionRef.current
      const title = whyUsTitleRef.current
      if (!section || !title) return

      const rect = section.getBoundingClientRect()
      const viewportH = window.innerHeight || 0

      // progress: 0 when section top hits bottom of viewport,
      // 1 around mid viewport; clamp with slight overshoot for punchier motion
      const start = viewportH * 0.9
      const end = viewportH * 0.1
      const raw = (start - rect.top) / (start - end)
      const progress = Math.max(0, Math.min(1.4, raw))

      // translate up to ~16vh for a faster feel
      const maxShiftPx = viewportH * 0.16
      const shift = -progress * maxShiftPx
      setWhyUsShiftY(shift)
    }

    onScroll()
    window.addEventListener('scroll', onScroll)
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  useEffect(() => {
    // Simulate loading time - you can adjust this or remove it if you want instant loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-[oklch(0.98_0.005_95)]">
        <Waveform
          size="35"
          stroke="3.5"
          speed="1"
          color="black" 
        />
      </div>
    )
  }

  return (
    <div>
      <style jsx>{`
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-10px);
          }
          60% {
            transform: translateY(-5px);
          }
        }
        .bounce-animation {
          animation: bounce 2s infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }
        .pulse-animation {
          animation: pulse 4s ease-in-out infinite;
        }
        .fade-up { opacity: 0; transform: translate3d(0, 20px, 0); transition: opacity 600ms ease, transform 600ms ease; }
        .is-visible { opacity: 1; transform: translate3d(0, 0, 0); }
      `}</style>
      <Navbar />
      <div className='h-[100vh] bg-red-600 flex flex-col items-center justify-center text-center'>
        <h1 className='font-coign uppercase text-white whitespace-pre-line leading-[0.8] tracking-[-0.015em] text-[38vw] md:text-[22vw] lg:text-[18vw] font-bold'>Social Lifts</h1>
        
        {/* Enhanced scroll indicator */}
        <div className='absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center'>
          <p 
            className='text-white/70 text-sm mb-2 bounce-animation'
            style={{ opacity: scrollOpacity, transition: 'opacity 0.3s ease-out' }}
          >
            Scroll Down
          </p>
          <div className='w-px h-8 bg-black/10 pulse-animation'></div>
        </div>
      </div>

      <div className='absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center'>
          <p 
            className='text-white/70 text-sm mb-2 bounce-animation'
            style={{ opacity: scrollOpacity, transition: 'opacity 0.3s ease-out' }}
          >
            Scroll Down
          </p>
          <div className='w-px h-8 bg-black/10 pulse-animation'></div>
        </div>

 
      <section id='about' className='w-full min-h-screen bg-[oklch(0.98_0.005_95)] flex flex-col items-center justify-center text-center px-6 md:px-8 lg:px-12'>
        {/* Top Symbol */}
        <div className='text-4xl md:text-5xl font-bold text-black mb-16 opacity-80 tracking-wide'>++</div>
        
        {/* Main Heading */}
      <AnimatedTitle
  title={`We design stories that<br />work as hard as they wow.`}
  containerClass="mt-5 text-black text-center text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-[1.15] tracking-wide max-w-4xl mx-auto mb-20"
/>


        {/* <h1 className='text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-black leading-[1.15] tracking-wide max-w-4xl mx-auto mb-20'>
          We design stories that<br />
          work as hard as they wow.
        </h1> */}
        
        {/* Descriptive Paragraph */}
        <div className='max-w-3xl mx-auto mb-24'>
          <p className='text-base md:text-lg lg:text-xl text-black leading-relaxed font-light tracking-wide'>
            Partnering with ambitious brands, startups, and creators worldwide,<br />
            we transform raw ideas into digital experiences that capture attention<br />
            and convert audiences. By uniting video, design, social, web, and SEO under one roof,<br />
            <span className='font-normal text-black-800'>we deliver consistent, data-driven creativity that builds presence, sparks engagement, and accelerates growth.</span>
          </p>
        </div>
        
        {/* Call-to-Action Button */}

<Button
  id="products-button"
  title="Book A call"
  href="/contact"
  target="_blank"
  rightIcon={<TiLocationArrow />}
  containerClass="bg-black text-white md:flex hidden items-center justify-center gap-1"
/>


      </section>
      {/* Metrics Section */}
      <section id='stats' className='w-full bg-[rgb(232,245,255)]/65 relative py-24 md:py-28'>
        <div
          className='absolute inset-0 pointer-events-none'
          style={{
            background:
              'radial-gradient(1200px 600px at 50% 0%, rgba(10,120,200,0.12), rgba(255,255,255,0))'
          }}
          aria-hidden
        />
            <div className='relative max-w-6xl mx-auto px-6 md:px-8 lg:px-10'>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-16'>
            <AnimatedStat number='12+' caption='Years Experience' />
            <AnimatedStat number='50+' caption='Brands Transformed' />
            <AnimatedStat number='14' caption='Categories Disrupted' />
            <AnimatedStat number='7+' caption='Countries Reached' />
            <AnimatedStat number='70%' caption='Repeat Clients' />
            <AnimatedStat number='3' caption='In-house Brands' />
          </div>
        </div>
      </section>
      {/* <About /> */}
      <VideoSection />
      <section id='whyUs' ref={whyUsSectionRef} className='w-full min-h-screen bg-[oklch(0.98_0.005_95)] px-6 md:px-8 lg:px-12 flex items-center'>
        <div className='w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start'>
          {/* Left giant headline */}
          <div className='text-left will-change-transform' ref={whyUsTitleRef} style={{ transform: `translate3d(0, ${whyUsShiftY}px, 0)`, transition: 'transform 50ms linear' }}>
            <h2 className='font-coign uppercase text-black leading-[0.8] tracking-[-0.02em] text-[32vw] md:text-[20vw] lg:text-[16vw]'>why</h2>
            <div className='-mt-6'>
              <h2 className='font-coign uppercase text-black leading-[0.8] tracking-[-0.02em] text-[32vw] md:text-[20vw] lg:text-[16vw]'>lifts?</h2>
            </div>
          </div>

          {/* Right copy block */}
          <div className='text-left max-w-md md:max-w-none mx-auto md:mx-0'>
            <div className='text-2xl font-bold text-black mb-6 opacity-80 tracking-wide'>++</div>
            <div className='space-y-6 text-sm md:text-base text-black leading-relaxed'>
              <p>
                Fueled by a mission to create work that hits you right in the feels.
              </p>
              <p>
                Lifts is led by seasoned design directors, driven by raw talent and a restless urge to shake the system.
              </p>
              <p>
                After a decade in the creative game, we saw the system for what it was: polished, predictable, and painfully hollow. Too much noise. Not enough meaning. So we built Lifts to do things differently.
              </p>
              <p>
                No cookie-cutter solutions here, just hands-on, thoughtful, heart-stirring work.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* <Contact /> */}
      <Footer />
    </div>
  )
}

export default Page
