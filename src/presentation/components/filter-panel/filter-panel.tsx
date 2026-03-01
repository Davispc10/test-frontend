"use client";

import { useState, useCallback } from "react";
import { SlidersHorizontal, X, ChevronDown } from "lucide-react";
import { Button } from "@/presentation/components/ui/button";
import { getTypeBg } from "@/lib/pokemon-type-colors";
import { cn, capitalize } from "@/lib/utils";

const ALL_TYPES = [
  "normal", "fire", "water", "electric", "grass", "ice",
  "fighting", "poison", "ground", "flying", "psychic", "bug",
  "rock", "ghost", "dragon", "dark", "steel", "fairy",
];

const GENERATIONS = [
  { value: "generation-i", label: "Generation I" },
  { value: "generation-ii", label: "Generation II" },
  { value: "generation-iii", label: "Generation III" },
  { value: "generation-iv", label: "Generation IV" },
  { value: "generation-v", label: "Generation V" },
  { value: "generation-vi", label: "Generation VI" },
  { value: "generation-vii", label: "Generation VII" },
  { value: "generation-viii", label: "Generation VIII" },
  { value: "generation-ix", label: "Generation IX" },
];

const COLORS = [
  "black", "blue", "brown", "gray", "green",
  "pink", "purple", "red", "white", "yellow",
];

const HABITATS = [
  "cave", "forest", "grassland", "mountain",
  "rare", "rough-terrain", "sea", "urban", "waters-edge",
];

function TypeCheckbox({ type, checked, onChange }: {
  type: string;
  checked: boolean;
  onChange: (type: string, checked: boolean) => void;
}) {
  const checkedBg = getTypeBg(type);
  return (
    <label className="flex items-center gap-2 cursor-pointer select-none group">
      <div
        role="checkbox"
        aria-checked={checked}
        tabIndex={0}
        onClick={() => onChange(type, !checked)}
        onKeyDown={(e) => e.key === " " && onChange(type, !checked)}
        className={cn(
          "w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 transition-colors",
          checked ? `${checkedBg} border-transparent` : "border-slate-300 bg-white"
        )}
      >
        {checked && (
          <svg viewBox="0 0 12 12" className="w-3 h-3 text-white" fill="none" stroke="currentColor">
            <polyline points="2 6 5 9 10 3" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>
      <span className="text-xs capitalize text-slate-700 group-hover:text-slate-900">
        {capitalize(type)}
      </span>
    </label>
  );
}

function SingleSelectList<T extends string>({
  options,
  selected,
  onSelect,
  renderLabel = capitalize,
}: {
  options: { value: T; label?: string }[];
  selected: T | undefined;
  onSelect: (value: T | undefined) => void;
  renderLabel?: (value: T) => string;
}) {
  return (
    <div className="space-y-1">
      {options.map(({ value, label }) => (
        <button
          key={value}
          type="button"
          onClick={() => onSelect(selected === value ? undefined : value)}
          className={cn(
            "w-full text-left px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors",
            selected === value
              ? "bg-primary text-primary-foreground"
              : "text-slate-700 hover:bg-slate-100"
          )}
        >
          {label ?? renderLabel(value)}
        </button>
      ))}
    </div>
  );
}

function RangeInputs({ label, minValue, maxValue, onApply, color = "bg-red-500" }: {
  label: string;
  minValue: number | undefined;
  maxValue: number | undefined;
  onApply: (min: number | undefined, max: number | undefined) => void;
  color?: string;
}) {
  const [localMin, setLocalMin] = useState(minValue?.toString() ?? "");
  const [localMax, setLocalMax] = useState(maxValue?.toString() ?? "");
  return (
    <div className="space-y-3">
      <p className="text-sm font-bold text-slate-700 uppercase tracking-wide">{label}</p>
      <div className="flex items-center gap-2">
        <div className="flex-1">
          <p className="text-[10px] text-slate-400 mb-1">From</p>
          <input type="number" value={localMin} onChange={(e) => setLocalMin(e.target.value)} placeholder="0"
            className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
        </div>
        <span className="text-slate-400 mt-5">—</span>
        <div className="flex-1">
          <p className="text-[10px] text-slate-400 mb-1">To</p>
          <input type="number" value={localMax} onChange={(e) => setLocalMax(e.target.value)} placeholder="999"
            className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
        </div>
      </div>
      <button onClick={() => onApply(localMin ? parseInt(localMin, 10) : undefined, localMax ? parseInt(localMax, 10) : undefined)}
        className={cn("w-full py-2 rounded-lg text-xs font-bold text-white tracking-wide", color)}>
        Apply
      </button>
    </div>
  );
}

interface FilterPanelProps {
  selectedTypes: string[];
  minAttack: number | undefined;
  maxAttack: number | undefined;
  minExperience: number | undefined;
  maxExperience: number | undefined;
  selectedGeneration: string | undefined;
  selectedColor: string | undefined;
  selectedHabitat: string | undefined;
  onTypesChange: (types: string[]) => void;
  onAttackRangeChange: (min: number | undefined, max: number | undefined) => void;
  onExperienceRangeChange: (min: number | undefined, max: number | undefined) => void;
  onGenerationChange: (value: string | undefined) => void;
  onColorChange: (value: string | undefined) => void;
  onHabitatChange: (value: string | undefined) => void;
  onClear: () => void;
}

type DesktopTab = "types" | "attack" | "experience" | "generation" | "color" | "habitat" | null;

export function FilterPanel({
  selectedTypes, minAttack, maxAttack, minExperience, maxExperience,
  selectedGeneration, selectedColor, selectedHabitat,
  onTypesChange, onAttackRangeChange, onExperienceRangeChange,
  onGenerationChange, onColorChange, onHabitatChange, onClear,
}: FilterPanelProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopTab, setDesktopTab] = useState<DesktopTab>(null);

  const hasFilters =
    selectedTypes.length > 0 ||
    minAttack !== undefined || maxAttack !== undefined ||
    minExperience !== undefined || maxExperience !== undefined ||
    selectedGeneration !== undefined ||
    selectedColor !== undefined ||
    selectedHabitat !== undefined;

  const filterCount =
    (selectedTypes.length > 0 ? 1 : 0) +
    (minAttack !== undefined || maxAttack !== undefined ? 1 : 0) +
    (minExperience !== undefined || maxExperience !== undefined ? 1 : 0) +
    (selectedGeneration !== undefined ? 1 : 0) +
    (selectedColor !== undefined ? 1 : 0) +
    (selectedHabitat !== undefined ? 1 : 0);

  const toggleType = useCallback(
    (type: string, checked: boolean) => {
      if (checked) { onTypesChange([...selectedTypes, type]); }
      else { onTypesChange(selectedTypes.filter((t) => t !== type)); }
    },
    [selectedTypes, onTypesChange]
  );

  const toggle = (tab: DesktopTab) =>
    setDesktopTab(desktopTab === tab ? null : tab);

  const activeBtn = (active: boolean) =>
    cn(
      "flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold border transition-colors",
      active
        ? "bg-primary text-primary-foreground border-primary"
        : "bg-white text-slate-700 border-slate-200 hover:border-slate-300"
    );

  const FilterContent = () => (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-bold text-slate-800 uppercase tracking-wide mb-3">Type</p>
        <div className="grid grid-cols-3 gap-2">
          {ALL_TYPES.map((type) => (
            <TypeCheckbox key={type} type={type} checked={selectedTypes.includes(type)} onChange={toggleType} />
          ))}
        </div>
      </div>

      <div className="bg-indigo-50 rounded-2xl p-4">
        <p className="text-sm font-bold text-slate-700 uppercase tracking-wide mb-3">Geração</p>
        <SingleSelectList
          options={GENERATIONS}
          selected={selectedGeneration}
          onSelect={onGenerationChange}
          renderLabel={(v) => GENERATIONS.find((gen) => gen.value === v)?.label ?? v}
        />
      </div>

      <div className="bg-pink-50 rounded-2xl p-4">
        <p className="text-sm font-bold text-slate-700 uppercase tracking-wide mb-3">Cor</p>
        <div className="grid grid-cols-2 gap-1">
          {COLORS.map((color) => (
            <button key={color} type="button"
              onClick={() => onColorChange(selectedColor === color ? undefined : color)}
              className={cn(
                "text-left px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors",
                selectedColor === color ? "bg-primary text-primary-foreground" : "text-slate-700 hover:bg-slate-100"
              )}
            >
              {capitalize(color)}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-green-50 rounded-2xl p-4">
        <p className="text-sm font-bold text-slate-700 uppercase tracking-wide mb-3">Habitat</p>
        <SingleSelectList
          options={HABITATS.map((habitat) => ({ value: habitat, label: capitalize(habitat) }))}
          selected={selectedHabitat}
          onSelect={onHabitatChange}
          renderLabel={capitalize}
        />
      </div>

      <div className="bg-yellow-50 rounded-2xl p-4">
        <RangeInputs label="Experience" minValue={minExperience} maxValue={maxExperience} onApply={onExperienceRangeChange} color="bg-yellow-500" />
      </div>

      <div className="bg-red-50 rounded-2xl p-4">
        <RangeInputs label="Attack" minValue={minAttack} maxValue={maxAttack} onApply={onAttackRangeChange} color="bg-red-500" />
      </div>

      {hasFilters && (
        <button onClick={onClear} className="w-full py-2 rounded-lg text-sm text-slate-500 border border-slate-200 hover:bg-slate-50">
          Clear all filters
        </button>
      )}
    </div>
  );

  return (
    <>
      <div className="hidden sm:flex items-center gap-2 flex-wrap relative">
        <div className="relative">
          <button onClick={() => toggle("types")} className={activeBtn(selectedTypes.length > 0)}>
            Tipo {selectedTypes.length > 0 && <span className="bg-white/30 px-1.5 py-0.5 rounded text-xs">{selectedTypes.length}</span>}
            <ChevronDown size={14} />
          </button>
          {desktopTab === "types" && (
            <div className="absolute top-full left-0 mt-2 z-50 bg-white rounded-2xl shadow-xl border border-slate-100 p-4 w-56">
              <div className="grid grid-cols-2 gap-2">
                {ALL_TYPES.map((type) => (
                  <TypeCheckbox key={type} type={type} checked={selectedTypes.includes(type)} onChange={toggleType} />
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="relative">
          <button onClick={() => toggle("generation")} className={activeBtn(!!selectedGeneration)}>
            Geração {selectedGeneration && <span className="bg-white/30 px-1.5 py-0.5 rounded text-xs">1</span>}
            <ChevronDown size={14} />
          </button>
          {desktopTab === "generation" && (
            <div className="absolute top-full left-0 mt-2 z-50 bg-white rounded-2xl shadow-xl border border-slate-100 p-4 w-44">
              <SingleSelectList
                options={GENERATIONS}
                selected={selectedGeneration}
                onSelect={(v) => { onGenerationChange(v); setDesktopTab(null); }}
                renderLabel={(v) => GENERATIONS.find((gen) => gen.value === v)?.label ?? v}
              />
            </div>
          )}
        </div>

        <div className="relative">
          <button onClick={() => toggle("color")} className={activeBtn(!!selectedColor)}>
            Cor {selectedColor && <span className="bg-white/30 px-1.5 py-0.5 rounded text-xs capitalize">{selectedColor}</span>}
            <ChevronDown size={14} />
          </button>
          {desktopTab === "color" && (
            <div className="absolute top-full left-0 mt-2 z-50 bg-white rounded-2xl shadow-xl border border-slate-100 p-4 w-36">
              <div className="grid grid-cols-2 gap-1">
                {COLORS.map((color) => (
                  <button key={color} type="button"
                    onClick={() => { onColorChange(selectedColor === color ? undefined : color); setDesktopTab(null); }}
                    className={cn("text-left px-2 py-1 rounded-lg text-xs font-semibold transition-colors",
                      selectedColor === color ? "bg-primary text-primary-foreground" : "text-slate-700 hover:bg-slate-100")}
                  >{capitalize(color)}</button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="relative">
          <button onClick={() => toggle("habitat")} className={activeBtn(!!selectedHabitat)}>
            Habitat {selectedHabitat && <span className="bg-white/30 px-1.5 py-0.5 rounded text-xs">1</span>}
            <ChevronDown size={14} />
          </button>
          {desktopTab === "habitat" && (
            <div className="absolute top-full left-0 mt-2 z-50 bg-white rounded-2xl shadow-xl border border-slate-100 p-4 w-44">
              <SingleSelectList
                options={HABITATS.map((habitat) => ({ value: habitat, label: capitalize(habitat) }))}
                selected={selectedHabitat}
                onSelect={(v) => { onHabitatChange(v); setDesktopTab(null); }}
                renderLabel={capitalize}
              />
            </div>
          )}
        </div>

        <div className="relative">
          <button onClick={() => toggle("attack")} className={activeBtn(!!(minAttack !== undefined || maxAttack !== undefined))}>
            Ataque <ChevronDown size={14} />
          </button>
          {desktopTab === "attack" && (
            <div className="absolute top-full left-0 mt-2 z-50 bg-white rounded-2xl shadow-xl border border-slate-100 p-4 w-52">
              <RangeInputs label="Attack" minValue={minAttack} maxValue={maxAttack}
                onApply={(min, max) => { onAttackRangeChange(min, max); setDesktopTab(null); }} color="bg-red-500" />
            </div>
          )}
        </div>

        <div className="relative">
          <button onClick={() => toggle("experience")} className={activeBtn(!!(minExperience !== undefined || maxExperience !== undefined))}>
            Experiência <ChevronDown size={14} />
          </button>
          {desktopTab === "experience" && (
            <div className="absolute top-full left-0 mt-2 z-50 bg-white rounded-2xl shadow-xl border border-slate-100 p-4 w-52">
              <RangeInputs label="Experience" minValue={minExperience} maxValue={maxExperience}
                onApply={(min, max) => { onExperienceRangeChange(min, max); setDesktopTab(null); }} color="bg-yellow-500" />
            </div>
          )}
        </div>

        {hasFilters && (
          <button onClick={onClear} className="flex items-center gap-1 text-sm text-slate-400 hover:text-slate-700 px-2">
            <X size={14} /> Clear
          </button>
        )}

        {desktopTab && (
          <div className="fixed inset-0 z-40" onClick={() => setDesktopTab(null)} />
        )}
      </div>

      <Button variant="outline" size="sm"
        className={cn("sm:hidden gap-2 rounded-xl", hasFilters && "bg-primary text-primary-foreground border-primary")}
        onClick={() => setMobileOpen(true)}>
        <SlidersHorizontal size={15} />
        Filtros
        {hasFilters && <span className="bg-white/30 px-1.5 py-0.5 rounded text-xs">{filterCount}</span>}
      </Button>

      {mobileOpen && (
        <>
          <div className="fixed inset-0 z-40 bg-black/50" onClick={() => setMobileOpen(false)} />
          <div className="fixed inset-x-0 bottom-0 z-50 bg-white rounded-t-3xl max-h-[85vh] overflow-y-auto">
            <div className="sticky top-0 bg-white px-6 pt-5 pb-3 flex items-center justify-between border-b border-slate-100">
              <span className="font-bold text-slate-800">Filtros</span>
              <button onClick={() => setMobileOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
                <X size={16} />
              </button>
            </div>
            <div className="px-6 py-5">
              <FilterContent />
            </div>
          </div>
        </>
      )}
    </>
  );
}
