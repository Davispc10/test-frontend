import Layout from '@/components/Layout';

// Pages
import Character from '@/pages/Character';
import Home from '@/pages/Home';

import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/character/:id',
        element: <Character />,
      },
    ],
  },
]);
