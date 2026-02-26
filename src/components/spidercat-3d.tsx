"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, Environment } from "@react-three/drei";
import { Suspense, useRef } from "react";
import * as THREE from "three";

// Placeholder abstrato e estilizado do "Spider-Cat" para demonstração
function PlaceholderCat() {
    const group = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (group.current) {
            group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.15;
        }
    });

    return (
        <group ref={group}>
            {/* Head */}
            <mesh castShadow receiveShadow position={[0, 0, 0]}>
                <boxGeometry args={[1.5, 1.2, 1.5]} />
                <meshStandardMaterial color="#E62429" roughness={0.3} metalness={0.8} />
            </mesh>

            {/* Ears */}
            <mesh castShadow receiveShadow position={[-0.5, 0.8, 0]}>
                <coneGeometry args={[0.3, 0.6, 4]} />
                <meshStandardMaterial color="#222" roughness={0.5} />
            </mesh>
            <mesh castShadow receiveShadow position={[0.5, 0.8, 0]}>
                <coneGeometry args={[0.3, 0.6, 4]} />
                <meshStandardMaterial color="#222" roughness={0.5} />
            </mesh>

            {/* Spider-suit Eyes */}
            <mesh position={[-0.3, 0.2, 0.76]} rotation={[0, 0, 0.2]}>
                <capsuleGeometry args={[0.15, 0.3, 4, 8]} />
                <meshBasicMaterial color="#FFF" />
            </mesh>
            <mesh position={[0.3, 0.2, 0.76]} rotation={[0, 0, -0.2]}>
                <capsuleGeometry args={[0.15, 0.3, 4, 8]} />
                <meshBasicMaterial color="#FFF" />
            </mesh>

            {/* Web pattern details (simple lines mock) */}
            <mesh position={[0, 0, 0.76]}>
                <boxGeometry args={[0.02, 1.2, 0.05]} />
                <meshBasicMaterial color="#000" />
            </mesh>
            <mesh position={[0, 0, 0.76]} rotation={[0, 0, Math.PI / 2]}>
                <boxGeometry args={[0.02, 1.5, 0.05]} />
                <meshBasicMaterial color="#000" />
            </mesh>
        </group>
    );
}

// Idealmente: usar `useGLTF('/spidercat.glb')` quando o arquivo 3D estiver disponível.
function SpiderCatModel() {
    return <PlaceholderCat />;
}

export function SpiderCat3D() {
    return (
        <div className="w-full h-[400px] relative rounded-3xl overflow-hidden bg-gradient-to-tr from-black/80 via-black/40 to-primary/20 border border-white/10 shadow-2xl backdrop-blur-md mb-12 group cursor-grab active:cursor-grabbing">
            {/* Decorative text */}
            <div className="absolute top-6 left-6 z-10 pointer-events-none">
                <h3 className="text-white/90 font-black tracking-widest uppercase text-2xl drop-shadow-md">
                    Spider-Cat <span className="text-primary italic">Miles</span>
                </h3>
                <p className="text-white/50 text-xs tracking-widest uppercase mt-1">
                    Interactive 3D Hologram • Drag to rotate
                </p>
            </div>

            <Canvas shadows camera={{ position: [0, 0, 5], fov: 45 }}>
                <fog attach="fog" args={['#000', 5, 20]} />

                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} castShadow />
                <pointLight position={[-10, -10, -10]} intensity={1} color="#E62429" />

                <Suspense fallback={null}>
                    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
                        <SpiderCatModel />
                    </Float>
                    <Environment preset="city" />
                </Suspense>

                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    minPolarAngle={Math.PI / 3}
                    maxPolarAngle={Math.PI / 1.5}
                />
            </Canvas>
        </div>
    );
}
