import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import React from "react";

import { useHeroes } from "../hooks/useHeroes";

const queryClient = new QueryClient();
const wrapper = (props: React.PropsWithChildren) => (
  <QueryClientProvider client={queryClient}>
    {props.children}
  </QueryClientProvider>
);

const { result } = renderHook(
  () =>
    useHeroes({
      page: 1,
    }),
  { wrapper }
);

describe("useHeroes query hook", () => {
  it("should return heroes", (done) => {
    waitFor(() => {
      result.current.isSuccess;
    }).then(() => {
      expect(result.current.data).toBeDefined();
    });

    done();
  });
});
