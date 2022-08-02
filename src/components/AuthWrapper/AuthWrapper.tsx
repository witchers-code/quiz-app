import { Outlet } from 'react-router-dom';
import { useAuthStatus } from '../hooks/useAuthStatus'

const AuthWrapper = () => {
  const { loggedIn, checkingStatus } = useAuthStatus();

  return  <Outlet /> 
}

export default AuthWrapper;

