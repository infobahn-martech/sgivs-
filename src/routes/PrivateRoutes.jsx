import { Navigate, Outlet } from 'react-router-dom';
import useAuthReducer from '../stores/AuthReducer';

function PrivateRoutes() {
  const { isLoggedIn } = useAuthReducer((state) => state);
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoutes;
