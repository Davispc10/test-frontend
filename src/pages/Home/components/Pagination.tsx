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
    goToPage,
    hasNextPage,
    hasPreviousPage,
  } = useContext(PaginationContext);

  const setDirectPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const page = Number(event.target.value);
    if (page > 0 && page <= totalPages) {
      goToPage(page);
    }
  };

  return (
    <div className="flex items-center justify-between p-4 bg-marvel-red rounded-lg">
      <div className="flex flex-col gap-2">
        <span className="text-white flex gap-1">
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
