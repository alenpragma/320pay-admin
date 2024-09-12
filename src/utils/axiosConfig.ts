// src/utils/axiosConfig.js
import axios from "axios"
import { logout } from "./auth"
import { baseUrl } from "./api"
import { getPaymentaToken } from "../hooks/handelAuthToken"
const axiosInstance = axios.create({
  baseURL: `${baseUrl}`,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
})

// Request interceptor to add the token to headers
axiosInstance.interceptors.request.use((config) => {
  const token = getPaymentaToken()
  // console.log(token)

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Response interceptor to handle token expiration
axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      logout()
    }
    return Promise.reject(error)
  }
)

export default axiosInstance
