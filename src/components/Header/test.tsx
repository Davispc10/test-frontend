import { getByPlaceholderText, render, screen } from "@testing-library/react";
import Header from ".";

describe("<Header />", () => {
  it("it should test header logo container", () => {
    const { container } = render(<Header />);

    const imgContainer = container.querySelectorAll("div")[0];
    expect(imgContainer).toBeInTheDocument();

    const img = container.querySelector("div img");
    expect(img).toBeInTheDocument();
  });

  it("it should test header search input container", () => {
    const { container, getByPlaceholderText } = render(<Header />);

    const inputContainer = container.querySelectorAll("div")[1];
    expect(inputContainer).toBeInTheDocument();

    const input = getByPlaceholderText("Pesquisar heroi");
    expect(input).toBeInTheDocument();
  });

  it("it should test header empty container", () => {
    const { container } = render(<Header />);

    const emptyContainer = container.querySelectorAll("div")[2];
    expect(emptyContainer).toBeInTheDocument();
    expect(emptyContainer).toBeEmptyDOMElement();
  });
});
