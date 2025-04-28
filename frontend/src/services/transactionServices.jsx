import axios from "axios"
import baseUrl from "../utils/baseUrl.js"

// add transaction
export const addTransaction = async (data, token) => {
  try {
    const res = await axios.post(`${baseUrl}/transaction/create`, data, {
      headers: {
        Authorizations: token,
      },
    })
    return res.data
  } catch (err) {
    console.error(err.message)
    throw err
  }
}

// get transactions
export const getTransactions = async (userId, token) => {
  try {
    const res = await axios.get(`${baseUrl}/transaction/read/${userId}`, {
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
