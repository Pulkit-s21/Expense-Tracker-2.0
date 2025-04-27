import axios from "axios"
import baseUrl from "../utils/baseUrl.js"

// signUp
export const signUp = async (userData) => {
  try {
    const res = await axios.post(`${baseUrl}/auth/signUp`, userData)
    return res.data
  } catch (err) {
    console.error(err.message)
    throw err
  }
}

// login
export const login = async (userData) => {
  try {
    const res = await axios.post(`${baseUrl}/auth/login`, userData, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    return res.data
  } catch (err) {
    console.error(err.message)
    throw err
  }
}

// getUserDetail
export const getUserDetail = async (id, token) => {
  try {
    const res = await axios.get(`${baseUrl}/auth/user/${id}`, token, {
      headers: {
        "Content-Type": "application/json",
      },
    })

    return res.data
  } catch (err) {
    console.error(err.message)
    throw err
  }
}
