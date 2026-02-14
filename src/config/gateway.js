import axios from 'axios';

const url = import.meta.env.VITE_API_ENDPOINT;

// If your env already includes "/api/" then remove `api/` below.
const Gateway = axios.create({
  baseURL: `${url}api/`,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,

  // ✅ IMPORTANT for PHP sessions (cookie-based auth)
  withCredentials: true,
});

// Response pass-through
Gateway.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

// ✅ Request interceptor (NO Bearer token for session auth)
Gateway.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

// ✅ If session expires, backend usually returns 401
Gateway.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { response } = error;

    // if unauthorized and not on login endpoints, clear local state
    if (
      response &&
      response.status === 401 &&
      !['users/login', 'auth/login'].some((p) => response.config.url?.includes(p))
    ) {
      localStorage.clear();
      // optional: window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);

export default Gateway;