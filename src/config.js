// config.js

export const BASE_URL = 'http://localhost:5000/api/v1';

// Function to retrieve token dynamically
export const getToken = () => {
    return localStorage.getItem('token');
};

export default BASE_URL;
