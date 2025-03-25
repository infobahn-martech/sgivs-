import { createBrowserRouter } from 'react-router-dom';

import App from '../App';
import PublicRoutes from './PublicRoutes';
import PrivateRoutes from './PrivateRoutes';

import Page404 from '../components/common/Page404';
import Layout from '../components/common/Layout';
import Login from '../pages/Auth/Loader';
import InventoryManagement from '../pages/InventoryManagement/Loader';

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
                element: <h1>User Management</h1>,
                path: '/user-management',
              },
              {
                element: <InventoryManagement />,
                path: '/inventory-management',
              },
              {
                element: <h1>Rental Management'</h1>,
                path: '/rental-management',
              },
              {
                element: <h1>EZ pass billing'</h1>,
                path: '/ez-pass-billing',
              },
              {
                element: <h1>Messages'</h1>,
                path: '/messages',
              },
              {
                element: <h1>Settings'</h1>,
                path: '/settings',
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;
