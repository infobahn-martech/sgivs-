import { Navigate, Outlet } from 'react-router-dom';
import useAuthReducer from '../stores/AuthReducer';
import { useEffect } from 'react';
import { getItem } from '../helpers/localStorage';

function PrivateRoutes() {
  const { isAuthenticated, getUserProfile } = useAuthReducer((state) => state);

  useEffect(() => {
    if (getItem('accessToken')) getUserProfile({ details: 'all' });
  }, []);

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoutes;
