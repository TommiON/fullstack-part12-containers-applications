import axios from 'axios'
import GenerateTokenizedHeader from './GenerateTokenizedHeader'

const backendURL = process.env.REACT_APP_BACKEND_URL || 'localhost:3001'
const baseURL = `https://${backendURL}/api/moveset`

const putChanged = async (id, reps) => {
    const url = `${baseURL}/${id}`
    const payload = {
        newRepetitions: reps
    }
    const config = GenerateTokenizedHeader()

    const response = await axios.put(url, payload, config)
    return response.data
}

export default { putChanged }

