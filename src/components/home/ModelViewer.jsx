"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

const Model = () => {
  const { scene } = useGLTF("/models/flower.glb");

  return (
    <primitive
      object={scene}
      position={[0, 0, 0]} // centered
      scale={1} // original scale
    />
  );
};

export default function ModelViewer() {
  return (
    <div className="h-screen w-full">
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 2, 2]} />
        <OrbitControls enableZoom={false} />
        <Model />
      </Canvas>
    </div>
  );
}
