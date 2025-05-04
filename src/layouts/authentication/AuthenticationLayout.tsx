import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { RootState } from 'store';

const AuthenticationLayout = () => {
  const { loggedIn } = useSelector((state: RootState) => state.auth);
  if (loggedIn) {
    return <Navigate to={'/'} />;
  }
  return (
    <div>
      <Outlet />
    </div>
  );
};
export default AuthenticationLayout;
