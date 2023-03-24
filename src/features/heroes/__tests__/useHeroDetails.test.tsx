import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import React from "react";

import { useHeroDetails } from "../hooks/useHeroDetails";

const queryClient = new QueryClient();
const wrapper = (props: React.PropsWithChildren) => (
  <QueryClientProvider client={queryClient}>
    {props.children}
  </QueryClientProvider>
);

const { result } = renderHook(() => useHeroDetails({ id: 1011334 }), {
  wrapper,
});

describe("useHeroDetails query hook", () => {
  it("should return the details of a hero", (done) => {
    waitFor(() => {
      result.current.isSuccess;
    }).then(() => {
      expect(result.current.data).toBeDefined();
    });

    done();
  });
});
