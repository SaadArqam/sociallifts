import React from 'react'
import AnimatedTitle from './AnimatedTitle'

const About = () => {
  return (
    <section id='about' className='w-full min-h-screen flex flex-col items-center justify-start pt-24 px-4 relative overflow-hidden' style={{ backgroundColor: 'oklch(0.98 0.005 95)' }}>
      {/* Subtle dot pattern - more professional than grid lines */}
      <div
        className='absolute inset-0 opacity-[0.04]'
        style={{
          backgroundImage: `radial-gradient(circle, rgba(0,0,0,0.4) 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
          marginTop: '-1px'
        }}
      />
      
      {/* Subtle gradient overlay for depth */}
      <div className='absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[rgba(255,255,255,0.4)]'></div>
      
      <h1
        className='font-coign font-black uppercase text-black text-center whitespace-pre-line leading-[0.8] tracking-[-0.015em] text-[38vw] md:text-[22vw] lg:text-[18vw] relative z-10'
      >
        {`WORK THAT\nHITS YOU RIGHT\nIN THE FEELS`}
      </h1>
      <p className='max-w-3xl mx-auto mt-16 text-neutral-800 text-base md:text-lg leading-relaxed text-center relative z-10'>
        That's why we exist.
      </p>
    </section>
  )
}

export default About
