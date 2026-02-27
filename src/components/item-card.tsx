import { Card } from "@/components/ui/card";
import Image from "next/image";
import { TiltedCard } from "./tilted-card";
import { useItem } from "@/hooks/useItemQuery";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Package, Coins } from "lucide-react";

interface ItemCardProps {
    id: number;
    name: string;
    imageUrl: string;
}

export function ItemCard({ id, name, imageUrl }: ItemCardProps) {
    const { data: item, isLoading } = useItem(id);
    const [isImageLoading, setIsImageLoading] = useState(true);

    const category = item?.category?.name || "item";

    // Cores baseadas na categoria (simplificado)
    const categoryColors: Record<string, string> = {
        "standard-balls": "#ef4444",
        "special-balls": "#3b82f6",
        "all-machines": "#f59e0b",
        "evolution": "#8b5cf6",
        "medicine": "#10b981",
        "stat-boosts": "#f43f5e",
        "held-items": "#6366f1",
    };

    const accentColor = categoryColors[category] || "#64748b";

    return (
        <div className="block h-full cursor-default group" style={{ '--card-accent': accentColor } as React.CSSProperties}>
            <TiltedCard>
                <Card className="relative overflow-hidden h-40 bg-[#0d0d0d] border border-white/5 rounded-[2rem] transition-all duration-500 group-hover:border-white/20 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.05)]">

                    {/* Background Accent Glow */}
                    <div
                        className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] blur-[60px] opacity-10 group-hover:opacity-30 transition-opacity duration-700 rounded-full"
                        style={{ backgroundColor: accentColor }}
                    />

                    <div className="relative z-10 p-5 h-full flex flex-col justify-between">
                        <div className="space-y-2">
                            <div className="flex flex-col">
                                <h3 className="text-xl font-black text-white capitalize italic tracking-tighter leading-none group-hover:text-[var(--card-accent)] transition-colors duration-300">
                                    {name.replace(/-/g, ' ')}
                                </h3>
                                <div className="flex items-center gap-1.5 mt-1">
                                    <Package className="w-3 h-3 text-white/20" />
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">{category}</span>
                                </div>
                            </div>

                            <div className="flex gap-2">
                                {isLoading ? (
                                    <Skeleton className="h-4 w-12 bg-white/5 rounded-full" />
                                ) : item?.cost && item.cost > 0 ? (
                                    <div className="flex items-center gap-1 px-2 py-0.5 bg-yellow-500/10 border border-yellow-500/20 rounded-full">
                                        <Coins className="w-3 h-3 text-yellow-500" />
                                        <span className="text-[10px] font-black text-yellow-500">
                                            {item.cost}
                                        </span>
                                    </div>
                                ) : null}
                            </div>
                        </div>

                        <div className="text-[9px] font-medium text-white/30 line-clamp-2 max-w-[60%]">
                            {item?.flavor_text_entries.find(e => e.language.name === 'en')?.text || "Nenhuma descrição disponível."}
                        </div>
                    </div>

                    {/* Item Image */}
                    <div className="absolute bottom-4 right-4 w-16 h-16 z-20 transition-all duration-700 ease-out group-hover:scale-125 group-hover:-translate-x-2 drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)] flex items-center justify-center">
                        <Image
                            src={imageUrl}
                            alt={name}
                            fill
                            sizes="64px"
                            unoptimized
                            loading="lazy"
                            className={cn("object-contain transition-opacity duration-300", isImageLoading ? "opacity-0" : "opacity-100")}
                            onLoad={() => setIsImageLoading(false)}
                        />
                        {isImageLoading && <Skeleton className="w-8 h-8 rounded-full bg-white/5 animate-pulse" />}
                    </div>
                </Card>
            </TiltedCard>
        </div>
    );
}
