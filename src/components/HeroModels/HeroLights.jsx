import React from "react";
import * as THREE from "three"
import { Environment } from '@react-three/drei'

const HeroLights = () => {
  return (
    <>
    {/* Ambient light for overall scene illumination */}
    <ambientLight intensity={0.5} />

    

    {/* Key light - main light source from front-right */}
    <directionalLight
      position={[0, 4, 5]}
      intensity={10}
      castShadow
      shadow-mapSize-width={2048}
      shadow-mapSize-height={2048}
      color="white"
    />

    <directionalLight
      position={[-20, 4, 5]}
      intensity={10}
      castShadow
      shadow-mapSize-width={2048}
      shadow-mapSize-height={2048}
      color="white"
    />

    <directionalLight
      position={[0, -2, -5]}
      intensity={20}
      castShadow
      shadow-mapSize-width={2048}
      shadow-mapSize-height={2048}
      color="white"
    />
    

    {/* Front spotlight for central focus */}
 
    

    {/* Point light for additional glow */}
   

    {/* RectArea light for soft fill */}
    <primitive
      object={new THREE.RectAreaLight("#ffffff", 30, 4, 4)}
      position={[0, 5, 5]}
      rotation={[-Math.PI / 4, 0, 0]}
    />
    </>
  );
};

export default HeroLights;
