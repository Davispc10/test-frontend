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
  goToPage(page: number): void;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  isLoading: boolean;
  isError: boolean;
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

  const goToPage = useCallback(
    (newPage: number) => {
      setCurrentPage((curr) => {
        if (newPage > 0 && newPage <= totalPages) {
          return newPage;
        }
        return curr;
      });
    },
    [currentPage, totalPages]
  );

  const hasNextPage = currentPage < totalPages;

  const hasPreviousPage = currentPage > 1;

  const isLoading = totalHeroCount.isLoading;

  const isError = totalHeroCount.isError;

  return (
    <PaginationContext.Provider
      value={{
        currentPage,
        totalPages,
        setCurrentPage,
        setTotalPages,
        goToNextPage,
        goToPreviousPage,
        goToPage,
        hasNextPage,
        hasPreviousPage,
        isLoading,
        isError,
      }}
    >
      {props.children}
    </PaginationContext.Provider>
  );
};
