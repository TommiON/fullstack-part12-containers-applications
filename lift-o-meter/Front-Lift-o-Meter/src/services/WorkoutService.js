import axios from 'axios'
import GenerateTokenizedHeader from './GenerateTokenizedHeader'

const backendURL = process.env.REACT_APP_BACKEND_URL || 'localhost:3001'
const baseURL = `https://${backendURL}/api/workout`

const getNext = async () => {
    const config = GenerateTokenizedHeader()
    const response = await axios.get(`${baseURL}/next`, config)
    return response.data
}

const start = async (id) => {
    const url = `${baseURL}/start/${id}`
    const config = GenerateTokenizedHeader()
    const response = await axios.get(url, config)
    return response.data
}

const reset = async (id) => {
    const url = `${baseURL}/reset/${id}`
    const config = GenerateTokenizedHeader()
    const response = await axios.get(url, config)
    return response.data
}

const finish = async (id) => {
    const url = `${baseURL}/finish/${id}`
    const config = GenerateTokenizedHeader()
    const response = await axios.get(url, config)
    return response.data
}

const getCompleted = async () => {
    const url = `${baseURL}/completed/`
    const config = GenerateTokenizedHeader()
    const response = await axios.get(url, config)
    return response.data
}

export default { getNext, start, reset, finish, getCompleted }
