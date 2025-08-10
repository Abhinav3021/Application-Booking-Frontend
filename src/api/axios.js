import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://appointment-booking-e1ug.onrender.com' || 'http://localhost:5000/api',
});

export default instance;