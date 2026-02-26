import React from "react";
import { PokeballLoader } from "@/components/pokeball-loader";

export default function Loading() {
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#080808]">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-red-600/10 blur-[100px] rounded-full pointer-events-none" />

            <div className="relative z-10">
                <PokeballLoader />
            </div>
        </div>
    );
}
