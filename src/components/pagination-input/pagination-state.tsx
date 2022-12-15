"use client";

import { useCallback, useContext, useEffect, useLayoutEffect } from "react";
import {
  PaginationContext,
  PaginationPage,
} from "@contexts/pagination.provider";

export type PaginationStateProps = {
  pages: Omit<PaginationPage, "id">[];
  useKeyEvent?: boolean;
};

export const PaginationState: React.FC<PaginationStateProps> = ({
  pages,
  useKeyEvent = false,
}) => {
  const { loadPages, goToNext, goToPrev } = useContext(PaginationContext);

  const handleKeyEvent = useCallback(
    (e: KeyboardEvent) => {
      const keyMap = {
        ArrowLeft: goToPrev,
        ArrowRight: goToNext,
        a: goToPrev,
        d: goToNext,
      };

      const handler = keyMap[e.key];

      handler?.();
    },
    [goToNext, goToPrev]
  );

  (typeof window !== "undefined" ? useLayoutEffect : useEffect)(() => {
    loadPages(pages.map((page, idx) => ({ id: idx, ...page })));
  }, [loadPages, pages]);

  useEffect(() => {
    window?.addEventListener("keydown", handleKeyEvent);

    return () => {
      window?.removeEventListener("keydown", handleKeyEvent);
    };
  }, [handleKeyEvent]);

  return null;
};
