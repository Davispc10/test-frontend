import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

export type PaginationPage = {
  id: number;
  value: string | number;
};

export type PaginationPagesGroup = {
  id: number;
  pages: PaginationPage[];
};

export type PaginationContextType = {
  /** Número máximo de páginas por grupo. */
  maxPerGroup: number;

  /** Lista de páginas. */
  pages: PaginationPage[];

  /** Define as páginas */
  setPages: (pages: PaginationPage[]) => void;

  /** Lista de grupos de páginas. */
  groups: PaginationPagesGroup[];

  /** Próxima página */
  nextPage: PaginationPage | null;

  /** Página anterior */
  prevPage: PaginationPage | null;

  /** Próximo grupo */
  nextGroup: PaginationPagesGroup | null;

  /** Última página */
  lastPage: PaginationPage | null;

  /** Primeira página */
  firstPage: PaginationPage | null;

  /** Grupo anterior */
  prevGroup: PaginationPagesGroup | null;

  /** Página atual. */
  currentPage: PaginationPage | null;

  /** Grupo atual - A página deve pertencer a este grupo. */
  currentGroup: PaginationPagesGroup | null;

  /** Move para a próxima página se ela existir. */
  goToNext: () => void;

  /** Move para a página anterior se ela existir. */
  goToPrev: () => void;

  /** Move para a página informada por {pageId} se ela existir.
   * @param pageId
   */
  goToPage: (pageId: number) => void;

  /** Move para primeira página. */
  goToFirst: () => void;

  /** Move para a última página. */
  goToLast: () => void;

  /** Move para o próximo grupo e seleciona a primeira página do grupo. */
  goToNextGroup: () => void;

  /** Move para o grupo anterior e seleciona a última página do grupo. */
  goToPrevGroup: () => void;
};

const defaultContext: PaginationContextType = {
  pages: [],
  groups: [],
  prevGroup: null,
  lastPage: null,
  firstPage: null,
  nextGroup: null,
  prevPage: null,
  nextPage: null,
  maxPerGroup: NaN,
  currentGroup: null,
  currentPage: null,
  setPages: () => {},
  goToPrev: () => {},
  goToNext: () => {},
  goToFirst: () => {},
  goToLast: () => {},
  goToNextGroup: () => {},
  goToPage: () => {},
  goToPrevGroup: () => {},
};

export const PaginationContext = createContext(defaultContext);

export type PaginationProviderProps = {
  maxPerGroup?: number;
};

export const PaginationProvider: React.FC<
  React.PropsWithChildren<PaginationProviderProps>
> = ({ children, maxPerGroup = 5 }) => {
  const [pages, setPages] = useState<PaginationPage[]>([]);
  const [pageSelected, setPageSelected] = useState<number>(0);

  useEffect(() => {
    return () => {
      setPages([]);
      setPageSelected(0);
    };
  }, []);

  const groups = useMemo(() => {
    const groups: PaginationPagesGroup[] = [];
    for (let i = 0; i < Math.round(pages.length / maxPerGroup); i++) {
      const groupPages = [];
      for (let j = 1; j <= maxPerGroup; j++) {
        const pageId = i * maxPerGroup + j - 1;
        const page = pages.find((x) => x.id === pageId);
        if (page) {
          groupPages.push(page);
        } else break;
      }
      groups.push({ id: i, pages: groupPages });
    }

    return groups;
  }, [maxPerGroup, pages]);

  const groupSelected = useMemo(() => {
    const group = groups.find((x) =>
      x.pages.find((y) => y.id === pageSelected)
    );
    return group ? group.id : 0;
  }, [groups, pageSelected]);

  const setGroupSelected = useCallback(
    (groupId: number) => {
      const groupSelected = groups.find((x) => x.id === groupId);
      if (groupSelected) {
        setPageSelected(groupSelected.pages[0].id || 0);
      }
    },
    [groups]
  );

  const lastPage = useMemo(
    () => (pages.length > 0 ? pages[pages.length - 1] : null),
    [pages]
  );

  const firstPage = useMemo(
    () => (pages.length > 0 ? pages[0] : null),
    [pages]
  );

  const nextPage = useMemo(
    () => pages.find(({ id }) => id === pageSelected + 1) || null,
    [pages, pageSelected]
  );
  const prevPage = useMemo(
    () => pages.find(({ id }) => id === pageSelected - 1) || null,
    [pages, pageSelected]
  );
  const nextGroup = useMemo(
    () => groups.find(({ id }) => id === groupSelected + 1) || null,
    [groups, groupSelected]
  );
  const prevGroup = useMemo(
    () => groups.find(({ id }) => id === groupSelected - 1) || null,
    [groups, groupSelected]
  );

  const currentPage = useMemo(
    () => pages.find(({ id }) => id === pageSelected) || null,
    [pages, pageSelected]
  );

  const currentGroup = useMemo(
    () => groups.find(({ id }) => id === groupSelected) || null,
    [groups, groupSelected]
  );

  const goToPrev = useCallback(() => {
    if (prevPage) setPageSelected((currentPage) => currentPage - 1);
  }, [prevPage]);

  const goToNext = useCallback(() => {
    if (nextPage) setPageSelected((currentPage) => currentPage + 1);
  }, [nextPage]);

  const goToFirst = useCallback(() => {
    setPageSelected(0);
  }, []);

  const goToLast = useCallback(() => {
    if (lastPage) {
      setPageSelected(lastPage.id);
    }
  }, [lastPage]);

  const goToNextGroup = useCallback(() => {
    if (nextGroup) setGroupSelected(nextGroup.id);
  }, [nextGroup, setGroupSelected]);

  const goToPrevGroup = useCallback(() => {
    if (prevGroup) setGroupSelected(prevGroup.id);
  }, [prevGroup, setGroupSelected]);

  const goToPage = useCallback(
    (pageId: number) => {
      const page = pages.find((x) => x.id === pageId);
      if (page) setPageSelected(page.id);
    },
    [pages]
  );

  return (
    <PaginationContext.Provider
      value={{
        pages,
        groups,
        currentPage,
        currentGroup,
        maxPerGroup,
        nextPage,
        prevPage,
        nextGroup,
        prevGroup,
        lastPage,
        firstPage,

        setPages,
        goToPrev,
        goToNext,
        goToFirst,
        goToLast,
        goToNextGroup,
        goToPrevGroup,
        goToPage,
      }}
    >
      {children}
    </PaginationContext.Provider>
  );
};
