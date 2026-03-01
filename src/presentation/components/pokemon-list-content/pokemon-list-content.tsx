"use client";

import { usePokemonFilters } from "@/presentation/hooks/use-pokemon-filters";
import { usePokemonList } from "@/presentation/hooks/use-pokemon-list";
import { SearchBar } from "@/presentation/components/search-bar";
import { PokemonList } from "@/presentation/components/pokemon-list";
import { PaginationControls } from "@/presentation/components/pagination-controls";
import { LoadingSkeleton } from "@/presentation/components/loading-skeleton";
import { FilterPanel } from "@/presentation/components/filter-panel";

export function PokemonListContent() {
  const {
    page,
    search,
    limit,
    selectedTypes,
    minAttack,
    maxAttack,
    minExperience,
    maxExperience,
    selectedGeneration,
    selectedColor,
    selectedHabitat,
    setSearch,
    setPage,
    setTypes,
    setAttackRange,
    setExperienceRange,
    setGeneration,
    setColor,
    setHabitat,
    clearFilters,
    isPending,
  } = usePokemonFilters();

  const { data, isLoading, isError, isFetching } = usePokemonList({
    page,
    limit,
    search,
    types: selectedTypes,
    minAttack,
    maxAttack,
    minExperience,
    maxExperience,
    generation: selectedGeneration,
    color: selectedColor,
    habitat: selectedHabitat,
  });

  const showSkeleton = isLoading || isPending;

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3">
        <SearchBar value={search} onChange={setSearch} />
        <FilterPanel
          selectedTypes={selectedTypes}
          minAttack={minAttack}
          maxAttack={maxAttack}
          minExperience={minExperience}
          maxExperience={maxExperience}
          selectedGeneration={selectedGeneration}
          selectedColor={selectedColor}
          selectedHabitat={selectedHabitat}
          onTypesChange={setTypes}
          onAttackRangeChange={setAttackRange}
          onExperienceRangeChange={setExperienceRange}
          onGenerationChange={setGeneration}
          onColorChange={setColor}
          onHabitatChange={setHabitat}
          onClear={clearFilters}
        />
      </div>

      {showSkeleton && <LoadingSkeleton count={limit} />}

      {!showSkeleton && isError && (
        <div className="flex flex-col items-center justify-center py-24 gap-3">
          <p className="text-slate-700 font-semibold text-lg">
            Erro ao carregar os Pokémon
          </p>
          <p className="text-slate-400 text-sm">Tente recarregar a página.</p>
        </div>
      )}

      {!showSkeleton && !isError && data?.items.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 gap-3">
          <p className="text-slate-700 font-semibold text-lg">
            Nenhum Pokémon encontrado
          </p>
          <p className="text-slate-400 text-sm">
            Ajuste os filtros ou tente outro nome.
          </p>
        </div>
      )}

      {!showSkeleton && !isError && data && data.items.length > 0 && (
        <>
          <div
            className={
              isFetching && !isLoading
                ? "opacity-60 transition-opacity duration-200"
                : "transition-opacity duration-200"
            }
          >
            <PokemonList items={data.items} />
          </div>
          <PaginationControls
            currentPage={page}
            totalCount={data.totalCount}
            limit={limit}
            onPageChange={setPage}
          />
        </>
      )}
    </div>
  );
}
