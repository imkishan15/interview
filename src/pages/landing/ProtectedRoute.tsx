import React from "react";
import { Navigate } from "react-router-dom";
import useAuthStore from "../../store/auth.store";
import Landing from "./Landing";

const ProtectedRoute: React.FC = () => {
  const auth = useAuthStore((state) => state.auth);

  return auth ? <Landing /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
