"use client";

import React from "react";
import { ItemList } from "@/components/item-list";
import { ShoppingBag } from "lucide-react";

export default function ItemsPage() {
    return (
        <main className="min-h-screen bg-[#080808] text-white p-6 md:p-12 pb-32">
            <div className="max-w-7xl mx-auto space-y-16">
                <header className="space-y-6">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 sm:gap-4 shrink-0">
                                <div className="p-2 sm:p-3 bg-yellow-500/10 rounded-xl sm:rounded-2xl border border-yellow-500/20 shrink-0">
                                    <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <h1 className="text-2xl sm:text-4xl md:text-5xl font-black italic tracking-tighter uppercase break-words sm:whitespace-normal">Marketplace Pokémon</h1>
                                    <p className="text-white/40 text-[9px] sm:text-xs font-bold uppercase tracking-widest leading-tight sm:leading-none mt-1 break-words sm:whitespace-normal">Equipamentos, Itens de Cura & Pokébolas</p>
                                </div>
                            </div>
                            <p className="text-slate-400 max-w-2xl font-medium leading-relaxed text-xs sm:text-sm px-1 sm:px-0">
                                Explore o inventário completo de itens do mundo Pokémon. Desde Pokébolas de alta tecnologia até medicinas raras e itens de batalha. Tudo o que um mestre precisa para sua jornada.
                            </p>
                        </div>
                    </div>
                </header>

                <section className="space-y-10">
                    <div className="flex items-center gap-3 sm:gap-4 border-b border-white/5 pb-6 sm:pb-8 px-2 sm:px-0">
                        <div className="w-1.5 sm:w-2 h-6 sm:h-8 bg-yellow-500 rounded-full shadow-[0_0_15px_rgba(234,179,8,0.5)] shrink-0" />
                        <h2 className="text-2xl sm:text-3xl font-black italic tracking-tighter uppercase">Catálogo de Itens</h2>
                    </div>

                    <ItemList />
                </section>
            </div>

            {/* Ambient Background Glows */}
            <div className="fixed inset-0 pointer-events-none -z-10">
                <div className="absolute top-[-10%] right-[-5%] w-[50%] h-[50%] bg-yellow-600/5 blur-[130px] rounded-full" />
                <div className="absolute bottom-[20%] left-[-10%] w-[40%] h-[40%] bg-blue-600/5 blur-[100px] rounded-full" />
            </div>
        </main>
    );
}
