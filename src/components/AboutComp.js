"use client"
import React from 'react'
import Footer from './Footer'

const AboutComp = () => {
    return (
        <section id='about' className='w-full min-h-screen py-20 bg-red-600'>
            <div className='w-full bg-red-600 text-white py-20 overflow-hidden relative'>
                <div className='flex animate-scroll whitespace-nowrap'>
                    <h1 className='text-9xl md:text-[10rem] lg:text-[15rem] font-coign font-black uppercase tracking-wider text-white mr-8'>
                        The People. The Purpose. The Path ✧
                    </h1>
                    <h1 className='text-9xl md:text-[10rem] lg:text-[15rem] font-coign font-black uppercase tracking-wider text-white mr-8'>
                        The People. The Purpose. The Path ✧
                    </h1>
                    <h1 className='text-9xl md:text-[10rem] lg:text-[15rem] font-coign font-black uppercase tracking-wider text-white mr-8'>
                        The People. The Purpose. The Path ✧
                    </h1>
                    <h1 className='text-9xl md:text-[10rem] lg:text-[15rem] font-coign font-black uppercase tracking-wider text-white mr-8'>
                        The People. The Purpose. The Path ✧
                    </h1>
                    <h1 className='text-9xl md:text-[10rem] lg:text-[15rem] font-coign font-black uppercase tracking-wider text-white mr-8'>
                        The People. The Purpose. The Path ✧
                    </h1>
                    <h1 className='text-9xl md:text-[10rem] lg:text-[15rem] font-coign font-black uppercase tracking-wider text-white mr-8'>
                        The People. The Purpose. The Path ✧
                    </h1>
                </div>
            </div>
            
            <div className='relative w-full mt-20'>
                {/* Small star in bottom left */}
                <div className='absolute bottom-0 left-0 w-6 h-6'>
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-black">
                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                    </svg>
                </div>
                
                {/* Description Section */}
                <div className='max-w-3xl ml-auto pr-8 md:pr-16'>
                    <div className='space-y-6'>
                        <p className='text-white text-lg md:text-xl leading-relaxed font-light font-serif tracking-wide'>
                            At Social Lifts, we believe growth shouldn&apos;t be chaotic. That&apos;s why we built a full-funnel creative and growth team under one roof—video editors, designers, social media strategists, web developers, and SEO experts all working as one seamless engine.
                        </p>
                        
                        <p className='text-white text-lg md:text-xl leading-relaxed font-light font-serif tracking-wide'>
                            No messy vendor handoffs. No scattered strategies. Just one brief, one strategy, and cohesive execution that fuels faster turnarounds, sharper campaigns, and smarter learning cycles.
                        </p>
                        
                        <p className='text-white text-lg md:text-xl leading-relaxed font-light font-serif tracking-wide'>
                            We craft creative that stops the scroll—cinematic edits, bold visuals, and platform-native content designed for today&apos;s fast-moving algorithms. With benefit-first messaging and engaging narratives, we don&apos;t just get attention, we keep it.
                        </p>
                        
                        <p className='text-white text-lg md:text-xl leading-relaxed font-light font-serif tracking-wide'>
                            Our mission is simple: help brands grow with clarity, consistency, and confidence.
                        </p>
                    </div>
                </div>
            </div>
            
            <style jsx>{`
                @keyframes scroll {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-50%);
                    }
                }
                
                .animate-scroll {
                    animation: scroll 20s linear infinite;
                }
            `}</style>
            <Footer />
        </section>
    )
}

export default AboutComp
