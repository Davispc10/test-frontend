"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Search } from "lucide-react";
import { motion } from "framer-motion";

export function TeamRocketError() {
    const router = useRouter();

    const rocketQuotes = [
        "Parece que a Equipe Rocket chegou aqui primeiro!",
        "Prepare-se para o encrenca! Este Pokémon já era!",
        "Encrenca em dobro! Não encontramos esse Pokémon.",
        "A Equipe Rocket decolando de novo... com esse Pokémon!",
        "Meowth, é isso aí! Seu Pokémon sumiu!",
    ];

    const randomQuote = rocketQuotes[Math.floor(Math.random() * rocketQuotes.length)];

    return (
        <main className="min-h-screen bg-[#080808] flex flex-col items-center justify-center p-6 text-white relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] bg-red-900/10 rounded-full blur-[100px] pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative z-10 flex flex-col items-center text-center max-w-2xl mx-auto space-y-8"
            >
                {/* Team Rocket Image Image */}
                <div className="relative w-64 h-64 md:w-80 md:h-80 drop-shadow-[0_0_30px_rgba(239,68,68,0.3)]">
                    <img
                        src="https://www.nicepng.com/png/full/224-2246253_team-rocket-pokemon-xy-anime-jessie-james.png"
                        alt="Equipe Rocket"
                        className="w-full h-full object-contain"
                    />
                </div>

                <div className="space-y-4">
                    <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase text-red-500">
                        Erro 404!
                    </h1>
                    <p className="text-xl md:text-2xl font-bold text-white/90 italic">
                        "{randomQuote}"
                    </p>
                    <p className="text-sm md:text-base text-white/50 uppercase tracking-widest font-black max-w-md mx-auto">
                        O Pokémon que você está procurando não existe, ou foi roubado.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-8">
                    <Button
                        onClick={() => router.push('/search')}
                        className="bg-red-500 hover:bg-red-600 text-white font-black uppercase tracking-widest px-8 py-6 rounded-2xl flex items-center gap-3 transition-transform hover:scale-105"
                    >
                        <Search className="w-5 h-5" />
                        Pokedex
                    </Button>
                    <Button
                        onClick={() => router.back()}
                        variant="ghost"
                        className="text-white hover:bg-white/10 font-black uppercase tracking-widest px-8 py-6 rounded-2xl flex items-center gap-3 border border-white/10 transition-transform hover:scale-105"
                    >
                        <ChevronLeft className="w-5 h-5" />
                        Voltar
                    </Button>
                </div>
            </motion.div>
        </main>
    );
}
