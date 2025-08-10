import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://application-booking-backend.onrender.com/api' || 'http://localhost:5000/api',
});

export default instance;