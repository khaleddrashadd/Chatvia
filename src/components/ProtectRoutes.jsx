import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/use-auth';

const ProtectRoutes = () => {
  const { user, isLoading } = useAuth();

  const location = useLocation();
  return (
    <>
      {user && !isLoading ? (
        <Outlet />
      ) : (
        <Navigate
          to="/login"
          state={{ from: location }}
          replace
        />
      )}
    </>
  );
};
export default ProtectRoutes;
