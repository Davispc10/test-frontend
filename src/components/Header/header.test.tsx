import { render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import Header from ".";
import configureMockStore from "redux-mock-store";
import SearchNameActionTypes from "@/redux/searchName/action-types";

const mockStore = configureMockStore();

describe("<Header />", () => {
  const initialState = { searchName: "" };
  const store = mockStore(initialState);

  const makeSut = () => {
    return render(
      <Provider store={store}>
        <Header />
      </Provider>
    );
  };

  it("dispatches WRITE action on input change", () => {
    const { getByPlaceholderText } = makeSut();

    const searchInput = getByPlaceholderText("Pesquisar heroi");

    fireEvent.change(searchInput, { target: { value: "Spider-Man" } });

    const actions = store.getActions();
    const expectedAction = {
      type: SearchNameActionTypes.WRITE,
      payload: "Spider-Man",
    };

    expect(actions).toEqual([expectedAction]);
  });

  it("should test header logo container", () => {
    const { container } = makeSut();

    const imgContainer = container.querySelectorAll("div")[0];
    expect(imgContainer).toBeInTheDocument();

    const img = container.querySelector("div img");

    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("alt", "Logo Marvel");
    expect(img).toHaveAttribute("src");
  });

  it("should test header search input container", () => {
    const { container, getByPlaceholderText } = makeSut();

    const inputContainer = container.querySelectorAll("div")[1];
    expect(inputContainer).toBeInTheDocument();

    const input = getByPlaceholderText("Pesquisar heroi");
    expect(input).toBeInTheDocument();
  });

  it("should test header empty container", () => {
    const { container } = makeSut();

    const emptyContainer = container.querySelectorAll("div")[2];
    expect(emptyContainer).toBeInTheDocument();
    expect(emptyContainer).toBeEmptyDOMElement();
  });
});
