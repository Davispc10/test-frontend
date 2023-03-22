import { PaginationContext } from '@/providers/pagination';
import { useContext } from 'react';
import { ArrowLeft, ArrowRight } from 'phosphor-react';
import HoverScaleAnimation from '@/components/animations/HoverScale';
import FadeRightAnimation from '@/components/animations/FadeRight';
import { PaginationSkeleton } from '../skeletons/PaginationSkeleton';

const Pagination = () => {
  // Acessar contexto de paginação (provider)
  const {
    currentPage,
    totalPages,
    goToNextPage,
    goToPreviousPage,
    goToPage,
    hasNextPage,
    hasPreviousPage,
    isError,
    isLoading,
  } = useContext(PaginationContext);

  const setDirectPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const page = Number(event.target.value);
    if (page > 0 && page <= totalPages) {
      goToPage(page);
    }
  };

  if (isLoading) {
    return <PaginationSkeleton />;
  }

  return (
    <FadeRightAnimation className="flex items-center justify-between rounded-lg">
      <div className="flex gap-3">
        {/* Pagination input */}
        <span className="text-white flex gap-1 bg-marvel-red p-2 rounded-md">
          Page
          <input
            className="bg-white rounded-md w-6 px-1 text-center
              focus:outline-none focus:ring-2 text-marvel-red
            "
            defaultValue={currentPage}
            value={currentPage}
            type="number"
            min={1}
            step={1}
            max={totalPages}
            onChange={setDirectPage}
          />
          of <b>{totalPages}</b>
        </span>

        {/* Pagination buttons */}
        <div className="flex items-center gap-1">
          <HoverScaleAnimation>
            <button
              disabled={!hasPreviousPage}
              className="
                p-3 bg-white rounded-md text-marvel-red
                disabled:opacity-50
              "
              onClick={() => {
                goToPreviousPage();
              }}
            >
              <ArrowLeft weight="bold" />
            </button>
          </HoverScaleAnimation>

          <HoverScaleAnimation>
            <button
              disabled={!hasNextPage}
              className="
                p-3 bg-white rounded-md text-marvel-red
                disabled:opacity-50
              "
              onClick={() => {
                goToNextPage();
              }}
            >
              <ArrowRight weight="bold" />
            </button>
          </HoverScaleAnimation>
        </div>
      </div>
    </FadeRightAnimation>
  );
};

export default Pagination;
