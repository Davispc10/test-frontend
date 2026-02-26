"use client";

import React from "react";
import { usePokemon } from "@/hooks/usePokemonQuery";
import { use } from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Heart, Info, BarChart3, FastForward, MapPin, BookOpen, Scale, Ruler, Sparkles, Swords, Target, Trophy, Users, Cloud, History, Egg } from "lucide-react";
import Image from "next/image";
import { PokemonImage } from "@/components/pokemon-image";
import { useRouter } from "next/navigation";
import { typeIcons } from "@/lib/type-icons";
import { typeHexColors, typeClasses } from "@/lib/pokemon-types";
import { cn } from "@/lib/utils";
import { getWeaknesses, getStrengths } from "@/lib/type-effectiveness";
import { PokemonCryButton } from "@/components/pokemon-cry-button";
import { PokeballTransition } from "@/components/pokeball-transition";
import { TypeMatchupModal } from "@/components/type-matchup-modal";
import { TeamRocketError } from "@/components/team-rocket-error";
import { getPokemonRegion } from "@/lib/pokemon-api";

const habitatTranslations: Record<string, string> = {
    "cave": "Caverna",
    "forest": "Floresta",
    "grassland": "Campo",
    "mountain": "Montanha",
    "rare": "Raro",
    "rough-terrain": "Terreno Áspero",
    "sea": "Mar",
    "urban": "Urbano",
    "waters-edge": "Beira da Água"
};

const growthRateTranslations: Record<string, string> = {
    "slow": "Lento",
    "medium": "Médio",
    "fast": "Rápido",
    "medium-slow": "Médio Lento",
    "slow-then-very-fast": "Errático",
    "fast-then-very-slow": "Flutuante"
};

export default function PokemonDetail({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const id = resolvedParams.id;
    const router = useRouter();

    const [activeTab, setActiveTab] = React.useState<"about" | "stats" | "evolution">("about");
    const [showShiny, setShowShiny] = React.useState(false);
    const [animationComplete, setAnimationComplete] = React.useState(false);
    const [selectedType, setSelectedType] = React.useState<string | null>(null);
    const [gifError, setGifError] = React.useState(false);

    // Touch handlers para Swipe
    const [touchStart, setTouchStart] = React.useState<number | null>(null);
    const [touchEnd, setTouchEnd] = React.useState<number | null>(null);
    const minSwipeDistance = 50;

    const { data: pokemon, isLoading, isError } = usePokemon(id);

    React.useEffect(() => {
        setGifError(false);
    }, [pokemon?.id, showShiny]);

    // Audio effect on entry
    React.useEffect(() => {
        if (pokemon?.cries?.latest && animationComplete) {
            const audio = new Audio(pokemon.cries.latest);
            audio.volume = 0.3;
            audio.play().catch(e => console.warn("Autoplay blocked or audio error:", e));
        }
    }, [pokemon, animationComplete]);

    // Keyboard navigation
    React.useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!pokemon) return;
            if (e.key === "ArrowLeft" && pokemon.id > 1) {
                router.push(`/character/${pokemon.id - 1}`);
            } else if (e.key === "ArrowRight" && pokemon.id < 10325) {
                router.push(`/character/${pokemon.id + 1}`);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [pokemon, router]);

    const onTouchStart = (e: React.TouchEvent) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd || !pokemon) return;
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if (isLeftSwipe && pokemon.id < 10320) {
            router.push(`/character/${pokemon.id + 1}`);
        }
        if (isRightSwipe && pokemon.id > 1) {
            router.push(`/character/${pokemon.id - 1}`);
        }
    };

    if (isError) {
        return <TeamRocketError />;
    }

    if (isLoading || !pokemon) {
        return (
            <main className="min-h-screen bg-[#080808] animate-pulse lg:pl-0">
                <div className="w-full h-[40vh] bg-white/5 relative"></div>
                <div className="max-w-4xl mx-auto px-6 space-y-6 pt-12">
                    <Skeleton className="h-16 w-3/4 bg-white/5 rounded-2xl" />
                    <Skeleton className="h-4 w-full bg-white/5" />
                    <Skeleton className="h-4 w-2/3 bg-white/5" />
                </div>
            </main>
        );
    }

    const mainImageUrl = showShiny
        ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${pokemon.id}.png`
        : pokemon.imageUrl;

    const types = pokemon?.types || [];
    const mainType = types[0]?.type.name || 'normal';
    const accentColor = typeHexColors[mainType] || "#ef4444";
    const weaknesses = getWeaknesses(types.map((t: any) => t.type.name));
    const strengths = getStrengths(types.map((t: any) => t.type.name));

    // GIF Sources (using Showdown)
    const gifUrl = showShiny
        ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/shiny/${pokemon.id}.gif`
        : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${pokemon.id}.gif`;

    // Função recursiva para extrair a cadeia de evolução
    const getEvolutionChain = (chain: any): any[] => {
        const result = [];
        let current = chain;
        do {
            const id = current.species.url.split('/').filter(Boolean).pop();
            result.push({
                name: current.species.name,
                id: id,
                image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
            });
            current = current.evolves_to[0];
        } while (current);
        return result;
    }

    const evolutionChain = pokemon.evolution_chain ? getEvolutionChain(pokemon.evolution_chain.chain) : [];

    return (
        <main
            className="min-h-screen bg-[#080808] text-white selection:bg-red-500/30 overflow-x-hidden pb-32"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
        >
            <PokeballTransition onComplete={() => setAnimationComplete(true)} />

            {/* Desktop Navigation Arrows */}
            {pokemon.id > 1 && (
                <button
                    onClick={() => router.push(`/character/${pokemon.id - 1}`)}
                    className="hidden lg:flex fixed left-32 top-1/2 -translate-y-1/2 z-50 p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full backdrop-blur-md transition-all hover:scale-110 group cursor-pointer"
                    title="Pokémon Anterior"
                >
                    <ChevronLeft className="w-8 h-8 text-white/50 group-hover:text-white group-hover:-translate-x-1 transition-transform" />
                </button>
            )}
            {pokemon.id < 10325 && (
                <button
                    onClick={() => router.push(`/character/${pokemon.id + 1}`)}
                    className="hidden lg:flex fixed right-8 top-1/2 -translate-y-1/2 z-50 p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full backdrop-blur-md transition-all hover:scale-110 group cursor-pointer"
                    title="Próximo Pokémon"
                >
                    <ChevronRight className="w-8 h-8 text-white/50 group-hover:text-white group-hover:translate-x-1 transition-transform" />
                </button>
            )}

            {/* Dynamic Background Glow */}
            <div className="fixed inset-0 pointer-events-none">
                <div
                    className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[80%] h-[40%] blur-[150px] opacity-20 rounded-full"
                    style={{ backgroundColor: accentColor }}
                />
            </div>

            {/* Header Fixed */}
            <nav className="fixed top-0 left-0 lg:left-24 right-0 p-6 z-50 flex justify-between items-center bg-transparent pointer-events-none">
                <div className="pointer-events-auto">
                    <Button
                        onClick={() => router.push('/search')}
                        variant="ghost"
                        size="icon"
                        className="text-white hover:bg-white/10 rounded-2xl h-12 w-12 border border-white/5 backdrop-blur-md"
                    >
                        <ChevronLeft className="h-6 w-6" />
                    </Button>
                </div>
                <div className="pointer-events-auto">
                    <div className="flex items-center bg-white/5 border border-white/10 p-1 pr-4 rounded-2xl backdrop-blur-md shadow-xl transition-all hover:border-white/20">
                        {/* Region Part */}
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-red-600 rounded-xl shadow-[0_0_15px_rgba(220,38,38,0.2)]">
                            <MapPin className="w-3 h-3 text-white animate-pulse" />
                            <span className="text-[10px] font-black uppercase italic tracking-widest text-white leading-none">
                                {getPokemonRegion(pokemon.id)}
                            </span>
                        </div>
                        {/* ID Part */}
                        <div className="pl-3 flex items-center gap-2">
                            <div className="w-[1px] h-3 bg-white/10" />
                            <span className="text-[10px] font-black italic tracking-[0.2em] text-white/40 leading-none pb-0.5">
                                NO_{pokemon.id.toString().padStart(4, '0')}
                            </span>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Visualization */}
            <div className="relative w-full h-[45vh] flex flex-col items-center justify-center pt-20">
                <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none overflow-hidden select-none">
                    <span className="text-[4rem] sm:text-[10rem] md:text-[20rem] font-black uppercase italic px-4 text-center whitespace-nowrap overflow-hidden text-ellipsis max-w-full">
                        {pokemon.name}
                    </span>
                </div>

                <div className="relative w-64 h-64 md:w-80 md:h-80 z-20 group">
                    <div className="absolute inset-0 bg-white/5 rounded-full blur-3xl scale-75 group-hover:scale-110 transition-transform duration-1000" />

                    {/* Animated Sprite (GIF) and Official Artwork */}
                    <div className="relative w-full h-full flex items-center justify-center group">
                        <PokemonImage
                            src={mainImageUrl}
                            alt={pokemon.name}
                            fill
                            className={cn(
                                "object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-700",
                                showShiny && "brightness-110 contrast-110"
                            )}
                            priority
                        />

                        {/* Smaller Floating GIF */}
                        {!gifError && (
                            <div className="absolute -bottom-4 -right-4 w-24 h-24 md:w-32 md:h-32 bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-4 transition-transform hover:scale-110">
                                <img
                                    src={gifUrl}
                                    alt="Animated Sprite"
                                    className="w-full h-full object-contain"
                                    onError={() => setGifError(true)}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <div className="px-6 md:px-12 relative z-10 max-w-4xl mx-auto space-y-12 pb-20">

                {/* Identity Header */}
                <div className="text-center space-y-3 px-4">
                    <h1 className="text-4xl sm:text-6xl md:text-8xl font-black italic tracking-tighter uppercase leading-tight md:leading-none break-words">
                        {pokemon.name}
                    </h1>
                    <div className="flex flex-col items-center gap-4">
                        <p className="text-white/40 font-black uppercase tracking-[0.4em] text-xs">
                            {pokemon.category} • Região de {getPokemonRegion(pokemon.id)}
                        </p>
                        <div className="flex gap-4 items-center flex-wrap justify-center">
                            {pokemon.cries?.latest && (
                                <PokemonCryButton cries={pokemon.cries} name={pokemon.name} type="latest" />
                            )}
                            {pokemon.cries?.legacy && (
                                <PokemonCryButton cries={pokemon.cries} name={pokemon.name} type="legacy" />
                            )}
                            <button
                                onClick={() => setShowShiny(!showShiny)}
                                className={cn(
                                    "group relative flex items-center justify-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 overflow-hidden border cursor-pointer",
                                    showShiny
                                        ? "bg-amber-500/20 text-amber-500 border-amber-500/30 font-medium"
                                        : "bg-white/5 hover:bg-amber-500/10 text-white/70 hover:text-amber-500 border-white/10 hover:border-amber-500/30 font-medium"
                                )}
                                title={showShiny ? "Ver versão normal" : "Ver versão Shiny"}
                            >
                                <Sparkles className={cn("w-5 h-5 transition-transform duration-300", showShiny ? "animate-pulse scale-110" : "group-hover:scale-110")} />
                                <span className="text-sm">
                                    {showShiny ? 'Shiny Ativo' : 'Ver Shiny'}
                                </span>
                            </button>
                        </div>
                        <div className="flex justify-center gap-3">
                            {pokemon.types.map((t: any) => (
                                <button
                                    key={t.type.name}
                                    onClick={() => setSelectedType(t.type.name)}
                                    className={cn(
                                        "flex items-center gap-2.5 px-5 py-2 rounded-2xl text-white text-[10px] font-black uppercase tracking-widest border border-white/10 backdrop-blur-md shadow-xl transition-transform hover:scale-105 hover:brightness-125 focus:outline-none cursor-pointer",
                                        typeClasses[t.type.name]
                                    )}
                                >
                                    <div
                                        className="w-4 h-4 flex items-center justify-center brightness-150"
                                        dangerouslySetInnerHTML={{ __html: typeIcons[t.type.name] }}
                                    />
                                    {t.type.name}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Modern Navigation Tabs */}
                <div className="grid grid-cols-3 gap-2 p-1.5 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-md">
                    {[
                        { id: "about", icon: Info, label: "Sobre" },
                        { id: "stats", icon: BarChart3, label: "Status" },
                        { id: "evolution", icon: FastForward, label: "Evoluções" }
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={cn(
                                "flex items-center justify-center gap-2 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer",
                                activeTab === tab.id
                                    ? "bg-white/10 text-white shadow-inner"
                                    : "text-white/30 hover:text-white/60"
                            )}
                        >
                            <tab.icon className="h-4 w-4" />
                            <span className="hidden sm:inline">{tab.label}</span>
                        </button>
                    ))}
                </div>

                {/* Tab Sections with Glassmorphism */}
                <div className="min-h-[400px]">
                    {activeTab === "about" && (
                        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            {/* Bio Container */}
                            <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-8 opacity-5 text-white">
                                    <BookOpen className="w-48 h-48 rotate-12" />
                                </div>
                                <p className="text-xl md:text-2xl text-slate-300 font-medium leading-[1.6] relative z-10 italic">
                                    {pokemon.flavor_text || "Nenhuma descrição disponível para este Pokémon no momento."}
                                </p>
                            </div>

                            {/* Info Grid */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {[
                                    { label: "Peso", value: `${(pokemon.weight / 10).toFixed(1)} kg`, icon: Scale },
                                    { label: "Altura", value: `${(pokemon.height / 10).toFixed(1)} m`, icon: Ruler },
                                    { label: "Região", value: getPokemonRegion(pokemon.id), icon: MapPin },
                                    { label: "ID ", value: `#${pokemon.id.toString().padStart(4, '0')}`, icon: Info }
                                ].map((item, i) => (
                                    <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-[2rem] flex flex-col items-center gap-2 hover:bg-white/10 transition-colors">
                                        <item.icon className="w-5 h-5 text-white/20" />
                                        <div className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">{item.label}</div>
                                        <div className="text-white font-black text-lg text-center">{item.value}</div>
                                    </div>
                                ))}
                            </div>

                            {/* Abilities & Habitat */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-6">
                                    <h3 className="text-sm font-black uppercase tracking-[0.4em] text-white/20 flex items-center gap-3">
                                        <Swords className="w-4 h-4" /> Habilidades
                                    </h3>
                                    <div className="space-y-4">
                                        {pokemon.abilities && pokemon.abilities.length > 0 ? pokemon.abilities.map((a: any) => (
                                            <div key={a.ability.name} className="bg-white/5 border border-white/10 p-5 rounded-3xl group hover:bg-white/10 transition-all">
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="text-sm font-black uppercase tracking-widest text-white group-hover:text-red-500 transition-colors">
                                                        {a.ability.name.replace(/-/g, ' ')}
                                                    </span>
                                                    {a.is_hidden && (
                                                        <span className="text-[9px] font-black uppercase px-2 py-0.5 bg-white/5 text-white/40 rounded-full border border-white/10">
                                                            Oculta
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-xs text-slate-400 leading-relaxed font-medium capitalize">
                                                    {a.description || "Nenhuma descrição disponível."}
                                                </p>
                                            </div>
                                        )) : (
                                            <div className="text-white/20 text-xs italic px-6 py-4 bg-white/5 rounded-3xl border border-white/5">
                                                Nenhuma habilidade registrada.
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <h3 className="text-sm font-black uppercase tracking-[0.4em] text-white/20 flex items-center gap-3">
                                        <Cloud className="w-4 h-4" /> Ecologia & Treinamento
                                    </h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-white/5 border border-white/10 p-5 rounded-3xl">
                                            <div className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-1">Habitat</div>
                                            <div className="text-sm font-black text-white capitalize">{habitatTranslations[pokemon.habitat || ""] || pokemon.habitat || "Desconhecido"}</div>
                                        </div>
                                        <div className="bg-white/5 border border-white/10 p-5 rounded-3xl">
                                            <div className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-1">Crescimento</div>
                                            <div className="text-sm font-black text-white capitalize">{growthRateTranslations[pokemon.growth_rate || ""] || pokemon.growth_rate || "Desconhecido"}</div>
                                        </div>
                                        <div className="bg-white/5 border border-white/10 p-5 rounded-3xl">
                                            <div className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-1">Taxa de Captura</div>
                                            <div className="text-sm font-black text-white">{pokemon.capture_rate || "Desconhecido"}</div>
                                        </div>
                                        <div className="bg-white/5 border border-white/10 p-5 rounded-3xl">
                                            <div className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-1">Exp. Base</div>
                                            <div className="text-sm font-black text-white">{pokemon.base_experience ? `${pokemon.base_experience} XP` : "Desconhecido"}</div>
                                        </div>
                                        <div className="bg-white/5 border border-white/10 p-5 rounded-3xl">
                                            <div className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-1">Felicidade Base</div>
                                            <div className="text-sm font-black text-white">{pokemon.base_happiness ?? "Desconhecido"}</div>
                                        </div>
                                    </div>
                                    <div className="bg-white/5 border border-white/10 p-5 rounded-3xl flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <Egg className="w-4 h-4 text-white/20" />
                                            <div>
                                                <div className="text-[10px] font-black uppercase tracking-widest text-white/20">Grupos de Ovos</div>
                                                <div className="text-sm font-black text-white capitalize">
                                                    {pokemon.egg_groups?.map((g: any) => g.name).join(", ") || "Desconhecido"}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Defenses Section */}
                            <section className="space-y-6 pt-4 border-t border-white/10 mt-8">
                                <h3 className="text-sm font-black uppercase tracking-[0.4em] text-white/20 text-center">Vantagens de Tipo</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-4">
                                        <h4 className="text-xs font-black uppercase tracking-[0.2em] text-green-500/50 text-center">Forte Contra</h4>
                                        <div className="flex flex-wrap justify-center gap-3">
                                            {strengths.length > 0 ? strengths.map((s: any) => (
                                                <button
                                                    key={s}
                                                    onClick={() => setSelectedType(s)}
                                                    className={cn(
                                                        "w-12 h-12 rounded-2xl flex items-center justify-center border border-white/10 shadow-2xl transition-transform hover:scale-110 hover:brightness-125 shrink-0 focus:outline-none cursor-pointer",
                                                        typeClasses[s]
                                                    )}
                                                    title={s}
                                                >
                                                    <div className="w-6 h-6 flex items-center justify-center brightness-150 [&>svg]:w-full [&>svg]:h-full [&>svg]:object-contain" dangerouslySetInnerHTML={{ __html: typeIcons[s] }} />
                                                </button>
                                            )) : <span className="text-white/20 text-xs italic">Nenhuma</span>}
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <h4 className="text-xs font-black uppercase tracking-[0.2em] text-red-500/50 text-center">Fraco Contra</h4>
                                        <div className="flex flex-wrap justify-center gap-3">
                                            {weaknesses.map(w => (
                                                <button
                                                    key={w}
                                                    onClick={() => setSelectedType(w)}
                                                    className={cn(
                                                        "w-12 h-12 rounded-2xl flex items-center justify-center border border-white/10 shadow-2xl transition-transform hover:scale-110 hover:brightness-125 shrink-0 focus:outline-none cursor-pointer",
                                                        typeClasses[w]
                                                    )}
                                                    title={w}
                                                >
                                                    <div className="w-6 h-6 flex items-center justify-center brightness-150 [&>svg]:w-full [&>svg]:h-full [&>svg]:object-contain" dangerouslySetInnerHTML={{ __html: typeIcons[w] }} />
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    )}

                    {activeTab === "stats" && (
                        <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 md:p-12 space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="space-y-8">
                                {pokemon.stats.map((s) => {
                                    const statNames: Record<string, string> = {
                                        "hp": "HP",
                                        "attack": "Ataque",
                                        "defense": "Defesa",
                                        "special-attack": "Atq. Esp.",
                                        "special-defense": "Def. Esp.",
                                        "speed": "Velocidade"
                                    };
                                    return (
                                        <div key={s.stat.name} className="group">
                                            <div className="flex justify-between items-end mb-3 px-1">
                                                <div className="text-[11px] font-black uppercase tracking-[0.2em] text-white/40 group-hover:text-white transition-colors">
                                                    {statNames[s.stat.name] || s.stat.name}
                                                </div>
                                                <div className="text-xl font-black italic text-white leading-none">
                                                    {s.base_stat}
                                                </div>
                                            </div>
                                            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5 p-px">
                                                <div
                                                    className="h-full rounded-full transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                                                    style={{
                                                        width: `${Math.min(100, (s.base_stat / 200) * 100)}%`,
                                                        backgroundColor: s.base_stat > 100 ? "#4ade80" : s.base_stat > 70 ? "#38bdf8" : "#f87171"
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="pt-8 border-t border-white/5 flex items-center justify-between text-white/20 text-[10px] font-black uppercase tracking-widest">
                                <span>Análise : {pokemon.name}</span>
                                <span className="text-white/40">Eficiência Total: {pokemon.stats.reduce((acc, curr) => acc + curr.base_stat, 0)} pts</span>
                            </div>
                        </div>
                    )}

                    {activeTab === "evolution" && (
                        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            {/* Evolution Chain Section */}
                            <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 md:p-12">
                                <h3 className="text-sm font-black uppercase tracking-[0.4em] text-white/20 text-center mb-12">Cadeia de Evolução</h3>

                                {evolutionChain.length <= 1 && (!pokemon.mega_evolutions || pokemon.mega_evolutions.length === 0) ? (
                                    <div className="flex flex-col items-center justify-center text-center space-y-6">
                                        <div className="relative w-64 h-64 opacity-70 hover:opacity-100 transition-opacity duration-300">
                                            <img
                                                src="https://www.nicepng.com/png/full/224-2246253_team-rocket-pokemon-xy-anime-jessie-james.png"
                                                alt="Equipe Rocket"
                                                className="w-full h-full object-contain grayscale hover:grayscale-0 transition-all duration-500"
                                            />
                                        </div>
                                        <div className="space-y-4">
                                            <p className="text-sm md:text-base font-black uppercase tracking-widest text-red-500/80">Nenhuma Evolução Encontrada</p>
                                            <p className="text-[10px] md:text-xs font-black uppercase tracking-widest text-white/40 max-w-sm leading-relaxed mx-auto italic">
                                                "Parece que a Equipe Rocket passou por aqui... ou talvez este Pokémon já seja poderoso o suficiente na sua forma única!"
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    evolutionChain.length > 1 && (
                                        <div className="flex flex-col md:flex-row justify-center items-center gap-12">
                                            {evolutionChain.map((evo, i) => (
                                                <React.Fragment key={evo.id}>
                                                    <Link href={`/character/${evo.id}`} className="flex flex-col items-center group cursor-pointer">
                                                        <div className="relative w-40 h-40 mb-6 transition-transform group-hover:scale-110 duration-500">
                                                            <div className="absolute inset-4 bg-white/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                                                            <PokemonImage src={evo.image} alt={evo.name} fill className="object-contain drop-shadow-2xl" />
                                                        </div>
                                                        <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-black text-white/40 mb-2 uppercase italic tracking-widest">
                                                            Nº_{evo.id.padStart(3, '0')}
                                                        </div>
                                                        <div className="text-2xl font-black italic uppercase tracking-tighter text-white group-hover:text-red-500 transition-colors">
                                                            {evo.name}
                                                        </div>
                                                    </Link>
                                                    {i < evolutionChain.length - 1 && (
                                                        <div className="text-red-500 font-black text-4xl transform rotate-90 md:rotate-0 opacity-20">
                                                            ≫
                                                        </div>
                                                    )}
                                                </React.Fragment>
                                            ))}
                                        </div>
                                    )
                                )}
                            </div>

                            {/* Mega Evolutions Section */}
                            {pokemon.mega_evolutions && pokemon.mega_evolutions.length > 0 && (
                                <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 md:p-12">
                                    <h3 className="text-sm font-black uppercase tracking-[0.4em] text-white/20 text-center mb-12">Mega Evoluções</h3>
                                    <div className="flex flex-wrap justify-center gap-12">
                                        {pokemon.mega_evolutions.map((mega) => (
                                            <Link href={`/character/${mega.id}`} key={mega.id} className="flex flex-col items-center group cursor-pointer">
                                                <div className="relative w-48 h-48 mb-6 transition-transform group-hover:scale-110 duration-500">
                                                    <div className="absolute inset-4 bg-white/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                                                    <PokemonImage src={mega.imageUrl} alt={mega.name} fill className="object-contain drop-shadow-2xl" />
                                                </div>
                                                <div className="flex gap-2 mb-2">
                                                    <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-black text-white/40 uppercase italic tracking-widest">
                                                        Nº_{mega.id.toString().padStart(3, '0')}
                                                    </div>
                                                    <div className="px-3 py-1 bg-yellow-500/10 border border-yellow-500/20 rounded-full text-[10px] font-black text-yellow-500 uppercase italic tracking-widest">
                                                        Mega Evolução
                                                    </div>
                                                </div>
                                                <div className="text-2xl font-black italic uppercase tracking-tighter text-white group-hover:text-yellow-500 transition-colors text-center max-w-[200px]">
                                                    {mega.name}
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}

                        </div>
                    )}
                </div>
            </div>

            <TypeMatchupModal type={selectedType} onClose={() => setSelectedType(null)} />
        </main>
    );
}
