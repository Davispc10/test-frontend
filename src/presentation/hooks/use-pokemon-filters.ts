"use client";

import { useCallback, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ITEMS_PER_PAGE } from "@/lib/constants";

export interface PokemonFilters {
  page: number;
  search: string;
  limit: number;
  selectedTypes: string[];
  minAttack: number | undefined;
  maxAttack: number | undefined;
  minExperience: number | undefined;
  maxExperience: number | undefined;
  selectedGeneration: string | undefined;
  selectedColor: string | undefined;
  selectedHabitat: string | undefined;
  isPending: boolean;
  setSearch: (term: string) => void;
  setPage: (page: number) => void;
  setTypes: (types: string[]) => void;
  setAttackRange: (min: number | undefined, max: number | undefined) => void;
  setExperienceRange: (min: number | undefined, max: number | undefined) => void;
  setGeneration: (value: string | undefined) => void;
  setColor: (value: string | undefined) => void;
  setHabitat: (value: string | undefined) => void;
  clearFilters: () => void;
}

function parseOptionalInt(value: string | null): number | undefined {
  if (!value) return undefined;
  const n = parseInt(value, 10);
  return isNaN(n) ? undefined : n;
}

function parseOptionalString(value: string | null): string | undefined {
  return value && value.trim().length > 0 ? value : undefined;
}

export function usePokemonFilters(): PokemonFilters {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const page = Math.max(1, Number(searchParams.get("page") ?? "1") || 1);
  const search = searchParams.get("search") ?? "";
  const selectedTypes = searchParams.get("types")
    ? searchParams.get("types")!.split(",").filter(Boolean)
    : [];
  const minAttack = parseOptionalInt(searchParams.get("minAtk"));
  const maxAttack = parseOptionalInt(searchParams.get("maxAtk"));
  const minExperience = parseOptionalInt(searchParams.get("minExp"));
  const maxExperience = parseOptionalInt(searchParams.get("maxExp"));
  const selectedGeneration = parseOptionalString(searchParams.get("generation"));
  const selectedColor = parseOptionalString(searchParams.get("color"));
  const selectedHabitat = parseOptionalString(searchParams.get("habitat"));

  const updateParams = useCallback(
    (updates: Record<string, string | undefined>) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(updates).forEach(([key, value]) => {
        if (value !== undefined && value !== "") {
          params.set(key, value);
        } else {
          params.delete(key);
        }
      });
      startTransition(() => {
        router.replace(`?${params.toString()}`, { scroll: false });
      });
    },
    [router, searchParams]
  );

  const setSearch = useCallback(
    (term: string) => {
      updateParams({ search: term || undefined, page: undefined });
    },
    [updateParams]
  );

  const setPage = useCallback(
    (newPage: number) => {
      updateParams({ page: String(newPage) });
    },
    [updateParams]
  );

  const setTypes = useCallback(
    (types: string[]) => {
      updateParams({
        types: types.length > 0 ? types.join(",") : undefined,
        page: undefined,
      });
    },
    [updateParams]
  );

  const setAttackRange = useCallback(
    (min: number | undefined, max: number | undefined) => {
      updateParams({
        minAtk: min !== undefined ? String(min) : undefined,
        maxAtk: max !== undefined ? String(max) : undefined,
        page: undefined,
      });
    },
    [updateParams]
  );

  const setExperienceRange = useCallback(
    (min: number | undefined, max: number | undefined) => {
      updateParams({
        minExp: min !== undefined ? String(min) : undefined,
        maxExp: max !== undefined ? String(max) : undefined,
        page: undefined,
      });
    },
    [updateParams]
  );

  const setGeneration = useCallback(
    (value: string | undefined) => {
      updateParams({ generation: value || undefined, page: undefined });
    },
    [updateParams]
  );

  const setColor = useCallback(
    (value: string | undefined) => {
      updateParams({ color: value || undefined, page: undefined });
    },
    [updateParams]
  );

  const setHabitat = useCallback(
    (value: string | undefined) => {
      updateParams({ habitat: value || undefined, page: undefined });
    },
    [updateParams]
  );

  const clearFilters = useCallback(() => {
    updateParams({
      types: undefined,
      minAtk: undefined,
      maxAtk: undefined,
      minExp: undefined,
      maxExp: undefined,
      generation: undefined,
      color: undefined,
      habitat: undefined,
      page: undefined,
    });
  }, [updateParams]);

  return {
    page,
    search,
    limit: ITEMS_PER_PAGE,
    selectedTypes,
    minAttack,
    maxAttack,
    minExperience,
    maxExperience,
    selectedGeneration,
    selectedColor,
    selectedHabitat,
    isPending,
    setSearch,
    setPage,
    setTypes,
    setAttackRange,
    setExperienceRange,
    setGeneration,
    setColor,
    setHabitat,
    clearFilters,
  };
}
