'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

const DEFAULT_VIDEOS = [
  '/videos/vid1.mp4',
  '/videos/vid2.mp4',
  '/videos/vid3.mp4',
  '/videos/vid4.mp4',
  '/videos/vid5.mp4'
];

const VideoSection = ({ sources }) => {
  const baseSources = useMemo(() => (Array.isArray(sources) && sources.length ? sources : DEFAULT_VIDEOS), [sources]);
  // create a long looping rail so there are items on both left and right
  const videoSources = useMemo(() => {
    const repeats = 6; // ample items on both sides
    const list = [];
    for (let r = 0; r < repeats; r += 1) {
      list.push(...baseSources);
    }
    return list;
  }, [baseSources]);

  const railRef = useRef(null);
  const itemRefs = useRef([]);
  const previewRefs = useRef([]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [playingMap, setPlayingMap] = useState(() => new Map());

  useEffect(() => {
    // try to autoplay previews
    previewRefs.current.forEach((vid) => {
      if (!vid) return;
      const p = vid.play();
      if (p && typeof p.then === 'function') p.catch(() => {});
    });
    setPlayingMap(new Map(videoSources.map((_, i) => [i, true])));
    const initialCenterIndex = Math.floor(videoSources.length / 2);
    setCurrentIndex(initialCenterIndex);
    const id = setTimeout(() => scrollToIndex(initialCenterIndex), 0);
    return () => clearTimeout(id);
  }, [videoSources]);

  const computeCurrentIndex = () => {
    const container = railRef.current;
    if (!container) return;
    const containerCenter = container.scrollLeft + container.clientWidth / 2;
    let closestIndex = 0;
    let closestDist = Infinity;
    itemRefs.current.forEach((el, i) => {
      if (!el) return;
      const itemCenter = el.offsetLeft + el.offsetWidth / 2;
      const dist = Math.abs(itemCenter - containerCenter);
      if (dist < closestDist) {
        closestDist = dist;
        closestIndex = i;
      }
    });
    setCurrentIndex(closestIndex);
  };

  useEffect(() => {
    computeCurrentIndex();
    const container = railRef.current;
    if (!container) return;
    const onScroll = () => computeCurrentIndex();
    container.addEventListener('scroll', onScroll, { passive: true });
    return () => container.removeEventListener('scroll', onScroll);
  }, [videoSources.length]);

  useEffect(() => {
    let resizeTimer;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => scrollToIndex(currentIndex), 120);
    };
    window.addEventListener('resize', onResize, { passive: true });
    return () => {
      window.removeEventListener('resize', onResize);
      clearTimeout(resizeTimer);
    };
  }, [currentIndex]);

  const scrollByAmount = (amount) => {
    if (!railRef.current) return;
    railRef.current.scrollBy({ left: amount, behavior: 'smooth' });
  };

  const scrollToIndex = (index) => {
    if (!railRef.current || !itemRefs.current[index]) return;
    const container = railRef.current;
    const item = itemRefs.current[index];
    const containerCenter = container.clientWidth / 2;
    const itemCenter = item.offsetLeft + item.offsetWidth / 2;
    const targetLeft = itemCenter - containerCenter;
    container.scrollTo({ left: targetLeft, behavior: 'smooth' });
  };

  const togglePreviewPlay = (index) => {
    const vid = previewRefs.current[index];
    if (!vid) return;
    const isPlaying = !vid.paused;
    if (isPlaying) vid.pause(); else vid.play().catch(() => {});
    setPlayingMap((prev) => {
      const next = new Map(prev);
      next.set(index, !isPlaying);
      return next;
    });
  };

  return (
    <>
      <section id='work' className="w-full pt-16 pb-12 bg-[oklch(0.98_0.005_95)] text-black">
        <div className="text-center mb-[22px]">
          <h1 className="font-black tracking-[-0.02em] text-[clamp(40px,9vw,96px)] leading-[0.9] m-0">Work</h1>
          <p className="text-black/75 text-[clamp(14px,2.2vw,18px)] mt-[10px]">Explore my video editing work and projects</p>
        </div>
        <div className="relative flex items-center justify-center">
          {/* Desktop Instagram-style left/right scroll buttons, circular design, near center */}
          <button
            className="hidden md:flex absolute left-[38%] top-1/2 -translate-y-1/2 z-30 w-10 h-10 bg-black/70 hover:bg-black/90 transition rounded-full items-center justify-center shadow-lg border-2 border-white"
            type="button"
            aria-label="Scroll Left"
            onClick={() => scrollByAmount(-350)}
            style={{ outline: "none", border: "none" }}
          >
            <span className="text-3xl text-white drop-shadow">‹</span>
          </button>
          <button
            className="hidden md:flex absolute right-[38%] top-1/2 -translate-y-1/2 z-30 w-10 h-10 bg-black/70 hover:bg-black/90 transition rounded-full items-center justify-center shadow-lg border-2 border-white"
            type="button"
            aria-label="Scroll Right"
            onClick={() => scrollByAmount(350)}
            style={{ outline: "none", border: "none" }}
          >
            <span className="text-3xl text-white drop-shadow">›</span>
          </button>
          {/* Video Rail with overlayed left/right buttons like Instagram stories */}
          <div
            className="flex gap-[22px] overflow-x-auto py-[6px] px-[14vw] [scroll-snap-type:x_mandatory] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden relative"
            ref={railRef}
            style={{ position: "relative" }}
          >
            {/* Overlay navigation buttons */}
            {videoSources.length > 0 && (
              <>
                {/* Left overlay button */}
                <button
                  className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 w-12 h-24 bg-black/30 hover:bg-black/50 transition rounded-l-xl items-center justify-start z-30"
                  style={{ outline: "none", border: "none" }}
                  type="button"
                  aria-label="Back"
                  onClick={() => scrollToIndex(Math.max(0, currentIndex - 1))}
                >
                  <span className="mx-auto text-3xl text-white drop-shadow">‹</span>
                </button>
                {/* Right overlay button */}
                <button
                  className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 w-12 h-24 bg-black/30 hover:bg-black/50 transition rounded-r-xl items-center justify-end z-30"
                  style={{ outline: "none", border: "none" }}
                  type="button"
                  aria-label="Next"
                  onClick={() => scrollToIndex(Math.min(videoSources.length - 1, currentIndex + 1))}
                >
                  <span className="mx-auto text-3xl text-white drop-shadow">›</span>
                </button>
                {/* Left scroll button (mobile) */}
                <button
                  className="flex sm:hidden absolute left-2 bottom-4 w-10 h-10 rounded-full bg-black/70 text-white shadow z-30 items-center justify-center"
                  type="button"
                  aria-label="Scroll Left"
                  onClick={() => scrollByAmount(-320)}
                >
                  <span className="text-2xl">‹</span>
                </button>
                {/* Right scroll button (mobile) */}
                <button
                  className="flex sm:hidden absolute right-2 bottom-4 w-10 h-10 rounded-full bg-black/70 text-white shadow z-30 items-center justify-center"
                  type="button"
                  aria-label="Scroll Right"
                  onClick={() => scrollByAmount(320)}
                >
                  <span className="text-2xl">›</span>
                </button>
              </>
            )}
            {/* Videos */}
            {videoSources.map((src, i) => {
              const isActive = i === currentIndex;
              const isPlaying = playingMap.get(i) ?? true;
              return (
                <div
                  key={`${src}-${i}`}
                  ref={(el) => (itemRefs.current[i] = el)}
                  className={`flex-none w-[min(68vw,360px)] min-w-[min(68vw,360px)] aspect-[9/16] rounded-[22px] overflow-hidden relative bg-neutral-900 border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.35)] [scroll-snap-align:center] [scroll-snap-stop:always] transition duration-200 ${isActive ? 'opacity-100 scale-100 border-white/20' : 'opacity-65 scale-[0.94]'}`}
                  style={{ position: "relative", display: "flex", alignItems: "center" }}
                >
                  {/* Left/Right scroll buttons for the central video */}
                  {isActive && (
                    <>
                      <button
                        className="absolute left-[-48px] top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/70 text-white shadow z-40 flex items-center justify-center"
                        type="button"
                        aria-label="Scroll Left"
                        onClick={() => scrollToIndex(Math.max(0, currentIndex - 1))}
                      >
                        <span className="text-2xl">‹</span>
                      </button>
                      <button
                        className="absolute right-[-48px] top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/70 text-white shadow z-40 flex items-center justify-center"
                        type="button"
                        aria-label="Scroll Right"
                        onClick={() => scrollToIndex(Math.min(videoSources.length - 1, currentIndex + 1))}
                      >
                        <span className="text-2xl">›</span>
                      </button>
                    </>
                  )}
                  <video
                    ref={(el) => (previewRefs.current[i] = el)}
                    src={src}
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    autoPlay
                    className={`w-full h-full object-cover block ${isActive ? '' : 'blur-[2px] brightness-90'}`}
                  />
                  <span className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/0 to-black/35" />
                  {isActive && (
                    <button
                      className="absolute hover:cursor-pointer left-[10px] bottom-[10px] text-white text-[12px] py-[6px] px-[10px] bg-black/55 border border-white/20 rounded-full"
                      type="button"
                      onClick={() => togglePreviewPlay(i)}
                    >
                      {isPlaying ? 'Pause' : 'Play'}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default VideoSection;

