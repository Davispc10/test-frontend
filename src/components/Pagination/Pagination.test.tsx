import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import Pagination from ".";

const mockStore = configureMockStore();

describe("<Pagination />", () => {
  const initialState = {
    heroesListReducer: {
      page: 2,
      totalPages: 10,
    },
  };
  const store = mockStore(initialState);

  const makeSut = (mockOnChange = jest.fn()) => {
    const sut = render(
      <Provider store={store}>
        <Pagination onChange={mockOnChange} />
      </Provider>
    );
    return { sut, mockOnChange };
  };

  it("should call onChange function when clicking on next and previous buttons", () => {
    const onChange = jest.fn().mockImplementation((e) => e);
    const {
      sut: { getByText },
    } = makeSut(onChange);

    fireEvent.click(getByText("próximo >"));
    expect(onChange).toHaveBeenCalled();
    fireEvent.click(getByText("< anterior"));
    expect(onChange).toHaveBeenCalled();
  });
});
