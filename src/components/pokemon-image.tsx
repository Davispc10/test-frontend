"use client";

import Image, { ImageProps } from "next/image";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface PokemonImageProps extends Omit<ImageProps, "onError" | "src"> {
    src: string | null | undefined;
    fallbackSrc?: string;
    onLoad?: () => void;
}

export function PokemonImage({
    src,
    fallbackSrc = "/pokeball.png",
    className,
    onLoad,
    ...props
}: PokemonImageProps) {
    const [error, setError] = useState(false);

    useEffect(() => {
        setError(false);
    }, [src]);

    const handleError = () => {
        setError(true);
        if (onLoad) onLoad();
    };

    const imgSrc = error || !src ? fallbackSrc : src;

    return (
        <Image
            src={imgSrc}
            onError={handleError}
            onLoad={onLoad}
            className={cn(error && "opacity-50 grayscale drop-shadow-none", className)}
            {...props}
        />
    );
}
