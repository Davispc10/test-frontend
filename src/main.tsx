import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";

/* Providers */
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

/* Pages */
import Home from "./pages/Home";
import Character from "./pages/Character";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "character/:id",
        element: <Character />,
      },
    ],
  },
]);

const queryClient = new QueryClient();


ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}/>
    </QueryClientProvider>
  </React.StrictMode>
);
