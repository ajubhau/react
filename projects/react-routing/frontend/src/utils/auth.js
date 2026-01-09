import { jwtDecode } from 'jwt-decode';

const isTokenExpired = (token) => {

    if (!token) {
        return true; // No token means it's effectively expired or invalid
    }

    try {
        const decodeToken = jwtDecode(token);
        const currentTime = Date.now() / 1000; // current time in second

        // The 'exp' claim in a JWT represents the expiration time in seconds since the Unix epoch
        return decodeToken.exp < currentTime;
    } catch (error) {
        // Handle cases where the token is malformed or invalid
        console.error('Error decoding token:', error);
        return true; // Treat invalid tokens as expired
    }
}

export default isTokenExpired;