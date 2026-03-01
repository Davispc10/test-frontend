"use client";

import { useState } from "react";
import Image from "next/image";
import { ChartBar } from "lucide-react";
import type { IPokemon } from "@/domain/entities/pokemon";
import { getTypeColor, getTypeBg } from "@/lib/pokemon-type-colors";
import { getColorGradient } from "@/lib/pokemon-color-gradients";
import { PokemonAdvancedModal } from "@/presentation/components/pokemon-advanced-modal";
import { cn, capitalize, formatPokemonId } from "@/lib/utils";
import { MAX_STAT } from "@/lib/constants";

interface PokemonDetailsProps {
  pokemon: IPokemon;
}

function formatHeight(decimetres: number): string {
  return `${(decimetres / 10).toFixed(1)} m`;
}

function formatWeight(hectograms: number): string {
  return `${(hectograms / 10).toFixed(1)} kg`;
}

const STAT_LABELS: Record<string, string> = {
  hp: "HP",
  attack: "ATK",
  defense: "DEF",
  "special-attack": "Sp.Atk",
  "special-defense": "Sp.Def",
  speed: "SPD",
};

function StatBar({ name, value }: { name: string; value: number }) {
  const percentage = Math.round((value / MAX_STAT) * 100);
  return (
    <div className="flex items-center gap-2">
      <span className="text-[9px] font-bold text-white/70 uppercase tracking-wider w-14 text-right shrink-0">
        {STAT_LABELS[name] ?? name}
      </span>
      <span className="text-xs font-bold text-white w-7 text-right tabular-nums shrink-0">
        {value}
      </span>
      <div className="flex-1 bg-white/25 rounded-full h-2 overflow-hidden">
        <div
          className="h-full rounded-full bg-white transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

export function PokemonDetails({ pokemon }: PokemonDetailsProps) {
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const primaryType = pokemon.types[0] ?? "normal";
  const colorGradient = getColorGradient(pokemon.color);
  const typeBg = colorGradient || getTypeBg(primaryType);
  const mainImage =
    pokemon.sprites.other?.officialArtwork ?? pokemon.sprites.frontDefault;

  const visibleSprites = [
    { src: pokemon.sprites.frontDefault, label: "Normal" },
    { src: pokemon.sprites.frontShiny, label: "Shiny" },
    { src: pokemon.sprites.backDefault, label: "Costas" },
    { src: pokemon.sprites.backShiny, label: "Shiny Costas" },
  ].filter((s): s is { src: string; label: string } => s.src !== null);

  const publicAbilities = pokemon.abilities.filter((a) => !a.isHidden);
  const hiddenAbilities = pokemon.abilities.filter((a) => a.isHidden);

  return (
    <>
      <div className="max-w-6xl mx-auto">
        <div className={cn("relative px-6 pt-6 pb-4 rounded-t-2xl", typeBg)}>
          <svg
            className="absolute right-3 top-3 w-32 h-32 opacity-15 pointer-events-none"
            viewBox="0 0 100 100"
            aria-hidden="true"
          >
            <circle cx="50" cy="50" r="45" fill="none" stroke="white" strokeWidth="8" />
            <line x1="5" y1="50" x2="95" y2="50" stroke="white" strokeWidth="8" />
            <circle cx="50" cy="50" r="14" fill="none" stroke="white" strokeWidth="8" />
          </svg>

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <div>
              <span className="font-arcade text-[9px] text-white/60 tracking-widest block mb-1">
                {formatPokemonId(pokemon.id)}
              </span>
              <h1 className="text-2xl sm:text-3xl font-bold text-white capitalize leading-tight">
                {capitalize(pokemon.name)}
              </h1>
              {pokemon.generation && (
                <span className="text-xs text-white/70 font-medium">
                  {pokemon.generation}
                </span>
              )}
              <div className="flex gap-2 flex-wrap mt-3">
                {pokemon.types.map((type) => (
                  <span
                    key={type}
                    className={cn(
                      "px-3 py-1 rounded-full text-xs font-semibold capitalize",
                      getTypeColor(type)
                    )}
                  >
                    {type}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex justify-center lg:justify-end">
              <div className="relative w-40 h-40 sm:w-48 sm:h-48 shrink-0">
                <Image
                  src={mainImage}
                  alt={capitalize(pokemon.name)}
                  fill
                  sizes="(max-width: 640px) 160px, 192px"
                  className="object-contain drop-shadow-2xl"
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white px-6 pt-5">
          <button
            onClick={() => setAdvancedOpen(true)}
            className={cn(
              "w-full flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-semibold text-white transition-opacity hover:opacity-90",
              typeBg
            )}
          >
            <ChartBar size={16} />
            Ver Dados Avançados
          </button>
        </div>

        <div className="bg-white rounded-b-2xl px-6 py-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <section className="space-y-5">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">
                Informações
              </p>
              <dl className="space-y-2">
                <div className="flex justify-between text-sm">
                  <dt className="text-slate-500">Altura</dt>
                  <dd className="font-semibold text-slate-800">{formatHeight(pokemon.height)}</dd>
                </div>
                <div className="flex justify-between text-sm">
                  <dt className="text-slate-500">Peso</dt>
                  <dd className="font-semibold text-slate-800">{formatWeight(pokemon.weight)}</dd>
                </div>
                <div className="flex justify-between text-sm">
                  <dt className="text-slate-500">Experiência Base</dt>
                  <dd className="font-semibold text-slate-800">{pokemon.baseExperience}</dd>
                </div>
                {pokemon.habitat && (
                  <div className="flex justify-between text-sm">
                    <dt className="text-slate-500">Habitat</dt>
                    <dd className="font-semibold text-slate-800 capitalize">{capitalize(pokemon.habitat)}</dd>
                  </div>
                )}
                {pokemon.color && (
                  <div className="flex justify-between text-sm">
                    <dt className="text-slate-500">Cor</dt>
                    <dd className="font-semibold text-slate-800 capitalize">{capitalize(pokemon.color)}</dd>
                  </div>
                )}
              </dl>
            </div>

            {pokemon.eggGroups.length > 0 && (
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                  Grupos de Ovo
                </p>
                <div className="flex gap-2 flex-wrap">
                  {pokemon.eggGroups.map((g) => (
                    <span
                      key={g}
                      className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-semibold rounded-full capitalize"
                    >
                      {capitalize(g)}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {visibleSprites.length > 0 && (
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">
                  Sprites
                </p>
                <div className="flex gap-2 flex-wrap">
                  {visibleSprites.map(({ src, label }) => (
                    <div key={label} className="flex flex-col items-center gap-1">
                      <div className="relative w-14 h-14 bg-slate-50 rounded-xl border border-slate-100">
                        <Image
                          src={src}
                          alt={`${capitalize(pokemon.name)} ${label}`}
                          fill
                          sizes="56px"
                          className="object-contain p-1"
                        />
                      </div>
                      <span className="text-[9px] text-slate-400 font-medium">
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>

          <section className="space-y-5">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                Sobre
              </p>
              <p className="text-slate-600 text-sm leading-relaxed">
                {pokemon.description}
              </p>
            </div>

            {pokemon.abilities.length > 0 && (
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">
                  Habilidades
                </p>
                <div className="space-y-2">
                  {publicAbilities.map((a) => (
                    <div
                      key={a.name}
                      className="flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-xl"
                    >
                      <span className="text-sm font-semibold text-slate-700 capitalize">
                        {capitalize(a.name)}
                      </span>
                    </div>
                  ))}
                  {hiddenAbilities.map((a) => (
                    <div
                      key={a.name}
                      className="flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-xl"
                    >
                      <span className="text-sm font-semibold text-slate-700 capitalize">
                        {capitalize(a.name)}
                      </span>
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider ml-auto">
                        Hidden
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>

          {pokemon.stats.length > 0 && (
            <section>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">
                Base Stats
              </p>
              <div className={cn("rounded-2xl p-5 space-y-3", typeBg)}>
                {pokemon.stats.map((stat) => (
                  <StatBar key={stat.name} name={stat.name} value={stat.value} />
                ))}
              </div>
            </section>
          )}
        </div>
      </div>

      <PokemonAdvancedModal
        pokemon={pokemon}
        isOpen={advancedOpen}
        onClose={() => setAdvancedOpen(false)}
      />
    </>
  );
}
