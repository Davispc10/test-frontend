'use client';
import React from 'react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryStreamedHydration } from '@tanstack/react-query-next-experimental';

function Providers({ children }: React.PropsWithChildren) {
	return (
		<QueryClientProvider client={new QueryClient()}>
			<ReactQueryStreamedHydration>{children}</ReactQueryStreamedHydration>
		</QueryClientProvider>
	);
}

export default Providers;
