import { useContext } from "react"
import { UserContext } from "../helpers/UserContext"
import { Navigate } from "react-router-dom"

export const ProtectedRoutes = ({ element }) => {
  const { loggedIn, loading } = useContext(UserContext)

  if (loading) return null

  return !loggedIn ? <Navigate to={"/login"} replace /> : element
}

export default ProtectedRoutes
