import { useAppSelector } from "../../redux/hooks";
import {
  selectIsLoggedIn,
  selectAuthIsLoading,
} from "../../redux/auth/selectors";
import { Navigate } from "react-router-dom";

type PrivateRouteProps = {
  component: React.ReactNode;
};

const PrivateRoute = ({ component }: PrivateRouteProps) => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const isLoading = useAppSelector(selectAuthIsLoading);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return isLoggedIn ? <>{component}</> : <Navigate to="/login" />;
};

export default PrivateRoute;
