/* eslint-disable react/prop-types */
import { useUserContext } from "../providers/UserContext.jsx";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = ({ children, redirectTo = '/' }) => {
  const [userActions] = useUserContext()

  if (!userActions.user.token) return <Navigate to={redirectTo} />

  return children ? children : <Outlet />
}
