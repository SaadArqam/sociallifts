"use client"

import React, { useState, useEffect } from 'react'
import { Waveform } from 'ldrs/react'
import 'ldrs/react/Waveform.css'
import Navbar from '../components/Navbar'
import VideoSection from '../components/videosection'
import About from '../components/About'
// import Contact from '../components/Contact'

const Page = () => {
  const [isLoading, setIsLoading] = useState(true)

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
      <Navbar />
      <div className='h-[100vh] bg-red-600 flex flex-col items-center justify-center text-center'>
        <h1 className='font-coign uppercase text-white whitespace-pre-line leading-[0.8] tracking-[-0.015em] text-[38vw] md:text-[22vw] lg:text-[18vw] font-bold'>Social Lifts</h1>
        <p className=' absolute bottom-6 mt-4 text-white'>Scroll Down</p>
      </div>
      <section id='about' className='w-full min-h-screen bg-white flex flex-col items-center justify-start pt-24 px-4'>
      <h1
        className='font-coign font-black uppercase text-black text-center whitespace-pre-line leading-[0.8] tracking-[-0.015em] text-[38vw] md:text-[22vw] lg:text-[18vw]'
      >
        {`WORK THAT\nHITS YOU RIGHT\nIN THE FEELS`}
      </h1>
      <p className='max-w-3xl mx-auto mt-16 text-neutral-800 text-base md:text-lg leading-relaxed text-center'>
        That&apos;s why we exist.
      </p>
    </section>
      {/* <About /> */}
      <VideoSection />
      {/* <Contact /> */}
    </div>
  )
}

export default Page
