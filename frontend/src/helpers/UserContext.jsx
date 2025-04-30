import Swal from "sweetalert2"
import { createContext, useState, useEffect } from "react"
import { jwtDecode } from "jwt-decode"
import { getUserDetail } from "../services/authServices.jsx"
import { getTransactions } from "../services/transactionServices.jsx"
import { getIncomes } from "../services/incomeServices.jsx"

export const UserContext = createContext(null)

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({})
  const [loggedIn, setLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [userNumbers, setUserNumbers] = useState({
    expense: [],
    income: [],
    balance: [],
  })
  const [total, setTotal] = useState({
    expense: 0,
    income: 0,
    balance: 0,
  })

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
        setLoggedIn(true)

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

  const fetchTransactions = async () => {
    try {
      if (user.id !== undefined) {
        const data = await getTransactions(
          user.id,
          localStorage.getItem("token")
        )
        setUserNumbers((prev) => ({
          ...prev,
          expense: data,
        }))
      }
    } catch (err) {
      console.error(err.message)
    }
  }

  const fetchIncomes = async () => {
    try {
      if (user.id !== undefined) {
        const data = await getIncomes(user.id, localStorage.getItem("token"))
        setUserNumbers((prev) => ({ ...prev, income: data }))
      }
    } catch (err) {
      console.error(err.message)
    }
  }

  useEffect(() => {
    fetchTransactions()
    fetchIncomes()
  }, [user])

  useEffect(() => {
    const expense = userNumbers.expense.reduce(
      (acc, item) => acc + item.amount,
      0
    )
    const income = userNumbers.income.reduce(
      (acc, item) => acc + item.amount,
      0
    )
    setTotal((prev) => ({
      ...prev,
      expense,
      income,
      balance: income - expense,
    }))
  }, [userNumbers])

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        loggedIn,
        isLoading,
        logout,
        total,
      }}
    >
      {!isLoading && children}
    </UserContext.Provider>
  )
}
