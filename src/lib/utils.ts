import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { POKEMON_ID_PADDING } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalize(str: string): string {
  return str
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
}

export function formatPokemonId(id: number, padding = POKEMON_ID_PADDING): string {
  return `#${String(id).padStart(padding, "0")}`;
}
