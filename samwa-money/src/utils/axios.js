import axios from 'axios'

// const baseURL = import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_BASE_URL_LOCAL

const baseURL = 'http://localhost:5500'
// const baseURL = import.meta.env.VITE_API_BASE_URL_LOCAL

const api = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  // withCredentials: true,
})

export default api
