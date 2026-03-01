import Link from "next/link";
import { Button } from "@/presentation/components/ui/button";

export default function NotFoundPage() {
  return (
    <main className="min-h-[70vh] flex flex-col items-center justify-center gap-8 px-4">
      <div className="relative w-28 h-28" aria-hidden="true">
        <div className="w-28 h-28 rounded-full border-[5px] border-slate-800 overflow-hidden shadow-lg">
          <div className="h-[52px] bg-red-500" />
          <div className="h-[4px] bg-slate-800" />
          <div className="h-[52px] bg-white" />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full border-[5px] border-slate-800 bg-white shadow-sm" />
      </div>

      <div className="text-center space-y-2">
        <p className="font-arcade text-xs text-red-500 tracking-widest mb-3">
          Erro 404
        </p>
        <h1 className="text-2xl font-bold text-slate-800">
          Pokémon não encontrado!
        </h1>
        <p className="text-slate-400 text-sm">
          A página que você procura não existe ou foi capturada por outro treinador.
        </p>
      </div>

      <Button asChild>
        <Link href="/">Voltar à Pokédex</Link>
      </Button>
    </main>
  );
}
