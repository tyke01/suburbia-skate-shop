"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";


export const InteractiveSkateboard = () => {
  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center">
      <Canvas className="min-h-[60rem] w-full">
        <Suspense>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
};

function Scene() {

  return (
    <group>
      <mesh>
        <meshBasicMaterial />
        <boxGeometry />
      </mesh>
    </group>
  );
}
