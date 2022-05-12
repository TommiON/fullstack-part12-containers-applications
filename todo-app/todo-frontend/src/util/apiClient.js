import axios from 'axios'

console.log('YMPÄRISTÖMUUTTUJA BACKENDILLE: ', process.env.REACT_APP_BACKEND_URL)

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
})

export default apiClient