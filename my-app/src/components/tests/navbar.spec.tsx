import { render, screen } from "@testing-library/react";
import Navbar from "../Navbar";
import { QueryClientProvider } from "@tanstack/react-query";
import { SearchContextProvider } from "../../contexts/search.context";
import { queryClient } from "../../services/queryClient";
import '@testing-library/jest-dom'

describe("Navbar", () => {
  it("should render correctly", () => {
    render(
      <main>
        <div>
          <QueryClientProvider client={queryClient}>
            <SearchContextProvider>
              <Navbar />
            </SearchContextProvider>
          </QueryClientProvider>
        </div>
      </main>
    );

    expect(screen.getByText("Marvel Characters")).toBeInTheDocument();
  });
});
