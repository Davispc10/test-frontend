import { L_ELLIPISIS, R_ELLIPISIS } from "@/constants/Ellipisis";

const generatePages = (page: number, totalPages: number) => {
  const current = Math.min(page, totalPages);
  const total = Math.max(1, totalPages);

  if (total <= 7) {
    return Array.from({ length: total }).map((_, i) => i + 1);
  }
  if (current < 3) {
    return [1, 2, 3, L_ELLIPISIS, total - 1, total];
  }
  if (current === 3) {
    return [1, 2, 3, 4, L_ELLIPISIS, total - 1, total];
  }

  if (current > total - 2) {
    return [1, 2, L_ELLIPISIS, total - 1, total];
  }

  if (current === total - 2) {
    return [1, 2, L_ELLIPISIS, total - 3, total - 2, total - 1, total];
  }

  return [
    1,
    L_ELLIPISIS,
    current - 1,
    current,
    current + 1,
    R_ELLIPISIS,
    total,
  ];
};

export const usePagination = (page: number, limit: number, total: number) => {
  const totalPages = Math.ceil(total / limit);
  const pages = generatePages(page, totalPages);
  const isCurrentPage = (n: number) => n === page;

  return { pages, isCurrentPage };
};
