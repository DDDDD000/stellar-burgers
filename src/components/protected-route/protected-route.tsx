import { Navigate, useLocation } from 'react-router-dom';
import { getIsAuthChecked, getUser } from '@services/user/slice';
import { useAppSelector } from '@services/store';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  component: React.JSX.Element;
};

export const ProtectedRoute = ({
  onlyUnAuth = false,
  component
}: ProtectedRouteProps): React.JSX.Element => {
  const isAuthChecked = useAppSelector(getIsAuthChecked);
  const user = useAppSelector(getUser);
  const location = useLocation();
  if (!isAuthChecked) {
    return <div>Loading...</div>;
  }

  if (onlyUnAuth && user) {
    // User is authenticated but should be unauthenticated
    const { from } = location.state || { from: { pathname: '/' } };
    return <Navigate to={from} replace />;
  }

  if (!onlyUnAuth && !user) {
    // User is unauthenticated but should be authenticated
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  return component;
};
