import { useState } from "react"
import { login } from "../services/authServices"
import Swal from "sweetalert2"

export const Login = () => {
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
        Swal.fire({
          icon: "success",
          text: `Logged In`,
          showConfirmButton: false,
          timer: 2000,
        }).then(() => {
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
