import React from 'react'
import Footer from './Footer'

const Contact = () => {
  return (
    <section id='contact' className='w-full min-h-screen py-32 bg-[oklch(0.98_0.005_95)]'>
      {/* Background decoration */}
      <div className='absolute top-20 left-10 w-8 h-8 opacity-30'>
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-black">
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
        </svg>
      </div>
      
      <div className="max-w-6xl mx-auto px-6 md:px-8 relative">
        {/* Hero heading with enhanced size */}
        <h1 className='font-coign uppercase text-black text-center leading-[0.85] tracking-[-0.02em] text-[20vw] md:text-[15vw] lg:text-[12vw]'>
          We&apos;re All Ears
        </h1>
        <p className='mt-6 text-center text-neutral-600 text-lg md:text-xl max-w-2xl mx-auto'>
          Fill out the contact form below and tell us about your vision. We&apos;re excited to hear from you!
        </p>

        {/* Enhanced card form */}
        <div className='mt-16 bg-black/[0.04] rounded-3xl p-8 md:p-10 shadow-lg ring-1 ring-black/5 backdrop-blur-sm'>
          <form action="https://formsubmit.co/contact.sociallifts@gmail.com" method="POST" className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            <div className='flex flex-col'>
              <label className='text-sm font-medium text-neutral-700 mb-2'>Name</label>
              <input 
                className='h-12 rounded-xl border border-black/10 bg-[oklch(1_0_0)] px-4 outline-none focus:border-black/30 focus:ring-2 focus:ring-black/5 transition-all' 
                type="text" 
                name="name" 
                placeholder='Will Smith' 
              />
            </div>
            <div className='flex flex-col'>
              <label className='text-sm font-medium text-neutral-700 mb-2'>Email</label>
              <input 
                className='h-12 rounded-xl border border-black/10 bg-[oklch(1_0_0)] px-4 outline-none focus:border-black/30 focus:ring-2 focus:ring-black/5 transition-all' 
                type="email" 
                name="email" 
                placeholder='will@company.com' 
              />
            </div>
            <div className='flex flex-col'>
              <label className='text-sm font-medium text-neutral-700 mb-2'>Phone</label>
              <input 
                className='h-12 rounded-xl border border-black/10 bg-[oklch(1_0_0)] px-4 outline-none focus:border-black/30 focus:ring-2 focus:ring-black/5 transition-all' 
                type="tel" 
                name="phone" 
                placeholder='+1 (555) 123-4567' 
              />
            </div>
            <div className='flex flex-col'>
              <label className='text-sm font-medium text-neutral-700 mb-2'>Company</label>
              <input 
                className='h-12 rounded-xl border border-black/10 bg-[oklch(1_0_0)] px-4 outline-none focus:border-black/30 focus:ring-2 focus:ring-black/5 transition-all' 
                type="text" 
                name="company" 
                placeholder='Company Name' 
              />
            </div>
            <div className='flex flex-col md:col-span-2'>
              <label className='text-sm font-medium text-neutral-700 mb-2'>About Your Project</label>
              <textarea 
                className='rounded-2xl border border-black/10 bg-[oklch(1_0_0)] px-4 py-3 outline-none focus:border-black/30 focus:ring-2 focus:ring-black/5 transition-all min-h-[180px]' 
                name="message" 
                placeholder="Tell us about your project goals, timeline, and any specific requirements you have in mind..."
              />
            </div>
            <div className='md:col-span-2 flex justify-center md:justify-start'>
              <button 
                className='h-12 px-8 rounded-full bg-black text-white text-base font-semibold hover:bg-neutral-800 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5' 
                type="submit"
              >
                Submit Request
              </button>
            </div>
          </form>
        </div>

        {/* Enhanced reach out section */}
        <div className='max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 mt-20 mb-16'>
          <div>
            <h3 className='text-3xl md:text-4xl font-bold text-black mb-4'>Or reach out directly</h3>
            <p className='text-neutral-600 max-w-md'>
              Prefer to connect directly? Feel free to reach out through any of these channels.
            </p>
          </div>
          <div className='text-neutral-900 space-y-4 flex flex-col justify-center'>
            <div className='flex items-center gap-3'>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              <p className='text-lg'>contact.sociallifts@gmail.com</p>
            </div>
            <div className='flex items-center gap-3'>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              <p className='text-lg'>+91 9970271026</p>
            </div>
            <div className='flex items-center gap-3'>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M14.243 5.757a6 6 0 10-.986 9.284 1 1 0 111.087 1.678A8 8 0 1118 10a3 3 0 01-4.8 2.401A4 4 0 1114 10a1 1 0 102 0c0-1.537-.586-3.07-1.757-4.243zM12 10a2 2 0 10-4 0 2 2 0 004 0z" clipRule="evenodd" />
              </svg>
              <a href="https://linkedin.com/company/sociallifts" target="_blank" rel="noopener noreferrer" className='text-lg hover:underline'>LinkedIn</a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Background decoration */}
      <div className='absolute bottom-40 right-10 w-12 h-12 opacity-20'>
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-black">
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
        </svg>
      </div>
      
      <Footer />
    </section>
  )
}

export default Contact
