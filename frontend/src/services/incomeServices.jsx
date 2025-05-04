import axios from "axios"
import baseUrl from "../utils/baseUrl.js"

// add income
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

// get incomes
export const getIncomes = async (userId, token, limit) => {
  try {
    const res = await axios.get(`${baseUrl}/income/read/${userId}`, {
      headers: {
        Authorization: token,
        params: limit ? { limit } : {},
      },
    })
    return res.data
  } catch (err) {
    console.error(err.message)
    throw err
  }
}

// get last month incomes
export const getMonthIncomes = async (userId, token, limit) => {
  try {
    const res = await axios.get(`${baseUrl}/income/read/some/${userId}`, {
      headers: {
        Authorization: token,
        params: limit ? { limit } : {},
      },
    })
    return res.data
  } catch (err) {
    console.error(err.message)
    throw err
  }
}

// update income
export const updateIncome = async (id, data, token) => {
  try {
    const res = await axios.put(`${baseUrl}/income/edit/${id}`, data, {
      headers: { Authorization: token },
    })

    return res.data
  } catch (err) {
    console.error(err.message)
    throw err
  }
}

// delete income
export const deleteIncome = async (id, token) => {
  try {
    const res = await axios.put(`${baseUrl}/income/delete/${id}`, {
      headers: { Authorization: token },
    })

    return res.data
  } catch (err) {
    console.error(err.message)
    throw err
  }
}
