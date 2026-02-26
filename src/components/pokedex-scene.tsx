"use client";

import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Stage, PresentationControls, Environment, Float } from "@react-three/drei";
import * as THREE from "three";

function Model(props: any) {
    const { scene } = useGLTF("/models/pokedex/scene.gltf");
    const ref = useRef<THREE.Group>(null);

    scene.rotation.y = 0.5;

    return (
        <primitive
            ref={ref}
            object={scene}
            scale={0.0035}
            {...props}
        />
    );
}

export function PokedexScene() {
    return (
        <div className="w-full h-full min-h-[200px] relative pointer-events-auto">
            <Canvas
                shadows
                camera={{ position: [0, 0, 8], fov: 50 }}
                gl={{ antialias: true }}
                style={{ height: '100%', width: '100%', overflow: 'visible' }}
            >
                <Suspense fallback={null}>
                    <Float
                        speed={4.2}
                        rotationIntensity={0.4}
                        floatIntensity={0.2}
                        floatingRange={[-0.001, 0.001]}
                    >
                        <PresentationControls
                            global
                            zoom={0.6}
                        >
                            <Stage environment="night" intensity={0.02} adjustCamera={1.2} shadows>
                                <Model />
                            </Stage>
                        </PresentationControls>
                    </Float>
                </Suspense>
            </Canvas>
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-background via-transparent to-transparent opacity-50" />
        </div>
    );
}

// Preload the model
useGLTF.preload("/models/pokedex/scene.gltf");
