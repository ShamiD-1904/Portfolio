import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useState, useEffect, useRef } from "react";
import { useMediaQuery } from "react-responsive";
import { Robot } from "./Robot";
import HeroLights from "./HeroLights";
import SpeechBubble from "../SpeechBubble";

const HeroExperience = () => {
  const isTablet = useMediaQuery({ query: "(max-width: 1024px)" });
  const isSmallMonitor = useMediaQuery({ query: "(max-width: 1280px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const isSmallScreen = isTablet || isMobile || isSmallMonitor; // For hiding speech bubbles and locking controls
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

  // Listen for click events to trigger attack bubble (only on larger screens)
  useEffect(() => {
    if (isSmallScreen) return; // Don't add click listener on small screens
    
    const handleClick = () => {
      setShowAttackBubble(true);
      // Hide after 2 seconds
      setTimeout(() => setShowAttackBubble(false), 2000);
    };

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [isSmallScreen]);

  // Camera and robot positioning based on screen size
  const getCameraPosition = () => {
    if (isMobile) return [-6, 0, 4]; // Front view for mobile
    if (isTablet) return [-6, 0, 4]; // Front view for tablet
    return [-4, -4, 6]; // Default angled view for desktop
  };

  const getRobotScale = () => {
    if (isMobile) return 1.2;
    if (isTablet) return 1;
    if (isSmallMonitor) return 0.8;
    return 1.2;
  };

  const getRobotPosition = () => {
    if (isMobile) return [0, -2, 0];
    if (isTablet) return [0, -1.2, 0];
    return [0, -1.6, 0];
  };

  return (
    <div ref={containerRef} className="relative w-full h-full">
      {/* Robot Speech Bubbles - Only show on larger screens */}
      {!isSmallScreen && (
        <>
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
        </>
      )}

      <Canvas
        camera={{ position: getCameraPosition(), fov: isMobile ? 35 : 30 }}
        frameloop={isVisible ? "always" : "never"}
      >
        <OrbitControls
          enablePan={false}
          enableRotate={!isSmallScreen} // Lock rotation on mobile and tablet
          enableZoom={!isSmallScreen} // Lock zoom on mobile and tablet
          maxDistance={20}
          minDistance={5}
          minPolarAngle={Math.PI / 5}
          maxPolarAngle={Math.PI / 2}
        />

        <HeroLights />

        <group
          scale={getRobotScale()}
          position={getRobotPosition()}
        >
          <Robot isVisible={isVisible} />
        </group>
      </Canvas>
    </div>
  );
};

export default HeroExperience;
