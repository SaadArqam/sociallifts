"use client"
import React from 'react'
import ScrollStack from "./ScrollStack"
import { ScrollStackItem } from "./ScrollStack"


const AboutComp = () => {
    return (
        <section id='about' className='w-full min-h-screen py-20 bg-[oklch(0.98_0.005_95)] overflow-x-hidden'>
            <div className='w-full bg-[oklch(0.98_0.005_95)] text-black py-20 overflow-x-auto relative'>
                <div className='flex animate-scroll whitespace-nowrap'>
                    <h1 className='text-9xl md:text-[10rem] lg:text-[15rem] font-coign font-black uppercase tracking-wider text-black mr-8'>
                        The People. The Purpose. The Path ✧
                    </h1>
                    <h1 className='text-9xl md:text-[10rem] lg:text-[15rem] font-coign font-black uppercase tracking-wider text-black mr-8'>
                        The People. The Purpose. The Path ✧
                    </h1>
                    <h1 className='text-9xl md:text-[10rem] lg:text-[15rem] font-coign font-black uppercase tracking-wider text-black mr-8'>
                        The People. The Purpose. The Path ✧
                    </h1>
                    <h1 className='text-9xl md:text-[10rem] lg:text-[15rem] font-coign font-black uppercase tracking-wider text-black mr-8'>
                        The People. The Purpose. The Path ✧
                    </h1>
                    <h1 className='text-9xl md:text-[10rem] lg:text-[15rem] font-coign font-black uppercase tracking-wider text-black mr-8'>
                        The People. The Purpose. The Path ✧
                    </h1>
                    <h1 className='text-9xl md:text-[10rem] lg:text-[15rem] font-coign font-black uppercase tracking-wider text-black mr-8'>
                        The People. The Purpose. The Path ✧
                    </h1>
                </div>
            </div>
            
            <div className='relative w-full mt-20 overflow-visible'>
                {/* Small star in bottom left */}
                <div className='absolute bottom-0 left-0 w-6 h-6'>
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-black">
                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                    </svg>
                </div>
                
                {/* Description Section */}
                <div className='max-w-3xl ml-auto pr-8 md:pr-16'>
                    <div className='space-y-6'>
                        <p className='text-black text-lg md:text-xl leading-relaxed font-light font-serif tracking-wide'>
                            At Social Lifts, we believe growth shouldn&apos;t be chaotic. That&apos;s why we built a full-funnel creative and growth team under one roof—video editors, designers, social media strategists, web developers, and SEO experts all working as one seamless engine.
                        </p>
                        
                        <p className='text-black text-lg md:text-xl leading-relaxed font-light font-serif tracking-wide'>
                            No messy vendor handoffs. No scattered strategies. Just one brief, one strategy, and cohesive execution that fuels faster turnarounds, sharper campaigns, and smarter learning cycles.
                        </p>
                        
                        <p className='text-black text-lg md:text-xl leading-relaxed font-light font-serif tracking-wide'>
                            We craft creative that stops the scroll—cinematic edits, bold visuals, and platform-native content designed for today&apos;s fast-moving algorithms. With benefit-first messaging and engaging narratives, we don&apos;t just get attention, we keep it.
                        </p>
                        
                        <p className='text-black text-lg md:text-xl leading-relaxed font-light font-serif tracking-wide'>
                            Our mission is simple: help brands grow with clarity, consistency, and confidence.
                        </p>
                    </div>
                </div>
            </div>

            {/* Place the stack in a fixed-height container so the stack scrolls internally, not with the page */}
            <div
              className="w-full max-w-8xl mx-auto my-24 hide-scrollbar"
              style={{
                height: "600px",
                overflowY: "auto",
                scrollbarWidth: "none", // Firefox
                msOverflowStyle: "none" // IE/Edge
              }}
            >
              <div className="h-full">
                <ScrollStack>
                  <ScrollStackItem>
                    <h2>Card 1</h2>
                    <p>This is the first card in the stack</p>
                  </ScrollStackItem>
                  <ScrollStackItem>
                    <h2>Card 2</h2>
                    <p>This is the second card in the stack</p>
                  </ScrollStackItem>
                  <ScrollStackItem>
                    <h2>Card 3</h2>
                    <p>This is the third card in the stack</p>
                  </ScrollStackItem>
                </ScrollStack>
              </div>
            </div>
            <style jsx global>{`
                /* Hide scrollbar for Chrome, Safari and Opera */
                .hide-scrollbar::-webkit-scrollbar {
                  display: none;
                }
                /* Hide scrollbar for IE, Edge and Firefox */
                .hide-scrollbar {
                  -ms-overflow-style: none;  /* IE and Edge */
                  scrollbar-width: none;     /* Firefox */
                }
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

        </section>
    )
}

export default AboutComp
// export default AboutComp
