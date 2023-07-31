import { render, screen } from "@testing-library/react";
import Button from "./index";

describe("<Button />", () => {
  it("should render the button", () => {
    render(<Button />);

    expect(screen.getByRole("button", { name: /Botao/i })).toBeInTheDocument();
  });
});
