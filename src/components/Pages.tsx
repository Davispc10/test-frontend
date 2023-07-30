'use client'

import { useEffect, useState } from "react";
import PageNumber from "./PageNumber";
import Image from "next/image";

interface PagesProps {
    totalPages: number
    currentPage: number
    onPageChange: (pageNumber: number) => void
}

export default function Pages({ totalPages, currentPage, onPageChange }: PagesProps) {
    const [pageRange, setPageRange] = useState<number[]>([]);

    useEffect(() => {
        const maxDisplayedPages = 6;
        const halfMaxDisplayedPages = maxDisplayedPages / 2;
        const startPage = Math.max(1, currentPage - halfMaxDisplayedPages);
        const endPage = Math.min(totalPages, startPage + maxDisplayedPages - 1);
        setPageRange(Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index));
    }, [currentPage, totalPages]);

    return (
        <div className="flex flex-col items-end">
            <div className="flex gap-4 items-center mb-4">
                <div onClick={() => onPageChange(currentPage - 1)} className="w-10 h-10 cursor-pointer rounded-lg hover:bg-neutral-800 flex justify-center">
                    <Image src="/arrow-left.svg" height={10} width={6} alt="Seta apontando para esquerda" />
                </div>
                <div className="flex gap-4">
                    {pageRange.map((current: number) => <PageNumber key={current} handleClick={onPageChange} isCurrentPage={current === currentPage} number={current} />)}
                </div>
                <div onClick={() => onPageChange(currentPage + 1)} className="w-10 h-10 cursor-pointer rounded-lg hover:bg-neutral-800 flex justify-center">
                    <Image src="/arrow-right.svg" height={10} width={6} alt="Seta apontando para direita" />
                </div>
            </div>
            <span className="self-end">Página {currentPage} de {totalPages}</span>
        </div>
    );

}