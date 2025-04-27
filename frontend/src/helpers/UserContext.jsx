import { createContext, useState, useEffect } from "react"
import { jwtDecode } from "jwt-decode"
import { getUserDetail } from "../services/authServices.jsx"
import Swal from "sweetalert2"

export const UserContext = createContext(null)

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({})
  const [loggedIn, setLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const logout = () => {
    setUser(null)
    setLoggedIn(false)
    localStorage.removeItem("token")
    window.location.href = "/login"
  }

  const logoutAlert = () => {
    Swal.fire({
      icon: "info",
      text: "Your session has expired. Please login again !!",
      showConfirmButton: true,
      confirmButtonText: "Login",
      allowEscapeKey: false,
      allowOutsideClick: false,
    }).then((res) => res.isConfirmed && logout())
  }

  useEffect(() => {
    const initializeUser = async () => {
      const storedToken = localStorage.getItem("token")

      if (!storedToken) {
        setLoggedIn(false)
        setIsLoading(false)
        return
      }

      try {
        const decodedUser = jwtDecode(storedToken)
        const userData = await getUserDetail(decodedUser.id, storedToken)

        setUser(userData)
        setIsLoading(true)

        const timeUntilTokenExpires = decodedUser.exp * 1000 - Date.now()
        const logoutTimer = setTimeout(() => {
          logoutAlert()
        }, timeUntilTokenExpires)

        return () => clearTimeout(logoutTimer)
      } catch (err) {
        console.error("Invalid token", err.message)
        logout()
      } finally {
        setIsLoading(false)
      }
    }

    initializeUser()
  }, [])

  return (
    <UserContext.Provider
      value={{ user, setUser, loggedIn, isLoading, logout }}
    >
      {!isLoading && children}
    </UserContext.Provider>
  )
}
