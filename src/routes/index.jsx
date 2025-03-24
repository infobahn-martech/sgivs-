import { createBrowserRouter, Route } from 'react-router-dom';

import App from '../App';
import Page404 from '../components/common/Page404';

import PublicRoutes from './PublicRoutes';
import PrivateRoutes from './PrivateRoutes';

const router = createBrowserRouter([
  {
    element: <App />,
    errorElement: <Page404 />,
    children: [
      {
        element: <PublicRoutes />,
        children: [
          {
            path: '/',
            element: <h1>Home page</h1>,
          },
          {
            path: '/login',
            element: <h1>Login page</h1>,
          },
        ],
      },
      {
        element: <PrivateRoutes />,
        children: [
          {
            path: '/dashboard',
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
]);

export default router;
