"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Map, ShoppingBag, FlaskConical } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function Navigation() {
    const pathname = usePathname();

    const NavIcon = ({ href, icon: Icon, isActive }: { href: string, icon: any, isActive: boolean }) => (
        <Link
            href={href}
            className={cn(
                "flex flex-col items-center justify-center p-2 sm:p-4 transition-all duration-300 rounded-2xl",
                isActive ? "text-red-500 bg-red-500/10 shadow-[0_0_20px_rgba(239,68,68,0.2)] border border-red-500/20" : "text-white/40 hover:text-white/70 hover:bg-white/5 border border-transparent"
            )}
        >
            <Icon className={cn(
                "w-5 h-5 sm:w-7 sm:h-7 transition-transform duration-500",
                isActive ? "scale-110 stroke-[2.5px]" : "stroke-[1.5px] hover:scale-110"
            )} />
        </Link>
    );

    return (
        <>
            <aside className="fixed left-0 top-0 h-screen w-24 hidden lg:flex flex-col items-center justify-center gap-10 py-10 z-[100] border-r border-white/5 bg-[#080808]/80 backdrop-blur-xl">
                <NavIcon href="/lab" icon={FlaskConical} isActive={pathname === "/lab"} />
                <NavIcon href="/regions" icon={Map} isActive={pathname === "/regions"} />

                <Link href="/" className="relative group transition-transform hover:scale-110 duration-500">
                    <div className={cn(
                        "relative w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500",
                        pathname === "/" ? "shadow-[0_0_30px_rgba(239,68,68,0.4)]" : "opacity-80 hover:opacity-100"
                    )}>
                        <img src="/ball.png" alt="Início" className="w-full h-full object-contain drop-shadow-lg" />
                    </div>
                </Link>

                <NavIcon href="/items" icon={ShoppingBag} isActive={pathname === "/items"} />
                <NavIcon href="/search" icon={Search} isActive={pathname === "/search"} />
            </aside>

            {/* Bottom Nav Mobile */}
            <nav className="fixed bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 lg:hidden z-[100] h-16 sm:h-20 bg-[#080808]/80 backdrop-blur-xl border border-white/10 rounded-[2rem] sm:rounded-[2.5rem] flex items-center justify-around px-2 sm:px-6 shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
                <NavIcon href="/lab" icon={FlaskConical} isActive={pathname === "/lab"} />
                <NavIcon href="/regions" icon={Map} isActive={pathname === "/regions"} />

                <Link href="/" className="relative group -mt-6 sm:-mt-10 transition-transform hover:scale-110 duration-500 px-1 sm:px-2 shrink-0">
                    <div className={cn(
                        "relative w-14 h-14 sm:w-20 sm:h-20 rounded-full flex items-center justify-center bg-[#080808] border border-white/10 p-1.5 sm:p-2 transition-all duration-500",
                        pathname === "/" ? "shadow-[0_0_30px_rgba(239,68,68,0.4)] border-red-500/50" : "shadow-xl"
                    )}>
                        <div className="relative w-full h-full hover:rotate-12 transition-transform duration-500">
                            <img src="/ball.png" alt="Início" className="w-full h-full object-contain drop-shadow-2xl" />
                        </div>
                    </div>
                </Link>

                <NavIcon href="/items" icon={ShoppingBag} isActive={pathname === "/items"} />
                <NavIcon href="/search" icon={Search} isActive={pathname === "/search"} />
            </nav>

        </>
    );
}
