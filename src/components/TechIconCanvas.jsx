import { memo, Suspense, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, useGLTF, OrbitControls } from '@react-three/drei';

// Single 3D model component with controlled animation
const TechModel = memo(({ model, isVisible }) => {
  const { scene } = useGLTF(model.modelPath);
  const clonedScene = useMemo(() => scene.clone(), [scene]);

  const position = model.position ?? [0, 0, 0];

  return (
    <Float
      speed={isVisible ? 4 : 0}
      rotationIntensity={isVisible ? 0.4 : 0}
      floatIntensity={isVisible ? 0.6 : 0}
    >
      <group
        scale={model.scale}
        rotation={model.rotation}
        position={position}
      >
        <primitive object={clonedScene} />
      </group>
    </Float>
  );
});

// Component to invalidate frame when visible
const FrameInvalidator = ({ isVisible }) => {
  useFrame(({ invalidate }) => {
    if (isVisible) {
      invalidate();
    }
  });
  return null;
};

// Lightweight Canvas wrapper for each tech card
const TechIconCanvas = memo(({ model, isVisible }) => (
  <Canvas
    frameloop="demand"
    dpr={[1, 1.5]}
    gl={{ antialias: false, powerPreference: 'high-performance' }}
    camera={{ position: [0, 0, 5], fov: 60 }}
    onCreated={({ gl }) => {
      gl.domElement.addEventListener('webglcontextlost', (e) => e.preventDefault(), false);
    }}
  >
    <ambientLight intensity={0.5} />
    <directionalLight position={[5, 5, 5]} intensity={0.8} />
    <Suspense fallback={null}>
      <TechModel model={model} isVisible={isVisible} />
      <FrameInvalidator isVisible={isVisible} />
    </Suspense>
    <OrbitControls
      target={[0, 0, 0]}
      enableZoom={false}
      enablePan={true}
    />
  </Canvas>
));

export default TechIconCanvas;
