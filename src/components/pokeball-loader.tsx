import React from "react";

export function PokeballLoader() {
    return (
        <div className="flex flex-col items-center justify-center gap-8">
            <div className="pokeball-loader">
                <img src="/ball.png" alt="Loading..." />

                {/* Custom Sombra */}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-8 h-2 bg-black/40 blur-md rounded-full scale-x-150" />
            </div>
            <div className="flex flex-col items-center">
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 animate-pulse">
                    Sincronizando Dados
                </span>
            </div>
        </div>
    );

}
