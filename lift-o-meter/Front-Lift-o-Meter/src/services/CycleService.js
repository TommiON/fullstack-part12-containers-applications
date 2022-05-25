import axios from 'axios'
import GenerateTokenizedHeader from './GenerateTokenizedHeader'

const backendURL = process.env.REACT_APP_BACKEND_URL || 'localhost:8080'
const baseURL = `https://${backendURL}/api/cycle`
const config = GenerateTokenizedHeader()

const getCurrent = async () => {
    const response = await axios.get(`${baseURL}/current`, config)
    return response.data
}

export default {getCurrent}