import axios from "axios"

const APIFormData = axios.create({
    baseURL: 'http://localhost:5000/api/v1/',
    timeout: 10000,
    withCredentials: true,
    headers: {
        'Content-Type': 'multipart/form-data',
        'Accept': 'application/json',

    }
})

export default APIFormData