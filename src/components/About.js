import React from 'react'
import AnimatedTitle from './AnimatedTitle'

const About = () => {
  return (
    <section id='about' className='w-full min-h-screen bg-[oklch(0.98_0.005_95)] flex flex-col items-center justify-start pt-24 px-4'>
      
      <h1
        className='font-coign font-black uppercase text-black text-center whitespace-pre-line leading-[0.8] tracking-[-0.015em] text-[38vw] md:text-[22vw] lg:text-[18vw]'
      >
        {`WORK THAT\nHITS YOU RIGHT\nIN THE FEELS`}
      </h1>
      <p className='max-w-3xl mx-auto mt-16 text-neutral-800 text-base md:text-lg leading-relaxed text-center'>
        That’s why we exist.
      </p>
    </section>
  )
}

export default About
