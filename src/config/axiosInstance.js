import axios from "axios";

const instance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
});

instance.defaults.headers.common['Authorization'] = 'Auth from instance';

export default instance;