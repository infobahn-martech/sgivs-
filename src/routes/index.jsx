import { createHashRouter } from 'react-router-dom';

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
import Center from '../pages/Center/Loader';
import CounterManagement from '../pages/Counter/Loader';
import RoleManagement from '../pages/Role/Loader';
import DesignationManagement from '../pages/Designation/Loader';
import AppointmentTypeManagement from '../pages/AppointmentType/Loader';
const router = createHashRouter([
  {
    element: <App />,
    errorElement: <Page404 />,
    children: [
      {
        element: <PublicRoutes />,
        children: [
          { path: '/login', element: <Login /> },
          { path: '/forgot-password', element: <ForgotPassword /> },
          { path: '/reset-password/:id', element: <ResetPassword /> },
        ],
      },
      {
        element: <PrivateRoutes />,
        children: [
          {
            element: <Layout />,
            children: [
              { path: '/', element: <Dashboard /> },

              {
                path: '/inventory-management',
                element: <InventoryManagement />,
              },
              { path: '/inventory-management/add', element: <InventoryForm /> },
              {
                path: '/inventory-management/edit/:id',
                element: <InventoryForm />,
              },
              {
                path: '/inventory-management/view/:id',
                element: <InventoryView />,
              },

              { path: '/loan-management', element: <LoanManagement /> },
              { path: '/ez-pass-billing', element: <EZPassBilling /> },
              {
                path: '/ez-pass-billing/unmapped-transactions',
                element: <UnmappedTransactions />,
              },

              { path: '/messages', element: <Messages /> },
              { path: '/settings', element: <Settings /> },

              { path: '/user-management', element: <UserManagement /> },
              { path: '/profile', element: <Profile /> },

              { path: '/center', element: <Center /> },
              { path: '/counter-management', element: <CounterManagement /> },
              { path: '/role-management', element: <RoleManagement /> },
              { path: '/designation-management', element: <DesignationManagement /> },
              { path: '/appointment-type-management', element: <AppointmentTypeManagement /> },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;
