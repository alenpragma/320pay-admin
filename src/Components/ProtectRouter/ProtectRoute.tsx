import { Navigate, useLocation } from "react-router-dom"

const ProtectRoute = ({ children }: any) => {
  const location = useLocation()
  const token = localStorage.getItem("paymentAdminToken")

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace></Navigate>
  }
  return children
}

export default ProtectRoute
