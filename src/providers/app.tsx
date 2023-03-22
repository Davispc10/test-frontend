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

const ErrorFallback = () => {
  return (
    <div
      className="text-marvel-red w-screen h-screen flex flex-col justify-center items-center"
      role="alert"
    >
      <h2 className="text-lg font-semibold">Ooops, something went wrong :( </h2>
      <button
        className="mt-4 rounded-lg bg-neutral-300 p-2"
        onClick={() => window.location.assign(window.location.origin)}
      >
        Refresh
      </button>
    </div>
  );
};

const LoadingFallback = () => {
  return (
    <div className="flex items-center justify-center w-screen h-screen bg-white">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-t-2 border-marvel-red" />
    </div>
  );
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
