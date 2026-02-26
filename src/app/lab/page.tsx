"use client";

import React from "react";
import { Sparkles, FlaskConical, Database, Dna, Activity, ScanFace } from "lucide-react";

export default function LabPage() {
    return (
        <main className="min-h-screen bg-[#080808] text-white p-4 sm:p-6 md:p-12 pb-36 sm:pb-32 relative overflow-hidden">
            <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16 relative z-10">
                <header className="space-y-6">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-8">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 sm:gap-4">
                                <div className="p-2.5 sm:p-3 bg-blue-500/10 rounded-2xl border border-blue-500/20 shrink-0">
                                    <FlaskConical className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" />
                                </div>
                                <div>
                                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-black italic tracking-tighter uppercase leading-[1.1]">Laboratório<br className="sm:hidden" /> de Pesquisa</h1>
                                    <p className="text-white/40 text-[10px] sm:text-xs font-bold uppercase tracking-widest leading-none mt-1 sm:mt-2">Análise Bio-estatística e Dossiês</p>
                                </div>
                            </div>
                            <p className="text-slate-400 text-sm sm:text-base max-w-2xl font-medium leading-relaxed">
                                Acesse os registros mais fascinantes do mundo Pokémon. Nossa equipe compila dados extraordinários sobre anomalias genéticas, recordes de espécies e métricas biológicas únicas.
                            </p>
                        </div>
                    </div>
                </header>

                <section className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
                    {/* Recordes Hub */}
                    <div className="xl:col-span-2 bg-white/2 border border-white/10 rounded-[2rem] sm:rounded-[3rem] p-6 sm:p-10 md:p-14 space-y-8 sm:space-y-10 relative overflow-hidden group hover:border-blue-500/30 transition-colors">
                        <div className="absolute top-0 right-0 p-6 sm:p-10 opacity-5 group-hover:opacity-10 transition-opacity">
                            <Sparkles className="w-24 h-24 sm:w-40 sm:h-40" />
                        </div>
                        <div className="space-y-4 sm:space-y-6 relative z-10">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-6 sm:h-8 bg-blue-500 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
                                <h3 className="text-xl sm:text-2xl font-black italic uppercase tracking-tighter">Recordes e Extremos</h3>
                            </div>
                            <p className="text-slate-400 text-sm sm:text-base leading-relaxed font-medium italic">
                                "Os limites físicos e biológicos documentados até hoje. Estes dados continuam a desafiar nossa compreensão científica."
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 relative z-10">
                            {[
                                { label: "Mais Pesado", value: "999.9 kg", sub: "Cosmoem / Celesteela", icon: Database },
                                { label: "Mais Alto", value: "20.0 m", sub: "Eternatus", icon: Activity },
                                { label: "Nível Base Máx.", value: "608 EXP", sub: "Blissey", icon: Dna },
                                { label: "Taxa C. Mínima", value: "3", sub: "Lendários e Míticos", icon: ScanFace },
                            ].map((stat, idx) => (
                                <div key={stat.label} className="p-5 sm:p-6 bg-white/5 rounded-3xl sm:rounded-[2rem] border border-white/5 hover:border-blue-500/20 hover:bg-blue-500/5 transition-all group/item shadow-xl relative overflow-hidden">
                                    <stat.icon className="absolute -right-4 -bottom-4 w-20 h-20 sm:w-24 sm:h-24 text-white/5 group-hover/item:text-blue-500/10 transition-colors -z-0 rotate-12" />
                                    <div className="relative z-10">
                                        <div className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 group-hover/item:text-blue-400 transition-colors">{stat.label}</div>
                                        <div className="text-2xl sm:text-3xl font-black italic tracking-tighter mt-1 sm:mt-2">{stat.value}</div>
                                        <div className="text-[9px] sm:text-[10px] font-bold text-white/40 uppercase mt-1 sm:mt-2 tracking-widest">{stat.sub}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Daily Pokemon Highlight - "Anomalia Biológica" */}
                    <div className="bg-[#121212] border border-red-500/20 rounded-[2rem] sm:rounded-[3rem] p-6 sm:p-10 flex flex-col justify-between relative overflow-hidden group shadow-2xl h-full min-h-[400px]">
                        <div className="absolute inset-0 bg-gradient-to-br from-red-600/5 via-transparent to-purple-600/10 transition-all duration-700 pointer-events-none" />

                        {/* Top Badge */}
                        <div className="flex items-center justify-between mb-8 relative z-10 w-full">
                            <div className="flex items-center gap-2 px-4 py-2 bg-red-500/10 rounded-full border border-red-500/20 overflow-hidden relative">
                                <div className="absolute inset-0 bg-red-500/20 blur-xl animate-pulse" />
                                <Activity className="w-4 h-4 text-red-400 relative z-10" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-red-400 relative z-10">Anomalia em Foco</span>
                            </div>
                            <div className="w-2 h-2 rounded-full bg-red-500 animate-ping absolute right-2" />
                            <div className="w-2 h-2 rounded-full bg-red-500 absolute right-2" />
                        </div>

                        {/* Content */}
                        <div className="flex flex-col items-center justify-center text-center space-y-6 relative z-10 flex-1">
                            {/* Animated Inner Rings */}
                            <div className="relative w-32 h-32 sm:w-40 sm:h-40 flex items-center justify-center mb-4">
                                <div className="absolute inset-0 border-2 border-dashed border-red-500/30 rounded-full animate-[spin_10s_linear_infinite]" />
                                <div className="absolute inset-4 border border-purple-500/20 rounded-full animate-[spin_15s_linear_infinite_reverse]" />

                                <img
                                    src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/150.png"
                                    alt="Mewtwo"
                                    className="w-28 h-28 sm:w-32 sm:h-32 object-contain drop-shadow-[0_0_25px_rgba(239,68,68,0.4)] hover:scale-110 transition-transform duration-500 cursor-crosshair relative z-10"
                                    style={{ filter: "sepia(1) hue-rotate(-50deg) saturate(3) opacity(0.8)" }} // Holographic red effect
                                />
                            </div>

                            <div className="space-y-3">
                                <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-widest text-white/90 drop-shadow-md">
                                    Mewtwo
                                </h3>
                                <p className="text-red-400/80 text-xs sm:text-sm italic font-medium max-w-xs leading-relaxed">
                                    "Clone genético projetado com atributos psíquicos desproporcionais. Categoria de risco: Severa."
                                </p>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-2 gap-3 w-full mt-4">
                                <div className="bg-black/40 border border-white/5 rounded-2xl p-3 flex flex-col items-center justify-center backdrop-blur-sm">
                                    <span className="text-[9px] text-white/40 uppercase font-black tracking-widest">Ameaça</span>
                                    <span className="text-white font-bold text-sm">Nível S</span>
                                </div>
                                <div className="bg-black/40 border border-white/5 rounded-2xl p-3 flex flex-col items-center justify-center backdrop-blur-sm">
                                    <span className="text-[9px] text-white/40 uppercase font-black tracking-widest">Status</span>
                                    <span className="text-red-400 font-bold text-sm hover:animate-pulse">Contido</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            {/* Ambient Background Glows */}
            <div className="fixed inset-0 pointer-events-none -z-10">
                <div className="absolute top-[-10%] right-[-5%] w-[50%] h-[50%] bg-blue-600/5 blur-[130px] rounded-full" />
                <div className="absolute bottom-[20%] left-[-10%] w-[40%] h-[40%] bg-purple-600/5 blur-[100px] rounded-full" />
            </div>
        </main>
    );
}
