import axios from 'axios';


const axiosInstance = axios.create({
    baseURL: 'https://shopping-backend-5jrm.onrender.com',
    // baseURL: 'http://localhost:3002',
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
    }
});
export default axiosInstance;
