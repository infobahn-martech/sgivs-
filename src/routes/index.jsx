import { createBrowserRouter } from 'react-router-dom';

import App from '../App';
import PublicRoutes from './PublicRoutes';
import PrivateRoutes from './PrivateRoutes';

import Page404 from '../components/common/Page404';
import Layout from '../components/common/Layout';
import Login from '../pages/Auth/Loader';
import InventoryManagement from '../pages/InventoryManagement/Loader';
import EZPassBilling from '../pages/EZPassBilling/Loader';
import Messages from '../pages/Messages/Loader';
import Settings from '../pages/Settings/Loader';
import Dashboard from '../pages/Dashboard/Loader';
import UserManagement from '../pages/userManagement';
import ForgotPassword from '../pages/ForgotPassword/Loader';
import InventoryForm from '../pages/InventoryManagement/InventoryForm';
import Profile from '../pages/Profile/Loader';
import ResetPassword from '../pages/ResetPassword/Loader';
import InventoryView from '../pages/InventoryManagement/InventoryView';
import LoanManagement from '../pages/LoanManagement';
import UnmappedTransactions from '../pages/UnmappedTransactions/Loader';
import Category from '../pages/Category/Loader';
import SubCategory from '../pages/SubCategory/Loader';

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
          {
            path: '/reset-password/:id',
            element: <ResetPassword />,
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
                element: <InventoryForm />,
                path: '/inventory-management/add',
              },
              {
                element: <InventoryForm />,
                path: '/inventory-management/edit/:id',
              },
              {
                element: <InventoryView />,
                path: '/inventory-management/view/:id',
              },
              {
                element: <LoanManagement />,
                path: '/loan-management',
              },
              {
                element: <EZPassBilling />,
                path: '/ez-pass-billing',
              },
              {
                element: <UnmappedTransactions />,
                path: '/ez-pass-billing/unmapped-transactions',
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
              {
                path: '/profile',
                element: <Profile />,
              },
              {
                path: '/category',
                element: <Category />,
              },
              {
                path: '/sub-category',
                element: <SubCategory />,
              },
              
            ],
          },
        ],
      },
    ],
  },
]);

export default router;
