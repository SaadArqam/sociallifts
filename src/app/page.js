import React from 'react'
import Navbar from '../components/Navbar'
import VideoSection from '../components/videosection'
import About from '../components/About'

const page = () => {
  return (
    <div>
      <Navbar />
      <div className='h-[100vh] bg-red-600 flex flex-col items-center justify-center text-center'>
        <h1 className='font-coign uppercase text-white whitespace-pre-line leading-[0.8] tracking-[-0.015em] text-[38vw] md:text-[22vw] lg:text-[18vw] font-bold'>Social Lifts</h1>
        <p className='mt-4 text-white text-2xl font-bold'>Lift Off!</p>
      </div>
      <About />
      <VideoSection />
    </div>
  )
}

export default page
