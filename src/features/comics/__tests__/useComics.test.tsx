import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import React from "react";
import { useComics } from "../hooks/useComics";

const queryClient = new QueryClient();
const wrapper = (props: React.PropsWithChildren) => (
  <QueryClientProvider client={queryClient}>
    {props.children}
  </QueryClientProvider>
);

const { result } = renderHook(() => useComics({ id: 1011334 }), { wrapper });

describe("useComics query hook", () => {
  it("should return comics", async () => {
    await waitFor(() => {
      expect(result.current.data).toBeDefined();
    });
  });
});
