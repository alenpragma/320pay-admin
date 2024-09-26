import { Navigate, useLocation } from "react-router-dom";

const ProtectRoute = ({ children }: any) => {
  const location = useLocation();
  const token = localStorage.getItem("paymentAdminToken");
  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

export const RedirectToDashboard = ({ children }: any) => {
  const token = localStorage.getItem("paymentAdminToken");
  if (token) {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
};

export default ProtectRoute;
