import { useRouter } from "next/router";
import { useCallback, useEffect, useMemo, useState } from "react";

interface UsePaginationAndSearchProps {
  delay?: number;
}

export default function usePaginationAndSearch({
  delay = 500,
}: UsePaginationAndSearchProps) {
  const [searchText, setSearchText] = useState("");
  const router = useRouter();

  const page = useMemo(
    () => Number(router.query.page ?? 1),
    [router.query.page]
  );

  const debounceText = useMemo(
    () => String(router.query.search ?? ""),
    [router.query.search]
  );

  // necessary to update the input when user enters the page
  useEffect(() => {
    if (!router.query.search) return;
    else if (searchText === debounceText) return;

    setSearchText(String(router.query.search) ?? "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.search]);

  const handlePagination = useCallback(
    (pageClicked: number) => {
      router.push(
        { query: { ...router.query, page: String(pageClicked + 1) } },
        undefined,
        { shallow: true }
      );
    },
    [router]
  );

  useEffect(() => {
    let handler: NodeJS.Timeout;
    // if (!!searchText) {
    handler = setTimeout(() => {
      if (!searchText) {
        router.push({ query: {} }, undefined, { shallow: true });
      } else {
        router.push(
          { query: { ...router.query, page: 1, search: searchText } },
          undefined,
          { shallow: true }
        );
      }
    }, delay);
    // }

    return () => {
      clearTimeout(handler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText]);

  return {
    debounceText: debounceText,
    page: page - 1,
    handlePagination: handlePagination,
    searchText: searchText,
    setSearchText: setSearchText,
  };
}
