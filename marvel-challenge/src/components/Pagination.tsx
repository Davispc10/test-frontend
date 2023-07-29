import { PaginationItem } from "./PaginationItem";

interface PaginationProps {
  totalCountOfRegisters: number;
  registersPerPage?: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
}

const siblingsCount = 2;

function generatePagesArray(from: number, to: number) {
  return [...new Array(to - from)]
    .map((_, index) => {
      return from + index + 1;
    })
    .filter((page) => page > 0);
}

export function Pagination({
  totalCountOfRegisters,
  registersPerPage = 10,
  currentPage = 1,
  onPageChange,
}: PaginationProps) {
  const lastPage = Math.floor(totalCountOfRegisters / registersPerPage);

  const previousPages =
    currentPage > 1
      ? generatePagesArray(currentPage - 1 - siblingsCount, currentPage - 1)
      : [];

  const nextPages =
    currentPage < lastPage
      ? generatePagesArray(
          currentPage,
          Math.min(currentPage + siblingsCount, lastPage)
        )
      : [];

  return (
    <section className="w-full pt-8">
      <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
        <div className="flex flex-1 items-center justify-between">
          <div>
            <p className="mr-2 text-sm text-gray-700">
              <span className="font-medium">0</span> -{" "}
              <span className="font-medium">10</span> de{" "}
              <span className="font-medium">100</span>
            </p>
          </div>

          <nav className="flex items-center gap-2">
            {currentPage > 1 + siblingsCount && (
              <>
                <PaginationItem onPageChange={onPageChange} number={1} />
                {currentPage > 2 + siblingsCount && (
                  <span className="text-zinc-950 font-bold text-center w-4">
                    ...
                  </span>
                )}
              </>
            )}
            {previousPages.length > 0 &&
              previousPages.map((page) => {
                return (
                  <PaginationItem
                    onPageChange={onPageChange}
                    key={page}
                    number={page}
                  />
                );
              })}
            <PaginationItem
              onPageChange={onPageChange}
              number={currentPage}
              isCurrent
            />

            {nextPages.length > 0 &&
              nextPages.map((page) => {
                return (
                  <PaginationItem
                    onPageChange={onPageChange}
                    key={page}
                    number={page}
                  />
                );
              })}
            {currentPage + siblingsCount < lastPage && (
              <>
                {currentPage + 1 + siblingsCount < lastPage && (
                  <span className="text-zinc-950 font-bold text-center w-4">
                    ...
                  </span>
                )}
                <PaginationItem onPageChange={onPageChange} number={lastPage} />
              </>
            )}
          </nav>
        </div>
      </div>
    </section>
  );
}
