"use client";

import Image from "next/image";
import type {
  IPokemon,
  IPokemonFlavorText,
  IEvolutionChainNode,
} from "@/domain/entities/pokemon";
import { getTypeBg, getTypeColor } from "@/lib/pokemon-type-colors";
import { getColorGradient } from "@/lib/pokemon-color-gradients";
import { useEvolutionChain } from "@/presentation/hooks/use-evolution-chain";
import { cn, capitalize, formatPokemonId } from "@/lib/utils";
import { MAX_STAT, MAX_EXPERIENCE } from "@/lib/constants";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogTitle,
} from "@/presentation/components/ui/dialog";

interface PokemonAdvancedModalProps {
  pokemon: IPokemon;
  isOpen: boolean;
  onClose: () => void;
}

const CIRCLE_STATS = ["defense", "attack", "special-attack", "special-defense"];
const CIRCLE_LABELS: Record<string, string> = {
  defense: "Defense",
  attack: "Attack",
  "special-attack": "Sp Attack",
  "special-defense": "Sp Defense",
};

interface StatBarRowProps {
  label: string;
  value: number;
  maxValue: number;
  barColor: string;
}

function StatBarRow({ label, value, maxValue, barColor }: StatBarRowProps) {
  const pct = Math.min((value / maxValue) * 100, 100);
  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center">
        <span className="text-xs text-slate-500 font-medium">{label}</span>
        <span className="text-sm font-bold text-slate-800">
          {value.toLocaleString()}
        </span>
      </div>
      <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
        <div
          className={cn("h-full rounded-full transition-all duration-500", barColor)}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function StatCircle({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="w-12 h-12 rounded-full border-2 border-slate-200 flex items-center justify-center bg-white shadow-sm">
        <span className="text-sm font-bold text-slate-800 tabular-nums">
          {value}
        </span>
      </div>
      <span className="text-[9px] text-slate-500 font-semibold text-center leading-tight">
        {label}
      </span>
    </div>
  );
}

function InfoBadge({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex flex-col items-center gap-1 px-3 py-2 bg-slate-50 rounded-xl border border-slate-100 text-center">
      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">
        {label}
      </span>
      <span className="text-sm font-bold text-slate-800">{value}</span>
    </div>
  );
}

function formatVarietyName(name: string): string {
  if (/mega-x/i.test(name)) return "Mega X";
  if (/mega-y/i.test(name)) return "Mega Y";
  if (/gmax|gigantamax/i.test(name)) return "Gigantamax";
  if (/mega/i.test(name)) return "Mega";
  if (/alola/i.test(name)) return "Alola";
  if (/galar/i.test(name)) return "Galar";
  return capitalize(name.replace(/-/g, " "));
}

function VarietiesSection({ varieties }: { varieties: string[] }) {
  const hasSpecial = varieties.some((n) => /mega|alola|gmax/i.test(n));
  if (varieties.length === 0 || !hasSpecial) return null;
  return (
    <div>
      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
        Formas Especiais
      </p>
      <div className="flex gap-2 flex-wrap">
        {varieties.map((v) => (
          <span
            key={v}
            className="px-3 py-1 bg-amber-50 text-amber-800 text-xs font-semibold rounded-full border border-amber-200"
          >
            {formatVarietyName(v)}
          </span>
        ))}
      </div>
    </div>
  );
}

function EvolutionChainDisplay({ chain }: { chain: IEvolutionChainNode | null }) {
  if (!chain) return null;
  const flatten = (node: IEvolutionChainNode): string[] => {
    const names = [node.name];
    node.evolvesTo.forEach((child) => names.push(...flatten(child)));
    return names;
  };
  const names = flatten(chain);
  if (names.length < 2) return null;
  return (
    <div>
      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
        Linha Evolutiva
      </p>
      <div className="flex flex-wrap items-center gap-1 text-sm">
        {names.map((name, i) => (
          <span key={name} className="flex items-center gap-1">
            <span className="font-semibold text-slate-700 capitalize">
              {capitalize(name)}
            </span>
            {i < names.length - 1 && (
              <span className="text-slate-300" aria-hidden="true">
                →
              </span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}

function FlavorTextList({ texts }: { texts: IPokemonFlavorText[] }) {
  if (texts.length === 0) return null;
  return (
    <div>
      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
        Descrições por Versão
      </p>
      <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
        {texts.map((ft) => (
          <div
            key={ft.version}
            className="bg-slate-50 rounded-xl p-3 border border-slate-100"
          >
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              {capitalize(ft.version)}
            </span>
            <p className="text-xs text-slate-700 leading-relaxed">{ft.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function PokemonAdvancedModal({
  pokemon,
  isOpen,
  onClose,
}: PokemonAdvancedModalProps) {
  const primaryType = pokemon.types[0] ?? "normal";
  const colorGradient = getColorGradient(pokemon.color);
  const typeBg = colorGradient || getTypeBg(primaryType);
  const mainImage =
    pokemon.sprites.other?.officialArtwork ?? pokemon.sprites.frontDefault;

  const abilityLabel = pokemon.abilities
    .filter((a) => !a.isHidden)
    .map((a) => capitalize(a.name))
    .join(" - ");

  const hpStat = pokemon.stats.find((s) => s.name === "hp")?.value ?? 0;

  const circleStats = CIRCLE_STATS.map((name) => ({
    name,
    label: CIRCLE_LABELS[name] ?? name,
    value: pokemon.stats.find((s) => s.name === name)?.value ?? 0,
  }));

  const { data: evolutionChain } = useEvolutionChain(
    isOpen ? pokemon.evolutionChainUrl : null
  );

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open: boolean) => {
        if (!open) onClose();
      }}
    >
      <DialogContent className="p-0 overflow-hidden flex flex-col max-h-[90vh]">
        <DialogTitle className="sr-only">
          Dados Avançados de {capitalize(pokemon.name)}
        </DialogTitle>

        <div className={cn("relative pt-6 pb-24 px-6 flex-shrink-0", typeBg)}>
          <svg
            className="absolute right-4 top-4 w-32 h-32 opacity-15 pointer-events-none"
            viewBox="0 0 100 100"
            aria-hidden="true"
          >
            <circle cx="50" cy="50" r="45" fill="none" stroke="white" strokeWidth="8" />
            <line x1="5" y1="50" x2="95" y2="50" stroke="white" strokeWidth="8" />
            <circle cx="50" cy="50" r="14" fill="none" stroke="white" strokeWidth="8" />
          </svg>

          <DialogClose className="absolute top-4 left-4 w-8 h-8 rounded-full bg-white/25 flex items-center justify-center text-white hover:bg-white/40 transition-colors">
            <span className="text-lg leading-none">×</span>
            <span className="sr-only">Fechar</span>
          </DialogClose>

          <h2 className="text-2xl font-bold text-white capitalize mt-10">
            {capitalize(pokemon.name)}
          </h2>

          <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-36 h-36">
            <Image
              src={mainImage}
              alt={capitalize(pokemon.name)}
              fill
              sizes="144px"
              className="object-contain drop-shadow-2xl"
              priority
            />
          </div>
        </div>

        <div className="bg-white rounded-t-3xl relative z-10 px-6 pt-20 pb-8 space-y-5 overflow-y-auto flex-1">
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 rounded-full bg-yellow-400 text-yellow-900 text-xs font-bold tabular-nums">
              {formatPokemonId(pokemon.id)}
            </span>
            {pokemon.generation && (
              <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
                {pokemon.generation}
              </span>
            )}
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

          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
              Abilities
            </p>
            <p className="text-sm font-semibold text-slate-700">
              {abilityLabel || "—"}
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 space-y-4">
            <StatBarRow
              label="Healthy Points"
              value={hpStat}
              maxValue={MAX_STAT}
              barColor="bg-green-400"
            />
            <StatBarRow
              label="Experience"
              value={pokemon.baseExperience}
              maxValue={MAX_EXPERIENCE}
              barColor="bg-yellow-400"
            />
          </div>

          <div className="flex justify-around gap-2">
            {circleStats.map((s) => (
              <StatCircle key={s.name} label={s.label} value={s.value} />
            ))}
          </div>

          <div className="grid grid-cols-2 gap-2">
            <InfoBadge label="Taxa de Captura" value={pokemon.captureRate} />
            <InfoBadge label="Felicidade Base" value={pokemon.baseHappiness} />
          </div>

          {pokemon.eggGroups.length > 0 && (
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
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

          <VarietiesSection varieties={pokemon.varieties} />
          <EvolutionChainDisplay chain={evolutionChain ?? null} />
          <FlavorTextList texts={pokemon.flavorTexts} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
