import { Card } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { PokemonImage } from "./pokemon-image";
import { TiltedCard } from "./tilted-card";
import { usePokemon } from "@/hooks/usePokemonQuery";
import { Skeleton } from "@/components/ui/skeleton";
import { typeIcons } from "@/lib/type-icons";
import { typeHexColors, typeClasses } from "@/lib/pokemon-types";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { TypeMatchupModal } from "./type-matchup-modal";
import { getTranslatedType } from "@/lib/translations";

interface CharacterProps {
    id: number;
    name: string;
    imageUrl: string;
    types: {
        type: {
            name: string;
        };
    }[];
}

export function CharacterCard({ id, name, imageUrl, types }: CharacterProps) {
    // Retiramos o usePokemon(id) que fazia 20 requisições extras no navegador!
    const [selectedType, setSelectedType] = useState<string | null>(null);
    const [isImageLoading, setIsImageLoading] = useState(true);

    const mainType = types[0]?.type.name || 'normal';
    const accentColor = typeHexColors[mainType] || "#ef4444";
    const paddedId = id.toString().padStart(3, '0');

    return (
        <Link href={`/character/${id}`} className="block h-full cursor-pointer group" style={{ '--card-accent': accentColor } as React.CSSProperties}>
            <TiltedCard>
                <Card className="relative overflow-hidden h-44 bg-[#0d0d0d] border border-white/5 rounded-[2rem] transition-all duration-500 group-hover:border-white/20 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.05)]">

                    {/* Background Type Accent Glow */}
                    <div
                        className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] blur-[60px] opacity-10 group-hover:opacity-30 transition-opacity duration-700 rounded-full"
                        style={{ backgroundColor: accentColor }}
                    />

                    {/* Background ID Watermark */}
                    <div className="absolute top-4 left-6 text-white/5 font-black text-6xl italic select-none pointer-events-none group-hover:text-white/20 transition-colors duration-500">
                        #{paddedId}
                    </div>

                    <div className="relative z-10 p-6 h-full flex flex-col justify-between">
                        <div className="space-y-3">
                            <div className="flex flex-col">
                                <h3 className="text-2xl font-black text-white capitalize italic tracking-tighter leading-none group-hover:text-[var(--card-accent)] transition-colors duration-300">
                                    {name}
                                </h3>
                            </div>

                            <div className="flex gap-1.5 flex-wrap">
                                {types.map((t: any) => (
                                    <button
                                        key={t.type.name}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            setSelectedType(t.type.name);
                                        }}
                                        className={cn(
                                            "text-white text-[9px] font-black uppercase py-1 px-3 rounded-full flex items-center gap-1.5 border border-white/5 backdrop-blur-md shadow-lg hover:brightness-125 hover:scale-105 transition-all cursor-pointer",
                                            typeClasses[t.type.name]
                                        )}
                                    >
                                        <div className="w-3 h-3 flex items-center justify-center shrink-0 brightness-150"
                                            dangerouslySetInnerHTML={{ __html: typeIcons[t.type.name] || '' }}
                                        />
                                        {getTranslatedType(t.type.name)}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="flex items-center gap-2 group/btn">
                            <span className="text-[9px] font-black uppercase tracking-widest text-white/20 group-hover:text-white/50 transition-colors">
                                Ver Detalhes
                            </span>
                            <div className="w-4 h-px bg-white/10 group-hover:w-8 group-hover:bg-red-500 transition-all" />
                        </div>
                    </div>

                    {/* Character Image overlapping */}
                    <div className="absolute bottom-4 right-4 w-32 h-32 z-20 transition-all duration-700 ease-out group-hover:scale-110 group-hover:-translate-y-4 drop-shadow-[0_15px_30px_rgba(0,0,0,0.5)] flex flex-col items-center justify-center">
                        {isImageLoading && (
                            <div className="absolute inset-0 flex items-center justify-center z-30">
                                <Image
                                    src="/pokeball.png"
                                    alt="Carregando..."
                                    width={48}
                                    height={48}
                                    className="animate-spin opacity-40 drop-shadow-md"
                                />
                            </div>
                        )}
                        <PokemonImage
                            src={imageUrl}
                            alt={name}
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className={cn("object-contain transition-opacity duration-300", isImageLoading ? "opacity-0" : "opacity-100")}
                            priority={false}
                            onLoad={() => setIsImageLoading(false)}
                        />
                    </div>

                    {/* Scan Line Animation */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent h-1/2 w-full -translate-y-full group-hover:translate-y-[200%] transition-transform duration-[2000ms] pointer-events-none" />
                </Card>
            </TiltedCard>
            <TypeMatchupModal type={selectedType} onClose={() => setSelectedType(null)} />
        </Link>
    );
}
