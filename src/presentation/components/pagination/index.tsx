import React from "react";
import styles from "./styles.module.scss";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  handleNextPage: (page: number) => Promise<void>;
  handlePrevPage: (page: number) => Promise<void>;
};

export const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, handlePrevPage, handleNextPage }) => {
  return (
    <div className={styles.paginationWrapper}>
      <button
        data-testid="pagination-prev-button"
        className={styles.paginationButton}
        onClick={async () => await handlePrevPage(currentPage)}
        disabled={currentPage === 1}
      >
        &#8592;
      </button>

      <span data-testid="pagination-text" className={styles.paginationPageInfo}>
        Página {currentPage} de {totalPages}
      </span>

      <button
        data-testid="pagination-next-button"
        className={styles.paginationButton}
        onClick={async () => await handleNextPage(currentPage)}
        disabled={currentPage >= totalPages}
      >
        &#8594;
      </button>
    </div>
  );
};
