import Link from "next/link";
import Image from "next/image";
import type { IPokemonListItem } from "@/domain/entities/pokemon";
import { getTypeColor, getTypeBg } from "@/lib/pokemon-type-colors";
import { cn, capitalize, formatPokemonId } from "@/lib/utils";
import { PRIORITY_LOAD_THRESHOLD } from "@/lib/constants";

interface PokemonCardProps {
  pokemon: IPokemonListItem;
}

const BADGE_STATS = ["attack", "defense"];

export function PokemonCard({ pokemon }: PokemonCardProps) {
  const primaryType = pokemon.types[0] ?? "normal";

  const statBadges = BADGE_STATS.map((name) => ({
    name,
    value: pokemon.stats.find((s) => s.name === name)?.value ?? 0,
  }));

  return (
    <Link href={`/pokemon/${pokemon.id}`} prefetch={false}>
      <div
        className={cn(
          "group relative rounded-2xl overflow-hidden shadow-md cursor-pointer",
          "transition-all duration-200 hover:shadow-xl hover:-translate-y-1.5"
        )}
      >
        <div
          className={cn(
            "relative px-3 pt-4 pb-3 flex flex-col items-center gap-2",
            getTypeBg(primaryType)
          )}
        >
          <svg
            className="absolute -right-5 -bottom-5 w-20 h-20 opacity-20 pointer-events-none"
            viewBox="0 0 100 100"
            aria-hidden="true"
          >
            <circle cx="50" cy="50" r="45" fill="none" stroke="white" strokeWidth="8" />
            <line x1="5" y1="50" x2="95" y2="50" stroke="white" strokeWidth="8" />
            <circle cx="50" cy="50" r="14" fill="none" stroke="white" strokeWidth="8" />
          </svg>

          <span className="font-arcade text-[8px] text-white/60 self-start tracking-wider">
            {formatPokemonId(pokemon.id)}
          </span>

          <div className="relative w-20 h-20 sm:w-24 sm:h-24">
            <Image
              src={pokemon.imageUrl}
              alt={capitalize(pokemon.name)}
              fill
              sizes="(max-width: 640px) 80px, 96px"
              className="object-contain drop-shadow-lg group-hover:scale-110 transition-transform duration-300"
              priority={pokemon.id <= PRIORITY_LOAD_THRESHOLD}
            />
          </div>
        </div>

        <div className="bg-white px-3 pt-2 pb-3 flex flex-col items-center gap-1.5">
          <span className="text-xs font-bold text-slate-800 capitalize text-center leading-tight">
            {capitalize(pokemon.name)}
          </span>

          <div className="flex gap-1 flex-wrap justify-center">
            {pokemon.types.map((type) => (
              <span
                key={type}
                className={cn(
                  "px-2 py-0.5 rounded-full text-[9px] font-bold capitalize tracking-wide",
                  getTypeColor(type)
                )}
              >
                {type}
              </span>
            ))}
          </div>

          {statBadges.some((s) => s.value > 0) && (
            <div className="flex gap-2 mt-0.5">
              {statBadges.map((s) => (
                <div
                  key={s.name}
                  className="flex items-center justify-center w-9 h-9 rounded-full border-2 border-slate-200 bg-slate-50"
                >
                  <span className="text-[10px] font-bold text-slate-700 tabular-nums">
                    {s.value}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
