import { HERO_RETURN_LIMIT } from '@/config';
import { getTotalHeroCount } from '@/features/heroes/api/getHeroCount';
import { useTotalHeroCount } from '@/features/heroes/hooks/useTotalHeroCount';
import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';

interface PaginationContextData {
  currentPage: number;
  totalPages: number;
  setCurrentPage(page: number): void;
  setTotalPages(total: number): void;
  goToNextPage(): void;
  goToPreviousPage(): void;
  goToFirstPage(): void;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export const PaginationContext = createContext<PaginationContextData>(
  {} as PaginationContextData
);

export const PaginationProvider = (props: React.PropsWithChildren) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Obter o total de páginas da API
  const totalHeroCount = useTotalHeroCount();

  useEffect(() => {
    setTotalPages(Math.ceil((totalHeroCount.data || 1) / HERO_RETURN_LIMIT));
  }, [totalHeroCount.data]);

  const goToNextPage = useCallback(() => {
    setCurrentPage((curr) => {
      if (curr < totalPages) {
        return curr + 1;
      }
      return curr;
    });
  }, [currentPage, totalPages]);

  const goToPreviousPage = useCallback(() => {
    setCurrentPage((curr) => {
      if (curr > 1) {
        return curr - 1;
      }
      return curr;
    });
  }, [currentPage, totalPages]);

  const goToFirstPage = useCallback(() => {
    setCurrentPage(1);
  }, []);

  const hasNextPage = currentPage < totalPages;

  const hasPreviousPage = currentPage > 1;

  if (totalHeroCount.isLoading) return <div>Loading...</div>;

  if (totalHeroCount.isError) return <div>Error</div>;

  return (
    <PaginationContext.Provider
      value={{
        currentPage,
        totalPages,
        setCurrentPage,
        setTotalPages,
        goToNextPage,
        goToPreviousPage,
        goToFirstPage,
        hasNextPage,
        hasPreviousPage,
      }}
    >
      {props.children}
    </PaginationContext.Provider>
  );
};
