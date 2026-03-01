/**
 * Mapeamento de color.name da PokéAPI para gradientes Tailwind.
 * Usado no hero do modal e na página de detalhes para fundos dinâmicos.
 */
const POKEMON_COLOR_GRADIENTS: Record<string, string> = {
  black: "bg-gradient-to-br from-slate-800 to-slate-900",
  blue: "bg-gradient-to-br from-blue-400 to-blue-600",
  brown: "bg-gradient-to-br from-amber-700 to-amber-900",
  gray: "bg-gradient-to-br from-slate-400 to-slate-600",
  green: "bg-gradient-to-br from-green-400 to-emerald-600",
  pink: "bg-gradient-to-br from-pink-400 to-rose-500",
  purple: "bg-gradient-to-br from-purple-400 to-violet-600",
  red: "bg-gradient-to-br from-red-400 to-rose-600",
  white: "bg-gradient-to-br from-slate-100 to-slate-300",
  yellow: "bg-gradient-to-br from-yellow-400 to-amber-500",
};

/**
 * Retorna classes de gradiente para o background baseado na cor da espécie.
 * Fallback: retorna string vazia para usar getTypeBg(primaryType) no componente.
 */
export function getColorGradient(colorName: string): string {
  const key = colorName?.toLowerCase() ?? "";
  return POKEMON_COLOR_GRADIENTS[key] ?? "";
}
