import React from "react";
import { words } from "../constants";
import Button from "../components/Button";

const Hero = () => {
  return (
    <section className="relative overflow-hidden" id="hero">
      <div className="absolute top-0 left-0 z-10">
        <img src="/images/bg.png" alt="background" />
      </div>

      <div className="hero-layout">
        {/* LEFT: HERO TEXT CONTENT */}
        <header className="flex flex-col justify-center md:w-full w-screen md:px-20 px-5">
          <div className="flex flex-col gap-7">
            <div className="hero-text">
              <h1>
                <span className="slide">
                  <span className="wrapper">
                    {words.map((word) => (
                      <span
                        key={word.text2}
                        className="flex items-center md:gap-3 gap-1 pb-2"
                      >
                        <span>{word.text1} </span>
                        <img
                          src={word.imgPath}
                          alt={word.text2}
                          className="xl:size-12 md:size-10 size-7 md:p-2 p-1 rounded-full bg-white-50"
                        />
                        <span>{word.text2}</span>
                      </span>
                    ))}
                  </span>
                </span>
              </h1>
              <br />
              <h1></h1>
              <h1 className="">
                Engineering Solutions. <br />
                Delivering Results.
              </h1>
              <h1 className="">Build. Innovate. Deliver.</h1>
            </div>

            <p className="text-white-50 md:text-xl relative z-10 pointer-events-none">Hey, I'm Shamishka,</p>
            <div className="text-white-50 md:text-xl relative z-10 pointer-events-none ml-16">
                <p>A Computer Engineering undergraduate <br />Fullstack Web Developer <br />AI/ML Enthusiast</p>

                
            </div>
            <Button 
                className="md:w-80 w-60 h-12"
                id="button"
                text="See my Work"
                />
          </div>
        </header>

        {/* RIGHT: 3D MODEL */}
      </div>
    </section>
  );
};

export default Hero;
