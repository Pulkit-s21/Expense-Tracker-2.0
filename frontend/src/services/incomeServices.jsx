import axios from "axios"
import baseUrl from "../utils/baseUrl.js"

export const addIncome = async (data, token) => {
  try {
    const res = await axios.post(`${baseUrl}/income/create`, data, {
      headers: {
        Authorization: token,
      },
    })
    return res.data
  } catch (err) {
    console.error(err.message)
    throw err
  }
}

export const getIncomes = async (userId, token) => {
  try {
    const res = await axios.get(`${baseUrl}/income/read/${userId}`, {
      headers: {
        Authorization: token,
      },
    })
    return res.data
  } catch (err) {
    console.error(err.message)
    throw err
  }
}
