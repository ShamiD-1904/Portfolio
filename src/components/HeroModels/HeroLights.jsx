import React from "react";
import * as THREE from "three"

const HeroLights = () => {
  return (
    <>
      <spotLight 
      position={[2, 2, 2]}
      intensity={100}
      angle={1}
      penumbra={1}
      color="yellow"
      />

    <primitive
    object={new THREE.RectAreaLight("white")} intensity={4}
    position={[1,1,1]} />

    </>
  );
};

export default HeroLights;
