// src/components/bottom-nav.tsx
"use client";

import { Home, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function BottomNav() {
    const pathname = usePathname();

    return (
        <div className="fixed bottom-0 left-0 right-0 h-20 bg-white/80 backdrop-blur-lg border-t border-slate-100 px-8 flex items-center justify-between z-50">
            <Link href="/" className={cn(
                "flex flex-col items-center space-y-1 transition-colors",
                pathname === "/" ? "text-slate-800" : "text-slate-300"
            )}>
                <Home className="w-6 h-6" />
            </Link>

            <Link href="/" className="relative -top-8 group">
                <div className="w-16 h-16 bg-white rounded-full border-4 border-white shadow-[0_10px_25px_rgba(0,0,0,0.1)] flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-active:scale-95 cursor-pointer overflow-hidden relative">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                        {/* Upper part (Red) */}
                        <path d="M 5,50 A 45,45 0 0 1 95,50 L 5,50" fill="#EF4444" stroke="#333" strokeWidth="4" />
                        {/* Lower part (White) */}
                        <path d="M 5,50 A 45,45 0 0 0 95,50 L 5,50" fill="white" stroke="#333" strokeWidth="4" />
                        {/* Middle line */}
                        <line x1="5" y1="50" x2="95" y2="50" stroke="#333" strokeWidth="4" />
                        {/* Outer Center Circle */}
                        <circle cx="50" cy="50" r="12" fill="white" stroke="#333" strokeWidth="4" />
                        {/* Inner Center Circle */}
                        <circle cx="50" cy="50" r="6" fill="white" stroke="#333" strokeWidth="1" />
                        {/* Highlight/Reflection */}
                        <path d="M 25,25 A 30,30 0 0 1 45,15" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" opacity="0.4" />
                    </svg>
                </div>
                {/* Glow effect */}
                <div className="absolute inset-0 bg-red-400/20 blur-xl rounded-full -z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>

            <button className="flex flex-col items-center space-y-1 text-slate-300 hover:text-slate-800 transition-colors">
                <Settings className="w-6 h-6" />
            </button>
        </div>
    );
}
