import { useState } from "react"
import { signUp } from "../services/authServices"
import Swal from "sweetalert2"

export const Signup = () => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  })

  const [confirmPswrd, setConfirmPswrd] = useState("")

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    })
  }

  const register = async (e) => {
    e.preventDefault()

    if (confirmPswrd !== userData.password) {
      return Swal.fire({
        icon: "error",
        text: "Password doesn't match",
        showConfirmButton: true,
        confirmButtonText: "Ok",
        showCloseButton: false,
      })
    }

    try {
      const data = await signUp(userData)

      if (data.token) {
        Swal.fire({
          icon: "success",
          text: `Welcome ${userData.username}`,
          showConfirmButton: false,
          timer: 2000,
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
    <form onSubmit={register}>
      <div>
        <label htmlFor="Username">Username</label>
        <input
          type="text"
          placeholder="Username"
          value={userData.username}
          onChange={handleChange}
          name="username"
          required
        />
      </div>
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
      <div>
        <label htmlFor="Password">Confirm Password</label>
        <input
          type="password"
          placeholder="Password"
          value={confirmPswrd}
          onChange={(e) => setConfirmPswrd(e.target.value)}
          name="confirm password"
          required
        />
      </div>
      <button>Sign up</button>
    </form>
  )
}

export default Signup
