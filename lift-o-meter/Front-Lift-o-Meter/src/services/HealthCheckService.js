import axios from 'axios'

const backendURL = process.env.REACT_APP_BACKEND_URL || 'localhost:3001'
const URL = `https://${backendURL}/api/healthcheck`

const healthCheck = async () => {
    console.log('kutsutaan terveystarkastusta, url: ', URL)
    const response = await axios.get(URL)
    console.log('serviceltä saadaan: ', response.data)
    return response.data
}

export default { healthCheck }