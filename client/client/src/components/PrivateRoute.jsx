import { Navigate } from 'react-router-dom';

function PrivateRoute({ children, allowedType }) {
  const authUser = JSON.parse(localStorage.getItem('authUser'));

  if (!authUser || authUser.type !== allowedType) {
    return <Navigate to={`/${allowedType}-login`} />;
  }

  return children;
}

export default PrivateRoute;
