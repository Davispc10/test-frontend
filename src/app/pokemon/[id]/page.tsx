"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/presentation/components/ui/button";
import { PokemonDetails } from "@/presentation/components/pokemon-details";
import { Skeleton } from "@/presentation/components/ui/skeleton";
import { usePokemonDetails } from "@/presentation/hooks/use-pokemon-details";

interface PokemonDetailPageProps {
  params: Promise<{ id: string }>;
}

function DetailSkeleton() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="flex flex-col items-center px-6 pt-6 pb-8 gap-4">
          <Skeleton className="h-4 w-10 self-start" />
          <Skeleton className="w-52 h-52 rounded-full" />
          <Skeleton className="h-8 w-40" />
          <div className="flex gap-2">
            <Skeleton className="h-6 w-16 rounded-full" />
            <Skeleton className="h-6 w-16 rounded-full" />
          </div>
        </div>
        <div className="px-6 py-5 border-t border-slate-100 space-y-2">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
        </div>
      </div>
    </div>
  );
}

export default function PokemonDetailPage({ params }: PokemonDetailPageProps) {
  const { id } = use(params);
  const router = useRouter();
  const { data: pokemon, isLoading, isError } = usePokemonDetails(id);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => router.back()}
        className="mb-6 gap-2 text-slate-500 hover:text-slate-900 -ml-2"
      >
        <ArrowLeft size={16} />
        Voltar à lista
      </Button>

      {isLoading && <DetailSkeleton />}

      {!isLoading && isError && (
        <div className="flex flex-col items-center justify-center py-24 gap-4">
          <span className="text-5xl">😵</span>
          <p className="text-slate-700 font-semibold text-lg">
            Pokémon não encontrado
          </p>
          <p className="text-slate-400 text-sm">
            Não conseguimos carregar os dados deste Pokémon.
          </p>
          <Button onClick={() => router.back()} variant="outline" size="sm">
            Voltar à lista
          </Button>
        </div>
      )}

      {pokemon && <PokemonDetails pokemon={pokemon} />}
    </main>
  );
}
