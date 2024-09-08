import axios from "axios";

export const API = axios.create({
    baseURL: 'http://localhost:5000/api/v1/',
    withCredentials: true,
    headers: {
        "Content-Type": 'application/json',
        'Accept': 'application/ json'
    }
})


export const APIFomrm = axios.create({
    baseURL: 'http://localhost:5000/api/v1/',
    headers: {
        "Content-Type": 'multipart/form-data',
        'Accept': 'application/ json'
    }
})