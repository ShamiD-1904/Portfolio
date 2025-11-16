import React, { useRef } from "react";
import { words } from "../constants";
import Button from "../components/Button";
import HeroExperience from "../components/HeroModels/HeroExperience";
import useHeroAnimations from "../animations/useHeroAnimations";
import useGlitchEffect from "../animations/useGlitchEffect";
import AnimatedCounter from "../components/AnimatedCounter";

const Hero = () => {
  const slideRef = useRef(); // Container for the sliding word animation
  const slideItemsRef = useRef([]); // Array of individual sliding word elements
  const headline1Ref = useRef(); // "Engineering Solutions. Delivering Results."
  const headline2Ref = useRef(); // The glitching word (Build/Innovate/Deliver)
  const introRef = useRef(); // "Hey, I'm Shamishka,"
  const descRef = useRef(); // Role descriptions

  // Glitch effect: cycles through words with digital scramble effect
  const currentWord = useGlitchEffect(
    ["Build", "Innovate", "Deliver"], // Words to cycle
    2000, // Hold each word for 2 seconds
    1000 // Glitch transition takes 1s
  );

  // Initial page load animations: staggered reveal of all elements
  useHeroAnimations({
    slideRef,
    slideItemsRef,
    headline1Ref,
    headline2Ref,
    introRef,
    descRef,
  });

  return (
    <section className="relative overflow-hidden" id="hero">
      
      <div className="absolute top-10  left-10 z-10">
        <img src="/images/bg.png" alt="background" />
      </div>

      <div className="hero-layout">

        {/* LEFT: HERO TEXT CONTENT */}
        <header className="flex flex-col justify-center md:w-full w-screen md:px-16 px-5">
          <div className="flex flex-col gap-4 md:text-2xl">
            <div className="hero-text ">

              {/* Sliding words animation: "From Ideas To Code To Reality" */}
              <h1>
                <span className="slide" ref={slideRef}>
                  <span className="wrapper">
                    {words.map((word, index) => (
                      <span
                        key={`${word.text2}-${index}`}
                        ref={(el) => (slideItemsRef.current[index] = el)}
                        className="flex items-center md:gap-2 gap-1  pb-2"
                      >
                        <span>{word.text1} </span>
                        <img
                          src={word.imgPath}
                          alt={word.text2}
                          className="xl:size-10 sm:size-10 size-6 md:p-2 p-1 rounded-full bg-white-50"
                        />
                        <span>{word.text2}</span>
                      </span>
                    ))}
                  </span>
                </span>
              </h1>
              <br />
              <h1></h1>

              {/* Static headline */}
              <h1 className="" ref={headline1Ref}>
                Engineering Solutions, {<br />}
                Delivering Results.
              </h1>



              {/* Dynamic glitching word */}
              <h1 className="md:mt-2.5 font-semibold" ref={headline2Ref}>
                <span className="glitch-word">{currentWord}</span>
                
              </h1>
            </div>
            <hr className="border-t border-[#00C2A8]/40 my-0 relative xl:top-[-100px] w-[70vh]" />

            {/* Introduction text */}
            <p
              className="text-white-50 md:text-xl relative z-10 xl:top-[-100px] pointer-events-none xl:text-5xl "
              ref={introRef}
            >
              Hey, I'm <b className="bg-linear-to-b from-[#1b0adb] via-[#0a1f94] to-[#0d1350] bg-clip-text text-transparent font-bold text-shadow-blue-50">Shamishka,</b>
            </p>

            {/* my descriptions */}
            <div
              className="text-white-50 md:text-xl xl:text-3xl relative z-10 pointer-events-none ml-16 xl:top-[-100px]"
              ref={descRef}
            >
              <p className="xl:text-2xl">
                A Computer Engineering undergraduate, <br />
                Fullstack Web Developer, <br />
                AI/ML and Robotics Enthusiast, <br /> <b>And a constant learner .. </b>
              </p>
            </div>

            {/* Call-to-action button */}
            <div className="cta-wrapper">
            <Button
              className="cta-button"
              id="button"
              text="See my Work"
            />
            </div>
          </div>
        </header>



        {/* RIGHT: 3D MODEL */}
        <figure>
          <div className="hero-3d-layout">
            <HeroExperience />
          </div>
        </figure>
      </div>

      <AnimatedCounter />
    </section>
  );
};

export default Hero;
