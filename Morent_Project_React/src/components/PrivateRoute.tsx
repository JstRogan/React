import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';
import type { RootState } from '../store';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const isAuthenticated = useAppSelector((state: RootState) => state.auth.isAuthenticated);
  

  const hasToken = localStorage.getItem('authToken');
  
  return isAuthenticated || hasToken ? <>{children}</> : <Navigate to="/login" replace />;
};

export default PrivateRoute;