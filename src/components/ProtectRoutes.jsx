import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/use-auth';
import LoadingSpinner from './LoadingSpinner';

const ProtectRoutes = () => {
  const { user, isLoading } = useAuth();
  console.log('💥 ~ ProtectRoutes ~ isLoading', isLoading);

  const location = useLocation();

  if (isLoading) return <LoadingSpinner/>

  return (
    <>
      {user ? (
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
