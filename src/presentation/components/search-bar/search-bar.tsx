"use client";

import { Search } from "lucide-react";
import { Input } from "@/presentation/components/ui/input";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchBar({
  value,
  onChange,
  placeholder = "Buscar Pokémon pelo nome...",
}: SearchBarProps) {
  return (
    <div className="relative">
      <Search
        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
        size={16}
      />
      <Input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="pl-9 h-12 text-sm bg-white border-slate-200 focus-visible:ring-primary rounded-xl shadow-sm"
      />
    </div>
  );
}
