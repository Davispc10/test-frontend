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

  /** Página atual. */
  currentPage: PaginationPage | null;

  /** Grupo atual - A página deve pertencer a este grupo. */
  currentGroup: PaginationPagesGroup | null;

  /** Se existe uma página a direita. */
  canGoNext: boolean;

  /** Se existe uma página a esquerda. */
  canGoPrev: boolean;

  /** Se o botão para mostrar mais páginas está disponível na esquerda. */
  canMorePagesLeft: boolean;

  /** Se o botão para mostrar mais páginas está disponível na direita. */
  canMorePagesRight: boolean;

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
  maxPerGroup: NaN,
  canGoNext: false,
  canGoPrev: false,
  canMorePagesLeft: false,
  canMorePagesRight: true,
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
  const [groupSelected, setGroupSelected] = useState<number>(0);

  useEffect(() => {
    return () => {
      setPages([]);
      setGroupSelected(0);
      setPageSelected(0);
    };
  }, []);

  const groups = useMemo(() => {
    const groups: PaginationPagesGroup[] = [];
    for (let i = 0; i < Math.round(pages.length / maxPerGroup); i++) {
      const groupPages = [];
      for (let j = 1; j <= maxPerGroup; j++) {
        const pageId = i * maxPerGroup + j;
        const page = pages.find((x) => x.id === pageId);
        if (page) {
          groupPages.push(page);
        } else break;
      }
      groups.push({ id: i, pages: groupPages });
    }

    return groups;
  }, [maxPerGroup, pages]);

  const currentPage = useMemo(
    () => pages.find(({ id }) => id === pageSelected) || null,
    [pages, pageSelected]
  );

  const currentGroup = useMemo(
    () => groups.find(({ id }) => id === groupSelected) || null,
    [groups, groupSelected]
  );

  const canGoNext = useMemo(
    () => !!pages.find((x) => x.id === pageSelected + 1),
    [pages, pageSelected]
  );

  const canGoPrev = useMemo(
    () => !!pages.find((x) => x.id === pageSelected - 1),
    [pages, pageSelected]
  );

  const canMorePagesLeft = useMemo(
    () => !!groups.find((x) => x.id === groupSelected - 1),
    [groups, groupSelected]
  );

  const canMorePagesRight = useMemo(
    () => !!groups.find((x) => x.id === groupSelected + 1),
    [groups, groupSelected]
  );

  const goToPrev = useCallback(() => {
    if (canGoPrev) setPageSelected((currentPage) => currentPage - 1);
  }, [canGoPrev]);

  const goToNext = useCallback(() => {
    if (canGoNext) setPageSelected((currentPage) => currentPage + 1);
  }, [canGoNext]);

  const goToFirst = useCallback(() => {
    setPageSelected(0);
  }, []);

  const goToLast = useCallback(() => {
    setPageSelected(pages.length === 0 ? 0 : pages.length - 1);
  }, [pages]);

  const goToNextGroup = useCallback(() => {
    if (canMorePagesRight) setGroupSelected((currentGroup) => currentGroup + 1);
  }, [canMorePagesRight]);

  const goToPrevGroup = useCallback(() => {
    if (canMorePagesLeft) setGroupSelected((currentGroup) => currentGroup - 1);
  }, [canMorePagesLeft]);

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
        canGoNext,
        canGoPrev,
        maxPerGroup,
        canMorePagesLeft,
        canMorePagesRight,
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
