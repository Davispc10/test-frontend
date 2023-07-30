import { SearchContext } from "@/contexts/search.context";
import { useContext } from "react";

export function useSearch() {
  return useContext(SearchContext)
}