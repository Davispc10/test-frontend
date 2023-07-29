import React from "react";

import Pagination, { Props as PaginationProps } from "./Pagination";

import { render } from "@testing-library/react";

describe("Pagination", () => {
  it("should render with totalPages", () => {
    const props: PaginationProps = {
      handlePagination: jest.fn(),
      page: 1,
      loading: false,
      totalPages: 5,
    };

    const rendered = render(<Pagination {...props} />);

    expect(rendered.getByText(`${props.page} / ${props.totalPages}`)).toBeTruthy();
  });

  it("should render without totalPages", () => {
    const props: PaginationProps = {
      handlePagination: jest.fn(),
      page: 1,
      loading: false,
    };

    const rendered = render(<Pagination {...props} />);

    expect(rendered.getByText(props.page)).toBeTruthy();
  });

  it("should decrease the number of pages", () => {
    const props: PaginationProps = {
      handlePagination: jest.fn(),
      page: 5,
      loading: false,
      totalPages: 5,
    };

    const rendered = render(<Pagination {...props} />);

    rendered.getByTestId("pagination-previous").click();

    expect(props.handlePagination).toHaveBeenCalledWith(props.page - 1);
  })

  it("should increase the number of pages", () => {
    const props: PaginationProps = {
      handlePagination: jest.fn(),
      page: 1,
      loading: false,
      totalPages: 5,
    };

    const rendered = render(<Pagination {...props} />);

    rendered.getByTestId("pagination-next").click();

    expect(props.handlePagination).toHaveBeenCalledWith(props.page + 1);
  })
});
