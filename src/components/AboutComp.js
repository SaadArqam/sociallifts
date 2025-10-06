"use client"
import React, { useLayoutEffect, useRef, useCallback } from 'react'
import Lenis from 'lenis'
import Footer from './Footer';

// Inline ScrollStack components so cards live in the same file
const ScrollStackItem = ({ children, itemClassName = '' }) => (
    <div
      className={`scroll-stack-card relative w-full h-auto min-h-[280px] my-8 p-12 rounded-[40px] shadow-[0_0_40px_rgba(0,0,0,0.08)] box-border origin-top will-change-transform bg-[oklch(1_0_0)] border border-[oklch(0.95_0.005_95)] ${itemClassName}`.trim()}
      style={{
        backfaceVisibility: 'hidden',
        transformStyle: 'preserve-3d',
        opacity: 1,
        transition: 'transform 0.5s ease-out, box-shadow 0.3s ease-out'
      }}>
      {children}
    </div>
);

const ScrollStack = ({
  children,
  className = '',
  itemDistance = 120,
  itemScale = 0.02,
  itemStackDistance = 25,
  stackPosition = '25%',
  scaleEndPosition = '15%',
  baseScale = 0.88,
  rotationAmount = 0,
  blurAmount = 0.5,
  useWindowScroll = false,
  onStackComplete
}) => {
  const scrollerRef = useRef(null);
  const stackCompletedRef = useRef(false);
  const animationFrameRef = useRef(null);
  const lenisRef = useRef(null);
  const cardsRef = useRef([]);
  const lastTransformsRef = useRef(new Map());
  const isUpdatingRef = useRef(false);

  const calculateProgress = useCallback((scrollTop, start, end) => {
    if (scrollTop < start) return 0;
    if (scrollTop > end) return 1;
    return (scrollTop - start) / (end - start);
  }, []);

  const parsePercentage = useCallback((value, containerHeight) => {
    if (typeof value === 'string' && value.includes('%')) {
      return (parseFloat(value) / 100) * containerHeight;
    }
    return parseFloat(value);
  }, []);

  const getScrollData = useCallback(() => {
    if (useWindowScroll) {
      return {
        scrollTop: window.scrollY,
        containerHeight: window.innerHeight,
        scrollContainer: document.documentElement
      };
    } else {
      const scroller = scrollerRef.current;
      return {
        scrollTop: scroller.scrollTop,
        containerHeight: scroller.clientHeight,
        scrollContainer: scroller
      };
    }
  }, [useWindowScroll]);

  const getElementOffset = useCallback(element => {
    if (useWindowScroll) {
      const rect = element.getBoundingClientRect();
      return rect.top + window.scrollY;
    } else {
      return element.offsetTop;
    }
  }, [useWindowScroll]);

  const updateCardTransforms = useCallback(() => {
    if (!cardsRef.current.length || isUpdatingRef.current) return;

    isUpdatingRef.current = true;

    const { scrollTop, containerHeight } = getScrollData();
    const stackPositionPx = parsePercentage(stackPosition, containerHeight);
    const scaleEndPositionPx = parsePercentage(scaleEndPosition, containerHeight);

    const endElement = useWindowScroll
      ? document.querySelector('.scroll-stack-end')
      : scrollerRef.current?.querySelector('.scroll-stack-end');

    const endElementTop = endElement ? getElementOffset(endElement) : 0;

    cardsRef.current.forEach((card, i) => {
      if (!card) return;

      const cardTop = getElementOffset(card);
      const triggerStart = cardTop - stackPositionPx - itemStackDistance * i;
      const triggerEnd = cardTop - scaleEndPositionPx;
      const pinStart = cardTop - stackPositionPx - itemStackDistance * i;
      const pinEnd = endElementTop - containerHeight / 2;

      const scaleProgress = calculateProgress(scrollTop, triggerStart, triggerEnd);
      const targetScale = baseScale + i * itemScale;
      // Enhanced easing for smoother scaling
      const easedProgress = 1 - Math.pow(1 - scaleProgress, 3);
      const scale = 1 - easedProgress * (1 - targetScale);
      const rotation = rotationAmount ? i * rotationAmount * easedProgress : 0;

      let blur = 0;
      if (blurAmount) {
        let topCardIndex = 0;
        for (let j = 0; j < cardsRef.current.length; j++) {
          const jCardTop = getElementOffset(cardsRef.current[j]);
          const jTriggerStart = jCardTop - stackPositionPx - itemStackDistance * j;
          if (scrollTop >= jTriggerStart) {
            topCardIndex = j;
          }
        }

        if (i < topCardIndex) {
          const depthInStack = topCardIndex - i;
          // Enhanced blur with exponential falloff for more natural depth
          blur = Math.max(0, depthInStack * blurAmount * Math.pow(0.8, depthInStack));
        }
      }

      let translateY = 0;
      const isPinned = scrollTop >= pinStart && scrollTop <= pinEnd;

      if (isPinned) {
        translateY = scrollTop - cardTop + stackPositionPx + itemStackDistance * i;
      } else if (scrollTop > pinEnd) {
        translateY = pinEnd - cardTop + stackPositionPx + itemStackDistance * i;
      }

      const newTransform = {
        translateY: Math.round(translateY * 100) / 100,
        scale: Math.round(scale * 10000) / 10000,
        rotation: Math.round(rotation * 100) / 100,
        blur: Math.round(blur * 100) / 100
      };

      const lastTransform = lastTransformsRef.current.get(i);
      const hasChanged =
        !lastTransform ||
        Math.abs(lastTransform.translateY - newTransform.translateY) > 0.05 ||
        Math.abs(lastTransform.scale - newTransform.scale) > 0.0001 ||
        Math.abs(lastTransform.rotation - newTransform.rotation) > 0.05 ||
        Math.abs(lastTransform.blur - newTransform.blur) > 0.05;

      if (hasChanged) {
        const transform = `translate3d(0, ${newTransform.translateY}px, 0) scale(${newTransform.scale}) rotate(${newTransform.rotation}deg)`;
        const filter = newTransform.blur > 0 ? `blur(${newTransform.blur}px)` : '';

        card.style.transform = transform;
        card.style.filter = filter;
        
        // Add subtle shadow enhancement based on stack position
        const shadowIntensity = Math.max(0.08, 0.08 - (i * 0.01));
        const shadowBlur = Math.max(30, 40 - (i * 2));
        card.style.boxShadow = `0 0 ${shadowBlur}px rgba(0,0,0,${shadowIntensity})`;

        lastTransformsRef.current.set(i, newTransform);
      }

      if (i === cardsRef.current.length - 1) {
        const isInView = scrollTop >= pinStart && scrollTop <= pinEnd;
        if (isInView && !stackCompletedRef.current) {
          stackCompletedRef.current = true;
          onStackComplete?.();
        } else if (!isInView && stackCompletedRef.current) {
          stackCompletedRef.current = false;
        }
      }
    });

    isUpdatingRef.current = false;
  }, [
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    rotationAmount,
    blurAmount,
    useWindowScroll,
    onStackComplete,
    calculateProgress,
    parsePercentage,
    getScrollData,
    getElementOffset
  ]);

  const handleScroll = useCallback(() => {
    updateCardTransforms();
  }, [updateCardTransforms]);

  const setupLenis = useCallback(() => {
    if (useWindowScroll) {
      const lenis = new Lenis({
        duration: 1.2,
        easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 2.5,
        infinite: false,
        wheelMultiplier: 1.5,
        lerp: 0.1,
        syncTouch: true,
        syncTouchLerp: 0.05
      });

      lenis.on('scroll', handleScroll);

      const raf = time => {
        lenis.raf(time);
        animationFrameRef.current = requestAnimationFrame(raf);
      };
      animationFrameRef.current = requestAnimationFrame(raf);

      lenisRef.current = lenis;
      return lenis;
    } else {
      const scroller = scrollerRef.current;
      if (!scroller) return;

      const lenis = new Lenis({
        wrapper: scroller,
        content: scroller.querySelector('.scroll-stack-inner'),
        duration: 1.4,
        easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 2.5,
        infinite: false,
        wheelMultiplier: 1.2,
        lerp: 0.08,
        syncTouch: true,
        syncTouchLerp: 0.05
      });

      lenis.on('scroll', handleScroll);

      const raf = time => {
        lenis.raf(time);
        animationFrameRef.current = requestAnimationFrame(raf);
      };
      animationFrameRef.current = requestAnimationFrame(raf);

      lenisRef.current = lenis;
      return lenis;
    }
  }, [handleScroll, useWindowScroll]);

  useLayoutEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const cards = Array.from(useWindowScroll
      ? document.querySelectorAll('.scroll-stack-card')
      : scroller.querySelectorAll('.scroll-stack-card'));

    cardsRef.current = cards;
    const transformsCache = lastTransformsRef.current;

    cards.forEach((card, i) => {
      if (i < cards.length - 1) {
        card.style.marginBottom = `${itemDistance}px`;
      }
      card.style.willChange = 'transform, filter';
      card.style.transformOrigin = 'top center';
      card.style.backfaceVisibility = 'hidden';
      card.style.transform = 'translateZ(0)';
      card.style.webkitTransform = 'translateZ(0)';
      card.style.perspective = '1000px';
      card.style.webkitPerspective = '1000px';
    });

    setupLenis();

    updateCardTransforms();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (lenisRef.current) {
        lenisRef.current.destroy();
      }
      stackCompletedRef.current = false;
      cardsRef.current = [];
      transformsCache.clear();
      isUpdatingRef.current = false;
    };
  }, [
    itemDistance,
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    rotationAmount,
    blurAmount,
    useWindowScroll,
    onStackComplete,
    setupLenis,
    updateCardTransforms
  ]);

  const containerStyles = useWindowScroll
    ? {
        overscrollBehavior: 'contain',
        WebkitOverflowScrolling: 'touch',
        WebkitTransform: 'translateZ(0)',
        transform: 'translateZ(0)'
      }
    : {
        overscrollBehavior: 'contain',
        WebkitOverflowScrolling: 'touch',
        scrollBehavior: 'smooth',
        WebkitTransform: 'translateZ(0)',
        transform: 'translateZ(0)',
        willChange: 'scroll-position'
      };

  const containerClassName = useWindowScroll
    ? `relative w-full ${className}`.trim()
    : `relative w-full h-full overflow-y-auto overflow-x-visible hide-scrollbar ${className}`.trim();

  return (
    <>
      <style jsx global>{`
        .hide-scrollbar {
          scrollbar-width: none; /* Firefox */
          -ms-overflow-style: none; /* IE and Edge */
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none; /* Chrome, Safari, Opera */
        }
        .scroll-stack-card {
          will-change: transform, filter;
          transform: translateZ(0);
          -webkit-transform: translateZ(0);
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          perspective: 1000px;
          -webkit-perspective: 1000px;
          transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.3s ease-out;
        }
        .scroll-stack-card:hover {
          box-shadow: 0 0 50px rgba(0,0,0,0.12) !important;
          transform: translateY(-5px) translateZ(0);
        }
        body {
          scroll-behavior: smooth;
        }
      `}</style>
      <div className={containerClassName} ref={scrollerRef} style={containerStyles}>
        <div className="scroll-stack-inner pt-[25vh] px-20 pb-[60rem] min-h-screen">
          {children}
          <div className="scroll-stack-end w-full h-px" />
        </div>
      </div>
    </>
  );
};


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
                            At Social Lifts, we believe growth shouldn&#39;t be chaotic. That&#39;s why we built a full-funnel creative and growth team under one roof—video editors, designers, social media strategists, web developers, and SEO experts all working as one seamless engine.
                        </p>
                        
                        <p className='text-black text-lg md:text-xl leading-relaxed font-light font-serif tracking-wide'>
                            No messy vendor handoffs. No scattered strategies. Just one brief, one strategy, and cohesive execution that fuels faster turnarounds, sharper campaigns, and smarter learning cycles.
                        </p>
                        
                        <p className='text-black text-lg md:text-xl leading-relaxed font-light font-serif tracking-wide'>
                            We craft creative that stops the scroll—cinematic edits, bold visuals, and platform-native content designed for today&#39;s fast-moving algorithms. With benefit-first messaging and engaging narratives, we don&#39;t just get attention, we keep it.
                        </p>
                        
                        <p className='text-black text-lg md:text-xl leading-relaxed font-light font-serif tracking-wide'>
                            Our mission is simple: help brands grow with clarity, consistency, and confidence.
                        </p>
                    </div>
                </div>
            </div>

            {/* Card stack that responds to global window scrolling */}
            <div
              className="w-full max-w-8xl mx-auto my-24"
            >
              <div className="h-full">
                <ScrollStack useWindowScroll={true} itemDistance={180} baseScale={0.92}>
                  {/* 01 */}
                  <ScrollStackItem>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-8 items-start'>
                      <div>
                        <div className='text-6xl md:text-7xl font-sans font-semibold tracking-tight text-black'>01</div>
                        <h2 className='mt-2 text-4xl md:text-5xl font-sans font-bold tracking-tight text-black'>We talk first</h2>
                      </div>
                      <div>
                        <p className='text-black text-lg md:text-xl leading-relaxed font-light font-serif tracking-wide'>
                          We don&#39;t start with strategy decks, we start with you. Over honest conversation, we explore your origin, your quirks, your why. What makes your heartbeat? What&#39;s not working? What do you wish people understood about you? This isn&#39;t about briefings or deliverables. No rush, no slide decks. Just truth.
                        </p>
                        <div className='mt-6 flex flex-wrap gap-3 items-center'>
                          <span className='px-4 py-2 rounded-full bg-green-100 text-green-900 text-sm'>Raw Notes</span>
                          <span className='px-4 py-2 rounded-full bg-purple-100 text-purple-900 text-sm'>Pain Points</span>
                          <span className='px-4 py-2 rounded-full bg-blue-100 text-blue-900 text-sm'>Project Intent</span>
                        </div>
                      </div>
                    </div>
                  </ScrollStackItem>

                  {/* 02 */}
                  <ScrollStackItem>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-8 items-start'>
                      <div>
                        <div className='text-6xl md:text-7xl font-sans font-semibold tracking-tight text-black'>02</div>
                        <h2 className='mt-2 text-4xl md:text-5xl font-sans font-bold tracking-tight text-black'>We find the thing</h2>
                      </div>
                      <div>
                        <p className='text-black text-lg md:text-xl leading-relaxed font-light font-serif tracking-wide'>
                          There’s always a center. A heartbeat. Sometimes it’s hiding behind market lingo or buried in a product roadmap. But it’s there. That truth at the core of what you do. This becomes our north star. The filter for every creative decision that follows.
                        </p>
                        <div className='mt-6 flex flex-wrap gap-3 items-center'>
                          <span className='px-4 py-2 rounded-full bg-green-100 text-green-900 text-sm'>Creative Brief</span>
                          <span className='px-4 py-2 rounded-full bg-purple-100 text-purple-900 text-sm'>Brand Position</span>
                          <span className='px-4 py-2 rounded-full bg-blue-100 text-blue-900 text-sm'>North Star</span>
                          <span className='px-4 py-2 rounded-full bg-amber-100 text-amber-900 text-sm'>Brand Strategy</span>
                        </div>
                      </div>
                    </div>
                  </ScrollStackItem>

                  {/* 03 */}
                  <ScrollStackItem>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-8 items-start'>
                      <div>
                        <div className='text-6xl md:text-7xl font-sans font-semibold tracking-tight text-black'>03</div>
                        <h2 className='mt-2 text-4xl md:text-5xl font-sans font-bold tracking-tight text-black'>We explore</h2>
                      </div>
                      <div>
                        <p className='text-black text-lg md:text-xl leading-relaxed font-light font-serif tracking-wide'>
                            Moodboards, Scrappy sketches, Chasing hunches. This is where we go radio silent, only because we&apos;re exploring things that might fail just to see what else shows up. This phase is messy, intuitive, and alive. It&apos;s about letting the idea stretch its legs before it settles into form.
                        </p>
                        <div className='mt-6 flex flex-wrap gap-3 items-center'>
                          <span className='px-4 py-2 rounded-full bg-green-100 text-green-900 text-sm'>Moodboards</span>
                          <span className='px-4 py-2 rounded-full bg-purple-100 text-purple-900 text-sm'>Experiments</span>
                          <span className='px-4 py-2 rounded-full bg-blue-100 text-blue-900 text-sm'>Design Explorations</span>
                        </div>
                      </div>
                    </div>
                  </ScrollStackItem>

                  {/* 04 */}
                  <ScrollStackItem>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-8 items-start'>
                      <div>
                        <div className='text-6xl md:text-7xl font-sans font-semibold tracking-tight text-black'>04</div>
                        <h2 className='mt-2 text-4xl md:text-5xl font-sans font-bold tracking-tight text-black'>We craft</h2>
                      </div>
                      <div>
                        <p className='text-black text-lg md:text-xl leading-relaxed font-light font-serif tracking-wide'>
                            The raw gets refined. We craft your brand&apos;s visual and verbal world: type, tone, color, story. Not just what looks good, but what feels true. Every decision earns its place.
                        </p>
                        <div className='mt-6 flex flex-wrap gap-3 items-center'>
                          <span className='px-4 py-2 rounded-full bg-green-100 text-green-900 text-sm'>Brand Identity</span>
                          <span className='px-4 py-2 rounded-full bg-purple-100 text-purple-900 text-sm'>Voice, Values</span>
                          <span className='px-4 py-2 rounded-full bg-blue-100 text-blue-900 text-sm'>Key Applications</span>
                        </div>
                      </div>
                    </div>
                  </ScrollStackItem>

                  {/* 05 */}
                  <ScrollStackItem>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-8 items-start'>
                      <div>
                        <div className='text-6xl md:text-7xl font-sans font-semibold tracking-tight text-black'>05</div>
                        <h2 className='mt-2 text-4xl md:text-5xl font-sans font-bold tracking-tight text-black'>We make it real</h2>
                      </div>
                      <div>
                        <p className='text-black text-lg md:text-xl leading-relaxed font-light font-serif tracking-wide'>
                          Together, we set your brand free, fully formed, beautifully wild. All the tools you need: delivered with care. Brand guidelines, assets, and the story that ties it all together.
                        </p>
                        <div className='mt-6 flex flex-wrap gap-3 items-center'>
                          <span className='px-4 py-2 rounded-full bg-green-100 text-green-900 text-sm'>Final Delivery</span>
                          <span className='px-4 py-2 rounded-full bg-purple-100 text-purple-900 text-sm'>Brand Guidelines</span>
                          <span className='px-4 py-2 rounded-full bg-blue-100 text-blue-900 text-sm'>Celebrations</span>
                        </div>
                      </div>
                    </div>
                  </ScrollStackItem>

                  {/* 06 */}
                  <ScrollStackItem>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-8 items-start'>
                      <div>
                        <div className='text-6xl md:text-7xl font-sans font-semibold tracking-tight text-black'>06</div>
                        <h2 className='mt-2 text-4xl md:text-5xl font-sans font-bold tracking-tight text-black'>Keep the flame</h2>
                      </div>
                      <div>
                        <p className='text-black text-lg md:text-xl leading-relaxed font-light font-serif tracking-wide'>
                          Branding isn&apos;t a one-night stand, it&apos;s a long-term relationship. If you want, we stick around. Whether it&apos;s evolving the brand, shaping campaigns, or just giving advice when things get weird, we&apos;re here.
                        </p>
                        <div className='mt-6 flex flex-wrap gap-3 items-center'>
                          <span className='px-4 py-2 rounded-full bg-green-100 text-green-900 text-sm'>New Beginnings</span>
                        </div>
                      </div>
                    </div>
                  </ScrollStackItem>
                </ScrollStack>
              </div>
            </div>

            {/* Let's work together section */}
            <div className="w-full max-w-6xl mx-auto my-32 px-8 py-24 rounded-[40px] bg-[#e6f3ff]">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-10 md:mb-0">
                        <h2 className="text-5xl md:text-6xl lg:text-7xl font-medium text-[#2d6cb5] mb-4">
                            Let&apos;s work<br />together
                        </h2>
                    </div>
                    <div className="flex flex-col items-start">
                        <button className="px-8 py-3 bg-black text-white rounded-full text-sm font-medium mb-6 hover:bg-[#2d6cb5] transition-colors duration-300">
                            Book A Call
                        </button>
                        <p className="text-sm text-gray-700">
                            or reach out to<br />
                            <a href="mailto:contact.sociallifts@gmail.com" className="font-medium">contact.sociallifts@gmail.com</a>
                        </p>
                    </div>
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

<Footer />
        </section>
    )
}

export default AboutComp
