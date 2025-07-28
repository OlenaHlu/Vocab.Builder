import { useAppSelector } from "../../redux/hooks";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import { Navigate } from "react-router-dom";

type PrivateRouteProps = {
  component: React.ReactNode;
};

const PrivateRoute = ({ component }: PrivateRouteProps) => {
  const isAuthenticated = useAppSelector(selectIsLoggedIn);

  return isAuthenticated ? <>{component}</> : <Navigate to="/login" />;
};

export default PrivateRoute;
