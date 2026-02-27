"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

interface TiltedCardProps {
    children: React.ReactNode;
    className?: string;
}

export function TiltedCard({ children, className = "" }: TiltedCardProps) {
    const ref = useRef<HTMLDivElement>(null);

    const [isHovered, setIsHovered] = useState(false);

    const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
    const x = useSpring(0, springConfig);
    const y = useSpring(0, springConfig);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        const mouseX = e.clientX - rect.left - width / 2;
        const mouseY = e.clientY - rect.top - height / 2;

        // Calculate rotation (-15 to 15 degrees)
        const rotateX = (mouseY / (height / 2)) * -15;
        const rotateY = (mouseX / (width / 2)) * 15;

        x.set(rotateX);
        y.set(rotateY);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        x.set(0);
        y.set(0);
    };

    return (
        <div className={`relative perspective-[1200px] w-full h-full ${className}`}>
            <motion.div
                ref={ref}
                onMouseEnter={() => setIsHovered(true)}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                    rotateX: x,
                    rotateY: y,
                    transformStyle: "preserve-3d",
                }}
                initial={{ scale: 1 }}
                animate={{ scale: isHovered ? 1.05 : 1 }}
                transition={{ duration: 0.2 }}
                className="w-full h-full"
            >
                <div
                    style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }}
                    className="w-full h-full pointer-events-none"
                >
                    {children}
                </div>
            </motion.div>
        </div>
    );
}
