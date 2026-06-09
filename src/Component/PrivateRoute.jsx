import { Navigate, useLocation } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return <span>Loading...</span>;
  }

  if (!user) {
    return (
      <Navigate
        to="/login"
        state={location.pathname}
      />
    );
  }

  return children;
};

export default PrivateRoute;