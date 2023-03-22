import { PaginationContext } from '@/providers/pagination';
import { useContext } from 'react';
import { ArrowLeft, ArrowRight } from 'phosphor-react';

const Pagination = () => {
  // Acessar contexto de paginação (provider)
  const {
    currentPage,
    totalPages,
    goToNextPage,
    goToPreviousPage,
    hasNextPage,
    hasPreviousPage,
  } = useContext(PaginationContext);

  return (
    <div className="flex items-center justify-between p-4 bg-marvel-red rounded-lg">
      <div className="flex flex-col gap-1">
        <span className="text-white">
          Page {currentPage} of {totalPages}
        </span>

        <div className="flex items-center gap-2">
          <button
            disabled={!hasPreviousPage}
            className="
              p-2 bg-white rounded-md text-marvel-red
              disabled:opacity-50
            "
            onClick={() => {
              goToPreviousPage();
            }}
          >
            <ArrowLeft weight="bold" />
          </button>
          <button
            disabled={!hasNextPage}
            className="
              p-2 bg-white rounded-md text-marvel-red
              disabled:opacity-50
            "
            onClick={() => {
              goToNextPage();
            }}
          >
            <ArrowRight weight="bold" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
