import { Navigate, useLocation } from "react-router-dom";

import useAuth from "~/hooks/useAuth";

function ProtectedRoutes({ children }) {
  const location = useLocation();
  const { authenticated } = useAuth();

  if (!authenticated) {
    return <Navigate to="/" replace state={{ path: location.pathname }} />;
  }

  return children;
}

export default ProtectedRoutes;