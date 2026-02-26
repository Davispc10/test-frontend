"use client";

import { CharacterList } from "@/components/character-list";
import { RegionBanners } from "@/components/region-banners";
import { useMarvelStore } from "@/lib/store";
import { PokedexScene } from "@/components/pokedex-scene";
import NextImage from "next/image";
import Link from "next/link";
import { SearchBar } from "@/components/search-bar";
import { SearchFilters } from "@/components/search-filters";
import { X, Trash2, Sparkles, ChevronDown, ChevronUp, Search } from "lucide-react";
import { typeIcons } from "@/lib/type-icons";
import { typeClasses } from "@/lib/pokemon-types";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

export default function Home() {
  const { setRegion, minId, maxId, typeFilters, setTypeFilter, resetFilters, searchQuery } = useMarvelStore();
  const [showPokedex, setShowPokedex] = useState(false);

  // Auto-show Pokedex when searching
  useEffect(() => {
    if (searchQuery) {
      setShowPokedex(true);
    }
  }, [searchQuery]);

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

  const regionTitle = getActiveRegion() ? getActiveRegion()?.toUpperCase() : "NATIONAL";

  return (
    <main className="min-h-screen bg-[#080808] text-white selection:bg-red-500/30 overflow-x-hidden">
      {/* Ambient Background Glows */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-5%] w-[50%] h-[50%] bg-red-600/10 blur-[130px] rounded-full" />
        <div className="absolute bottom-[20%] right-[-10%] w-[40%] h-[40%] bg-blue-600/5 blur-[100px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-2 md:pt-16 pb-8 lg:pb-32 relative z-10 min-h-[100dvh] flex flex-col justify-center">
        {/* Hero Section */}
        <header className="flex flex-col lg:grid lg:grid-cols-2 gap-4 lg:gap-12 items-center">
          {/* Pokedex Scene - High priority on mobile */}
          <div className="relative h-[200px]  lg:h-[650px] w-full group order-first lg:order-last -mt-4 lg:mt-0">
            {/* 3D Model Aura */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-red-500/20 blur-[120px] rounded-full opacity-50 group-hover:opacity-80 transition-opacity duration-1000" />
            <PokedexScene />
          </div>

          <div className="space-y-8 flex flex-col items-center lg:items-start text-center lg:text-left order-last lg:order-first">
            <div className="relative w-48 h-12 md:h-16 lg:mt-0">
              <NextImage
                src="https://upload.wikimedia.org/wikipedia/commons/9/98/International_Pok%C3%A9mon_logo.svg"
                alt="Pokémon Logo"
                fill
                className="object-contain drop-shadow-[0_0_15px_rgba(255,203,5,0.3)]"
                priority
              />
            </div>

            <div className="space-y-4">
              <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.8] text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500">
                POKÉDEX
              </h1>
              <h2 className="text-3xl md:text-6xl font-black tracking-tighter leading-[0.8]">By Kayo</h2>

              <p className="text-slate-400 text-sm md:text-xl font-medium max-w-lg leading-relaxed border-red-500/30 border-l-0 lg:border-l-2 pl-0 lg:pl-6 hidden sm:block">
                Explore o universo Pokémon através da Pokédex oficial. Navegue pelas regiões, descubra novas espécies e ouça seus sons clássicos.
              </p>
            </div>

            <div className="w-full max-w-[500px] sm:max-w-2xl pt-8 relative z-20 flex flex-col sm:flex-row gap-4 lg:gap-6 items-center lg:items-start">
              <Link href="/search" className="w-full sm:w-auto">
                <button className="w-full relative inline-flex items-center justify-center gap-3 px-6 lg:px-8 py-4 h-[60px] bg-red-600 border-[3px] border-black rounded-2xl shadow-[6px_6px_0px_#000] hover:shadow-[8px_8px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-none transition-all cursor-pointer group/comic sm:min-w-[200px] lg:min-w-[240px]">
                  <span className="text-white font-black italic uppercase tracking-tighter text-lg whitespace-nowrap">
                    Busca Avançada
                  </span>
                  <Search className="w-5 h-5 lg:w-6 lg:h-6 text-white group-hover/comic:scale-110 transition-transform shrink-0" strokeWidth={3} />
                </button>
              </Link>

              {/* Botão para mostrar PokéDex */}
              <button
                onClick={() => setShowPokedex(!showPokedex)}
                className="w-full sm:w-auto h-[60px] flex items-center justify-center gap-2 lg:gap-3 px-6 lg:px-8 py-4 rounded-2xl bg-white/5 border-[3px] border-transparent hover:border-white/10 hover:bg-white/10 active:scale-95 transition-all text-xs lg:text-sm font-black uppercase tracking-widest group shadow-xl backdrop-blur-md sm:min-w-[200px] lg:min-w-[240px] cursor-pointer"
              >
                <img
                  src="/ball.png"
                  alt="Pokeball"
                  className={cn("w-5 h-5 lg:w-6 lg:h-6 transition-all duration-500 drop-shadow-lg shrink-0", showPokedex ? "rotate-180 scale-110 opacity-50" : "group-hover:rotate-180")}
                />
                <span className={cn("transition-colors whitespace-nowrap", showPokedex ? "text-white/60" : "text-white")}>
                  {showPokedex ? "Recolher PokéDex" : "Abrir PokéDex"}
                </span>
                {showPokedex ? <ChevronUp className="w-4 h-4 lg:w-5 lg:h-5 opacity-40 shrink-0" /> : <ChevronDown className="w-4 h-4 lg:w-5 lg:h-5 opacity-40 shrink-0" />}
              </button>
            </div>

          </div>
        </header>


        <div className="space-y-20 mt-12 md:mt-24">
          {showPokedex && (
            <section className="space-y-10 animate-in fade-in slide-in-from-bottom-10 duration-700">
              <div className="flex flex-col gap-6 border-b border-white/5 pb-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <div className="w-2 h-8 bg-red-600 rounded-full shadow-[0_0_15px_rgba(220,38,38,0.5)]" />
                    <h2 className="text-3xl md:text-4xl font-black italic tracking-tighter uppercase">
                      Enciclopédia Pokémon
                    </h2>
                  </div>
                </div>
              </div>

              {/* Search and Filters Bar - Identical to search page */}
              <div className="flex flex-col gap-6">
                <div className="flex gap-4 items-center w-full">
                  <div className="flex-1">
                    <SearchBar />
                  </div>
                  <SearchFilters />
                </div>

                {/* Active Filters */}
                {(getActiveRegion() || typeFilters.length > 0) && (
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex flex-wrap gap-2">
                      {typeFilters.map((type) => (
                        <div
                          key={type}
                          className={cn(
                            "flex items-center gap-2 px-3 py-1.5 border border-white/5 rounded-full text-white text-[10px] font-bold uppercase tracking-widest backdrop-blur-md shadow-lg transition-all",
                            typeClasses[type.toLowerCase()]
                          )}
                        >
                          <div
                            className="w-3.5 h-3.5 flex items-center justify-center shrink-0 brightness-150"
                            dangerouslySetInnerHTML={{ __html: typeIcons[type.toLowerCase()] || "" }}
                          />
                          <span>{type}</span>
                          <button
                            onClick={() => setTypeFilter(type)}
                            className="hover:bg-black/20 p-0.5 rounded-full transition-colors flex items-center justify-center cursor-pointer"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                      {getActiveRegion() && (
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-[10px] font-bold uppercase tracking-widest">
                          <span>Região: {getActiveRegion()}</span>
                          <button onClick={() => setRegion(undefined, undefined)} className="hover:bg-blue-500/20 hover:text-blue-300 p-1 rounded-full transition-colors flex items-center justify-center cursor-pointer">
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => resetFilters()}
                      className="flex justify-center items-center gap-2 px-6 py-2.5 rounded-xl bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest hover:bg-red-500/10 hover:border-red-500/20 hover:text-red-500 transition-all shrink-0 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                      Reset Filters
                    </button>
                  </div>
                )}

                <div className="relative z-10">
                  <CharacterList />
                </div>
              </div>
            </section>
          )}




          {/* Seção de Regiões ou Atalhos rápidos podem ficar aqui no futuro */}
        </div>
      </div>
    </main>

  );
}



