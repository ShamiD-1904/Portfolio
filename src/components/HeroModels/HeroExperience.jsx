import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React from "react";
import { useMediaQuery } from "react-responsive";
import { Robot } from "./Robot";
import HeroLights from "./HeroLights";

const HeroExperience = () => {
  const isTablet = useMediaQuery({ query: "(max-width: 1024px)" });

  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  return (
    <Canvas camera={{ position: !isMobile ? [-4, -4, 6] : [-8, 2, 3], fov: 30 }}>
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
        <Robot />
      </group>
    </Canvas>
  );
};

export default HeroExperience;
