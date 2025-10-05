import React from 'react'
import AnimatedTitle from './AnimatedTitle'

const About = () => {
  return (
    <section id='about' className='w-full min-h-screen flex flex-col items-center justify-start pt-24 px-4 relative overflow-hidden' style={{ backgroundColor: 'oklch(0.98 0.005 95)' }}>
      {/* Soft grid pattern that continues from landing page - no border */}
      <div
        className='absolute inset-0 opacity-[0.06]'
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(0,0,0,0.6) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.6) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          marginTop: '-1px' // Remove the border line by offsetting the grid
        }}
      />
      
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
