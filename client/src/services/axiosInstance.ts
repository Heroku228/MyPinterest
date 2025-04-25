import axios from 'axios'

const axiosInstance = axios.create({
	withCredentials: true,
	baseURL: 'http://127.0.0.1:3000/api/v1',
})

export default axiosInstance

