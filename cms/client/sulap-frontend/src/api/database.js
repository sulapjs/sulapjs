import axios from 'axios';

export const server = 'http://localhost:3000'

const axiosInstance = axios.create({
    baseURL: server
})

export default axiosInstance;