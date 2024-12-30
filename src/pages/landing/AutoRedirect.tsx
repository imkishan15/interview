import React from "react";
import { Navigate } from "react-router-dom";
import useAuthStore from "../../store/auth.store";
import { ROUTES } from "../../routes/routes";

type AuthRedirectProps = {
  children: React.ReactNode;
};

const AuthRedirect: React.FC<AuthRedirectProps> = ({ children }) => {
  const auth = useAuthStore((state) => state.auth);
  return auth ? <Navigate to={ROUTES.LAUNCHPADS} /> : <>{children}</>;
};

export default AuthRedirect;
