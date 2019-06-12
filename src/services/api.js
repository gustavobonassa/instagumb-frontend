import axios from 'axios';

const api = axios.create({
    baseURL: 'https://instagumb-backend.herokuapp.com'
});

export default api;