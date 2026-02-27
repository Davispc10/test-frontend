"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PokeballTransitionProps {
    onComplete?: () => void;
}

export function PokeballTransition({ onComplete }: PokeballTransitionProps) {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            if (onComplete) onComplete();
        }, 1200); // Aumentado de 800 para 1200

        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }} // Aumentado
                    className="fixed inset-0 z-[90] flex items-center justify-center pointer-events-none"
                >
                    {/* Dark overlay background */}
                    <motion.div
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 0 }}
                        transition={{ duration: 1, delay: 0.2, ease: "easeInOut" }} // Aumentado
                        className="absolute inset-0 bg-[#111111]"
                    />

                    {/* Pokeball Container for spinning */}
                    <motion.div
                        initial={{ scale: 0.5, rotate: 0 }}
                        animate={{ scale: 2, rotate: 360, opacity: 0 }} // Escala um pouco maior
                        transition={{ duration: 1.2, ease: "easeInOut" }} // Aumentado
                        className="relative w-32 h-32 flex flex-col z-10"
                    >
                        {/* Top Half */}
                        <motion.div
                            initial={{ y: 0 }}
                            animate={{ y: "-80px", opacity: 0 }}
                            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }} // Aumentado
                            className="w-full h-1/2 bg-[#222222] rounded-t-full border-b-[4px] border-[#111] relative overflow-hidden"
                            style={{ boxShadow: "inset 0 -10px 20px rgba(0,0,0,0.5)" }}
                        />

                        {/* Bottom Half */}
                        <motion.div
                            initial={{ y: 0 }}
                            animate={{ y: "80px", opacity: 0 }}
                            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }} // Aumentado
                            className="w-full h-1/2 bg-[#2a2a2a] rounded-b-full border-t-[4px] border-[#111] relative overflow-hidden"
                            style={{ boxShadow: "inset 0 10px 20px rgba(0,0,0,0.5)" }}
                        />

                        {/* Center Button Area */}
                        <motion.div
                            initial={{ scale: 1 }}
                            animate={{ scale: 0, opacity: 0 }}
                            transition={{ duration: 0.5, delay: 0.4, ease: "easeIn" }} // Aumentado
                            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-[#111] rounded-full flex items-center justify-center border-4 border-[#333]"
                        >
                            <div className="w-4 h-4 bg-[#444] rounded-full" />
                        </motion.div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
