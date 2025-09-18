import axios from 'axios';

export const axiosSecure = axios.create({
    //baseURL: 'https://joyscelond-backend.onrender.com',
    baseURL: 'https://server.greenlove.fun',
    withCredentials: true,
});

export const baseUrl = 'https://server.greenlove.fun/api';


// Request interceptor
axiosSecure.interceptors.request.use(
    (config) => {
        // Add auth token if available (from localStorage)
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
axiosSecure.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Handle common errors
        if (error.response?.status === 401) {
            // Handle unauthorized - clear token and redirect to login
            localStorage.removeItem('token');
            document.cookie = 'auth_token=;';

            // Only redirect if not already on login page
            if (window.location.pathname !== '/log-in' && window.location.pathname !== '/') {
                window.location.href = '/log-in';
            }
        }

        return Promise.reject(error);
    }
);

export default axiosSecure;