import { useState } from "react";

type UseSearchReturn = {
  search: (query: string) => void;
  loading: boolean;
  results: any[];
};

type UseSearchState = Pick<UseSearchReturn, "loading" | "results">;

export const useSearch = (): UseSearchReturn => {
  const initialState: UseSearchState = {
    loading: false,
    results: [],
  };
  const [state, setState] = useState<UseSearchState>(initialState);

  const search = (query: string) => {
    setState((state) => ({
      ...state,
      loading: true,
    }));
  };
  setTimeout(() => {
    setState((state) => ({
      ...state,
      loading: false,
    }));
  }, 5000);

  return { search, loading: state.loading, results: state.results };
};
