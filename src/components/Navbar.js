'use client';

import { useState, useEffect } from 'react';
// import Contact from "../components/Contact";
import Image from 'next/image';

const Navbar = () => {
  const [navToggled, setNavToggled] = useState(false);
  const [navTransitionable, setNavTransitionable] = useState(false);

  const handleNavToggle = () => {
    console.log('Toggle clicked, current state:', navToggled);
    setNavTransitionable(true);
    setNavToggled(!navToggled);
  };

  // Prevent body scroll when mobile nav is open
  useEffect(() => {
    if (navToggled) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = 'unset';
      document.body.style.position = 'unset';
      document.body.style.width = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
      document.body.style.position = 'unset';
      document.body.style.width = 'unset';
    };
  }, [navToggled]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 800px)");
    
    const handleMediaChange = (e) => {
      setNavTransitionable(false);
      setNavToggled(false);
    };

    mediaQuery.addEventListener('change', handleMediaChange);
    
    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange);
    };
  }, []);

  return (
    <>
      <style jsx global>{`
        nav {
          display: flex;
          width: 100%;
          border-bottom: 1px solid var(--border-color);
        }

        nav .nav-section {
          padding: 3rem 2rem;
          display: flex;
          gap: 1rem;
          border-left: 1px solid var(--border-color);
          align-items: center;
          justify-content: center;
        }

        #nav-mobile-section {
          display: flex;
          flex-basis: calc(100% * (2 / 3));
          z-index: 2;
        }

        #nav-toggle-button { 
          align-items: center;
          background-color: transparent;
          border: none;
          border-left: 1px solid var(--border-color);
          color: white;
          cursor: pointer;
          display: none;
          gap: 0.8rem;
          height: 100%;
          justify-content: center;
          outline: none;
          padding: 0rem 3rem;
          position: relative;
          z-index: 1001;
        }

        #nav-toggle-button:hover,
        #nav-toggle-button:hover > span {
          color: var(--highlight-color);
        }

        #nav-toggle-button > span,
        #nav-toggle-button > i { 
          display: inline-block;
          height: 1rem;
          line-height: 1rem;
        }

        #nav-social-section,
        #nav-contact-section {
          flex-grow: 1;
        }

        #nav-logo-section {
          flex-basis: calc(100% / 2.5);
          justify-content: flex-start;
          min-width: 300px;
        }

        #nav-logo-section > a > i {
          font-size: 2.5rem;
        }

        .nav-logo {
          height: 4rem;
          width: auto;
          max-width: 300px;
          object-fit: contain;
          filter: brightness(1.1) contrast(1.1);
          transition: all 0.3s ease;
        }

        .nav-logo:hover {
          filter: brightness(1.2) contrast(1.2);
          transform: scale(1.05);
        }

        #nav-link-section {
          flex-basis: 50%;
          gap: 6rem; 
        }

        #nav-social-section {
          gap: 3rem;
        }

        @media(max-width: 1200px) {    
          #nav-mobile-section {
            flex-basis: calc(100% * 0.75);
          }

          #nav-logo-section {
            flex-basis: calc(100% * 0.4);
            min-width: 200px;
          }
          
          #nav-link-section {
            flex-basis: calc(100% / 3);
            gap: 3rem;
          }
        }

        @media(max-width: 800px) {  
          nav {
            justify-content: space-between;  
          }
          
          nav[data-toggled="true"] > #nav-mobile-section {  
            transform: translateY(0%);
          }

          nav[data-toggled="true"] > #nav-toggle-button {
            border-left: none;
          }

          nav[data-transitionable="true"] > #nav-mobile-section {
            transition: transform 400ms ease;
          }
          
          nav .nav-section {
            border-left: none;
            padding: 1.5rem 1rem;
          }
          
          #nav-logo-section > a > i {
            font-size: 1.5rem;
            margin-left: 1rem;
          }
          
          #nav-mobile-section {
            background-color: var(--background-color);
            flex-direction: column;
            height: 100vh;
            width: 100vw;
            position: fixed;
            top: 0;
            left: 0;
            transform: translateY(-100%);
            z-index: 1000;
          } 
          
          #nav-toggle-button {
            display: flex;
          }  
          
          #nav-link-section {
            flex-basis: 60%;
            flex-direction: column;
            gap: 4rem;
          }
          
          #nav-link-section > a {
            font-size: 3rem; 
          }
          
          #nav-social-section > a {
            font-size: 2rem; 
          }  
          
          #nav-contact-section {
            padding-bottom: 4rem;
          }

          .nav-logo {
            height: 3rem;
            max-width: 200px;
            margin-left: 1rem;
          }
        }
      `}</style>

      <nav data-toggled={navToggled} data-transitionable={navTransitionable}>
        <div id="nav-logo-section" className="nav-section">
          <a href="#">
            <Image 
              src="/img/logo.png" 
              alt="Logo" 
              width={1000}
              height={50}
              className="nav-logo"
              priority
            />
          </a>
        </div>
        <div id="nav-mobile-section">
          <div id="nav-link-section" className="nav-section">
            <a href="#" onClick={() => setNavToggled(false)}>ABOUT</a>
            <a href="#" onClick={() => setNavToggled(false)}>WORK</a>
          </div>
          <div id="nav-social-section" className="nav-section">
            <a href="#">
              <i className="fa-brands fa-twitter"></i>
            </a>
            <a href="https://www.youtube.com/c/Hyperplexed" target="_blank" rel="noopener noreferrer">
              <i className="fa-brands fa-youtube"></i>
            </a>    
            <a href="#">
              <i className="fa-brands fa-codepen"></i>
            </a>
          </div>
          <div id="nav-contact-section" className="nav-section">
            <a href="#" onClick={() => setNavToggled(false)}>GET IN TOUCH</a>
          </div>
        </div>
        <button id="nav-toggle-button" type="button" onClick={handleNavToggle}>
          <span>Menu</span>
          <i className="fa-solid fa-bars"></i>
        </button>
      </nav>
      
      {/* Mobile nav backdrop */}
      {navToggled && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 999,
            display: 'block'
          }}
          onClick={() => setNavToggled(false)}
        />
      )}
      {/* <Contact /> */}
    </>
  );
};

export default Navbar;