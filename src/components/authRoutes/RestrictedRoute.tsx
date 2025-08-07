import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import {
  selectIsLoggedIn,
  selectAuthIsLoading,
} from "../../redux/auth/selectors";

interface RestrictedRouteProps {
  component: React.ReactNode;
}

const RestrictedRoute: React.FC<RestrictedRouteProps> = ({ component }) => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const isLoading = useAppSelector(selectAuthIsLoading);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return isLoggedIn ? <Navigate to="/dictionary" /> : <>{component}</>;
};

export default RestrictedRoute;
