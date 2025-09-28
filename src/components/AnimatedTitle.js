'use client';
import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);

const AnimatedTitle = ({ title, containerClass }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const words = containerRef.current.querySelectorAll(".animated-word");

    gsap.set(words, { opacity: 0, y: 50 }); // initial hidden state

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%", // trigger when top of container hits 80% of viewport
        toggleActions: "play none none reverse",
        markers: false,
      },
    });

    tl.to(words, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.1,
    });

  }, []);

  return (
    <div ref={containerRef} className={containerClass}>
      {title.split("<br />").map((line, lineIndex) => (
        <div
          key={lineIndex}
          className="flex flex-wrap justify-center gap-2"
        >
          {line.split(" ").map((word, wordIndex, arr) => (
            <span
              key={wordIndex}
              className="animated-word inline-block"
              dangerouslySetInnerHTML={{ __html: word + (wordIndex !== arr.length - 1 ? " " : "") }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default AnimatedTitle;
