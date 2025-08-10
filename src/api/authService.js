import api from './axios';

const register = async (name, email, password) => {
    const response = await api.post('/register', { name, email, password });
    if (response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
};

const login = async (email, password) => {
    const response = await api.post('/login', { email, password });
    if (response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
};

const logout = () => {
    localStorage.removeItem('user');
};

const getToken = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return user?.token;
};

const getRole = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return user?.role;
};

const authService = {
    register,
    login,
    logout,
    getToken,
    getRole,
};

export default authService;