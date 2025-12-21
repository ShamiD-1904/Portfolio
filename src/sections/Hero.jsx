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
    <section className="hero-section" id="hero">
      {/* Background decoration */}
      <div className="hero-bg-decoration">
        <img src="/images/bg.png" alt="background" />
      </div>

      <div className="hero-container">
        {/* LEFT: HERO TEXT CONTENT */}
        <div className="hero-left">
          <div className="hero-content">
            {/* Sliding words animation */}
            <div className="hero-text">
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

              {/* Static headline */}
              <h1 className="hero-headline" ref={headline1Ref}>
                Engineering Solutions, {<br />}
                Delivering Results.
              </h1>

              {/* Dynamic glitching word */}
              <h1 className="hero-glitch" ref={headline2Ref}>
                <span className="glitch-word">{currentWord}</span>
              </h1>
            </div>

            <div className="hero-divider" />

            {/* Introduction text */}
            <div className="hero-intro" ref={introRef}>
              <span className="intro-greeting">Hey, I'm</span>
              <span className="intro-name">Shamishka</span>
            </div>

            {/* Description */}
            <div className="hero-description" ref={descRef}>
              <div className="description-text">
                <span className="description-line">A Computer Engineering undergraduate,</span>
                <span className="description-line">Fullstack Web Developer,</span>
                <span className="description-line">AI/ML and Robotics Enthusiast,</span>
              </div>
            </div>

            {/* CTA Button */}
            <div className="hero-cta">
              <Button
                className="cta-button"
                id="button"
                text="See my Work"
              />
            </div>
          </div>
        </div>

        {/* RIGHT: 3D MODEL */}
        <div className="hero-right">
          <div className="hero-3d-wrapper">
            <HeroExperience />
          </div>
        </div>
      </div>

      <AnimatedCounter />
    </section>
  );
};

export default Hero;
