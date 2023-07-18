import { QueryClientProvider } from "react-query";
import { Index } from "../pages";
import { queryClient } from "../utils/utils";

export const AppProvider = (props: React.PropsWithChildren) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Index />
    </QueryClientProvider>
  );
};