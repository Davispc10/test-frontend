import React from 'react';
import { queryClient } from '@/lib/react-query';
import { router } from '@/routes';
import { QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PaginationProvider } from './pagination';

// @TODO: Remove later
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import FullscrenLoader from '@/components/FullscrenLoader';
import ErrorPage from '@/components/ErrorPage';

const ErrorFallback = () => {
  return <ErrorPage />;
};

const LoadingFallback = () => {
  return <FullscrenLoader />;
};

const AppProvider = (props: React.PropsWithChildren) => {
  return (
    <React.Suspense fallback={<LoadingFallback />}>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <PaginationProvider>
            <ToastContainer
              position="bottom-right"
              autoClose={3000}
              hideProgressBar={true}
              pauseOnHover={false}
              draggable={false}
              closeOnClick
            />
            <RouterProvider router={router} />
          </PaginationProvider>
        </QueryClientProvider>
      </ErrorBoundary>
    </React.Suspense>
  );
};

export default AppProvider;
