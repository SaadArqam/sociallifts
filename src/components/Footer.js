import React from 'react'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className='relative w-full bg-[oklch(0.98_0.005_95)] text-black overflow-hidden'>
      {/* Giant background word */}
      <div className='pointer-events-none select-none absolute inset-0 flex items-start justify-center'>
        <img
          src='/img/LIFTS.png'
          alt='LIFTS wordmark background'
          className='max-w-none h-[70vh] md:h-[78vh] lg:h-[85vh] w-auto object-contain opacity-90 -translate-y-[8%]'
          style={{
            WebkitMaskImage: 'linear-gradient(to bottom, black 42%, transparent 100%)',
            maskImage: 'linear-gradient(to bottom, black 42%, transparent 100%)'
          }}
        />
      </div>

      {/* extra white fade to mimic base glow */}
      <div
        aria-hidden
        className='pointer-events-none absolute inset-x-0 bottom-0 h-[55vh]'
        style={{
          background:
            'linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.75) 45%, rgba(255,255,255,1) 100%)'
        }}
      />

      {/* Foreground content */}
      <div className='relative z-10 max-w-6xl mx-auto px-6 md:px-8 lg:px-10'>
        <div className='relative pt-[50vh] pb-28'>
          {/* Centered 3-column block */}
          <div className='mx-auto w-full md:w-[70%] lg:w-[58%] grid grid-cols-3 gap-8 md:gap-10'>
            {/* Left links */}
            <div className='relative'>
              <div
                className='absolute inset-0 bg-white/55 backdrop-blur-md shadow-[0_8px_24px_rgba(0,0,0,0.08)] ring-1 ring-black/15'
                style={{
                  clipPath: 'polygon(4.5% 0, 95.5% 0, 100% 100%, 0 100%)',
                  borderRadius: '12px'
                }}
                aria-hidden
              />
              <div
                className='pointer-events-none absolute left-[3%] right-[3%] top-0 h-[1px] opacity-50'
                style={{
                  background:
                    'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 20%, rgba(255,255,255,0.8) 80%, rgba(255,255,255,0) 100%)'
                }}
                aria-hidden
              />
              <nav className='relative text-[13px] leading-relaxed tracking-wide space-y-3 px-6 py-5'>
                <Link href='/' className='block hover:opacity-80 hover:underline underline-offset-4'>Home</Link>
                <Link href='/#expertise' className='block hover:opacity-80 hover:underline underline-offset-4'>Expertise</Link>
                <Link href='/#work' className='block hover:opacity-80 hover:underline underline-offset-4'>Work</Link>
                <Link href='/about' className='block hover:opacity-80 hover:underline underline-offset-4'>About</Link>
              </nav>
            </div>
            {/* Middle links */}
            <div className='relative'>
              <div
                className='absolute inset-0 bg-white/55 backdrop-blur-md shadow-[0_8px_24px_rgba(0,0,0,0.08)] ring-1 ring-black/15'
                style={{
                  clipPath: 'polygon(4.5% 0, 95.5% 0, 100% 100%, 0 100%)',
                  borderRadius: '12px'
                }}
                aria-hidden
              />
              <div
                className='pointer-events-none absolute left-[3%] right-[3%] top-0 h-[1px] opacity-50'
                style={{
                  background:
                    'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 20%, rgba(255,255,255,0.8) 80%, rgba(255,255,255,0) 100%)'
                }}
                aria-hidden
              />
              <nav className='relative text-[13px] leading-relaxed tracking-wide space-y-3 px-6 py-5'>
                <Link href='/contact' className='block hover:opacity-80 hover:underline underline-offset-4'>Contact</Link>
                <span className='block opacity-90'>Fetus</span>
                <a href='https://instagram.com' target='_blank' rel='noreferrer' className='block hover:opacity-80 hover:underline underline-offset-4'>Instagram</a>
              </nav>
            </div>
            {/* Info */}
            <div className='relative'>
              <div
                className='absolute inset-0 bg-white/55 backdrop-blur-md shadow-[0_8px_24px_rgba(0,0,0,0.08)] ring-1 ring-black/15'
                style={{
                  clipPath: 'polygon(4.5% 0, 95.5% 0, 100% 100%, 0 100%)',
                  borderRadius: '12px'
                }}
                aria-hidden
              />
              <div
                className='pointer-events-none absolute left-[3%] right-[3%] top-0 h-[1px] opacity-50'
                style={{
                  background:
                    'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 20%, rgba(255,255,255,0.8) 80%, rgba(255,255,255,0) 100%)'
                }}
                aria-hidden
              />
              <div className='relative text-[13px] leading-relaxed tracking-wide space-y-1 px-6 py-5'>
                <div>contact.sociallifts@gmail.com</div>
                {/* <div>+91 9876543210</div> */}
                <div className='text-[12px] opacity-60'>© All rights reserved</div>
              </div>
            </div>
          </div>

          {/* CTA button on the right */}
          <div className='absolute right-4 md:right-6 lg:right-10 top-[calc(50vh+4px)]'>
            <Link
              href='/contact'
              className='inline-flex items-center justify-center h-9 px-6 rounded-full bg-black text-white text-xs font-medium hover:bg-neutral-800 transition shadow-md'
            >
              Book A Call
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer