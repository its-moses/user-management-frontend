// Axios instance for Sanctum SPA mode
const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true // VERY IMPORTANT
});
