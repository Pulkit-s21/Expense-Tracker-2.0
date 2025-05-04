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

// get last month transactions
export const getMonthTransactions = async (userId, token, limit) => {
  try {
    const res = await axios.get(`${baseUrl}/transaction/read/some/${userId}`, {
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
    const res = await axios.put(`${baseUrl}/transactions/edit/${id}`, data, {
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

// delete transaction
export const deleteTransaction = async (id, token) => {
  try {
    const res = await axios.put(`${baseUrl}/transactions/delete/${id}`, {
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
