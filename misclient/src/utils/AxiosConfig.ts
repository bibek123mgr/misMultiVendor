import axios from "axios"

const API = axios.create({
    baseURL: 'http://localhost:5000/api/v1/',
    timeout: 10000,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',

    }
})

export default API

