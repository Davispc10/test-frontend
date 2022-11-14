import React, { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

export type ReactQueryClientProviderProps = {
  children: ReactNode;
};

export const ReactQueryClientProvider: React.FC<ReactQueryClientProviderProps> = ({ children }: ReactQueryClientProviderProps) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      { children }
    </QueryClientProvider>
  );
};
