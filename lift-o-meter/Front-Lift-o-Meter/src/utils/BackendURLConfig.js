const BackendURLConfig = () => {
    if (process.env.REACT_APP_BACKEND_URL) {
        return `https://${process.env.REACT_APP_BACKEND_URL}`
    } else {
        return 'http://localhost:3001'
    }
}

export default BackendURLConfig