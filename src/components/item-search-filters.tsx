"use client";

import { useState, useRef, useEffect } from "react";
import { Filter, X, Check, SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { useItemCategories } from "@/hooks/useItemQuery";

interface ItemSearchFiltersProps {
    currentCategory: string;
    onCategoryChange: (category: string) => void;
}

export function ItemSearchFilters({ currentCategory, onCategoryChange }: ItemSearchFiltersProps) {
    const [isOpen, setIsOpen] = useState(false);
    const { data: categories } = useItemCategories();
    const popoverRef = useRef<HTMLDivElement>(null);

    // Close on click outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div className="relative" ref={popoverRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "p-3 rounded-2xl border h-16 w-16 flex items-center justify-center transition-all duration-300",
                    isOpen
                        ? 'bg-yellow-500 border-yellow-500 text-black shadow-[0_0_15px_rgba(234,179,8,0.4)]'
                        : currentCategory !== "all"
                            ? 'bg-yellow-500/20 border-yellow-500/40 text-yellow-500'
                            : 'bg-white/5 border-white/10 text-white/50 hover:bg-white/10 hover:text-white'
                )}
            >
                {isOpen ? (
                    <X className="w-6 h-6" />
                ) : (
                    <SlidersHorizontal className="w-6 h-6" />
                )}
            </button>

            {isOpen && (
                <div className="absolute z-50 right-0 top-full mt-2 w-[300px] bg-[#111] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[60vh]">
                    <div className="p-4 border-b border-white/10 flex items-center justify-center bg-white/5">
                        <div className="flex items-center gap-2 text-white">
                            <Filter className="w-4 h-4 text-yellow-500" />
                            <h3 className="text-sm font-black uppercase tracking-widest">Filtrar Categoria</h3>
                        </div>
                    </div>

                    <div className="overflow-y-auto p-4 space-y-2 flex-1 custom-scrollbar">
                        <button
                            onClick={() => {
                                onCategoryChange("all");
                                setIsOpen(false);
                            }}
                            className={cn(
                                "w-full flex items-center justify-between px-4 py-3 rounded-xl border transition-all text-[10px] font-black uppercase tracking-widest",
                                currentCategory === "all"
                                    ? 'bg-yellow-500/20 border-yellow-500/50 text-yellow-500'
                                    : 'bg-transparent border-white/5 text-white/40 hover:bg-white/5 hover:text-white'
                            )}
                        >
                            <span>Todas as Categorias</span>
                            {currentCategory === "all" && <Check className="w-3.5 h-3.5" />}
                        </button>

                        <div className="h-px bg-white/5 my-2" />

                        <div className="grid grid-cols-1 gap-1">
                            {categories?.map((cat) => {
                                const isSelected = currentCategory === cat.name;
                                return (
                                    <button
                                        key={cat.name}
                                        onClick={() => {
                                            onCategoryChange(cat.name);
                                            setIsOpen(false);
                                        }}
                                        className={cn(
                                            "flex items-center justify-between px-4 py-3 rounded-xl border transition-all text-[10px] font-black uppercase tracking-widest group",
                                            isSelected
                                                ? 'bg-yellow-500/20 border-yellow-500/50 text-yellow-500'
                                                : 'bg-transparent border-white/5 text-white/40 hover:bg-white/10 hover:border-white/20 hover:text-white'
                                        )}
                                    >
                                        <span>{cat.name.replace(/-/g, ' ')}</span>
                                        {isSelected && <Check className="w-3.5 h-3.5" />}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <div className="p-4 border-t border-white/10 bg-black/50">
                        <button
                            onClick={() => {
                                onCategoryChange("all");
                                setIsOpen(false);
                            }}
                            className="w-full py-3 rounded-xl bg-white/5 hover:bg-yellow-500/20 border border-white/10 hover:border-yellow-500/30 hover:text-yellow-500 text-white/50 text-[10px] font-black uppercase tracking-widest transition-all"
                        >
                            Resetar Filtro
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
