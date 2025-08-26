'use client';

import { useState, useEffect } from 'react';

const LandingPage = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [navToggled, setNavToggled] = useState(false);
  const [navTransitionable, setNavTransitionable] = useState(false);

  const slides = [
    {
      title: "Recreation From Scratch",
      description: "This is a recreation (from scratch) of dylanbrouwer.design/work. See how I did it.",
      sourceLink: "https://www.dylanbrouwer.design/work",
      ytLink: "https://youtu.be/nG2IyH43xMU",
      imageIndex: 1
    },
    {
      title: "Wicked Cool Library Shelves",
      description: "A place where books hang out waiting to be grabbed. But don't be too grabby now, ya hear?",
      imageIndex: 2
    },
    {
      title: "Neato Toledo Lighthouse",
      description: "The neatest lighthouse you ever saw. Ehh, actually it's kind of messy. But that's why the pic is of the outside.",
      imageIndex: 3
    },
    {
      title: "Super Space Blob",
      description: "The blobiest of blobs nestled deep in the heart of outer space. Well, technically the universe is both infinite and homogeneous so there isn't really a heart, per se.",
      imageIndex: 4
    }
  ];

  const handleLeftClick = () => {
    const nextIndex = activeIndex - 1 >= 0 ? activeIndex - 1 : slides.length - 1;
    setActiveIndex(nextIndex);
  };

  const handleRightClick = () => {
    const nextIndex = activeIndex + 1 <= slides.length - 1 ? activeIndex + 1 : 0;
    setActiveIndex(nextIndex);
  };

  const handleNavToggle = () => {
    setNavTransitionable(true);
    setNavToggled(!navToggled);
  };

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
      <style jsx>{`
        :root {
          --background-color: rgb(6, 11, 25);
          --border-color: rgb(255, 255, 255, 0.1);
          --highlight-color: rgb(126, 87, 194);
          --yt-color: rgb(229, 57, 53);
        }

        body {
          background-color: var(--background-color);
          display: flex;
          flex-direction: column;
          height: 100vh;
          margin: 0px;
          overflow: hidden;
        }

        * {
          box-sizing: border-box;
        }

        h1, h2, h3, a, p, span {
          font-family: "Rubik", sans-serif;
          font-weight: 400;
          color: white;
          margin: 0px;
        }

        a {
          text-decoration: none;
        }

        a:hover {
          color: var(--highlight-color);
        }

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
          z-index: 3;
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
          flex-basis: calc(100% / 3);
          justify-content: flex-start;
        }

        #nav-logo-section > a > i {
          font-size: 2.5rem;
        }

        #nav-link-section {
          flex-basis: 50%;
          gap: 6rem; 
        }

        #nav-social-section {
          gap: 3rem;
        }

        main {
          flex-grow: 1;
          position: relative;
          overflow: hidden;
        }

        main > article {
          height: 100%;
          width: 100%;
          display: grid;
          grid-template-columns: 2fr 1fr;
          grid-template-rows: 2fr 1fr;
          position: absolute;
          left: 0px;
          top: 0px;
          transition: transform 400ms ease;  
        }

        main > article[data-status="inactive"] {
          transform: translateX(-100%);
          transition: none;
        }

        main > article[data-status="active"] {
          transform: translateX(0%);
        }

        main > article[data-status="before"] {
          transform: translateX(-100%);
        }

        main > article[data-status="after"] {
          transform: translateX(100%);
        }

        main > article[data-status="becoming-active-from-before"] {
          transform: translateX(-100%);
          transition: none;
        }

        main > article[data-status="becoming-active-from-after"] {
          transform: translateX(100%);
          transition: none;
        }

        main > article > .article-section {
          height: 100%;
          display: flex;
        }

        main > article > .article-description-section,
        main > article > .article-nav-section {
          border-left: 1px solid var(--border-color);
        }

        main > article > .article-title-section,
        main > article > .article-nav-section {
          border-top: 1px solid var(--border-color);
        }

        main > article > .article-image-section {
          background-position: center;
          background-size: cover;
        }

        main > article > .article-description-section {
          flex-direction: column;
          justify-content: flex-end;
          padding: 4rem; 
        }

        main > article > .article-description-section > p {
          color: rgba(255, 255, 255, 0.5);
          font-size: 1.25em;
        }

        main > article > .article-description-section > p  > a:hover {
          text-decoration: underline;
        }

        main > article > .article-title-section {
          align-items: center; 
          justify-content: space-between;
          padding: 2rem 4rem;
        }

        main > article > .article-title-section * {
          color: white;
        }

        main > article > .article-title-section > h2 {
          flex-basis: 50%;
          font-family: "Montserrat", sans-serif;
          font-size: 3.5rem;
          line-height: 3rem;
          margin: 0px;
          text-transform: uppercase;
        }

        main > article > .article-title-section > i {
          color: rgba(255, 255, 255, 0.75);
          font-size:  4rem;
        }

        main > article > .article-nav-section > .article-nav-button {
          background-color: transparent;
          flex-grow: 1;
          border: none;
          outline: none;
          color: rgba(255, 255, 255, 0.75);
          font-size: 3rem;
          cursor: pointer;
        }

        main > article > .article-nav-section > .article-nav-button:hover {
          background-color: rgba(255, 255, 255, 0.02);
        }

        main > article > .article-nav-section > .article-nav-button:nth-child(2) {
          border-left: 1px solid var(--border-color);
        }

        @media(max-width: 1200px) {    
          #nav-mobile-section {
            flex-basis: calc(100% * 0.75);
          }

          #nav-logo-section {
            flex-basis: calc(100% * 0.25);
          }
          
          #nav-link-section {
            flex-basis: calc(100% / 3);
            gap: 3rem;
          }

          main {
            overflow-y: auto;
          }
          
          main > article {
            grid-template-columns: none;
            grid-template-rows: 1.5fr repeat(3, 0.75fr) 0.25fr;
            height: max(900px, 100%);
          }
           
          main > article > .article-title-section > h2 {
            font-size: 3rem; 
            line-height: 2.6rem;
          }
          
          main > article > .article-title-section > i {
            font-size: 3rem; 
          }
          
          main > article > .article-description-section,
          main > article > .article-nav-section {
            border-left: none;
          }

          main > article > .article-image-section {
            order: 1;
          }
          
          main > article > .article-title-section {
            border-bottom: 1px solid var(--border-color);
            order: 2;
          }
          
          main > article > .article-description-section {
            justify-content: center;
            order: 3;
          }
          
          main > article > .article-nav-section {
            border-bottom: 1px solid var(--border-color);
            order: 4;
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
            transform: translateY(-100%);
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
          
          main > article {
            grid-template-rows: 1fr repeat(4, 0.5fr);
            height: max(700px, 100%);
          }
          
          main > article > .article-title-section {
            padding: 2rem;
          }
          
          main > article > .article-title-section > h2 {
            flex-basis: 70%;
            font-size: 1.75em; 
            line-height: 1.5rem;
          }
          
          main > article > .article-title-section > i {
            font-size: 2rem; 
          }
          
          main > article > .article-description-section {
            padding: 2rem;
          }
          
          main > article > .article-description-section > p {
            font-size: 1rem;
          }
        }

        /* -- YT link / Source link styles -- */

        main > article > .article-description-section > p  > .source-link {
          color: var(--highlight-color);
          display: inline;
        }

        main > article .yt-link,
        main > article .yt-link > i {
          color: var(--yt-color);
          display: inline;
        }

        /* Dynamic background images */
        .article-image-section[data-image="1"] {
          background-image: url("https://images.unsplash.com/photo-1565626424178-c699f6601afd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1035&q=80");
        }

        .article-image-section[data-image="2"] {
          background-image: url("https://images.unsplash.com/photo-1535905557558-afc4877a26fc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2574&q=80");
        }

        .article-image-section[data-image="3"] {
          background-image: url("https://images.unsplash.com/photo-1660580554695-d2ca5008f1f2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=927&q=80");
        }

        .article-image-section[data-image="4"] {
          background-image: url("https://images.unsplash.com/photo-1660766877755-4cac24f6cf21?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2232&q=80");
        }
      `}</style>

      <nav data-toggled={navToggled} data-transitionable={navTransitionable}>
        <div id="nav-logo-section" className="nav-section">
          <a href="#">
            <i className="fa-solid fa-dumpster-fire"></i>
          </a>
        </div>
        <div id="nav-mobile-section">
          <div id="nav-link-section" className="nav-section">
            <a href="#">ABOUT</a>
            <a href="#">WORK</a>
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
            <a href="#">GET IN TOUCH</a>
          </div>
        </div>
        <button id="nav-toggle-button" type="button" onClick={handleNavToggle}>
          <span>Menu</span>
          <i className="fa-solid fa-bars"></i>
        </button>
      </nav>

      <main>
        {slides.map((slide, index) => {
          let status = "inactive";
          if (index === activeIndex) {
            status = "active";
          } else if (index === activeIndex - 1 || (activeIndex === 0 && index === slides.length - 1)) {
            status = "before";
          } else if (index === activeIndex + 1 || (activeIndex === slides.length - 1 && index === 0)) {
            status = "after";
          }

          return (
            <article key={index} data-index={index} data-status={status}>
              <div 
                className="article-image-section article-section" 
                data-image={slide.imageIndex}
              ></div>
              <div className="article-description-section article-section">
                <p>
                  {slide.description}
                  {slide.sourceLink && (
                    <>
                      {' '}
                      <a className="source-link" href={slide.sourceLink} target="_blank" rel="noopener noreferrer">
                        dylanbrouwer.design/work
                      </a>
                      {slide.ytLink && (
                        <>
                          {' '}
                          <a className="yt-link" href={slide.ytLink} target="_blank" rel="noopener noreferrer">
                            <i className="fa-brands fa-youtube"></i>
                          </a>
                        </>
                      )}
                    </>
                  )}
                </p>
              </div>
              <div className="article-title-section article-section">
                <h2>{slide.title}</h2>
                <i className="fa-light fa-plus-large"></i>
              </div>
              <div className="article-nav-section article-section">
                <button className="article-nav-button" type="button" onClick={handleLeftClick}>
                  <i className="fa-light fa-arrow-left-long"></i>
                </button>
                <button className="article-nav-button" type="button" onClick={handleRightClick}>
                  <i className="fa-light fa-arrow-right-long"></i>
                </button>
              </div>
            </article>
          );
        })}
      </main>
    </>
  );
};

export default LandingPage;
