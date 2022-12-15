"use client";

import {
  ArrowSmallLeftIcon,
  ArrowSmallRightIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/solid";
import { useContext, useEffect } from "react";
import {
  PaginationContext,
  PaginationPage,
} from "src/contexts/pagination.provider";
import {
  PaginationButton,
  PaginationButtonProps,
} from "./pagination-button.component";

export type PaginationInputProps = {
  pages: Omit<PaginationPage, "id">[];
  prevElement?: React.ReactElement;
  nextElement?: React.ReactElement;
  moreElement?: React.ReactElement;
  activeClassName?: string;
};

export const PaginationInput: React.FC<PaginationInputProps> = ({
  pages,
  prevElement = <ArrowSmallLeftIcon className="w-[24px] h-[24px]" />,
  nextElement = <ArrowSmallRightIcon className="w-[24px] h-[24px]" />,
  activeClassName = "bg-marvel-primary text-marvel-white border-2 border-marvel-secondary",
  moreElement = <EllipsisHorizontalIcon className="w-[24px] h-[24px]" />,
}) => {
  const {
    setPages,
    groups,
    currentPage,
    currentGroup,
    maxPerGroup,
    nextGroup,
    prevGroup,
    lastPage,
    firstPage,
    goToLast,
    goToFirst,
    goToPrevGroup,
    goToNextGroup,
    goToPrev,
    goToNext,
    goToPage,
  } = useContext(PaginationContext);

  useEffect(() => {
    setPages(pages.map((page, idx) => ({ id: idx, ...page })));
  }, [pages, setPages]);

  return (
    <div className="flex flex-row flex-grow flex-nowrap w-auto p-4 space-x-4">
      <div onClick={goToPrev} className="">
        <PaginationButton icon={prevElement} value="__prev" />
      </div>

      {firstPage && !currentGroup.pages.some((x) => x.id === firstPage.id) && (
        <div onClick={goToFirst} className="">
          <PaginationButton value={firstPage.value} />
        </div>
      )}

      {prevGroup && (
        <div onClick={goToPrevGroup} className="">
          <PaginationButton
            value={prevGroup.pages[prevGroup.pages.length - 1].value}
          />
        </div>
      )}

      <div className="flex flex-nowrap flex-row space-x-1 grow">
        {currentGroup
          ? currentGroup.pages.map((item, idx) => {
              return (
                <PaginationButton
                  onClick={() => goToPage(item.id)}
                  value={item.value}
                  active={currentPage?.id === item.id}
                  key={`${idx}_${String(item.value).replace(/ /, "_")}`}
                />
              );
            })
          : Array(maxPerGroup)
              .fill(0)
              .map((x, idx) => (
                <PaginationButton value={idx + 1} key={idx + 1} />
              ))}
      </div>

      {nextGroup && (
        <div onClick={goToNextGroup} className="">
          <PaginationButton value={nextGroup.pages[0].value} />
        </div>
      )}

      {lastPage && !currentGroup.pages.some((x) => x.id === lastPage.id) && (
        <div onClick={goToLast} className="">
          <PaginationButton value={lastPage.value} />
        </div>
      )}

      <div onClick={goToNext} className="">
        <PaginationButton icon={nextElement} value="__next" />
      </div>
    </div>
  );
};
