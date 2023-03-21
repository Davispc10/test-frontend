import { atom } from 'jotai';

const totalPagesAtom = atom<number | null>(null);
const currentPageAtom = atom<number>(1);

// Read-write conditional atom
export const totalPages = atom(
  (get) => {
    return get(totalPagesAtom);
  },
  (get, set, totalPages: number) => {
    // Só irá setar o valor se o valor atual for undefined
    // Isso permite que o numero total de paginas só possa ser setado uma vez
    // Como um estado imutável
    if (!get(totalPagesAtom)) {
      return set(totalPagesAtom, totalPages);
    } else {
      return get(totalPagesAtom);
    }
  }
);

// Read-write atom
export const currentPage = atom(
  (get) => {
    return get(currentPageAtom);
  },
  (get, set, page: number) => {
    const totalPages = get(totalPagesAtom);

    if (!totalPages) return;
    if (page < 1) return set(currentPageAtom, 1);
    if (page > totalPages) return set(currentPageAtom, totalPages);

    return set(currentPageAtom, page);
  }
);
