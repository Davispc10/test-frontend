"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import { memo, useContext, useMemo, useRef } from "react";
import { PaginationContext } from "src/contexts/pagination.provider";
import { twMerge } from "tailwind-merge";
import { PaginationButton } from "./pagination-button.component";

export type PaginationInputProps = {
  prevIcon?: React.ReactElement;
  nextIcon?: React.ReactElement;
  showCurrentPage?: boolean;
  hiddenArrows?: boolean;
  message?: string;
};

const PaginationInputElement: React.FC<PaginationInputProps> = ({
  prevIcon = <ChevronLeftIcon className="w-[24px] h-[24px]" />,
  nextIcon = <ChevronRightIcon className="w-[24px] h-[24px]" />,
  showCurrentPage = false,
  hiddenArrows = false,
  message,
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
  } = useContext(PaginationContext);

  const prevButonElement = useMemo(
    () => (
      <PaginationButton
        onClick={goToPrev}
        disabled={!prevPage}
        aria-disabled={!prevPage}
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
        aria-disabled={!nextPage}
        icon={nextIcon}
        value="__next"
      />
    ),
    [nextPage, nextIcon, goToNext]
  );

  const xsTextSize = twMerge("text-xs xs:text-sm sm:text-base");

  const loadingClasses = twMerge(
    "bg-marvel-white overflow-hidden",
    "before:absolute before:inset-0",
    "before:-translate-x-full before:animate-[shimmer_.8s_infinite]",
    "before:bg-gradient-to-r before:from-transparent",
    "before:via-gray-50 before:to-transparent before:z-50"
  );

  return (
    <div className="flex flex-col space-y-2 w-full">
      <div className="flex flex-row justify-between">
        {showCurrentPage && (
          <div className="flex flex-row flex-nowrap justify-between text-marvel-typo items-center space-x-2 grow pl-4 w-full text-base">
            <div className="flex flex-row flex-nowrap justify-center items-center space-x-2">
              <h2 className="text-lg font-medium">Página</h2>
              <span className="py-1 px-2 rounded-lg bg-marvel-black/10 text-marvel-typo text-base">
                {String((currentPage?.id || 0) + 1).padStart(2, "0")} /{" "}
                {String((lastPage?.id || 0) + 1).padStart(2, "0")}
              </span>
            </div>
            {message && (
              <div className="hidden sm:flex justify-end items-center">
                <p className="font-light text-marvel-typo/60">{message}</p>
              </div>
            )}
          </div>
        )}
        {!hiddenArrows && (
          <div className="flex flex-row flex-nowrap justify-center items-center space-x-2 pr-4">
            <div className="flex sm:hidden">{prevButonElement}</div>
            <div className="flex sm:hidden">{nextButonElement}</div>
          </div>
        )}
      </div>
      <div className="flex flex-row flex-grow flex-nowrap justify-center items-center w-auto px-2 sm:px-4 space-x-2 sm:space-x-4">
        <div className="hidden sm:flex flex-row flex-grow space-x-2">
          {!hiddenArrows && (
            <>
              <div>{prevButonElement}</div>
              <div>{nextButonElement}</div>
            </>
          )}
        </div>

        <div className="flex flex-row justify-start sm:justify-end items-center w-full grow">
          <div className="flex flex-row space-x-2 sm:space-x-4 justify-center items-center w-full sm:w-auto">
            {firstPage ? (
              !currentGroup.pages.some(
                (x) => x.id === firstPage.id || x.id === firstPage.id - 1
              ) && (
                <div onClick={goToFirst}>
                  <PaginationButton
                    className={twMerge("text-marvel-accent", xsTextSize)}
                    value={firstPage.value}
                  />
                </div>
              )
            ) : (
              <PaginationButton
                className={twMerge(
                  "relative text-marvel-accent",
                  xsTextSize,
                  loadingClasses
                )}
                value={"-"}
              />
            )}

            {(!currentGroup ? true : prevGroup) && (
              <div
                className="hidden sm:flex"
                onClick={prevGroup && goToPrevGroup}
              >
                <PaginationButton
                  className={clsx({ [loadingClasses]: !prevGroup })}
                  groupInit
                  value={
                    prevGroup
                      ? prevGroup.pages[prevGroup.pages.length - 1].value
                      : "-"
                  }
                />
              </div>
            )}

            <div
              className={twMerge(
                "relative flex flex-nowrap flex-row grow shadow-lg rounded-lg",
                clsx({
                  [loadingClasses]: !currentGroup,
                })
              )}
            >
              {currentGroup
                ? currentGroup.pages.map((item, idx) => {
                    const classes = twMerge(
                      "rounded-none",
                      xsTextSize,
                      clsx({
                        "rounded-l-lg": idx === 0,
                        "rounded-r-lg": idx === currentGroup.pages.length - 1,
                      })
                    );

                    return (
                      <PaginationButton
                        className={classes}
                        ref={(el) => (itemsRef.current[item.id] = el)}
                        onClick={() => goToPage(item.id)}
                        value={item.value}
                        label={item.id + 1}
                        active={currentPage?.id === item.id}
                        key={`${idx}_${String(item.value).replace(/ /, "_")}`}
                      />
                    );
                  })
                : Array(3)
                    .fill(0)
                    .map((_, idx) => (
                      <PaginationButton key={idx} value={"-"} />
                    ))}
            </div>

            {(!currentGroup ? true : nextGroup) && (
              <div
                className="hidden sm:flex"
                onClick={nextGroup && goToNextGroup}
              >
                <PaginationButton
                  className={clsx({ [loadingClasses]: !nextGroup })}
                  groupInit
                  value={nextGroup ? nextGroup.pages[0].value : "-"}
                />
              </div>
            )}

            {lastPage ? (
              !currentGroup.pages.some(
                (x) => x.id === lastPage.id || x.id === lastPage.id - 1
              ) && (
                <div onClick={goToLast}>
                  <PaginationButton
                    className={twMerge("text-marvel-accent", xsTextSize)}
                    value={lastPage.value}
                  />
                </div>
              )
            ) : (
              <PaginationButton
                className={twMerge(
                  "relative text-marvel-accent",
                  xsTextSize,
                  loadingClasses
                )}
                value={"-"}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const PaginationInput = memo<PaginationInputProps>(
  PaginationInputElement
);
