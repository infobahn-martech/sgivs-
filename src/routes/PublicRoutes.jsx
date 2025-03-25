import { Suspense } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuthReducer from '../stores/AuthReducer';

function PublicRoutes() {
  const { isLoggedIn } = useAuthReducer((state) => state);

  return (
    <Suspense fallback={<div />}>
      {isLoggedIn ? (
        <Navigate to="/dashboard" />
      ) : (
        <div className="outer">
          <Outlet />
        </div>
      )}
    </Suspense>
  );
}

export default PublicRoutes;
