import { createBrowserRouter } from 'react-router-dom';

import App from '../App';
import PublicRoutes from './PublicRoutes';
import PrivateRoutes from './PrivateRoutes';

import Page404 from '../components/common/Page404';
import Layout from '../components/common/Layout';
import Login from '../pages/Auth/Loader';
import InventoryManagement from '../pages/InventoryManagement/Loader';
import RentalManagement from '../pages/RentalManagement/Loader';
import EZPassBilling from '../pages/EZPassBilling/Loader';
import Messages from '../pages/Messages/Loader';
import Settings from '../pages/Settings/Loader';
import Dashboard from '../pages/Dashboard/Loader';
import UserManagement from '../pages/userManagement';
import ForgotPassword from '../pages/ForgotPassword/Loader';

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
          {
            path: '/forgot-password',
            element: <ForgotPassword />,
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
                element: <InventoryManagement />,
                path: '/inventory-management',
              },
              {
                element: <RentalManagement />,
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
              {
                path: '/user-management',
                element: <UserManagement />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;
