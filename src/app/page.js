import React from 'react'
import Navbar from '../components/Navbar'
import VideoSection from '../components/videosection'
import About from '../components/About'
// import Contact from '../components/Contact'

const page = () => {
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
        That’s why we exist.
      </p>
    </section>
      {/* <About /> */}
      <VideoSection />
      {/* <Contact /> */}
    </div>
  )
}

export default page
