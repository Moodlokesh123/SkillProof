import axios from "axios";

const api = axios.create({
    baseURL: "http://127.0.0.1:8000/api/",
});

// Attach JWT only to protected API requests
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("access");

    const publicEndpoints = [
        "token/",
        "users/register/",
    ];

    const isPublicEndpoint = publicEndpoints.some((endpoint) =>
        config.url?.includes(endpoint)
    );

    if (token && !isPublicEndpoint) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default api;