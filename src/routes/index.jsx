import { createBrowserRouter } from 'react-router-dom';

import App from '../App';
import PublicRoutes from './PublicRoutes';
import PrivateRoutes from './PrivateRoutes';

import Page404 from '../components/common/Page404';
import Layout from '../components/common/Layout';
import Login from '../pages/Auth';
import InventoryManagement from '../pages/InventoryManagement/Loader';
import RentalManagement from '../pages/RentalManagement/Loader';
import EZPassBilling from '../pages/EZPassBilling/Loader';
import Messages from '../pages/Messages/Loader';
import Settings from '../pages/Settings/Loader';
import Dashboard from '../pages/Dashboard/Loader';

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
                element: <Dashboard />,
              },
              {
                element: <h1>User Management</h1>,
                path: '/user-management',
              },
              {
                element:<InventoryManagement />,
                path: '/inventory-management',
              },
              {
                element: <RentalManagement  />,
                path: '/rental-management',
              },
              {
                element: <EZPassBilling />,
                path: '/ez-pass-billing',
              },
              {
                element: <Messages />,
                path: '/messages',
              },
              {
                element: <Settings />,
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
