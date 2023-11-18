// axiosConfig.js

import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://sesna.id', // Replace with your API base URL
});


// Request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        // Log the request data
        //console.log('Request:', config);
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        // Log the response data
        //console.log('Response:', response);
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);
export default axiosInstance;
