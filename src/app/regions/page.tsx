"use client";

import { Map, Info, TreeDeciduous, Waves, Mountain, Wind, X, ExternalLink } from "lucide-react";
import { useRouter } from "next/navigation";
import { REGIONS } from "@/lib/pokemon-api";
import { usePokemonStore } from "@/lib/store";
import { RegionBanners } from "@/components/region-banners";
import React from "react";

const regionDetails: Record<string, {
    professor: string;
    landmark: string;
    legendaries: number[];
    lore: string;
    color: string;
}> = {
    kanto: {
        professor: "Carvalho (Oak)",
        landmark: "Cidade de Pallet",
        legendaries: [144, 145, 146, 150],
        lore: "A região onde tudo começou. Conhecida por suas vastas planícies e as icônicas aves lendárias.",
        color: "#4ade80"
    },
    johto: {
        professor: "Elm",
        landmark: "Cidade de Ecruteak",
        legendaries: [243, 244, 245, 249, 250],
        lore: "Uma região rica em história e tradição, onde as lendas de pássaros sagrados e feras míticas ganham vida.",
        color: "#fb923c"
    },
    hoenn: {
        professor: "Birch",
        landmark: "Cidade de Sootopolis",
        legendaries: [382, 383, 384],
        lore: "Cercada por águas profundas e vulcões ativos, é o palco do conflito entre a terra e o mar.",
        color: "#60a5fa"
    },
    sinnoh: {
        professor: "Rowan",
        landmark: "Monte Coronet",
        legendaries: [483, 484, 487],
        lore: "Um lugar de mitos antigos sobre a criação do tempo e do espaço, dominado por cadeias de montanhas.",
        color: "#c084fc"
    },
    unova: {
        professor: "Araragi (Juniper)",
        landmark: "Cidade de Castelia",
        legendaries: [643, 644, 646],
        lore: "Uma região urbana de contrastes, onde a verdade e os ideais se encontram sob arranha-céus.",
        color: "#10b981"
    },
    kalos: {
        professor: "Sycamore",
        landmark: "Cidade de Lumiose",
        legendaries: [716, 717, 718],
        lore: "Famosa por sua beleza e elegância, é o lar das Mega Evoluções e de lendas sobre a vida e a morte.",
        color: "#38bdf8"
    },
    alola: {
        professor: "Kukui",
        landmark: "Hau'oli City",
        legendaries: [785, 786, 787, 788, 791, 792],
        lore: "Um paraíso tropical formado por ilhas, onde o sol e a lua regem o equilíbrio da natureza.",
        color: "#facc15"
    },
    galar: {
        professor: "Magnolia",
        landmark: "Wyndon",
        legendaries: [888, 889, 890],
        lore: "Inspirada em terras industriais e medievais, é conhecida pelo fenômeno Dynamax e sua cultura vibrante.",
        color: "#f472b6"
    },
    paldea: {
        professor: "Sada / Turo",
        landmark: "Mesagoza",
        legendaries: [1007, 1008],
        lore: "Uma vasta região aberta onde o passado e o futuro coexistem em harmonia com tesouros escondidos.",
        color: "#818cf8"
    }
};

export default function RegionsPage() {
    const router = useRouter();
    const { setRegion, setRarityFilter, resetFilters, minId, maxId } = usePokemonStore();

    const handleSeeMoreLegendaries = () => {
        const activeRegion = getActiveRegion();
        const regionData = REGIONS.find(r => r.name.toLowerCase() === activeRegion);
        if (regionData) {
            resetFilters(); // Limpa filtros anteriores para evitar o bug de toggle do zustand
            setRegion(regionData.min, regionData.max);
            setRarityFilter('legendary');
            router.push("/search");
        }
    };

    const getActiveRegion = () => {
        if (minId === 1 && maxId === 151) return "kanto";
        if (minId === 152 && maxId === 251) return "johto";
        if (minId === 252 && maxId === 386) return "hoenn";
        if (minId === 387 && maxId === 493) return "sinnoh";
        if (minId === 494 && maxId === 649) return "unova";
        if (minId === 650 && maxId === 721) return "kalos";
        if (minId === 722 && maxId === 809) return "alola";
        if (minId === 810 && maxId === 898) return "galar";
        if (minId === 899 && maxId === 1025) return "paldea";
        return undefined;
    };

    const activeRegion = getActiveRegion();
    const details = activeRegion ? regionDetails[activeRegion] : null;

    return (
        <main className="min-h-screen bg-[#080808] text-white p-6 md:p-12 pb-32 relative overflow-hidden">
            {/* Ambient Background */}
            {details && (
                <div
                    className="fixed top-0 right-0 w-[50vw] h-[50vh] blur-[150px] opacity-10 transition-colors duration-1000 -z-10 pointer-events-none"
                    style={{ backgroundColor: details.color }}
                />
            )}

            <div className="max-w-7xl mx-auto space-y-12 relative z-10">
                <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-2">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-500/10 rounded-2xl border border-blue-500/20 shrink-0">
                            <Map className="w-6 h-6 text-blue-500" />
                        </div>
                        <div>
                            <h1 className="text-3xl sm:text-4xl font-black italic tracking-tighter uppercase">Atlas de Regiões</h1>
                            <p className="text-white/40 text-[10px] sm:text-xs font-bold uppercase tracking-widest leading-none mt-1">Exploração Geo-biológica do Mundo Pokémon</p>
                        </div>
                    </div>
                </header>

                <section className="space-y-6 pt-4">
                    <RegionBanners
                        onSelectRegion={setRegion}
                        activeRegion={activeRegion}
                    />
                </section>

                <section className="animate-in fade-in slide-in-from-bottom-8 duration-700">
                    {details ? (
                        <div className="grid lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-[2rem] sm:rounded-[3rem] p-6 sm:p-10 md:p-14 space-y-8 sm:space-y-10 relative overflow-hidden backdrop-blur-sm shadow-2xl transition-colors duration-500" style={{ borderColor: `${details.color}40` }}>
                                <div className="absolute top-0 right-0 p-12 opacity-[0.02] pointer-events-none">
                                    <Map className="w-32 h-32 sm:w-64 sm:h-64 rotate-12" />
                                </div>

                                <div className="space-y-4 sm:space-y-6 max-w-2xl relative z-10">
                                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-blue-400">
                                        <Info className="w-3.5 h-3.5" />
                                        Dossiê Regional
                                    </div>
                                    <h3 className="text-5xl sm:text-6xl md:text-7xl font-black italic uppercase tracking-tighter text-white break-words" style={{ color: details.color, wordBreak: 'break-word' }}>
                                        {activeRegion}
                                    </h3>
                                    <p className="text-lg sm:text-xl text-white/60 leading-relaxed font-medium">
                                        {details.lore}
                                    </p>
                                </div>

                                <div className="grid sm:grid-cols-2 gap-8 pt-8 border-t border-white/5 relative z-10">
                                    <div className="space-y-2">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-white/30">Pesquisador Líder</p>
                                        <p className="text-2xl font-black italic uppercase text-blue-500">Prof. {details.professor}</p>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-white/30">Ponto de Interesse</p>
                                        <p className="text-2xl font-black italic uppercase text-white">{details.landmark}</p>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-4 pt-4 relative z-10">
                                    {[
                                        { icon: TreeDeciduous, label: "Flora Exótica" },
                                        { icon: Waves, label: "Correntes Marítimas" },
                                        { icon: Mountain, label: "Aglomerados Geológicos" },
                                        { icon: Wind, label: "Atmosfera Estável" }
                                    ].map((biome) => (
                                        <div key={biome.label} className="flex items-center gap-2 px-5 py-2.5 bg-white/5 rounded-2xl border border-white/10 text-[10px] font-black uppercase tracking-widest text-white/50 hover:bg-white/10 transition-colors">
                                            <biome.icon className="w-4 h-4" />
                                            {biome.label}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-[#121212] border border-white/10 rounded-[3rem] p-10 flex flex-col items-center justify-between text-center relative overflow-hidden group shadow-2xl transition-colors duration-500" style={{ borderColor: `${details.color}40` }}>
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent transition-all duration-700 pointer-events-none"
                                    style={{ background: `linear-gradient(to bottom, transparent, transparent, ${details.color}15)` }}
                                />

                                <div className="z-10 w-full space-y-8">
                                    <div className="space-y-2">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-white/30">Guardiões da Região</p>
                                        <h4 className="text-xl font-black italic uppercase tracking-tighter">Pokémons Lendários</h4>
                                    </div>

                                    <div className="relative h-64 w-full flex items-center justify-center">
                                        <div className="absolute inset-0 blur-[80px] rounded-full scale-75 group-hover:scale-100 transition-transform duration-1000 opacity-20 pointer-events-none"
                                            style={{ backgroundColor: details.color }}
                                        />
                                        <div className="flex -space-x-12 z-10 pointer-events-none">
                                            {details.legendaries.slice(0, 3).map((id, idx) => (
                                                <div
                                                    key={id}
                                                    className={`relative w-32 h-32 transition-all duration-700 group-hover:translate-y-[-10px]`}
                                                    style={{ transitionDelay: `${idx * 150}ms`, zIndex: 10 - idx }}
                                                >
                                                    <img
                                                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
                                                        alt="Legendary"
                                                        className="w-full h-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <p className="text-white/40 text-sm font-medium italic z-10 px-4">
                                        Estes espécimes raros definem a força e a história de {activeRegion?.toUpperCase()}.
                                    </p>

                                    <button
                                        onClick={handleSeeMoreLegendaries}
                                        className="z-10 w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-[0.2em] text-white/50 hover:bg-white/10 hover:border-white/20 hover:text-white transition-all group/btn"
                                    >
                                        Explorar Lendários de {activeRegion}
                                        <ExternalLink className="w-3.5 h-3.5 opacity-50 group-hover/btn:opacity-100 group-hover/btn:translate-x-0.5 transition-all" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-gradient-to-br from-blue-600/10 to-red-600/10 border border-white/10 rounded-[3rem] p-12 flex flex-col justify-center items-center text-center space-y-6 min-h-[400px] backdrop-blur-md">
                            <div className="w-24 h-24 rounded-full border-4 border-dashed border-white/10 flex items-center justify-center animate-[spin_15s_linear_infinite]">
                                <Map className="w-10 h-10 opacity-20" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-2xl font-black italic uppercase tracking-tighter">Pronto para a Expedição?</h3>
                                <p className="text-white/40 text-sm font-medium max-w-md">
                                    Selecione um segmento territorial acima para carregar o dossiê geográfico e bio-estatístico correspondente.
                                </p>
                            </div>
                        </div>
                    )}
                </section>
            </div>

            {/* Background Decorator */}
            <div className="fixed inset-0 pointer-events-none -z-10">
                <div className="absolute top-[-10%] left-[-5%] w-[50%] h-[50%] bg-blue-600/5 blur-[130px] rounded-full" />
            </div>
        </main>
    );
}
