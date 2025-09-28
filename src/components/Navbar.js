"use client";

import React, { useRef, useState, useEffect } from "react";
import { TiLocationArrow } from "react-icons/ti";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import Lenis from "lenis"; // Add Lenis for smooth scrolling

import Button from "./Button"; // keep your custom Button

const navItems = [
  { label: "Hero", href: "#hero" },
  { label: "About", href: "/about" }, // Link to AboutComp.js route
  { label: "Work", href: "#work" },
];

const Navbar = () => {
  const pathname = usePathname();
  const navContainerRef = useRef(null);
  const audioElementRef = useRef(null);
  const lastScrollYRef = useRef(0);

  const [isNavVisible, setIsNavVisible] = useState(true);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isIndicatorActive, setIndicatorActive] = useState(false);
  const [currentScrollY, setCurrentScrollY] = useState(0);

  // Add Lenis smooth scroll on mount (window scroll for all pages)
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
      infinite: false,
      wheelMultiplier: 1,
      lerp: 0.1,
      syncTouch: true,
      syncTouchLerp: 0.075,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const toggleAudioIndicator = () => {
    setIsAudioPlaying((prev) => !prev);
    setIndicatorActive((prev) => !prev);
  };

  useEffect(() => {
    if (isAudioPlaying) {
      audioElementRef.current?.play();
    } else {
      audioElementRef.current?.pause();
    }
  }, [isAudioPlaying]);

  // track scroll
  useEffect(() => {
    const handleScroll = () => {
      setCurrentScrollY(window.scrollY);
      const lastScrollY = lastScrollYRef.current;

      if (window.scrollY === 0) {
        setIsNavVisible(true);
      } else if (window.scrollY > lastScrollY) {
        setIsNavVisible(false);
      } else if (window.scrollY < lastScrollY) {
        setIsNavVisible(true);
      }

      lastScrollYRef.current = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // animate nav
  useEffect(() => {
    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.5,
    });
  }, [isNavVisible]);

  const navClasses = `
    fixed inset-x-0 top-4 z-50 h-16 border-none 
    transition-all duration-500 sm:inset-x-6 
    ${currentScrollY > 0 && isNavVisible ? "bg-black rounded-2xl" : ""}
  `;

  // correct nav links
  const getNavLink = (item) => {
    if (typeof item === "string") {
      // fallback for string items
      const itemLower = item.toLowerCase();
      if (pathname !== "/") {
        return `/${itemLower === "hero" ? "" : `#${itemLower}`}`;
      }
      return `#${itemLower}`;
    }
    // If item is object with href, use it directly
    return item.href;
  };

  return (
    <div ref={navContainerRef} className={navClasses}>
      <header className="absolute top-1/2 w-full -translate-y-1/2">
        <nav className="flex size-full items-center justify-between p-4">
          {/* Logo + Products Button */}
          <div className="flex items-center gap-7">
            <Link href="/">
              <img src="/img/logo.png" alt="logo" className="w-10" />
            </Link>

            <Button
              id="products-button"
              title="Contact"
              href="/contact"
              target="_blank"
              rightIcon={<TiLocationArrow />}
              containerClass="bg-blue-50 md:flex hidden items-center justify-center gap-1"
            />
          </div>

          {/* Nav Links + Audio */}
          <div className="flex h-full items-center">
            <div className="hidden md:block">
              {navItems.map((item) => (
                <Link
                  key={typeof item === "string" ? item : item.label}
                  href={getNavLink(item)}
                  className="nav-hover-btn"
                >
                  {typeof item === "string" ? item : item.label}
                </Link>
              ))}
            </div>

            <button
              className="ml-10 flex items-center space-x-0.5"
              onClick={toggleAudioIndicator}
            >
              <audio
                ref={audioElementRef}
                className="hidden"
                src="/audio/loop.mp3"
                loop
              />
              {[1, 2, 3, 4].map((bar) => (
                <div
                  key={bar}
                  className={`indicator-line ${
                    isIndicatorActive ? "active" : ""
                  }`}
                  style={{ animationDelay: `${bar * 0.1}s` }}
                />
              ))}
            </button>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
