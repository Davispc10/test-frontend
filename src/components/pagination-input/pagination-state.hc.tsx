"use client";

import { memo, useCallback, useContext, useEffect, useRef } from "react";
import {
  PaginationContext,
  PaginationPage,
} from "@contexts/pagination.provider";

export type PaginationStateProps = {
  pages: Omit<PaginationPage, "id">[];
  useKeyEvent?: boolean;
  initialPageId?: number;
};

const PaginationStateElement: React.FC<PaginationStateProps> = ({
  pages,
  useKeyEvent = false,
  initialPageId = 0,
}) => {
  if (initialPageId < 0 || initialPageId > pages.length - 1)
    throw new Error("Page Id Not Found!");

  const pageSelected = useRef(false);

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

  useEffect(() => {
    console.log(pageSelected.current);
    pageSelected.current = true;
    // console.log(initialPageId);
    // if (!pageSelected.current) {
    //   pageSelected.current = true;
    //   console.log("rendered");
    //   selectPage(initialPageId);
    // }
  }, []);

  useEffect(() => {
    console.log("teste");
    loadPages(pages.map((page, idx) => ({ id: idx, ...page })));
  }, [loadPages, pages]);

  useEffect(() => {
    if (useKeyEvent) window?.addEventListener("keydown", handleKeyEvent);

    return () => {
      window?.removeEventListener("keydown", handleKeyEvent);
    };
  }, [handleKeyEvent, useKeyEvent]);

  return null;
};

export const PaginationState = memo<PaginationStateProps>(
  PaginationStateElement
);
