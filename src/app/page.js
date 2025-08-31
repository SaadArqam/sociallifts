"use client"

import React, { useState, useEffect } from 'react'
import { Waveform } from 'ldrs/react'
import 'ldrs/react/Waveform.css'
import Navbar from '../components/Navbar'
import VideoSection from '../components/videosection'
import About from '../components/About'
import Footer from '../components/Footer'
import Link from 'next/link'
// import Contact from '../components/Contact'

const Page = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [scrollOpacity, setScrollOpacity] = useState(1)

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

  useEffect(() => {
    // Simulate loading time - you can adjust this or remove it if you want instant loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-white">
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
          <div className='w-px h-8 bg-white/30 pulse-animation'></div>
        </div>
      </div>
      <section id='about' className='w-full min-h-screen bg-red-600 flex flex-col items-center justify-center text-center px-6 md:px-8 lg:px-12'>
        {/* Top Symbol */}
        <div className='text-4xl md:text-5xl font-bold text-black mb-16 opacity-80 tracking-wide'>++</div>
        
        {/* Main Heading */}
        <h1 className='text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white-500 leading-[1.15] tracking-wide max-w-4xl mx-auto mb-20'>
          We design stories that<br />
          work as hard as they wow.
        </h1>
        
        {/* Descriptive Paragraph */}
        <div className='max-w-3xl mx-auto mb-24'>
          <p className='text-base md:text-lg lg:text-xl text-white-600 leading-relaxed font-light tracking-wide'>
            Partnering with ambitious brands, startups, and creators worldwide,<br />
            we transform raw ideas into digital experiences that capture attention<br />
            and convert audiences. By uniting video, design, social, web, and SEO under one roof,<br />
            <span className='font-normal text-white-800'>we deliver consistent, data-driven creativity that builds presence, sparks engagement, and accelerates growth.</span>
          </p>
        </div>
        
        {/* Call-to-Action Button */}
        <Link href='/contact'>
          <button className='px-8 py-4 bg-black text-white hover:cursor-pointer font-medium text-base rounded-lg hover:bg-gray-800 transition-all duration-300'>
            Book a Call
          </button>
        </Link>
      </section>
      {/* <About /> */}
      <VideoSection />
      {/* <Contact /> */}
      <Footer />
    </div>
  )
}

export default Page
