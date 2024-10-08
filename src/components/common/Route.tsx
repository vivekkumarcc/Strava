import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../Redux/hooks";

type Props = {
  children?: JSX.Element | JSX.Element[];
};

export const AuthenticatedRoute: React.FC<Props> = ({ children }) => {
  const { isUserAuthenticated } = useAppSelector((state) => state.user);

  if (!isUserAuthenticated) {
    return <Navigate to="/authentication/landing" />;
  }

  return <>{children}</>;
};

export const UnAuthenticatedRoute: React.FC<any> = ({ children }) => {
  const isUserAuthenticated = useAppSelector(
    (state) => state.user.isUserAuthenticated
  );

  return isUserAuthenticated ? (
    <Navigate to="/user/activities" />
  ) : (
    <>
      <Outlet />
    </>
  );
};
