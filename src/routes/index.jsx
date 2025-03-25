import { createBrowserRouter, Route } from 'react-router-dom';

import App from '../App';
import Page404 from '../components/common/Page404';

import PublicRoutes from './PublicRoutes';
import PrivateRoutes from './PrivateRoutes';
import Layout from '../components/common/Layout';
import Login from '../pages/Auth';

const router = createBrowserRouter([
  {
    element: <App />,
    errorElement: <Page404 />,
    children: [
      {
        element: <PublicRoutes />,
        children: [
         
          {
            path: '/login',
            element: <Login />,
          },
        ],
      },
      {
        element: <PrivateRoutes />,
        children: [
          {
            element: <Layout />,
            children: [
              {
                path: '/',
                element: <h1>Dashboard page</h1>,
              },
              {
                path: '/profile',
                element: <h1>Profile page</h1>,
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;
