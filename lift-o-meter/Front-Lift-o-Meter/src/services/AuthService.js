import axios from 'axios'
import GenerateTokenizedHeader from './GenerateTokenizedHeader'

const backendURL = process.env.REACT_APP_BACKEND_URL || 'localhost:3001'
const baseURL = `https://${backendURL}/api/auth`

const login = async credentials => {
    const response = await axios.post(`${baseURL}/login/`, credentials)
    return response
}

const signup = async userData => {
    const response = await axios.post(`${baseURL}/signup/`, userData)
        .catch(e => {
            console.log('** axios-error!', e)
            throw e
    })
    return response
}

const logout = async () => {
    const config = GenerateTokenizedHeader()
    const response = await axios.get(`${baseURL}/logout/`, config)
    return response
}

export default {login, signup, logout}