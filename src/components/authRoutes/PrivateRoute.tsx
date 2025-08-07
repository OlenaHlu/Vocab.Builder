import { useAppSelector } from "../../redux/hooks";
import {
  selectIsLoggedIn,
  selectAuthIsLoading,
  selectAuthError,
} from "../../redux/auth/selectors";
import { Navigate } from "react-router-dom";

type PrivateRouteProps = {
  component: React.ReactNode;
};

const PrivateRoute = ({ component }: PrivateRouteProps) => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const isLoading = useAppSelector(selectAuthIsLoading);
  const authError = useAppSelector(selectAuthError);

  if (isLoading || authError === "Unauthorized") {
    return <Navigate to="/login" />;
  }

  return isLoggedIn ? <>{component}</> : <Navigate to="/login" />;
};

export default PrivateRoute;
