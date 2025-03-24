import axios from 'axios';

const url = import.meta.env.VITE_API_ENDPOINT;

const Gateway = axios.create({
    baseURL: `${url}api/`,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 30000,
});
Gateway.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);

Gateway.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        const decryptedAccessToken = token;
        if (decryptedAccessToken)
            config.headers = {
                ...config.headers,
                Authorization: `Bearer ${decryptedAccessToken}`,
            };
        return config;
    },
    (error) => {
        console.log('Interceptor error:', error);

        return Promise.reject(error);
    }
);

// Interceptor for response
Gateway.interceptors.response.use(
    (response) => response,
    async (error) => {
        const { response } = error;
        const originalRequest = error.config;
        if (
            response &&
            response.status === 401 &&
            !['auth/logout', 'auth/token'].includes(response.config.url)
        ) {
            // Call refresh token API to get both new tokens
            const refreshResponse = await axios.post(
                `${url}api/v1/auth/token`,
                {
                    refreshToken: localStorage.getItem('refreshToken'),
                }
            );
            if (refreshResponse.status === 200) {
                const { token: newAccessToken } = refreshResponse.data;

                // Store new tokens in localStorage
                await localStorage.setItem('accessToken', newAccessToken);
                // Update the original request with the new access token and retry it
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return Gateway(originalRequest);
            }
            // Adjust status code if necessary
            localStorage.clear(); // Clear all localStorage
        }
        return Promise.reject(error);
    }
);

export default Gateway;
