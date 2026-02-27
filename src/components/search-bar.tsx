"use client";

import { Input } from "@/components/ui/input";
import { usePokemonStore } from "@/lib/store";
import { useShallow } from "zustand/react/shallow";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { useRouter, usePathname } from "next/navigation";
import { SearchFilters } from "./search-filters";

export function SearchBar() {
    const router = useRouter();
    const pathname = usePathname();
    const { searchQuery, setSearchQuery } = usePokemonStore(
        useShallow((state) => ({
            searchQuery: state.searchQuery,
            setSearchQuery: state.setSearchQuery,
        }))
    );
    const [localValue, setLocalValue] = useState(searchQuery);
    const debouncedValue = useDebounce(localValue, 500);

    // Sync local input -> store
    useEffect(() => {
        if (debouncedValue !== searchQuery && debouncedValue === localValue) {
            setSearchQuery(debouncedValue);
        }
    }, [debouncedValue, setSearchQuery, searchQuery, localValue]);

    // Sync store -> local input (e.g. if reset from somewhere else)
    useEffect(() => {
        setLocalValue(searchQuery);
    }, [searchQuery]);

    return (
        <div className="relative w-full group">
            <div className="absolute inset-y-0 left-4 sm:left-5 flex items-center pointer-events-none text-white/20 group-focus-within:text-red-500 transition-colors z-10">
                <Search className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
            <Input
                type="text"
                placeholder="BUSCAR POKÉMON..."
                className="h-14 sm:h-16 pl-12 sm:pl-14 pr-12 sm:pr-14 rounded-2xl bg-white/5 border-white/10 text-white placeholder:text-white/20 focus-visible:ring-1 focus-visible:ring-red-500/50 focus-visible:border-red-500/50 transition-all font-black text-[10px] sm:text-xs tracking-wider sm:tracking-widest uppercase italic backdrop-blur-md"
                value={localValue}
                onChange={(e) => {
                    const value = e.target.value;
                    setLocalValue(value);
                }}
            />
            {localValue && (
                <button
                    onClick={() => {
                        setLocalValue("");
                        setSearchQuery("");
                    }}
                    className="absolute inset-y-0 right-5 flex items-center justify-center text-white/40 hover:text-white transition-colors z-10"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                </button>
            )}
        </div>
    );
}
