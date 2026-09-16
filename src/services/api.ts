import axios from "axios";

export const api = axios.create({
    baseURL: process.env.API_URL || 'http://localhost:3001/api',
    headers: {
        'Content-Type': 'apllication/json',
    },
    timeout: 10000,
})