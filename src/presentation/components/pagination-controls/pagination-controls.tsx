"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/presentation/components/ui/button";

interface PaginationControlsProps {
  currentPage: number;
  totalCount: number;
  limit: number;
  onPageChange: (page: number) => void;
}

export function PaginationControls({
  currentPage,
  totalCount,
  limit,
  onPageChange,
}: PaginationControlsProps) {
  const totalPages = Math.ceil(totalCount / limit);
  const hasPrev = currentPage > 1;
  const hasNext = currentPage < totalPages;

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-4 mt-8 pb-4">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!hasPrev}
        className="gap-1.5 rounded-lg"
      >
        <ChevronLeft size={16} />
        Anterior
      </Button>

      <span className="text-sm text-slate-500 font-medium tabular-nums">
        {currentPage} / {totalPages}
      </span>

      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!hasNext}
        className="gap-1.5 rounded-lg"
      >
        Próximo
        <ChevronRight size={16} />
      </Button>
    </div>
  );
}
