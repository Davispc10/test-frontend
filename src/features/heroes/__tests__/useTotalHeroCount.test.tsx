import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import React from "react";

import { useTotalHeroCount } from "../hooks/useTotalHeroCount";

const queryClient = new QueryClient();
const wrapper = (props: React.PropsWithChildren) => (
  <QueryClientProvider client={queryClient}>
    {props.children}
  </QueryClientProvider>
);

const { result } = renderHook(() => useTotalHeroCount(), { wrapper });

describe("useTotalHeroCount query hook", () => {
  it("should return the total of heroes", (done) => {
    waitFor(() => {
      result.current.isSuccess;
    }).then(() => {
      expect(result.current.data).toBeDefined();
    });

    done();
  });
});
