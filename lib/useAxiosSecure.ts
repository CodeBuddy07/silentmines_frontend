import axios from 'axios';

export const axiosSecure = axios.create({
    //baseURL: 'https://joyscelond-backend.onrender.com',
    baseURL: 'http://localhost:5001/api',
    withCredentials: true,
});

export const baseUrl = 'http://localhost:5001/api';


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

        if (error.response?.status === 403) {
            // Handle forbidden - user might not be verified or lack permissions
            console.error('Access forbidden - insufficient permissions or unverified account');
        }

        if (error.response?.status >= 500) {
            // Handle server errors
            console.error('Server error occurred:', error.response.data?.message || 'Internal server error');
        }

        return Promise.reject(error);
    }
);

export default axiosSecure;