"use client";

import { Volume2 } from "lucide-react";
import { useState } from "react";

interface PokemonCryButtonProps {
    cries?: {
        latest: string;
        legacy: string;
    };
    name: string;
}

export function PokemonCryButton({ cries, name, type = 'latest' }: PokemonCryButtonProps & { type?: 'latest' | 'legacy' }) {
    const [isPlaying, setIsPlaying] = useState(false);

    const cryUrl = type === 'latest' ? cries?.latest : cries?.legacy;

    if (!cryUrl) return null;

    const playCry = () => {
        if (isPlaying) return;

        const audio = new Audio(cryUrl);
        setIsPlaying(true);

        audio.play();

        audio.onended = () => {
            setIsPlaying(false);
        };

        audio.onerror = () => {
            console.error("Erro ao reproduzir o som do Pokémon");
            setIsPlaying(false);
        };
    };

    return (
        <button
            onClick={playCry}
            disabled={isPlaying}
            className={`group relative flex items-center justify-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 overflow-hidden
        ${isPlaying
                    ? 'bg-amber-500/20 text-amber-500 cursor-default scale-95'
                    : 'bg-white/5 hover:bg-amber-500/10 text-white/70 hover:text-amber-500 border border-white/10 hover:border-amber-500/30 cursor-pointer'
                }`}
            title={`Ouvir o ${type === 'latest' ? 'som atual' : 'som 8-bit'} de ${name}`}
            id={`cry-button-${name}-${type}`}
        >
            {/* Glow Effect */}
            <div className={`absolute inset-0 bg-gradient-to-r from-amber-500/0 via-amber-500/10 to-amber-500/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ${isPlaying ? 'hidden' : ''}`} />

            <Volume2 className={`w-5 h-5 transition-transform duration-300 ${isPlaying ? 'animate-pulse scale-110' : 'group-hover:scale-110'}`} />
            <span className="text-sm font-medium whitespace-nowrap">
                {isPlaying ? 'Reproduzindo...' : type === 'latest' ? 'Som Atual' : 'Som 8-Bit'}
            </span>

            {/* Sound Waves Animation when playing */}
            {isPlaying && (
                <div className="flex items-end gap-0.5 h-3 ml-1">
                    <div className="w-0.5 bg-amber-500 animate-[sound-wave_0.5s_ease-in-out_infinite]" style={{ height: '40%' }}></div>
                    <div className="w-0.5 bg-amber-500 animate-[sound-wave_0.7s_ease-in-out_infinite]" style={{ height: '80%' }}></div>
                    <div className="w-0.5 bg-amber-500 animate-[sound-wave_0.6s_ease-in-out_infinite]" style={{ height: '60%' }}></div>
                </div>
            )}

            <style jsx>{`
        @keyframes sound-wave {
          0%, 100% { height: 30%; }
          50% { height: 100%; }
        }
      `}</style>
        </button>
    );
}
