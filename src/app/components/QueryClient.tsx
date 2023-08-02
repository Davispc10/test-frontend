'use client';

import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

interface QueryClientWrapperProp {
  children: React.ReactNode;
}

export default function QueryClientWrapper({
  children,
}: QueryClientWrapperProp) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
