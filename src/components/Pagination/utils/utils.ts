/**
 * return interval between pages
 * @example generatePagesArray(2, 6) = [3, 4, 5, 6]
 */
export function generatePagesArray(from: number, to: number) {
  return [...new Array(to - from)]
    .map((_, index) => from + index + 1)
    .filter((page) => page > 0)
}
