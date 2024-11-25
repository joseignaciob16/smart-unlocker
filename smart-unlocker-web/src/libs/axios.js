import axios from 'axios';

//era-que-aqui-no-tenia-el-puerto--solo-debes-cambiar-la-ip
const api = axios.create({
    baseURL: 'http://192.168.193.80:8000/api',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }   
});

api.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if(token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default api;