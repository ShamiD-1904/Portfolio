import { useRef, lazy, Suspense } from "react"; // Added lazy, Suspense
import { words } from "../constants";
import Button from "../components/Button";
// REMOVED: import HeroExperience from "../components/HeroModels/HeroExperience";
import useHeroAnimations from "../animations/useHeroAnimations";
import useGlitchEffect from "../animations/useGlitchEffect";
import { useIsMobile } from "../hooks";

// --- STRICT FIX: Dynamic Import ---
// This splits the heavy 3D component into a separate chunk.
// It will NOT be downloaded until this line is executed in the render.
const HeroExperience = lazy(() => import("../components/HeroModels/HeroExperience"));

const Hero = () => {
  // Ensure your hook defaults to TRUE (mobile) to be safe, or handles hydration well.
  const isMobile = useIsMobile(); 
  
  const slideRef = useRef();
  const slideItemsRef = useRef([]);
  const headline1Ref = useRef();
  const headline2Ref = useRef();
  const introRef = useRef();
  const descRef = useRef();

  const currentWord = useGlitchEffect(
    ["Build", "Innovate", "Deliver"],
    2000,
    1000
  );

  useHeroAnimations({
    slideRef,
    slideItemsRef,
    headline1Ref,
    headline2Ref,
    introRef,
    descRef,
  });

  return (
    <section className={`hero-section ${isMobile ? 'h-auto' : 'min-h-screen'}`} id="hero">
      <div className="hero-bg-decoration">
        <img src="/images/bg.png" alt="background" />
      </div>

      <div className="hero-container">
        {/* LEFT: HERO TEXT CONTENT */}
        <div className="hero-left">
          <div className="hero-content">
            <div className="hero-text text-gray-400">
              <h1>
                <span className="slide" ref={slideRef}>
                  <span className="wrapper">
                    {words.map((word, index) => (
                      <span
                        key={`${word.text2}-${index}`}
                        ref={(el) => (slideItemsRef.current[index] = el)}
                        className="slide-word"
                      >
                        <span>{word.text1} </span>
                        <img
                          src={word.imgPath}
                          alt={word.text2}
                          className="slide-icon"
                        />
                        <span>{word.text2}</span>
                      </span>
                    ))}
                  </span>
                </span>
              </h1>
              <br />
              <h1></h1>

              <h1 className="hero-headline" ref={headline1Ref}>
                Engineering Solutions, {<br />}
                Delivering Results.
              </h1>

              <h1 className="hero-glitch" ref={headline2Ref}>
                <span className="glitch-word">{currentWord}</span>
              </h1>
            </div>

            <div className="hero-divider" />

            <div className="hero-intro" ref={introRef}>
              <span className="intro-greeting font-bold text-gray-300">Hey, I'm</span>
              <span className="intro-name">Shamishka</span>
            </div>

            <div className="hero-description !sm:text-2xl" ref={descRef}>
              <div className="description-text">
                <span className="description-line">A Computer Engineering undergraduate,</span>
                <span className="description-line">Fullstack Web Developer,</span>
                <span className="description-line">AI/ML and Robotics Enthusiast,</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: 3D MODEL */}
        {/* Only render if NOT mobile */}
        {!isMobile && (
          <div className="hero-right">
            <div className="hero-3d-wrapper">
              {/* Suspense is REQUIRED for lazy loaded components */}
              <Suspense fallback={<div className="w-full h-full flex items-center justify-center">Loading 3D Experience...</div>}>
                <HeroExperience />
              </Suspense>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Hero;