import { useState, useContext } from "react"
import { getUserDetail, login } from "../services/authServices"
import { UserContext } from "../helpers/UserContext"
import { jwtDecode } from "jwt-decode"
import Swal from "sweetalert2"

export const Login = () => {
  const { setUser } = useContext(UserContext)
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  })

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    })
  }

  const loginUser = async (e) => {
    e.preventDefault()

    try {
      const data = await login(userData)

      if (data.token) {
        const decodeUser = jwtDecode(data.token)
        const userData = await getUserDetail(decodeUser.id, data.token)
        setUser(userData)
        Swal.fire({
          icon: "success",
          title: `Welcome back ${userData.username}`,
          text: "Logged In",
          timer: 2000,
          showConfirmButton: false,
        }).then(() => {
          localStorage.setItem("token", data.token)
          window.location.href = "/"
        })
      }
    } catch (err) {
      console.error(err.message)
    }
  }

  return (
    <form onSubmit={loginUser}>
      <div>
        <label htmlFor="Email">Email</label>
        <input
          type="email"
          placeholder="email123@xyz.com"
          value={userData.email}
          onChange={handleChange}
          name="email"
          required
        />
      </div>
      <div>
        <label htmlFor="Password">Password</label>
        <input
          type="password"
          placeholder="Password"
          value={userData.password}
          onChange={handleChange}
          name="password"
          required
        />
      </div>
      <button>Login</button>
    </form>
  )
}

export default Login
