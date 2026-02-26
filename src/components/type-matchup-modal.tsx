import React, { useEffect } from "react";
import { X } from "lucide-react";
import { typeIcons } from "@/lib/type-icons";
import { typeClasses } from "@/lib/pokemon-types";
import { cn } from "@/lib/utils";
import { getTypeDetails } from "@/lib/type-effectiveness";

interface TypeMatchupModalProps {
    type: string | null;
    onClose: () => void;
}

export function TypeMatchupModal({ type, onClose }: TypeMatchupModalProps) {
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [onClose]);

    if (!type) return null;

    const details = getTypeDetails(type);
    if (!details) return null;

    const TypeList = ({ types, title, emptyMsg, colorClass }: { types: string[], title: string, emptyMsg: string, colorClass: string }) => (
        <div className="space-y-3">
            <h4 className={cn("text-xs font-black uppercase tracking-[0.2em] text-center", colorClass)}>{title}</h4>
            <div className="flex flex-wrap justify-center gap-2">
                {types.length > 0 ? types.map(t => (
                    <div
                        key={t}
                        className={cn(
                            "w-10 h-10 rounded-xl flex items-center justify-center border border-white/10 shadow-lg shrink-0",
                            typeClasses[t.toLowerCase()]
                        )}
                        title={t}
                    >
                        <div className="w-5 h-5 flex items-center justify-center brightness-150 [&>svg]:w-full [&>svg]:h-full [&>svg]:object-contain" dangerouslySetInnerHTML={{ __html: typeIcons[t.toLowerCase()] || '' }} />
                    </div>
                )) : <span className="text-white/20 text-xs italic">{emptyMsg}</span>}
            </div>
        </div>
    );

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300" onClick={onClose}>
            <div
                className={cn(
                    "relative w-full max-w-md p-6 sm:p-8 rounded-[2rem] border border-white/10 shadow-2xl bg-[#0d0d0d]",
                )}
                onClick={e => e.stopPropagation()}
            >
                <div className={cn("absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-t-[2rem]", typeClasses[type.toLowerCase()])} style={{ height: '4px' }} />

                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-colors cursor-pointer"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="flex flex-col items-center gap-4 mb-8">
                    <div
                        className={cn(
                            "w-16 h-16 rounded-2xl flex items-center justify-center border border-white/10 shadow-[0_0_30px_rgba(255,255,255,0.1)]",
                            typeClasses[type.toLowerCase()]
                        )}
                    >
                        <div className="w-8 h-8 flex items-center justify-center brightness-150 [&>svg]:w-full [&>svg]:h-full [&>svg]:object-contain" dangerouslySetInnerHTML={{ __html: typeIcons[type.toLowerCase()] || '' }} />
                    </div>
                    <h2 className="text-2xl font-black italic tracking-tighter uppercase text-white capitalize">{type}</h2>
                </div>

                <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                        <TypeList types={details.strengths} title="Forte Contra" emptyMsg="Nenhuma" colorClass="text-green-500/50" />
                        <TypeList types={details.weaknesses} title="Fraco Contra" emptyMsg="Nenhuma" colorClass="text-red-500/50" />
                    </div>

                    {(details.resistances.length > 0 || details.immunities.length > 0) && (
                        <div className="grid grid-cols-2 gap-6 pt-6 border-t border-white/5">
                            <TypeList types={details.resistances} title="Resiste A" emptyMsg="Nenhuma" colorClass="text-blue-500/50" />
                            <TypeList types={details.immunities} title="Imune A" emptyMsg="Nenhuma" colorClass="text-slate-400/50" />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
