import Button from "../atoms/Button";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

export interface Props {
  handlePagination: (page: number) => void;
  loading?: boolean;
  page: number;
  totalPages?: number;
}

function Pagination({ handlePagination, loading, page, totalPages }: Props) {
  return (
    <div className="flex items-center gap-2">
      <Button
        data-testid="pagination-previous"
        disabled={page === 1}
        icon={<ChevronLeftIcon />}
        onClick={() => handlePagination(page - 1)}
        type="button"
      />
      <span className="flex h-6 items-center justify-center truncate rounded-md bg-white px-2 font-roboto text-xs font-bold text-black/50 text-red-500 ring-1 ring-red-500">
        {totalPages ? `${page} / ${totalPages}` : page}
      </span>
      <Button
        data-testid="pagination-next"
        disabled={!!totalPages && page >= totalPages}
        loading={loading}
        icon={<ChevronRightIcon />}
        onClick={() => handlePagination(page + 1)}
        type="button"
      />
    </div>
  );
}

export default Pagination;
