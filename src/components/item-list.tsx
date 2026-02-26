"use client";

import { useItems } from "@/hooks/useItemQuery";
import { ItemCard } from "./item-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { useState } from "react";
import { Input } from "./ui/input";
import { ItemSearchFilters } from "./item-search-filters";

export function ItemList() {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("all");

    const { data, isLoading, isError } = useItems(page, 16, search, category);

    const items = data?.results || [];
    const maxPages = data ? Math.ceil(data.count / 16) : 0;

    return (
        <div className="w-full flex flex-col space-y-8">
            <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
                <div className="flex items-center gap-4 w-full lg:max-w-2xl">
                    <div className="relative flex-1 group bg-white/5 p-4 rounded-[2.5rem] border border-white/10 backdrop-blur-md transition-all focus-within:border-yellow-500/50">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-yellow-500 transition-colors" />
                        <Input
                            placeholder="Buscar itens..."
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                setPage(1);
                            }}
                            className="pl-12 bg-transparent !bg-transparent border-none shadow-none focus-visible:ring-0 h-full w-full font-bold italic text-white placeholder:text-white/20 select-none outline-none"
                        />
                    </div>

                    <ItemSearchFilters
                        currentCategory={category}
                        onCategoryChange={(cat) => {
                            setCategory(cat);
                            setPage(1);
                        }}
                    />
                </div>

                <div className="hidden lg:flex flex-col items-end px-6">
                    <div className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20">Registros Ativos</div>
                    <div className="text-2xl font-black italic tracking-tighter text-white">
                        {data?.count || 0} <span className="text-yellow-500">Unidades</span>
                    </div>
                </div>
            </div>

            {isError ? (
                <div className="text-center py-20 text-destructive font-bold uppercase tracking-widest text-xs">
                    Erro ao carregar itens do Marketplace.
                </div>
            ) : isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <Skeleton key={i} className="h-40 rounded-[2rem] bg-white/5" />
                    ))}
                </div>
            ) : items.length === 0 ? (
                <div className="text-center py-20 text-white/20 font-bold uppercase tracking-widest text-xs">
                    Nenhum item encontrado no estoque.
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {items.map((item) => (
                        <ItemCard
                            key={item.id}
                            id={item.id}
                            name={item.name}
                            imageUrl={item.imageUrl}
                        />
                    ))}
                </div>
            )}

            {/* Pagination */}
            {!isLoading && maxPages > 1 && (
                <div className="flex justify-center items-center space-x-6 mt-8">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setPage(p => Math.max(1, p - 1))}
                        disabled={page === 1}
                        className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 hover:bg-blue-500/20 hover:text-blue-400 disabled:opacity-20 transition-all"
                    >
                        <ChevronLeft className="h-5 w-5" />
                    </Button>

                    <div className="flex flex-col items-center gap-1">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20">Página</span>
                        <span className="text-lg font-black italic tracking-tighter text-blue-500">{page} <span className="text-white/20 font-normal not-italic mx-1">/</span> {maxPages}</span>
                    </div>

                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setPage(p => Math.min(maxPages, p + 1))}
                        disabled={page >= maxPages}
                        className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 hover:bg-blue-500/20 hover:text-blue-400 disabled:opacity-20 transition-all"
                    >
                        <ChevronRight className="h-5 w-5" />
                    </Button>
                </div>
            )}
        </div>
    );
}
