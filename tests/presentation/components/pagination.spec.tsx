import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";

import { Pagination } from "@/presentation/components";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  handleNextPage: (page: number) => Promise<void>;
  handlePrevPage: (page: number) => Promise<void>;
};

const makeSut = (props: PaginationProps) => {
  const sut = render(<Pagination {...props} />);
  return sut;
};

describe("Pagination Component", () => {
  test("Should inits with correct values", () => {
    makeSut({
      currentPage: 1,
      totalPages: 5,
      handlePrevPage: () => null,
      handleNextPage: () => null,
    });
    expect(screen.getByTestId("pagination-text")).toHaveTextContent("Página 1 de 5");
    expect(screen.getByTestId("pagination-prev-button")).toBeDisabled();
    expect(screen.getByTestId("pagination-next-button")).not.toBeDisabled();
  });

  test("Should change to next page on click", () => {
    const sut = makeSut({
      currentPage: 2,
      totalPages: 5,
      handlePrevPage: () => null,
      handleNextPage: () => null,
    });

    fireEvent.click(screen.getByTestId("pagination-next-button"));
    sut.rerender(<Pagination currentPage={3} totalPages={5} handlePrevPage={() => null} handleNextPage={() => null} />)
    expect(screen.getByTestId("pagination-text")).toHaveTextContent("Página 3 de 5");
  });

  test("Should change to prev page on click", () => {
    const sut = makeSut({
      currentPage: 2,
      totalPages: 5,
      handlePrevPage: () => null,
      handleNextPage: () => null,
    });

    fireEvent.click(screen.getByTestId("pagination-next-button"));
    sut.rerender(<Pagination currentPage={1} totalPages={5} handlePrevPage={() => null} handleNextPage={() => null} />)
    expect(screen.getByTestId("pagination-text")).toHaveTextContent("Página 1 de 5");
  });
});
