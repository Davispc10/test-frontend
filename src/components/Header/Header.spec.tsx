import { render, screen, waitFor } from "@testing-library/react";

import { Header } from ".";

describe("[Component]: Page Header", () => {
  it("should render without errors", async () => {
    render(<Header />);

    const image = screen.getByAltText("Marvel Logo");
    expect(image).toBeInTheDocument();
    await waitFor(() => expect(image).toHaveAttribute("src", "/logo.svg"));
    expect(screen.getByRole("link")).toHaveAttribute("href", "/");
  });
});
