"use client";

import {
  ArrowSmallLeftIcon,
  ArrowSmallRightIcon,
} from "@heroicons/react/24/solid";
import clsx from "clsx";
import { memo, useContext, useMemo, useRef } from "react";
import { PaginationContext } from "src/contexts/pagination.provider";
import { twMerge } from "tailwind-merge";
import { PaginationButton } from "./pagination-button.component";

export type PaginationInputProps = {
  prevIcon?: React.ReactElement;
  nextIcon?: React.ReactElement;
};

const PaginationInputElement: React.FC<PaginationInputProps> = ({
  prevIcon = <ArrowSmallLeftIcon className="w-[24px] h-[24px]" />,
  nextIcon = <ArrowSmallRightIcon className="w-[24px] h-[24px]" />,
}) => {
  const itemsRef = useRef<HTMLButtonElement[]>([]);

  const {
    currentPage,
    currentGroup,
    nextGroup,
    prevGroup,
    lastPage,
    firstPage,
    nextPage,
    prevPage,
    goToLast,
    goToFirst,
    goToPrevGroup,
    goToNextGroup,
    goToPrev,
    goToNext,
    goToPage,
    maxPerGroup,
  } = useContext(PaginationContext);

  const prevButonElement = useMemo(
    () => (
      <PaginationButton
        onClick={goToPrev}
        disabled={!prevPage}
        icon={prevIcon}
        value="__prev"
      />
    ),
    [prevPage, prevIcon, goToPrev]
  );

  const nextButonElement = useMemo(
    () => (
      <PaginationButton
        onClick={goToNext}
        disabled={!nextPage}
        icon={nextIcon}
        value="__next"
      />
    ),
    [nextPage, nextIcon, goToNext]
  );

  const xsTextSize = twMerge("text-xs xs:text-sm sm:text-base");

  return (
    <div className="flex flex-col space-y-2">
      <div className="flex flex-row flex-grow flex-nowrap justify-center items-center w-auto p-2 sm:p-4 space-x-2 sm:space-x-4">
        <div className="hidden sm:flex">{prevButonElement}</div>

        {firstPage &&
          !currentGroup.pages.some(
            (x) => x.id === firstPage.id || x.id === firstPage.id - 1
          ) && (
            <div onClick={goToFirst}>
              <PaginationButton
                className={twMerge("text-marvel-accent", xsTextSize)}
                value={firstPage.value}
              />
            </div>
          )}

        {prevGroup && (
          <div className="hidden sm:flex" onClick={goToPrevGroup}>
            <PaginationButton
              groupInit
              value={prevGroup.pages[prevGroup.pages.length - 1].value}
            />
          </div>
        )}

        <div className="flex flex-nowrap flex-row grow shadow-lg rounded-lg">
          {currentGroup &&
            currentGroup.pages.map((item, idx) => {
              const classes = twMerge(
                "rounded-none",
                xsTextSize,
                clsx({
                  "rounded-l-lg": idx === 0,
                  "rounded-r-lg": idx === maxPerGroup - 1,
                })
              );

              return (
                <PaginationButton
                  className={classes}
                  ref={(el) => (itemsRef.current[item.id] = el)}
                  onClick={() => goToPage(item.id)}
                  value={item.value}
                  active={currentPage?.id === item.id}
                  key={`${idx}_${String(item.value).replace(/ /, "_")}`}
                />
              );
            })}
        </div>

        {nextGroup && (
          <div className="hidden sm:flex" onClick={goToNextGroup}>
            <PaginationButton groupInit value={nextGroup.pages[0].value} />
          </div>
        )}

        {lastPage &&
          !currentGroup.pages.some(
            (x) => x.id === lastPage.id || x.id === lastPage.id - 1
          ) && (
            <div onClick={goToLast}>
              <PaginationButton
                className={twMerge("text-marvel-accent", xsTextSize)}
                value={lastPage.value}
              />
            </div>
          )}

        <div className="hidden sm:flex">{nextButonElement}</div>
      </div>
      <div className="flex flex-row flex-nowrap justify-center items-center space-x-2">
        <div className="flex sm:hidden">{prevButonElement}</div>
        <div className="flex sm:hidden">{nextButonElement}</div>
      </div>
    </div>
  );
};

export const PaginationInput = memo<PaginationInputProps>(
  PaginationInputElement
);
