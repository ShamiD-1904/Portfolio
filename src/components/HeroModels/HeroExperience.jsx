import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useState, useEffect, useRef } from "react";
import { useMediaQuery } from "react-responsive";
import { Robot } from "./Robot";
import HeroLights from "./HeroLights";
import SpeechBubble from "../SpeechBubble";

const HeroExperience = () => {
  const isTablet = useMediaQuery({ query: "(max-width: 1024px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const [showAttackBubble, setShowAttackBubble] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const containerRef = useRef(null);

  // Intersection Observer to detect when component is in viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 } // Trigger when 10% visible
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Listen for click events to trigger attack bubble
  useEffect(() => {
    const handleClick = () => {
      setShowAttackBubble(true);
      // Hide after 2 seconds
      setTimeout(() => setShowAttackBubble(false), 2000);
    };

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-full">
      {/* Robot Speech Bubble */}
      <SpeechBubble
        text="Hey..! 👋"
        appearDelay={1600}
        duration={1676}
        top="15%"
        left="15%"
      />

      <SpeechBubble
        text="Click anywhere IF YOU DARE.."
        appearDelay={8000}
        duration={5700}
        top="20%"
        left="-56%"
        fontSize="1rem"
        tailPosition="20rem"
      />

      {/* Attack animation bubble */}
      {showAttackBubble && (
        <SpeechBubble
          text="Pew Pew! 🔫"
          appearDelay={0}
          duration={2000}
          top="20%"
          left="-32%"
          fontSize="1.2rem"
          tailPosition="10rem"
        />
      )}

      <Canvas
        camera={{ position: !isMobile ? [-4, -4, 6] : [-8, 2, 3], fov: 30 }}
        frameloop={isVisible ? "always" : "never"}
      >
        <OrbitControls
          enablePan={false}
          enableRotate={!isMobile}
          enableZoom={!isTablet && !isMobile}
          maxDistance={20}
          minDistance={5}
          minPolarAngle={Math.PI / 5}
          maxPolarAngle={Math.PI / 2}
        />

        <HeroLights />

        <group
          scale={isMobile ? 0.8 : 1.2}
          position={isMobile ? [0, -0.8, 0] : [0, -1.6, 0]}
        >
          <Robot isVisible={isVisible} />
        </group>
      </Canvas>
    </div>
  );
};

export default HeroExperience;
