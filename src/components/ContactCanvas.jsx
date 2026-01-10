import { memo } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

// Placeholder 3D component - replace with actual model later
const ContactModel = memo(() => {
  return (
    <mesh>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="#22D3EE" wireframe />
    </mesh>
  );
});

const ContactCanvas = memo(({ isVisible }) => (
  <Canvas 
    camera={{ position: [0, 0, 5], fov: 50 }}
    frameloop={isVisible ? "always" : "never"}
    gl={{ antialias: false, powerPreference: 'high-performance' }}
  >
    <ambientLight intensity={0.5} />
    <directionalLight position={[5, 5, 5]} intensity={1} />
    <ContactModel />
    <OrbitControls 
      enableZoom={false} 
      enablePan={false}
      autoRotate={isVisible}
      autoRotateSpeed={2}
    />
  </Canvas>
));

export default ContactCanvas;
