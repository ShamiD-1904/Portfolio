import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useState, useEffect, Suspense } from "react";
import { Robot } from "./Robot";
import HeroLights from "./HeroLights";
import SpeechBubble from "../SpeechBubble";
import { 
  useIsMobile, 
  useIsTablet, 
  useIsSmallMonitor,
  useIntersectionObserver 
} from "../../hooks";

const HeroExperience = () => {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const isSmallMonitor = useIsSmallMonitor();
  const isSmallScreen = isMobile || isTablet || isSmallMonitor; // For hiding speech bubbles and locking controls
  const [showAttackBubble, setShowAttackBubble] = useState(false);
  
  // Use custom intersection observer hook
  const { ref: containerRef, isVisible } = useIntersectionObserver({ threshold: 0.1 });

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
    <div ref={containerRef} className= {`${isMobile ? 'hidden' : 'block'} relative w-full h-full`}>
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
        gl={{
          antialias: true,
          powerPreference: "high-performance",
          failIfMajorPerformanceCaveat: false,
        }}
      >
        <Suspense fallback={null}>
          <OrbitControls
            enablePan={false}
            enableRotate={!isSmallScreen}
            enableZoom={!isSmallScreen}
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
        </Suspense>
      </Canvas>
    </div>
  );
};

export default HeroExperience;
