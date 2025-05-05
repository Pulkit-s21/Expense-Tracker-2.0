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
export const getTransactions = async (userId, token, limit) => {
  try {
    const res = await axios.get(`${baseUrl}/transaction/read/${userId}`, {
      params: limit ? { limit } : {},
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

// update transaction
export const updateTransaction = async (id, token, data) => {
  try {
    const res = await axios.put(`${baseUrl}/transaction/edit/${id}`, data, {
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

// delete transaction..if in put no body is being passed, send null
export const deleteTransaction = async (id, token) => {
  try {
    const res = await axios.put(`${baseUrl}/transaction/delete/${id}`, null, {
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
