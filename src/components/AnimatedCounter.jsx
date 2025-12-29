import React, { useRef } from "react";
import { counterItems } from "../constants";
import CountUp from 'react-countup';

const AnimatedCounter = () => {
  const cardRefs = useRef([]);

  const handleMouseMove = (index) => (e) => {
    const card = cardRefs.current[index];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const mouseX = e.clientX - rect.left - rect.width / 2;
    const mouseY = e.clientY - rect.top - rect.height / 2;

    let angle = Math.atan2(mouseY, mouseX) * (180 / Math.PI);
    angle = (angle + 360) % 360;

    card.style.setProperty('--start', angle + 60);
  };

  return (
    <div id="counter" className="padding-x-lg mt-32">
      <div className="mx-auto grid-4-cols">
        {counterItems.map((item, index) => (
          <div
            key={item.label}
            ref={(el) => (cardRefs.current[index] = el)}
            onMouseMove={handleMouseMove(index)}
            className="card card-border rounded-xl p-8 flex flex-col items-center justify-center text-center group relative overflow-hidden"
          >
            <div className="glow" />
            
            {/* Counter Icon/Decoration */}
            

            {/* Counter Number */}
            <div className="counter-number text-white text-5xl md:text-6xl font-bold mb-3 relative z-10">
              <CountUp 
                suffix={item.suffix} 
                end={item.value}
                duration={2.5}
                enableScrollSpy
                scrollSpyOnce
              />
            </div>

            {/* Counter Label */}
            <div className="text-white-50 text-base md:text-lg font-medium relative z-10">
              {item.label}
            </div>

            {/* Gradient Accent Line */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnimatedCounter;
